import { useRouter } from "next/router";
import React, { useMemo, useCallback } from "react";

const Sidebar = () => {
  const router = useRouter();
  const handleItemClick = useCallback(
    (path) => {
      router.push(path);
    },
    [router]
  );

  const activeItem = useMemo(() => router.pathname, [router.pathname]);

  return (
    <div id="sidebar" className="d-flex flex-column justify-content-between">
      <ul className="side-menu">
        <li>
          <a href="/admin" className={activeItem === "/admin" ? "active" : ""}>
            <i className="fas fa-house-user"></i>
            <span className="nav-item">Dashboard</span>
          </a>
        </li><hr />
        <li>
          <a
            href="/admin/chude"
            className={activeItem === "/admin/chude" ? "active" : ""}
          >
            <i className="fa-solid fa-list"></i>
            <span className="nav-item">Quản lý danh mục</span>
          </a>
        </li>
        <li>
          <a
            href="/admin/tour"
            className={activeItem === "/admin/tour" ? "active" : ""}
          >
            <i className="fa-solid fa-route"></i>
            Danh sách tour
            <i className="fa-solid"></i>
          </a>
        </li>
        <li><a href="/admin/donhang" className={activeItem === "/admin/donhang" ? "active" : ""}><i className="fa-solid fa-file-invoice"></i>Đơn hàng</a></li>
        <hr />
        <li className="dropdown">
          <a
            href="#"
            className="dropbtn d-flex justify-content-between align-items-center"
          >
            <div>
              <i className="fa-regular fa-user"></i>
              <span className="nav-item">Tài khoản</span>
            </div>
            <i className="fa-solid fa-angle-right"></i>
          </a>
          <div className="dropdown-content">
            <a href="/admin/employee">Tài khoản nhân viên</a>
            <a href="/admin/customer">Tài khoản khách hàng</a>
          </div>
        </li>
        <li><a href="/admin/hopthu" className={activeItem === "/admin/hopthu" ? "active" : ""}><i className="fa-solid fa-inbox"></i>Hộp thư</a></li>
        <hr />
        <li>
          <a href="#">
            <i className="fas fa-cog"></i>
            <span className="nav-item">Cài đặt</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa-regular fa-circle-question"></i>
            <span className="nav-item">Giúp đỡ</span>
          </a>
        </li>
      </ul>
      <div className="p-2">
        <a
          href="/admin/login"
          className="d-flex align-items-center btn btn-danger w-100"
        >
          <i className="fas fa-sign-out-alt me-2"></i>
          <span style={{ fontSize: ".9rem" }} className="nav-item">
            Đăng xuất
          </span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
