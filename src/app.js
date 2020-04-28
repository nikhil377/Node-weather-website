const path = require('path');
const express =require('express'); 
const hbs =require('hbs');

const app =express();
const geocode= require('./utils/geocoding');
const forecast =require('./utils/forecast');

console.log('dir name',__dirname); // current directory name

// define path for express config
const publicDirectoryPath= path.join(__dirname, '../public'); // changed it to public(index.js) using path module
const viewsPath= path.join(__dirname, '../template/views');
const partialPath= path.join(__dirname, '../template/partials');


//views setup 
//setup handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath)); // using static path to set starting page

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name: 'Nikhil Arora'
    })
});
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Nikhil Arora'
    })
});
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText: 'Help Text', 
        name: 'Nikhil Arora'
    })
});




app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide address query string'
        })
    }

        geocode(req.query.address,(error, {latitude, longitude,location} = {})=>{
        if(error)
        {
            return res.send({error});
        }
       forecast(latitude,longitude ,(error, forecastData)=>{
                if(error){
                    return res.send({error});
                }
                
               res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                }) 
              
            })
         })
   })

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide query string'
        });
    }
    console.log(req.query);
    return res.send({
        products:[]
       
    });
});
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Page Not Found',
        helpText: 'Help page not available', 
        name: 'Nikhil Arora'
    })
});
app.get('*',(req,res)=>{
    res.render('404',{
        title:'Page Not Found',
        helpText: 'Page not available', 
        name: 'Nikhil Arora'
    })
});

// app.get('',(req,res)=>{
//     res.send('<h1>Welcome to main  page</h1>');
// });
// app.get('/about',(req,res)=>{
//     res.send('<h1>Welcome to chat box website</h1>');
// });

// app.get('/json',(req,res)=>{
//     res.send({
//         Name: 'Nikhil',
//         Work: 'Wipro'
//     });
// });


app.listen(3000,()=>{
    console.log('server is up and running at 3000');
    
});