
let baseURL = `https://api.openweathermap.org/data/2.5/weather?zip='+zip.value+',us`;
let apiKey = '&appid=4264a70a71921333d90bc52c223618a2';

//`${baseURL}?+zip.value+,us&units=metric&APPID=${apiKey}`
//'https://api.openweathermap.org/data/2.5/weather?zip=94040,us&units=metric'
let d = new Date()
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
	
  const last1 = document.getElementById('feelings');
	const zip = document.getElementById('zip');
  fetchWeather(baseURL, zip.value, apiKey)
  
		// New Syntax!
		.then(function (userData) {
			// Add data
			console.log(userData);
			postData('/add', {
				date: newDate,
				temp: userData.main.temp,
				content: userData.main.feels_like,
				last: userData.name
			});
		})
		.then(
			updateUI()
		)
}

const postData = async(url = '', data = {}) => {
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
      last:data.last
		}) // body data type must match "Content-Type" header        
	});

	try {
		const newData = await response.json();
		return newData;
	} catch (error) {
		console.log(error);
		// appropriately handle the error
	}
}

const fetchWeather = async(baseURL , apiKey) => {
	const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip.value},us&units=metric&appid=4264a70a71921333d90bc52c223618a2`)
	try {
		const data = await res.json();

		return data;

	} catch (error) {
		console.log("error", error)
	}
}

const updateUI = async() => {
	const request = await fetch('/all');
	try {
		const data = await request.json()
		document.getElementById('date').innerHTML = `<span class="update"> Date: <br></span> ${data.date}`;
		document.getElementById('content').innerHTML = `<span class="update"> Feels like: <br></span> ${data.content}°c`;
		document.getElementById('temp').innerHTML = `<span class="update"> Temperature: <br></span> ${data.temp}°c`
		document.getElementById('last').innerText = `${data.last}`;

	} catch (error) {
		console.log("error", error);
	}
}
