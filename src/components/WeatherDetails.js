import React from 'react'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'

function WeatherDetails({ weatherData }) {


    return (
        <Card className='mt-3' style={{ width: '20rem' }}>

            <Card.Body>
                <Card.Title>{weatherData.name}
                    <Image className="me-2" src={`https://countryflagsapi.com/png/${weatherData.sys.country}`} thumbnail width={50} height={50} />
                </Card.Title>
                <Card.Title>{weatherData.datetime.toLocaleString()}</Card.Title>
                <Card.Title>Description: {weatherData.weather[0].description}</Card.Title>

                <Card.Title>Temperature: <span style={{
                    color: Number(weatherData.main.temp) - 273.15 > 35 ? "red" : (Number(weatherData.main.temp) - 273.15 > 25) ? "orange" : "blue"
                }}>{Math.floor(((Number(weatherData.main.temp) - 273.15) * (9 / 5)) + 32)}°F <span style={{ color: "black" }}>or</span> {Math.round((Number(weatherData.main.temp) - 273.15))}°C</span></Card.Title>
                <Card.Title className="mb-3">Feels like: <span style={{
                    color: Number(weatherData.main.feels_like) - 273.15 > 35 ? "red" : (Number(weatherData.main.feels_like) - 273.15 > 25) ? "orange" : "blue"
                }}>{Math.floor(((Number(weatherData.main.feels_like) - 273.15) * (9 / 5)) + 32)}°F <span style={{ color: "black" }}>or</span> {Math.round((Number(weatherData.main.feels_like) - 273.15))}°C</span></Card.Title>
                <Card.Subtitle className="mb-2">Humidity: {weatherData.main.humidity}%</Card.Subtitle>
                <Card.Subtitle className="mb-2">Atmopheric Pressure: {weatherData.main.pressure} hPa</Card.Subtitle>
                <Card.Subtitle className="mb-2">lat: {weatherData.coord.lat} , lon: {weatherData.coord.lon}</Card.Subtitle>
                <Card.Subtitle className="mb-2">wind speed: {weatherData.wind.speed} meter/s</Card.Subtitle>
                <Card.Subtitle className="mb-2">wind direction: {weatherData.wind.deg}°</Card.Subtitle>
                <Card.Subtitle className="mb-2">wind gust: {weatherData.wind.gust} meter/s</Card.Subtitle>

            </Card.Body>

        </Card>
    )
}

export default WeatherDetails