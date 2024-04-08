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
      setSearchData(prevData => ({
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
    <div className="px-2 ">
      <div style={{ marginTop: "73px" }} className="Banner-content rounded">
        <div className="text-center text-content">
          <h3 className="text-title pt-5">
            Khám phá - Trải nghiệm - Kỷ niệm với chúng tôi!
          </h3>
          <p className="text-infomation fw-bolder p-3">
            Chào mừng bạn đến với hành trình kỳ thú cùng chúng tôi! Với các tour
            du lịch đa dạng và phong phú, chúng tôi cam kết mang lại trải nghiệm
            đầy hứng thú mà bạn không quên được.
          </p>
          <div className="input-container">
            <div className="input-field-container">
              <select className="input-field">
                <option value="vitri">Chọn Dịch Vụ</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hochiminh">Hồ Chí Minh</option>
                <option value="danang">Đà Nẵng</option>
              </select>
            </div>
            <div className="input-field-container">
              <select className="input-field">
                <option value="dichvu">Nơi Khởi Hành</option>
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
            <div className="btn-booking">
              <a>BOOKING</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
