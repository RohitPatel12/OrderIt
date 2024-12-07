import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },
    oderID : {
        type : String,
        required : [true, "Provide OrderID"],
        unique : true 
    },
    productID :  {
        type : mongoose.Schema.ObjectId,
        ref : "product"
    },
    productDetails : {
        _id : String,
        name : String,
        image : Array 
    },
    paymentID : {
        type : String,
        default : ""
    },
    payment_status : {
        type : String,
        default : ""
    },
    delivery_address : {
        type : mongoose.Schema.ObjectId,
        ref : "address"
    },
    subTotalAmt : {
        type : Number,
        default : 0
    },
    totalAmt : {
        type : Number,
        default : 0
    },
    invoice_receipt : {
        type : String,
        default : ""
    }
},
{
    timestamps : true
})

const OrderModel = mongoose.model("order", orderSchema)

export default OrderModel