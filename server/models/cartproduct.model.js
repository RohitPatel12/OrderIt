import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productID : {
        type : mongoose.Schema.ObjectId,
        ref : "product"
    },
    quantity : {
        type : Number,
        default : 1
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },

},
{
    timestamps : true 
})

const cartProductModel = mongoose.model("cartProduct", cartProductSchema)

export default cartProductModel