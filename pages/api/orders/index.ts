import type { NextApiRequest, NextApiResponse } from 'next'
import { IOrder } from '../../../interfaces'
import { getSession } from 'next-auth/react'
import { db } from '../../../database'
import { Product, Order } from '../../../models'

type Data =
    | { message: string }
    | IOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createOrder(req, res)

        default:
            return res.status(400).json({ message: 'Bad request' })
    }




}

async function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { orderItems, total } = req.body as IOrder;
    // Verificar que tengamos un usuario
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Debe de estar autenticado para hacer esto' })
    }
    //Crear un arreglo con los productos que la persona quiere
    const productsIds = orderItems.map(product => product._id) //del body > orderItems saco un array con los _id de los productos para luego buscarlos
    await db.connect()

    const dbProducts = await Product.find({ _id: { $in: productsIds } }) // tengo un arreglo con los productos traidos de la base de datos

    try {
        const subTotal = orderItems.reduce((prev, current) => {
            const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price
            if (!currentPrice) {
                throw new Error('Verifique el carrito de nuevo, producto no existe')
            }

            return (currentPrice * current.quantity) + prev
        }, 0)

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
        const backendTotal = subTotal * (taxRate + 1)

        if (total !== backendTotal) {
            throw new Error('Total no cuadra con el monto')
        }
        const userId = session.user!._id
        const newOrder = new Order({ ...req.body, isPaid: false, user: userId })
        await newOrder.save();
        await db.disconnect()
        return res.status(200).json(newOrder)


    } catch (error) {
        await db.disconnect()
        console.log(error)
        res.status(400).json({ message: (error as Error).message || 'Revise logs del servidor' })
    }

    return res.status(200).json(req.body)
}
