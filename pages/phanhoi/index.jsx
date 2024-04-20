import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Link from 'next/link'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeHeader from "@/components/HomeLayout/HomeHeader";
import HomeFooter from "@/components/HomeLayout/HomeFooter";

const Phanhoi = () => {
  const [phanhoi, setPhanhoi] = useState([]);

  const formatTime = (datetimeString) => {
    const dateTime = new Date(datetimeString);
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const day = dateTime.getDate().toString().padStart(2, "0");
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const year = dateTime.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    const fetchData = async () => {
      try {
        const url = `http://localhost:2024/api/hopthu/getMessagesByIdAccount/${userId}`;
        console.log("Request URL:", url); // Log URL trước khi gửi yêu cầu
        const response = await axios.get(url);
        setPhanhoi(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <HomeHeader />
      <div style={{ paddingTop: "30px" }} className="main-content mt-5">
        <div className="row">
          <div className="col-md-3">
            <ul
              style={{ marginTop: "1rem", paddingRight: "5rem" }}
              className="nav-ttcn px-5"
            >
              <li>
                <Link href="/thongtinuser">
                  <i className="fa fa-user me-2"></i>Hồ sơ cá nhân
                </Link>
              </li>
              <li>
                <Link href="/touryeuthich">
                  <i className="fa-solid fa-layer-group me-2"></i>Tour đã lưu
                </Link>
              </li>
              <li>
                <Link href="/history-booking">
                  <i className="fa-solid fa-business-time me-2"></i>Lịch sử
                  thanh toán
                </Link>
              </li>
              <li>
                <Link href="/phanhoi">
                  <i className="fa-solid fa-inbox me-2"></i>
                  Hộp thư
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md">
            <h4>Hộp thư đã gửi</h4>
            {phanhoi.map((message, index) => (
              <div key={index} className="message-box px-4 mt-3">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="mb-4"
                >
                  <div style={{ marginRight: "10px" }}>
                    <label>
                      <strong>Người gửi:</strong> {message.hoten}
                    </label>
                    <p
                      style={{ width: "fit-content" }}
                      className="border rounded bg-light-grey p-3 mt-2"
                    >
                      <strong>Tin nhắn:</strong> {message.tinnhan}
                    </p>
                    <span>{formatTime(message.thoigiangui)}</span>
                  </div>

                  <div className="mt-5 pt-5">
                    <strong>Hệ thống phản hồi:</strong>
                    <p
                      style={{ width: "fit-content" }}
                      className="border rounded bg-light-grey p-3 mt-2"
                    >
                      {message.noidung}
                    </p>
                    <span>{formatTime(message.thoigianphanhoi)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default Phanhoi;
