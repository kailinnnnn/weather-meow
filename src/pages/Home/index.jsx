import { useEffect, useState } from "react";
import api from "../../utils/api";
import WeeklyForecast from "../../components/WeeklyForecast";
import Header from "../../components/Header";
import Weather from "../../components/Weather";
import ReactLoading from "react-loading";

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      },
    );
  });
};

const getThemeByConditionCode = (conditionCode) => {
  if (conditionCode >= 0 && conditionCode < 1030) {
    return "sunny";
  } else if (conditionCode >= 1030 && conditionCode < 1060) {
    return "cloudy";
  } else if (conditionCode >= 1060) {
    return "rainy";
  }
};

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [weatherIndex, setWeatherIndex] = useState(0);
  const [isloading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("rainy");

  // fetch user location and weather data
  useEffect(() => {
    getCurrentLocation().then((location) => {
      api.getForecastWeather(location).then((data) => {
        setWeather(data);
        setIsLoading(false);
      });
    });
  }, []);

  // when waether data is fetched, set theme based on weather condition
  useEffect(() => {
    if (weather) {
      if (weatherIndex === 0) {
        setTheme(getThemeByConditionCode(weather.current.condition.code));
      } else {
        setTheme(
          getThemeByConditionCode(
            weather.forecast.forecastday[weatherIndex].day.condition.code,
          ),
        );
      }
    }
  }, [weather, weatherIndex]);

  const renderContent = () => {
    if (isloading)
      return (
        <ReactLoading
          type="spin"
          color="white"
          height="4rem"
          width="4rem"
          className="m-auto"
        />
      );
    return (
      <>
        <Header
          weather={weather}
          setWeather={setWeather}
          setIsLoading={setIsLoading}
          theme={theme}
        />
        <Weather weather={weather} weatherIndex={weatherIndex} />
        <WeeklyForecast
          forecast={weather.forecast}
          setWeatherIndex={setWeatherIndex}
          weatherIndex={weatherIndex}
          weather={weather}
        />
      </>
    );
  };

  return (
    <div
      className={`text-textColor flex h-full w-full flex-col justify-between bg-gradient-to-b p-10 from-${theme}-gradStart to-${theme}-gradEnd`}
    >
      {renderContent()}
    </div>
  );
};

export default Home;
