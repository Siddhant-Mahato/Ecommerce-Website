const backendDomain = "http://localhost:8080";

const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/signup`,
        method: "post",
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post",
    },
    current_user:
    {
        url: `${backendDomain}/api/user-details`,
        method: "get",
    },

    user_Logout:
    {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },

    allUsers:
    {
        url: `${backendDomain}/api/all-users`,
        method: "get"
    },
    updateUser:
    {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct:
    {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct:
    {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct:
    {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    categoryProduct:
    {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "get"
    },
    categoryWiseProduct:
    {
        url: `${backendDomain}/api/get-categoryWiseProduct`,
        method: "post"
    },
    productDetails:
    {
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCartProduct:
    {
        url: `${backendDomain}/api/addtocart`,
        method: "post"
    },
    countAddToCartProduct:
    {
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: "get"
    },
    addToCartProductView:
    {
        url: `${backendDomain}/api/view-cart-product`,
        method: "get"
    },
    updateCartProduct:
    {
        url: `${backendDomain}/api/update-cart-product`,
        method: "post"
    },
    deleteCartProduct:
    {
        url: `${backendDomain}/api/delete-cart-product`,
        method: "post"
    },
    searchProduct:
    {
        url: `${backendDomain}/api/search`,
        method: "get"
    },
    filterProduct:
    {
        url: `${backendDomain}/api/filter-product`,
        method: "post"
    },
    payment:
    {
        url: `${backendDomain}/api/checkout`,
        method: "post"
    },
    getOrder:
    {
        url: `${backendDomain}/api/order-list`,
        method: "get"
    },
    

    
};

export default SummaryApi;