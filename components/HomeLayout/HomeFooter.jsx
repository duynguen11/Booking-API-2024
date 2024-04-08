import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeFooter = () => {
  return (
    <div className="mt-5 pt-5 Home-footer">
      <Container>
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
