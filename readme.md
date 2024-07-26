# Protected REST API with json-server and JWT

This project is a protected REST API built using json-server and JWT (JSON Web Tokens). It allows frontend developers to work with mock data before the backend is fully implemented. The project includes tools for generating mock data and hashing user passwords, and it supports starting the server with or without authentication.

## Usage

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```sh
   yarn
   ```

3. Generate mock data:

   ```sh
   yarn mock-data
   ```

4. Start the server:

   - Without authentication:
     ```sh
     yarn start
     ```
   - With authentication:
     ```sh
     yarn start-auth
     ```

## Start/Stop servers

| Description               | Script            |
| ------------------------- | ----------------- |
| Start server without auth | `yarn start`      |
| Start server with auth    | `yarn start-auth` |

## Tools

| Description                    | Script           |
| ------------------------------ | ---------------- |
| Generate mock data             | `yarn mock-data` |
| Generate user hashed passwords | `yarn hash`      |

## Endpoints for auth server

| Endpoint                    | Description                   |
| --------------------------- | ----------------------------- |
| `localhost:3000/auth/login` | Login user                    |
| `localhost:3000/purchases`  | Purchases list (token needed) |
| `localhost:3000/campaigns`  | Campaigns list (token needed) |

## Scripts

- `yarn start`: Starts the server without authentication.
- `yarn start-auth`: Starts the server with authentication.
- `yarn mock-data`: Generates mock data and writes it to `api_v1/db.json`.
- `yarn hash`: Generates hashed passwords for users.

## Dependencies

- `bcrypt`: For hashing passwords.
- `body-parser`: For parsing request bodies.
- `cors`: For enabling Cross-Origin Resource Sharing.
- `json-server`: For creating the mock server.
- `jsonwebtoken`: For creating and verifying JWT tokens.
- `@faker-js/faker`: For generating mock data.
- `moment`: For date manipulation.
- `ramda`: For functional programming utilities.
