import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Type = () => {
  const location = useLocation();
  const [details, setDetails] = useState({});
  const navigate = useNavigate();

  const getdata = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/wrapper/findOneModel?name=${location.state.elemert.slug}`
      );
   
      setDetails(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getdata();

      if (details?.model && details?.model?.type === "textToImage") {
        navigate(`/models/texttoImage/${details?.model?.slug}`, {
          state: { details: details },
        });
      } else if (details?.model && details?.model?.type === "imageToImage") {
        navigate(`/models/imageToImage/${details?.model?.slug}`, {
          state: { details: details },
        });
      }
    };

    fetchData();
  }, [details, navigate]);

  return <></>;
};

export default Type;
