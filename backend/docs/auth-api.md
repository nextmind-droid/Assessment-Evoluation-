# AAES Backend: Login API



For the frontend (Srija). Everything here was tested on the live app.



## Endpoint



POST http://localhost:3000/api/v1/auth/login



(Port 3000 is for running locally. The `/api/v1` prefix is always there.)



## Request body (JSON)



```json

{

  "email": "student@example.com",

  "password": "the-password",

  "role": "student"

}

```



- `email`: must be a valid email

- `password`: must be a non-empty string

- `role`: `student`, `faculty` or `admin`

- Do not send any other fields. Extra fields are rejected.



## Success: 200



```json

{

  "accessToken": "<JWT string>",

  "tokenType": "Bearer",

  "expiresIn": 3600,

  "user": {

    "name": "Demo Student",

    "email": "student@example.com",

    "role": "student"

  }

}

```



`expiresIn` is in seconds (1 hour).



## Wrong login: 401



Wrong password, unknown email and wrong role all give the same answer:



```json

{ "message": "Invalid credentials", "error": "Unauthorized", "statusCode": 401 }

```



Only redirect the user to the next page when the status is 200.



## Bad request: 400



Example when the email is invalid and the password is missing:



```json

{

  "message": [

    "email must be an email",

    "password should not be empty",

    "password must be a string"

  ],

  "error": "Bad Request",

  "statusCode": 400

}

```



`message` is a list of text messages.



## Not built yet



- Protected endpoints, so there is nothing to send the token to yet (it will go in the header `Authorization: Bearer <accessToken>`)

- GET /auth/me, forgot password and reset password



## Demo accounts



student@example.com, faculty@example.com and admin@example.com (temporary). Ask Shainaz for the demo password.

