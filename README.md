# Neo Bank Back Office

This project is a BNC back office used for fund transfers. It includes two types of users: maker (to make fund transfer requests) and approver (to approve requests).

The project consists of two main components:

- **Backend**: Built with JavaScript using the Express.js framework and MySQL database.
- **Frontend**: Built with React.js and Redux.

## Table of Contents

- [Neo Bank Back Office](#neo-bank-back-office)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Running with Docker](#running-with-docker)
    - [Running with Manually](#running-with-manually)

## Installation

### Running with Docker

To run the application using Docker, follow these steps:

1. **Install Docker**: Make sure you have Docker installed on your machine. You can download it from [here](https://www.docker.com/get-started).
2. **Clone the Repository**:
   ```bash
   git clone https://github.com/haditya-fajri/bnc.git
   cd bnc
   docker-compose up -d --build
   ```

### Running with Manually

To run the application manually, follow these steps:

1. **Backend Setup**:
   - Navigate to backend directory
     ```bash
     cd backend
     ```
   - Install the depedencies
     ```bash
     npm install
     ```
   - Start the backend server
     ```bash
     npm start
     ```
2. **Frontend Setup**:
   - Navigate to frontend directory
     ```bash
     cd frontend
     ```
   - Install the depedencies
     ```bash
     npm install
     ```
   - Start the frontend server
     ```bash
     npm start
     ```
3. **MySQL Database Setup**
   - Ensure you have MySQL installed and running on your machine.
