import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeHeader from "@/components/HomeLayout/HomeHeader";
import HomeFooter from "@/components/HomeLayout/HomeFooter";
import axios from "axios";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { Form, InputGroup, Modal, Button, FormControl } from "react-bootstrap";

const Confirmbooking = () => {
  const [bookingData, setBookingData] = useState(null);
  const [dataHDV, setDataHDV] = useState();
  const [dataTour, setDataTour] = useState();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showCashModal, setShowCashModal] = useState(false);
  const [showMomoModal, setShowMomoModal] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);

  const [showSuccessModal, setSuccessModal] = useState(false);
  const [isModalClosed, setIsModalClosed] = useState(false);

  const router = useRouter();

  const handleCloseModal = () => {
    setSuccessModal(false);
    setIsModalClosed(true);
    // Thực hiện các thao tác khác sau khi đóng modal
  };

  if (isModalClosed) {
    router.push("/tourlist");
  }

  const handleCheckboxChange = (method) => {
    if (selectedPaymentMethod !== method) {
      setSelectedPaymentMethod(method);
      switch (method) {
        case "Tiền mặt":
          setShowCashModal(true);
          setShowMomoModal(false);
          setShowBankTransferModal(false);
          break;
        case "Momo pay":
          setShowCashModal(false);
          setShowMomoModal(true);
          setShowBankTransferModal(false);
          break;
        case "Chuyển khoản":
          setShowCashModal(false);
          setShowMomoModal(false);
          setShowBankTransferModal(true);
          break;
        default:
          setShowCashModal(false);
          setShowMomoModal(false);
          setShowBankTransferModal(false);
      }
    }
  };

  const formatDateTime = (dateTimeString) => {
    const d = new Date(dateTimeString);
    return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getFullYear()} ${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
    return formattedAmount.replace(/\s₫/g, "");
  };

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const fetchData = async () => {
      try {
        // Lấy dữ liệu từ localStorage
        const formDataBooking = JSON.parse(
          localStorage.getItem("formDataBooking")
        );
        // Gán dữ liệu vào state
        setBookingData(formDataBooking);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Gọi function fetchData
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataTour = async () => {
      try {
        // Lấy id từ local booking
        const formDataBooking = JSON.parse(
          localStorage.getItem("formDataBooking")
        );
        const maTour = formDataBooking.MaTour;
        const hdvId = formDataBooking.MaTaikhoan_HDV;

        // Gửi yêu cầu API
        const response = await axios.get(
          `http://localhost:2024/api/tour/booking-tour/${maTour}`
        );
        setDataTour(response.data);

        const response1 = await axios.get(
          `http://localhost:2024/api/account/info-HDV/${hdvId}`
        );
        setDataHDV(response1.data.userInfo);
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    };

    // Gọi function fetchDataTour
    fetchDataTour();
  }, []);

  const handleSubmitBooking = async () => {
    try {
      let formSubmitBooking = JSON.parse(
        localStorage.getItem("formDataBooking")
      );
      formSubmitBooking = {
        ...formSubmitBooking,
        ThanhToan: selectedPaymentMethod,
      };

      // Gửi dữ liệu lên server API
      const response = await axios.post(
        "http://localhost:2024/api/chitietdattour/submitBooking ",
        formSubmitBooking
      );
      if (response.status === 200) {
        // Nếu mã trạng thái là 200, hiển thị cảnh báo đặt tour thành công
        setSuccessModal(true);
        //Xóa thong tin booking localstorage
        localStorage.removeItem("formDataBooking");
      }
      // Xử lý kết quả từ server (nếu cần)
    } catch (error) {
      console.error("Đã có lỗi xảy ra khi gửi dữ liệu:", error);
      // Xử lý lỗi (nếu cần)
    }
  };

  return (
    <>
      <HomeHeader />
      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row mt-5">
          <div className="col-7">
            <h4>THÔNG TIN CHI TIẾT ĐẶT TOUR</h4>
            {bookingData && (
              <>
                <div className="border p-4 rounded">
                  <h4 className="text-danger">Thông tin khách hàng</h4>
                  <hr />
                  <div className="d-flex row mb-2">
                    <p className="col">
                      Họ Tên :{" "}
                      <span className="fw-bolder">{bookingData.HoTen}</span>
                    </p>
                    <p className="col">
                      Số điện thoại :{" "}
                      <span className="fw-bolder">{bookingData.LienHe}</span>
                    </p>
                  </div>
                  <p className="mb-4">
                    Email :{" "}
                    <span className="fw-bolder">{bookingData.Email}</span>
                  </p>
                  <p className="mt-4 mb-0">
                    Địa chỉ :{" "}
                    <span className="fw-bolder">{bookingData.DiaChi}</span>
                  </p>
                </div>
                <div className="border p-4 rounded mt-4">
                  <h4 className="text-danger">Chi tiết booking</h4>
                  <hr />
                  <p className="mb-4">Số vé đã đặt : {bookingData.SoCho} vé</p>
                  <p className="mb-4">
                    Tổng số tiền thanh toán :{" "}
                    <span className="text-danger fw-bolder">
                      {formatCurrency(bookingData.TongGia)} VND
                    </span>
                  </p>
                  <p className="mb-4">
                    Thời gian đăng ký tour :{" "}
                    {formatDateTime(bookingData.ThoiGianDat)}
                  </p>
                  <p className="m-0">
                    Trạng thái đơn hàng : Thông tin đặt tour{" "}
                    <span className="fw-bolder">đang đợi xét duyệt</span>
                  </p>
                </div>
              </>
            )}
            <div
              style={{ width: "fit-content" }}
              className="border p-4 rounded mt-4"
            >
              <h4>Thông tin hướng dẫn viên</h4>
              <hr />
              {dataHDV && (
                <div className="d-flex">
                  <div>
                    <Image
                      className="rounded"
                      src={"/avatars/avatar_default.jpg"}
                      width={150}
                      height={150}
                      alt="HDV-picture"
                    />
                    <p className="mb-0">Mã nhân viên: {dataHDV.MaTaikhoan}</p>
                  </div>
                  <div className="ms-4">
                    <p>Họ tên : {dataHDV.HoTen}</p>
                    <p>Số điện thoại : {dataHDV.LienHe}</p>
                    <p>Email liên hệ : {dataHDV.Email}</p>
                    <p>Thời gian làm việc : {dataHDV.NgayTao}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col ms-2">
            <h4>PHIẾU XÁC NHẬN BOOKING</h4>
            <div className="border p-4 rounded">
              <h4 className="text-danger">Thông tin tour chi tiết</h4>
              <hr />
              {dataTour && (
                <>
                  <div className="">
                    {dataTour.map((tour, index) => (
                      <div key={index}>
                        <div className="d-flex">
                          <div className="ms-2">
                            <Image
                              className="rounded"
                              width={150}
                              height={100}
                              src={tour.URL}
                              alt="Hinh-tour"
                            />
                            <p className="mb-0">Mã Tour: {tour.MaTour}</p>
                          </div>
                          <div className="ms-5 text-end">
                            <p>Tên Tour: {tour.TenTour}</p>
                            <p>Chủ Đề: {tour.TenChuDe}</p>
                            <p>
                              Ngày Khởi Hành:{" "}
                              {formatDateTime(tour.NgayKhoiHanh)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <hr />
                          <div className="row">
                            <p className="col fw-bolder">
                              Phương tiện di chuyển :{" "}
                            </p>
                            <span className="col text-end">
                              {tour.PhuongTien}
                            </span>
                          </div>
                          <div className="row">
                            <p className="col fw-bolder">
                              Thời gian tham quan :{" "}
                            </p>
                            <span className="col text-end">
                              {tour.ThoiGian}
                            </span>
                          </div>
                          <div className="row">
                            <p className="col fw-bolder">Địa điểm đến : </p>
                            <span className="col text-end">
                              {tour.TTCT_diemden}
                            </span>
                          </div>
                          <div className="row">
                            <p className="col fw-bolder">Nơi tập trung : </p>
                            <span className="col text-end">
                              {tour.TTCT_taptrung}
                            </span>
                          </div>
                          <div className="row">
                            <p className="col fw-bolder">Ngày di chuyển : </p>
                            <span className="col text-end">
                              {formatDate(tour.TTCT_ngaydi)}
                            </span>
                          </div>
                          <div className="row">
                            <p className="col fw-bolder mb-0">Ngày về : </p>
                            <span className="col text-end">
                              {formatDate(tour.TTCT_ngayve)}
                            </span>
                          </div>
                          <hr />
                          <div className="">
                            <h4>Chọn hình thức thanh toán</h4>
                            <div className="bg-light d-flex align-items-center justify-content-between p-3 rounded">
                              <div className="bg-light d-flex align-items-center">
                                <i
                                  style={{ fontSize: "35px" }}
                                  className="fa-solid fa-money-bill-transfer"
                                ></i>
                                <span className="fw-bolder ms-2">Tiền mặt</span>
                              </div>
                              <Form.Check
                                type="checkbox"
                                style={{ fontSize: "25px" }}
                                checked={selectedPaymentMethod === "Tiền mặt"}
                                onChange={() =>
                                  handleCheckboxChange("Tiền mặt")
                                }
                              />
                            </div>

                            <div className="bg-light d-flex align-items-center justify-content-between p-3 rounded mt-1">
                              <div className="bg-light d-flex align-items-center">
                                <i
                                  style={{ fontSize: "35px" }}
                                  className="fa-solid fa-house-signal"
                                ></i>
                                <span className="fw-bolder ms-2">
                                  Chuyển khoản
                                </span>
                              </div>
                              <Form.Check
                                type="checkbox"
                                style={{ fontSize: "25px" }}
                                checked={
                                  selectedPaymentMethod === "Chuyển khoản"
                                }
                                onChange={() =>
                                  handleCheckboxChange("Chuyển khoản")
                                }
                              />
                            </div>
                            <div className="bg-light d-flex align-items-center justify-content-between p-3 rounded mt-1">
                              <div className="bg-light d-flex align-items-center">
                                <Image
                                  width={40}
                                  height={40}
                                  src={"/banner/momo_logo.webp"}
                                  alt="momo-logo"
                                />
                                <span className="fw-bolder ms-2">
                                  Ví điện tử Momo
                                </span>
                              </div>
                              <Form.Check
                                type="checkbox"
                                style={{ fontSize: "25px" }}
                                checked={selectedPaymentMethod === "Momo pay"}
                                onChange={() =>
                                  handleCheckboxChange("Momo pay")
                                }
                              />
                            </div>
                            <hr />
                            <button
                              className="btn btn-danger w-100 py-3 fw-bolder"
                              onClick={handleSubmitBooking}
                            >
                              XÁC NHẬN BOOKING
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Modal for Cash */}
        <Modal
          className="mt-5"
          show={showCashModal}
          onHide={() => setShowCashModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>THANH TOÁN TIỀN MẶT</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center d-flex flex-column align-items-center">
            <div
              style={{ width: "fit-content" }}
              className="bg-light p-4 rounded mb-3"
            >
              <i
                style={{ fontSize: "50px" }}
                className="fa-solid fa-money-bill-transfer"
              ></i>
            </div>
            <span>
              Quý khách vui lòng thanh toán tại bất kỳ văn phòng Nextbooking
              trên toàn quốc và các chi nhánh tại nước ngoài. Vui lòng liên hệ{" "}
              <span className="text-danger">0987654321</span> để biết thêm chi
              tiết.
            </span>
          </Modal.Body>
        </Modal>

        {/* Modal for Momo */}
        <Modal
          className="mt-5"
          show={showMomoModal}
          onHide={() => setShowMomoModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal for Momo</Modal.Title>
          </Modal.Header>
          <Modal.Body>This is the content for Momo modal.</Modal.Body>
        </Modal>

        {/* Modal for Bank Transfer */}
        <Modal
          className="mt-5"
          show={showBankTransferModal}
          onHide={() => setShowBankTransferModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>THANH TOÁN CHUYỂN KHOẢN</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center d-flex flex-column align-items-center">
            <div
              style={{ width: "fit-content" }}
              className="bg-light p-4 rounded mb-3"
            >
              <i
                style={{ fontSize: "50px" }}
                className="fa-solid fa-house-signal"
              ></i>
            </div>
            <span>
              Quý khách sau khi thực hiện việc chuyển khoản vui lòng gửi email
              đến{" "}
              <span className="text-danger">
                tructuyen@nextbooking.vercel.app
              </span>{" "}
              hoặc gọi tổng đài <span className="text-danger">19001839</span> để
              được xác nhận từ công ty chúng tôi.
            </span>
            <hr />
            <span className="flex-start">
              <p>Tên Tài Khoản : Công ty CP Du lịch và Tiếp thị Nextbooking</p>
              <p>Tên tài khoản viết tắt : NEXTBOOKING</p>
              <p>Số Tài khoản : 123 6977 279xxx</p>
              <p>Ngân hàng : Vietinbank - Chi nhánh 7 Hồ Chí Minh.</p>
            </span>
          </Modal.Body>
        </Modal>
        {/* Modal for Success booking */}
        <Modal
          className="mt-5"
          show={showSuccessModal}
          onHide={handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>HỆ THỐNG PHẢN HỒI</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center d-flex flex-column align-items-center">
            <div
              style={{ width: "fit-content" }}
              className="bg-light p-4 rounded mb-3"
            >
              <i
                style={{ fontSize: "50px" }}
                className="fa-solid fa-clipboard-check text-success"
              ></i>
            </div>
            <span className="fw-bolder text-success">
              ĐẶT TOUR THÀNH CÔNG !
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <HomeFooter />
    </>
  );
};

export default Confirmbooking;
