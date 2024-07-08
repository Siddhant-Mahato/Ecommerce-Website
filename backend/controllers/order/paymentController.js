const stripe = require("../../config/stripe");
const userModel = require("../../models/userModel");

const paymentController = async (request, response) => {
    try {
        const { cartItems } = request.body;

        const user = await userModel.findOne({ _id: request.userId });

        // Log cartItems to debug
        console.log("Cart Items:", cartItems);

        // Check if cartItems is not empty
        if (!cartItems || cartItems.length === 0) {
            return response.status(400).json({
                message: "No items in the cart",
                error: true,
                success: false,
            });
        }

        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                {
                    shipping_rate: "shr_1PaDOWRtK3vRzQJtatrLrHkR",
                },
            ],
            customer_email: user.email,
            metadata: {
                userId: request.userId,
            },
            line_items: cartItems.map((item, index) => {
                // Ensure item.productId exists and has necessary properties
                if (!item.productId || !item.productId.productName || !item.productId.sellingPrice) {
                    throw new Error(`Invalid product data at index ${index}`);
                }

                // Filter out empty strings from images array
                const images = (item.productId.productImage || []).filter(image => image);

                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.productId.productName,
                            images: images,
                            metadata: {
                                productId: item.productId._id,
                            },
                        },
                        unit_amount: item.productId.sellingPrice * 100, // Stripe expects the amount in cents
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        };

        const session = await stripe.checkout.sessions.create(params);

        response.status(303).json(session);
    } catch (error) {
        response.json({
            message: error?.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = paymentController;
