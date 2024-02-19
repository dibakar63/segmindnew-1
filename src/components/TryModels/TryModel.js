import React from "react";
import "./TryModel.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../Constants/Api";
const TryModels = () => {
  const [data, setData] = useState([]);
  const [texttoimagearray, settexttoImageArray] = useState([]);
  const [models, setModels] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeButton, setActiveButton] = useState("");

  const getdata = async () => {
    try {
      const res = await axios.get(`http://localhost:8004/wrapper/findAllModel`);

      setData(res.data);
      setModels(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

 

  const handleOnClick = (element) => {
    console.log(element);
    navigate(`/models/type`, { state: { elemert: element } });
  };

  const desiredOrder = ["Segmind-Vega", "Segmind-VegaRT"];

  data?.sort((a, b) => {
    const indexA = desiredOrder.indexOf(a.title);
    const indexB = desiredOrder.indexOf(b.title);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

    return 0;
  });

 

  const decideType = (desiredType, name) => {
    setActiveButton(name);

    navigate(`/${desiredType}`, {
      state: { models: models, desiredType: desiredType, name: name },
    });
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8004/wrapper/searchModel?title=${query}`
      );
      setData(res.data);

      // Handle the response data as needed
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error
    }
  };

  return (
    <div className="container-fluid trymodel mt-30">
      <div className=" titleContent">
        <input
          type="text"
          placeholder="Search Your AI generated Image Here"
          className="input_btn"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search_btn2" onClick={handleSearch}>
          Search
        </button>
        <div className="titlebutton">
          <div className="titlebtninnerdiv">
            <button
              className={`filterbtns ${
                activeButton === "textToImage" ? "active" : ""
              }`}
              onClick={() => decideType("textToImage", "textToImage")}
            >
              Text To Image
            </button>
            <button
              className={`filterbtns ${
                activeButton === "imageToImage" ? "active" : ""
              }`}
              onClick={() => decideType("imageToImage", "imageToImage")}
            >
              Image to Image
            </button>
            <button
              className={`filterbtns ${
                activeButton === " UtilityFunctions" ? "active" : ""
              }`}
              onClick={() => decideType("UtilityFunctions", "UtilityFunctions")}
            >
              Utility Functions
            </button>
            <button
              className={`filterbtns ${
                activeButton === "Controlnets" ? "active" : ""
              }`}
              onClick={() => decideType("Controlnets", "Controlnets")}
            >
              Controlnets
            </button>
            <button
                className={`filterbtns ${
                  activeButton === "Architecture" ? "active" : ""
                }`}
                onClick={() => decideType("Architecture", "Architecture")}
              >
                Architecture
              </button>
              <button
                className={`filterbtns ${
                  activeButton === "POD" ? "active" : ""
                }`}
                onClick={() => decideType("POD", "POD")}
              >
                Print On Demand
              </button>
          </div>
          {/* <div className="titlesearchdiv">
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Controllenet"
              className="input"
              
            />
          </div> */}
        </div>
      </div>
      <div className="imgDiv2 imgflex">
        {data
          ?.slice(0, 2)

          .map((element) => {
            return (
              <div>
                <img
                  src={element.default_image_output}
                  onClick={() => handleOnClick(element)}
                />
              </div>
            );
          })}
      </div>
      <div style={{ marginTop: "20px" }}>
        <div className="container-fluid imgdiv2 imgcolumn">
          {data
            ?.slice(2)

            .map((element) => {
              return (
                <div style={{ marginTop: "15px" }}>
                  <img
                    src={element.default_image_output}
                    onClick={() => handleOnClick(element)}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TryModels;
