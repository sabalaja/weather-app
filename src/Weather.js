import React, { Component } from 'react';
import CitiesList from './CitiesList'
import FilterForm from './FilterForm';

class Weather extends Component {

    constructor() {
        super();

        this.state = {
            weatherArray: [],
            filteredWeatherArray: []
        }
    }

    getWeatherData = () => {
        fetch('https://danepubliczne.imgw.pl/api/data/synop')
            .then(resp => resp.json())
            .then(weather => {

                this.setState({
                    weatherArray: weather,
                    filteredWeatherArray: weather
                });
            });
    }

    filterCities = e => {
        let filteredArray = this.state.weatherArray.filter(cityObj => {
            return cityObj.stacja.toUpperCase().includes(e.target.value.toUpperCase());
        });

        this.setState({ filteredWeatherArray: filteredArray })

    }


    componentDidMount() {
        this.getWeatherData();

    }


    render() {

        return (
            <div className="weather">
                <FilterForm filterCities={this.filterCities} />
                < CitiesList citiesArray={this.state.filteredWeatherArray} />
            </div>
        )
    }
}


export default Weather;