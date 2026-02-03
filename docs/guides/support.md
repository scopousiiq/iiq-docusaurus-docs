---
sidebar_position: 11
---

# Support & Resources

Get help with the Incident IQ API, report issues, and access additional resources.

## Getting Help

### Help Center

For general Incident IQ platform questions, guides, and announcements:

**[Incident IQ Help Center](https://help.incidentiq.com/hc/en-us)**

### API Support

For API-specific questions or issues:

- Contact your Incident IQ account representative
- Submit a support ticket through the Help Center
- Reference this documentation and include relevant details (endpoint, request/response, error messages)

## Best Practices

### Rate Limiting

:::warning
The API has rate limits to ensure fair usage. If you receive `429 Too Many Requests` responses, implement exponential backoff in your retry logic.
:::

### Error Handling

API errors return standard HTTP status codes:

| Code | Meaning |
|------|---------|
| 400 | Bad Request - Check your request body |
| 401 | Unauthorized - Verify your API key and headers |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Server Error - Contact support if persistent |

### Debugging Tips

1. **Verify Headers**: Ensure `Authorization`, `SiteId`, and `Client` headers are set correctly
2. **Check Permissions**: Your API key inherits the permissions of its associated user
3. **Validate GUIDs**: Entity IDs must be valid UUIDs
4. **Test in Isolation**: Use tools like Postman or cURL to test outside your application

## Additional Resources

- [Access and API Keys](./authentication) - Authentication setup
- [Paging and Sorting](./pagination) - Handling large datasets
- [Web Hooks](./webhooks) - Real-time event notifications

## Changelog

API updates and changes are communicated through:

- Release notes in the Help Center
- Announcements to account administrators
- Deprecation notices in API responses (when applicable)

:::warning
This resource is designed for technical administrators. If you are looking for our Incident IQ help guides and announcements, you can find them at our [Help Center](https://help.incidentiq.com/hc/en-us)
:::
