import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Type = () => {
  const location = useLocation();
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  console.log(location);
  const getdata = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8004/wrapper/findOneModel?name=${location.state.elemert.slug}`
      );

      setDetails(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let data = ["sam-img2img", "codeformer", "bg-removal", "esrgan"];
  let data2 = [
    "sd1.5-controlnet-canny",
    "sd1.5-controlnet-softedge",
    "sd1.5-controlnet-depth",
    "sd1.5-controlnet-openpose",
  ];

  useEffect(() => {
    const fetchData = async () => {
      await getdata();

      if (details?.model) {
        const { type, slug } = details.model;

        if (type === "textToImage") {
          navigate(`/models/textToImage/${slug}`, { state: { details } });
        } else if (
          type === "imageToImage" &&
          !data.includes(slug) &&
          !data2.includes(slug)
        ) {
          navigate(`/models/imageToImage/${slug}`, { state: { details } });
        } else if (data.includes(slug)) {
          navigate(`/models/utilityfunctions/${slug}`, { state: { details } });
        } else if (data2.includes(slug)) {
          navigate(`/models/controlnets/${slug}`, { state: { details } });
        }
      }
    };

    fetchData();
  }, [details, navigate]);

  return <></>;
};

export default Type;
