import mongoose, { Schema, model, Model } from "mongoose";
import { IOrder } from "../interfaces";


const orderSchema = new Schema({
    name: { type: String, required: true },

},
    {
        timestamps: true,
    }
)

const User: Model<IOrder> = mongoose.models.User || model('Order', orderSchema)

export default User;