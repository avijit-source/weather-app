import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';


function HourlyForecast({ hourlyForecast }) {

    const [pages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);

    const [currPage, setCurrPage] = useState(1);

    const paginationBtns = pages.map((val, i) => {
        return (
            <Pagination.Item onClick={() => setCurrPage(val)} key={i} active={i === currPage - 1}>
                {val}
            </Pagination.Item>)
    })

    return (
        <>
            <div className="container">
                <h2 className="text-center mt-3"><u>hourly forecast</u></h2>
                <div className="mt-3 d-flex flex-row flex-wrap justify-content-center">
                    {hourlyForecast.slice((currPage - 1) * 3, ((currPage - 1) * 3) + 3).map((val, i) => (
                        <Card key={i} style={{ width: '20rem', marginRight: "10px", marginBottom: "15px" }}>
                            <Card.Body>
                                <Card.Title>{val.dt_txt}</Card.Title>
                                <Card.Title>Description: {val.weather[0].description}</Card.Title>
                                <Card.Title>Temperature: <span style={{
                                    color: Number(val.main.temp) - 273.15 > 35 ? "red" : (Number(val.main.temp) - 273.15 > 25) ? "orange" : "blue"
                                }}>{Math.floor(((Number(val.main.temp) - 273.15) * (9 / 5)) + 32)}°F <span style={{ color: "black" }}>or</span> {Math.round((Number(val.main.temp) - 273.15))}°C</span></Card.Title>
                                <Card.Title className="mb-3">Feels like: <span style={{
                                    color: Number(val.main.feels_like) - 273.15 > 35 ? "red" : (Number(val.main.feels_like) - 273.15 > 25) ? "orange" : "blue"
                                }}>{Math.floor(((Number(val.main.feels_like) - 273.15) * (9 / 5)) + 32)}°F <span style={{ color: "black" }}>or</span> {Math.round((Number(val.main.feels_like) - 273.15))}°C</span></Card.Title>
                                <Card.Subtitle className="mb-2">Humidity: {val.main.humidity}%</Card.Subtitle>
                                <Card.Subtitle className="mb-2">Atmopheric Pressure: {val.main.pressure} hPa</Card.Subtitle>
                                <Card.Subtitle className="mb-2">wind speed: {val.wind.speed} meter/s</Card.Subtitle>
                                <Card.Subtitle className="mb-2">wind direction: {val.wind.deg}°</Card.Subtitle>
                                <Card.Subtitle className="mb-2">wind gust: {val.wind.gust} meter/s</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            <Pagination><div className="container d-flex justify-content-center flex-wrap">
                {paginationBtns}</div></Pagination>

        </>
    )
}

export default HourlyForecast