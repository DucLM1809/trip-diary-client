import React, { useEffect } from "react";
import { useOpenWeather } from "react-open-weather";

const Weather = ({ lat, lng }) => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: "aec7705e01a74a11f8c6a6a5a43393c2",
    lat: lat,
    lon: lng,
    lang: "en",
    unit: "metric",
  });

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  return (
    <div className="flex flex-wrap gap-8">
      {data?.forecast.map((weather, i) => {
        return (
          <div
            key={i}
            className="flex flex-col items-center mt-4 min-w-[250px] min-h-[250px] border-1 border-gray rounded-3 shadow-md"
          >
            <h2 className="text-lg mt-4">{weather.date}</h2>
            <svg
              className="w-[40px] h-[40px] scale-150 mt-10"
              fill={`${
                weather.description.includes("rain")
                  ? "#1D95EC"
                  : weather.description.includes("sky")
                  ? "#f1e101"
                  : "#ccc"
              } `}
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={weather.icon} />
            </svg>
            <p className="inline max-w-[200px] min-h-[50px] text-center mt-3">
              {weather.description}
            </p>
            <span className="">
              Temperature: {weather.temperature.max}/{weather.temperature.min}°C
            </span>
            <span className="mt-4">
              Humidity: {weather.humidity}%
            </span>
            <span className="mt-4 mb-4">
              Wind: {weather.wind}km/h
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Weather;
