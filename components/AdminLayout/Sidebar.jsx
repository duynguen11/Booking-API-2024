import { useRouter } from "next/router";
import React, { useMemo, useCallback } from "react";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();

  const handleItemClick = useCallback(
    (path) => {
      router.push(path);
    },
    [router]
  );

  const activeItem = useMemo(() => router.pathname, [router.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    //Xoa token
    router.push("/admin/login");
  };

  return (
    <div id="sidebar" className="d-flex flex-column justify-content-between">
      <ul className="side-menu">
        <li>
          <Link
            href="/admin"
            className={activeItem === "/admin" ? "active" : ""}
          >
            <i className="fas fa-house-user"></i>
            <span className="nav-item">Dashboard</span>
          </Link>
        </li>
        <hr />
        <li>
          <Link
            href="/admin/chude"
            className={activeItem === "/admin/chude" ? "active" : ""}
          >
            <i className="fa-solid fa-list"></i>
            <span className="nav-item">Quản lý danh mục</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/tour"
            className={activeItem === "/admin/tour" ? "active" : ""}
          >
            <i className="fa-solid fa-route"></i>
            Danh sách tour
            <i className="fa-solid"></i>
          </Link>
        </li>
        <li className="dropdown">
          <Link
            href="#"
            className="dropbtn d-flex justify-content-between align-items-center"
          >
            <div>
              <i className="fa-regular fa-user"></i>
              <span className="nav-item">Tài khoản</span>
            </div>
            <i className="fa-solid fa-angle-right"></i>
          </Link>
          <div className="dropdown-content">
            <Link href="/admin/employee">Tài khoản nhân viên</Link>
            <Link href="/admin/customer">Tài khoản khách hàng</Link>
          </div>
        </li>
        <hr />
        <li>
          <Link
            href="/admin/donhang"
            className={activeItem === "/admin/donhang" ? "active" : ""}
          >
            <i className="fa-solid fa-file-invoice"></i>Đơn hàng
          </Link>
        </li>
        <li>
          <Link
            href="/admin/hopthu"
            className={activeItem === "/admin/hopthu" ? "active" : ""}
          >
            <i className="fa-solid fa-inbox"></i>Hộp thư
          </Link>
        </li>
        <hr />
        <li>
          <Link href="#">
            <i className="fas fa-cog"></i>
            <span className="nav-item">Cài đặt</span>
          </Link>
        </li>
        <li>
          <Link href="#">
            <i className="fa-regular fa-circle-question"></i>
            <span className="nav-item">Giúp đỡ</span>
          </Link>
        </li>
      </ul>
      <div className="p-2">
        <button
          onClick={handleLogout}
          href="/admin/login"
          className="d-flex align-items-center btn btn-danger w-100"
        >
          <i className="fas fa-sign-out-alt me-2"></i>
          <span style={{ fontSize: ".9rem" }} className="nav-item">
            Đăng xuất
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
