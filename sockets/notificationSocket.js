let io;

const initSocket = (server) => {
    io = require('socket.io')(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
        }
    });

    io.on('connection', (socket) => {
        console.log('New WebSocket connection********');

        socket.on('join', (userId) => {
            socket.join(userId.toString());
        });

        socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });
    });
};

const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

module.exports = { initSocket, getIo };
// let io;

// const initSocket = (socketIo) => {
//     io = socketIo;
//     io.on('connection', (socket) => {
//         console.log('New WebSocket connection');

//         // Handle socket events here
//         socket.on('join', (userId) => {
//             socket.join(userId.toString());
//         });
//     });
// };

// const getIo = () => {
//     if (!io) {
//         throw new Error('Socket.io not initialized');
//     }
//     return io;
// };

// module.exports = { initSocket, getIo };
// let io;

// const initSocket = (socketIo) => {
//     io = socketIo;
//     io.on('connection', (socket) => {
//         console.log('New WebSocket connection');

//         socket.on('join', (userId) => {
//             socket.join(userId.toString());
//         });

//         // socket.on('disconnect', () => {
//         //     console.log('User disconnected');
//         // });
//     });
// };

// module.exports = { initSocket };
