import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeHeader from "@/components/HomeLayout/HomeHeader";
import HomeFooter from "@/components/HomeLayout/HomeFooter";
import { Table, Modal, Button, Form, Alert } from "react-bootstrap";
import { Card, CardImg, CardBody, CardText, Row, Col } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

const HistoryBooking = () => {
  const [hisBooking, setHisBooking] = useState([]);

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
    const userId = localStorage.getItem("userId");
    console.log("ID tài khoản KH", userId);
    try {
      const fetchHistory = async () => {
        const response = await axios.post(
          `http://localhost:2024/api/chitietdattour/historyBooking`,
          {
            MaTaikhoan_KH: userId,
          }
        );
        console.log("Dữ liệu history", response.data);
        setHisBooking(response.data);
      };
      fetchHistory();
    } catch (err) {
      console.error("Error fetching history !", err);
    }
  }, []);

  return (
    <div>
      <HomeHeader />
      <div style={{ paddingTop: "50px" }} className="main-content mt-5">
        <div className="row">
          <div className="col-3">
            <ul
              style={{ marginTop: "1rem", paddingRight: "3rem" }}
              className="nav-ttcn"
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
          <div className="col">
            <div className="d-flex align-items-center justify-content-between me-5">
              <h4>LỊCH SỬ THANH TOÁN</h4>
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
            <Row className="me-4 mt-3">
              {hisBooking.map((item) => (
                <Col key={item.MaDatTour} sm="4">
                  <Card className="mb-3 p-2">
                    <CardImg
                      height={200}
                      width={250}
                      src={item.URL}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardText>
                        <p>Mã đặt tour: {item.MaDatTour}</p>
                        <p>
                          Số vé mua:{" "}
                          <span className="fw-bolder">{item.SoCho} vé</span>
                        </p>
                        <p>
                          Hình thức thanh toán:{" "}
                          <span className="fw-bolder text-info">
                            {item.ThanhToan}
                          </span>
                        </p>
                        <p>
                          Tổng tiền:{" "}
                          <span className="text-danger">
                            {formatCurrency(item.TongGia)} VND
                          </span>
                        </p>
                        <p className="">
                          Thời gian đặt: {formatDateTime(item.ThoiGianDat)}
                        </p>
                        <hr className="m-0" />
                      </CardText>
                    </CardBody>
                    <CardBody className="d-flex justify-content-between pt-0 mb-0">
                      <span className="bg-light rounded p-2">
                        {item.TrangThai}
                      </span>
                      <span className="btn btn-danger">Hủy đơn</span>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default HistoryBooking;
