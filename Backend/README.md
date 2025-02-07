# Backend API Documentation

This is the documentation for the backend API of the Uber Clone application. It provides information about the available endpoints, their methods, and the expected input and output data.

## Endpoint: `/users/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It validates the input data, checks if the user already exists, hashes the password, creates the user, generates an authentication token, and returns the token along with the user data.

### Request Body:
The request body should be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters.
  - `lastname`: A string with a minimum length of 3 characters.
- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response:

If the registration is successful, the server will return a JSON object with the following fields:


- `user`: An object containing the user data.
   - `_id`: The user's ID.
   - `fullname`: An object containing the user's full name.
      - `firstname`: The user's first name.
      - `lastname`: The user's last name.
   - `email`: The user's email address.
   - `password`: The user's hashed password.
   - `token`: The user's authentication token.
   - `__v`: The MongoDB version of the user document.
Example:
```json
{
  "token": "auth_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```
## Endpoint: `/users/login`

### Method: POST

### Request Body:
- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response:
If the registration is successful, the server will return a JSON object with the following fields: whitout passing the token because we send token in cookie

- `user`: An object containing the user data.
   - `_id`: The user's ID.
   - `fullname`: An object containing the user's full name.
      - `firstname`: The user's first name.
      - `lastname`: The user's last name.
   - `email`: The user's email address.
   - `password`: The user's hashed password.
   - `token`: The user's authentication token.
   - `__v`: The MongoDB version of the user document.
Example:
```json
{
  "token": "auth_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## Endpoint: `/users/profile`
### Method: GET
### Description:
This endpoint is used to get the user profile. It checks if the user is authenticated and returns the user data.
### Request Body:
- `Authorization`: A valid Bearer token or Cookie with the token.(Bearer <token>)

### Response:
If the request is successful, the server will return a JSON object with the following fields:

- `id`: The user's ID.
- `fullname`: An object containing the user's fullname.
   - `firstname`: The user's firstname.
   - `lastname`: The user's lastname.
- `email`: The user's email address.

Example:
```json
{
  "id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

## Endpoint: `/users/logout`

### Method: GET

### Description:
Logout the current user and blacklist the token provided in cookies or authorization header.

### Request Body:
- `Authorization`: A valid Bearer token or Cookie with the token.(Bearer <token>)

### Response:
If the request is successful, the server will return a JSON object with the following fields:

- `message`: A message indicating that the user has been logged out.

Example:
```json
{
  "message": "Logged out"
}
```
## Endpoint: `/captains/register`
### Method: POST
### Description:
This endpoint is used to register a new captain. It validates the input data, checks if the captain already exists, hashes the password, creates the captain, generates an authentication token, and returns the token along with the captain data.
### Request Body:
The request body should be a JSON object containing the following fields:
- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters.
  - `lastname`: A string with a minimum length of 3 characters.
- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.
- `status`: A string with a minimum length of 3 characters.
- `vehicle`: An object containing:
  - `color`: A string with a minimum length of 3 characters.
  - `plate`: A string with a minimum length of 3 characters.
  - `capacity`: A number with a minimum value of 1 and a maximum value of 100.
  - `vehicleType`: A string with a minimum length of 3 characters.
Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "status": "active",
  "vehicle": {
    "color": "blue",
    "plate": "ABC-123",
    "capacity": 5,
    "vehicleType": "car"
  }
}
```
### Response:
If the registration is successful, the server will return a JSON object with the following fields:
- `token`: The captain's authentication token.
- `captain`: An object containing the captain data.
   - `_id`: The captain's ID.
   - `fullname`: An object containing the captain's full name.
      - `firstname`: The captain's first name.
      - `lastname`: The captain's last name.
   - `email`: The captain's email address.
   - `password`: The captain's hashed password.
   - `status`: The captain's status.
   - `vehicle`: An object containing the captain's vehicle details.
      - `color`: The captain's vehicle color.
      - `plate`: The captain's vehicle plate number.
      - `capacity`: The captain's vehicle capacity.
      - `vehicleType`: The captain's vehicle type.
Example:
```json
{
  "token": "auth_token",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "$2b$10$bS7ASc/rDqog1qQxfC2SteWPvoiqxBZx3Ou.wamzpnUupgdpYnwSy",
    "status": "active",
    "vehicle": {
      "color": "blue",
      "plate": "ABC-123",
      "capacity": 5,
      "vehicleType": "car"
    }
  }
}
```
## Endpoint: `/captains/login`
### Method: POST
### Request Body:
- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.

### Response:





