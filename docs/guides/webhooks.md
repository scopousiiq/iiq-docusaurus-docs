---
sidebar_position: 10
---

# Web Hooks

Web hooks enable real-time integration with the Incident IQ platform. When configured as a rule action, Incident IQ sends an HTTP request to your specified URL whenever the rule's conditions are met.

## How Web Hooks Work

1. **Create a Rule** in Incident IQ with your trigger conditions
2. **Select "webhook"** as the rule action
3. **Configure** the request type (GET or POST) and target URL
4. **Add variables** to pass ticket/asset data in the request body
5. **Trigger** occurs when a record matches the rule conditions

:::info Near Real-Time
Web hook notifications are triggered within moments of a record change, making them ideal for keeping external systems synchronized.
:::

## Configuring Web Hooks

Web hooks are configured through the Rules engine:

1. Navigate to **Administration** > **Rules** in the left sidebar
2. Click **Create New Rule**
3. Configure your rule conditions (e.g., "When ticket status changes to Closed")
4. For the action, select **webhook**
5. Choose the request type: **GET** or **POST**
6. Enter your target **URL**

### POST Request Configuration

For POST webhooks, you can include Incident IQ data in the request body using variables:

**Headers:**
| Key | Value |
|-----|-------|
| `Content-Type` | `application/json` |

**Body Example:**
```json
{
    "ticketId": "{Ticket.TicketId}",
    "ticketNumber": "{Ticket.TicketNumber}",
    "subject": "{Ticket.TicketSubject}",
    "status": "{Ticket.TicketStatusName}",
    "assignedTo": "{Ticket.AssignedUserEmail}",
    "location": "{Ticket.LocationName}",
    "priority": "{Ticket.TicketPriority}"
}
```

:::warning URL Encoding
String values in webhook payloads are URL-encoded. This means characters like `@` in email addresses become `%40`, spaces become `%20`, and colons in datetime strings become `%3A`. Your receiving application should URL-decode these values before processing them.
:::

## Cross-Entity Context

Some webhook rule types support **cross-entity context**, allowing you to access variables from related entities in a single webhook payload. This is powerful for building rich notifications without additional API calls.

### Available Context by Rule Type

| Rule Type | Primary Variables | Cross-Entity Variables Available |
|-----------|-------------------|----------------------------------|
| **Ticket Rules** | `{Ticket.*}` | `{Asset.*}`, `{Location.*}`, `{User.*}`, `{CurrentUser.*}`, `{Now.*}` |
| **Asset Rules** | `{Asset.*}` | `{Location.*}`, `{User.*}`, `{CurrentUser.*}`, `{Now.*}` |
| **User Rules** | `{User.*}` | `{Location.*}`, `{CurrentUser.*}`, `{Now.*}` |
| **Event Rules** | `{Event.*}` | None (entity-only) |

### How Cross-Entity Context Works

- **Ticket Rules**: The `{Asset.*}` variables reference the **first asset** linked to the ticket. `{Location.*}` is the ticket's location. `{User.*}` is the ticket owner.
- **Asset Rules**: `{Location.*}` is the asset's assigned location (if any). `{User.*}` is the asset's current owner (if checked out).
- **User Rules**: `{Location.*}` is the user's assigned location.
- **All Rules**: `{CurrentUser.*}` is the user who triggered the rule action. `{Now.Date}` and `{Now.Time}` provide the current timestamp in the site's timezone.

### Cross-Entity Example

A ticket webhook can include asset, location, and user data in one payload:

```json
{
    "ticketNumber": "{Ticket.TicketNumber}",
    "ticketSubject": "{Ticket.TicketSubject}",
    "linkedAsset": {
        "assetTag": "{Asset.AssetTag}",
        "serialNumber": "{Asset.SerialNumber}",
        "model": "{Asset.ManufacturerModelName}"
    },
    "location": {
        "name": "{Location.LocationName}",
        "room": "{Location.LocationRoomName}",
        "type": "{Location.LocationTypeName}"
    },
    "ticketOwner": {
        "name": "{User.FirstName} {User.LastName}",
        "email": "{User.Email}",
        "role": "{User.RoleName}"
    },
    "triggeredBy": "{CurrentUser.Email}",
    "triggeredAt": "{Now.Date} {Now.Time}"
}
```

:::info Context Availability
Cross-entity variables only resolve if the relationship exists. For example, `{Asset.*}` in a ticket webhook only works if the ticket has a linked asset. If no asset is linked, those variables will be empty.
:::

## Available Ticket Variables

Use these variables in your webhook body with the format `{Ticket.VariableName}`:

### Core Ticket Fields

