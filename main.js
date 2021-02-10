const express=require('express');
const app = express();
const path = require('path');
app.use(express.urlencoded({extended: false})); 
// app.use(getWeather);  // .use -> middleware is used for all routes, i.e. application wide
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
// app.use(express.static(process.cwd()+'/public')); <- works!
app.use(express.static(path.join(__dirname,'public')));

function getWeather(req, res, next){
    req.visitorWeather=false;  // prop added to req object
    if (req.visitorWeather){
        res.send("Weather is bad. Come back when not raining!!!");  // processing stops because next() was not called.
    } else next();
}

app.get('/',getWeather, (req, res)=>{
    // res.send("Welcome to our home page")
    // res.send(`
    // <h1>What colour is the sky on a clear day?</h1>
    // <form action='/result' method='POST'>
    //     <input type="text" name = 'color'>
    //     <button>Submit Answer</button>
    // </form>
    // <p>Good weather? ${req.visitorWeather?'Nope it\'s raining!!!': 'Not too bad out there!!!'}</p>        
    // `)
    res.render('home',{     // can pass obj containing any data (as 2nd arg) to template
        isRaining: req.visitorWeather,
        pets: [{name: 'Meowsalot', species: 'cat'},{name: 'Barksalot', species: 'dog'}]
    });
})

app.get('/about',getWeather,(req, res)=>{
    res.send(`Thanks for learning more about us
    <p>Good weather? ${req.visitorWeather?'Nope it\'s raining!!!': 'Not too bad out there!!!'}</p>`);

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

// function petsJSONify(){
//     var pets = [{name: 'Fred', species: 'wombat'},{name: 'Jim', species: 'crested newt'}];
//     return JSON.stringify(pets);
// }

app.get('/api/pets',(req,res)=>{
    // res.send(petsJSONify());
    res.json([{name: 'Fred', species: 'wombat'},{name: 'Jim', species: 'crested newt'}]);
})

app.listen(3000)