
const {PrismaClient} = require('@prisma/client')
const {formatFullDate, formatShortDate} = require("../utils/dateFormatter")
const prisma = new PrismaClient()


const getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                products: true
            },
            orderBy: {
                date: 'desc'
            }
        });


        const formattedOrders = orders.map((order) => {
            const {products} = order
            const totalPriceUsd = products.reduce((acc, product) => acc + product.priceUsd, 0)
            const totalPriceUah = products.reduce((acc, product) => acc + product.priceUah, 0)

            return {
                id: order.id,
                title: order.title,
                description: order.description,
                date: order.date,
                shortDate: formatShortDate(order.date),
                formattedDate: formatFullDate(order.date),
                totalPriceUsd,
                totalPriceUah,
                products
            }
        })

        res.json(formattedOrders)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong'})
    }
}

const deleteOrder = async (req, res) => {
    const {id} = req.params

    try{
        await prisma.product.deleteMany({
            where: {
                orderId: Number(id)
            }
        })

        await prisma.order.delete({
            where: {
                id: Number(id)
            }
        })

        res.json({message: 'Order deleted'})
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Something went wrong'})
    }


};



module.exports = {
    getAllOrders,
    deleteOrder
}