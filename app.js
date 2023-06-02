const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

const razorpay = new Razorpay({
  key_id:process.env.key_id,
  key_secret:process.env.key_secret
})

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/order", (req, res) =>{
  let options = {
    amount: 300*100,
    currency: "INR",
  };
  razorpay.orders.create(options, function(err, order){
    console.log(order);
    res.json(order)
  })
});

app.listen(3000, function() {
  console.log("Server Running");
});
