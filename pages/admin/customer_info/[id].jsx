import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const CustomerInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [hisBooking, setHisBooking] = useState([]);
  const [infoCustomer, setInfoCustomer] = useState({
    MaTaikhoan: "",
    TaiKhoan: "",
    MatKhau: "",
    Email: "",
    HoTen: "",
    GioiTinh: "",
    NgaySinh: "",
    DiaChi: "",
    Avatar_url: "",
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

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
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    // Kiểm tra xem có token hay không và có id không
    if (token && id) {
      const apiUrl = `http://localhost:2024/api/account/info-khachhang/${id}`;

      // Gửi yêu cầu GET với token trong tiêu đề Authorization
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          setInfoCustomer((prevInfoCustomer) => ({
            ...prevInfoCustomer,
            Avatar_url: result.data.userInfo.Avatar_URL,
            MaTaikhoan: result.data.userInfo.MaTaikhoan,
            TaiKhoan: result.data.userInfo.TaiKhoan,
            MatKhau: result.data.userInfo.MatKhau,
            Email: result.data.userInfo.Email,
            HoTen: result.data.userInfo.HoTen,
            NgaySinh: result.data.userInfo.NgaySinh,
            GioiTinh: result.data.userInfo.GioiTinh,
            DiaChi: result.data.userInfo.DiaChi,
          }));
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  useEffect(() => {
    try {
      const fetchHistory = async () => {
        const response = await axios.post(
          `http://localhost:2024/api/chitietdattour/historyBooking`,
          {
            MaTaikhoan_KH: id,
          }
        );
        console.log("Dữ liệu history", response.data);
        setHisBooking(response.data);
      };
      fetchHistory();
    } catch (err) {
      console.error("Error fetching history !", err);
    }
  }, [id]);

  const handleChangePassword = (e) => {
    setInfoCustomer({
      ...infoCustomer,
      MatKhau: e.target.value,
    });
  };

  const handleSubmit = async (maTaikhoan) => {
    try {
      // Gọi API để lưu mật khẩu mới và mã tài khoản
      const response = await axios.post(
        "http://localhost:2024/api/account/khachhang/update-password",
        {
          maTaikhoan: maTaikhoan, // Truyền mã tài khoản vào body của yêu cầu
          matKhauMoi: infoCustomer.MatKhau, // Truyền mật khẩu mới vào body của yêu cầu
        }
      );
      // Xử lý kết quả từ API nếu cần
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      // Xử lý lỗi nếu có
    }
  };

  return (
    <>
      <AdminLayout />
      <div className="main-body">
        <h4 className="fw-bolder">THÔNG TIN THÀNH VIÊN</h4>
        <div className="row">
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <Image
              width={200}
              height={200}
              className="rounded"
              src={`http://localhost:2024/${infoCustomer.Avatar_url}`}
              alt="image avatar"
            />
          </div>
          <div className="col-md-8">
            <div className="d-flex">
              <div>
                <label htmlFor="TaiKhoan">Tài Khoản</label>
                <input
                  className="form-control"
                  type="text"
                  name="TaiKhoan"
                  value={infoCustomer.TaiKhoan}
                  disabled
                />
              </div>
              <div className="ms-3">
                {infoCustomer.MatKhau ? (
                  <>
                    <label htmlFor="MatKhau">
                      Mật khẩu{" "}
                      <span className="text-danger">(Có thể cập nhật)</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="MatKhau"
                      value={infoCustomer.MatKhau}
                      onChange={handleChangePassword}
                    />
                    <button
                      className="btn btn-success w-100 mt-1"
                      onClick={() => handleSubmit(infoCustomer.MaTaikhoan)}
                    >
                      Lưu thay đổi
                    </button>
                  </>
                ) : null}
              </div>
            </div>
            <br />
            <div className="d-flex">
              <div>
                <label htmlFor="Email">Email</label>
                <input
                  className="form-control"
                  type="text"
                  name="Email"
                  value={infoCustomer.Email}
                  disabled
                />
              </div>
              <div className="ms-3">
                <label htmlFor="HoTen">Họ Tên</label>
                <input
                  className="form-control"
                  type="text"
                  name="HoTen"
                  value={infoCustomer.HoTen}
                  disabled
                />
              </div>
            </div>
            <br />
            <div className="d-flex">
              <div>
                <label htmlFor="NgaySinh">Ngày Sinh</label>
                <input
                  className="form-control"
                  type="text"
                  name="NgaySinh"
                  value={formatDate(infoCustomer.NgaySinh)}
                  disabled
                />
              </div>
              <div className="ms-3">
                <label htmlFor="GioiTinh">Giới Tính</label>
                <input
                  className="form-control"
                  type="text"
                  name="GioiTinh"
                  value={infoCustomer.GioiTinh}
                  disabled
                />
              </div>
            </div>
            <br />
            <div>
              <label htmlFor="DiaChi">Địa Chỉ</label>
              <input
                className="form-control w-75"
                type="text"
                name="DiaChi"
                value={infoCustomer.DiaChi}
                disabled
              />
            </div>
          </div>
        </div>
        <h4 className="mt-5 fw-bolder">LỊCH SỬ THANH TOÁN</h4>
        <div className="table-responsive mt-3">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Mã đặt tour</th>
                <th>Số vé</th>
                <th>Tổng thanh toán</th>
                <th>Phương thức thanh toán</th>
                <th>Thời gian đặt</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {hisBooking.map((item) => (
                <tr key={item.MaDatTour}>
                  <td>{item.MaDatTour}</td>
                  <td>{item.SoCho}</td>
                  <td>{formatCurrency(item.TongGia)} VND</td>
                  <td>{item.ThanhToan}</td>
                  <td>{formatDateTime(item.ThoiGianDat)}</td>
                  <td>{item.TrangThai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerInfo;
