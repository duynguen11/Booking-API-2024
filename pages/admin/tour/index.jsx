import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

export default function Tour() {
  const [tour, setTour] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2024/api/tour");
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
      const response = await axios.delete(
        `http://localhost:2024/api/tour/delete/${id}`
      );
      if (response.data.status) {
        alert("ĐÃ XÓA TOUR !");
        router.reload();
      } else {
        alert("Đang có dữ liệu tour. Không thể xóa !");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
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
          <h4 className="fw-bold">Quản lý tour</h4>
          <div
            onClick={handleReload}
            className="d-flex align-items-center btn btn-secondary"
          >
            <i className="fa-solid fa-square-plus me-2"></i>
            <a className="text-decoration-none text-white">Thêm tour mới</a>
          </div>
        </div>
        <Table style={{ fontSize: "14px" }} className="mt-3" responsive striped>
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
            {tour.map((item) => (
              <tr>
                <td>
                  <img
                    style={{ width: "60px" }}
                    src={`http://localhost:2024/${item.URL}`}
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
