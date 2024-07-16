# Twitter Backend

A Fairly simple Twitter Backend server built using Node.js, Express, Prisma, JWT Authentication, AWS SES, passwordless authentication, and Docker containerization.

## Endpoints

### Authentication Endpoints

- `POST /auth/login`: User login endpoint
- `POST /auth/authenticate`: User authentication with email OTP

### User Profile Endpoints

- `POST /user/`: creates new user in database
- `GET /user/id`: Finds user with same ID
- `PUT /user/id`: Updates profile data like name, bio and images with given ID
- `DELETE /user/id`: Deletes a user from the database with passed ID

### Tweet Endpoints

- `POST /tweet/`:`req{userId}` creates new tweet
- `GET /tweet/:id`: `req{id}` Fetches tweet with corresponding id
- `PUT /tweet/:id`:`req{id}` Updates tweet with the corresponding id
- `DELETE /tweet/:id`: `req{id}` Deletes the tweet with the corresponding id from the database
