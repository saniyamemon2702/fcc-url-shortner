require('dotenv').config();
const express = require('express');
const bp = require('body-parser')
const cors = require('cors');
const app = express();

function randomnum(){
  return Math.floor(Math.random()*100);
}

const data=[{
  original_url: "https://www.freecodecamp.org/learn",
  short_url: randomnum()
}];

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Access the parse results as request.body
app.post('/api/shorturl', function(request, response){
  const urlObj ={original_url:request.body.url, short_url:randomnum()} ;

  if(!data.find(item=>item.original_url===request.body.url)){
    let r = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    r.test(request.body.url)?data.push(urlObj):response.json({error:'invalid url'});
    
  } 
  // console.log('data',data);
  response.json(data.find(item=>item.original_url===request.body.url));
});

app.get('/api/shorturl/:short_url?', function(request, response){  
  const u=data.find(item=>
    {
      console.log('inside find loop, short url is',request.params.short_url);
      if(item.short_url===Number(request.params.short_url))
        {
          console.log('item',item);
          return item.original_url;
        }
    });
  console.log('u',u);
  response.redirect(u.original_url);

  });
 
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
