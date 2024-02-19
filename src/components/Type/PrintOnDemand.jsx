import React, { useState } from "react";
import { Col, InputNumber, Row, Slider } from "antd";
import "./Pod.css";
import { MdOutlineFileUpload } from "react-icons/md";


const PrintOnDemand = () => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;

      setIsImageUploaded(true);
      setUploadedImage(base64Image);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div className="Container">
        <h3>Prompt</h3>
        <div className="row">
          <div className="col-lg-8 leftdiv">
            <div className="promtdiv3">
              <textarea
                name="prompt"
                className="promptinput"
                cols={50}
                rows={4}
                placeholder="Enter prompt here"

                // onChange={handleChange}
              ></textarea>
              <div className="limg2">
                <div className={isImageUploaded?"podimgdiv2":"podimgdiv"}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload" className="uploadLabel">
                    {isImageUploaded ? (
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="archiimg2"
                      />
                    ) : (
                      <span style={{cursor:"pointer"}}>
                        <span>
                          <MdOutlineFileUpload />
                        </span>
                        Upload an Image
                      </span>
                    )}
                  </label>
                </div>

                {isImageUploaded ? (
                  <>
                    <button className="genratebtn">Generate</button>
                  </>
                ) : (
                  <button className="diablegeneratebtn">Generate</button>
                )}
              </div>
            </div>
            <img
              src="/images/pod.png"
              style={{ height: "460px", borderRadius: "12px" }}
            />
          </div>
          <div className="col-lg-4 rightdiv">
            <h4>Advanced</h4>
            <div className="advanceddiv">
              <>
                <div className="innerdiv">
                  <h4 >Seed</h4>
                  <input type="number" name="seed" className="promptinput2" />
                </div>
                <div className="checkboxdiv">
                  <input type="checkbox" />
                  <span>Randomize seed</span>
                </div>

                <div className="innerdiv">
                  <h4>Negative Prompt</h4>
                  <input
                    type="text"
                    name="negative_prompt"
                    className="promptinput2"
                  />
                </div>
                <div className="innerdiv">
                  <h3>Scheduler</h3>
                  <select name="scheduler" className="promptinput2">
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
                  <h4>Steps</h4>
                  <Row>
                    <Col span={12}>
                      <Slider min={1} max={20} />
                    </Col>
                    <Col span={4}>
                      <InputNumber
                        min={1}
                        max={20}
                        style={{ margin: "0 16px" }}
                        name="num_inference_steps"
                      />
                    </Col>
                  </Row>
                </div>

                <div className="innerdiv">
                  <h3>Guidance Scale</h3>
                  <Row>
                    <Col span={12}>
                      <Slider min={1} max={20} />
                    </Col>
                    <Col span={4}>
                      <InputNumber
                        min={1}
                        max={20}
                        style={{ margin: "0 16px" }}
                        name="guidance_scale"
                      />
                    </Col>
                  </Row>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PrintOnDemand;
