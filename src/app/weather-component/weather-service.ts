import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../weather-component/weather';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {}

  weatherData(city: String): Observable<Weather> {
    let url =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&appid=fc9540b7bc5b11e4d76ce97e0e31cfd5';

    if (city.length > 1) {
      return this.http.get<Weather>(url);
    }
  }

  sessionSave(weather: Weather, id: number) {
    const savedWeatherData = window.localStorage.getItem('weatherData');
    if (savedWeatherData) {
      const weatherData = JSON.parse(savedWeatherData);
      weatherData[id] = weather;
      window.localStorage.setItem('weatherData', JSON.stringify(weatherData));
    } else {
      const cityWeather = [];
      cityWeather[id] = weather;
      window.localStorage.setItem('weatherData', JSON.stringify(cityWeather));
    }
  }

  sessionRetrieve() {
    const weatherData = window.localStorage.getItem('weatherData');
    return JSON.parse(weatherData);
  }
}
