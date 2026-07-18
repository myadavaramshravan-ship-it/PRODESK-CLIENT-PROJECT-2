# Ticket QR Code Generator Worker

# API Contract

## 1. Overview

The Ticket QR Code Generator Worker API provides endpoints for:

* User authentication
* Ticket creation
* QR code generation
* Ticket validation
* QR scan tracking
* Analytics monitoring

Base URL:

```
/api/v1
```

Authentication:

```
Bearer JWT Token
```

---

# Authentication APIs

## 1. Register User

### Endpoint

```
POST /api/v1/auth/register
```

### Description

Creates a new system user.

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "staff"
}
```

### Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "65fd12345",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 2. Login User

### Endpoint

```
POST /api/v1/auth/login
```

### Description

Authenticates user and returns JWT token.

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "65fd12345",
    "role": "staff"
  }
}
```

---

# Ticket APIs

## 3. Create Ticket

### Endpoint

```
POST /api/v1/tickets
```

### Authentication

Required

### Description

Creates a new ticket and generates QR code.

### Request Body

```json
{
  "customerName": "Alex Smith",
  "customerEmail": "alex@gmail.com",
  "eventName": "Tech Conference 2026",
  "eventDate": "2026-08-20"
}
```

### Response

```json
{
  "success": true,
  "message": "Ticket created successfully",
  "ticket": {
    "ticketNumber": "TKT-10001",
    "qrCode": "data:image/png;base64,...",
    "status": "ACTIVE"
  }
}
```

---

## 4. Get All Tickets

### Endpoint

```
GET /api/v1/tickets
```

### Authentication

Required

### Response

```json
{
  "success": true,
  "tickets": [
    {
      "ticketNumber": "TKT-10001",
      "customerName": "Alex Smith",
      "status": "ACTIVE"
    }
  ]
}
```

---

## 5. Get Ticket By ID

### Endpoint

```
GET /api/v1/tickets/:id
```

### Response

```json
{
  "success": true,
  "ticket": {
    "ticketNumber": "TKT-10001",
    "eventName": "Tech Conference 2026",
    "status": "ACTIVE"
  }
}
```

---

## 6. Update Ticket Status

### Endpoint

```
PATCH /api/v1/tickets/:id/status
```

### Request Body

```json
{
  "status": "CANCELLED"
}
```

### Response

```json
{
  "success": true,
  "message": "Ticket status updated"
}
```

---

# QR Scan APIs

## 7. Validate QR Code

### Endpoint

```
POST /api/v1/scans/validate
```

### Description

Validates scanned QR code and updates ticket usage status.

### Request Body

```json
{
  "ticketNumber": "TKT-10001"
}
```

### Response

Success:

```json
{
  "success": true,
  "message": "Ticket validated successfully",
  "status": "USED"
}
```

Failure:

```json
{
  "success": false,
  "message": "Invalid or already used ticket"
}
```

---

## 8. Get Scan History

### Endpoint

```
GET /api/v1/scans/:ticketId
```

### Response

```json
{
  "success": true,
  "scans": [
    {
      "scannedAt": "2026-08-20T10:30:00",
      "scanStatus": "SUCCESS"
    }
  ]
}
```

---

# Analytics APIs

## 9. Dashboard Analytics

### Endpoint

```
GET /api/v1/analytics/dashboard
```

### Authentication

Required

### Response

```json
{
  "success": true,
  "analytics": {
    "totalTickets": 500,
    "activeTickets": 350,
    "usedTickets": 120,
    "cancelledTickets": 30
  }
}
```

---

## 10. Activity Logs

### Endpoint

```
GET /api/v1/analytics/logs
```

### Response

```json
{
  "success": true,
  "logs": [
    {
      "action": "QR_SCANNED",
      "ticketId": "65fd12345",
      "createdAt": "2026-08-20"
    }
  ]
}
```

---

# HTTP Status Codes

| Code | Meaning            |
| ---- | ------------------ |
| 200  | Successful Request |
| 201  | Resource Created   |
| 400  | Validation Error   |
| 401  | Unauthorized       |
| 403  | Forbidden          |
| 404  | Resource Not Found |
| 500  | Server Error       |

---

# Validation Rules

## User

* Email must be unique
* Password minimum 8 characters
* Role must be valid

## Ticket

* Customer name required
* Event name required
* Event date required
* Ticket number must be unique

## QR Scan

* QR code must exist
* Ticket cannot be scanned twice
* Cancelled tickets cannot be validated

---

# API Flow

```
User Login
    |
    |
JWT Authentication
    |
    |
Create Ticket
    |
    |
Generate QR Code
    |
    |
Scan QR
    |
    |
Validate Ticket
    |
    |
Update Status
    |
    |
Store Analytics
```

---

# Future Improvements

* Offline QR validation queue
* Batch ticket generation
* Role-based permissions
* Real-time scan updates
* Export analytics reports
