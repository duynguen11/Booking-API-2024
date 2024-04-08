import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container } from "react-bootstrap";

const HomeDiscount = () => {
  const [tour, setTour] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2024/api/tour/category/tour_uudai"
        );
        console.log(response.data);
        setTour(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <h3>GÓI ƯU ĐÃI ĐẶC BIỆT </h3>
      <div className="row mt-3">
        {tour.map((t) => (
          <div className="col-12" key={t.MaTour}>
            <div className="p-2 rounded d-flex mb-3 card-shadow">
              <div style={{width: '30%'}} className="image-container me-3">
                <img
                  height={"250px"}
                  src={`http://localhost:2024/${t.URL}`}
                  className="card-img-top rounded"
                  alt={t.TenTour}
                />
              </div>
              <div style={{width: '70%'}}  className="info-container">
                <h4 className="card-title fw-bolder">{t.TenTour}</h4>
                <hr />
                <div className="ps-2 pb-4 fw-bolder text-secondary">
                  <p className="card-title">
                    <i class="fa-solid fa-ticket"></i> Mã tour: {t.MaTour} <span className="text-hot"> Combo(Xe/Khách sạn)</span>
                  </p>
                  <h6 style={{ color: "#007bff" }} className="card-text mb-0">
                    {t.TenChuDe}
                  </h6>
                  <p className="card-title">
                    Thời gian tham quan: {t.ThoiGian}
                  </p>
                  <p className="card-text mb-0">
                    Giá chuyến đi:{" "}
                    <span className="text-hot">
                      {t.GiaTour.toLocaleString("vi-VN")} VND
                    </span>
                    /người
                  </p>
                  <p className="card-text mb-0">
                    {t.MoTa}
                  </p>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="d-flex align-items-center justify-content-between">
                    <div
                      style={{
                        backgroundColor: "rgba(40, 67, 135, 1)",
                      }}
                      className="d-flex align-items-center btn btn-secondary me-2"
                    >
                      <a className="text-decoration-none text-white fw-bolder">
                        Mua vé ngay
                      </a>
                    </div>
                    {/* Các phần tử khác nếu có */}
                  </div>
                  <a href={`/thongtintour/${t.MaTour}`} className="btn btn-outline-secondary fw-bolder">
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HomeDiscount;
