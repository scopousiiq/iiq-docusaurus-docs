---
sidebar_position: 2
---

# Popular APIs

When getting started, it can be beneficial to browse through some of the most frequently-used endpoints to get a feel for the ecosystem and provide inspiration for creative integration ideas. Below is a list of just a few of those popular endpoints.

In addition to the API, please also recall the Incident IQ platform can leverage scheduled jobs, imports, exports, web hooks, workflow automation and much more to provide functionality for your use-cases, integrations and customizations. Please contact us if you have any questions.

## Ticket Operations

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| [Create Ticket](/docs/api/tickets/create-ticket) | POST | `/api/v1.0/tickets/new` | Submit a new help desk ticket |
| [Query Tickets](/docs/api/tickets/search-tickets) | POST | `/api/v1.0/tickets` | Search and filter tickets with pagination |
| [Update Ticket Status](/docs/api/tickets/bulk-set-ticket-status) | POST | `/api/v1.0/tickets/bulk/set-status` | Change status on one or more tickets |
| [Assign Ticket](/docs/api/tickets/assign-ticket) | POST | `/api/v1.0/tickets/{ticketId}/assign` | Route ticket to agent or team |

## Asset Operations

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| [Query Assets](/docs/api/assets/search-assets) | POST | `/api/v1.0/assets` | Search and filter asset inventory |
| [Set Asset Owner](/docs/api/assets/bulk-set-asset-owner) | POST | `/api/v1.0/assets/owner/bulk` | Assign or transfer asset ownership |
| [Checkout/Transfer Asset](/docs/api/assets/checkout-or-transfer-asset) | POST | `/api/v1.0/assets/checkouts/checkout-or-transfer` | Check out or transfer a single asset |

## User Operations

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| [Query Users](/docs/api/users/search-users) | POST | `/api/v1.0/users` | Search for users by name, role, location |
| [Get User by ID](/docs/api/users/get-user-by-id) | GET | `/api/v1.0/users/{UserId}` | Retrieve a specific user's details |

## Location Operations

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| [Query Locations](/docs/api/locations/get-all-site-locations-filtered-v-2) | POST | `/api/v2.0/locations` | Search for schools, buildings, rooms |

## Getting Started

1. Review [Access and API Keys](./authentication) to set up authentication
2. Try querying tickets or assets to explore your data
3. Learn about [Paging and Sorting](./pagination) for handling results

:::warning
This resource is designed for technical administrators. If you are looking for our Incident IQ help guides and announcements, you can find them at our [Help Center](https://help.incidentiq.com/hc/en-us)
:::
