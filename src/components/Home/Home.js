import React from "react";
import "./Home.css";
import axios from "axios";
import image1 from "../assets/download (1).jpg";
import image2 from "../assets/OIP.jpg";
import image3 from "../assets/download (3).jpg";
import image4 from "../assets/download (2).jpg";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../Constants/Api";
const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [models, setModels] = useState([]);

  const getdata = async () => {
    try {
      const res = await axios.get(`${API}/wrapper/findAllModel`);

      setData(res.data);
      setModels(res.data);
      const data2 = models.slice(0, 1);
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

  return (
    <div className="container-fluid home">
      <div className="col home_header ">
        <span className="home_title">
          <strong>Fastest APIs from Generative Models</strong>
        </span>
        <p className="home_p">
          Effortlessly leverage powerful generative models in your apps with
          APIs,<strong>zero setup required</strong>
        </p>

        <input type="text" className="search_input" />
        <button className=" search_btn">Generate</button>

        <div className="col home_img">
          {data.slice(0, 1).map((e) => (
            <>
              <img className="main" src={e.default_image_output} />
            </>
          ))}
          {data.slice(1, 2).map((e) => (
            <>
              <img className="img6" src={e.default_image_output} />
            </>
          ))}
          {data.slice(2, 3).map((e) => (
            <>
              <img className="img7" src={e.default_image_output} />
            </>
          ))}
          {data.slice(3, 4).map((e) => (
            <>
              <img className="img8" src={e.default_image_output} />
            </>
          ))}
        </div>
      </div>
      <div className="row content mt-16">
        <div className="col-4 generative">
          <h1>Generative AI</h1>
          <p className="home_p2">
            Generative AI helps to create new artificial content or data that
            includes Images, Videos, Music, or even 3D models without any effort
            required by humans. The advancements in LLM have led to the
            development of Generative AI.{" "}
          </p>
          <br />
          <button className="trymodel_btn" onClick={() => navigate("/models")}>
            Try Models
          </button>
        </div>
        <div className="col-8 img2 ">
          {data.slice(5, 6).map((e) => (
            <>
              <img src={e.default_image_output} />
            </>
          ))}
          {data.slice(6, 7).map((e) => (
            <>
              <img className="img3" src={e.default_image_output} />
            </>
          ))}

          {/* <img className='img3'
            src="https://www.segmind.com/_next/image?url=https%3A%2F%2Fwww.segmind.com%2Fsdxl2.jpeg&w=3840&q=75"
            alt="person"
          /> */}
          <div className="propmt border">
            <p>
              <strong>Propmt</strong>:Cute panda and robot painting a
              canvas,live ,realistic hight details 4k
            </p>
          </div>
        </div>
      </div>
      <div className="Content">
        <h1>Popular Models</h1>
        <div className="models">
          {data
            ?.slice(2)

            .map((element) => {
              return (
                <div style={{ marginTop: "15px" }}>
                  <img
                    className="img4"
                    src={element.default_image_output}
                    onClick={() => handleOnClick(element)}
                  />
                </div>
              );
            })}
        </div>
        <button className="trymodel_btn2" onClick={() => navigate("/models")}>
          See All Models
        </button>
      </div>
      <div className="Developer_sec">
        <h1>AI-generated Image For All creatives</h1>
        <div className="models">
          <div className="models_inner">
            <img className="img5" src={image1} alt="person" />
            <span>For Designer</span>
          </div>
          <div className="models_inner">
            <img className="img5" src={image2} alt="person" />

            <span>For entrepreneurs</span>
          </div>
          <div className="models_inner">
            <img className="img5" src={image3} alt="person" />
            <span>For developers</span>
          </div>
          <div className="models_inner">
            <img className="img5" src={image4} alt="person" />
            <span>For Content Creaters</span>
          </div>
        </div>
      </div>
      <div className="footer_content">
        <div className="row">
          <div className="col " style={{ textAlign: "left" }}>
            <span>Fuel your creativity with aburst of inspiration.</span>
            <p style={{ fontSize: "16px", color: "white" }}>
              Experience the fastest stable diffusion APIs available today.
            </p>
          </div>
          <div className="col-5">
            <button
              className="trymodels_btn"
              onClick={() => navigate("/models")}
            >
              Try Models
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
