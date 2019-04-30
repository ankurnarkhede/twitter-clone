# postman-assignment
A REST API in Node.js that implememts basic twitter functionalities.

## Contents
- [Description](#description)
- [Requirements](#requirements)
- [Documentation](#documentation)
    - [Install Dependencies](#install-dependencies)
    - [Run](#run)
    - [Routes](#routes)

## Description
This is a REST API developed using Node.js that implememts basic Twitter functionalities. Following are the functionalities  available:
- SignUp / Login / JWT Auth 
- Follow / Unfollow users
- Create / Read / Delete tweets
- Like / Unlike tweet
- ReTweet a tweet
- Reply to a tweet

## Requirements
- Node.js

## Documentation
# Install Dependencies
```bash
npm install
``` 

# Run
```bash
npm start
```

# Routes
```
    Route: http://localhost:3000/auth/register/
    Request Type: POST
    Data:
        {
            "username":"johndoe",
            "password":"qwertyuiop"
        }
```

```
    Route: http://localhost:3000/auth/login/
    Request Type: POST
    Data:
        {
            "username":"johndoe",
            "password":"qwertyuiop"
        }
```

```
    Route: http://localhost:3000/auth/login/
    Request Type: POST
    Headers: 
            Content-Type: application/json
    Data:
        {
            "username":"johndoe",
            "password":"qwertyuiop"
        }
```

```
    Route: http://localhost:3000/auth/current/
    Request Type: GET
    Headers: 
        Content-Type: application/json
        Authorization: Bearer {{token}}
        
```

```
    Route: http://localhost:3000/user/follow/:username
    Request Type: GET
    Headers: 
        Content-Type: application/json
        Authorization: Bearer {{token}}

```

```
    Route: http://localhost:3000/user/unfollow/:username
    Request Type: GET
    Headers: 
        Content-Type: application/json
        Authorization: Bearer {{token}}

```
