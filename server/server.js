const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config({path: '.env'});
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    credentials: true,
}));

// const local = "mongodb://localhost/e_com";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        // await mongoose.connect(local)
        console.log(`Successfully Connected To The Database`)
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`The server is running on http://localhost:${PORT}`);
    })
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
    res.status(404).json({error: '404 Not Found!'})
})