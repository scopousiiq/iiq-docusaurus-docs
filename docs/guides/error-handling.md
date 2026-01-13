---
sidebar_position: 4
---

# Error Handling

Understanding and handling API errors in your IncidentIQ integrations.

## Response Codes

### Success Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 204 | No Content | Request succeeded, no response body |

### Client Error Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid request format or parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource conflict (e.g., duplicate) |
| 422 | Unprocessable | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |

### Server Error Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 500 | Internal Server Error | Unexpected server error |
| 502 | Bad Gateway | Upstream service error |
| 503 | Service Unavailable | Server temporarily unavailable |

## Error Response Format

```json
{
  "StatusCode": 400,
  "Message": "Validation failed",
  "Errors": [
    {
      "Field": "Subject",
      "Message": "Subject is required"
    }
  ],
  "CorrelationId": "abc123-def456"
}
```

## Common Errors

### Authentication Errors

**401 Unauthorized**
```json
{
  "StatusCode": 401,
  "Message": "Invalid or expired token"
}
```

**Solution**: Verify your token is valid and correctly formatted in the Authorization header.

### Validation Errors

**422 Unprocessable Entity**
```json
{
  "StatusCode": 422,
  "Message": "Validation failed",
  "Errors": [
    { "Field": "Subject", "Message": "Subject cannot be empty" },
    { "Field": "CategoryId", "Message": "Invalid category ID" }
  ]
}
```

**Solution**: Review the `Errors` array and correct the invalid fields.

### Not Found Errors

**404 Not Found**
```json
{
  "StatusCode": 404,
  "Message": "Ticket not found"
}
```

**Solution**: Verify the resource ID exists and you have permission to access it.

## Error Handling Patterns

### JavaScript

```javascript
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.StatusCode, data.Message, data.Errors);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      // Handle known API errors
      console.error(`API Error ${error.code}: ${error.message}`);

      if (error.code === 401) {
        // Handle auth refresh
      } else if (error.code === 429) {
        // Handle rate limiting with backoff
      }

      throw error;
    }

    // Handle network errors
    throw new Error(`Network error: ${error.message}`);
  }
}

class ApiError extends Error {
  constructor(code, message, errors = []) {
    super(message);
    this.code = code;
    this.errors = errors;
  }
}
```

### Python

```python
class ApiError(Exception):
    def __init__(self, code, message, errors=None):
        self.code = code
        self.message = message
        self.errors = errors or []
        super().__init__(f"API Error {code}: {message}")

def api_request(endpoint, method='GET', data=None):
    try:
        response = requests.request(
            method,
            f'{BASE_URL}{endpoint}',
            headers=get_auth_headers(),
            json=data
        )

        result = response.json()

        if not response.ok:
            raise ApiError(
                result.get('StatusCode'),
                result.get('Message'),
                result.get('Errors')
            )

        return result

    except requests.RequestException as e:
        raise Exception(f"Network error: {e}")
```

## Rate Limiting

### Rate Limit Response

```json
{
  "StatusCode": 429,
  "Message": "Rate limit exceeded",
  "RetryAfter": 60
}
```

### Implementing Backoff

```javascript
async function requestWithRetry(endpoint, options, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await apiRequest(endpoint, options);
    } catch (error) {
      if (error.code === 429 && attempt < maxRetries - 1) {
        const retryAfter = error.retryAfter || Math.pow(2, attempt) * 1000;
        console.log(`Rate limited. Retrying in ${retryAfter}ms...`);
        await sleep(retryAfter);
        continue;
      }
      throw error;
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

## Debugging Tips

1. **Check the CorrelationId** - Include it when contacting support
2. **Review request/response** - Log full payloads during development
3. **Validate inputs** - Check data types and required fields before sending
4. **Test with Postman** - Isolate API issues from code issues
5. **Monitor error rates** - Track errors to identify patterns
