'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image'
import { fetchLocation, fetchWeather, LocationData, SearchHistoryItem, WeatherData } from '@/api/weather';

import Navbar from "./_components/shared/Navbar";
import Input from "./_components/Input";
import Button from "./_components/Button";
import Search from "./_components/icons/Search";
import Card from "./_components/Card";

import { useTheme } from '@/context/ThemeContext';
import Trash from './_components/icons/Trash';
import { NumberFormatter } from './utils/NumberFormatter';
import { formatDateTime } from './utils/DateFormatter';
import Footer from './_components/shared/Footer';


export default function Home() {

  // set classes for theme
  const { theme } = useTheme();
  const searchThemeClass = theme === 'dark' ? 'bg-dark' : 'bg-light-300';
  const itemThemeClass = theme === 'dark' ? 'bg-transparent text-white border-2 border-white/40 p-[6px]' : 'bg-white shadow-lg text-gray-300 p-[9px] ';

  const [input, setInput] = useState<string>('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  // reset any form fields
  const resetFields = () => {
    setInput('');
    setError('');
  }

  // run initial default data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // get default geo location data
        const locationResponse = await fetchLocation('Kuala Lumpur');
        if ('error' in locationResponse) {
          setError(locationResponse.error);
          setLocation(null);
          return;
        }
        setLocation(locationResponse);

        // get default weather data
        const weatherResponse = await fetchWeather(locationResponse.lat, locationResponse.lon);
        if ('error' in weatherResponse) {
          setError(weatherResponse.error);
          setWeather(null);
          return;
        }
        setWeather(weatherResponse);

        resetFields();
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        setError('Failed to fetch data. Please try again.');
        setLocation(null);
        setWeather(null);
      }
    };
  
    fetchInitialData();
  }, []);

  /**
   * submit form
   * @param event
   */
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // only search if there are 3 or more characters
    if (input.length < 3) {
      return setError('Please enter 3 characters or more.');
    };
  
    try {
      // get location data
      const locationData = await fetchLocation(input);      
      if ('error' in locationData) {
        setError(locationData?.error);
        return;
      }

      setLocation(locationData);

      // get weather data
      const weatherData = await fetchWeather(locationData.lat, locationData.lon);
      if ('error' in weatherData) {
        setError(weatherData.error);
        return;
      }
      setWeather(weatherData);

      // reset fields
      resetFields();
  
      // Save location data and current timestamp to history
      const currentTime = formatDateTime(Date.now() / 1000);
      setSearchHistory(prevHistory => [
        { location: locationData, timestamp: currentTime },
        ...prevHistory
      ]);
    } catch (error) {
      setError('Failed to fetch data: ' + error);
    }
  };

  /**
   * search history item
   * 
   * @param historyItem 
   * @returns 
   */
  const searchFromHistory = async (historyItem: SearchHistoryItem) => {
    try {
      setLocation(historyItem.location);

      const weatherData = await fetchWeather(historyItem.location.lat, historyItem.location.lon);
      if ('error' in weatherData) {
          setError(weatherData.error);
          return;
      }
      setWeather(weatherData);

      // reset fields
      resetFields();

    } catch (error) {
      console.error('Error re-fetching weather data:', error);
      setError('Failed to re-fetch weather data.');
    }
  };

  /**
   * delete selected history location
   * 
   * @param index 
   */
  const deleteHistoryItem = (index: number) => {
    setSearchHistory(prevHistory => prevHistory.filter((_, item) => item !== index));
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col max-w-[700px] min-h-[calc(100vh-190px)] mx-[18px] lg:mx-auto mt-[26px]">
        <form id="search-form" className="w-full flex justify-center gap-5" onSubmit={handleSearch}>
          <Input 
            label="City"
            value={input}
            onChange={e => setInput(e.target.value)}
          />

          <Button type="submit" className={`${searchThemeClass} `}>
            <Search width={34} height={34} className="text-white" />
          </Button>
        </form>

        {
          error.length > 0 && 
          <div className="text-sm text-red-600 mt-2">
            {error}
          </div>
        }

        <Card className={`relative ${theme === 'dark' ? 'bg-opacity-30' : 'bg-opacity-20 border border-white/50'} rounded-[40px] px-[26px] py-5 lg:px-10 lg:py-12 mt-[140px] lg:mt-[112px]`}>
          <div className="hidden lg:flex items-center">
            <div>
              <div className="text-sm lg:text-base">
                Today’s Weather
              </div>
              <div className="text-5xl lg:text-7xl mt-[18px]">
                {weather?.main.temp && NumberFormatter(weather?.main.temp)}&deg;
              </div>
              <div>
                H: {weather?.main.temp_max && NumberFormatter(weather?.main.temp_max)}&deg; L:{weather?.main.temp_min && NumberFormatter(weather?.main.temp_min)}&deg;
              </div>
            </div>

            {
              weather?.weather[0].icon ?? (
                <Image
                  className="absolute size-[300px] ml-2 top-[-10%] right-10"
                  src={`${process.env.NEXT_PUBLIC_OPENWEATHER_IMG_URL}/img/wn/${weather?.weather[0].icon}@2x.png`}
                  alt="Weather Now"
                  height={40}
                  width={40}
                />
              )
            }
          </div>

          <div className="hidden lg:flex items-center justify-between mt-[10px]">
            <div>
              {location?.name}, {location?.country}
            </div>
            <div>
              {weather?.dt && formatDateTime(weather?.dt)}
            </div>
            <div>
              Humidity: {weather?.main.humidity}%
            </div>
            <div>
              {weather?.weather[0].main}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex lg:hidden items-center">
              <div>
                <div className="text-sm lg:text-base">
                  Today’s Weather
                </div>
                <div className="text-5xl lg:text-7xl mt-[18px]">
                  {weather?.main.temp && NumberFormatter(weather?.main.temp)}&deg;
                </div>
                <div>
                  H: {weather?.main.temp_max && NumberFormatter(weather?.main.temp_max)}&deg; L:{weather?.main.temp_min && NumberFormatter(weather?.main.temp_min)}&deg;
                </div>
                <div>
                  {location?.name},  {location?.country}
                </div>
              </div>
            </div>

            <div className="flex lg:hidden flex-col items-end justify-end text-end mt-[10px]">
              {
                weather?.weather[0].icon ?? (
                  <Image
                    className="absolute size-[157px] ml-2 top-[-10%] right-5"
                    src={`${process.env.NEXT_PUBLIC_OPENWEATHER_IMG_URL}/img/wn/${weather?.weather[0].icon}@2x.png`}
                    alt="Weather Now"
                    height={40}
                    width={40}
                  />
                )
              }
              <div>
                {weather?.weather[0].main}
              </div>
              <div>
                Humidity: {weather?.main.humidity}%
              </div>
              <div>
                {weather?.dt && formatDateTime(weather?.dt)}
              </div>
            </div>
          </div>

          <Card className={`${theme === 'dark' ? 'bg-opacity-30' : 'bg-opacity-20'} rounded-3xl px-5 py-[22px] lg:px-[26px] lg:py-[23px] mt-5 lg:mt-[26px]`}>
            <div>
              Search History
            </div>

            <div className="mt-[26px]">
              {
                searchHistory.length > 0 ? (
                  <>
                    {
                      searchHistory.map((item, index) => {
                        return (
                          <Card key={index} className={`${theme === 'dark' ? 'bg-opacity-50' : 'bg-opacity-40'} rounded-2xl px-5 py-[22px] lg:px-[26px] lg:py-[23px] mt-5 lg:mt-[26px]`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <div>
                                  {item?.location.name},{item?.location.country}
                                </div>

                                <div className="block lg:hidden text-opacity-50">
                                {item?.timestamp}
                                </div>
                              </div>
                              <div className="flex items-center">
                                <span className="hidden lg:block text-opacity-50 mr-[10px]">
                                  {item?.timestamp}
                                </span>

                                <span className="grid grid-flow-col gap-[10px]">
                                  <Button onClick={() => searchFromHistory(item)} variant="circle" customTheme={true} className={`${itemThemeClass} p-[6px]`}>
                                    <Search width={theme === 'dark' ? 18 : 16 } height={theme === 'dark' ? 18 : 16 } />
                                  </Button>

                                  <Button onClick={() => deleteHistoryItem(index)} variant="circle" className={`${itemThemeClass}`}>
                                    <Trash width={theme === 'dark' ? 18 : 16 } height={theme === 'dark' ? 18 : 16 } />
                                  </Button>
                                </span>
                              </div>
                            </div>
                          </Card>
                        )
                      })
                    }
                  </>
                ) : (
                  <Card className={`${theme === 'dark' ? 'bg-opacity-50' : 'bg-opacity-40'} rounded-2xl px-5 py-[22px] lg:px-[26px] lg:py-[23px] mt-5 lg:mt-[26px]`}>
                    <div className="text-center">
                      No history yet. Try searching something.
                    </div>
                  </Card>
                )
              }
            </div>
          </Card>
        </Card>
      </main>
      <Footer />
    </>
  );
}
