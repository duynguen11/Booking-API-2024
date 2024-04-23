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
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import Link from "next/link";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
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
    const token = localStorage.getItem("token");
    // Kiểm tra xem token có tồn tại hay không
    if (token) {
      // Gửi yêu cầu Axios với token trong header
      axios
        .get("http://localhost:2024/api/account/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Danh sách nhân viên:", response.data);
          setEmployees(response.data);
          setDataLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("Token không tồn tại");
    }
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
          <h4 className="fw-bold">QUẢN LÝ NHÂN VIÊN</h4>
          {dataLoaded && ( // Kiểm tra nếu dữ liệu đã được tải
            <div
              className="d-flex align-items-center btn btn-success"
              onClick={handleShowModal}
            >
              <i className="fa-solid fa-square-plus me-2"></i>
              <a className="text-decoration-none text-white">Thêm tài khoản</a>
            </div>
          )}
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div className="d-flex align-items-center">
            <input
              placeholder="Tìm kiếm ..."
              id="search-input-item"
              className=" form-control me-1"
              type="text"
            />
            <button className="btn btn-primary">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div>
            <i className="fa-solid fa-filter me-1"></i>
            <span className="fw-bolder">Xắp sếp</span>
            <select className="ms-3">
              <option value="newItem">Ngày gần đây</option>
              <option value="lowToHigh">Giá thấp đến cao</option>
              <option value="highToLow">Giá cao đến thấp</option>
              <option value="highToLow">A - Z</option>
            </select>
          </div>
        </div>
        <Row xs={1} md={2} lg={3} className="g-4 mt-1">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <Col key={employee.MaTaikhoan} className="text-center">
                <Card>
                  <Card.Body>
                    <div>
                      <Image
                        className="rounded"
                        width={200}
                        height={200}
                        src={
                          employee.Avatar_URL
                            ? `http://localhost:2024/${employee.Avatar_URL}`
                            : "/avatars/avatar_default.jpg"
                        }
                        alt="employee-avatar"
                      />
                    </div>
                    <hr />
                    <Card.Text className="mt-2">
                      <strong>Tài khoản:</strong> {employee.TaiKhoan}
                    </Card.Text>
                    <Card.Text className="m-0">
                      <strong>Họ tên:</strong> {employee.HoTen}
                    </Card.Text>
                    <Card.Text className="m-0">
                      <strong>Liên hệ:</strong> {employee.LienHe}
                    </Card.Text>
                    <div className="d-flex flex-column mt-2">
                      <Link
                        href={`/admin/employee_account/${employee.MaTaikhoan}`}
                        className="btn btn-secondary mb-2"
                      >
                        Xem thông tin
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDeleteAccount(employee.MaTaikhoan);
                        }}
                      >
                        Khóa tài khoản
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-danger">KHÔNG THỂ LẤY DỮ LIỆU NHÂN VIÊN</div>
          )}
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
