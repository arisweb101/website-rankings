# Website Rankings - Docker Setup

This project consists of a **Vue.js client**, an **Express.js server**, and a **MySQL database**, all containerized using Docker.

## Prerequisites

-   Install [Docker](https://www.docker.com/get-started)
-   Install [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

```
website/
│── client/       # Vue.js frontend
│── server/       # Express.js backend
│── docker-compose.yml  # Docker configuration
│── .env          # Environment variables
```

## Environment Variables

Create a `.env` file in the client and server folder and add the following:

CLIENT

```env
VITE_API_URL=http://localhost:4000/api
```

SERVER

```env
PORT=4000
DB_URL=DB_URL=mysql://root:your_password@your_database_host:3306/your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_DIALECT=mysql
API_URL=your_api_url

```

### 2️⃣ Build and Start Containers

From the root folder 'website-rankings' open in the terminal and run command

```sh
docker-compose up --build
```

This will:

-   Start a MySQL container
-   Start the Express server
-   Start the Vue.js client

### 3️⃣ Access the Application

-   **Client (Vue.js)**: [http://localhost:3000](http://localhost:3000)
-   **Server (Express.js)**: [http://localhost:4000](http://localhost:4000)
-   **MySQL Database**: Available on `localhost:3306`

## Stopping the Containers

To stop the containers, run:

```sh
docker-compose down
```

## Database Configuration

-   **Host**: `mysql`
-   **User**: `root`
-   **Password**: Set in your `.env` file
-   **Database Name**: `website_rankings`

## Additional Notes

-   The **server** will only start once the MySQL container is healthy.
-   The **client** is served using Nginx inside the Docker container.
-   Any changes to the code require rebuilding the containers using:
    ```sh
    docker-compose up --build
    ```
