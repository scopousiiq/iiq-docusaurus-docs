---
sidebar_position: 1
---

# Access and API Keys

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To use the Incident IQ API, you need to authenticate your requests with the proper credentials and headers. This guide covers how to obtain API access and structure your requests.

## Required Headers

Every API request must include the following headers:

| Header | Description | Example |
|--------|-------------|---------|
| `Authorization` | Bearer token for authentication | `Bearer eyJhbGciOiJIUzI1...` |
| `SiteId` | Your site's unique identifier (GUID) | `bb6cece8-e4f4-e511-a789-005056bb000e` |
| `Client` | Client identifier | `ApiClient` |
| `Content-Type` | Request body format (for POST/PUT) | `application/json` |
| `ProductId` | Product context (optional) | `88df910c-91aa-e711-80c2-0004ffa00010` |

## Generating an API Token

API tokens are created in the Incident IQ administration area. You must have administrator access to generate tokens.

### Steps to Generate an API Token

1. Log in to your Incident IQ instance as an administrator
2. Navigate to **Admin** > **Developer Tools**
3. Select a **user account** from the dropdown - this determines what resources the API token can access based on that user's permissions
4. Click the **CREATE API TOKEN** button
5. A green modal will appear displaying your new token:

```
Your new API Token is displayed below. Please save this token for your records.
You will not be able to retrieve it again.

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiYjZjZWNlOC1lNGY0LWU1MT...

expires: Dec 18, 2028
```

:::danger Important
Copy and securely store the token immediately. You will not be able to retrieve it again after closing the modal.
:::

:::warning Security Warning
Treat your API token like a password. Never commit tokens to source control, share them in plain text, or expose them in client-side code.
:::

### Token Permissions

The API token inherits all permissions from the user account you selected when creating it. To control what the API can access:

- Create a dedicated service account user for API access
- Assign only the roles and permissions needed for your integration
- Use separate tokens for different integrations with appropriate permission levels

## Finding Your Site Info

The **Developer Tools** page also displays your **Site Info** section with important identifiers you'll need for API calls:

### Site Information

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Your organization name | Spark County Public Schools |
| **Domain** | Your Incident IQ URL | `https://demo.incidentiq.com` |
| **Api Url** | Base URL for API calls | `https://demo.incidentiq.com/api/v1.0` |
| **Site Id** | Required header for all API calls | `bb6cece8-e4f4-e511-a789-005056bb000e` |
| **Time Zone** | Site's configured timezone | Eastern Standard Time |

### Product Information

Each Incident IQ product has its own identifier. Use `ProductId` when you need to scope API calls to a specific product:

| Product | Product Id | Product Key |
|---------|------------|-------------|
| **Ticketing** | `88df910c-91aa-e711-80c2-0004ffa00010` | `iiqtickets` |
| **Assets** | `88df910c-91aa-e711-80c2-0004ffa00050` | `iiqassets` |
| **Facilities** | `88df910c-91aa-e711-80c2-0004ffa00020` | `iiqfacilities` |
| **Change Management** | `88df910c-91aa-e711-80c2-0004ffa00040` | `iiqapprovals` |
| **Human Resources** | `88df910c-91aa-e711-80c2-0004ffa00060` | `iiqhumanresources` |

:::info
Not all products may be enabled for your site. The Developer Tools page will only show products included in your subscription.
:::

## Making Your First Request

Here's a complete example of an authenticated API request. Pagination is done via query parameters (`$s` for page size, `$p` for page index):

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/tickets?$s=10&$p=0" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{}'
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const response = await fetch(
  'https://your-site.incidentiq.com/api/v1.0/tickets?$s=10&$p=0',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'SiteId': 'YOUR_SITE_ID',
      'Client': 'ApiClient',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
);

const data = await response.json();
console.log(`Found ${data.Paging.TotalRows} tickets`);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

url = "https://your-site.incidentiq.com/api/v1.0/tickets?$s=10&$p=0"
headers = {
    "Authorization": "Bearer YOUR_API_TOKEN",
    "SiteId": "YOUR_SITE_ID",
    "Client": "ApiClient",
    "Content-Type": "application/json"
}

response = requests.post(url, json={}, headers=headers)
data = response.json()
print(f"Found {data['Paging']['TotalRows']} tickets")
```

</TabItem>
</Tabs>

## Authentication Errors

If authentication fails, you'll receive one of these responses:

| Status | Meaning | Solution |
|--------|---------|----------|
| 401 Unauthorized | Missing or invalid token | Check your `Authorization` header and ensure the token hasn't expired |
| 403 Forbidden | Token valid but lacks permission | The user account associated with the token doesn't have access to this resource |

## Next Steps

- Try the [Popular APIs](./popular-apis) to explore common endpoints
- Learn about [Paging, Sorting, and Filtering](./pagination) for querying data
- Understand [Products, Sites & Workspaces](./products-sites-workspaces) for multi-tenant contexts

:::warning
This resource is designed for technical administrators. If you are looking for our Incident IQ help guides and announcements, you can find them at our [Help Center](https://help.incidentiq.com/hc/en-us)
:::
