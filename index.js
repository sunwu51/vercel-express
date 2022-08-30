const express = require('express')
var cors = require('cors')
const uuid = require('uuid')
const md5 = require('md5')
const moment = require('moment')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 1 / 用于返回hello world
app.get("/", (req, res) => {
    res.json({
        "/test":"get/post 返回请求参数用于测试",
        "/base64":"get 传str返回code，或传code返回str",
        "/md5": "get 传str返回md5",
        "/uuid": "get 生成一个uuid",
        "/time1": "get 传str（可选）和zone（可选）返回时间详细信息",
        "/time2": "get 传毫秒数time或者hourId，返回时间详细信息",
        "/urlencode":"get 传str返回url编码后的字符串"
    })
});

// 2 /test 用于测试参数，将请求的参数返回
app.get("/test", (req, res) => {
    res.json({
        body: req.body,
        query: req.query
    })
});

app.post("/test", (req, res) => {
    res.json({
        body: req.body,
        query: req.query
    })
});

// 3 /base64 str->code or code->str
app.get("/base64", (req, res) => {
    var {str, code} = req.query;
    try {
        if (str) {
            res.json({code: Buffer.from(str).toString('base64')})
        } else if (code) {
            res.json({str: Buffer.from(code, 'base64').toString()})
        } else {
            res.json({})
        }
    } catch(e){
        console.error(e);
    }
});

// 4 /uuid get a random uuid
app.get("/uuid", (req, res) => {
    res.json({uuid: uuid.v4()})
})

// 5 /md5 str -> hash
app.get("/md5", (req, res)=>{
    var {str} = req.query;
    if (!str){
        res.json({})
    } else {
        res.json({md5:md5(str)})
    }
});

// 6 /time [str zone | time| hourId] => {dateStr, time, hourId}
app.get("/time1", (req, res)=>{
    var {str, zone} = req.query;
    if (!zone)zone='utc';
    try{
        var m = moment(str, zone);
        res.json({
            dateStr: m.format(),
            time: m.valueOf(),
            hourId: parseInt(m.valueOf()/3600000)
        })
    }catch(e){
        res.json(e)
    }
    
})
app.get("/time2", (req, res)=>{
    var {time, hourId} = req.query;
    if(!time) {
        if(!hourId){
            res.json({})
            return
        }
        time = hourId*3600000;
    }
    try{
        var m = moment(time);
        res.json({
            dateStr: m.format(),
            time: m.valueOf(),
            hourId: parseInt(m.valueOf()/3600000)
        })
    }catch(e){
        res.json(e)
    }
})
// 7 urlencode
app.get("/urlencode", (req, res)=>{
    try{
        var {str} = req.query
        res.json({code, encodeURIComponent(str)})
    }catch(e){
        res.json(e)
    }
})


app.listen(5000, ()=>{
    console.log("Listening on port 5000")
});
module.exports = app;
