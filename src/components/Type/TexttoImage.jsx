import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, InputNumber, Row, Slider, Space } from "antd";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import axios from "axios";
import "./Aimodels.css";

const TexttoImage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate("/models");
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);
  const location = useLocation();
  const model = location?.state?.details?.model;

  const [advanced, setAdvancedtrue] = useState(false);
  const [image, setImage] = useState(model?.default_image_output || "");
  const [prompt, setPrompt] = useState(
    model?.parameters?.prompt?.displayValue || ""
  );
  const [seed, setSeed] = useState(model?.parameters?.seed?.displayValue || 0);
  const [negative_prompt, setnegative_prompt] = useState(
    model?.parameters?.negative_prompt?.displayValue || ""
  );
  const [scheduler, setScheduler] = useState(
    model?.parameters?.scheduler?.displayValue || ""
  );
  const [num_inference_steps, setnum_inference_steps] = useState(
    model?.parameters?.num_inference_steps?.displayValue || 1
  );
  const [guidance_scale, setguidance_scale] = useState(
    parseFloat(model?.parameters?.guidance_scale?.displayValue) || 1
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "prompt":
        setPrompt(value);
        break;
      case "seed":
        setSeed(value);
        break;
      case "negative_prompt":
        setnegative_prompt(value);
        break;
      case "scheduler":
        setScheduler(value);
        break;
      case "num_inference_steps":
        setnum_inference_steps(value);
        break;
      case "guidance_scale":
        setguidance_scale(value);
        break;
      default:
        break;
    }
  };

  let data = {
    prompt,
    negative_prompt,
    scheduler,
    num_inference_steps,
    guidance_scale,
    seed,
    img_width: 1024,
    img_height: 1024,
    base64: false,
    samples: 1,
  };
  const fetchData = async () => {
    let url;
    const api_key = "SG_cdb02db099cb8b32";

    url = `http://localhost:8004/wrapper/textToImage?name=${model?.slug}`;

    console.log(data);

    try {
      setLoading(true);
      const response = await axios.post(url, data, {
        headers: {
          "x-api-key": api_key,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      });

      const imageBlob = new Blob([response.data]);
      const imageDataUrl = URL.createObjectURL(imageBlob);

      setImage(imageDataUrl);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching image:", error);
      setLoading(false);
    }
  };

  return (
    
    
      <div className="  ComponentWrapper">
      
     
        <div className="  left">
        <div className="promtdiv1"><h3>Prompt</h3>
            <textarea
              name="prompt"
              className="prompttextarea"
              cols={50}
              rows={8}
              placeholder="Enter prompt here"
              value={prompt}
              onChange={handleInputChange}
              // onChange={handleChange}
            ></textarea></div>
        <img src={image} />
        </div>
        <div className=" right">
        <div className="promtdiv">
          
            
            <h3 className="Advanced " style={{textAlign:"center"}}>
              Advanced
              {!advanced ? (
                <MdKeyboardArrowDown
                  onClick={() => setAdvancedtrue(true)}
                  className="arrow"
                />
              ) : (
                <MdKeyboardArrowUp
                  onClick={() => setAdvancedtrue(false)}
                  className="arrow"
                />
              )}
            </h3>

            {advanced && (
              <>
                <div className="innerdiv">
                  <h3>Seed</h3>
                  <input
                    onChange={handleInputChange}
                    type="number"
                    value={seed}
                    name="seed"
                    className="promptinput"
                  />
                </div>
                <div className="checkboxdiv">
                  <input type="checkbox" />
                  <span>Randomize seed</span>
                </div>

                <div className="innerdiv">
                  <h3>Negative Prompt</h3>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    value={negative_prompt}
                    name="negative_prompt"
                    className="promptinput"
                  />
                </div>
                <div className="innerdiv">
                  <h3>Scheduler</h3>
                  <select
                    onChange={handleInputChange}
                    value={scheduler}
                    name="scheduler"
                    className="promptinput"
                  >
                    <option value="DDIM">DDIM</option>
                    <option value="DPM Multi">DPM Multi</option>
                    <option value="DPM Single">DPM Single</option>
                    <option value="Euler a">Euler a</option>
                    <option value="DPM2 a Karras">DPM2 a Karras</option>
                    <option value="DDM2 Karas">DDM2 Karas</option>
                    <option value="LMS">LMS</option>
                  </select>
                </div>
                <div className="innerdiv">
                  <h3>Steps</h3>
                  <Row>
                    <Col span={12}>
                      <Slider
                        min={1}
                        max={20}
                        onChange={(value) =>
                          handleInputChange({
                            target: { name: "num_inference_steps", value },
                          })
                        }
                        value={
                          typeof num_inference_steps === "number"
                            ? num_inference_steps
                            : 1
                        }
                      />
                    </Col>
                    <Col span={4}>
                      <InputNumber
                        min={1}
                        max={20}
                        style={{ margin: "0 16px" }}
                        value={
                          typeof num_inference_steps === "number"
                            ? num_inference_steps
                            : 1
                        }
                        name="num_inference_steps"
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                </div>

                <div className="innerdiv">
                  <h3>Guidance Scale</h3>
                  <Row>
                    <Col span={12}>
                      <Slider
                        min={1}
                        max={20}
                        onChange={(value) =>
                          handleInputChange({
                            target: { name: "guidance_scale", value },
                          })
                        }
                        value={
                          typeof guidance_scale === "number"
                            ? guidance_scale
                            : 1
                        }
                      />
                    </Col>
                    <Col span={4}>
                      <InputNumber
                        min={1}
                        max={20}
                        style={{ margin: "0 16px" }}
                        name="guidance_scale"
                        value={
                          typeof guidance_scale === "number"
                            ? guidance_scale
                            : 1
                        }
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                </div>
              </>)}
           
            {loading ? (
              <button onClick={() => fetchData()} className="genratebtn">
                Loading...
              </button>
            ) : (
              <button onClick={() => fetchData()} className="genratebtn">
                Generate
              </button>
            )}
          </div>
        </div>
      </div>
      
      
    
  );
};

export default TexttoImage;
