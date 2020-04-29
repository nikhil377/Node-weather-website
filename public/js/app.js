
console.log('inside client javascript');

const weatherForm = document.querySelector('form');
const Search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent= '';
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location= Search.value;
    messageOne.textContent='Loading';
    messageTwo.textContent='';

    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent='Error'

            console.log('Please enter another location for search');
            
        }
        else{
        messageOne.textContent=data.address;
        messageTwo.textContent=data.forecast;

        console.log(data.address);
        console.log(data.forecast);
        }
    })

})
})








// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
        
//     })

// })