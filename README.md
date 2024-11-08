﻿# GP-Vote-Task

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Usage](#usage)
- [Contact](#contact)

## Description

GP-Vote-Task is a comprehensive voting application designed to facilitate secure and efficient voting processes. It aims to provide a user-friendly interface for both voters and administrators, ensuring transparency and reliability in election management.

## Features

- **User Authentication:** Secure login system for voters and administrators.
- **Vote Casting:** Intuitive interface for casting votes on various issues.
- **Real-time Results:** Live updates of voting results with detailed analytics.
- **Admin Dashboard:** Tools for managing elections, candidates, and voters.
- **Responsive Design:** Accessible on both desktop and mobile devices.
- **Data Security:** Robust measures to protect user data and voting integrity.

## Technologies Used

- **Frontend:**
  - Next.js v15
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express.js
  - MySQL

- **Authentication:**
  - JWT (JSON Web Tokens)

## Installation

### Prerequisites

- **Node.js:** Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/)
- **MySQL:** A running instance of MySQL. [Download MySQL](https://www.mysql.com/)
- **Git:** For cloning the repository. [Download Git](https://git-scm.com/)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/kira-1011/GP-Vote-Task.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd GP-Vote-Task
   ```

3. **Install Dependencies for Backend:**

   ```bash
   cd backend
   npx yarn
   ```

4. **Install Dependencies for Frontend:**

   ```bash
   cd frontend
   npm install
   ```

5. **Set Up Environment Variables:**

   Create a `.env` file in both `backend` directories based on the provided `.env.example` files.

6. **Run the Application:**

   - **Backend:**

     ```bash
     cd backend
     yarn dev
     ```

   - **Frontend:**

     ```bash
     cd frontend
     npm run dev
     ```

7. **Access the Application:**

   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Register an Account:**
   - Navigate to the registration page.
   - Provide your username, email and password.

2. **Login:**
   - Enter your email and password.

3. **Viewing Titles:**
   - Access the titles section to view all titles.
   - only accessible if metamask wallet account is connected

4. **Creating and deleting titles:**
   - Access the titles section to create and delete titles.
   - only accessible if metamask wallet account is connected
