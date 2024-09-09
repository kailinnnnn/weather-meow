import { useEffect, useState } from "react";

export default function ({ weather, weatherIndex }) {
  const [isVisible, setIsVisible] = useState(false);

  // ease in opacity when component is mounted
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => {
      setIsVisible(false);
    };
  }, [weather]);

  const currentWeather = weather.current;
  const forecastWeather = weather.forecast.forecastday[weatherIndex];

  return (
    <div
      className={`flex w-full grow flex-col items-center justify-center transition-opacity ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        // when weatherIndex is 0 (today), display current weather icon, else display forecast weather icon
        src={
          weatherIndex === 0
            ? currentWeather.condition.icon
            : forecastWeather.day.condition.icon
        }
        alt=""
        className={`m-x-auto h-60 w-60 transition-opacity duration-1000 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div>
        <p className="text-textDark text-5xl">{`${
          // when weatherIndex is 0 (today), display current weather temperature, else display forecast average temperature
          weatherIndex === 0
            ? currentWeather.temp_c
            : forecastWeather.day.avgtemp_c
        }°`}</p>
      </div>
    </div>
  );
}
