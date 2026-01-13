# Custom Fields API

The Custom Fields API enables you to extend IncidentIQ with organization-specific data. Create, configure, and manage custom fields for tickets, assets, users, and other entities.

## Overview

Custom fields allow you to capture data unique to your organization beyond the standard IncidentIQ fields.

:::info
**What you can do with the Custom Fields API**
:::

>
> - **Define custom field types** including text, dropdowns, dates, numbers, and checkboxes
> - **Manage field values** on tickets, assets, and other entities
> - **Configure field mappings** for imports and integrations
> - **Control visibility** and required status per field
> - **Handle multi-select and dependent fields** for complex data capture

## Common Use Cases

### Data Migration
Map external system fields to IncidentIQ custom fields during data imports.

### Integration Sync
Store external system IDs or sync status in custom fields for bidirectional integrations.

### Compliance Tracking
Add fields for warranty dates, purchase orders, funding sources, or grant codes.

### Workflow Data
Capture additional information needed for specific workflows, like approval codes or department cost centers.

### Reporting Enhancement
Add filterable custom fields to enable specialized reporting and dashboards.

## API Sections

| Section | Description |
|---------|-------------|
| **Fields** | Manage custom field definitions and configurations |
| **Types** | Access available field types and their properties |
| **Values** | Read and write custom field values on entities |
| **Mappings** | Configure field mappings for imports |
| **Utilities** | Helper endpoints for field operations |
| **Discovering** | Find available custom fields for entities |
| **Setting** | Set custom field values on records |
| **Deleting** | Remove custom field values or definitions |

## Quick Start

### List Custom Fields for Tickets

**cURL
**

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/custom-fields/ticket" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

**JavaScript
**

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/custom-fields/ticket', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'SiteId': 'YOUR_SITE_ID',
    'Client': 'ApiClient'
  }
});

const data = await response.json();
// Returns field definitions with: CustomFieldId, Name, FieldType, Options
console.log(data.Items);
```

**Python
**

```python
import requests

response = requests.get(
    'https://your-site.incidentiq.com/api/v1.0/custom-fields/ticket',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'SiteId': 'YOUR_SITE_ID',
        'Client': 'ApiClient'
    }
)

data = response.json()
# Returns field definitions with: CustomFieldId, Name, FieldType, Options
print(data['Items'])
```


---

### Get Custom Field Values for an Entity

**cURL
**

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/custom-fields/values/{entityId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

**JavaScript
**

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/custom-fields/values/{entityId}', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'SiteId': 'YOUR_SITE_ID',
    'Client': 'ApiClient'
  }
});

const data = await response.json();
// Returns array of { CustomFieldId, Value } pairs
console.log(data.Items);
```

**Python
**

```python
import requests

response = requests.get(
    'https://your-site.incidentiq.com/api/v1.0/custom-fields/values/{entityId}',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'SiteId': 'YOUR_SITE_ID',
        'Client': 'ApiClient'
    }
)

data = response.json()
# Returns array of { CustomFieldId, Value } pairs
print(data['Items'])
```


---

### Set Custom Field Value

**cURL
**

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/custom-fields/values" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "EntityId": "TICKET_OR_ASSET_UUID",
    "CustomFieldId": "FIELD_UUID",
    "Value": "Field value here"
  }'
```

**JavaScript
**

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/custom-fields/values', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'SiteId': 'YOUR_SITE_ID',
    'Client': 'ApiClient',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    EntityId: 'TICKET_OR_ASSET_UUID',
    CustomFieldId: 'FIELD_UUID',
    Value: 'Field value here'
  })
});

const data = await response.json();
console.log(data);
```

**Python
**

```python
import requests

response = requests.post(
    'https://your-site.incidentiq.com/api/v1.0/custom-fields/values',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'SiteId': 'YOUR_SITE_ID',
        'Client': 'ApiClient',
        'Content-Type': 'application/json'
    },
    json={
        'EntityId': 'TICKET_OR_ASSET_UUID',
        'CustomFieldId': 'FIELD_UUID',
        'Value': 'Field value here'
    }
)

print(response.json())
```


---

## Key Concepts

:::info
**Field Types**
:::

>
> Custom fields support various data types:
> - **Text** - Free-form text input
> - **Dropdown** - Single selection from predefined options
> - **Multi-Select** - Multiple selections from predefined options
> - **Date** - Date picker
> - **Number** - Numeric input with optional validation
> - **Checkbox** - Boolean true/false
> - **User Picker** - Select a user from the system

### Entity Types
Custom fields can be attached to different entity types: Tickets, Assets, Users, Locations, and Models.

:::warning
**Required Fields**
:::

>
> Fields can be marked as required, which enforces data entry during creation or editing. Plan your required fields carefully to avoid blocking workflows.

### Scope
Custom fields can be scoped to specific categories, issue types, or asset types to show only relevant fields.

## Related APIs

- [Tickets](#/Tickets) - Apply custom fields to tickets
- [Assets](#/Assets) - Apply custom fields to assets
- [Categories](#/Categories) - Scope fields to categories
