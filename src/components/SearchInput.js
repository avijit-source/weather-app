import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';


function SearchInput({ setWeatherData, setHourlyForecast }) {
    const [cityResults, setCityResults] = useState();
    const [city, setCity] = useState("");



    const handleSearch = async () => {
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


            const datetime = getTime(weatherData)
            weatherData.datetime = datetime;
            setWeatherData(weatherData)
            console.log(weatherData)

            const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${cty.lat}&lon=${cty.lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`
            const res2 = await fetch(url2);

            const forecast = await res2.json();


            const list = forecast.list.map(fc => {
                let dt = dateFormat(new Date(fc.dt_txt))
                const year = yearFormat(new Date(fc.dt_txt))
                const hour = hourFormat(new Date(fc.dt_txt))
                return { ...fc, dt_txt: `${dt} ${year} ${hour}` }
            })
            setHourlyForecast(list)
        } catch (err) {
            console.log(err)
        }
    }

    function getTime(data) {
        const { timezone } = data;
        const { dt } = data;
        const dateTime = new Date(dt * 1000);
        const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
        const currentLocalTime = toUtc + 1000 * timezone;
        const selectedDate = new Date(currentLocalTime);
        const date = dateFormat(selectedDate)
        const year = yearFormat(selectedDate)
        const hour = hourFormat(selectedDate)
        return `${date} ${year} ${hour}`; //Thursday, 21 July 2022 18:14
    }

    function dateFormat(d) {
        const newDate = d.toLocaleString("en-IN", {
            day: "numeric",
            weekday: "long",
            month: "long",
        });
        return newDate
    }

    function hourFormat(d) {
        const hour = d.toLocaleString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        return hour
    }

    function yearFormat(d) {
        const year = d.toLocaleString("en-IN", {
            year: "numeric",
        });
        return year
    }


    return (
        <div className="mt-5 fluid-container">
            <h2 className="mb-4 text-center">Weather App</h2>
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