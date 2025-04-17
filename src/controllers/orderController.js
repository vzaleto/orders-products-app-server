
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


const getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                products: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const formattedOrders = orders.map((order) => {
            const {products} = order

            const totalPriceUsd = products.reduce((acc, product) => acc + product.priceUsd, 0)
            const totalPriceUah = products.reduce((acc, product) => acc + product.priceUah, 0)


            return {
                id: order.id,
                title: order.title,
                description: order.description,
                date: order.date,
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

module.exports = {
    getAllOrders
}