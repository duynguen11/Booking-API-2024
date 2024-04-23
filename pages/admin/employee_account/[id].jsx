import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import Employee_info from "../employee_info";

const Employee_account = () => {
  const router = useRouter();
  const { id } = router.query;
  const [hisJoinning, setHisJoinning] = useState([]);

  const [infoEmployee, setInfoEmployee] = useState({
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

  useEffect(() => {
    try {
      const fetchHistory = async () => {
        console.log("ID HDV", id);
        const response = await axios.post(
          `http://localhost:2024/api/chitietdattour/historyJoinning`,
          {
            MaTaikhoan_HDV: id,
          }
        );
        console.log("Dữ liệu history", response.data);
        setHisJoinning(response.data);
      };
      fetchHistory();
    } catch (err) {
      console.error("Error fetching history !", err);
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Kiểm tra xem có id không
        if (id) {
          const apiUrl = `http://localhost:2024/api/account/info-employee/${id}`;
          // Gửi yêu cầu GET với token trong tiêu đề Authorization
          const response = await axios.get(apiUrl);
          const result = response.data;
          setInfoEmployee((prevInfoCustomer) => ({
            ...prevInfoCustomer,
            Avatar_url: result.data[0].Avatar_URL,
            MaTaikhoan: result.data[0].MaTaikhoan,
            TaiKhoan: result.data[0].TaiKhoan,
            MatKhau: result.data[0].MatKhau,
            Email: result.data[0].Email,
            HoTen: result.data[0].HoTen,
            NgaySinh: result.data[0].NgaySinh,
            GioiTinh: result.data[0].GioiTinh,
            DiaChi: result.data[0].DiaChi,
          }));
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChangePassword = (e) => {
    setInfoEmployee({
      ...infoEmployee,
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
          matKhauMoi: infoEmployee.MatKhau, // Truyền mật khẩu mới vào body của yêu cầu
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
        <h4 className="fw-bolder">THÔNG TIN NHÂN VIÊN</h4>
        <div className="row">
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <Image
              width={"200"}
              height={"200"}
              className="rounded"
              style={{ width: "200px", height: "200px" }}
              src={
                infoEmployee.Avatar_url
                  ? `http://localhost:2024/${infoEmployee.Avatar_url}`
                  : "/avatars/avatar_default.jpg"
              }
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
                  value={infoEmployee.TaiKhoan}
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
                  value={infoEmployee.MatKhau}
                  onChange={handleChangePassword}
                />
                <button
                  className="btn btn-success w-100 mt-1"
                  onClick={() => handleSubmit(infoEmployee.MaTaikhoan)}
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
                  value={infoEmployee.Email}
                  disabled
                />
              </div>
              <div className="ms-3">
                <label htmlFor="HoTen">Họ Tên</label>
                <input
                  className="form-control"
                  type="text"
                  name="HoTen"
                  value={infoEmployee.HoTen}
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
                  value={formatDate(infoEmployee.NgaySinh)}
                  disabled
                />
              </div>
              <div className="ms-3">
                <label htmlFor="GioiTinh">Giới Tính</label>
                <input
                  className="form-control"
                  type="text"
                  name="GioiTinh"
                  value={infoEmployee.GioiTinh}
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
                value={infoEmployee.DiaChi}
                disabled
              />
            </div>
          </div>
        </div>
        <h4 className="mt-5 fw-bolder">LỊCH SỬ HOẠT ĐỘNG</h4>
        <div className="table-responsive mt-3">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Mã tour</th>
                <th>Tour </th>
                <th>Khách hàng</th>
                <th>Liên hệ</th>
                <th>Số khách nhận</th>
                <th>Thời gian tham gia</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {hisJoinning.map((item) => (
                <tr key={item.MaTour}>
                  <td>{item.MaTour}</td>
                  <td>
                    <Image
                      width={100}
                      height={100}
                      className="rounded"
                      src={`http://localhost:2024/${item.URL}`}
                      alt="image avatar"
                    />
                  </td>
                  <td>{item.HoTen}</td>
                  <td>{item.LienHe}</td>
                  <td>{item.SoCho} khách</td>
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

export default Employee_account;
