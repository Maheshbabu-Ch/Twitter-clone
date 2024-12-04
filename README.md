# Tweetify

Tweetify is a Twitter clone application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to post text tweets, like them, follow other users, and manage their accounts.

## Live Demo

Check out the live demo of Tweetify 👉(https://tweetify.onrender.com/).

## Features

- **User Authentication:** Users can sign up, log in, and log out securely.
- **Post Tweets:** Users can compose and post text tweets.
- **Like Tweets:** Users can like tweets posted by other users.
- **Follow Users:** Users can follow other users to see their tweets in their timeline.
- **Account Management:** Users can update their profile information and delete their accounts.

## Technologies Used

- **Frontend:** React.js, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Styling:** CSS with Flexbox/Grid
- **Deployment:** Render (for hosting frontend) and possibly other services like Heroku or AWS for backend

## Directory Structure

- **src:** Contains the frontend code.
- **server:** Contains the backend code.

## Installation

To run this project locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies for both frontend and backend:
    ```bash
    # Install frontend dependencies
    cd src
    npm install

    # Install backend dependencies
    cd ../server
    npm install
    ```
4. Set up your MongoDB database and update the connection string in the backend `.env` file.
5. Start the backend server:
    ```bash
    cd ../server
    npm start
    ```
6. Start the frontend server:
    ```bash
    cd ../src
    npm start
    ```
7. Open your web browser and go to `http://localhost:3000` to view the app.

## Contributing

Contributions are welcome! If you have ideas for new features, improvements, or bug fixes, feel free to open an issue or submit a pull request.
