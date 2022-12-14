import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import moment from "moment"

function SearchInput({ setWeatherData, setHourlyForecast }) {
    // state for holding city search results from api which contains lat and lon of each city object
    const [cityResults, setCityResults] = useState();

    // state for holding city value typed by user
    const [city, setCity] = useState("");

    // state for loading while api is calling
    const [loading, setLoading] = useState(false)

    // when user clicks 
    const handleSearch = async () => {
        if (!city) {
            alert("Please enter a city");
            return false;
        }
        console.log("api called")
        const geocodingurl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_WEATHER_KEY}`
        try {
            const geocode = await fetch(geocodingurl)
            const res = await geocode.json()
            setCityResults(res)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCityClick = async (cty) => {
        console.log("api called")
        setCityResults(null);
        setCity("")
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cty.lat}&lon=${cty.lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`
            const res = await fetch(url);

            const weatherData = await res.json();




            const datetime = getDateTime(weatherData)
            weatherData.datetime = datetime;
            setWeatherData(weatherData)
            console.log(weatherData)

            const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${cty.lat}&lon=${cty.lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`
            const res2 = await fetch(url2);

            const forecast = await res2.json();


            const list = forecast.list.map(fc => {


                const datetimeformatted = moment(new Date(fc.dt_txt)).format("YYYY-MM-DD hh:mm A")
                const day = moment(new Date(fc.dt_txt)).format("dddd")

                return { ...fc, dt_txt: datetimeformatted + ` ${day}` }
            })
            setHourlyForecast(list)
        } catch (err) {
            console.log(err)
        }
    }

    function getDateTime(data) {
        const { dt } = data;
        const day = moment(new Date((dt * 1000))).format("dddd")
        return moment(new Date((dt * 1000))).format("YYYY-MM-DD hh:mm A") + ` ${day}`
    }



    function getLocation() {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("geolocation is not supported on this device")
            setLoading(false);

        }
    }

    async function showPosition(position) {

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${`${Number(position.coords.latitude).toFixed(2)}`}&lon=${`${Number(position.coords.longitude.toFixed(2))}`}&appid=${process.env.REACT_APP_WEATHER_KEY}`
            const res = await fetch(url);

            const weatherData = await res.json();


            const datetime = getDateTime(weatherData)
            weatherData.datetime = datetime;
            setWeatherData(weatherData)
            console.log(weatherData)

            const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${`${Number(position.coords.latitude).toFixed(2)}`}&lon=${`${Number(position.coords.longitude.toFixed(2))}`}&appid=${process.env.REACT_APP_WEATHER_KEY}`
            const res2 = await fetch(url2);

            const forecast = await res2.json();


            const list = forecast.list.map(fc => {
                let dt = moment(new Date(fc.dt_txt)).format("YYYY-MM-DD hh:mm A")
                const day = moment(new Date(fc.dt_txt)).format("dddd")
                return { ...fc, dt_txt: dt + ` ${day}` }
            })
            setHourlyForecast(list)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    if (loading === true) {
        return (
            <Spinner className="mt-4" animation="grow" />
        )
    }
    return (
        <div className="mt-5 fluid-container">
            <h2 className="mb-4 text-center">Weather App</h2>
            <button onClick={getLocation} className="btn btn-success">Get current location weather</button>
            <hr />
            <InputGroup className="mb-3">
                <Form.Control value={city} type="text" onChange={(e) => setCity(e.target.value)} width="300px" placeholder="search a place" />
                <button onClick={handleSearch} className="btn btn-primary">search</button>
            </InputGroup>

            {cityResults && (
                <ListGroup>
                    {cityResults.map((city, i) => {
                        return (
                            <ListGroup.Item key={i} onClick={() => handleCityClick(city)}>
                                <span className="me-2">{city.name}</span>
                                <span className="me-2">{city.state}</span>
                                <Image className="me-2" src={`https://countryflagsapi.com/png/${city.country}`} thumbnail width={50} height={50} />
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            )}
        </div>
    )
}

export default SearchInput