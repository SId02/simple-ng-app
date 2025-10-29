
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather-checker',
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-checker.html',
  styleUrl: './weather-checker.css'
})
export class WeatherChecker implements OnInit {
weatherDescriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Drizzle: Light',
    61: 'Rain: Slight',
    63: 'Rain: Moderate',
    65: 'Rain: Heavy',
    80: 'Rain showers: Slight',
    95: 'Thunderstorm',
    99: 'Thunderstorm: Heavy hail'
  };

  topWorldCities = ['New York', 'London', 'Tokyo', 'Paris', 'Dubai', 'Singapore', 'Hong Kong', 'Sydney', 'Los Angeles'];
  topIndiaCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'];

  city = '';
  weatherData: any = null;
  errorMessage = '';
  loading = false;
  loadingTopCities = true;

  showWorldCities = true;
  worldCitiesWeather: any[] = [];
  indiaCitiesWeather: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAllCitiesWeather();
  }

  toggleCities(world: boolean) {
    this.showWorldCities = world;
  }

  getWeatherDescription(code: number): string {
    return this.weatherDescriptions[code] || 'Unknown';
  }

  async fetchWeatherForCity(cityName: string): Promise<any> {
    try {
      const geoRes: any = await this.http
        .get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`)
        .toPromise();
      if (geoRes.results && geoRes.results.length > 0) {
        const { latitude, longitude, name, country } = geoRes.results[0];
        const weatherRes: any = await this.http
          .get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
          .toPromise();
        return { city: name, country, ...weatherRes.current_weather };
      }
      return null;
    } catch {
      return null;
    }
  }

  async fetchAllCitiesWeather() {
    this.loadingTopCities = true;
    const worldPromises = this.topWorldCities.map(c => this.fetchWeatherForCity(c));
    const indiaPromises = this.topIndiaCities.map(c => this.fetchWeatherForCity(c));

    const [worldResults, indiaResults] = await Promise.all([
      Promise.all(worldPromises),
      Promise.all(indiaPromises)
    ]);

    this.worldCitiesWeather = worldResults.filter(Boolean);
    this.indiaCitiesWeather = indiaResults.filter(Boolean);
    this.loadingTopCities = false;
  }

  async getCoordinates(cityName: string) {
    this.errorMessage = '';
    this.weatherData = null;
    this.loading = true;

    try {
      const response: any = await this.http
        .get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`)
        .toPromise();
      if (response.results && response.results.length > 0) {
        const { latitude, longitude, name, country } = response.results[0];
        this.getWeather(latitude, longitude, name, country);
      } else {
        throw new Error('Location not found');
      }
    } catch (error: any) {
      this.loading = false;
      this.errorMessage = error.message || 'Error fetching location';
    }
  }

  async getWeather(latitude: number, longitude: number, city: string, country: string) {
    try {
      const response: any = await this.http
        .get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        .toPromise();
      this.weatherData = { ...response.current_weather, city, country };
    } catch {
      this.errorMessage = 'Weather data not available';
    } finally {
      this.loading = false;
    }
  }

  handleSearch() {
    if (this.city.trim()) {
      this.getCoordinates(this.city);
    } else {
      this.errorMessage = 'Please enter a city name';
    }
  }

  handleCitySuggestion(cityName: string) {
    this.city = cityName;
    this.getCoordinates(cityName);
  }
}
