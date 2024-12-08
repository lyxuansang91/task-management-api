# Task-Management API

## Description

This is a NestJS application with MongoDB integration. The application is containerized using Docker and Docker Compose.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/).
- [NodeJS](https://nodejs.org/en).
- [MongoDB](https://www.mongodb.com/).
- [Yarn](https://yarnpkg.com/).

## Installation

1. **Clone the repository**:

```sh
git clone https://github.com/lyxuansang91/task-management-api.git
cd task-management-api
```

2. **Build and start the services**:

2.1. **Using `docker-compose`**

```sh
docker-compose up --build
```

2.2. **Using NodeJS (locally)**

- Create `.env` file using following commmand:

```sh
cp -R .env.example .env
```

And modify `.env` file.

- To install package, using the following command:

```sh
yarn install
```

- To run development environment, using following command:

```sh
yarn start:dev
```

- To run production environment, using following command:

```sh
yarn start:prod
```

or

```sh
yarn build && node dist/main
```

1. **Access the application**: Open your browser and navigate to `http://localhost:3000`.

## Environment Variables

The application uses the following environment variables:

- `MONGODB_URI`: The URI for connecting to MongoDB. Default is `mongodb://mongo:27017/test`.
- `NODE_ENV`: The NodeJS environment for app. Default is `development`.
- `PORT`: The port of this app. Default is `3000`.
- `SECRET_KEY`: The secret key for JWT token.
- `SIGN_OPTIONS`: JWT token sign expire time, default: `4h`.

## Running the Application

The application will be available at `http://localhost:3000`.

## Running tests

To run the unit tests, use the following command:

```sh
yarn test
```

## Docker Compose

The docker-compose.yml file sets up the following services:

- `app`: The NestJS application.
- `mongo`: The MongoDB database.
