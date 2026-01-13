---
sidebar_position: 2
---

# API Tokens

Detailed guide on managing API tokens in IncidentIQ.

## Token Types

### User Tokens

Personal tokens tied to a specific user account:
- Inherit the user's permissions
- Actions are logged as that user
- Expire when the user is deactivated

### Service Account Tokens

Tokens for automated integrations:
- Not tied to a specific user
- Configurable permissions
- Recommended for production integrations

## Creating Tokens

### Via Developer Tools

1. Navigate to **Administration > Developer Tools**
2. Select **API Tokens**
3. Click **Create New Token**
4. Configure token settings:
   - **Name**: Descriptive identifier
   - **Expiration**: Optional expiry date
   - **Permissions**: Access scope
5. Click **Generate**

### Token Properties

| Property | Description |
|----------|-------------|
| Name | Human-readable identifier |
| Created | Timestamp of creation |
| Expires | Expiration date (if set) |
| Last Used | Most recent API call |
| Permissions | Granted access scope |

## Managing Tokens

### Viewing Tokens

The Developer Tools console shows all active tokens with:
- Usage statistics
- Last activity timestamp
- Expiration status

### Revoking Tokens

To revoke a compromised or unused token:
1. Navigate to **Developer Tools > API Tokens**
2. Find the token to revoke
3. Click **Revoke**
4. Confirm the action

**Note**: Revocation is immediate - all requests using that token will fail.

### Rotating Tokens

Best practice is to rotate tokens periodically:

1. Create a new token with the same permissions
2. Update your integration to use the new token
3. Verify the integration works correctly
4. Revoke the old token

## Permissions

### Available Scopes

| Scope | Description |
|-------|-------------|
| `tickets:read` | Read ticket data |
| `tickets:write` | Create/update tickets |
| `assets:read` | Read asset data |
| `assets:write` | Create/update assets |
| `users:read` | Read user data |
| `users:write` | Manage users |
| `admin` | Full administrative access |

### Least Privilege Principle

Always grant the minimum permissions required:
- Read-only integrations should not have write access
- Single-purpose integrations should be scoped to specific entities
- Audit tokens regularly and reduce scope where possible

## Troubleshooting

### Token Not Working

1. **Verify token is active** - Check Developer Tools
2. **Check expiration** - Token may have expired
3. **Verify headers** - Ensure correct Authorization format
4. **Check permissions** - Token may lack required scope

### Rate Limiting

If you receive `429 Too Many Requests`:
- Implement exponential backoff
- Reduce request frequency
- Contact support for limit increases

### Token Security Incident

If a token is compromised:
1. **Immediately revoke** the compromised token
2. **Audit logs** for unauthorized access
3. **Generate new token** with updated security
4. **Review access** patterns and adjust permissions
