const express = require("express");
const hbs = require('hbs')
const path = require('path')
const app=express();
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");
var moment = require('moment')
mongoose.set('strictQuery', false);
const formidableMiddleware = require('express-formidable');
app.use(formidableMiddleware());
const staticpath = path.join(__dirname,'public');

mongoose.connect("mongodb+srv://Ashish:Ashish@cluster0.hrrjq87.mongodb.net/Intern?retryWrites=true&w=majority")
    .then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));

    const perDetail = new mongoose.Schema(
        {
            name: String,
            email:String,
            account :Number,
            amount:Number
           
        })
    const Detail = new mongoose.model("Details", perDetail);
    const transaction = new mongoose.Schema(
        {
            from:String,
            to:String,
            amount:Number,
            date:Date,
            date1:String
        }
    )
   const Trdetail = new mongoose.model("transactions",transaction);
app.use(express.static(staticpath));

app.set("view engine",'hbs');

app.get('',(req,res)=>{
   res.render("index");
})
const findEle = async () =>{
    app.get('/table', async (req,res1)=>{
       const res=await Detail
       .find();
  
        console.log(res[5]);
    res1.render('table',{
           name1:res[0].name,Email1:res[0].email,num1:res[0].account,amnt1:res[0].amount,
           name2:res[1].name,Email2:res[1].email,num2:res[1].account,amnt2:res[1].amount,
           name3:res[2].name,Email3:res[2].email,num3:res[2].account,amnt3:res[2].amount,
           name4:res[3].name,Email4:res[3].email,num4:res[3].account,amnt4:res[3].amount,
           name5:res[4].name,Email5:res[4].email,num5:res[4].account,amnt5:res[4].amount,
           name6:res[5].name,Email6:res[5].email,num6:res[5].account,amnt6:res[5].amount,
           name7:res[6].name,Email7:res[6].email,num7:res[6].account,amnt7:res[6].amount,
           name8:res[7].name,Email8:res[7].email,num8:res[7].account,amnt8:res[7].amount,
           name9:res[8].name,Email9:res[8].email,num9:res[8].account,amnt9:res[8].amount,
           name10:res[9].name,Email10:res[9].email,num10:res[9].account,amnt10:res[9].amount
          
           
       })
   })
}

findEle();


app.post('/', (req, res)=>{
    const result=(req.fields);
    const name=result.name; // kisko hm transfer kar rhe hai...
    const name1=result.name1; //mera naaam....
    var age=result.age;  // kitna hm transfer kar rhe hai.....
    var age1=age;
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');
  
    
     const insertTr = async ()=>{
    try {
        const tranDetails = new Trdetail({
            from: name1,
            to:name,
            amount:age,
           date1:date
        })
        const res = await Trdetail.insertMany([tranDetails]);
        // console.log(res);

    } catch (err) {
        console.log(err);
    }
   }
    

    

    const findele = async (name)=>{
        const amnt = await Detail.find({name:name});
        const initial_amnt=amnt[0].amount;  // jisko transfer kiye uske acount me pehle se kitna hai
        age=Number(age)+Number(initial_amnt);
        // console.log(age);
        const updateValue = async (n,age)=>{
            const res = await Detail.updateMany({name: n},{
                $set :{
                    amount:age
                    
                }
            });
            // console.log(res);
        }
        updateValue(name,age)
        
    }
    const findele1 = async (name)=>{
        const amnt = await Detail.find({name:name});
        const initial_amnt=amnt[0].amount;  // merfe acount me pehle se kitna hai
        var mere_fin =Number(initial_amnt)-Number(age1)
        
        const updateValue = async (n,age)=>{
            const res = await Detail.updateMany({name: n},{
                $set :{
                    amount:age
                    
                }
            });
            // console.log(res);
        }
        updateValue(name,mere_fin)
        
    }
    
    findele(name);
    findele1(name1);
  insertTr();
    
});
    
app.get('/transactions',(req,res1)=>{
  
        const findele2 = async () =>{
            const res = await Trdetail.find();
            // console.log(res);
            
                res1.render('transachistory',{
                    
                    show_polls:res
                });
            
           
        }
        findele2();
       
   
 })

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})
