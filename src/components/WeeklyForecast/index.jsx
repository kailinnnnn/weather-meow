import { useEffect, useState } from "react";

function getDayOfTheWeek(dateString) {
  const date = new Date(dateString);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfWeek[date.getDay()];
}

export default function WeeklyForecast({
  forecast,
  setWeatherIndex,
  weatherIndex,
  weather,
}) {
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

  // when user clicks on a day, set the weather index, and weather displayed and theme will be updated
  const handleClickForecastDay = (index) => {
    setWeatherIndex(index);
  };

  return (
    <div
      className={`h-22 flex justify-between transition-opacity ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {forecast.forecastday.map((day, index) => (
        <div
          key={day.date}
          className={`flex w-[18%] flex-col items-center rounded-lg p-2 hover:bg-neutral-100/55 ${weatherIndex === index ? "bg-neutral-100/80" : "bg-neutral-100/40"} `}
          onClick={() => {
            handleClickForecastDay(index);
          }}
        >
          <div className="text-textNeutral text-center text-[0.6rem]">
            {getDayOfTheWeek(day.date)}
          </div>
          <img src={day.day.condition.icon} alt="" className="h-8 w-8" />
          <div className="text-textDark pt-1 text-center text-xs">
            {day.day.maxtemp_c.toFixed(0)}/{day.day.mintemp_c.toFixed(0)}
          </div>
        </div>
      ))}
    </div>
  );
}
