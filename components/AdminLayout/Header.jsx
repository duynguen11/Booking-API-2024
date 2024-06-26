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
    }
  }, []);

  return (
    <div className="header-admin d-flex justify-content-between">
      <div className="logo">
        <Link className="fw-bold" href="/admin">
          HỆ THỐNG QUẢN LÝ <span className="text-primary">NEXTBOOKING</span>
        </Link>
      </div>
      {userInfo && userInfo.role === "admin" && (
        <div className="fw-bolder">
          Xin chào, <span className="text-danger">ADMIN</span>
        </div>
      )}
      {userInfo && userInfo.role === "nhanvien" && (
        <div className="d-flex justify-content-between align-items-center">
          <p className="m-0 me-3">Mã nhân viên: {userInfo.userId}</p>
          <p className="m-0 me-3">
            <span className="fw-bolder text-danger">{userInfo.userName}</span>
          </p>
          <Link
            className="btn btn-secondary me-3"
            href="/admin/employee_joining"
          >
            <i className="fa-solid fa-layer-group me-2"></i>Tour tham gia
          </Link>
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
          <Link href="/admin/employee_info">
            <i className="fa fa-user me-2"></i>Thông tin tài khoản
          </Link>
          <Link href="">
            <i className="fa-solid fa-layer-group me-2"></i>Tour tham gia
          </Link>
          <Link href="">
            <i class="fa-solid fa-clock-rotate-left me-2"></i>Lịch sử tour
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
