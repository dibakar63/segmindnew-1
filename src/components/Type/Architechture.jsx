import { Col, InputNumber, Row, Slider } from "antd";
import React from "react";

const Architechture = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <span>Playground</span>
          <span>Pricing</span>
        </div>
      </div>
      <div className=" ComponentWrapper">
        <div className="left">
          <div className="upperdiv">
            <div className="  promtdiv1">
              <h3>Prompt</h3>
              <textarea
                name="prompt"
                className="prompttextarea"
                cols={50}
                rows={8}
                placeholder="Enter prompt here"

                // onChange={handleChange}
              ></textarea>
            </div>
            <div className="limg">
              <img
               src="/images/archi2upload.png"
                style={{
                  width: "180px",
                  height: "210px",
                  borderRadius: "16px",
                  marginTop: "33px",
                }}
              />

              <button className="genratebtn">Generate</button>
            </div>
          </div>
          <img src="/images/architecture.png" style={{ height: "420px" }} />
        </div>
        <div className=" right">
          <div className="promtdiv">
            <h3 className="Advanced " style={{ textAlign: "center" }}>
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
              <div className="innerdiv">
                <h3>Seed</h3>
                <input type="number" name="seed" className="promptinput" />
              </div>
              <div className="checkboxdiv">
                <input type="checkbox" />
                <span>Randomize seed</span>
              </div>

              <div className="innerdiv">
                <h3>Negative Prompt</h3>
                <input
                  type="text"
                  name="negative_prompt"
                  className="promptinput"
                />
              </div>
              <div className="innerdiv">
                <h3>Scheduler</h3>
                <select name="scheduler" className="promptinput">
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
</>
  );
};

export default Architechture;
