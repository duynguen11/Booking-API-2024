import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const EditChude = () => {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState({
    MaChuDe: "",
    TenChuDe: "",
    ThongTinChuDe: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`https://api-bookingnodejs.onrender.com/api/chude/${id}`)
        .then((result) => {
          setCategory((prevCategory) => ({
            ...prevCategory,
            MaChuDe: result.data.Result[0].MaChuDe,
            TenChuDe: result.data.Result[0].TenChuDe,
            ThongTinChuDe: result.data.Result[0].ThongTinChuDe,
          }));
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const handleSubmit = async (id) => {
    try {
      const response = await axios.put(
        `https://api-bookingnodejs.onrender.com/api/chude/update/${id}`,
        category
      );
      if (response.status === 200) {
        setAlertMessage("Lưu thông tin thành công !");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false)
        }, 5000)
      } else {
        alert(response.data.error || "Có lỗi xảy ra khi cập nhật chủ đề");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleCloseUpdateModal = () => setUpdateModalVisible(false);

  const handleConfirmUpdate = () => {
    setUpdateModalVisible(false);
    if (updateId) {
      handleSubmit(updateId); // Gọi hàm xử lý xác nhận xóa
    }
  };

  const handleReload = () => {
    if (id) {
      router.reload(); // Reload trang chỉ khi có id
    }
  };

  return (
    <>
      <AdminLayout />
      <div className="main-body">
        <h4 className="fw-bolder">Cập nhật thông tin chủ đề</h4>
        <Alert
          className="mt-2 mb-0 w-75"
          variant="success"
          show={showAlert}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
        <div className="mt-4 w-75 p-3 bg-white rounded" onSubmit={handleSubmit}>
          <Form.Group controlId="MaChuDe">
            <Form.Label>Mã chủ đề:</Form.Label>
            <Form.Control
              type="text"
              name="MaChuDe"
              value={category.MaChuDe}
              onChange={(e) =>
                setCategory({ ...category, MaChuDe: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="TenChuDe">
            <Form.Label>Tên chủ đề:</Form.Label>
            <Form.Control
              type="text"
              name="TenChuDe"
              value={category.TenChuDe}
              onChange={(e) =>
                setCategory({ ...category, TenChuDe: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="ThongTinChuDe">
            <Form.Label>Thông tin thêm:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="ThongTinChuDe"
              value={category.ThongTinChuDe}
              onChange={(e) =>
                setCategory({ ...category, ThongTinChuDe: e.target.value })
              }
            />
          </Form.Group>

          <div className="d-flex justify-content-between mt-3">
            <Link className="btn btn-secondary" href="/admin/chude">
              Quay lại
            </Link>
            <div className="d-flex">
              <button
                type="submit"
                onClick={handleReload}
                className="btn btn-secondary me-2"
              >
                <i className="fa-solid fa-arrow-rotate-right"></i>
              </button>
              <Button
                className="btn-success"
                type="submit"
                onClick={() => {
                  setUpdateId(id); // Đặt id cho việc xác nhận cập nhật
                  setUpdateModalVisible(true); // Hiển thị modal
                }}
              >
                Lưu thông tin
              </Button>
            </div>
          </div>
        </div>

        <Modal
          className="mt-5"
          show={updateModalVisible}
          onHide={handleCloseUpdateModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận cập nhật</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn có chắc chắn muốn cập nhật?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateModal}>
              Hủy
            </Button>
            <Button variant="success" onClick={handleConfirmUpdate}>
              Xác nhận
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default EditChude;
