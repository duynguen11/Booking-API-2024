import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const Hopthu = () => {
  const [hopthu, setHopthu] = useState([]);
  const [idHopthuForReply, setIdHopthuForReply] = useState(null);
  const [senderName, setSenderName] = useState("");
  const [oldMessage, setOldMessage] = useState("");
  const [replyMessage, setReplyMessage] = useState("");

  const handleOpenReplyModal = (idhopthu, senderName, oldMessage) => {
    setIdHopthuForReply(idhopthu);
    setSenderName(senderName);
    setOldMessage(oldMessage);
  };

  const handleCloseReplyModal = () => {
    setIdHopthuForReply(null);
    setSenderName("");
    setOldMessage("");
    setReplyMessage("");
  };

  const handleSendReply = async () => {
    try {
      console.log("Gửi phản hồi cho ID:", idHopthuForReply);
      console.log("Nội dung phản hồi mới:", replyMessage);

      const response = await axios.post("http://localhost:2024/api/hopthu/reply", {
        mahopthu: idHopthuForReply,
        noidung: replyMessage,
      });
      console.log("Phản hồi đã được gửi:", response.data);
    } catch (error) {
      console.error("Lỗi khi gửi phản hồi:", error);
      // Xử lý thông báo lỗi hoặc các hành động khác ở đây
    }
  };

  const formatDate = (datetimeString) => {
    const dateTime = new Date(datetimeString);
    const formattedDate = `${dateTime.getDate()}/${
      dateTime.getMonth() + 1
    }/${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime.getMinutes()}`;
    return formattedDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:2024/api/hopthu");
        const data = await response.json();
        const updatedData = data.data.map((item) => ({
          ...item,
          PhanLoaiTK: item.PhanLoaiTK || "Chưa có tài khoản",
        }));
        setHopthu(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateStatus = async (id, newtrangthai) => {
    try {
      const response = await axios.put(
        "http://localhost:2024/api/hopthu/updateStatus",
        {
          mahopthu: id,
          trangthai: newtrangthai,
        }
      );

      if (response.status === 200) {
        setHopthu((prevHopthu) => {
          const updatedHopthu = prevHopthu.map((item) => {
            if (item.mahopthu === id) {
              return { ...item, trangthai: newtrangthai };
            }
            return item;
          });
          return updatedHopthu;
        });
      } else {
        throw new Error("Có lỗi xảy ra khi cập nhật trạng thái.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  return (
    <>
      <AdminLayout />
      <div className="main-body">
        <h4 className="fw-bolder">Hộp thư khách hàng</h4>
        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Liên hệ</th>
                <th>Tin nhắn</th>
                <th>Thời gian</th>
                <th>Phân loại TK</th>
                <th>Viết</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {hopthu.map((item) => (
                <tr key={item.mahopthu}>
                  <td>{item.hoten}</td>
                  <td>{item.email}</td>
                  <td>{item.lienhe}</td>
                  <td>{item.tinnhan}</td>
                  <td>{formatDate(item.thoigiangui)}</td>
                  <td>{item.PhanLoaiTK}</td>
                  <td className="text-center">
                    {item.PhanLoaiTK === "thành viên" && (
                      <button
                        className="btn btn-secondary"
                        onClick={() =>
                          handleOpenReplyModal(
                            item.mahopthu,
                            item.hoten,
                            item.tinnhan
                          )
                        }
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                    )}
                  </td>
                  <td>
                    <select
                      value={item.trangthai}
                      onChange={(e) =>
                        handleUpdateStatus(item.mahopthu, e.target.value)
                      }
                    >
                      <option value="đợi phản hồi">Đợi phản hồi</option>
                      <option value="đã phản hồi">Đã phản hồi</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          className="mt-5"
          show={idHopthuForReply !== null}
          onHide={handleCloseReplyModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Gửi phản hồi cho <span className="text-danger">{senderName}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label className="fw-bolder">Câu hỏi:</label>
            <textarea className="form-control">{oldMessage}</textarea>
            <label className="fw-bolder mt-2">Nhập tin nhắn phản hồi:</label>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseReplyModal}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleSendReply}>
              <i className="fa-regular fa-paper-plane"></i>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Hopthu;
