import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, InputNumber, Row, Slider, Space } from "antd";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import axios from "axios";
import "./Aimodels.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ImageToImage = () => {
  const navigate = useNavigate();

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
  console.log(model);
  const [advanced, setAdvancedtrue] = useState(false);
  const [originalimg, setoriginalimg] = useState(
    model?.default_image_output || ""
  );
  const [prompt, setPrompt] = useState(
    model?.parameters?.prompt?.displayValue || ""
  );
  const [seed, setSeed] = useState(
    parseFloat(model?.parameters?.seed?.displayValue) || 0
  );
  const [negative_prompt, setnegative_prompt] = useState(
    model?.parameters?.negative_prompt?.displayValue || ""
  );
  const [scheduler, setScheduler] = useState(
    model?.parameters?.scheduler?.displayValue || ""
  );
  const [num_inference_steps, setnum_inference_steps] = useState(
    model?.parameters?.num_inference_steps?.displayValue || -1
  );
  const [guidance_scale, setguidance_scale] = useState(
    parseFloat(model?.parameters?.guidance_scale?.displayValue) || -1
  );
  const [control_end, setcontrol_end] = useState(
    parseFloat(model?.parameters?.control_end?.displayValue) || -1
  );
  const [control_scale, setcontrol_scale] = useState(
    parseFloat(model?.parameters?.control_scale?.displayValue) || -1
  );
  const [controlnet_scale, setcontrolnet_scale] = useState(
    parseFloat(model?.parameters?.controlnet_scale?.displayValue) || -1
  );

  const [control_start, setcontrol_start] = useState(
    parseFloat(model?.parameters?.control_start?.displayValue) || -1
  );
  const [strength, setstrength] = useState(
    parseFloat(model?.parameters?.strength?.displayValue) || -1
  );
  const [image, setimage] = useState(null);

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
      case "control_scale":
        setcontrol_scale(value);
        break;
      case "control_start":
        setcontrol_start(value);
        break;
      case "control_end":
        setcontrol_end(value);
        break;
      case "strength":
        setstrength(value);
        break;
      default:
        break;
    }
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const [base64File, setBase64File] = useState(null);
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };
  const handleChange = async (info) => {
    if (info.file.status === "done") {
      // File has been uploaded
      const base64String = await convertFileToBase64(info.file.originFileObj);
      setBase64File(base64String);
    }
  };
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  let modifiedData = {
    prompt,
    negative_prompt,
    scheduler,
    num_inference_steps,
    seed,

    base64: false,
    samples: 1,
    base64File,
  };

  if (model?.parameters?.control_scale) {
    modifiedData = {
      ...modifiedData,
      control_scale,
    };
  }

  if (model?.parameters?.control_end) {
    modifiedData = {
      ...modifiedData,
      control_end,
    };
  }

  if (model?.parameters?.control_start) {
    modifiedData = {
      ...modifiedData,
      control_start,
    };
  }

  if (model?.parameters?.guidance_scale) {
    modifiedData = {
      ...modifiedData,
      guidance_scale,
    };
  }
  if (model?.parameters?.controlnet_scale) {
    modifiedData = {
      ...modifiedData,
      controlnet_scale,
    };
  }
  if (model?.parameters?.strength) {
    modifiedData = {
      ...modifiedData,
      strength,
    };
  }

  const fetchData = async () => {
    let url;
    const api_key = "SG_cdb02db099cb8b32";

    url = `http://localhost:8000/wrapper/imageToImage?name=${model?.slug}`;

    try {
      const response = await axios.post(url, modifiedData, {
        headers: {
          "x-api-key": api_key,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      });

      const imageBlob = new Blob([response.data]);
      const imageDataUrl = URL.createObjectURL(imageBlob);

      setoriginalimg(imageDataUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div>
      
      <div className="ComponentWrapper">
        <div className="left">
          <div className="promtdiv">
            <div className="imgtoimgdiv">
              <Upload
                beforeUpload={beforeUpload}
                onChange={handleChange}
                showUploadList={false}
                customRequest={({ onSuccess, onError, file }) => {
                  setTimeout(() => {
                    onSuccess();
                  }, 0);
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
              {base64File && (
                <div>
                  <p>Base64 Encoded Image:</p>
                  <img
                    src={`data:image/png;base64,${base64File}`}
                    alt="Uploaded"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              )}
            </div>
            <h3>Prompt</h3>
            <textarea
              name="prompt"
              className="prompttextarea"
              rows={5}
              placeholder="Enter prompt here"
              value={prompt}
              onChange={handleInputChange}
              // onChange={handleChange}
            ></textarea>
            <h3 className="Advanced">
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
                {control_scale > -1 && (
                  <>
                    <div className="innerdiv">
                      <h3>Controlnet Conditioning Scale</h3>
                      <Row>
                        <Col span={12}>
                          <Slider
                            min={0}
                            max={5}
                            onChange={(value) =>
                              handleInputChange({
                                target: { name: "control_scale", value },
                              })
                            }
                            value={
                              typeof control_scale === "number"
                                ? control_scale
                                : 0
                            }
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber
                            min={0}
                            max={5}
                            style={{ margin: "0 16px" }}
                            name="control_scale"
                            value={
                              typeof control_scale === "number"
                                ? control_scale
                                : 0
                            }
                            onChange={handleInputChange}
                          />
                        </Col>
                      </Row>
                    </div>
                  </>
                )}

                {control_start > -1 && (
                  <>
                    <div className="innerdiv">
                      <h3>Control Guidance Start</h3>
                      <Row>
                        <Col span={12}>
                          <Slider
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={(value) =>
                              handleInputChange({
                                target: { name: "control_start", value },
                              })
                            }
                            value={
                              typeof control_start === "number"
                                ? control_start
                                : 0
                            }
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber
                            min={0}
                            max={1}
                            style={{ margin: "0 16px" }}
                            name="control_start"
                            value={
                              typeof control_start === "number"
                                ? control_start
                                : 0
                            }
                            onChange={handleInputChange}
                          />
                        </Col>
                      </Row>
                    </div>
                  </>
                )}
                {control_end > -1 && (
                  <>
                    <div className="innerdiv">
                      <h3>Control Guidance end</h3>
                      <Row>
                        <Col span={12}>
                          <Slider
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={(value) =>
                              handleInputChange({
                                target: { name: "control_end", value },
                              })
                            }
                            value={
                              typeof control_end === "number" ? control_end : 0
                            }
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber
                            min={0}
                            max={1}
                            style={{ margin: "0 16px" }}
                            name="control_end"
                            value={
                              typeof control_end === "number" ? control_end : 0
                            }
                            onChange={handleInputChange}
                          />
                        </Col>
                      </Row>
                    </div>
                  </>
                )}
                {controlnet_scale > -1 && (
                  <>
                    <div className="innerdiv">
                      <h3>Control Guidance end</h3>
                      <Row>
                        <Col span={12}>
                          <Slider
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={(value) =>
                              handleInputChange({
                                target: { name: "controlnet_scale", value },
                              })
                            }
                            value={
                              typeof controlnet_scale === "number"
                                ? controlnet_scale
                                : 0
                            }
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber
                            min={0}
                            max={1}
                            style={{ margin: "0 16px" }}
                            name="controlnet_scale"
                            value={
                              typeof controlnet_scale === "number"
                                ? controlnet_scale
                                : 0
                            }
                            onChange={handleInputChange}
                          />
                        </Col>
                      </Row>
                    </div>
                  </>
                )}
                {strength > -1 && (
                  <>
                    <div className="innerdiv">
                      <h3>Strength</h3>
                      <Row>
                        <Col span={12}>
                          <Slider
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={(value) =>
                              handleInputChange({
                                target: { name: "strength", value },
                              })
                            }
                            value={typeof strength === "number" ? strength : 0}
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber
                            min={0}
                            max={1}
                            style={{ margin: "0 16px" }}
                            name="strength"
                            value={typeof strength === "number" ? strength : 0}
                            onChange={handleInputChange}
                          />
                        </Col>
                      </Row>
                    </div>
                  </>
                )}
              </>
            )}
            <button className="genratebtn" onClick={() => fetchData()}>
              Generate
            </button>
          </div>
        </div>
        <div className="right">
          <img src={originalimg} />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ImageToImage;
