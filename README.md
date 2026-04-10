# Contact Manager

A full-stack contact management application built with React (Vite) and Node.js.

## Getting Started

### 1. Install Dependencies
Run the following command in the root directory:
```bash
npm run install:all
```

### 2. Development Mode
Run these in separate terminals:
```bash
# Start backend (json-server)
npm run dev:server

# Start frontend (Vite)
npm run dev:client
```

### 3. Production Mode
To build the client and start the production server:
```bash
npm run prod
```
The application will be available at `http://localhost:5000`.

## Project Structure
- `client/`: React frontend.
- `server/`: Express backend with `json-server`.
- `package.json`: Root manager for scripts.
