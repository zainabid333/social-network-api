# Social Network API

## Description

This project is an API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. It uses Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Screenshots](#screenshots)
- [Walkthrough Video](#walkthrough-video)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation

To install the necessary dependencies, run the following command:
`npm install`

## Usage

To start the server, run:
`npm start`
The server will start and the Mongoose models will be synced to the MongoDB database.

## API Routes

### Users

- GET /api/users - get all users
- GET /api/users/:userId - get a single user by ID
- POST /api/users - create a new user
- PUT /api/users/:userId - update a user
- DELETE /api/users/:userId - delete a user

### Thoughts

- GET /api/thoughts - get all thoughts
- GET /api/thoughts/:thoughtId - get a single thought by ID
- POST /api/thoughts - create a new thought
- PUT /api/thoughts/:thoughtId - update a thought
- DELETE /api/thoughts/:thoughtId - delete a thought

### Friends

- POST /api/users/:userId/friends/:friendId - add a friend
- DELETE /api/users/:userId/friends/:friendId - remove a friend

### Reactions

- POST /api/thoughts/:thoughtId/reactions - add a reaction
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId - remove a reaction

## Screenshots

![User Routes](./assets/User%20Routes.png)
![Thought Routes](./assets/Thought%20Routes.png)
![Friend Routes](./assets/Friends%20Routes.png)
![Reaction Routes](./assets/Reactions%20Routes.png)

## Walkthrough Video

[Link to Walkthrough Video](https://drive.google.com/file/d/1gaaowvR7X0bAc_7zqCq8mTIKIn-MdhXN/view)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.

## Questions

If you have any questions about the repo, open an issue or contact me directly at [zainulbajwa@outlook.com](mailto:zainulbajwa@outlook.com). You can find more of my work at [zainabid333](https://github.com/zainabid333).
