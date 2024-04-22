import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeHeader from "@/components/HomeLayout/HomeHeader";
import HomeFooter from "@/components/HomeLayout/HomeFooter";
import { Table, Modal, Button, Form, Alert } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const TourYeuthich = () => {
  const [favoriteTour, setFavoriteTour] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2024/api/tour/touryeuthich/${userId}`
        );
        setFavoriteTour(response.data);
        console.log("Danh sách tour đã lưu:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (MaTourDaLuu) => {
    axios
      .delete(
        `http://localhost:2024/api/tour/deleteTourYeuthich/${MaTourDaLuu}`
      )
      .then((response) => {
        console.log("Xóa thành công", response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi xóa", error);
      });
  };

  return (
    <div>
      <HomeHeader />
      <div style={{ paddingTop: "50px" }} className="main-content mt-5">
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
          <div className="col-md-9 pe-5">
            <div className="d-flex align-items-center justify-content-between">
              <h4>DANH SÁCH TOUR YÊU THÍCH</h4>
              <div>
              <i className="fa-solid fa-filter me-1"></i><span className="fw-bolder">Xắp sếp</span>
                <select className="ms-3">
                  <option value="newItem">Tour mới nhất</option>
                  <option value="lowToHigh">Giá thấp đến cao</option>
                  <option value="highToLow">Giá cao đến thấp</option>
                  <option value="highToLow">A - Z</option>
                </select>
              </div>
            </div>
            <div>
              <Table
                style={{ fontSize: "14px" }}
                className="mt-3"
                responsive
                striped
              >
                <thead>
                  <tr>
                    <th>Tên tour</th>
                    <th>Giá tour</th>
                    <th>Thời gian</th>
                    <th>Ngày Giờ Khởi Hành</th>
                    <th>Nơi tập trung</th>
                    <th>Chỗ trống</th>
                    <th>Phương tiện</th>
                    <th>Tùy chỉnh</th>
                  </tr>
                </thead>
                <tbody>
                  {favoriteTour.map((item, index) => (
                    <tr key={index}>
                      <td>{item.TenTour}</td>
                      <td>{item.GiaTour}</td>
                      <td>{item.ThoiGian}</td>
                      <td>
                        {`${new Date(item.NgayKhoiHanh).getDate()}/${
                          new Date(item.NgayKhoiHanh).getMonth() + 1
                        }/${new Date(
                          item.NgayKhoiHanh
                        ).getFullYear()} ${new Date(
                          item.NgayKhoiHanh
                        ).getHours()}:${new Date(
                          item.NgayKhoiHanh
                        ).getMinutes()}`}
                        h
                      </td>
                      <td>{item.NoiKhoiHanh}</td>
                      <td>{item.SoCho}</td>
                      <td>
                        {item.PhuongTien === "Xe khách"
                          ? "Xe khách"
                          : item.PhuongTien === "Tàu lửa"
                          ? "Tàu lửa"
                          : item.PhuongTien === "Máy bay"
                          ? "Máy bay"
                          : ""}
                      </td>
                      <td>
                        <Link href={`/thongtintour/${item.MaTour}`}>
                          <button
                            className="btn btn-secondary"
                            style={{ marginRight: "5px", cursor: "pointer" }}
                          >
                            <i className="fa-solid fa-eye me-1"></i>
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(item.MaTourDaLuu);
                          }}
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default TourYeuthich;
