const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("hello world!")
});

app.post("/post", (req, res) => {
    res.json({
        body: req.body,
        query: req.query
    })
});

app.listen(5000, ()=>{
    console.log("Listening on port 5000")
});
module.exports = app;