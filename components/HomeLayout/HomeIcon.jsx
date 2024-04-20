import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const HomeIcon = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-5">VÌ SAO LỰA CHỌN CHÚNG TÔI</h2>
      <Row className="icon-boxes">
        <Col>
          <div className="icon-box">
              <i className="fa-solid fa-satellite-dish"></i>
              <p className="fw-bolder">Mạng bán tour</p>
            <p>Áp dụng công nghệ mới</p>
          </div>
        </Col>
        <Col>
          <div className="icon-box">
            <i className="fa-solid fa-wallet"></i>
            <p className="fw-bolder">Thanh toán</p>
            <p>An toàn và linh hoạt</p>
          </div>
        </Col>
        <Col>
          <div className="icon-box">
            <i className="fa-solid fa-cart-flatbed-suitcase"></i>
            <p className="fw-bolder">Hệ thống đặt tour</p>
            <p>Dễ dàng và nhanh chóng</p>
          </div>
        </Col>
        <Col>
          <div className="icon-box">
            <i className="fa-solid fa-house-medical-flag"></i>
            <p className="fw-bolder">Sản phẩm và dịch vụ</p>
            <p>Đa dạng và chất lượng</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeIcon;
