import React, {useState} from "react"
import "../../css/body.css"
import "../../css/header.css"
import git from "../../imgs/github.png";
import humidityimg from "../../imgs/humidity.png"
import sunriseimg from "../../imgs/sunrise.png"
import sunsetimg from "../../imgs/sunset.png"
import windimg from "../../imgs/wind.png"

function Weather_Data(props){
    let allWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let allMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const [searchValue,setSearchValue] = useState("rome");
    const [cityName,setCityName] = useState('');
    const [countryName, setCountryName] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('')
    const [week, setWeek] = useState('');
    const [day, setDay] = useState('');
    const [sunset,setSunset] = useState('');
    const [sunrise,setSunrise] = useState('');
    const [weatherDescription,setWeatherDescription] = useState('');
    const [weatherMain,setWeatherMain] = useState('');
    const [temperature,setTemperature] = useState('');
    const [tempMax, setTempMax] = useState('');
    const [tempMin, setTempMin] = useState('');
    const [humidity,setHumidity] = useState('');
    const [windSpeed,setWindSpeed] = useState('');
    const [error,setError] = useState(false);




    const sendSearch = async(e) =>{
        e.preventDefault();

        try{
            function capitalize(str){
                return str.charAt(0).toUpperCase() + str.slice(1);
            }


            const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&type=accurate&APPID`
            );
            const dataObjectWeather = await responseWeather.json();
            const dataDate = new Date(parseInt(dataObjectWeather.dt)*1000)
            const dateSunset = new Date(parseInt(dataObjectWeather.sys.sunset)*1000);
            const hourSunset = (dateSunset.getHours()).toString().padStart(2,0);
            const minutesSunset = (dateSunset.getMinutes()).toString().padStart(2,0);
            const timeTillSunset = `${hourSunset}:${minutesSunset}`;
            const dateSunrise = new Date(parseInt(dataObjectWeather.sys.sunrise)*1000);
            const hourSunrise = (dateSunrise.getHours()).toString().padStart(2,0);
            const minutesSunrise = (dateSunrise.getMinutes()).toString().padStart(2,0);
            const timeTillSunrise = `${hourSunrise}:${minutesSunrise}`;
            setCityName(dataObjectWeather.name);
            setCountryName(dataObjectWeather.sys.country)
            setSunset(timeTillSunset);
            setSunrise(timeTillSunrise);
            setWeatherDescription(capitalize(dataObjectWeather.weather[0].description));
            setWeatherMain(dataObjectWeather.weather[0].main);
            setTempMax(Math.trunc(dataObjectWeather.main.temp_max).toString())
            setTempMin(Math.trunc(dataObjectWeather.main.temp_min).toString())
            setTemperature( Math.trunc(dataObjectWeather.main.temp).toString());
            setHumidity(dataObjectWeather.main.humidity);
            setWindSpeed(Math.trunc(dataObjectWeather.wind.speed).toString());
            setYear(dataDate.getFullYear())
            setMonth(allMonths[dataDate.getMonth()])
            setWeek(allWeek[dataDate.getDay()]);
            setDay(dataDate.getDate());

            setError(false);


        }
        catch(err){
            console.log(err);
            setError(true);
        }
    }


//getting the search value is annoying me
    return(
        <div>
            <div className={"header-content"} onLoad={sendSearch}>
                <p style={{width: "145px"}}>Weather App</p>
                <form className={"input-field-place"} onSubmit={sendSearch} >
                    <input id={"location-search"} type={"text"} required onChange={(e)=> setSearchValue(e.target.value)} placeholder={"Search by location"} />
                </form>

                <p className={"link"}><a href={"https://github.com/Altord"} style={{color: "white", textDecoration: "none"}}><img className={"git-pic"} src={git}/>Link to Github</a></p>
            </div>
            <div className={"container"}>

                   <div className={"top-bar"}>
                        <div className={"area"} >
                            {cityName} {countryName}
                        </div>
                        <div style={{fontSize: "1rem"}}>
                            {week}, {month} {day}, {year}
                        </div>
                        <div style={{fontSize: "1rem"}}>
                            {weatherDescription}
                        </div>
                    </div>
                    <div className={"main-information"}>
                        {temperature}°
                        <div className={"temp-vary"} style={{fontSize: "1.2rem", marginTop: "12px"}}>Min: {tempMin}° / Max: {tempMax}°</div>


                    </div>
                    <div className={"accessory-box"}>
                        <div className={"accessory1"}>

                          <img className={"accessory-img"} src={windimg}/> {windSpeed} m/s <div style={{ marginTop: "12px"}}><img className={"accessory-img"} src={humidityimg}/> {humidity}%</div>

                        </div>
                        <div className={"accessory2"}>

                            <img className={"accessory-img"} src={sunriseimg}/> {sunrise} <div style={{ marginTop: "12px"}}><img className={"accessory-img"} src={sunsetimg}/> {sunset}</div>

                        </div>
                    </div>
                    <div/>

            </div>
        </div>
    )


}

export default function Full_Content(){

    return(
            <Weather_Data/>
    )
}