| Variable | Description |
|----------|-------------|
| `SiteId` | Site identifier |
| `SiteName` | Site name |
| `ProductId` | Product identifier |
| `TicketId` | Unique ticket GUID |
| `TicketNumber` | Human-readable ticket number |
| `TicketSubject` | Ticket subject line |
| `TicketPriority` | Priority level |
| `IssueDescription` | Full issue description |
| `AdditionalDetails` | Additional details field |

### Dates & Timestamps

| Variable | Description |
|----------|-------------|
| `TicketCreatedDate` | When ticket was created |
| `TicketModifiedDate` | Last modification date |
| `TicketStartedDate` | When work started |
| `TicketClosedDate` | When ticket was closed |
| `TicketDueDate` | Due date |

### Status & Workflow

| Variable | Description |
|----------|-------------|
| `TicketStatusId` | Current status GUID |
| `TicketStatusName` | Current status name |
| `PreviousTicketStatusId` | Previous status GUID |
| `PreviousTicketStatusName` | Previous status name |
| `WorkflowId` | Workflow GUID |
| `WorkflowName` | Workflow name |
| `WorkflowStepId` | Current workflow step GUID |
| `WorkflowStepName` | Current workflow step name |
| `IsClosed` | Boolean - is ticket closed |

### Issue Classification

| Variable | Description |
|----------|-------------|
| `IssueId` | Issue GUID |
| `IssueTypeId` | Issue type GUID |
| `IssueTypeName` | Issue type name |
| `IssueCategoryId` | Category GUID |
| `IssueCategoryName` | Category name |
| `CloseReasonTypeId` | Close reason GUID |
| `CloseReasonName` | Close reason text |

### People - Requester (For)

| Variable | Description |
|----------|-------------|
| `ForId` | Requester user GUID |
| `ForFirstName` | Requester first name |
| `ForLastName` | Requester last name |
| `ForEmail` | Requester email |
| `ForLocationId` | Requester location GUID |
| `ForSchoolIdNumber` | Requester school ID |
| `ForRoleId` | Requester role GUID |
| `ForRoleName` | Requester role name |

### People - Owner (Submitter)

| Variable | Description |
|----------|-------------|
| `OwnerId` | Owner user GUID |
| `OwnerFirstName` | Owner first name |
| `OwnerLastName` | Owner last name |
| `OwnerEmail` | Owner email |
| `OwnerLocationId` | Owner location GUID |
| `OwnerRoleId` | Owner role GUID |

### People - Assigned Agent

| Variable | Description |
|----------|-------------|
| `AssignedToUserId` | Assigned user GUID |
| `AssignedUserFirstName` | Assigned user first name |
| `AssignedUserLastName` | Assigned user last name |
| `AssignedUserEmail` | Assigned user email |
| `AssignedUserLocationId` | Assigned user location |
| `AssignedToTeamId` | Assigned team GUID |
| `AssignedTeamName` | Assigned team name |

### Location

| Variable | Description |
|----------|-------------|
| `LocationId` | Location GUID |
| `LocationName` | Location name |
| `LocationDetails` | Location details |
| `LocationAbbreviation` | Location abbreviation |
| `LocationRoomId` | Room GUID |
| `LocationRoomName` | Room name |
| `LocationRoomDescription` | Room description |
| `LocationTypeId` | Location type GUID |
| `LocationTypeName` | Location type name |

### SLA Information

| Variable | Description |
|----------|-------------|
| `ServiceLevelAgreementId` | SLA GUID |
| `ServiceLevelAgreementName` | SLA name |
| `ServiceLevelAgreementResolutionTime` | Target resolution time |
| `ServiceLevelAgreementResponseTime` | Target response time |
| `ActualResponseTime` | Actual response time |
| `ActualResolutionTime` | Actual resolution time |

### Additional Data

| Variable | Description |
|----------|-------------|
| `Assets` | Associated assets |
| `Tags` | Ticket tags |
| `CustomFieldValues` | Custom field data |
| `Attachments` | Attached files |
| `TicketFollowerUserIds` | Follower user GUIDs |
| `TicketFollowerTeamIds` | Follower team GUIDs |
| `TicketSurveys` | Survey responses |
| `OverallSurveyRating` | Survey rating |
| `IsTraining` | Is training ticket |
| `HasSensitiveInformation` | Contains sensitive info |
| `TicketIsUrgent` | Is marked urgent |

## Available Asset Variables

Use these variables in your webhook body with the format `{Asset.VariableName}`:

### Core Asset Fields

