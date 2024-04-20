import React from "react";
import { Container } from "react-bootstrap";
import Image from "next/image";

const HomeArea = () => {
  return (
    <Container className="mt-5">
      <div className="mt-3">
        <h4>Nhận hướng dẫn du hành quốc tế</h4>
        <div className="mt-3">
          <Image
            className="rounded w-100"
            width={1000}
            height={150}
            src={"/banner/Banner_festival.jpg"}
            alt="banner_festival"
          />
        </div>

        <div className="row d-flex justify-content-center mt-3">
          <div className="col">
            <Image
              className="rounded w-100"
              width={230}
              height={320}
              src={"/banner/Banner_indo.jpeg"}
              alt="banner_area"
            />
            <div className="title_homeArea mt-2">
              <div className="d-flex align-items-center">
                <i className="fa-solid fa-map-location-dot text-primary fw-bolder me-1"></i>
                <p className="mb-0 fw-bolder text-secondary">BALI</p>
              </div>
              <div className="d-flex align-items-center">
                <i class="fa-solid fa-location-dot fw-bolder text-danger me-1"></i>
                <p className="mb-0">Indenosia</p>
              </div>
            </div>
          </div>
          <div className="col">
            <Image
              className="rounded w-100"
              width={230}
              height={320}
              src={"/banner/Banner_bangkok.jpeg"}
              alt="banner_area"
            />
            <div className="title_homeArea mt-2">
              <div className="d-flex align-items-center">
                <i className="fa-solid fa-map-location-dot text-primary fw-bolder me-1"></i>
                <p className="mb-0 fw-bolder text-secondary">BANGKOK</p>
              </div>
              <div className="d-flex align-items-center">
                <i class="fa-solid fa-location-dot fw-bolder text-danger me-1"></i>
                <p className="mb-0">Thailan</p>
              </div>
            </div>
          </div>
          <div className="col">
            <Image
              className="rounded w-100"
              width={230}
              height={320}
              src={"/banner/Banner_seoul.jpeg"}
              alt="banner_area"
            />
            <div className="title_homeArea mt-2">
              <div className="d-flex align-items-center">
                <i className="fa-solid fa-map-location-dot text-primary fw-bolder me-1"></i>
                <p className="mb-0 fw-bolder text-secondary">SEOUL</p>
              </div>
              <div className="d-flex align-items-center">
                <i class="fa-solid fa-location-dot fw-bolder text-danger me-1"></i>
                <p className="mb-0">South Korea</p>
              </div>
            </div>
          </div>
          <div className="col">
            <Image
              className="rounded w-100"
              width={230}
              height={320}
              src={"/banner/Banner_istanbul.jpeg"}
              alt="banner_area"
            />
            <div className="title_homeArea mt-2">
              <div className="d-flex align-items-center">
                <i className="fa-solid fa-map-location-dot text-primary fw-bolder me-1"></i>
                <p className="mb-0 fw-bolder text-secondary">ISTANBUL</p>
              </div>
              <div className="d-flex align-items-center">
                <i class="fa-solid fa-location-dot fw-bolder text-danger me-1"></i>
                <p className="mb-0">Turkey</p>
              </div>
            </div>
          </div>
          <div className="col">
            <Image
              className="rounded w-100"
              width={230}
              height={320}
              src={"/banner/Banner_livepool.jpeg"}
              alt="banner_area"
            />
            <div className="title_homeArea mt-2">
              <div className="d-flex align-items-center">
                <i className="fa-solid fa-map-location-dot text-primary fw-bolder me-1"></i>
                <p className="mb-0 fw-bolder text-secondary">LIVERPOOL</p>
              </div>
              <div className="d-flex align-items-center">
                <i class="fa-solid fa-location-dot fw-bolder text-danger me-1"></i>
                <p className="mb-0">U/Kingdom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomeArea;
