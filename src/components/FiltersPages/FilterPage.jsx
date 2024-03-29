import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSmall from "./LoadingSmall";
import "../TryModels/TryModel.css";

const FilterPage = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [models, setModels] = useState(location.state.models);
  const [filterdata, setFilterdata] = useState([]);
  const [activeButton, setActiveButton] = useState(location.state.name);
  const [loading, setLoading] = useState(true);
  console.log(filterdata);
  // function getDetails(modelSlug) {
  //   return axios
  //     .get(`http://localhost:8004/wrapper/findOneModel?name=${modelSlug}`)
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       console.error(
  //         `Error fetching details for model ${modelSlug}: ${error}`
  //       );
  //       throw error;
  //     });
  // }
  // const fetchData = async () => {
  //   const filteredModels = [];

  //   for (const model of models) {
  //     try {
  //       setLoading(true);
  //       const details = await getDetails(model.slug);

  //       model.details = details.model;

  //       if (
  //         model.details &&
  //         model.details.type === location.state.desiredType
  //       ) {
  //         filteredModels.push(model);
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(
  //         `Error fetching details for model ${model.slug}: ${error}`
  //       );
  //       setLoading(false);
  //     }
  //   }

  //   setFilterdata(filteredModels);
  // };

  useEffect(() => {
    if (location.state.desiredType == "textToImage") {
      gettexttoImage();
    } else if (location.state.desiredType == "imageToImage") {
      getImagetoImage();
    } else if (location.state.desiredType == "UtilityFunctions") {
      // const controlnetsModels = location.state.models?.slice(0, -5);
      // setFilterdata(controlnetsModels?.slice(-6));
      getutilityfunctions();
    } else if (location.state.desiredType == "Controlnets") {
      getControlnets();
    }
  }, [location.state.desiredType]);

  const gettexttoImage = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8004/wrapper/textToImagedisplay"
      );
      setFilterdata(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const getImagetoImage = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8004/wrapper/imageToImagedisplay"
      );
      setFilterdata(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const getutilityfunctions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8004/wrapper/utilityFunctiondisplay"
      );
      setFilterdata(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const getControlnets = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8004/wrapper/controlnetsdisplay"
      );
      setFilterdata(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnClick = (element) => {
    navigate(`/models/type`, { state: { elemert: element } });
  };
  const decideType = (desiredType, name) => {
    navigate(`/${desiredType}`, {
      state: { models: models, desiredType: desiredType },
    });
    setActiveButton(name);
  };
  return (
    <>
      <div className="container2">
        <div className="titleContent">
          <h1>Models</h1>
          <p>
            Here are some popular generative model APIs that you can use in your
            application.
          </p>
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
                  activeButton === "UtilityFunctions" ? "active" : ""
                }`}
                onClick={() =>
                  decideType("UtilityFunctions", "UtilityFunctions")
                }
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
            </div>
          </div>
        </div>
        {loading ? (
          <div className="loadingDiv">
            <LoadingSmall loading={loading} />
          </div>
        ) : (
          <>
            <div style={{ marginTop: "20px" }}>
              <div className="imgdiv2">
                {filterdata.map((element) => {
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
          </>
        )}
      </div>
    </>
  );
};

export default FilterPage;
