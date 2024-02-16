import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, InputNumber, Row, Slider, Space } from "antd";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import axios from "axios";
import "./Aimodels.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from "../Context/auth";

const UtilityFunctions = () => {
  const [auth, setAuth] = useAuth();
  console.log(auth);

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
  const [advanced, setAdvancedtrue] = useState(true);
  useEffect(() => {
    if (model?.slug === "sam-img2img" || model?.slug === "bg-removal") {
      setAdvancedtrue(false);
    }
  }, []);
  console.log("advance", advanced);
  const [originalimg, setoriginalimg] = useState(
    model?.default_image_output || ""
  );

  const [bg, setbg] = useState(model?.parameters?.bg?.default || false);
  const [face, setface] = useState(model?.parameters?.face?.default || false);
  const [scale, setscale] = useState(
    model?.parameters?.scale?.displayValue || ""
  );
  const [fidelity, setfidelity] = useState(
    model?.parameters?.fidelity?.displayValue || false
  );

  const handleBgChange = () => {
    setbg(!bg);
  };

  const handleFaceChange = () => {
    setface(!face);
  };

  const [image, setimage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "scale":
        setscale(value);
        break;
      case "fidelity":
        setfidelity(value);
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

  let modifiedData;

  if (!advanced) {
    modifiedData = {
      image: base64File,
    };
  } else {
    modifiedData = {
      image: base64File,
      bg: bg,
      face: face,
      fidelity: fidelity,
      scale: scale,
    };
  }

  // let modifiedData = {
  //   prompt,
  //   negative_prompt,
  //   scheduler,
  //   num_inference_steps,
  //   seed,

  //   base64: false,
  //   samples: 1,
  //   base64File,
  // };

  const fetchData = async () => {
    if (!auth?.name) {
      navigate("/login");
    } else {
      let url;
      const api_key = "SG_cdb02db099cb8b32";

      url = `http://localhost:8004/wrapper/utilityFunction?name=${model?.slug}`;

      try {
        setLoading(true);
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching image:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="ComponentWrapper">
        <div className="left">
          <div className="upperdiv">
            <div className="promtdiv2">
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
                {/* {base64File && (
                <div>
                  <p>Base64 Encoded Image:</p>
                  <img
                    src={`data:image/png;base64,${base64File}`}
                    alt="Uploaded"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              )} */}
              </div>
              {/* <h3>Prompt</h3>
              <textarea
                name="prompt"
                className="prompttextarea"
                rows={5}
                placeholder="Enter prompt here"
                value={prompt}
                onChange={handleInputChange}
                // onChange={handleChange}
              ></textarea> */}
            </div>
            <div className="limg">
              {base64File && (
                <div>
                  {/* <p>Base64 Encoded Image:</p> */}
                  <img
                    src={`data:image/png;base64,${base64File}`}
                    alt="Uploaded"
                    style={{
                      width: "180px",
                      height: "130px",
                      borderRadius: "16px",
                      marginTop: "33px",
                    }}
                  />
                </div>
              )}
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
          <img src={originalimg} style={{ height: "520px" }} />
        </div>
        <div className="right">
          {advanced && (
            <div className="promtdiv">
              <h3 className="Advanced">
                Advanced
                {/* {!advanced ? (
               <MdKeyboardArrowDown
                 onClick={() => setAdvancedtrue(true)}
                 className="arrow"
               />
             ) : (
               <MdKeyboardArrowUp
                 onClick={() => setAdvancedtrue(false)}
                 className="arrow"
               />
             )} */}
              </h3>

              <>
                {/* <div className="innerdiv">
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
                </div> */}
                {/* <div className="innerdiv">
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
                </div> */}

                <div className="innerdiv">
                  <h3>Scale</h3>
                  <Row>
                    <Col span={12}>
                      <Slider
                        min={1}
                        max={4}
                        step={0.1}
                        onChange={(value) =>
                          handleInputChange({
                            target: { name: "scale", value },
                          })
                        }
                        value={typeof scale === "number" ? scale : 0}
                      />
                    </Col>
                    <Col span={4}>
                      <InputNumber
                        min={1}
                        max={4}
                        style={{ margin: "0 16px" }}
                        name="scale"
                        value={typeof scale === "number" ? scale : 0}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="innerdiv">
                  <h3>Fidelity</h3>
                  <Row>
                    <Col span={12}>
                      <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(value) =>
                          handleInputChange({
                            target: { name: "fidelity", value },
                          })
                        }
                        value={typeof fidelity === "number" ? fidelity : 0}
                      />
                    </Col>
                    <Col span={4}>
                      <InputNumber
                        min={0}
                        max={1}
                        style={{ margin: "0 16px" }}
                        name="fidelity"
                        value={typeof fidelity === "number" ? fidelity : 0}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="innerdiv">
                  <div className="checkboxdiv">
                    <input
                      type="checkbox"
                      value={bg}
                      onChange={handleBgChange}
                    />
                    <span>bg</span>
                  </div>
                  <div className="checkboxdiv">
                    <input
                      type="checkbox"
                      value={face}
                      onChange={handleFaceChange}
                    />
                    <span>Face</span>
                  </div>
                </div>

                {/* {control_start > -1 && (
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
                )} */}
                {/* {control_end > -1 && (
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
                )} */}
                {/* {controlnet_scale > -1 && (
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
                )} */}
                {/* {strength > -1 && (
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
                )} */}
              </>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default UtilityFunctions;
