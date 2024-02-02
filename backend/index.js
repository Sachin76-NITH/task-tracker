const express=require("express");
const app=express();
const bodyParser = require('body-parser');
const mongoose =require("mongoose")

const dotenv=require("dotenv");
dotenv.config();

const PORT=process.env.PORT|| 5050;


mongoose.connect(process.env.CONNECTION_URL)
.then(()=>app.listen(PORT,()=> console.log(`server is running on port :${PORT}`)))
.catch((error)=>console.log(error.message));

const cors=require("cors")

app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json());




app.use(cors());
app.use(express.json())
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));

const tasksRoutes = require('./routes/tasksRoutes');
const authRoutes = require("./routes/AuthRoutes.js")
// Routes
app.use('/tasks', tasksRoutes);
app.use("/",authRoutes)

