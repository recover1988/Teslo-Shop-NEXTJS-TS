import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order, User, Product } from '../../../models';

type Data = {
    numberOfOrders: number;
    paidOrders: number;
    notPaidOrders: number;
    numberOfClients: number;
    numberOfProducts: number;
    productsWithNoInventory: number;
    lowInventory: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await db.connect();
    
    const numberOfOrders = await Order.countDocuments({});
    const paidOrders = await Order.countDocuments({ isPaid: true });
    const notPaidOrders = await Order.countDocuments({ isPaid: false });
    const numberOfClients = await User.countDocuments({ role: 'client' });
    const numberOfProducts = await Product.countDocuments({});
    const productsWithNoInventory = await Product.countDocuments({ inStock: 0 });
    const lowInventory = await Product.countDocuments({ inStock: { $gt: 0, $lt: 10 } })

    await db.disconnect();

    res.status(200).json({
        numberOfOrders,
        paidOrders,
        notPaidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    })
}