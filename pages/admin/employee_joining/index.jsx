import React, { useEffect, useState, createContext, useContext } from "react";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardImg, CardBody, CardText, Row, Col } from "reactstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployJoining = () => {
  const YourContext = createContext("HDV đã xác nhận");
  const [hisJoinning, setHisJoinning] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  const formatDateTime = (dateTimeString) => {
    const d = new Date(dateTimeString);
    return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getFullYear()} ${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
    return formattedAmount.replace(/\s₫/g, "");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      const fetchHistory = async () => {
        try {
          const response = await axios.post(
            `http://localhost:2024/api/chitietdattour/historyJoinning`,
            {
              MaTaikhoan_HDV: userId,
            }
          );
          console.log("Dữ liệu history", response.data);
          setHisJoinning(response.data);
        } catch (err) {
          console.error("Error fetching history !", err);
        }
      };
      fetchHistory();
    }
  }, [userId]);

  const TrangThai = useContext(YourContext);
  const handleSubmit = async (MaDatTour) => {
    try {
      // Gọi API hoặc thực hiện các thao tác cập nhật trạng thái ở đây
      const response = await axios.put(
        "http://localhost:2024/api/chitietdattour/updateBookingStatus",
        {
          TrangThai,
          MaDatTour: MaDatTour,
        }
      );
      if (response.status === 200) {
        const updatedDataBooking = hisJoinning.map((booking) =>
          booking.MaDatTour === MaDatTour
            ? { ...booking, TrangThai: "HDV đã xác nhận" }
            : booking
        );
        toast.success("Xác nhận tham gia tour");
        setHisJoinning(updatedDataBooking);
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AdminLayout />
      <ToastContainer />
      <div className="main-body">
        <h4 className="fw-bolder">TOUR ĐANG THAM GIA</h4>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div className="d-flex align-items-center">
            <input
              placeholder="Tìm kiếm ..."
              id="search-input-item"
              className=" form-control me-1"
              type="text"
            />
            <button className="btn btn-primary">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div>
            <i className="fa-solid fa-filter me-1"></i>
            <span className="fw-bolder">Xắp sếp</span>
            <select className="ms-3">
              <option value="newItem">Ngày gần đây</option>
              <option value="lowToHigh">Giá thấp đến cao</option>
              <option value="highToLow">Giá cao đến thấp</option>
              <option value="highToLow">A - Z</option>
            </select>
          </div>
        </div>
        <div>
          <Row className="me-4 mt-3">
            {hisJoinning.map((item) => (
              <Col key={item.MaDatTour} sm="4">
                <Card className="mb-3 p-2">
                  <CardImg
                    height={200}
                    width={250}
                    src={`http://localhost:2024/${item.URL}`}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardText>
                      <p>Mã đặt tour: {item.MaDatTour}</p>
                      <p>Khách hàng: {item.HoTen}</p>
                      <p>Liên hệ: {item.LienHe}</p>
                      <p>
                        Số lượng khách:{" "}
                        <span className="fw-bolder">{item.SoCho} khách</span>
                      </p>
                      <p className="">
                        Thời gian đặt: {formatDateTime(item.ThoiGianDat)}
                      </p>
                      <hr className="m-0" />
                    </CardText>
                  </CardBody>
                  <div className="d-flex flex-wrap">
                    <CardBody className="d-flex pt-0 mb-0">
                      <span className="bg-light rounded p-1">
                        {item.TrangThai}
                      </span>
                      {item.TrangThai === "Đang đợi duyệt" && (
                        <button
                          onClick={() => handleSubmit(item.MaDatTour)}
                          className="btn btn-success"
                        >
                          Xác nhận tham gia
                        </button>
                      )}
                      {item.TrangThai === "Tour đã được duyệt" && (
                        <button
                          className="btn btn-info"
                          disabled={true} // Optionally disable the button when already joined
                        >
                          Đã tham gia
                        </button>
                      )}
                    </CardBody>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default EmployJoining;
