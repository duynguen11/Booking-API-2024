import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeContent = () => {
  const [searchData, setSearchData] = useState({
    TenChuDe: "",
    NoiKhoiHanh: "",
    NgayKhoiHanh: getCurrentDateTime(),
  });

  const handleDateChange = (event) => {
    const value = event.target.value;
    setSearchData((prevData) => ({
      ...prevData,
      NgayKhoiHanh: value,
    }));
  };

  function getCurrentDateTime() {
    const today = new Date();
    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, "0");
    let day = today.getDate().toString().padStart(2, "0");
    let hour = today.getHours().toString().padStart(2, "0");
    let minute = today.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hour}:${minute}`;
  }

  return (
    <div className="px-3">
      <div style={{ marginTop: "75px" }} className="Banner-content rounded">
        <div className="text-center text-content">
          <h3 className="text-title pt-5">
            Khám phá - Trải nghiệm - Kỷ niệm với chúng tôi!
          </h3>
          <div className="input-container">
            <div className="bg-light border d-flex rounded align-items-center p-1">
              <div className="input-field-container">
                <i
                  style={{ fontSize: "20px" }}
                  className="fa-solid fa-plane-departure text-info mx-2">
                </i>
                <select className="input-field">
                  <option value="vitri">Điểm xuất phát</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="hochiminh">Hồ Chí Minh</option>
                  <option value="danang">Đà Nẵng</option>
                </select>
              </div>
              <div className="p-2 mx-4 rounded reload-field">
                <i
                  style={{ fontSize: "25px" }}
                  className="fa-solid fa-retweet text-info"
                ></i>
              </div>
              <div className="input-field-container me-2">
              <i
                  style={{ fontSize: "20px" }}
                  className="fa-solid fa-plane-arrival text-info me-2">
                </i>
                <select className="input-field">
                  <option value="dichvu">Điểm đến</option>
                  <option value="tour">Tour</option>
                  <option value="datphong">Đặt phòng</option>
                  <option value="thueoto">Thuê ô tô</option>
                </select>
              </div>
              <div className="input-field-container">
                <input
                  type="datetime-local"
                  className="input-field"
                  value={searchData.NgayKhoiHanh} // Gán giá trị của trạng thái cho trường input
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="bg-light p-1 rounded ms-2">
              <button className="btn-booking">
                <i
                  style={{ fontSize: "25px" }}
                  className="fa-solid fa-magnifying-glass text-white"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
