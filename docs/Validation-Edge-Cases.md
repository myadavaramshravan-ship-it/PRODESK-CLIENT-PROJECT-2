# Validation & Edge Cases


## User Validation


| Field | Rule |
|---|---|
| Name | Required |
| Email | Valid email format |
| Password | Minimum 8 characters |
| Role | Must match allowed roles |



Allowed Roles:

- worker
- manager
- admin



---


# Ticket Validation


| Field | Rule |
|---|---|
| Customer Name | Required |
| Event Name | Required |
| Event Date | Required |
| Ticket Number | Unique |
| QR Code | Auto generated |


---


# QR Scan Validation


Checks:

- Ticket exists
- QR code is valid
- Ticket is not expired
- Ticket is not already cancelled


---


# Edge Cases


## Empty Ticket List


Response:
