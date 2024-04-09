import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="header-admin">
      <div className="logo">
        <Link className="fw-bold" href="/admin">
          HỆ THỐNG QUẢN LÝ ADMIN
        </Link>
      </div>
    </div>
  );
};

export default Header;
