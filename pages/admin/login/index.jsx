import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const [inputErrors, setInputErrors] = useState({});
  const [formData, setFormData] = useState({
    TaiKhoan: "",
    MatKhau: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setInputErrors({ ...inputErrors, [name]: "" });
  };

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.TaiKhoan || !formData.MatKhau) {
      setInputErrors({
        TaiKhoan: !formData.TaiKhoan ? "Vui lòng điền tài khoản" : "",
        MatKhau: !formData.MatKhau ? "Vui lòng điền mật khẩu" : "",
      });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:2024/api/account/login",
        formData
      );
      if (response.status === 200) {
        // Trích xuất role từ phản hồi
        const role = response.data.role;
        // Kiểm tra role và chuyển hướng người dùng đến trang tương ứng
        if (role === "admin") {
          router.push("/admin");
        } else if (role === "nhanvien") {
          router.push("/employee");
        } else {
          router.push("/dashboard");
        }
      } else if (response.status === 401) {
        console.error("Unauthorized access:", response.data.error);
        alert("Thông tin đăng nhập không chính xác.");
      } else {
        console.error("Login failed:", response.data.error);
        alert("Đăng nhập không thành công !");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="form_container">
      <div id="login_form" className="p-5 rounded-3 shadow">
        <h3 className="text-center mb-4">VUI LÒNG ĐĂNG NHẬP</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2" controlId="username">
            <Form.Label>Tên đăng nhập:</Form.Label>
            <Form.Control
              className={`text-secondary ${
                inputErrors.TaiKhoan ? "is-invalid" : ""
              }`}
              type="text"
              name="TaiKhoan"
              value={formData.TaiKhoan}
              onChange={handleInputChange}
              placeholder="Nhập tên đăng nhập"
            />
            {inputErrors.TaiKhoan && (
              <div className="invalid-feedback">{inputErrors.TaiKhoan}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Mật khẩu:</Form.Label>
            <Form.Control
              className={`text-secondary ${
                inputErrors.MatKhau ? "is-invalid" : ""
              }`}
              type="password"
              name="MatKhau"
              value={formData.MatKhau}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
            />
            {inputErrors.MatKhau && (
              <div className="invalid-feedback">{inputErrors.MatKhau}</div>
            )}
          </Form.Group>

          <Button className="w-100 mt-3 p-3" variant="primary" type="submit">
            ĐĂNG NHẬP
          </Button>
        </Form>{" "}
      </div>
    </div>
  );
};

export default LoginForm;
