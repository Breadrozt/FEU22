//Variabler och eventlisteners för användning i koden.
let xhr = new XMLHttpRequest();
xhr.addEventListener('load', onload);

//API nyckel för att få tillgång till openWeather
let apiKey = "09e9f2350d7ff8c2293877550ad2a47b";
xhr.responseType = "json";

//Ändra stad här för att 
let inputTest = "Helsingborg"
const apiTest = `http://api.openweathermap.org/geo/1.0/direct?q=${inputTest}&limit=3&appid=${apiKey}`

let weatherQuestion = new XMLHttpRequest();
weatherQuestion.addEventListener ('load', weatherRequest);
weatherQuestion.responseType = "json";

xhr.open('GET', apiTest);
xhr.send();
//funktion för att plocka ut Longitude och Latidude från namnet på en ${inputTest}
function onload (){
    console.log("in onload")
//kolla ifall openweathermap skickar tillbaka en tillgänglig status.
    if(xhr.status < 400){
        console.log(' long /lat  is back bish ');
        let response = xhr.response;
        let longitude = response[0].lon;
        let latitude = response[0].lat;
        console.log (latitude);
        console.log (longitude);
// open och send för att få vädret från Lon / Lat
        weatherQuestion.open('GET',`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=09e9f2350d7ff8c2293877550ad2a47b`)
        weatherQuestion.send();
    }
    else
    {console.log(' shit went wrong')}
}
//funktionen för att använda long/lat för att hämta vädret på platsen
function weatherRequest () {
    console.log ("in weatherRequests")
    if(weatherQuestion.status < 400){
        console.log ('weather is back bish')
        let weatherResponse = weatherQuestion.response
        console.log (weatherResponse)
// Openweathermap skickar tillbaka i Kelvin så omvandlar svaret till .celcius
        let tempKelvin = weatherResponse.main
        output = (tempKelvin.temp-273.15)
        console.log(output)
        let resault = document.getElementById("resault");
        resault.innerHTML = `${Math.floor(output)} Grader`
    }
    else {
        console.log(" weather is nowhere to be found")
    }

}