| Variable | Description |
|----------|-------------|
| `SiteId` | Site identifier |
| `SiteName` | Site name |
| `ProductId` | Product identifier |
| `AssetId` | Unique asset GUID |
| `AssetTag` | Asset barcode/tag identifier |
| `AssetName` | Display name of the asset |
| `SerialNumber` | Serial number |
| `Notes` | Asset notes/description |

### Asset Classification

| Variable | Description |
|----------|-------------|
| `AssetTypeId` | Asset type GUID |
| `AssetTypeName` | Asset type name |
| `CategoryId` | Asset category GUID |
| `CategoryName` | Asset category name |
| `ParentCategoryId` | Parent category GUID |
| `ParentCategoryName` | Parent category name |

### Asset Status & Lifecycle

| Variable | Description |
|----------|-------------|
| `AssetStatusTypeId` | Status type GUID |
| `AssetStatusTypeName` | Status name |
| `AssetStatusIsRetired` | Whether asset is retired (boolean) |
| `AssetCreatedDate` | When asset was created |
| `AssetModifiedDate` | Last modification date |
| `DeployedDate` | Deployment date |
| `RetiredDate` | Retirement date |

### Model & Manufacturer

| Variable | Description |
|----------|-------------|
| `ModelId` | Model GUID |
| `ModelName` | Model name |
| `ManufacturerId` | Manufacturer GUID |
| `ManufacturerName` | Manufacturer name |
| `ManufacturerModelName` | Full manufacturer model name |

### Purchase & Financial

| Variable | Description |
|----------|-------------|
| `PurchasedDate` | Purchase date |
| `PurchasePrice` | Purchase price |
| `PurchasePoNumber` | PO number |
| `InvoiceNumber` | Invoice number |
| `Vendor` | Vendor name |
| `FundingSourceTypeId` | Funding source GUID |
| `FundingSourceTypeName` | Funding source name |

### Warranty & Insurance

| Variable | Description |
|----------|-------------|
| `WarrantyExpirationDate` | Warranty expiration date |
| `WarrantyInfo` | Warranty details |
| `InsuranceExpirationDate` | Insurance expiration date |
| `InsuranceInfo` | Insurance details |

### Asset Location

| Variable | Description |
|----------|-------------|
| `LocationId` | Location GUID |
| `LocationName` | Location name |
| `LocationDetails` | Location details |
| `LocationRoomId` | Room GUID |
| `LocationRoomName` | Room name |
| `LocationRoomDescription` | Room description |
| `LocationTypeId` | Location type GUID |
| `LocationTypeName` | Location type name |
| `StorageLocationId` | Storage location GUID |
| `StorageLocationName` | Storage location name |
| `StorageUnitNumber` | Storage unit identifier |
| `StorageSlotNumber` | Storage slot number |

### Current Owner

| Variable | Description |
|----------|-------------|
| `OwnerId` | Owner user GUID |
| `OwnerFirstName` | Owner first name |
| `OwnerLastName` | Owner last name |
| `OwnerEmail` | Owner email |
| `OwnerUsername` | Owner username |
| `OwnerRoleId` | Owner role GUID |
| `OwnerRoleName` | Owner role name |
| `OwnerSchoolIdNumber` | Owner school ID |
| `OwnerHomeroom` | Owner homeroom |
| `OwnerGrade` | Owner grade level |
| `OwnerLocationId` | Owner's location GUID |
| `OwnerDepartmentId` | Owner department GUID |

### Previous Owner (Checkout History)

| Variable | Description |
|----------|-------------|
| `PreviousOwnerId` | Previous owner GUID |
| `PreviousOwnerFirstName` | Previous owner first name |
| `PreviousOwnerLastName` | Previous owner last name |
| `PreviousOwnerEmail` | Previous owner email |
| `PreviousOwnerUsername` | Previous owner username |
| `PreviousOwnerRoleId` | Previous owner role GUID |
| `PreviousOwnerRoleName` | Previous owner role name |
| `PreviousOwnerSchoolIdNumber` | Previous owner school ID |
| `PreviousOwnerHomeroom` | Previous owner homeroom |
| `PreviousOwnerGrade` | Previous owner grade level |
| `PreviousOwnerLocationId` | Previous owner location GUID |

## Available User Variables

Use these variables in your webhook body with the format `{User.VariableName}`:

### Identity & Account

| Variable | Description |
|----------|-------------|
| `UserId` | Unique user GUID |
| `SiteId` | Site identifier |
| `SiteName` | Site name |
| `Username` | Login username |
| `Email` | Primary email address |
| `ExternalId` | External system ID |

### Basic Information

