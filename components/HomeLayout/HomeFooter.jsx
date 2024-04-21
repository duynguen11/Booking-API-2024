import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeFooter = () => {
  return (
    <div className="mt-5 pt-5 Home-footer">
      <Container className="">
        <Row>
          <Col>
            <div className="footer-column">
              <h4>Dịch vụ</h4>
              <ul>
                <li>
                  <a href="">Du lịch trong nước</a>
                </li>
                <li>
                  <a href="">Du lịch nước ngoài</a>
                </li>
                <li>
                  <a href="">Du lịch ưu đãi</a>
                </li>
                <li>
                  <a href="">Du lịch giảm giá</a>
                </li>
                <li>
                  <a href="">Du lịch trọn gói</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col>
            <div className="footer-column">
              <h4>Thông tin</h4>
              <ul>
                <li>
                  <a href="">Chính sách riêng tư</a>
                </li>
                <li>
                  <a href="">Thỏa thuận sử dụng</a>
                </li>
                <li>
                  <a href="">Cẩm nang du lịch</a>
                </li>
                <li>
                  <a href="">Tạp chí du lịch</a>
                </li>
                <li>
                  <a href="">Các đối tác nhà cung cấp</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col>
            <div className="footer-column">
              <h4>Giúp đỡ</h4>
              <ul>
                <li>
                  <a href="">Hỗ trợ khách hàng trực tuyến</a>
                </li>
                <li>
                  <a href="">Trung tâm trợ giúp</a>
                </li>
                <li>
                  <a href="">Thông tin về công ty hoặc tổ chức</a>
                </li>
                <li>
                  <a href="">Câu hỏi thường gặp (FAQs)</a>
                </li>
              </ul>
            </div>
          </Col>
          <Col>
            <div className="footer-column">
              <h4>Liên hệ</h4>
              <div className="d-flex mb-3">
                <input
                  className="form-control me-1"
                  type="text"
                  placeholder=" Gửi email tư vấn"
                />
                <button className="btn btn-secondary">
                  <i className="fa-regular fa-paper-plane"></i>
                </button>
              </div>
              <ul>
                <li>
                  <a href="">
                    <i class="fa-solid fa-map-location-dot"></i> Quận 2, TP Thủ
                    Đức, Hồ Chí Minh
                  </a>
                </li>
                <li>
                  <a href="">
                    <i class="fa-solid fa-phone-flip"></i> (+8428) 942819528
                  </a>
                </li>
                <li>
                  <a href="">
                    <i class="fa-solid fa-envelope"></i> duynguen11@gmail.com
                  </a>
                </li>
                <li>
                  <a href="">
                    <i class="fa-solid fa-globe"></i> Info@tour&travel.com.vn
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="mt-3 mb-5">
        <Row>
          <Col>
            <div className="footer-column">
              <h4>NEXT BOOKING</h4>
              <div>
                <div className="border rounded py-3 d-flex justify-content-center">
                  <i
                    style={{ fontSize: "25px" }}
                    className="fa-regular fa-handshake me-2"
                  ></i>
                  <span className="fw-bolder">Hợp tác với NEXT BOOKING</span>
                </div>

                <Image
                  className="rounded mt-2"
                  width={300}
                  height={100}
                  src={"/banner/Footer_banner2.jpg"}
                  alt="footer-image"
                />
                <Image
                  className="rounded mt-2"
                  width={300}
                  height={100}
                  src={"/banner/Footer_banner1.webp"}
                  alt="footer-image"
                />
              </div>
            </div>
          </Col>
          <Col className="ms-5">
            <div className="footer-column">
              <h4>Đối tác thanh toán</h4>
              <Row>
                <Col className="bg-light py-3 me-2">
                  <Image
                    width={60}
                    height={20}
                    src={"/banner/Banner_footer_nh1.webp"}
                    alt="nh-image"
                  />
                </Col>
                <Col className="bg-light py-3 me-2">
                  <Image
                    width={60}
                    height={20}
                    src={"/banner/Banner_footer_nh2.webp"}
                    alt="nh-image"
                  />
                </Col>
                <Col className="bg-light py-3">
                  <Image
                    width={60}
                    height={20}
                    src={"/banner/Banner_footer_nh3.webp"}
                    alt="nh-image"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col className="bg-light py-3 me-2">
                  <Image
                    width={60}
                    height={20}
                    src={"/banner/Banner_footer_nh4.webp"}
                    alt="nh-image"
                  />
                </Col>
                <Col className="bg-light py-3 me-2">
                  <Image
                    width={60}
                    height={20}
                    src={"/banner/Banner_footer_nh5.webp"}
                    alt="nh-image"
                  />
                </Col>
                <Col className="bg-light py-3">
                  <Image
                    width={60}
                    height={20}
                    src={"/banner/Banner_footer_nh6.webp"}
                    alt="nh-image"
                  />
                </Col>
              </Row>
            </div>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
      <div className="w-100">
        <Image
          className="rounded"
          style={{ width: "100%", objectFit: "cover" }}
          width={1000}
          height={350}
          src={"/banner/Banner_9.jpg"}
          alt="banner-footer"
        />
      </div>
      <hr />
      <div className="">
        <p className="mb-0 fw-bolder">
          Bản quyền &copy; 2024 Tour & travel Company (duynguen11@gmail.com)
        </p>
      </div>
    </div>
  );
};

export default HomeFooter;
