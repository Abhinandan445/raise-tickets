const express = require("express");
const path = require('path');
const colors = require('colors');
const { errorHandler } = require("./middleware/errorMiddlerware");
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

//Connect to db
connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

const userRoute = require('./routes/userRoutes');
const ticketRoute = require('./routes/ticketRoutes');

//Routes
app.use('/api/users', userRoute);
app.use('/api/tickets', ticketRoute);

//Serve Frontend
if(process.env.NODE_ENV === 'production'){
    //Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    
    app.get('*', (res, req) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
}else{
    app.get('/', (req, res) => {
        res.status(200).json({message: 'Welcome to Support Desk API'})
    })
}

//Middlewares
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