| Variable | Description |
|----------|-------------|
| `FirstName` | First name |
| `LastName` | Last name |
| `FullName` | Full name (first last) |
| `FullNameReversed` | Full name (last, first) |
| `Phone` | Primary phone number |
| `PersonalEmail` | Personal email address |
| `HomePhone` | Home phone number |
| `Pronouns` | Preferred pronouns |
| `PhotoId` | Profile photo GUID |

### Professional & Education

| Variable | Description |
|----------|-------------|
| `JobTitle` | Job title |
| `Supervisor` | Supervisor name |
| `Grade` | Grade level (for students) |
| `Homeroom` | Homeroom assignment |
| `SchoolIdNumber` | School ID number |

### Location & Organization

| Variable | Description |
|----------|-------------|
| `LocationId` | Assigned location GUID |
| `LocationName` | Assigned location name |
| `LocationTypeId` | Location type GUID |
| `LocationTypeName` | Location type name |
| `DepartmentId` | Department GUID |
| `DepartmentName` | Department name |

## Common Use Cases

### Slack Notifications

Send ticket updates to a Slack channel:

```json
{
    "text": "Ticket #{Ticket.TicketNumber} - {Ticket.TicketSubject}",
    "attachments": [{
        "color": "#36a64f",
        "fields": [
            {"title": "Status", "value": "{Ticket.TicketStatusName}", "short": true},
            {"title": "Assigned To", "value": "{Ticket.AssignedUserFirstName} {Ticket.AssignedUserLastName}", "short": true},
            {"title": "Location", "value": "{Ticket.LocationName}", "short": true},
            {"title": "Priority", "value": "{Ticket.TicketPriority}", "short": true}
        ]
    }]
}
```

### Microsoft Teams

Post to a Teams channel via incoming webhook:

```json
{
    "@type": "MessageCard",
    "summary": "Ticket Update",
    "sections": [{
        "activityTitle": "Ticket #{Ticket.TicketNumber}",
        "facts": [
            {"name": "Subject", "value": "{Ticket.TicketSubject}"},
            {"name": "Status", "value": "{Ticket.TicketStatusName}"},
            {"name": "Requester", "value": "{Ticket.ForFirstName} {Ticket.ForLastName}"}
        ]
    }]
}
```

### External System Integration

Sync ticket data to an external ITSM or CRM:

```json
{
    "source": "IncidentIQ",
    "siteId": "{Ticket.SiteId}",
    "ticketId": "{Ticket.TicketId}",
    "ticketNumber": "{Ticket.TicketNumber}",
    "subject": "{Ticket.TicketSubject}",
    "description": "{Ticket.IssueDescription}",
    "status": "{Ticket.TicketStatusName}",
    "priority": "{Ticket.TicketPriority}",
    "createdDate": "{Ticket.TicketCreatedDate}",
    "requesterEmail": "{Ticket.ForEmail}",
    "assignedEmail": "{Ticket.AssignedUserEmail}",
    "location": "{Ticket.LocationName}"
}
```

### Asset Checkout Notification

Send notification when an asset is checked out:

```json
{
    "event": "asset_checkout",
    "assetId": "{Asset.AssetId}",
    "assetTag": "{Asset.AssetTag}",
    "assetName": "{Asset.AssetName}",
    "serialNumber": "{Asset.SerialNumber}",
    "model": "{Asset.ManufacturerModelName}",
    "checkedOutTo": {
        "userId": "{Asset.OwnerId}",
        "name": "{Asset.OwnerFirstName} {Asset.OwnerLastName}",
        "email": "{Asset.OwnerEmail}",
        "grade": "{Asset.OwnerGrade}",
        "schoolId": "{Asset.OwnerSchoolIdNumber}"
    },
    "location": "{Asset.LocationName}",
    "deployedDate": "{Asset.DeployedDate}"
}
```

## Best Practices

- **Use HTTPS**: Always use secure endpoints for webhook URLs
- **Respond Quickly**: Return a 2xx status code promptly; process data asynchronously if needed
- **Handle Retries**: Implement idempotent processing in case of duplicate deliveries
- **Validate Input**: Verify incoming data before processing
- **Monitor Failures**: Set up alerting for webhook delivery failures
- **Test First**: Use the rule testing features to verify webhooks before enabling in production

## Comparison: Web Hooks vs. API Polling

| Approach | Best For | Trade-offs |
|----------|----------|------------|
| **Web Hooks** | Real-time updates, event-driven workflows | Requires publicly accessible endpoint |
| **API Polling** | Batch processing, scheduled syncs | Higher latency, more API calls |

:::warning
This resource is designed for technical administrators. If you are looking for our Incident IQ help guides and announcements, you can find them at our [Help Center](https://help.incidentiq.com/hc/en-us)
:::
