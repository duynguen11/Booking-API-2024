import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Modal } from "react-bootstrap";
import HomeFooter from "@/components/HomeLayout/HomeFooter";
import HomeHeader from "@/components/HomeLayout/HomeHeader";
import ScrollToTop from "@/components/HomeLayout/ScrollToTop";

const ThongtinTour = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tour, setTour] = useState([]);
  const [imgBST, setImgBST] = useState([]);
  const [tourData, setTourData] = useState([]);
  const [lichTrinh, setLichTrinh] = useState([]);
  const [chitiettour, setChitiettour] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchTourData = async () => {
      if (!id) return; // Kiểm tra nếu id không tồn tại, không thực hiện yêu cầu API
      try {
        const response = await axios.get(
          `http://localhost:2024/api/tour/${id}`
        );
        const data = response.data;
        setTour(data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchImgData = async () => {
      if (!id) return;
      try {
        const res = await axios.get(
          `http://localhost:2024/api/tour/imageExtras/${id}`
        );
        const imgdata = res.data.images;
        console.log("Danh sách ảnh theo ID", imgdata);
        setImgBST(imgdata);
      } catch (error) {
        console.error("Error fetching images bst data:", error);
      }
    };

    const fetchLichTrinh = async () => {
      if (!id) return; // Kiểm tra nếu id không tồn tại, không thực hiện yêu cầu API
      try {
        const response = await axios.get(
          `http://localhost:2024/api/tour/lichtrinhtour/${id}`
        ); // Thay đổi endpoint để lấy lịch trình của từng tour
        setLichTrinh(response.data);
      } catch (error) {
        console.error("Error fetching lich trinh data:", error);
      }
    };

    const fetchChitiettour = async () => {
      if (!id) return; // Kiểm tra nếu id không tồn tại, không thực hiện yêu cầu API
      try {
        const response = await axios.get(
          `http://localhost:2024/api/tour/chitiettour/${id}`
        ); // Thay đổi endpoint để lấy lịch trình của từng tour
        setChitiettour(response.data);
      } catch (error) {
        console.error("Error fetching lich trinh data:", error);
      }
    };

    fetchTourData();
    fetchImgData();
    fetchLichTrinh();
    fetchChitiettour();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2024/api/tour");
        const limitedData = response.data.slice(0, 8);
        setTourData(limitedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [dataCTGT, setDataCTGT] = useState({
    nguoilon: "",
    treem: "",
    trenho: "",
    embe: "",
    phuthu: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2024/api/chitietgiatour/ctgt/${id}`
        );
        const data = response.data;
        // Cập nhật dữ liệu từ URL vào state formData
        const filteredData = {};
        data.forEach((item) => {
          switch (item.LoaiKhach) {
            case 1:
              filteredData.nguoilon = item.GiaTourChiTiet.toLocaleString(
                "vi-VN",
                { style: "currency", currency: "VND" }
              );
              break;
            case 2:
              filteredData.treem = item.GiaTourChiTiet.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              });
              break;
            case 3:
              filteredData.trenho = item.GiaTourChiTiet.toLocaleString(
                "vi-VN",
                { style: "currency", currency: "VND" }
              );
              break;
            case 4:
              filteredData.embe = item.GiaTourChiTiet.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              });
              break;
            case 5:
              filteredData.phuthu = item.GiaTourChiTiet.toLocaleString(
                "vi-VN",
                { style: "currency", currency: "VND" }
              );
              break;
            default:
              break;
          }
        });

        setDataCTGT(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <HomeHeader />
      <ul className="menu ps-5 justify-content-start align-items-center">
        <li className="menu-item">
          <a href="#tongquan" className="menu-link">
            Tổng quan
          </a>
        </li>
        <li className="menu-item">
          <a href="#lichtrinh" className="menu-link">
            Lịch trình
          </a>
        </li>
        <li className="menu-item">
          <a href="#danhgia" className="menu-link">
            Đánh giá
          </a>
        </li>
        <li className="menu-item">
          <a href="#goiy" className="menu-link">
            Gợi ý
          </a>
        </li>
        <input
          style={{ width: "300px" }}
          className="form-control me-1"
          type="search"
          name=""
          id=""
          placeholder="Tìm kiếm ở đây ..."
        />
        <a className="btn btn-outline-secondary" href="">
          <i class="fa-solid fa-magnifying-glass fw-bolder"></i>
        </a>
      </ul>
      <div></div>
      <div className="px-5" style={{ marginTop: "130px" }}>
        {tour.map((t, index) => (
          <div
            className="container px-5 d-flex justify-content-center align-items-center"
            key={index}
          >
            <div>
              <div className="row d-flex">
                <div className="col-8">
                  <h3 id="tongquan" className="fw-bolder">
                    {t.TenTour}
                  </h3>
                  <p className="fw-bolder text-primary mb-0">
                    <i class="fa-solid fa-tag me-1"></i>
                    {t.TenChuDe}
                  </p>
                  <p className="fw-bolder text-secondary mb-0">
                    <i class="fa-solid fa-location-dot me-1"></i>
                    {t.DiemDen}
                  </p>
                </div>
                <div className="col d-flex flex-column justify-content-end text-end px-0">
                  <p className="fw-bolder text-secondary mb-0">
                    Giá vé trên 1 khách
                  </p>
                  <h4 className="text-danger fw-bolder">
                    {t.GiaTour.toLocaleString("vi-VN")} VND
                  </h4>
                  <Link href={`/booking/${t.MaTour}`}>
                    <button className="btn btn-danger py-2 fw-bolder w-100">
                      ĐẶT VÉ NGAY
                    </button>
                  </Link>
                </div>
              </div>
              <div className="row mt-3" style={{ height: "100%" }}>
                <div className="col-8 rounded d-flex justify-content-center align-items-center">
                  <Image
                    width={700}
                    height={200}
                    src={t.URL}
                    className="card-img-top rounded me-1"
                    alt={t.TenTour}
                    style={{ width: "100%", height: "90%" }}
                  />
                </div>
                <div className="col-4 pe-0 ps-0 rounded d-flex flex-column justify-content-center align-items-center">
                  <div className="">
                    <Image
                      width={500}
                      height={300}
                      className="rounded mb-2"
                      src="/banner/Banner_2.jpg"
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="">
                    <Image
                      width={500}
                      height={300}
                      className="rounded"
                      src="/banner/Banner_4.jpg"
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-8">
                  <p className="fw-bolder mb-1">Giới thiệu địa điểm lưu trú</p>
                  <p className="fs-7">{t.MoTa}</p>
                </div>
                <div className="col rounded border">
                  <h6 className="mt-2 fw-bolder">Thông tin chuyến đi</h6>
                  <p className="mb-0">Mã chuyến đi: {t.MaTour}</p>
                  <p className="mb-0">
                    Ngày khởi hành:{" "}
                    {format(new Date(t.NgayKhoiHanh), "dd-MM-yyyy HH:mm")}h
                  </p>
                  <p className="mb-0">Nơi tập trung: {t.NoiKhoiHanh}</p>
                  <p className="mb-0">Thời gian tham quan: {t.ThoiGian}</p>
                  <p className="mb-0">Số chỗ còn nhận: {t.SoCho} vé</p> <hr />
                  <h6 className="fw-bolder">Quý khách cần hỗ trợ ?</h6>
                  <div className="mb-2">
                    <button className="btn btn-primary">
                      <i class="fa-solid fa-phone-volume"></i> Gọi miễn phí
                    </button>
                    <button className="btn btn-secondary ms-2">
                      <i class="fa-regular fa-envelope"></i> Gửi yêu cầu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="container mt-3">
        <h4>Bộ sưu tập ảnh</h4>
        <Row>
          {imgBST.map((item, index) => (
            <Col key={index} xs={5} lg={3}>
              <div
                className="d-flex justify-content-center mb-3"
                onClick={() =>
                  handleOpenModal(item.URL)
                }
              >
                <Image
                  className="rounded mt-2"
                  width={"300"}
                  height={"200"}
                  src={item.URL}
                  alt={`Ảnh ${index + 1}`}
                />
              </div>
            </Col>
          ))}
        </Row>
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Body style={{ textAlign: "center" }}>
            <Image
              width={"700"}
              height={"500"}
              src={selectedImage}
              alt="Ảnh lớn"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </Modal.Body>
        </Modal>
      </div>

      <div id="lichtrinh" className="container mt-5">
        <h4 className="fw-bolder mb-3">LỊCH TRÌNH CHUYẾN ĐI</h4>
        <div className="row">
          <div className="table-responsive col me-5">
            <table className="table">
              <tbody>
                {lichTrinh.map((lt, index) => (
                  <tr key={index} className={"table-striped"}>
                    <td className="text-center">{lt.NgayThamQuan}</td>
                    <td className="fw-bolder">{lt.DiaDiem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <h4 className="fw-bolder mt-5 mb-2">
                THÔNG TIN CHI TIẾT CHUYẾN ĐI
              </h4>
              {chitiettour.map((c, index) => (
                <div className="bg-light p-3 rounded" key={index}>
                  <div className="">
                    <p>
                      <i class="fa-solid fa-calendar-days me-2"></i>
                      Ngày đi: {format(new Date(c.TTCT_ngaydi), "dd-MM-yyyy")}
                    </p>
                    <p className="">
                      <i class="fa-solid fa-reply me-2"></i>
                      Ngày về: {format(new Date(c.TTCT_ngayve), "dd-MM-yyyy")}
                    </p>
                  </div>
                  <div className="">
                    <p>
                      <i class="fa-solid fa-plane-departure me-2"></i>Nơi tập
                      trung: {c.TTCT_taptrung}
                    </p>
                    <p className="m-0">
                      <i class="fa-solid fa-map-location-dot me-2"></i>Điểm đến:{" "}
                      {c.TTCT_diemden}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="">
              <h4 className="fw-bolder mt-5 mb-2">BẢNG GIÁ CHI TIẾT</h4>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Loại vé</th>
                    <th scope="col">Giá vé (1 người)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Người lớn (trên 16 tuổi)</td>
                    <td className="text-danger">{dataCTGT.nguoilon}</td>
                  </tr>
                  <tr>
                    <td>Trẻ em (từ 6 - 16 tuổi)</td>
                    <td className="text-danger">{dataCTGT.treem}</td>
                  </tr>
                  <tr>
                    <td>Trẻ nhỏ (từ 1 - 5 tuổi)</td>
                    <td className="text-danger">{dataCTGT.trenho}</td>
                  </tr>
                  <tr>
                    <td>Em bé (dưới 5 tuổi)</td>
                    <td className="text-danger">{dataCTGT.embe}</td>
                  </tr>
                  <tr>
                    <td>Phụ thu phòng đơn (nếu có)</td>
                    <td className="text-danger">{dataCTGT.phuthu}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4 className="mt-5 fw-bolder">THÔNG TIN HƯỚNG DẪN VIÊN</h4>
            {chitiettour.map((c, index) => (
              <div className="d-flex p-3 bg-light rounded" key={index}>
                <div className="">
                  <Image
                    className="rounded"
                    width={"150"}
                    height={"150"}
                    src="/avatar/avatar_default.jpg"
                    alt=""
                  />
                </div>
                <div className="ms-3">
                  <p>HDV: {c.HoTen}</p>
                  <p>Giới tính: {c.GioiTinh}</p>
                  <p>Email: {c.Email}</p>
                  <p className="m-0">SĐT: {c.LienHe}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-7">
            {lichTrinh.map((lt, index) => (
              <div key={index}>
                <h4>
                  {lt.NgayThamQuan} - {lt.DiaDiem}
                </h4>
                <p
                  style={{ textAlign: "justify", fontSize: "15px" }}
                  className="text-justify pb-3"
                >
                  {lt.NoiDung}
                </p>
              </div>
            ))}
          </div>
          <h4 id="goiy" className="mt-4 fw-bolder">
            KHÁCH HÀNG CŨNG LỰA CHỌN
          </h4>
          <div
            className="container-fluid mt-3 pb-3"
            style={{ width: "100%", overflowX: "auto" }}
          >
            <div
              className="row"
              style={{ display: "flex", flexWrap: "nowrap" }}
            >
              {tourData.map((item) => (
                <div
                  className="col-5"
                  key={item.MaTour}
                  style={{ width: "350px" }}
                >
                  <div className="shadow p-2 rounded" style={{ width: "100%" }}>
                    <Image
                      width={400}
                      height={"220"}
                      src={`http://localhost:2024/${item.URL}`}
                      className="card-img-top rounded"
                      alt={item.TenTour}
                    />
                    <div className="card-body pt-3">
                      <h4 className="ps-2 card-title fw-bolder">
                        {item.TenTour}
                      </h4>
                      <div className="ps-2 pb-2 fw-bolder text-secondary">
                        <p className="card-title">
                          <i className="fa-solid fa-ticket"></i> Mã tour:{" "}
                          {item.MaTour}
                        </p>
                        <h6
                          style={{ color: "#007bff" }}
                          className="card-text mb-0"
                        >
                          {item.TenChuDe}
                        </h6>
                        <p className="card-text mb-0">
                          Giá vé:{" "}
                          <span className="text-danger">
                            {item.GiaTour} VND
                          </span>
                          /người
                        </p>
                      </div>
                      <div className="d-flex justify-content-end">
                        <div className="d-flex align-items-center justify-content-between">
                          <div
                            style={{ backgroundColor: "rgba(40, 67, 135, 1)" }}
                            className="d-flex align-items-center btn btn-secondary me-2"
                          >
                            <a className="text-decoration-none text-white fw-bolder">
                              Đặt vé ngay
                            </a>
                          </div>
                        </div>
                        <a
                          href={`/thongtintour/${item.MaTour}`}
                          className="btn btn-outline-secondary fw-bolder"
                        >
                          Xem chi tiết
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
      <HomeFooter />
    </>
  );
};

export default ThongtinTour;
