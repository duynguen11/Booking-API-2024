import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { format } from "date-fns";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import Link from "next/link";

const Customer = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2024/api/account/users")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteAccount = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token không tồn tại");
        return;
      }

      const response = await axios.delete(
        `http://localhost:2024/api/account/lockAccount/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong tiêu đề Authorization
          },
        }
      );
      if (response.status === 200) {
        alert("Tai khoan da vo hieu hoa !");
        router.reload();
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert("Bạn không được cấp quyền thao tác!");
      } else {
        console.error("Error logging in:", err);
      }
    }
  };

  return (
    <>
      <AdminLayout />
      <div className="main-body">
        <h4 className="fw-bolder">QUẢN LÝ THÀNH VIÊN</h4>
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
        <div className="mt-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Tài khoản</th>
                <th>Email</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Liên hệ</th>
                <th>Địa chỉ</th>
                <th>Tùy chỉnh</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.MaTaikhoan}>
                  <td>{user.TaiKhoan}</td>
                  <td>{user.Email}</td>
                  <td>{user.HoTen}</td>
                  <td>{format(new Date(user.NgaySinh), "dd/MM/yyyy")}</td>
                  <td>{user.GioiTinh}</td>
                  <td>{user.LienHe}</td>
                  <td>{user.DiaChi}</td>
                  <td>
                    <Link
                      href={`/admin/customer_info/${user.MaTaikhoan}`}
                      className="btn btn-secondary me-1"
                    >
                      <i class="fa-regular fa-id-card"></i>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDeleteAccount(user.MaTaikhoan);
                      }}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Customer;
