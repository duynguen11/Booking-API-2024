import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

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
          <h3 className="text-title p-4">
            Khám Phá - Trải Nghiệm - Kỷ Niệm Với Chúng Tôi!
          </h3>
          <div className="px-5">
            <ul className="d-flex align-items-center justify-content-center content_menu_link">
              <li>
                <Link href={"/"} className="link-content">
                  <i className="fa-solid fa-plane me-2"></i>Vé máy bay
                </Link>
              </li>
              <li>
                <Link href={"/"} className="link-content">
                  <i className="fa-solid fa-hotel me-2"></i>Khách sạn
                </Link>
              </li>
              <li>
                <Link href={"/"} className="link-content">
                  <i className="fa-solid fa-caravan me-2"></i>Vé xe khách
                </Link>
              </li>
              <li>
                <Link href={"/"} className="link-content">
                  <i className="fa-solid fa-truck-ramp-box me-2"></i>Đưa đón sân
                  bay
                </Link>
              </li>
              <li>
                <Link href={"/"} className="link-content">
                  <i className="fa-solid fa-taxi me-2"></i>Thuê xe du lịch
                </Link>
              </li>
              <li>
                <Link href={"/"} className="link-content">
                  <i className="fa-solid fa-champagne-glasses me-2"></i>Hoạt
                  động vui chơi
                </Link>
              </li>
            </ul>
            <hr />
          </div>
          <div className="input-container mt-5">
            <div className="bg-light border d-flex rounded align-items-center p-1">
              <div className="input-field-container">
                <i
                  style={{ fontSize: "20px" }}
                  className="fa-solid fa-plane-departure text-info mx-2"
                ></i>
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
                  className="fa-solid fa-plane-arrival text-info me-2"
                ></i>
                <select className="input-field">
                  <option value="dichvu">Điểm đến</option>
                  <option value="tour">Tour</option>
                  <option value="datphong">Đặt phòng</option>
                  <option value="thueoto">Thuê ô tô</option>
                </select>
              </div>
              <div className="input-field-container ms-3">
                <input
                  type="datetime-local"
                  className="input-field"
                  value={searchData.NgayKhoiHanh} // Gán giá trị của trạng thái cho trường input
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="bg-light p-1 rounded ms-3">
              <button className="btn-booking">
                <i
                  style={{ fontSize: "25px" }}
                  className="fa-solid fa-magnifying-glass text-white"
                ></i>
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end logo-bg p-5">
            <span className="fw-bolder">Trusted By</span>
            <div>
              <i className="fa-brands fa-square-pied-piper ms-3"></i>
            </div>
            <div>
              <i class="fa-brands fa-pied-piper-pp ms-3"></i>
            </div>
            <div>
              <i class="fa-solid fa-square-nfi ms-3"></i>
            </div>
            <div>
              <i class="fa-brands fa-blogger ms-3"></i>
            </div>
            <div>
              <i class="fa-brands fa-algolia ms-3"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
