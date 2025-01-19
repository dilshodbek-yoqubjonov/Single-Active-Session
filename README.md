# Single Active Session Middleware

This project implements a **Node.js middleware** that ensures a single active session per user. It validates user tokens using **JWT** and manages sessions with **Redis**. The goal is to restrict a user's account to be active on only one device at a time, enhancing both security and control.

## Technologies Used

 - Node.js: Backend server.
 - Express.js: Web framework.
 - Redis: Session management.
 - JWT: User authentication and authorization.

## Features

- Enforces a single active session for each user.
- Validates JSON Web Tokens (JWT) for authentication.
- Stores and manages session data in Redis for real-time checks.
- Automatically logs out previous sessions when a new session is initiated.

## How It Works

1. When a user logs in, a JWT is generated and stored in Redis under a unique key (`user:{id}`).
2. For every protected route, the middleware checks:
   - If the provided JWT matches the one stored in Redis.
   - If they don't match, the user is denied access.
3. Any new login overwrites the existing token in Redis, effectively invalidating the old session.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dilshodbek-yoqubjonov/single-active-session.git
   ```


## Install dependencies:
1. Install all needed packeges:
    ```bash
    npm install
    ```


