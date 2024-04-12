import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeHeader from "@/components/HomeLayout/HomeHeader";
import HomeFooter from "@/components/HomeLayout/HomeFooter";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

const Booking = () => {
  const router = useRouter();
  const { id } = router.query;

  const [tourInfo, setTourInfo] = useState({});
  const [selectedHDVInfo, setSelectedHDVInfo] = useState({});
  const [allHDVs, setAllHDVs] = useState([]);
  const [selectedHDV, setSelectedHDV] = useState("");
  const [tourPrices, setTourPrices] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedTicketTypes, setSelectedTicketTypes] = useState([]);

  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    sdt: "",
    diaChi: "",
    soVe: '',
    tongGia: "",
    MaHDV: "",
    trangthai: "đang đợi duyệt"
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Gửi yêu cầu GET đến máy chủ để lấy thông tin của userId
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:2024/api/account/user-info/${userId}`
          );
          const userData = response.data;
          setFormData((prevFormData) => ({
            ...prevFormData,
            hoTen: userData.userInfo.HoTen,
            email: userData.userInfo.Email,
            sdt: userData.userInfo.LienHe,
            diaChi: userData.userInfo.DiaChi,
            // Thêm các trường khác nếu cần
          }));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchTourInfo = async () => {
      try {
        const url = `http://localhost:2024/api/tour/booking-tour/${id}`;
      console.log("URL:", url); // Log URL trước khi gửi yêu cầu axios
      const res = await axios.get(url);
        if (res.data && res.data.length > 0) {
          // Kiểm tra xem res.data tồn tại và có ít nhất một phần tử
          const tourData = res.data[0];
          console.log(tourData)
          setTourInfo(tourData);
        } else {
          console.error("Không có dữ liệu tour được trả về từ server.");
        }
      } catch (err) {
        console.error("Đã xảy ra lỗi khi lấy thông tin tour:", err);
      }
    };

    const fetchAllHDVs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:2024/api/account/employees"
        );
        if (res.data) {
          setAllHDVs(res.data);
        } else {
          console.error("Không có dữ liệu HDV được trả về từ server.");
        }
      } catch (err) {
        console.error("Đã xảy ra lỗi khi lấy danh sách HDV:", err);
      }
    };

    const fetchTourPrices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2024/api/chitietgiatour/ctgt/${id}`
        );
        setTourPrices(response.data);
      } catch (error) {
        console.error("Error fetching tour prices:", error);
      }
    };

    fetchAllHDVs();
    fetchTourInfo();
    fetchTourPrices();
  }, [id]);

  useEffect(() => {
    if (selectedHDV) {
      fetchHDVInfo(selectedHDV);
    }
  }, [selectedHDV]);

  const fetchHDVInfo = async (hdvId) => {
    try {
      const res = await axios.get(
        `http://localhost:2024/api/account/info-HDV/${hdvId}`
      );
      if (res.data) {
        setSelectedHDVInfo(res.data.userInfo);
      } else {
        console.error("Không có dữ liệu HDV với id đã chọn từ server.");
      }
    } catch (err) {
      console.error("Đã xảy ra lỗi khi lấy thông tin HDV:", err);
    }
  };

  const handleHDVChange = (e) => {
    setSelectedHDV(e.target.value);
  };

  const decreaseQuantity = (price) => {
    const index = selectedPrices.findIndex(
      (item) => item.MaCTGT === price.MaCTGT
    );
    if (index !== -1) {
      const updatedSelectedPrices = [...selectedPrices];
      if (updatedSelectedPrices[index].quantity > 0) {
        // Kiểm tra nếu số lượng lớn hơn 0
        updatedSelectedPrices[index].quantity -= 1;
        setSelectedPrices(updatedSelectedPrices);
      }
    }
  };

  // Hàm cộng số lượng của một hàng giá
  const increaseQuantity = (price) => {
    const index = selectedPrices.findIndex(
      (item) => item.MaCTGT === price.MaCTGT
    );
    if (index !== -1) {
      const updatedSelectedPrices = [...selectedPrices];
      updatedSelectedPrices[index].quantity += 1;
      setSelectedPrices(updatedSelectedPrices);
    }
  };

  const getTotalPrice = () => {
    return selectedPrices.reduce(
      (total, price) => total + price.GiaTourChiTiet * price.quantity,
      0
    );
  };

  const getTotalQuantity = () => {
    return selectedPrices.reduce((total, price) => total + price.quantity, 0);
  };

  // Hiển thị danh sách các loại khách hàng đã chọn cùng với số lượng
  const renderSelectedPrices = () => {
    return selectedPrices.map((price) => {
      let type = "";
      switch (price.LoaiKhach) {
        case 1:
          type = "Người lớn";
          break;
        case 2:
          type = "Trẻ em";
          break;
        case 3:
          type = "Trẻ nhỏ";
          break;
        case 4:
          type = "Em bé";
          break;
        case 5:
          type = "Phụ thu";
          break;
        default:
          type = "Loại khách không xác định";
          break;
      }
      const total = price.GiaTourChiTiet * price.quantity;
      return (
        <div
          style={{ fontSize: "15px" }}
          key={price.MaCTGT}
          className="d-flex justify-content-between align-items-center bg-light p-2 mt-2 rounded"
        >
          <p className="m-0">
            {type}: ({price.GiaTourChiTiet} VND x{" "}
            <span className="text-danger fw-bolder">{price.quantity} vé</span>){" "}
            {total} VND
          </p>
          <div>
            <button
              className="btn btn-sm btn-secondary px-3 me-1"
              onClick={() => increaseQuantity(price)}
            >
              +
            </button>
            <button
              className="btn btn-sm btn-danger px-3"
              onClick={() => decreaseQuantity(price)}
            >
              -
            </button>
          </div>
        </div>
      );
    });
  };

  const handleCheckboxChange = (event, price) => {
    const { checked } = event.target;
    const isTypeSelected = selectedTicketTypes.includes(price.LoaiKhach);

    if (checked) {
      if (!isTypeSelected) {
        setSelectedTicketTypes([...selectedTicketTypes, price.LoaiKhach]);

        // Loại bỏ giá trị cũ của loại giá khỏi danh sách selectedPrices nếu nó đã tồn tại
        const updatedPrices = selectedPrices.filter(
          (selectedPrice) => selectedPrice.LoaiKhach !== price.LoaiKhach
        );
        setSelectedPrices([...updatedPrices, { ...price, quantity: 1 }]);
      }
    } else {
      setSelectedTicketTypes(
        selectedTicketTypes.filter((type) => type !== price.LoaiKhach)
      );

      // Loại bỏ giá trị của loại giá khỏi danh sách selectedPrices
      const updatedPrices = selectedPrices.filter(
        (selectedPrice) => selectedPrice.LoaiKhach !== price.LoaiKhach
      );
      setSelectedPrices(updatedPrices);
    }
  };

  const handleBookingTour = async () => {
    try {
      // Lấy id tour từ tourData
      const tourId = tourInfo.MaTour;
      // Lấy id tài khoản HDV từ selectedHDV
      const hdvId = parseInt(selectedHDV) || tourInfo.MaTaikhoan;
      // Gửi yêu cầu đặt tour
      console.log("Mã tour được đặt:", tourId);

      const totalPrice = getTotalPrice();
      const totalTiket = getTotalQuantity();

      const formDataWithHDV = {
        ...formData,
        soVe: totalTiket,
        tongGia: totalPrice,
        MaHDV: hdvId,
      };

      console.log("Thông tin đặt tour:", formDataWithHDV);
      // Thực hiện các hành động khác sau khi đặt tour thành công (nếu cần)
    } catch (err) {
      console.error("Đã xảy ra lỗi khi đặt tour:", err);
    }
  };

  return (
    <div>
      <HomeHeader />
      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row border bg-light px-2 py-3 rounded mt-3">
          <div className="col-4">
            <Image
              className="rounded"
              width={'400'}
              height={'200'}
              style={{ width: "100%", height: "100%" }}
              src={`http://localhost:2024/${tourInfo.URL}`}
              alt="Hình ảnh tour"
            />
          </div>
          <div className="col">
            <h3>Tên Tour: {tourInfo.TenTour}</h3>
            <p>Mã Tour: {tourInfo.MaTour}</p>
            <p>Ngày Khởi Hành: {formatDate(tourInfo.NgayKhoiHanh)}</p>
            <p>Thời Gian: {tourInfo.ThoiGian}</p>
            <p>Số Chỗ: {tourInfo.SoCho}</p>
            <p>Nơi Khởi Hành: {tourInfo.NoiKhoiHanh}</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-7 me-4">
            <h4>THÔNG TIN KHÁCH HÀNG</h4>
            <div className="border px-3 py-4 rounded">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <label htmlFor="">
                    Nhập họ tên: <span className="text-danger">(*)</span>
                  </label>
                  <input
                    className="form-control mt-1"
                    type="text"
                    placeholder="Họ và tên"
                    name="hoTen"
                    value={formData.hoTen}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <label htmlFor="">
                    Nhập Email: <span className="text-danger">(*)</span>{" "}
                  </label>
                  <input
                    className="form-control mt-1"
                    type="text"
                    placeholder="Email (email@gmail.com)"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="d-flex mt-3">
                <div className="flex-grow-1">
                  <label htmlFor="">
                    Nhập SĐT: <span className="text-danger">(*)</span>
                  </label>
                  <input
                    className="form-control mt-1"
                    type="text"
                    placeholder="SĐT liên hệ"
                    name="sdt"
                    value={formData.sdt}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <label htmlFor="">Nhập địa chỉ:</label>
                  <input
                    className="form-control mt-1"
                    type="text"
                    placeholder="Địa chỉ"
                    name="diaChi"
                    value={formData.diaChi}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <h4 className="mt-5">BẢNG GIÁ TOUR CHI TIẾT</h4>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Loại khách hàng</th>
                    <th>Giá vé (VND)</th>
                    <th className="text-center">Vui lòng chọn vé <span className="text-danger">(*)</span></th>
                  </tr>
                </thead>
                <tbody>
                  {tourPrices.map((price, index) => (
                    <tr
                      key={price.LoaiKhach}
                      className={index % 2 === 0 ? "table-light" : ""}
                    >
                      <td>
                        {price.LoaiKhach === 1 && "Người lớn"}
                        {price.LoaiKhach === 2 && "Trẻ em"}
                        {price.LoaiKhach === 3 && "Trẻ nhỏ"}
                        {price.LoaiKhach === 4 && "Em bé"}
                        {price.LoaiKhach === 5 && "Phụ thu"}
                      </td>
                      <td>{price.GiaTourChiTiet} VND</td>
                      <td className="text-center">
                        <input
                          className=""
                          type="checkbox"
                          onChange={(event) =>
                            handleCheckboxChange(event, price)
                          }
                          checked={selectedTicketTypes.includes(
                            price.LoaiKhach
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h4 className="mt-5">THÔNG TIN HƯỚNG DẪN VIÊN</h4>
            <div
              className="d-flex align-items-center p-3 rounded bg-light"
              style={{ width: "fit-content" }}
            >
              <div className="">
                <Image
                  width={'150'}
                  height={'150'}
                  style={{ width: "150px", height: "150px" }}
                  className="rounded"
                  src="/avatar/avatar_default.jpg"
                  alt=""
                />
                <p className="m-0">
                  Mã HDV: {selectedHDVInfo.MaTaikhoan || tourInfo.MaTaikhoan}
                </p>
              </div>
              <div className="ms-3">
                <label htmlFor="hdvSelect">Thay đổi HDV khác: </label>
                <select
                  id="hdvSelect"
                  className="form-control mb-2"
                  value={selectedHDV}
                  onChange={handleHDVChange}
                >
                  <option value="">-- Chọn HDV --</option>
                  {allHDVs.map((hdv) => (
                    <option key={hdv.MaTaikhoan} value={hdv.MaTaikhoan}>
                      {hdv.HoTen}
                    </option>
                  ))}
                </select>
                <p>Tên: {selectedHDVInfo.HoTen || tourInfo.HoTen}</p>
                <p>
                  Giới tính: {selectedHDVInfo.GioiTinh || tourInfo.GioiTinh}
                </p>
                <p>SĐT liên hệ: {selectedHDVInfo.LienHe || tourInfo.LienHe}</p>
                <p>Email liên hệ: {selectedHDVInfo.Email || tourInfo.Email}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <h4>TÓM TẮT ĐƠN HÀNG</h4>
            <div className="border p-3 rounded">
              <div>
                <h5>Thông tin chuyến đi</h5>
                <div className="d-flex">
                  <div className="me-3">
                    <Image
                    width={150}
                    height={100}
                      className="rounded"
                      style={{ width: "150px", height: "100px" }}
                      src={`http://localhost:2024/${tourInfo.URL}`}
                      alt="Hình ảnh tour"
                    />
                    <p className="m-0">Mã Tour: {tourInfo.MaTour}</p>
                  </div>
                  <div>
                    <p>Dịch vụ du lịch: {tourInfo.TenChuDe}</p>
                    <p>Phương tiện di chuyển: {tourInfo.PhuongTien}</p>
                    <p className="m-0">Thời gian tham quan: {tourInfo.ThoiGian}</p>
                  </div>
                </div>
              </div><hr />

              <div>
                <h5>Lịch chi tiết chuyến đi</h5>
                <div className="mt-3">
                  <p>Nơi tập trung: {tourInfo.TTCT_taptrung}</p>
                  <p>Ngày xuất phát: {formatDate(tourInfo.TTCT_ngaydi)}</p>
                  <p>Địa điểm tham quan: {tourInfo.TTCT_diemden}</p>
                  <p>Ngày về: {formatDate(tourInfo.TTCT_ngayve)}</p>
                </div>
              </div><hr />
              {selectedPrices.length > 0 && (
                <div className="mb-4">
                  <h5>Thông tin loại giá vé</h5>
                  <div className="rounded">
                    {renderSelectedPrices()}
                  </div>
                  <hr />
                  <h5>
                    Tổng thanh toán:{" "}
                    <span className="text-danger">{getTotalPrice()} VND</span>
                  </h5>
                </div>
              )}
              <button
                className="btn btn-danger w-100 p-3"
                onClick={handleBookingTour}
              >
                ĐẶT TOUR NGAY
              </button>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
};

export default Booking;
