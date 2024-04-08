import React, { useEffect, useState } from "react";
import axios from "axios";

const HinhanhTour = () => {
  const [hinhanhData, setHinhanhData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2024/api/test_tour/tourImage")
      .then((result) => {
        if (result.data.Status) {
          setHinhanhData(result.data.Result);
          console.log(result.data.Result)
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Hình ảnh tour</h2>
      <ul>
        {hinhanhData.map((hinhanh) => (
          <li key={hinhanh.MaHinhAnh}>
            <h5>MÃ TOUR: {hinhanh.MaTour}</h5>
            <h5>Ten TOUR: {hinhanh.TenTour}</h5>
            <h5>Gia TOUR: {hinhanh.GiaTour}</h5>
            <img
              src={`http://localhost:2024/${hinhanh.URL}`}
              alt="Tour Image"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HinhanhTour;
