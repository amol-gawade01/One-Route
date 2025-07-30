## User SignUp API

### Endpoint

`POST http://localhost:4000/api/v1/users/SignUp`

### Request Body

Send a JSON object with the following fields:

| Field      | Type   | Required | Validation                          |
|------------|--------|----------|-------------------------------------|
| firstName  | string | Yes      | Minimum 1 character                 |
| lastName   | string | Yes      | Minimum 1 character                 |
| email      | string | Yes      | Must be a valid email address       |
| password   | string | Yes      | Minimum 6 characters                |

#### Example

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

### Validation & Handling

- All fields are required and validated using [Zod](https://zod.dev/).
- `firstName` and `lastName` must be non-empty strings.
- `email` must be a valid email format.
- `password` must be at least 6 characters.
- If a user with the same `firstName` or `email` exists, the API returns an error.
- Passwords are hashed before storing.
- On success, returns a JWT token and user data.

### Response

```json
{
  "token": "<jwt_token>",
  "userData": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    // other fields...
  }
}
```

### Errors

- Missing or invalid fields: `400 Bad Request`
- User already exists: `409 Conflict`
- Server error:


## User Login API

### Endpoint

`POST http://localhost:4000/api/v1/users/Login`

### Request Body

| Field    | Type   | Required | Validation                    |
|----------|--------|----------|-------------------------------|
| email    | string | Yes      | Must be a valid email address |
| password | string | Yes      | Minimum 6 characters          |

#### Example

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

### Validation & Handling

- Both fields are required and validated using [Zod](https://zod.dev/).
- If the user does not exist or the password is incorrect, an error is returned.
- On success, returns a JWT token and user data (without password).
- Token is set in the response header (`auth-token`) and as an HTTP-only cookie.

### Response

```json
{
  "message": "User Login successfullly",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "token": "<jwt_token>"
}
```

### Errors

- Invalid credentials: `400 Bad Request`
- User not found: `404 Not Found`
- Server error: `500 Internal Server Error`

---

## User Logout API

### Endpoint

`GET http://localhost:4000/api/v1/users/Logout`

### Description

- Requires authentication (JWT token in header or cookie).
- Blacklists the current token so it cannot be used again.
- Clears the authentication cookie.

### Response

```json
{
  "message": "User logout successfully"
}
```

### Errors

- Unauthorized (invalid or missing token): `401 Unauthorized`
- Server error: `500 Internal Server Error`

---

## Get User Info API

### Endpoint

`GET http://localhost:4000/api/v1/users/userInfo`

### Description

- Requires authentication (JWT token in header or cookie).
- Returns the authenticated user's data.

### Response

```json
{
  "data": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "message": "user fetch successfully"
}
```

### Errors

- Unauthorized (invalid or missing token): `401 Unauthorized`
- Server error: `500 Internal Server Error`

---

## Blacklisted Token Model

The **Blacklisted Token** model is used to store JWT tokens that have been invalidated (e.g., after logout).  
This prevents reuse of tokens that should no longer grant access.

| Field      | Type   | Description                                 |
|------------|--------|---------------------------------------------|
| token      | string | The JWT token that is blacklisted           |
| createdAt  | date   | Timestamp when the token was blacklisted    |

- Tokens automatically expire and are removed from the database after 24 hours (`expires: 86400` seconds).
- Used in authentication middleware to deny requests with blacklisted tokens.

