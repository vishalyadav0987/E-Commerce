# E-Commerce

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node.js-14.x%20|%2016.x%20|%2018.x-brightgreen)](https://nodejs.org/en/download/)



## Description
This project is a full-featured eCommerce website built using the MERN stack (MongoDB, Express.js, React, and Node.js). It provides a robust platform for users to browse products, add items to their cart, and complete purchases securely. The application features a modern, responsive design and utilizes Cloudinary for efficient image management.



## Features
- **User Authentication and Authorization**: Secure login and registration using JWT.
- **Product Management**: CRUD operations for products, with multiple images upload via Cloudinary.
- **Shopping Cart**: Add, remove, and update products in the cart.
- **Checkout Process**: Seamless order placement with payment integration.
- **Order Management**: Track order status and history.
- **Admin Dashboard**: Manage products, orders, and users with an intuitive interface.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Search and Filter**: Easily find products with search and filtering capabilities.
- **Reviews and Ratings**: Users can leave reviews and ratings for products.




## Technologies Used
- **Frontend**: React.js, Redux, React Router, Axios, Bootstrap
- **Backend**: Node.js, Express.js, JWT for authentication
- **Database**: MongoDB, Mongoose
- **Image Hosting**: Cloudinary
- **Payment Gateway**: [Insert Payment Gateway e.g., Stripe]
- **Version Control**: Git

## Installation and Setup


1. **Clone the repository**:
    ``` bash
    git clone https://github.com/vishalyadav0987/E-Commerce.git
    cd E-COMMERCE
    ```

2. **Install backend dependencies**:
    ``` bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

4. **Start the development servers**:
    - Backend server:
      ```bash
      cd ../backend
      npm start
      ```
      - Frontend server:
      ```bash
      cd ../frontend
      npm run dev
      ```
## Configure Environment Variables

- Create a **.env** file in the backend directory and add the following.
- Essential Variables
- PORT=4000
- MONGO_URI 
- STRIPE_API_KEY
- STRIPE_SECERET_KEY
- JWT_SECERET
- JWT_LIFETIME
- JWT_COOKIE_EXPIRE
- SMPT_SERVICE
- SMPT_MAIL
- SMPT_PASSWORD
- SMPT_HOST
- SMPT_PORT
- CLOUDINARY_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
fill each filed with your info respectively.


## Usage

1. Open your browser and navigate to **http://localhost:5173** to access the frontend.
2. Use Postman or any API client to interact with the backend via **http://localhost:4000**.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Contact

For any inquiries or feedback, please contact [viahalyadav0987@gmail.com].
