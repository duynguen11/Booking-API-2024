import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Image from 'next/image'
import HomeHeader from "@/components/HomeLayout/HomeHeader";
import HomeFooter from "@/components/HomeLayout/HomeFooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LienHe = () => {
  const [messData, setMessData] = useState({
    hoten: "",
    email: "",
    tinnhan: "",
    lienhe: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Gửi yêu cầu GET đến máy chủ để lấy thông tin của userId
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:2024/api/account/user-info/${userId}`
          );
          const userData = response.data;
          setMessData((prevMessData) => ({
            ...prevMessData,
            hoten: userData.userInfo.HoTen,
            email: userData.userInfo.Email,
            lienhe: userData.userInfo.LienHe,
            // Thêm các trường khác nếu cần
          }));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, []);

  
  const [lienheError, setLienheError] = useState("");
  const [tinnhanError, setTinnhanError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "lienhe" && value.trim() === "") {
      setLienheError("Vui lòng nhập số điện thoại.");
    } else {
      setLienheError("");
    }
    if (name === "tinnhan" && value.trim() === "") {
      setTinnhanError("Vui lòng nhập tin nhắn.");
    } else {
      setTinnhanError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (messData.lienhe.trim() === "") {
      setLienheError("Vui lòng nhập số điện thoại.");
      return;
    }

    if (messData.tinnhan.trim() === "") {
      setTinnhanError("Vui lòng nhập tin nhắn.");
      return;
    }

    try {
      let dataToSend = { ...messData }; // Tạo một bản sao của messData để không ảnh hưởng đến state gốc

      // Kiểm tra xem userId có tồn tại không
      const MaTaikhoan = localStorage.getItem("userId");
      if (MaTaikhoan) {
        // Nếu userId tồn tại, thêm nó vào dữ liệu
        dataToSend.MaTaikhoan = MaTaikhoan;
      }

      // Gửi yêu cầu POST đến API
      const response = await axios.post(
        "http://localhost:2024/api/account/messbox",
        dataToSend
      );

      // Kiểm tra xem yêu cầu có thành công hay không
      if (response.status === 201) {
        toast.success("Thông tin liên hệ đã được gửi.");
        // Xử lý thành công, có thể thực hiện các hành động khác ở đây nếu cần
      } else {
        toast.error("Đã xảy ra lỗi khi gửi thông tin.");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  return (
    <div>
      <HomeHeader />
      <div style={{ marginTop: "100px" }} className="container">
        <h4 className="fw-bolder">BẠN CẦN GIÚP ĐỠ ?</h4>
        <p>
          Để được hỗ trợ thêm, vui lòng điền thông tin bên dưới để liên hệ với
          trung tâm dịch vụ khách hàng của chúng tôi.
        </p>
        <Row className="mt-4">
          <Col xs={12} md={6}>
            <div>
              <Image
                width={'700'}
                height={'450'}
                className="rounded"
                src="/banner/contact_us.png"
                alt="Online View"
                style={{ width: "100%" }}
              />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <Form className="fw-bolder p-2">
              <Row>
                <Col>
                  <Form.Group controlId="formName">
                    <Form.Label>Họ tên</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên khách hàng"
                      name="hoten"
                      value={messData.hoten}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="lienhe-input">
                    <Form.Label>
                      Số điện thoại <span className="text-danger">(*)</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập số điện thoại"
                      name="lienhe"
                      value={messData.lienhe}
                      onChange={handleChange}
                      isInvalid={lienheError !== ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      {lienheError}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mt-2" controlId="formEmail">
                <Form.Label>Địa chỉ email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập địa chỉ Email"
                  name="email"
                  value={messData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mt-2 mb-3" controlId="formMessage">
                <Form.Label>Đặt câu hỏi <span className="text-danger">(*)</span></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Viết nội dung cần gửi"
                  name="tinnhan"
                  value={messData.tinnhan}
                  onChange={handleChange}
                  isInvalid={tinnhanError !== ""}
                />
                <Form.Control.Feedback type="invalid">
                  {tinnhanError}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="secondary" type="submit" onClick={handleSubmit}>
                GỬI PHẢN HỒI
              </Button>
              <ToastContainer />
            </Form>
          </Col>
        </Row>
        <h4 className="fw-bolder mt-5 mb-3">Câu hỏi phổ biến thường gặp</h4>
        <table className="table table-striped table-hover">
          <tbody className="">
            <tr>
              <td>Đặt chỗ trực tiếp để đảm bảo an toàn</td>
            </tr>
            <tr>
              <td>Cách đổi lịch vé du lịch của tôi</td>
            </tr>
            <tr>
              <td>Cách đổi vé và hoàn tiền đặt chỗ tại quầy</td>
            </tr>
            <tr>
              <td>Cách sửa hoặc đổi tên hành khách</td>
            </tr>
            <tr>
              <td>Cách làm thủ tục trực tuyến</td>
            </tr>
            <tr>
              <td>Cách xác nhận và xác thực thanh toán</td>
            </tr>
            <tr>
              <td>Làm cách nào để kiểm tra trạng thái chuyến đi của tôi</td>
            </tr>
          </tbody>
        </table>
      </div>
      <HomeFooter />
    </div>
  );
};

export default LienHe;
