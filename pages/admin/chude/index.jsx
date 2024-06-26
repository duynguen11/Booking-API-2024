import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
const ChuDe = () => {
  const [category, setCategory] = useState([]);
  const [categoryCode, setCategoryCode] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showPermissionDeniedModal, setShowPermissionDeniedModal] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get("https://api-bookingnodejs.onrender.com/api/chude");
        const response = await axios.get("http://localhost:2024/api/chude");
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const router = useRouter();
  const handleSave = async () => {
    const errors = {};
    if (!categoryCode) {
      errors.categoryCode = "Mã danh mục không được để trống !";
    }
    if (!categoryName) {
      errors.categoryName = "Tên danh mục không được để trống !";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post(
        //"https://api-bookingnodejs.onrender.com/api/chude/create",
        "http://localhost:2024/api/chude/create",
        {
          MaChuDe: categoryCode,
          TenChuDe: categoryName,
          ThongTinChuDe: description,
        }
      );
      if (response.data) {
        router.reload();
      } else {
        console.error(response.data.error || "Có lỗi xảy ra khi tạo chủ đề");
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Lấy token từ Local Storage
      const token = localStorage.getItem("token");
      // Kiểm tra xem token có tồn tại hay không
      if (!token) {
        // Xử lý khi không có token
        console.error("Token không tồn tại");
        return;
      }

      const response = await axios.delete(
        `http://localhost:2024/api/chude/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong tiêu đề Authorization
          },
        }
      );
      if (response.status === 200) {
        router.reload();
      } else {
        alert(response.data.error || "Có lỗi xảy ra khi xóa chủ đề");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Lỗi 403 - Forbidden, không có quyền truy cập
        setShowPermissionDeniedModal(true);
      } else {
        // Xử lý các lỗi khác
        setAlertMessage("Có dữ liệu tour, không được xóa chủ đề này !");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    }
  };

  const handleCloseDeleteModal = () => setDeleteModalVisible(false);

  const handleConfirmDelete = () => {
    setDeleteModalVisible(false);
    if (deleteId) {
      handleDelete(deleteId);
    }
  };

  return (
    <>
      <AdminLayout />
      <div className="main-body">
        <div className="d-flex align-items-center justify-content-between">
          {showPermissionDeniedModal && (
            <Modal
            className="mt-5"
              show={showPermissionDeniedModal}
              onHide={() => setShowPermissionDeniedModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>HỆ THỐNG PHẢN HỒI</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center d-flex flex-column align-items-center">
                <div
                  style={{ width: "fit-content" }}
                  className="bg-light p-4 rounded mb-3"
                >
                  <i
                    style={{ fontSize: "50px" }}
                    className="fa-solid fa-user-lock"
                  ></i>
                </div>
                <span className="fw-bolder text-danger">
                  KHÔNG ĐƯỢC CẤP QUYỀN THAO TÁC !
                </span>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          )}
          <h4 className="fw-bold">QUẢN LÝ DANH MỤC</h4>
          <div
            className="d-flex align-items-center btn btn-success"
            onClick={handleShowModal}
          >
            <i className="fa-solid fa-square-plus me-2"></i>
            <a className="text-decoration-none text-white">Thêm danh mục</a>
          </div>
        </div>
        <Alert
          className="mt-2 mb-0"
          variant="danger"
          show={showAlert}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
        <Table style={{ fontSize: "14px" }} className="mt-3" responsive striped>
          <thead>
            <tr>
              <th>Mã chủ đề</th>
              <th>Tên chủ đề</th>
              <th>Mô tả</th>
              <th>Tùy chỉnh</th>
            </tr>
          </thead>
          <tbody>
            {category.map((item, index) => (
              <tr key={index}>
                <td style={{ paddingLeft: "30px" }}>{item.MaChuDe}</td>
                <td>{item.TenChuDe}</td>
                <td>{item.ThongTinChuDe}</td>
                <td className="d-flex">
                  <Link
                    className="btn btn-secondary me-1"
                    href={`/admin/editchude/${item.MaChuDe}`}
                  >
                    <i className="fa-solid fa-pen-to-square me-1"></i>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setDeleteModalVisible(true);
                      setDeleteId(item.MaChuDe);
                    }}
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal
          className="mt-5"
          show={deleteModalVisible}
          onHide={handleCloseDeleteModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn xóa?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Hủy
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal className="mt-5" show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Tạo danh mục mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Mã danh mục:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập mã danh mục"
                  value={categoryCode}
                  onChange={(e) => setCategoryCode(e.target.value)}
                  isInvalid={!!errors.categoryCode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.categoryCode}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicName">
                <Form.Label>Tên danh mục:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên danh mục"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  isInvalid={!!errors.categoryName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.categoryName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicDescription">
                <Form.Label>Mô tả:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Nhập mô tả"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Thoát
            </Button>
            <Button variant="success" onClick={handleSave}>
              Lưu
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ChuDe;
