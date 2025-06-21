const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();


async function main() {

    try {
        await prisma.$connect();
        await prisma.product.deleteMany()
        await prisma.order.deleteMany()
        await prisma.productType.deleteMany()

        const productType1 = await prisma.productType.create({
            data: {
                name: "Product Type 1",
            }
        })

        const productType2 = await prisma.productType.create({
            data: {
                name: "Product Type 2",
            }
        })


        const order1 = await prisma.order.create({
            data: {
                title: "Order 1",
                description: "Order 1 description",
                date: new Date(),
                products: {
                    create: [
                        {
                            serialNumber: 1001,
                            isNew: true,
                            photo: 'https://example.com/photo1.jpg',
                            title: 'title 1',
                            typeId: productType1.id,
                            specification: 'specification 1',
                            guaranteeStart: new Date('2022-01-01'),
                            guaranteeEnd: new Date('2025-01-01'),
                            priceUsd: 200,
                            priceUah: 8000,
                            date: new Date(),
                        },
                        {
                            serialNumber: 1002,
                            isNew: true,
                            photo: 'https://example.com/photo2.jpg',
                            title: 'title 2',
                            typeId: productType2.id,
                            specification: 'specification 2',
                            guaranteeStart: new Date('2022-02-02'),
                            guaranteeEnd: new Date('2025-02-02'),
                            priceUsd: 202,
                            priceUah: 8002,
                            date: new Date(),
                        },
                    ],
                },
            }
        })

        console.log("seed created");
    } catch (err) {
        console.error(err)
    } finally {
        await prisma.$disconnect();
    }

}

main()