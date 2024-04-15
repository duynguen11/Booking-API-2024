import React, { useEffect, useState } from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleLinks = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    // Lấy token từ local storage sau khi đăng nhập
    const token = localStorage.getItem("token");
    // Kiểm tra xem token có tồn tại hay không
    if (token) {
      // Giải mã token
      const decodedToken = jwtDecode(token);
      // Lưu thông tin từ token vào trạng thái
      setUserInfo(decodedToken);
      console.log("Dữ liệu token encode:", decodedToken);
    }
  }, []);

  return (
    <div className="header-admin d-flex justify-content-between">
      <div className="logo">
        <Link className="fw-bold" href="/admin">
          HỆ THỐNG QUẢN LÝ ADMIN
        </Link>
      </div>
      {userInfo && userInfo.role === "nhanvien" && (
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0 me-3">Mã nhân viên: {userInfo.userId}</p>
          <p className="m-0 me-3">
            Xin chào! <span className="text-danger">{userInfo.userName}</span>
          </p>
          <a className="btn btn-secondary me-3" href="">
            <i className="fa-solid fa-layer-group me-2"></i>Tour tham gia
          </a>
          <button
            className="btn btn-outline-secondary"
            href=""
            onClick={handleToggleLinks}
          >
            <i className="fa-solid fa-list"></i>
          </button>
        </div>
      )}
      {showDropdown && (
        <div className="links-container border rounded p-1 me-4">
          <a href="/admin/employee_info">
            <i className="fa fa-user me-2"></i>Thông tin tài khoản
          </a>
          <a href="">
            <i className="fa-solid fa-layer-group me-2"></i>Tour tham gia
          </a>
          <a href="">
            <i class="fa-solid fa-clock-rotate-left me-2"></i>Lịch sử tour
          </a>
        </div>
      )}
    </div>
  );
};

export default Header;
