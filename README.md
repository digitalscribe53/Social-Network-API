# Social-Network-API

## Table of Contents
- [Description](#description)
- [Usage](#usage)
- [Video](#video)

## Description

The Social Network API is a robust backend application designed to power a social networking platform. Built using Express.js for routing, MongoDB as the NoSQL database, and Mongoose ODM, this API provides a scalable solution for handling large amounts of unstructured data typical in social media applications.

Key features of this API include:

- User Management: Create, read, update, and delete users.
- Thought Sharing: Users can post thoughts, which are equivalent to posts or status updates in typical social media platforms.
- Reactions: Users can react to thoughts, similar to comments or likes on other platforms.
- Friend Connections: Users can add and remove friends, building a network of connections.

The API is structured with a RESTful architecture, providing intuitive endpoints for various operations. It demonstrates the power and flexibility of MongoDB in handling complex data relationships, such as user-friend associations and thought-reaction nesting.

This project showcases best practices in API development, including:
- Modular routing
- Controller logic separation
- MongoDB data modeling with Mongoose
- Error handling and validation

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

## Video Demo
[Click to play demonstration video](https://drive.google.com/file/d/1KfAq87g82uUT1DChsS0iGTG5jezvdKsH/view?usp=sharing) 