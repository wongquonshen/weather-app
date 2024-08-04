export interface LocationData {
  name: string;
  country: string;
  lat: string; // latitude
  lon: string; // longitude
}
  
export interface WeatherData {
  coord: {
      lat: string; // latitude
      lon: string; // longitude
  },
  dt: number; // date time
  weather: [
    {
      id: number;
      main: string; // Main weather condition (e.g., Clouds)
      description: string; // More detailed condition description
      icon: string; // Weather icon code
    }
  ];
  main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
  };
}

export interface SearchHistoryItem {
  location: LocationData;
  timestamp: string;
}

export type LocationResponse = LocationData | { error: string };
export type WeatherResponse = WeatherData | { error: string };
  
// Fetch location information including country
export const fetchLocation = async (query: string): Promise<LocationResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_OPENWEATHER_GEO_URL}/geo/1.0/direct?q=${query}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`);
  if (!response.ok) {
    return { error: 'Failed to fetch location data' };
  }
  const [data] = await response.json(); 

  // api return no data
  if (!data) {      
    return { error: 'Location cannot be found! Please try again.' };
  }
  
  return { name: data.name, country: data.country, lat: data.lat, lon:data.lon };
};
// Fetch weather data using coordinates
export const fetchWeather = async (lat: string, lon: string): Promise<WeatherResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_OPENWEATHER_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`);
  if (!response.ok) {
    return { error: 'Failed to fetch weather data' };
  }
  const data = await response.json();

  if (!data) {      
    return { error: 'weather data cannot be found! Please try again' };
  }

  return data;
};
  