# PHP Backend Project

## Overview
This project is a PHP backend application that utilizes Docker for containerization. It includes a MySQL database and phpMyAdmin for database management.

## Project Structure
```
backend
├── src
│   ├── index.php
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- Docker
- Docker Compose

## Setup Instructions

1. **Navigate to the Backend Directory**
   ```bash
   cd backend
   ```

2. **Build and Run the Containers**
   Use Docker Compose to build and run the application and database services.
   ```bash
   docker-compose up --build
   ```

3. **Accessing the Application**
   Once the containers are running, you can access the PHP application at `http://localhost:8000`.

4. **Accessing phpMyAdmin**
   You can access phpMyAdmin at `http://localhost:8080`. Use the following credentials to log in:
   - **Username:** root
   - **Password:** root

## Usage
- Modify the `src/index.php` file to implement your application logic.
- Use the MySQL database for data storage and management.

## Additional Information
For more details on Docker and Docker Compose, refer to the official documentation:
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)