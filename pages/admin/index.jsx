import React, { useState, useEffect } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const AdminPage = () => {
  const [countTour, setCountTour] = useState(null);
  const [countNhanvien, setCountNhanvien] = useState(null);
  const [countHopthu, setCountHopthu] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toursResponse, employeesResponse, messsagesResponse] =
          await Promise.all([
            axios.get("http://localhost:2024/api/tour"),
            axios.get("http://localhost:2024/api/account/employees"),
            axios.get("http://localhost:2024/api/hopthu"),
          ]);

        if (toursResponse.status === 200) {
          // Xử lý dữ liệu tour ở đây
          setCountTour(toursResponse.data);
        } else {
          console.error("Lỗi khi lấy dữ liệu tour:", toursResponse.data);
        }

        if (employeesResponse.status === 200) {
          // Xử lý dữ liệu nhân viên ở đây
          setCountNhanvien(employeesResponse.data);
        } else {
          console.error(
            "Lỗi khi lấy dữ liệu nhân viên:",
            employeesResponse.data
          );
        }

        if (messsagesResponse.status === 200) {
          setCountHopthu(messsagesResponse.data.data);
        }
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AdminLayout />
      <div className="main-body">
        <div className="d-flex justify-content-between">
          <div className="flex-fill">
            <div
              style={{ backgroundColor: "#afcfff", color: 'GrayText' }}
              className="d-flex align-items-center justify-content-between p-4 rounded me-4"
            >
              <i
                style={{ fontSize: "50px" }}
                class="fa-solid fa-mountain-sun  p-2 rounded border"
              ></i>
              <div className="text-center">
                <h4 className="fw-bolder">
                  {countTour ? countTour.length : 0}
                </h4>
                <p>Chuyến đi</p>
              </div>
            </div>
          </div>
          <div className="flex-fill">
            <div
              style={{ backgroundColor: "thistle", color: 'GrayText' }}
              className="d-flex align-items-center justify-content-between p-4 rounded me-4"
            >
              <i
                style={{ fontSize: "50px" }}
                className="fa-solid fa-people-carry-box p-2 rounded border"
              ></i>
              <div className="text-center">
                <h4 className="fw-bolder">
                  {countNhanvien ? countNhanvien.length : 0}
                </h4>
                <p>Nhân viên</p>
              </div>
            </div>
          </div>
          <div className="flex-fill">
            <div
              style={{ backgroundColor: "beige", color: 'GrayText' }}
              className="d-flex align-items-center justify-content-between p-4 rounded me-4"
            >
              <i
                style={{ fontSize: "50px" }}
                className="fa-solid fa-truck-fast p-2 rounded border"
              ></i>
              <div className="text-center">
                <h4 className="fw-bolder">
                  {countTour ? countTour.length : 0}
                </h4>
                <p>Đơn hàng</p>
              </div>
            </div>
          </div>
          <div className="flex-fill">
            <div
              style={{ backgroundColor: "#f8b7a0", color: 'GrayText' }}
              className="d-flex align-items-center justify-content-between p-4 rounded me-4"
            >
              <i
                style={{ fontSize: "50px" }}
                className="fa-solid fa-envelopes-bulk p-2 rounded border"
              ></i>
              <div className="text-center">
                <h4 className="fw-bolder">
                  {countHopthu ? countHopthu.length : 0}
                </h4>
                <p>Hộp thư</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table style={{ display: isTableVisible ? "table" : "none" }}>
        <tbody>
          {countTour && countTour.map((item, index) => <tr key={index}></tr>)}
          {countNhanvien && countNhanvien.map((item, index) => <tr key={index}></tr>)}
          {countHopthu && countHopthu.map((item, index) => <tr key={index}></tr>)}
        </tbody>
      </table>
    </>
  );
};

export default AdminPage;
