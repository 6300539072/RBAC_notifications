// const express = require('express');
// const http = require('http');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const { connectDB } = require('./config/db');
// const { initSocket } = require('./sockets/notificationSocket');

// dotenv.config();
// const app = express();
// const server = http.createServer(app);

// connectDB();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/posts', require('./routes/postRoutes'));
// app.use('/api/comments', require('./routes/commentRoutes'));

// initSocket(server);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
