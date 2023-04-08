const express = require("express")
const bodyParser = require("body-parser")
const exp = require("constants")

const app= express()
let item=['Watch Movie','Coding','Cooking']
let works = []

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true }));
app.use(express.static("public"))



app.get("/",function(req,res)
{
    var today = new Date()
    var currentday = today.getDay()
    var date = today.getDate()
    var month = today.getMonth()
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    var day = ""
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if(currentday === 6 || currentday === 0){
        day = "Weekend"
        // res.sendFile(__dirname+'/weekand.html')
    }
    else{
        day = "Weekday"
        // res.sendFile(__dirname+"/working.html")
    }
    res.render('list',{listTitle:"Normal-works", kindOfDay: days[currentday],Dayname: day, Date:Number(date), Month:months[Number(month)], New:item })
})



app.get("/work", function(req,res)
{
    var today = new Date()
    var currentday = today.getDay()
    var date = today.getDate()
    var month = today.getMonth()
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    var day = ""
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if(currentday === 6 || currentday === 0){
        day = "Weekend"
    }
    else{
        day = "Weekday"
    }
    res.render('list',{listTitle:"Work-List",kindOfDay: days[currentday],Dayname: day, Date:Number(date), Month:months[Number(month)], New:works })
})



app.post("/",function(req,res)
{
    let input = req.body.newItem;
    console.log(req.body.listadd)
    if(req.body.listadd==='Work-List'){
        works.push(input)
        res.redirect("/work");
    }
    else if(req.body.listrem === 'Work-List'){
        works.pop(input)
        res.redirect("/work");
    }
    else if(req.body.listadd==='Normal-works'){
        item.push(input)
        res.redirect("/");
    }
    else{
        item.pop()
        res.redirect("/")
    }
})



app.listen(3000,function(){
    console.log("Server started")
})