import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from 'next/image';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const CustomerInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [infoCustomer, setInfoCustomer] = useState({
    MaTaikhoan:'',
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

  useEffect(() => {
    if (id) {
      const apiUrl = `http://localhost:2024/api/account/info-khachhang/${id}`;
      axios
        .get(apiUrl)
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

  const handleChangePassword = (e) => {
    setInfoCustomer({
      ...infoCustomer,
      MatKhau: e.target.value,
    });
  };

  const handleSubmit = async (maTaikhoan) => {
    try {
      // Gọi API để lưu mật khẩu mới và mã tài khoản
      const response = await axios.post('http://localhost:2024/api/account/khachhang/update-password', {
        maTaikhoan: maTaikhoan, // Truyền mã tài khoản vào body của yêu cầu
        matKhauMoi: infoCustomer.MatKhau // Truyền mật khẩu mới vào body của yêu cầu
      });
      console.log('Response từ API:', response.data);
      // Xử lý kết quả từ API nếu cần
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error);
      // Xử lý lỗi nếu có
    }
  };

  return (
    <>
      <AdminLayout />
      <div className="main-body">
        <h4 className="fw-bolder">Thông tin thành viên</h4>
        <div className="row">
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <Image
            className="rounded"
              style={{ width: "200px", height: "200px" }}
              src={`http://localhost:2024/avatars/${infoCustomer.Avatar_url}`}
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
        <h4 className="mt-5 fw-bolder">Lịch sử thanh toán</h4>
      </div>
    </>
  );
};

export default CustomerInfo;
