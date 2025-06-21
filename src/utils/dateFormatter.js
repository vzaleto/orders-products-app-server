function formatFullDate(date) {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}



function formatShortDate(date) {
    const d = new Date(date)
    return `${String(d.getDate()).padStart(2, '0')} / ${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`
}

module.exports = {
    formatFullDate,
    formatShortDate
}