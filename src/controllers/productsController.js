const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
// const {formatFullDate, formatShortDate} = require("../utils/dateFormatter");
const {formatProduct} = require("../utils/formatProduct");

const getProducts = async (req, res) => {
    const {typeId} = req.query;
    try {
        const products = await prisma.product.findMany({
            where: typeId ? {typeId: Number(typeId)} : {},
            include: {
                order: true,
                type: true
            },
            orderBy: {
                date: 'desc'
            }
        });

        const formattedProducts = products.map(formatProduct);

        res.status(200).json(formattedProducts);
    } catch (error) {
        console.error(`Error getting products: ${error.message}`);
        res.status(500).json({error: error.message});
    }
};


const getProductById = async (req, res) => {
    const {id} = req.params;
    if (isNaN(Number(id))) {
        return res.status(400).json({error: 'Invalid id'});
    }
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                order: true
            }
        })
        if (!product) {
            return res.status(404).json({error: 'Product not found'});
        }
        res.json(formatProduct(product))

    } catch (error) {
        console.error(`Error getting product by id: ${error.message}`);
        res.status(500).json({error: error.message});
    }


}

const createProduct = async (req, res) => {
    const {
        orderId,
        serialNumber,
        isNew,
        photo,
        title,
        typeId,
        specification,
        guaranteeStart,
        guaranteeEnd,
        priceUsd,
        priceUah,
        date
    } = req.body;
    if (!orderId || !serialNumber || isNew === undefined || !photo || !title || !typeId || !specification || !guaranteeStart || !guaranteeEnd || !priceUsd || !priceUah || !date) {
        return res.status(400).json({error: 'Missing required fields please'});
    }
    try {
        const product = await prisma.product.create({
            data: {
                orderId:Number(orderId),
                serialNumber:Number(serialNumber),
                isNew,
                photo,
                title,
                typeId: Number(typeId),
                specification,
                guaranteeStart: new Date(guaranteeStart),
                guaranteeEnd: new Date(guaranteeEnd),
                priceUsd: Number(priceUsd),
                priceUah: Number(priceUah),
                date: new Date(date)
            },
            include: {order: true}
        });

        res.status(201).json(formatProduct(product));
    } catch (error) {
        console.error(`Error creating product: ${error.message}`);
        res.status(500).json({error: error.message});
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    console.log(req.params)
    console.log(id)

    if(isNaN(Number(id))){
        return res.status(400).json({error: 'Invalid id'});
    }
    try {
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        });
        res.json({message: 'Product deleted'});
    } catch (error) {
        console.error(`Error deleting product: ${error.message}`);
        res.status(500).json({error: error.message});
    }
}


const updateProduct = async (req, res) => {
    const {id} = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({error: 'Invalid id'});
    }
    const {
        orderId,
        serialNumber,
        isNew,
        photo,
        title,
        typeId,
        specification,
        guaranteeStart,
        guaranteeEnd,
        priceUsd,
        priceUah,
        date
    } = req.body;
    try {
        const product = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                orderId,
                serialNumber,
                isNew,
                photo,
                title,
                typeId: Number(typeId),
                specification,
                guaranteeStart: new Date(guaranteeStart),
                guaranteeEnd: new Date(guaranteeEnd),
                priceUsd,
                priceUah,
                date: new Date(date)
            },
            include: {order: true}
        });
        res.json(formatProduct(product));
    } catch (error) {
        console.error(`Error updating product: ${error.message}`);
        res.status(500).json({error: error.message});
    }
}

const getAllProductTypes = async (req, res) => {
    try {
        const productTypes = await prisma.productType.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        res.status(200).json(productTypes);
    } catch (error) {
        console.error(`Error getting product types: ${error.message}`);
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProductTypes
}