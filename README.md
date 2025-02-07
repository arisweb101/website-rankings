# Website Rankings - Docker Setup

This project consists of a **Vue.js client**, an **Express.js server**, and a **MySQL database**, all containerized using Docker.

## Prerequisites
- Install [Docker](https://www.docker.com/get-started)
- Install [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure
```
website/
│── client/       # Vue.js frontend
│── server/       # Express.js backend
│── docker-compose.yml  # Docker configuration
│── .env          # Environment variables
```

## Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=4000
DB_URL=mysql://root:HelloWorld1234@mysql:3306/website_rankings
DB_USERNAME=root
DB_PASSWORD=HelloWorld1234
DB_NAME=website_rankings
DB_DIALECT=mysql
API_URL=https://tech-test.ayima.net/data
```

## Setup & Run

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/arisweb101/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Build and Start Containers
```sh
docker-compose up --build
```
This will:
- Start a MySQL container
- Start the Express server
- Start the Vue.js client

### 3️⃣ Access the Application
- **Client (Vue.js)**: [http://localhost:3000](http://localhost:3000)
- **Server (Express.js)**: [http://localhost:4000](http://localhost:4000)
- **MySQL Database**: Available on `localhost:3306`

## Stopping the Containers
To stop the containers, run:
```sh
docker-compose down
```

## Database Configuration
- **Host**: `mysql`
- **User**: `root`
- **Password**: `HelloWorld1234`
- **Database Name**: `website_rankings`

## Additional Notes
- The **server** will only start once the MySQL container is healthy.
- The **client** is served using Nginx inside the Docker container.
- Any changes to the code require rebuilding the containers using:
  ```sh
  docker-compose up --build
  ```

