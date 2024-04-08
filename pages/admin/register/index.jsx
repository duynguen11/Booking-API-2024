import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [inputErrors, setInputErrors] = useState({});
  const [userData, setUserData] = useState({
    TaiKhoan: "",
    MatKhau: "",
    XacNhanMatKhau: "",
    PhanLoaiTK: "", // Default to 'Admin'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setInputErrors({ ...inputErrors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !userData.TaiKhoan ||
      !userData.MatKhau ||
      !userData.XacNhanMatKhau ||
      !userData.PhanLoaiTK
    ) {
      setInputErrors({
        TaiKhoan: !userData.TaiKhoan ? "Vui lòng điền tài khoản" : "",
        MatKhau: !userData.MatKhau ? "Vui lòng điền mật khẩu" : "",
        XacNhanMatKhau: !userData.XacNhanMatKhau
          ? "Vui lòng xác nhận mật khẩu"
          : "",
        PhanLoaiTK: !userData.PhanLoaiTK
          ? "Vui lòng chọn phân loại tài khoản"
          : "",
      });
      return;
    }

    // Nếu mật khẩu và xác nhận mật khẩu trùng khớp, tiếp tục gọi hàm registerUser
    if (userData.MatKhau !== userData.XacNhanMatKhau) {
      setInputErrors({
        XacNhanMatKhau: "Xác nhận mật khẩu không trùng khớp",
      });
      return;
    }

    // Nếu các trường đều đã được điền đầy đủ và mật khẩu và xác nhận mật khẩu trùng khớp, tiếp tục gọi hàm registerUser
    registerUser(userData);
  };

  const router = useRouter();
  const registerUser = async (userData) => {
    try {
      const response = await fetch(
        "http://localhost:2024/api/account/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Error registering user");
      }
      router.push("/admin/login");
      const data = await response.json();
      console.log("User registered successfully:", data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="register_container">
      <div id="register_form" className="p-5 rounded-3 shadow">
        <h3 className="text-center mb-4">ĐĂNG KÝ TÀI KHOẢN</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Tên đăng nhập:</Form.Label>
            <Form.Control
              className={`text-secondary ${
                inputErrors.TaiKhoan ? "is-invalid" : ""
              }`}
              type="text"
              name="TaiKhoan"
              placeholder="Nhập tên đăng nhập"
              value={userData.TaiKhoan}
              onChange={handleChange}
            />
            {inputErrors.TaiKhoan && (
              <div className="text-danger">{inputErrors.TaiKhoan}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Mật khẩu:</Form.Label>
            <Form.Control
              className={`text-secondary ${
                inputErrors.MatKhau ? "is-invalid" : ""
              }`}
              type="password"
              name="MatKhau"
              placeholder="Nhập mật khẩu"
              value={userData.MatKhau}
              onChange={handleChange}
            />
            {inputErrors.MatKhau && (
              <div className="text-danger">{inputErrors.MatKhau}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Xác nhận mật khẩu:</Form.Label>
            <Form.Control
              className={`text-secondary ${
                inputErrors.MatKhau ? "is-invalid" : ""
              }`}
              type="password"
              name="XacNhanMatKhau"
              placeholder="Nhập lại mật khẩu"
              value={userData.XacNhanMatKhau}
              onChange={handleChange}
            />
            {inputErrors.XacNhanMatKhau && (
              <div className="text-danger">{inputErrors.XacNhanMatKhau}</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Chọn phân hệ:</Form.Label>
            <Form.Select
              name="PhanLoaiTK"
              value={userData.PhanLoaiTK}
              onChange={handleChange}
              className={`text-secondary ${
                inputErrors.PhanLoaiTK ? "is-invalid" : ""
              }`}
            >
              <option value="">-- Chọn phân hệ --</option>
              <option value="1">Admin</option>
              <option value="2">Nhân viên</option>
            </Form.Select>
            {inputErrors.PhanLoaiTK && (
              <div className="invalid-feedback">{inputErrors.PhanLoaiTK}</div>
            )}
          </Form.Group>
          <p>
            Have already an account?
            <a href="/admin/login">
              <span className="text-primary"> LOGIN HERE</span>
            </a>
          </p>

          <Button className="w-100 mt-3 p-3" variant="success" type="submit">
            XÁC NHẬN ĐĂNG KÝ
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
