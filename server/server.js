const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const { networkInterfaces } = require('os');
dotenv.config({ path: '.env' });

const getLocalIpAddress = () => {
    const interfaces = networkInterfaces();
    let ipAddress = '';

    for (const key in interfaces) {
        for (const iface of interfaces[key] || []) {
            if (iface.family === 'IPv4' && !iface.internal) {
                ipAddress = iface.address;
                break;
            }
        }
        if (ipAddress) {
            break;
        }
    }

    return ipAddress || 'localhost';
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        // static host / for prod
        "http://localhost:3000",
        "http://localhost:3001",

        // local host / for dev
        // `http://${getLocalIpAddress()}:3000`,
        // `http://${getLocalIpAddress()}:3001`,
    ],
    credentials: true,
}));

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        // const conn = await mongoose.connect("mongodb://localhost/e_com")
        console.log(`Successfully Connected To The Database`)
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

connectDB()
.then(() => {
    // for production
    const httpServer = http.createServer(app);
    httpServer.listen(PORT, () => {
        console.log(`listening on http://${getLocalIpAddress()}:${PORT}`);
    });

    // for development / local hosting
    // app.listen(PORT, () => {
    //     console.log(`The server is running on http://${getLocalIpAddress()}:${PORT}`);
    // })
    
})

app.get('/', (req, res) => {
    res.json('server is running');
})

const AdminRoute = require('./routers/AdminRoute')
const AdminAuthRoute = require('./routers/AdminAuthRoute')

const UserRoute = require('./routers/UserRoute')
const UserAuthRoute = require('./routers/UserAuthRoute')

app.use('/api/admin', AdminRoute)
app.use('/api/admin/auth', AdminAuthRoute)

app.use('/api/user', UserRoute)
app.use('/api/user/auth', UserAuthRoute)

app.get('/*', (req, res) => {
    res.status(404).json({ error: '404 Not Found!' })
})