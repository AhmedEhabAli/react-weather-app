// MUI
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

// React
import { useEffect, useState } from "react";

// External Libraries
import axios from "axios";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import "moment/min/locales";

let cancelAxios = null;

export default function Weather() {
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState();
  const [locale, setLocale] = useState("ar");
  const [temp, setTemp] = useState({
    responseTemp: null,
    min: null,
    max: null,
    icon: null,
    description: "",
    wind: null,
  });
  const dir = locale === "ar" ? "rtl" : "ltr";

  function handleLanguage() {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDateAndTime(moment().format("dddd، D MMMM YYYY"));
  }

  useEffect(() => {
    i18n.changeLanguage(locale);
    moment.locale(locale);
    setDateAndTime(moment().format("dddd، D MMMM YYYY"));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=a595aa368dfa569224a7591baa5c9ebf",
        {
          cancelToken: new axios.CancelToken((cancel) => {
            cancelAxios = cancel;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 273.15);
        const min = Math.round(response.data.main.temp_min - 273.15);
        const max = Math.round(response.data.main.temp_max - 273.15);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        const wind = response.data.wind.speed;
        console.log(response.data);
        setTemp({
          responseTemp,
          min,
          max,
          description,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          wind,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      cancelAxios();
    };
  }, []);

  return (
    <Container>
      <div className="card" dir={dir}>
        <div className="city">
          <h2>{t("Cairo")}</h2>
          <h5>{dateAndTime}</h5>
        </div>
        <hr />

        <div className="weather-details">
          <div className="weather-info">
            <div className="temp">
              <h1>°{temp.responseTemp}</h1>
              <img src={temp.icon} alt="temp icon" />
            </div>
            <div>
              <h4>{t(temp.description)}</h4>
            </div>
            <div>
              <h4>
                {t("wind")}: {temp.wind} {t("km/h")}
              </h4>
            </div>
            <div className="min-max">
              <h5>
                {t("min")}: {temp.min}°
              </h5>{" "}
              |{" "}
              <h5>
                {t("max")}: {temp.max}°
              </h5>
            </div>
          </div>
          <div>
            <CloudIcon className="cloud" />
          </div>
        </div>
      </div>
      <div className="btn" dir={dir}>
        <Button
          variant="text"
          style={{ color: "white", textTransform: "capitalize" }}
          onClick={handleLanguage}
        >
          {locale === "en" ? "Arabic" : "انجليزي"}
        </Button>
      </div>
    </Container>
  );
}
