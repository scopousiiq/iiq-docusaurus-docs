---
sidebar_position: 7
---

# Working with Assets

Complete guide to asset management operations in the IncidentIQ API.

## Overview

Assets represent physical and digital items tracked in IncidentIQ - computers, monitors, software licenses, and more.

## Listing Assets

### Basic Search

```json
POST /api/v1.0/assets
{
  "Paging": {
    "PageIndex": 0,
    "PageSize": 25
  }
}
```

### Filtered Search

```json
POST /api/v1.0/assets
{
  "Filters": [
    { "Facet": "CategoryId", "Values": ["laptop-category-id"] },
    { "Facet": "StatusId", "Values": ["deployed-status-id"] }
  ],
  "Sort": { "Field": "Name", "Direction": "Ascending" },
  "Paging": { "PageIndex": 0, "PageSize": 50 }
}
```

## Getting a Single Asset

```http
GET /api/v1.0/assets/{assetId}
```

Response:
```json
{
  "Item": {
    "AssetId": "uuid",
    "Name": "Laptop-12345",
    "AssetTag": "IIQ-12345",
    "SerialNumber": "ABC123XYZ",
    "CategoryId": "uuid",
    "CategoryName": "Laptop",
    "StatusId": "uuid",
    "StatusName": "Deployed",
    "LocationId": "uuid",
    "LocationName": "Main Office",
    "OwnerId": "uuid",
    "OwnerName": "Jane Doe",
    "ModelId": "uuid",
    "ModelName": "ThinkPad T480"
  }
}
```

## Creating an Asset

```json
POST /api/v1.0/assets/create
{
  "Name": "Laptop-NEW-001",
  "AssetTag": "IIQ-2024-001",
  "SerialNumber": "SN123456789",
  "CategoryId": "laptop-category-uuid",
  "ModelId": "thinkpad-t480-model-uuid",
  "StatusId": "available-status-uuid",
  "LocationId": "warehouse-location-uuid",
  "PurchaseDate": "2024-01-15",
  "PurchasePrice": 1299.99
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `CategoryId` | UUID | Asset category |
| `Name` | string | Asset name/identifier |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `AssetTag` | string | Internal tracking tag |
| `SerialNumber` | string | Manufacturer serial |
| `ModelId` | UUID | Asset model |
| `StatusId` | UUID | Current status |
| `LocationId` | UUID | Current location |
| `OwnerId` | UUID | Assigned owner |
| `PurchaseDate` | date | Purchase date |
| `PurchasePrice` | decimal | Purchase cost |
| `WarrantyExpiration` | date | Warranty end date |
| `CustomFields` | object | Custom field values |

## Updating an Asset

```json
PUT /api/v1.0/assets/{assetId}
{
  "LocationId": "new-location-uuid",
  "StatusId": "deployed-status-uuid"
}
```

## Asset Checkout/Checkin

### Checkout to User

Assign an asset to a user:

```json
POST /api/v1.0/assets/{assetId}/checkout
{
  "UserId": "user-uuid",
  "Notes": "Issued for remote work setup"
}
```

### Checkin from User

Return an asset from a user:

```json
POST /api/v1.0/assets/{assetId}/checkin
{
  "Notes": "Returned in good condition",
  "LocationId": "storage-location-uuid"
}
```

## Asset History

### View Activity History

```http
GET /api/v1.0/assets/{assetId}/activities
```

Returns checkout/checkin history, status changes, and modifications.

## Asset Relationships

### Link Asset to Ticket

```json
POST /api/v1.0/assets/{assetId}/tickets
{
  "TicketId": "ticket-uuid"
}
```

### List Related Tickets

```http
GET /api/v1.0/assets/{assetId}/tickets
```

## Bulk Operations

### Bulk Update

```json
POST /api/v1.0/assets/bulk-update
{
  "AssetIds": ["asset-1", "asset-2", "asset-3"],
  "Updates": {
    "StatusId": "retired-status-uuid",
    "LocationId": "storage-location-uuid"
  }
}
```

### Bulk Checkout

```json
POST /api/v1.0/assets/bulk-checkout
{
  "AssetIds": ["asset-1", "asset-2"],
  "UserId": "user-uuid",
  "Notes": "New hire equipment setup"
}
```

## Inventory Workflow Example

```javascript
// 1. Search for available laptops
const available = await searchAssets({
  Filters: [
    { Facet: "CategoryId", Values: ["laptop-category-id"] },
    { Facet: "StatusId", Values: ["available-status-id"] }
  ]
});

// 2. Select and checkout to new employee
const selectedAsset = available.Items[0];
await checkoutAsset(selectedAsset.AssetId, {
  UserId: "new-employee-id",
  Notes: "New hire onboarding"
});

// 3. Create associated ticket for setup
await createTicket({
  Subject: "New laptop setup for " + selectedAsset.Name,
  CategoryId: "setup-category-id",
  AssetIds: [selectedAsset.AssetId]
});
```

## Custom Fields

Assets support custom fields for additional tracking:

```json
POST /api/v1.0/assets/create
{
  "Name": "Laptop-001",
  "CategoryId": "laptop-category-uuid",
  "CustomFields": {
    "mac-address-field-id": "AA:BB:CC:DD:EE:FF",
    "encryption-status-field-id": "BitLocker Enabled"
  }
}
```
