const express=require('express');
const app = express();
app.use(express.urlencoded({extended: false}));


app.get('/',(req, res)=>{
    // res.send("Welcome to our home page")
    res.send(`
    <h1>What colour is the sky on a clear day?</h1>
    <form action='/result' method='POST'>
        <input type="text" name = 'color'>
        <button>Submit Answer</button>
    </form>          
    `)
})

app.get('/about',(req, res)=>{
    res.send("Thanks for learning more about us")
})

app.post('/result',(req,res)=>{
    console.log("req******>\n",req.body);
    var inp=req.body.color;
    if (inp.toLowerCase().trim()=="blue"){
        res.send('Nice one! Your answer was:' + inp);
    } else res.send('Moron! Your answer was:' + inp);
})

app.get('/result',(req,res)=>{
    res.send('Wrong url matey!!!')
})


app.listen(3000)