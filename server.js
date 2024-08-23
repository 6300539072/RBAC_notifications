const express = require('express');
const http = require('http');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { initSocket } = require('./sockets/notificationSocket');

require('dotenv').config();
const app = express();
const server = http.createServer(app);
const socketIo = require('socket.io');



// const io = socketIo(server, {
//     cors: {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST'],
//         credentials: true
//     }
// });

connectDB();

// app.use(cors({
//     origin: '*', // Replace with your frontend URL
//     methods: ['GET', 'POST'], // Allow these methods
//     credentials: true, // Enable credentials (cookies, authorization headers, etc.)
// }));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));


initSocket(server);

// io.on('connection', (socket) => {
//     console.log('New WebSocket connection ************');

//     socket.on('join', (userId) => {
//         console.log("userId",userId)
//         socket.join(userId.toString());
//     });

//     // Handle additional socket events here

//     socket.on('disconnect', () => {
//         console.log('WebSocket disconnected');
//     });
// });
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
