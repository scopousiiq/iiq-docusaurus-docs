---
sidebar_position: 1
---

# Authentication

The IncidentIQ API uses JWT Bearer tokens for authentication. This guide explains how to obtain and use API credentials.

## Obtaining API Credentials

### Step 1: Access Developer Tools

1. Log in to your IncidentIQ instance as an administrator
2. Navigate to **Administration > Developer Tools**
3. Select **API Tokens** from the menu

### Step 2: Generate an API Token

1. Click **Create New Token**
2. Provide a descriptive name for the token
3. Set appropriate permissions/scope
4. Click **Generate**
5. **Important**: Copy and securely store the token - it will only be shown once

### Step 3: Note Your Site ID

Your Site ID is a UUID that identifies your IncidentIQ instance. You can find it:
- In the URL of your IncidentIQ instance
- In Administration > Site Settings
- In the Developer Tools console

## Required Headers

Every API request must include these headers:

| Header | Value | Description |
|--------|-------|-------------|
| `Authorization` | `Bearer YOUR_TOKEN` | Your JWT API token |
| `SiteId` | `YOUR_SITE_ID` | Your site's UUID |
| `Client` | `ApiClient` | Must be exactly "ApiClient" |
| `Content-Type` | `application/json` | For requests with body |

## Example Request

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/tickets" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -H "SiteId: 12345678-1234-1234-1234-123456789abc" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json"
```

## Token Security

### Best Practices

- **Never commit tokens** to source control
- **Rotate tokens** regularly
- **Use environment variables** for token storage
- **Limit token scope** to only required permissions
- **Monitor token usage** in the Developer Tools console

### Token Expiration

API tokens may have an expiration date set during creation. When a token expires:
- API requests will return `401 Unauthorized`
- Generate a new token from Developer Tools
- Update your integration with the new token

## Error Responses

### 401 Unauthorized

```json
{
  "StatusCode": 401,
  "Message": "Invalid or expired token"
}
```

**Causes:**
- Token is invalid or expired
- Token not included in request
- Malformed Authorization header

### 403 Forbidden

```json
{
  "StatusCode": 403,
  "Message": "Insufficient permissions"
}
```

**Causes:**
- Token lacks required permissions for the operation
- User associated with token doesn't have access

## Integration Examples

### JavaScript/Node.js

```javascript
const API_TOKEN = process.env.IIQ_API_TOKEN;
const SITE_ID = process.env.IIQ_SITE_ID;
const BASE_URL = 'https://your-site.incidentiq.com/api/v1.0';

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'SiteId': SITE_ID,
      'Client': 'ApiClient',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  return response.json();
}
```

### Python

```python
import os
import requests

API_TOKEN = os.environ.get('IIQ_API_TOKEN')
SITE_ID = os.environ.get('IIQ_SITE_ID')
BASE_URL = 'https://your-site.incidentiq.com/api/v1.0'

def api_request(endpoint, method='GET', data=None):
    headers = {
        'Authorization': f'Bearer {API_TOKEN}',
        'SiteId': SITE_ID,
        'Client': 'ApiClient',
        'Content-Type': 'application/json'
    }

    response = requests.request(
        method,
        f'{BASE_URL}{endpoint}',
        headers=headers,
        json=data
    )

    return response.json()
```

### PowerShell

```powershell
$ApiToken = $env:IIQ_API_TOKEN
$SiteId = $env:IIQ_SITE_ID
$BaseUrl = "https://your-site.incidentiq.com/api/v1.0"

$Headers = @{
    "Authorization" = "Bearer $ApiToken"
    "SiteId" = $SiteId
    "Client" = "ApiClient"
    "Content-Type" = "application/json"
}

Invoke-RestMethod -Uri "$BaseUrl/tickets" -Headers $Headers -Method Get
```
