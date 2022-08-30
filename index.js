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

app.get("/base64", (req, res) => {
    var arr = [];
    var {str, code} = req.query;
    if (str) {
        arr.push({str, code: Buffer.from(str).toString('base64')})
    }
    if (code) {
        arr.push({str: Buffer.from(code, 'base64').toString(), code})
    }
    res.json(arr)
});

app.listen(5000, ()=>{
    console.log("Listening on port 5000")
});
module.exports = app;
