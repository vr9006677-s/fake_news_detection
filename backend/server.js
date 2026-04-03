const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/fakeNewsDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Schema
const newsSchema = new mongoose.Schema({
    text: String,
    result: String
});

const News = mongoose.model("News", newsSchema);

// Route
app.post("/check-news", async (req, res) => {
    try {
        const text = req.body.text;

        // Python API call
        const response = await axios.post("http://127.0.0.1:5000/predict", {
            text: text
        });

        const result = response.data.result;

        // Save to DB
        const news = new News({ text, result });
        await news.save();

        res.json({ result });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});