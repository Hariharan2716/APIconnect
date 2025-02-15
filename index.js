require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.post("/menu", async (req, res) =>{
  try{
    const{name, description, price} =req.body;

    if(!name || !price){
      return res.status(400).json({error: "Name and price are required."});

    }
    const newItem = new MenuItem({name, description, price });
    await newItem.save();
    res.status(201).json({message: "Menu is created", newItem});
  }
  catch(err){
    res.status(500).json({error: err.message});
  }
})

app.get("/menu", async (req, res)=>{
  try{
    const menuItems = await MenuItem.find();
    res.json(menuItems);

  }catch(err){
    res.status(500).json({error: err.message});
  }
})