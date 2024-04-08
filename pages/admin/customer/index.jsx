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
      const response = await axios.delete(
        `http://localhost:2024/api/account/lockAccount/${id}`
      );
      if (response.status === 200) {
        router.reload();
      }
    } catch (err) {
      console.error("Đã có lỗi xảy ra khi xóa tài khoản:", err);
    }
  };

  return (
    <>
      <AdminLayout />
      <div className="main-body">
        <h4 className="fw-bold">Quản lý thành viên</h4>
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
                    <Link href={`/admin/customer_info/${user.MaTaikhoan}`} className="btn btn-secondary me-1">
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
