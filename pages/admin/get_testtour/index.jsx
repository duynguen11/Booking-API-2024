import React, { useState } from "react";
import axios from "axios";

const GetTestTour = () => {
  const [maTour, setMaTour] = useState("");
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setMaTour(e.target.value);
  };

  const fetchTourData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:2024/api/layTestTour/${maTour}`
      );
      setTourData(response.data);
    } catch (error) {
      console.error("Error fetching tour data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <label>
        Nhập MaTour:
        <input type="text" value={maTour} onChange={handleInputChange} />
      </label>
      <button onClick={fetchTourData}>Tìm Tour</button>

      {loading ? (
        <p>Loading...</p>
      ) : tourData ? (
        <div>
          <h2>{tourData.TenTour}</h2>
          <p>Price: {tourData.GiaTour}</p>
          <img src={`/uploads/${tourData.ImageUrl}`} alt={tourData.TenTour} />
        </div>
      ) : (
        <p>Chưa có dữ liệu tour</p>
      )}
    </div>
  );
};

export default GetTestTour;
