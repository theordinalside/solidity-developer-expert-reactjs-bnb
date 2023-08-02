import React, { useEffect } from "react";
import ReactGa from "react-ga";

const GA_MEASUREMENT_ID = "G-0MNWESYD3B";

const GoogleAnalytics = () => {
  useEffect(() => {
    ReactGa.initialize(GA_MEASUREMENT_ID);
    const url = window.location;
    console.log(url);
    ReactGa.pageview(url.pathname);
  }, []);

  return <></>;
};

export default GoogleAnalytics;
