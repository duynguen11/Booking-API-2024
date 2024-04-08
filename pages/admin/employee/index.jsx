import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Modal,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { useRouter } from "next/router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const [userData, setUserData] = useState({
    TaiKhoan: "",
    MatKhau: "",
    XacNhanMatKhau: "",
    PhanLoaiTK: "nhanvien", // Default to 'Admin'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setInputErrors({ ...inputErrors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.TaiKhoan || !userData.MatKhau || !userData.XacNhanMatKhau) {
      setInputErrors({
        TaiKhoan: !userData.TaiKhoan ? "Vui lòng điền tài khoản" : "",
        MatKhau: !userData.MatKhau ? "Vui lòng điền mật khẩu" : "",
        XacNhanMatKhau: !userData.XacNhanMatKhau
          ? "Vui lòng xác nhận mật khẩu"
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

    registerUser(userData);
  };

  useEffect(() => {
    axios
      .get("http://localhost:2024/api/account/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const router = useRouter();
  const registerUser = async (userData) => {
    try {
      const response = await fetch(
        "http://localhost:2024/api/account/add-account",
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
      router.reload();
      const data = await response.json();
      console.log("User registered successfully:", userData);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

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
        <div className="d-flex align-items-center justify-content-between">
          <h4 className="fw-bold">Quản lý nhân viên</h4>
          <div
            className="d-flex align-items-center btn btn-secondary"
            onClick={handleShowModal}
          >
            <i className="fa-solid fa-square-plus me-2"></i>
            <a className="text-decoration-none text-white">Thêm tài khoản</a>
          </div>
        </div>
        <Row xs={1} md={2} lg={3} className="g-4 mt-1">
          {employees.map((employee) => (
            <Col key={employee.MaTaikhoan}>
              <Card>
                <Card.Body>
                  <Card.Text>
                    <strong>Tài khoản:</strong> {employee.TaiKhoan}
                  </Card.Text>
                  <Card.Text>
                    <strong>Họ tên:</strong> {employee.HoTen}
                  </Card.Text>
                  <Card.Text>
                    <strong>Liên hệ:</strong> {employee.LienHe}
                  </Card.Text>
                  <div className="d-flex flex-column">
                    <button className="btn btn-secondary mb-2">
                      Xem thông tin
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {handleDeleteAccount(employee.MaTaikhoan)}}
                    >
                      Khóa tài khoản
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Modal className="mt-5" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo tài khoản nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Tên đăng nhập:</Form.Label>
              <Form.Control
                className={`text-secondary ${
                  inputErrors.TaiKhoan ? "is-invalid" : ""
                }`}
                type="text"
                placeholder="Nhập tài khoản"
                name="TaiKhoan"
                value={userData.TaiKhoan}
                onChange={handleChange}
              />
              {inputErrors.TaiKhoan && (
                <div className="text-danger">{inputErrors.TaiKhoan}</div>
              )}
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2" controlId="formBasicName">
              <Form.Label>Mật khẩu:</Form.Label>
              <Form.Control
                className={`text-secondary ${
                  inputErrors.MatKhau ? "is-invalid" : ""
                }`}
                type="text"
                placeholder="Nhập mật khẩu"
                name="MatKhau"
                value={userData.MatKhau}
                onChange={handleChange}
              />
              {inputErrors.MatKhau && (
                <div className="text-danger">{inputErrors.MatKhau}</div>
              )}
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2" controlId="formBasicName">
              <Form.Label>Xác nhận mật khẩu:</Form.Label>
              <Form.Control
                className={`text-secondary ${
                  inputErrors.MatKhau ? "is-invalid" : ""
                }`}
                type="text"
                placeholder="Nhập mật khẩu"
                name="XacNhanMatKhau"
                value={userData.XacNhanMatKhau}
                onChange={handleChange}
              />
              {inputErrors.XacNhanMatKhau && (
                <div className="text-danger">{inputErrors.XacNhanMatKhau}</div>
              )}
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Thoát
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Employee;
