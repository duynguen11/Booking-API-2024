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
      console.log("Dữ liệu giải mã token:", decodedToken);
      // Lưu thông tin từ token vào trạng thái
      setUserInfo(decodedToken);
    }
  }, []);
  return (
    <div className="header-admin d-flex justify-content-between">
      <div className="logo">
        <Link className="fw-bold" href="/admin">
          HỆ THỐNG QUẢN LÝ ADMIN
        </Link>
      </div>
      {userInfo && (
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0 me-3">Mã nhân viên: {userInfo.userId}</p>
          <p className="m-0 me-3">
            Xin chào! <span className="text-danger">{userInfo.userName}</span>
          </p>
          <a className="btn btn-secondary me-3" href="">
            Tour tham gia
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
        <div className="links-container border rounded p-2 me-4">
          <a href="">Thông tin tài khoản</a>
          <a href="">Tour tham gia</a>
          <a href="">Lịch sử tour</a>
        </div>
      )}
    </div>
  );
};

export default Header;
