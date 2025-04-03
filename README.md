# Social-Network-API

A robust and scalable backend API for social networking applications.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Integration Guide](#integration-guide)
- [Technical Details](#technical-details)
- [Demo](#demo)
- [Project Structure](#project-structure)
- [License](#license)

## Description

The Social Network API is a powerful backend solution designed for modern social networking applications. Built using Express.js for routing, MongoDB as the NoSQL database, and Mongoose ODM, this API provides a scalable foundation for handling large amounts of unstructured data typical in social media platforms.

This API can serve as the backend for various social networking applications, from simple community platforms to complex social media services. Its modular design allows developers to easily integrate it into existing projects or use it as a starting point for new applications.

## Features

- **User Management**: Complete CRUD operations for user profiles
- **Thought Sharing**: Post, retrieve, update, and delete user thoughts (equivalent to posts/status updates)
- **Reactions**: Add, update, and remove reactions to thoughts (similar to comments/likes)
- **Friend Connections**: Create and manage user friendship connections
- **Scalable Architecture**: Designed to handle large datasets efficiently
- **RESTful Design**: Intuitive API endpoints following REST principles
- **MongoDB Integration**: Leverages NoSQL flexibility for complex social data relationships

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (v4+)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Social-Network-API.git
   cd Social-Network-API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MongoDB connection:
   - Check the `config/connection.js` file to ensure MongoDB connection settings match your environment
   - Default connection is to local MongoDB instance at `mongodb://localhost:27017/socialnetworkDB`

4. Start the server:
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Usage

Once the server is running, you can use tools like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) to test the API endpoints. Below are examples of how to use each endpoint:

### Users

1. **Get all users**
   - GET `/api/users`

2. **Get a single user by ID**
   - GET `/api/users/:userId`

3. **Create a new user**
   - POST `/api/users`
   - Body: 
     ```json
     {
       "username": "newuser",
       "email": "newuser@example.com"
     }
     ```

4. **Update a user**
   - PUT `/api/users/:userId`
   - Body: 
     ```json
     {
       "username": "updateduser",
       "email": "updateduser@example.com"
     }
     ```

5. **Delete a user**
   - DELETE `/api/users/:userId`

6. **Add a friend**
   - POST `/api/users/:userId/friends/:friendId`

7. **Remove a friend**
   - DELETE `/api/users/:userId/friends/:friendId`

### Thoughts

1. **Get all thoughts**
   - GET `/api/thoughts`

2. **Get a single thought by ID**
   - GET `/api/thoughts/:thoughtId`

3. **Create a new thought**
   - POST `/api/thoughts`
   - Body:
     ```json
     {
       "thoughtText": "Here's a cool thought...",
       "username": "user",
       "userId": "5edff358a0fcb779aa7b118b"
     }
     ```

4. **Update a thought**
   - PUT `/api/thoughts/:thoughtId`
   - Body:
     ```json
     {
       "thoughtText": "Here's an updated thought..."
     }
     ```

5. **Delete a thought**
   - DELETE `/api/thoughts/:thoughtId`

### Reactions

1. **Add a reaction to a thought**
   - POST `/api/thoughts/:thoughtId/reactions`
   - Body:
     ```json
     {
       "reactionBody": "This is a great thought!",
       "username": "reactionUser"
     }
     ```

2. **Update a reaction**
   - PUT `/api/thoughts/:thoughtId/reactions/:reactionId`
   - Body:
     ```json
     {
       "reactionBody": "This is an updated reaction!"
     }
     ```

3. **Remove a reaction from a thought**
   - DELETE `/api/thoughts/:thoughtId/reactions/:reactionId`

Remember to replace `:userId`, `:thoughtId`, `:friendId`, and `:reactionId` with actual IDs when making requests.

## Integration Guide

This API can be integrated into your projects in several ways:

### 1. Full Backend Solution

Use this API as the complete backend for your social networking application. Simply:
- Connect your frontend to the API endpoints
- Customize the models if needed
- Deploy alongside your frontend application

### 2. Microservice in a Larger System

Integrate as a social features microservice:
- Use API gateway to route social functionality requests to this API
- Maintain user synchronization between systems
- Leverage the friend connections and content sharing capabilities

### 3. Starting Point for Custom Social Platform

Fork the repository and build upon it:
- Extend the models with additional fields
- Add new controllers for custom functionality
- Implement authentication methods as needed

### 4. Code Reference

Use specific parts of the codebase as reference for your own implementation:
- Study the MongoDB/Mongoose relationships
- Examine the controller logic for efficient data operations
- Adapt the routing structure for your own API

## Technical Details

### Data Models

#### User Model
- `username`: String (unique, required, trimmed)
- `email`: String (required, unique, validated)
- `thoughts`: Array of ObjectIds referencing the Thought model
- `friends`: Array of ObjectIds self-referencing the User model
- Virtual: `friendCount` - returns the number of friends

#### Thought Model
- `thoughtText`: String (required, 1-280 characters)
- `createdAt`: Date (default: current timestamp, formatted)
- `username`: String (required)
- `userId`: ObjectId referencing the User model (required)
- `reactions`: Array of embedded Reaction documents
- Virtual: `reactionCount` - returns the number of reactions

#### Reaction Schema (embedded in Thought model)
- `reactionId`: ObjectId (default: new ObjectId)
- `reactionBody`: String (required, max 280 characters)
- `username`: String (required)
- `createdAt`: Date (default: current timestamp, formatted)

### MongoDB Integration

The API uses Mongoose ODM to interact with MongoDB, providing:
- Schema validation
- Relationship management between documents
- Virtuals for calculated properties
- Query building and middleware capabilities

### Scalability Considerations

- The API is designed with a RESTful architecture for predictable scaling
- MongoDB's document model allows for flexible schema evolution
- Separation of concerns in controllers and routes enables easier maintenance
- NoSQL design handles social graph relationships efficiently

## Demo

[Click to play video of API endpoint tests using Insomnia](https://drive.google.com/file/d/1KfAq87g82uUT1DChsS0iGTG5jezvdKsH/view?usp=sharing)

## Project Structure

```
Social-Network-API
├─ config
│  └─ connection.js         # MongoDB connection configuration
├─ controllers
│  ├─ thoughtController.js  # Logic for thought-related operations
│  └─ userController.js     # Logic for user-related operations
├─ models
│  ├─ index.js              # Export point for all models
│  ├─ Thought.js            # Thought model with embedded Reaction schema
│  └─ User.js               # User model with friend/thought references
├─ package-lock.json
├─ package.json             # Project dependencies and scripts
├─ README.md
├─ routes
│  ├─ api
│  │  ├─ index.js           # Combines all API routes
│  │  ├─ thoughtRoutes.js   # Routes for thought operations
│  │  └─ userRoutes.js      # Routes for user operations
│  └─ index.js              # Main routes file
├─ server.js                # Express server configuration
└─ utils
   └─ dateFormat.js         # Helper function for formatting dates
```

## License

[MIT License](LICENSE)

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Questions

If you have any questions about the repository, open an issue or contact me directly at: digitalscribe53@gmail.com.

You can find more of my work at [GitHub](https://github.com/digitalscribe53).