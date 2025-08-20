# Cha-Ching

## How to Run the Services

This project uses Docker to manage different services. Below are the instructions to run each service.

### Prerequisites

- Ensure you have Docker installed on your machine if you choose to run the services with Docker.
- Ensure you have Node.js and Yarn installed on your machine if you choose to run the services without Docker.

### Services

#### Running with Docker

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/Cha-Ching.git
    cd Cha-Ching
    ```

2. Install dependencies:
    ```sh
    docker-compose run yarn
    ```

3. Run the service:
    ```sh
    docker-compose up dev
    ```

4. Access the services:
    - The application should be running on `http://localhost:3000`.

#### Running without Docker

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/Cha-Ching.git
    cd Cha-Ching
    ```

2. Install dependencies:
    ```sh
    yarn install
    ```

3. Start the development server:
    ```sh
    yarn dev
    ```

4. Access the services:
    - The application should be running on `http://localhost:5173`.
