import React, {useState} from "react"
import "../../css/body.css"
import "../../css/header.css"
import git from "../../css/github.png";


function Weather_Data(){
    const [state, setState] = useState({
        searchValue: '',
        cityName: '',
        sunset: '',
        sunrise: '',
        weatherDescription: '',
        weatherMain: '',
        temperature: '',
        humidity: '',
        windSpeed: '',
        clouds: '',
        imgUrl: '',
        error: false
    })

    const updateField = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const sendSearch = async(e) =>{

        e.preventDefault();

        try{

            const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid==${setState.searchValue}&units=metric&`
            );
            const dataObjectWeather = await responseWeather.json();
            const dateSunset = new Date(parseInt(dataObjectWeather.sys.sunset)*1000);
            const hourSunset = (dateSunset.getHours()).toString().padStart(2,0);
            const minutesSunset = (dateSunset.getMinutes()).toString().padStart(2,0);
            const timeTillSunset = `${hourSunset}:${minutesSunset}`;
            const dateSunrise = new Date(parseInt(dataObjectWeather.sys.sunrise)*1000);
            const hourSunrise = (dateSunrise.getHours()).toString().padStart(2,0);
            const minutesSunrise = (dateSunrise.getMinutes()).toString().padStart(2,0);
            const timeTillSunrise = `${hourSunrise}:${minutesSunrise}`;
            const responseImg = await fetch(`https://api.giphy.com/v1/gifs/search?api_key==${dataObjectWeather.weather[0].main}-forecast&limit=1`);
            const dataObjectImg = await responseImg.json();
            setState.cityName(dataObjectWeather.name);
            setState.sunset(timeTillSunset);
            setState.sunrise(timeTillSunrise);
            setState.weatherDescription(dataObjectWeather.weather[0].description);
            setState.weatherMain(dataObjectWeather.weather[0].main);
            setState.temperature(dataObjectWeather.main.temp);
            setState.humidity(dataObjectWeather.main.humidity);
            setState.windSpeed(dataObjectWeather.wind.speed);
            setState.clouds(dataObjectWeather.clouds.all);
            setState.imgUrl(dataObjectImg.data[0].images.original.url)
            setState.error(false);

        }
        catch(err){
            console.log(err);
            setState.error = true;
            console.log(state.searchValue)
        }
    }
//getting the search value is annoying me
    return(
        <div>
            <div className={"header-content"}>
                <p style={{width: "145px"}}>Weather App</p>
                <form className={"input-field-place"} onSubmit={sendSearch}>
                    <input id={"location-search"} type={"text"} placeholder={"Search by location"} />
                </form>

                <p className={"link"}><a href={"https://github.com/Altord"} style={{color: "white", textDecoration: "none"}}><img className={"git-pic"} src={git}/>Link to Github</a></p>
            </div>
            <div className={"container"}>
                <div className={"top-bar"}>
                    <div>
                        hi {setState.weatherMain}
                    </div>
                </div>
                <div className={"main-information"}>

                </div>
                <div className={"accessory1"}>

                </div>
                <div className={"accessory2"}>

                </div>
                <div/>
                <div className={"converter"}>
                    <div className={"celsius"}>

                    </div>
                    <div className={"farenheit"}>

                    </div>
                </div>
            </div>
        </div>
    )


}

export default function Full_Content(){

    return(
            <Weather_Data/>
    )
}