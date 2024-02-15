import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import TryModels from "./components/TryModels/TryModel";

import ApiKey from "./components/Console/ApiKey";
import Console from "./components/Console/Console";
import Usage from "./components/Console/Usage";
import Billing from "./components/Console/Billing";
import TrainingModel from "./components/Console/TrainingModel";
import TrainingHub from "./components/Console/TrainingHub";
import ModelHub from "./components/Console/ModelHub";
import Referalss from "./components/Console/Referalss";

import Type from "./components/Type/Type";
import TexttoImage from "./components/Type/TexttoImage";
import ImageToImage from "./components/Type/ImageToImage";
import FilterPage from "./components/FiltersPages/FilterPage";
import Signup from "./components/Login/Signup";
import Login from "./components/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UtilityFunctions from "./components/Type/UtilityFunctions";
import Controlnets from "./components/Type/Controlnets";
//import Navbartwo from "./components/Navbartwo/Navbartwo";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/models" element={<TryModels />} />
        <Route path="/models" element={<TryModels />} />
        <Route path="/models/type" element={<Type />} />
        <Route path="/models/texttoImage/:name" element={<TexttoImage />} />
        <Route path="/models/imageToImage/:name" element={<ImageToImage />} />
        <Route
          path="/models/utilityfunctions/:name"
          element={<UtilityFunctions />}
        />
        <Route path="/models/controlnets/:name" element={<Controlnets />} />
        <Route path="/:desiredType" element={<FilterPage />} />

        <Route path="/models" element={<TryModels />} />

        <Route path="/console/key" element={<ApiKey />} />
        <Route path="/console/usage" element={<Usage />} />
        <Route path="/console/billing" element={<Billing />} />
        <Route path="/console/trainingModel" element={<TrainingModel />} />
        <Route path="/console/hub" element={<TrainingHub />} />
        <Route path="/console/modelhub" element={<ModelHub />} />
        <Route path="/console/referals" element={<Referalss />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
