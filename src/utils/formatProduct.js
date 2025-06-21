const { formatFullDate, formatShortDate } = require('./dateFormatter')

const formatProduct = (p) => ({
    id: p.id,
    orderId: p.orderId,
    serialNumber: p.serialNumber,
    isNew: p.isNew,
    photo: p.photo,
    title: p.title,
    typeId: p.typeId ,
    typeName: p.type?.name || 'Unknown type',
    specification: p.specification,
    guaranteeStart: p.guaranteeStart,
    guaranteeEnd: p.guaranteeEnd,
    priceUsd: p.priceUsd,
    priceUah: p.priceUah,
    date: p.date,
    formattedDate: formatFullDate(p.date),
    shortDate: formatShortDate(p.date),
    orderTitle: p.order?.title || 'Unknown prihod',
})

module.exports = {
    formatProduct
}