import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Weather } from '../weather-component/weather';
import { WeatherService } from './weather-service';

@Component({
  selector: 'app-weather-component',
  templateUrl: './weather-component.component.html',
  styleUrls: ['./weather-component.component.css'],
})
export class WeatherComponent implements OnInit {
  weather: Weather[] = new Array(9);
  city: String[] = new Array(9);
  index: number = 0;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    const savedWeather = this.weatherService.sessionRetrieve();
    if (savedWeather) {
      for (let p = 0; p < 9; p++) {
        if (savedWeather[p]) {
          this.weather[p] = savedWeather[p];
        }
      }
    }
    this.fetchWeatherDataEveryMinute();
  }

  fetchWeatherData(event) {
    this.city[event.target.id] = event.target.value;
    this.fetchWeather(event.target.id);
  }

  fetchWeatherDataEveryMinute() {
    timer(0, 15 * 1000).subscribe(() => {
      for (let i = 0; i < 9; i++) {
        if (this.city[i] != null) {
          console.log('Im executed');
          this.fetchWeather(i);
        }
      }
    });
  }

  fetchWeather(id) {
    this.weatherService
      .weatherData(this.city[id])
      .pipe(filter((weather) => !!weather))
      .subscribe(
        (weather) => {
          weather.main.temp = +(weather.main.temp - 273).toFixed(2);
          weather.main.temp_min = +(weather.main.temp_min - 273).toFixed(2);
          weather.main.temp_max = +(weather.main.temp_max - 273).toFixed(2);
          this.weather[id] = weather;
          this.weather[id].img =
            'http://openweathermap.org/img/wn/' +
            weather.weather[0].icon +
            '@2x.png';
        },
        (error) => {
          this.city[id] = null;
        }
      );
    this.weatherService.sessionSave(this.weather[id], id);
  }
}
