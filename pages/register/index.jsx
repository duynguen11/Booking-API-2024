import React, { useState, useEffect } from "react";
import HomeHeader from "@/components/HomeLayout/HomeHeader";
import HomeFooter from "@/components/HomeLayout/HomeFooter";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    TaiKhoan: "",
    Email: "",
    MatKhau: "",
    confirmMatKhau: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!formData.TaiKhoan) {
      document.getElementById("username").classList.add("is-invalid");
      return;
    }

    if (!formData.Email) {
      document.getElementById("email").classList.add("is-invalid");
      return;
    }

    if (!formData.MatKhau) {
      document.getElementById("password").classList.add("is-invalid");
      return;
    }
    if (!formData.confirmMatKhau) {
      document.getElementById("confirmPassword").classList.add("is-invalid");
      return;
    }

    if (formData.MatKhau !== formData.confirmMatKhau) {
      setPasswordError("Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      console.log("Tài khoản đăng ký:", formData);
      const response = await axios.post(
        "http://localhost:2024/api/account/register",
        formData
      );
      if (response.status === 200) {
        toast.success("Đăng ký tài khoản thành công .");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Tài khoản đã được sử dụng !");
        // Xử lý thông báo khi tài khoản đã tồn tại
      } else {
        console.error("Error registering user:", error);
      }
    }
  };

  return (
    <div>
      <HomeHeader />
      <Container className="" style={{ marginTop: "100px" }}>
        <Row className="justify-content-center">
          <h3 className="text-center text-danger fw-bolder mb-4">
            ĐĂNG KÝ HỘI VIÊN NEXTBOOKING NHẬN NGAY ƯU ĐÃI
          </h3>
          <div className="d-flex justify-content-center">
            <Col md={6} className="p-5 rounded shadow">
              <h4 className="text-center fw-bolder">
                Thông tin đăng ký tài khoản
              </h4>
              <Form className="fw-bolder mt-4" onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>
                    <i className="fa-regular fa-user me-1"></i>Tài khoản đăng
                    nhập<span className="text-danger"> (*)</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên tài khoản"
                    name="TaiKhoan"
                    value={formData.TaiKhoan}
                    onChange={handleChange}
                    className={
                      formData.TaiKhoan.trim() === "" && submitted
                        ? "is-invalid"
                        : ""
                    }
                  />
                  {formData.TaiKhoan.trim() === "" && submitted && (
                    <div className="invalid-feedback">
                      Vui lòng nhập tên tài khoản
                    </div>
                  )}
                </Form.Group>

                <Form.Group controlId="email" className="mt-3">
                  <Form.Label className="">
                    <i className="fa-regular fa-envelope me-1"></i>Email đăng ký
                    <span className="text-danger"> (*)</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập địa chỉ email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className={
                      formData.Email.trim() === "" && submitted
                        ? "is-invalid"
                        : ""
                    }
                  />
                  {formData.Email.trim() === "" && submitted && (
                    <div className="invalid-feedback">Vui lòng nhập email</div>
                  )}
                </Form.Group>

                <Form.Group controlId="password" className="mt-3">
                  <Form.Label className="">
                    <i className="fa-solid fa-unlock-keyhole me-1"></i>Mật khẩu
                    <span className="text-danger"> (*)</span>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu"
                      name="MatKhau"
                      value={formData.MatKhau}
                      onChange={handleChange}
                      className={
                        formData.MatKhau.trim() === "" && submitted
                          ? "is-invalid"
                          : ""
                      }
                    />
                    {formData.MatKhau.trim() === "" && submitted && (
                      <div className="invalid-feedback">
                        Vui lòng nhập mật khẩu
                      </div>
                    )}
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mt-3">
                  <Form.Label className="">
                    <i className="fa-regular fa-circle-check me-1"></i>Xác nhận
                    mật khẩu<span className="text-danger"> (*)</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Xác nhận lại mật khẩu"
                    name="confirmMatKhau"
                    value={formData.confirmMatKhau}
                    onChange={handleChange}
                    className={
                      formData.confirmMatKhau.trim() === "" && submitted
                        ? "is-invalid"
                        : ""
                    }
                  />
                  {formData.confirmMatKhau.trim() === "" && submitted && (
                    <div className="invalid-feedback">
                      Xác nhận lại mật khẩu
                    </div>
                  )}
                </Form.Group>
                {passwordError && (
                  <span style={{ color: "red" }}>{passwordError}</span>
                )}
                <Button
                  className="mt-3 w-100 py-2"
                  variant="primary"
                  type="submit"
                >
                  XÁC NHẬN ĐĂNG KÝ
                </Button>
                <ToastContainer />
              </Form>
            </Col>
            <div className="">
              <Image
                className="rounded"
                width={350}
                height={550}
                src={"/banner/Banner_5.jpg"}
                alt="register-mage"
              />
            </div>
          </div>
        </Row>
        <h4 className="mt-5">ĐIỀU KHOẢN ĐĂNG KÝ HỘI VIÊN</h4>
        <div style={{ textAlign: "justify" }}>
          <p>
            - Hội viên đăng ký chương trình cung cấp đúng các thông tin về số
            điện thoại, địa chỉ liên hệ, địa chỉ email của Hội viên. Khi có thay
            đổi, Hội viên có thể tự cập nhật vào tài khoản tại VietravelPlus.com
            hoặc liên hệ thông báo trực tiếp với nhân viên Vietravel và yêu cầu
            cập nhật.
          </p>
          <p>
            - Hội viên tham gia chương trình được cộng điểm Vàng và điểm Thưởng
            sau khi sử dụng dịch vụ tại Vietravel theo hệ số cộng điểm và theo
            các quy định về điểm thưởng khác được công bố tại từng thời điểm.
          </p>
          <p>
            - Vietravel được miễn trừ chịu trách nhiệm nếu Hội viên không nhận
            được các ưu đãi và lợi ích từ chương trình do số điện thoại, email
            Hội viên có thay đổi mà không cập nhật vào hồ sơ hội viên hoặc do
            gửi ấn phẩm, thư tín qua đường bưu điện đến Hội viên bị thất lạc.
          </p>
          <p>
            - Vietravel được phép sử dụng những thông tin của Hội viên trong các
            trường hợp: phục vụ cho việc nghiên cứu thị trường, lên kế hoạch
            kinh doanh nhằm phục vụ Hội viên tốt hơn của Vietravel hoặc đối tác
            chương trình, gửi phần thưởng hay các ấn phẩm đến Hội viên mà không
            cần sự đồng ý của Hội viên hoặc các trường hợp khác được Hội viên
            cho phép.
          </p>
        </div>
      </Container>
      <HomeFooter />
    </div>
  );
};

export default Register;
