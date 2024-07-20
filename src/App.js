import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import DetailsPage from "./Pages/DetailsPage";
import Explorepage from "./Pages/Explorepage";
import SearchPage from "./Pages/SearchPage";
import Header from "./Components/Header";
import MobileNavigation from "./Components/MobileNavigation";
import Footer from "./Components/Footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "./store/tmovies2";

function App() {
  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");
      console.log("response", response);
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content min-h-[90vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":explore" element={<Explorepage />} />
            <Route path=":explore/:id" element={<DetailsPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
          <MobileNavigation />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
