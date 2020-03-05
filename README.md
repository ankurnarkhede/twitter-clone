# twitter-clone

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

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
The application logs are stored to logs/app.log file.

```
    Route: http://localhost:3000/auth/register/
    Request Type: POST
    Body:
        {
            "username":"johndoe",
            "password":"qwertyuiop"
        }
```

```
    Route: http://localhost:3000/auth/login/
    Request Type: POST
    Body:
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
    Body:
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
        Authorization: Bearer {{token}}
```

```
    Route: http://localhost:3000/user/unfollow/:username
    Request Type: GET
    Headers: 
        Authorization: Bearer {{token}}
```

```
    Route: http://localhost:3000/tweet
    Request Type: POST
    Headers: 
        Content-Type: application/json
        Authorization: Bearer {{token}}
    Body:
        {
            "text":"Tweet content"
        }
```

```
    Route: http://localhost:3000/tweet/:tweet_id
    Request Type: GET
    Headers: 
        Authorization: Bearer {{token}
```

```
    Route: http://localhost:3000/tweet/:tweet_id
    Request Type: DELETE
    Headers: 
        Authorization: Bearer {{token}}
```

```
    Route: http://localhost:3000/tweet/like/:tweet_id
    Request Type: GET
    Headers: 
        Authorization: Bearer {{token}}
```

```
    Route: http://localhost:3000/tweet/unlike/:tweet_id
    Request Type: GET
    Headers: 
        Authorization: Bearer {{token}}
```

```
    Route: http://localhost:3000/tweet/reply/:tweet_id
    Request Type: POST
    Headers: 
        Content-Type: application/json
        Authorization: Bearer {{token}}
    Body:
        {
            "text":"Tweet content"
        }
```

```
    Route: http://localhost:3000/tweet/retweet/:tweet_id
    Request Type: POST
    Headers: 
        Authorization: Bearer {{token}}
```







