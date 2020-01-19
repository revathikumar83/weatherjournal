
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=94040,us'
let apiKey = '&appid=4264a70a71921333d90bc52c223618a2';
//let api = '4264a70a71921333d90bc52c223618a2'
//let url = 'api.openweathermap.org/data/2.5/weather?zip=94040,us'
//https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=4264a70a71921333d90bc52c223618a2

let d = new Date()
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    
const last =  document.getElementById('feelings');

const zip = document.getElementById('zip');
  
fetchWeather(baseURL,zip.value,apiKey)
  // New Syntax!
  .then(function(userData){
    // Add data
    console.log(userData);
    postData('/add', {date: newDate, temp: userData.main.temp, content: userData.main.feels_like, last: last.value} );
  })
  .then(
    updateUI()
  )
}

const postData = async ( url = '', data = {})=>{
    // console.log(data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content,
        
      }) // body data type must match "Content-Type" header        
    });

      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log(error);
      // appropriately handle the error
      }
  }

  const fetchWeather = async(baseURL, zip,apiKey) =>{
      const res = await fetch('https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=4264a70a71921333d90bc52c223618a2')
      try{
          const data = await res.json();
          
          return data;

      }catch(error){
      console.log("error",error)
      }
  }

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const data = await request.json()
    document.getElementById('date').innerHTML = `<span class="update"> Date: <br></span> ${data.date}` ;
    document.getElementById('content').innerHTML = `<span class="update"> Feels like: <br></span> ${data.content}`;
    document.getElementById('temp').innerHTML = `<span class="update"> Temperature: <br></span> ${data.temp}`
    document.getElementById('last').innerText  =  `${data.last}`;

  }catch(error){
    console.log("error", error);
  }
}

/* let baseURL = 'http://api.animalinfo.org/data/?animal='
let apiKey = '&appid=9f15e45060...';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const newAnimal = document.getElementById('animal').value;

  const fav =  document.getElementById('fav').value;

  getAnimal('/fakeAnimalData',)
  // New Syntax!
  .then(function(data){
    // Add data
    console.log(data);
    postData('/addAnimal', {animal:data.animal, fact: data.fact, fav:fav} );
  })
  .then(
    updateUI()
  )
}

const postData = async ( url = '', data = {})=>{
    // console.log(data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

  const getAnimal = async(url) =>{
      const res = await fetch(url)
      try{
          const data = await res.json();
          console.log(data)
          return data;
      }catch(error){
      console.log("error",error)
      }
  }

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData[0].animal;
    document.getElementById('content').innerHTML = allData[0].facts;
    document.getElementById('temp').innerHTML = allData[0].fav;

  }catch(error){
    console.log("error", error);
  }
} */