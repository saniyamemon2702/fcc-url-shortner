
// fetching form data
const inputUrl=document.getElementById('url_input');
const form=document.getElementsByTagName('form');
const button=document.getElementById("button");
button.addEventListener('click',  async (e)=>{
console.log('url',inputUrl.value);

     await fetch('http://localhost:3000/api/shorturl', {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            
                url: `${inputUrl.value}`,
                
        })
    }).then(res=>res.redirect('http://localhost:3000/api/shorturl'))
  
    
   
}
);

