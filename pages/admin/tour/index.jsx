import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

export default function Tour() {
  const [tour, setTour] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showPermissionDeniedModal, setShowPermissionDeniedModal] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //"https://api-bookingnodejs.onrender.com/api/tour"
          "http://localhost:2024/api/tour"
        );

        console.log("Danh sách tour:", response.data);
        setTour(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const router = useRouter();
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
        //`https://api-bookingnodejs.onrender.com/api/tour/delete/${id}`
        `http://localhost:2024/api/tour/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong tiêu đề Authorization
          },
        }
      );
      if (response.data.status) {
        router.reload();
      } else {
        alert("Đang có dữ liệu tour. Không thể xóa !");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Lỗi 403 - Forbidden, không có quyền truy cập
        setShowPermissionDeniedModal(true);
      }
    }
  };

  const handleReload = () => {
    router.push("/admin/add_tour");
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
          <h4 className="fw-bold">QUẢN LÝ TOUR</h4>
          <div
            onClick={handleReload}
            className="d-flex align-items-center btn btn-success"
          >
            <i className="fa-solid fa-square-plus me-2"></i>
            <a className="text-decoration-none text-white">Thêm tour mới</a>
          </div>
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
        <Table style={{ fontSize: "14px" }} className="mt-2" responsive striped>
          <thead>
            <tr>
              <th>Ảnh tour</th>
              <th>Tên tour</th>
              <th>Giá tour</th>
              <th>Thời gian</th>
              <th>Ngày Giờ Khởi Hành</th>
              <th>Nơi tập trung</th>
              <th>Chỗ trống</th>
              <th>Phương tiện</th>
              <th>Danh mục</th>
              <th>Tùy chỉnh</th>
            </tr>
          </thead>
          <tbody>
            {tour.map((item, index) => (
              <tr key={index}>
                <td>
                  <Image
                    width={"60"}
                    height={"40"}
                    style={{ width: "60px" }}
                    //src={`https://api-bookingnodejs.onrender.com/${item.URL}`}
                    src={`http://localhost:2024/${item.URL}`}
                    alt="hinh anh tour"
                  />
                </td>
                <td>{item.TenTour}</td>
                <td>{item.GiaTour}</td>
                <td>{item.ThoiGian}</td>
                <td>
                  {`${new Date(item.NgayKhoiHanh).getDate()}/${
                    new Date(item.NgayKhoiHanh).getMonth() + 1
                  }/${new Date(item.NgayKhoiHanh).getFullYear()} ${new Date(
                    item.NgayKhoiHanh
                  ).getHours()}:${new Date(item.NgayKhoiHanh).getMinutes()}`}
                  h
                </td>
                <td>{item.NoiKhoiHanh}</td>
                <td>{item.SoCho}</td>
                <td>
                  {item.PhuongTien === "Xe khách"
                    ? "Xe khách"
                    : item.PhuongTien === "Tàu lửa"
                    ? "Tàu lửa"
                    : item.PhuongTien === "Máy bay"
                    ? "Máy bay"
                    : ""}
                </td>
                <td>{item.TenChuDe}</td>
                <td>
                  <Link href={`/admin/edittour/${item.MaTour}`}>
                    <button
                      className="btn btn-secondary"
                      style={{ marginRight: "5px", cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-pen-to-square me-1"></i>
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setDeleteModalVisible(true);
                      setDeleteId(item.MaTour);
                    }}
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
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
      </div>
    </>
  );
}
