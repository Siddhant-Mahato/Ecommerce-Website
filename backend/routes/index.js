const express = require('express');
const router = express.Router();

const userSignUpController = require('../controllers/users/userSignUp');
const userSignInController = require('../controllers/users/userSignIn');
const userDetailsController = require('../controllers/users/userDetail');
const authToken = require('../middleware/authToken');
const userLogout = require('../controllers/users/userLogout');
const allUsers = require('../controllers/users/allUsers');
const updateUser = require('../controllers/users/updateUser');
const UploadProductController = require('../controllers/products/uploadProduct');
const getProductController = require('../controllers/products/getProduct');
const updateProductController = require('../controllers/products/updateProduct');
const getCategoryProduct = require('../controllers/products/getCategoryProductOne');
const getCategoryWiseProduct = require('../controllers/products/getCategoryWiseProduct');
const getProductDetails = require('../controllers/products/getProductDetails');
const addToCartController = require('../controllers/users/addToCartController');
const countAddToCartProduct = require('../controllers/users/countAddToCartProduct');
const addToCartViewProduct = require('../controllers/users/addToCartViewProduct');
const updateAddToCartProduct = require('../controllers/users/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controllers/users/deleteAddToCartProduct');
const searchProduct = require('../controllers/products/searchProduct');
const filterProductController = require('../controllers/products/filterProduct');
const paymentController = require('../controllers/order/paymentController');
const webhooks = require('../controllers/order/webhooks');
const orderController = require('../controllers/order/order.controller');


router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// For admin routes

router.get("/all-users",authToken , allUsers);
router.post("/update-user", authToken, updateUser);

// For products

router.post("/upload-product",authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/get-categoryWiseProduct", getCategoryWiseProduct);
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct);
router.post("/filter-product",filterProductController);

// user add to cart

router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct",authToken, countAddToCartProduct);
router.get("/view-cart-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)


//payment and order

router.post("/checkout", authToken, paymentController)
router.post("/webhook", webhooks)  // /api/webhook
router.get("/order-list", authToken, orderController);





module.exports = router;