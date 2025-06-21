const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io')
const setupSocket = require('../src/socket/socket');

const ordersRouter = require('./routes/orderRouter')
const productsRouter = require('./routes/productRoutes')

require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(cors())
app.use(express.json())


const io = new Server(server, {
    cors: {
        origin: '*',
    }
})

setupSocket(io)



app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})

