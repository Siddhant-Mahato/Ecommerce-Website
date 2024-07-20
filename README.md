# 🛒 E-commerce Website

Welcome to our E-commerce Website! This platform allows users to search for products, view detailed product information, purchase items using Stripe payment gateway, filter products, and manage their accounts through login, logout, and sign-up functionalities. The website provides both vertical and horizontal product overviews for an optimal browsing experience.

## ✨ Features

- 🔍 **Search Products**: Easily search for products using the search functionality.
- 🛍️ **Product Details**: View detailed information about each product.
- 💳 **Buy via Stripe**: Securely purchase products using the Stripe payment gateway.
- 🔐 **User Authentication**: 
  - 📝 Sign up for a new account.
  - 🔓 Log in to an existing account.
  - 🔒 Log out when done.
- 🔍 **Filter Products**: Filter products based on various categories and criteria.
- 🖼️ **Product Overview**: 
  - 🗂️ Vertical overview for detailed browsing.
  - 📜 Horizontal overview for a quick glance.

## 🌐 Deployment

The website is deployed and accessible at: [E-commerce Website](https://ecommerce-cyuv.onrender.com/)

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### 🛠️ Prerequisites

- Node.js (v18.12.1 or later)
- MongoDB

### 📦 Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ecommerce-website.git
    cd ecommerce-website
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Set up environment variables:

   Create a `.env` file in the backend folder with the following variables:
    ```plaintext
    MONGODB_URI=your_mongodb_uri
    SECRET_KEY=your_secret_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    FRONTEND_URL=http://localhost:3000
    ```

   Create a `.env` file in the frontend folder with the following variables:
    ```plaintext
    REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
    REACT_APP_BACKEND_URL=http://localhost:5000
    ```

### 🏃‍♂️ Running the Application

1. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

2. Start the frontend development server:
    ```bash
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## 💻 Technologies Used

- **Frontend**:
  - React
  - Redux
  - Axios
  - React Router DOM
  - TailwindCSS

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - Stripe

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

For any inquiries or feedback, feel free to reach out:

- 📧 Email: siddhantmahato252@gmail.com
- 🐦 Twitter: https://x.com/StarSiddhant
  
Thank you for visiting our E-commerce Website! Happy shopping! 🛍️✨
