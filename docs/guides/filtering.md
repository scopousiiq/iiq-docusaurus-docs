---
sidebar_position: 5
---

# Filtering with Facets

The Incident IQ API uses a facet-based filtering system for searching Tickets, Assets, Users, Locations, and Rooms. This guide explains how to construct filter queries to find exactly the records you need.

## Overview

Filtering is done via the **request body** using a `Filters` array. Each filter targets a specific facet (field) with criteria to match.

### Supported Entities

| Entity | Search Endpoint | Filter Shape |
|--------|-----------------|--------------|
| Tickets | `POST /api/v1.0/tickets` | `Facet` + `Id`/`Value` |
| Assets | `POST /api/v1.0/assets` | `Facet` + `Id`/`Value` |
| Users | `POST /api/v1.0/users` | `Facet` + `Id`/`Value` |
| Locations | `POST /api/v2.0/locations/all` | `Facet` + `Op` + `Values` |
| Rooms | `POST /api/v2.0/locations/rooms/query` | `Facet` + `Op` + `Values` |

The v1 entities share one filter format, described in the next section. Locations and Rooms
use a different filter object and a different request envelope — see
[Locations and Rooms](#locations-and-rooms).

:::info Shared Infrastructure
The v1 filter system is shared across Tickets, Assets, and Users. Six universal facets (`grade`, `location`, `locationtype`, `role`, `source`, `user`) work identically on all three.

The facet tables in this guide cover the commonly used facets, not the complete set. For the
list available to your tenant, call the [filter catalog endpoint](#filter-catalog-endpoint).
:::

---

## Filter Structure

All search endpoints accept a `Filters` array containing filter objects:

```json
{
  "Filters": [
    {
      "Facet": "status",
      "Id": "9c3d07c9-554f-ec11-9820-0003ffe402cf",
      "Name": "Submitted",
      "Negative": false,
      "GroupIndex": 0
    }
  ]
}
```

### Filter Object Properties

| Field | Type | Description |
|-------|------|-------------|
| `Facet` | string | **Required**. The facet key (lowercase). See facet tables below. |
| `Id` | UUID | Entity reference value. Used for facets that filter by ID (status, location, user, etc.) |
| `Value` | string | Expression value. Used for keyword, date, and numeric facets. |
| `Name` | string | Display label. Required for boolean facets (`"yes"` or `"no"`). |
| `Negative` | boolean | When `true`, excludes matching records instead of including them. |
| `GroupIndex` | integer | Groups filters. Within a group: same facet = OR, different facets = AND. Different groups are OR'd together. |
| `CustomFieldTypeId` | UUID | Required for all `customfield*` facets. Identifies the specific custom field definition to filter on. |

### Field Usage by Facet Type

| Facet Type | Uses `Id` | Uses `Value` | Uses `Name` |
|------------|-----------|--------------|-------------|
| Entity Reference (status, location, user) | Yes | No | Optional |
| Keyword/Text | No | Yes | Optional |
| Date Expression | No | Yes | Optional |
| Numeric Expression | No | Yes | No |
| Boolean (yes/no) | No | Yes | Yes |
| Custom Field | Yes | Yes | Optional |

### Unrecognized Facets Are Silently Discarded

:::warning A `200` does not confirm that your filter was applied
Unrecognized facet names and unparseable values are **discarded, not rejected**. The request
succeeds and the result is computed over the *unfiltered* set.

Confirmed on a 474,222-asset tenant: an unfiltered count and a count carrying
`{"Facet": "ZZZ_not_a_real_facet", "Value": "xyz"}` both returned 474,222 with a `200`.

To validate a new filter, send a value that must narrow the result and confirm that
`Paging.TotalRows` moved. If a deliberately invalid value returns the same total as a valid
one, the filter is not being read.
:::

Three related cases are worth knowing about:

- **A facet that works on one entity may be discarded on another.** `modifieddate` filters
  Tickets and Assets, but it is not implemented for Users: it is accepted and dropped, so a
  user extract filtered on it silently returns every user. Locations and Rooms do support a
  modified-since filter, through the different shape described in
  [Locations and Rooms](#locations-and-rooms).
- **On asset search, a discarded facet can also change the row count.** Rejecting a facet
  triggers a fallback between query engines, and the two engines do not always report
  identical totals for the same corpus. Compare `Metadata.QueryEngineSource` between your
  filtered and unfiltered calls — if it changes, a facet was rejected and the two counts are
  not comparable.
- **`Selected` has no effect on filtering.** It is accepted and ignored, so
  `"Selected": false` does **not** disable a filter. To stop applying a filter, remove the
  entry.

---

## Basic Filter Examples

### Keyword Search

Search across text fields:

```json
{
  "Filters": [
    {
      "Facet": "keyword",
      "Value": "broken screen",
      "Name": "broken screen"
    }
  ]
}
```

### Multiple Filters (AND Logic)

By default, all filters are ANDed together:

```json
{
  "Filters": [
    {
      "Facet": "status",
      "Id": "status-id-here",
      "Name": "Open"
    },
    {
      "Facet": "prioritylevel",
      "Id": "priority-id-here",
      "Name": "High"
    }
  ]
}
```

Result: Records matching status **AND** priority.

---

## Expression Syntax

### Date Expression Syntax

Date facets accept various expression formats in the `Value` field:

#### Comparison Operators

| Syntax | Description | Example |
|--------|-------------|---------|
| `date:MM/DD/YYYY` | Exact date match | `date:01/15/2025` |
| `date>=MM/DD/YYYY` | On or after date | `date>=01/01/2025` |
| `date<=MM/DD/YYYY` | On or before date | `date<=12/31/2025` |
| `date>MM/DD/YYYY` | After date | `date>01/01/2025` |
| `date<MM/DD/YYYY` | Before date | `date<12/31/2025` |

#### Explicit Date Ranges

| Syntax | Description | Example |
|--------|-------------|---------|
| `daterange:MM/DD/YYYY-MM/DD/YYYY` | Between two dates | `daterange:01/01/2025-01/31/2025` |

`daterange:` splits its two dates on a single hyphen, so ISO `YYYY-MM-DD` values cannot be
used inside it. Use `MM/DD/YYYY` or `YYYYMMDD`. ISO is fine for the single-date comparison
operators above, which do not split.

#### Relative Ranges

Every relative range is `range:`-prefixed. The current-period tokens are `range:week`,
`range:month`, and `range:year`.

| Syntax | Description |
|--------|-------------|
| `range:today` | Today only |
| `range:tomorrow` | Tomorrow only |
| `range:yesterday` | Yesterday only |
| `range:week` | Current week |
| `range:month` | Current month |
| `range:year` | Current year |
| `range:lastweek` | Previous week |
| `range:lastmonth` | Previous month |
| `range:lastyear` | Previous year |
| `range:nextweek` | Next week |
| `range:nextmonth` | Next month |
| `range:nextyear` | Next year |
| `range:lastdays:N` | Last N days (e.g. `range:lastdays:30`) |
| `range:nextdays:N` | Next N days (e.g. `range:nextdays:90`) |

:::warning Tokens are case-sensitive, and an unrecognized token does not error
Date tokens must be lowercase, spelled exactly as above, with no trailing characters.
`Range:Today` is not recognized.

In particular, these forms do **not** exist: `range:thisweek`, `range:thismonth`,
`range:thisyear`, `range:thisquarter`, `range:lastquarter`, `range:last30days`,
`range:last60days`, and `range:last90days`. There is no quarter concept in the date parser
at all, and `range:lastdays:30` is the rolling-window equivalent of `range:last30days`.

None of these produce an error. Per
[Unrecognized Facets Are Silently Discarded](#unrecognized-facets-are-silently-discarded),
an unrecognized token yields an empty result set or an unfiltered one with a `200`. A
nightly incremental sync on `modifieddate` with `range:thisweek` would load nothing
indefinitely and still look healthy.
:::

#### Days Ago

| Syntax | Description | Example |
|--------|-------------|---------|
| `value:N` | Exactly N days ago | `value:7` (7 days ago) |

`value:N` is calculated from UTC rather than your site's local time zone, so close to a day
boundary it can select the adjacent day.

### Numeric Expression Syntax

Numeric facets use the format: `numoperator:<operator>:<value>`

| Operator | Description | Example |
|----------|-------------|---------|
| `equals` | Equal to | `numoperator:equals:100` |
| `lessthan` | Less than | `numoperator:lessthan:500` |
| `lessthanequal` | Less than or equal | `numoperator:lessthanequal:500` |
| `greaterthan` | Greater than | `numoperator:greaterthan:100` |
| `greaterthanequal` | Greater than or equal | `numoperator:greaterthanequal:100` |

---

## Advanced Filter Patterns

### Combining AND/OR with GroupIndex

`GroupIndex` controls how filters combine:

- **Same GroupIndex, same facet** → OR (e.g., `status=Open` OR `status=InProgress`)
- **Same GroupIndex, different facets** → AND (e.g., `status=Open` AND `location=HQ`)
- **Different GroupIndex values** → the resulting groups are OR'd together

```json
{
  "Filters": [
    { "Facet": "status", "Id": "submitted-id", "GroupIndex": 0 },
    { "Facet": "status", "Id": "assigned-id",  "GroupIndex": 0 },
    { "Facet": "agent",  "Id": "agent-id",     "GroupIndex": 0 }
  ]
}
```

Result: Tickets that are (Submitted **OR** Assigned) **AND** assigned to agent. The two `status` filters share a group and facet, so they OR together; the `agent` filter shares the group but has a different facet, so it ANDs with the status group.

### Exclusion with Negative

Use `Negative: true` to exclude matching records:

```json
{
  "Filters": [
    { "Facet": "status", "Id": "resolved-id", "Negative": true },
    { "Facet": "status", "Id": "canceled-id", "Negative": true }
  ]
}
```

Result: All tickets **EXCEPT** those with Resolved or Canceled status.

### Date Range Filtering

Combine date filters for precise ranges:

```json
{
  "Filters": [
    { "Facet": "createddate", "Value": "date>=01/01/2025" },
    { "Facet": "createddate", "Value": "date<=01/31/2025" }
  ]
}
```

Result: Items created in January 2025.

### Numeric Range Filtering

Combine numeric filters for ranges:

```json
{
  "Filters": [
    { "Facet": "purchasedprice", "Value": "numoperator:greaterthanequal:100" },
    { "Facet": "purchasedprice", "Value": "numoperator:lessthanequal:500" }
  ]
}
```

Result: Assets with purchase price between $100 and $500.

---

## Universal Facets

These 6 facets are available across **all three entities** (Tickets, Assets, Users):

| Facet | Field | Tickets Behavior | Assets Behavior | Users Behavior |
|-------|-------|------------------|-----------------|----------------|
| `grade` | Value | Requester's grade | Owner's grade | User's grade |
| `location` | Id | Requester's location | Asset's location | User's location |
| `locationtype` | Id | Requester's location type | Asset location's type | User's location type |
| `role` | Id | Requester's role | Owner's role | User's role |
| `source` | Value | Ticket creation source | Asset import source | User import source |
| `user` | Id | Ticket requester | Asset owner | Specific user |

---

## Ticket Facets

### Assignment Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `agent` | Id | Assigned technician/agent |
| `team` | Id | Assigned team |
| `unassigned` | Name (yes/no) | Tickets without assignment |
| `assignedtome` | Name (yes/no) | Assigned to current user |

### Status & Workflow Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `status` | Id | Current workflow step/status |
| `workflow` | Id | Workflow template |
| `workflowstage` | Id | Workflow stage |
| `workflowstep` | Id | Specific workflow step |
| `ticketstate` | Value | Ticket state (open/closed) |
| `closereason` | Id | Reason for closing |

### Date Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `createddate` | Value | Ticket creation date |
| `modifieddate` | Value | Last modification date |
| `closeddate` | Value | Ticket closure date |
| `duedate` | Value | Due date |
| `activitydate` | Value | Last activity date |

### Issue & Category Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `issuetype` | Id | Issue type |
| `issuecategory` | Id | Issue category |
| `tickettype` | Id | Ticket type |

### SLA Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `sla` | Id | SLA policy |
| `slaresponsetime` | Value | Response time status |
| `slaresolutiontime` | Value | Resolution time status |
| `ispastdue` | Name (yes/no) | Past due status |

### Other Ticket Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `keyword` | Value | Text search |
| `ticketnumber` | Id/Value | Ticket number |
| `prioritylevel` | Id | Priority level |
| `tag` | Id | Ticket tag |
| `isurgent` | Name (yes/no) | Urgent flag |
| `hasassetattached` | Name (yes/no) | Has attached asset |

### Custom Field Facets

Ticket custom fields are searchable using typed facets. Every custom field filter requires two things:

- **`Facet`** — the custom field editor type (e.g., `customfieldtext`)
- **`CustomFieldTypeId`** — the UUID of the specific field definition, obtained from `POST /api/v1.0/custom-fields`

```json
{
  "Filters": [
    {
      "Facet": "customfieldtext",
      "CustomFieldTypeId": "YOUR_CUSTOM_FIELD_UUID",
      "Value": "search text",
      "Selected": true
    }
  ]
}
```

#### Text & String Fields

| Facet | Value Field | Format |
|-------|-------------|--------|
| `customfieldtext` | `Value` | Plain string |
| `customfieldmultilinetext` | `Value` | Plain string |
| `customfieldrichtext` | `Value` | Plain string |
| `customfieldemailmessage` | `Value` | Plain string |
| `customfieldphone` | `Value` | Plain string |
| `customfieldaddress` | `Value` | Plain string |
| `customfieldipaddress` | `Value` | Plain string |
| `customfieldprotectedinfo` | `Value` | Plain string |

#### Numeric Fields

| Facet | Value Field | Format |
|-------|-------------|--------|
| `customfieldnumber` | `Value` | [Numeric expression](#numeric-expression-syntax) (e.g., `numoperator:greaterthan:5`) |
| `customfieldnumberrange` | `Value` | Numeric expression |

#### Date Fields

| Facet | Value Field | Format |
|-------|-------------|--------|
| `customfielddate` | `Value` | [Date expression](#date-expression-syntax) (e.g., `range:lastdays:7`) |
| `customfielddaterange` | `Value` | Date expression |
| `customfielddatetime` | `Value` | Date expression |
| `customfieldscheduleselector` | `Value` | Date expression |

#### Boolean Fields

| Facet | Value Field | Format |
|-------|-------------|--------|
| `customfieldyesno` | `Value` | `"true"` or `"false"` |

#### Select Fields

| Facet | Value Field | Format |
|-------|-------------|--------|
| `customfieldselect` | `Value` | Stored option string |
| `customfieldmultiselect` | `Value` | Stored option string |

#### Entity Reference Fields

| Facet | Id Field | References |
|-------|----------|------------|
| `customfieldusers` | `Id` | UserId |
| `customfieldlocations` | `Id` | LocationId |
| `customfieldassets` | `Id` | AssetId |
| `customfieldtickets` | `Id` | TicketId |
| `customfieldchangerequests` | `Id` | TicketId |
| `customfieldmodels` | `Id` | ModelId |
| `customfieldassetfundingsource` | `Id` | FundingSourceId |
| `customfieldassetstatus` | `Id` | AssetStatusId |
| `customfieldeventroom` | `Id` | RoomId |
| `customfieldeventtype` | `Id` | EventTypeId |

---

## Asset Facets

### Asset Identity Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `asset` | Id | Specific asset |
| `assettag` | Value | Asset tag |
| `assetserialnumber` | Value | Serial number |
| `assetname` | Value | Asset name |
| `assettype` | Id | Asset type/category |
| `keyword` | Value | Text search |

### Ownership Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `user` | Id | Current owner |
| `previousowner` | Id | Previous owner |
| `ownerlocationmismatch` | Name (yes/no) | Owner/asset location mismatch |

### Model & Manufacturer Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `model` | Id | Asset model |
| `modelcategory` | Id | Model category |
| `manufacturer` | Id | Manufacturer |

### Status Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `assetstatus` | Id | Asset status |
| `assetauditstatus` | Id | Audit status |

### Financial Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `purchasedprice` | Value (numeric) | Purchase price |
| `currentbookvalue` | Value (numeric) | Current book value |
| `totalassetcost` | Value (numeric) | Total asset cost |

### Date Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `createddate` | Value (date) | Creation date |
| `modifieddate` | Value (date) | Modification date |
| `purchaseddate` | Value (date) | Purchase date |
| `warrantyexpirationdate` | Value (date) | Warranty expiration |
| `retireddate` | Value (date) | Retirement date |

### Duplicate Detection Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `assetduplicateany` | Name (yes/no) | Any duplicate conflict |
| `assetduplicateassettag` | Name (yes/no) | Duplicate asset tag |
| `assetduplicateserialnumber` | Name (yes/no) | Duplicate serial number |

### Custom Field Facets

All `customfield*` facets require `CustomFieldTypeId` set to the UUID of the specific field definition (from `POST /api/v1.0/custom-fields`).

The legacy `assetcustomfield`, `locationcustomfield`, and `usercustomfield` facets are also supported for backwards compatibility, but the typed facets below are preferred.

#### Text & String Fields

| Facet | Value Field | Format |
|-------|-------------|--------|
| `customfieldtext` | `Value` | Plain string |
| `customfieldmultilinetext` | `Value` | Plain string |
| `customfieldrichtext` | `Value` | Plain string |
| `customfieldemailmessage` | `Value` | Plain string |
| `customfieldphone` | `Value` | Plain string |
| `customfieldaddress` | `Value` | Plain string |
| `customfieldipaddress` | `Value` | Plain string |
| `customfieldprotectedinfo` | `Value` | Plain string |

#### Numeric Fields

| Facet | Value Field | Format |
|-------|-------------|--------|
| `customfieldnumber` | `Value` | Numeric expression |
| `customfieldnumberrange` | `Value` | Numeric expression |

#### Date Fields

| Facet | Value Field | Format |
|-------|-------------|--------|
| `customfielddate` | `Value` | Date expression |
| `customfielddaterange` | `Value` | Date expression |
| `customfielddatetime` | `Value` | Date expression |
| `customfieldscheduleselector` | `Value` | Date expression |

#### Boolean & Select Fields

| Facet | Value Field | Format |
|-------|-------------|--------|
| `customfieldyesno` | `Value` | `"true"` or `"false"` |
| `customfieldselect` | `Value` | Stored option string |
| `customfieldmultiselect` | `Value` | Stored option string |

#### Entity Reference Fields

| Facet | Id Field | References |
|-------|----------|------------|
| `customfieldusers` | `Id` | UserId |
| `customfieldlocations` | `Id` | LocationId |
| `customfieldassets` | `Id` | AssetId |
| `customfieldtickets` | `Id` | TicketId |
| `customfieldchangerequests` | `Id` | TicketId |
| `customfieldmodels` | `Id` | ModelId |
| `customfieldassetfundingsource` | `Id` | FundingSourceId |
| `customfieldassetstatus` | `Id` | AssetStatusId |
| `customfieldeventroom` | `Id` | RoomId |
| `customfieldeventtype` | `Id` | EventTypeId |

---

## User Facets

### Identity Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `user` | Id | Specific user |
| `keyword` | Value | Text search (name, email, username) |
| `username` | Value | Username |
| `email` | Value | Primary email |
| `schoolidnumber` | Value | School ID number |

### Organization Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `role` | Id | User role |
| `location` | Id | Primary location |
| `team` | Id | Team membership |
| `department` | Id | Department |

### Status Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `userstatus` | Id | User status |
| `employmentstatus` | Id | Employment status |

### Device Assignment Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `hasassigneddevice` | Name (yes/no) | Has assigned device |
| `usermultipledevices` | Name (yes/no) | Has multiple devices |

### Duplicate Detection Facets

| Facet | Field | Description |
|-------|-------|-------------|
| `userduplicateany` | Name (yes/no) | Any duplicate conflict |
| `userduplicateemail` | Name (yes/no) | Duplicate email |
| `userduplicateusername` | Name (yes/no) | Duplicate username |

### Custom Field Facets

All `customfield*` facets require `CustomFieldTypeId` set to the UUID of the specific field definition (from `POST /api/v1.0/custom-fields`).

The legacy `usercustomfield` facet is also supported for backwards compatibility, but the typed facets below are preferred.

#### Text & String Fields

| Facet | Value Field | Format |
|-------|-------------|--------|
| `customfieldtext` | `Value` | Plain string |
| `customfieldmultilinetext` | `Value` | Plain string |
| `customfieldrichtext` | `Value` | Plain string |
| `customfieldemailmessage` | `Value` | Plain string |
| `customfieldphone` | `Value` | Plain string |
| `customfieldaddress` | `Value` | Plain string |
| `customfieldipaddress` | `Value` | Plain string |
| `customfieldprotectedinfo` | `Value` | Plain string |

#### Numeric Fields

| Facet | Value Field | Format |
|-------|-------------|--------|
| `customfieldnumber` | `Value` | Numeric expression |
| `customfieldnumberrange` | `Value` | Numeric expression |

#### Date Fields

| Facet | Value Field | Format |
|-------|-------------|--------|
| `customfielddate` | `Value` | Date expression |
| `customfielddaterange` | `Value` | Date expression |
| `customfielddatetime` | `Value` | Date expression |
| `customfieldscheduleselector` | `Value` | Date expression |

#### Boolean & Select Fields

| Facet | Value Field | Format |
|-------|-------------|--------|
| `customfieldyesno` | `Value` | `"true"` or `"false"` |
| `customfieldselect` | `Value` | Stored option string |
| `customfieldmultiselect` | `Value` | Stored option string |

#### Entity Reference Fields

| Facet | Id Field | References |
|-------|----------|------------|
| `customfieldusers` | `Id` | UserId |
| `customfieldlocations` | `Id` | LocationId |
| `customfieldassets` | `Id` | AssetId |
| `customfieldtickets` | `Id` | TicketId |
| `customfieldchangerequests` | `Id` | TicketId |
| `customfieldmodels` | `Id` | ModelId |
| `customfieldassetfundingsource` | `Id` | FundingSourceId |
| `customfieldassetstatus` | `Id` | AssetStatusId |

---

## Locations and Rooms

Locations and Rooms are filterable, but the v2 endpoints that serve them take a
**structurally different filter object** from the v1 Tickets, Assets, and Users searches.

| Endpoint family | Filter shape |
|-----------------|--------------|
| v1 Tickets, Assets, Users | `{ "Facet": "modifieddate", "Value": "date>=01/01/2025" }` |
| v2 Locations, Rooms | `{ "Facet": "ModifiedDate", "Op": "GreaterOrEqual", "Values": ["2025-01-01"] }` |

Two rules are specific to the v2 endpoints:

- **Filters must be nested under `RequestOptions.Filters`.** A top-level `Filters` array is
  ignored, and the request returns unfiltered results with a `200`.
- **The v1 expression grammar returns `500`**, not a validation error. Sending
  `{"Facet": "ModifiedDate", "Value": "date>=01/01/2025"}` to `POST /api/v2.0/locations/all`
  fails with a server error rather than reporting the bad shape.

### Example: Locations Modified Since a Date

```json
{
  "RequestOptions": {
    "Filters": [
      {
        "Facet": "ModifiedDate",
        "Op": "GreaterOrEqual",
        "Values": ["2025-01-01"]
      }
    ]
  }
}
```

The same body works against `POST /api/v2.0/locations/rooms/query`.

### Additional v2 Facets

Locations accept `Location`, `LocationType`, and `Keyword`. Rooms accept `Location`,
`RoomType`, `roomarea`, `roomavailability`, `roomseatingcapacity`, `roommaximumoccupancy`,
`roomisexternallyavailable`, `roompinmapped`, and `roompinunmapped` — all through the same
`Op`/`Values` shape.

:::note
On these two endpoints a facet name that is recognized but not implemented returns a `500`
rather than being discarded. Confirm that each facet actually narrows the result set before
relying on it.
:::

---

## Copy-Paste Examples

### Find Open Tickets Assigned to a Specific Agent

```json
{
  "Filters": [
    {
      "Facet": "agent",
      "Id": "AGENT_USER_ID_HERE"
    },
    {
      "Facet": "status",
      "Id": "RESOLVED_STATUS_ID",
      "Negative": true
    },
    {
      "Facet": "status",
      "Id": "CANCELED_STATUS_ID",
      "Negative": true
    }
  ]
}
```

### Find Tickets Modified in the Last 7 Days

```json
{
  "Filters": [
    {
      "Facet": "modifieddate",
      "Value": "range:lastdays:7"
    }
  ]
}
```

### Find Overdue High-Priority Tickets

```json
{
  "Filters": [
    {
      "Facet": "ispastdue",
      "Name": "yes",
      "Value": "yes"
    },
    {
      "Facet": "prioritylevel",
      "Id": "HIGH_PRIORITY_ID",
      "Name": "High"
    }
  ]
}
```

### Find Assets with Expiring Warranties

```json
{
  "Filters": [
    {
      "Facet": "warrantyexpirationdate",
      "Value": "range:nextdays:90"
    }
  ]
}
```

### Find Assets Purchased Over $500

```json
{
  "Filters": [
    {
      "Facet": "purchasedprice",
      "Value": "numoperator:greaterthan:500"
    }
  ]
}
```

### Find Tickets by a Text Custom Field Value

```json
{
  "Filters": [
    {
      "Facet": "customfieldtext",
      "CustomFieldTypeId": "YOUR_CUSTOM_FIELD_UUID",
      "Value": "search text",
      "Selected": true
    }
  ]
}
```

Combine with other filters to narrow results — for example, open tickets where a "Department" text field equals "IT":

```json
{
  "Filters": [
    {
      "Facet": "customfieldtext",
      "CustomFieldTypeId": "YOUR_DEPARTMENT_FIELD_UUID",
      "Value": "IT",
      "Selected": true
    },
    {
      "Facet": "ticketstate",
      "Id": "00000000-0000-0000-0000-000000000000",
      "Selected": true
    }
  ]
}
```

Get `CustomFieldTypeId` values from `POST /api/v1.0/custom-fields`.

### Find Students at a Specific School

```json
{
  "Filters": [
    {
      "Facet": "role",
      "Id": "STUDENT_ROLE_ID",
      "Name": "Student"
    },
    {
      "Facet": "location",
      "Id": "SCHOOL_LOCATION_ID"
    }
  ]
}
```

### Find Users Without Assigned Devices

```json
{
  "Filters": [
    {
      "Facet": "hasassigneddevice",
      "Name": "no",
      "Value": "no"
    }
  ]
}
```

---

## Obtaining Filter Values

### Filter Catalog Endpoint

Use this endpoint to discover available facets for an entity:

```
GET /api/v1.0/filters/for/entitytype/{entityTypeId}
```

| Entity | Entity Type ID | Facets Returned |
|--------|----------------|-----------------|
| Tickets | `888891ac-91aa-e711-80c2-100dffa00001` | 138 |
| Locations | `888891ac-91aa-e711-80c2-100dffa00002` | 16 |
| Assets | `888891ac-91aa-e711-80c2-100dffa00003` | 104 |
| Users | `888891ac-91aa-e711-80c2-100dffa00004` | 69 |
| Rooms | `888891ac-91aa-e711-80c2-100dffa00041` | 9 |

:::warning The numeric tail is not sequential by entity
`...00002` is **Locations** and `...00003` is **Assets** — the reverse of what guessing
produces. A wrong-but-well-formed entity type ID returns another entity's facet list, or an
empty list, with a `200` and never an error. Check that the returned facet keys match the
entity you asked for.
:::

The "Facets Returned" counts are from a reference tenant. This endpoint reports what the
calling token may use — results are filtered by licensing, permissions, and feature flags —
and it does not enumerate every facet an entity supports, so treat it as a per-tenant
starting point rather than a complete inventory.

### Supporting Endpoints for Filter Values

| Filter Type | Endpoint | Response Field |
|-------------|----------|----------------|
| Workflow Statuses | `GET /api/v1.0/workflows/allproducts/site/{siteId}` | `Steps[].StatusId` |
| Ticket Priorities | `GET /api/v1.0/tickets/priorities` | `Items[].PriorityId` |
| Ticket Statuses | `GET /api/v1.0/tickets/statuses` | `Items[].StatusId` |
| Asset Types | `GET /api/v1.0/assets/types` | `Items[].AssetTypeId` |
| Locations | `GET /api/v2.0/locations/view` | `Items[].LocationId` |
| Roles | `GET /api/v1.0/categories/of/roles` | `Items[].RoleId` |
| Teams | `GET /api/v1.0/teams` | `Items[].TeamId` |
| Issue Types | `GET /api/v1.0/issues/types` | `Items[].IssueTypeId` |

---

## Performance Recommendations

:::tip Tips for efficient filtering
- **Start narrow**: Begin with specific filters (status + agent + date range) before broadening
- **Cache metadata**: Store status IDs, role IDs, location IDs locally rather than fetching per request
- **Use moderate page sizes**: Request 25-50 records per page instead of very large batches
- **Use keyword last**: Keyword searches are expensive; combine with other filters first
- **Verify each filter narrows**: an unrecognized facet is discarded rather than rejected, so confirm `Paging.TotalRows` changes when you add a filter
:::

## Next Steps

- Review [Paging and Sorting](./pagination) for pagination syntax
- Explore [Working with Tickets](./working-with-tickets) for ticket-specific operations
- See [Working with Assets](./working-with-assets) for asset inventory operations

:::warning
This resource is designed for technical administrators. If you are looking for our Incident IQ help guides and announcements, you can find them at our [Help Center](https://help.incidentiq.com/hc/en-us)
:::
