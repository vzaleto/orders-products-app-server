let activeSession = 0

function setupSocket(io) {
    io.on('connection', (socket) => {
        activeSession++

        console.log(`${activeSession} user connected`)


        io.emit('updateCount', activeSession)
        socket.on('disconnect', () => {
            activeSession--
            console.log(`${activeSession} user disconnected`)
            io.emit('updateCount', activeSession)

        })
    })
}

module.exports = setupSocket