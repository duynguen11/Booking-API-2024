import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Image from "next/image";

const Donhang = () => {
  const [dataBooking, setDataBooking] = useState([]);

  const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
    return formattedAmount.replace(/\s₫/g, "");
  };

  useEffect(() => {
    const fetchDataBooking = async () => {
      try {
        const res = await axios.get(
          "http://localhost:2024/api/chitietdattour/allSubmitBooking"
        );
        console.log("Dữ liệu booking data:", res.data);
        setDataBooking(res.data);
      } catch (err) {
        console.error("Có lỗi khi lấy dataBooking", err);
      }
    };

    fetchDataBooking();
  }, []);

  return (
    <>
      <AdminLayout />
      <div className="main-body">
        <h4 className="fw-bolder">DANH SÁCH ĐƠN HÀNG</h4>
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
        <table
          className="table table-bordered table-striped mt-3"
          responsive
          striped
        >
          <thead>
            <tr>
              <th>Mã đặt tour</th>
              <th>Khách hàng</th>
              <th>Liên hệ</th>
              <th>Phân loại TK</th>
              <th>Hướng dẫn viên</th>
              <th>Tour đặt</th>
              <th>Số vé</th>
              <th>Thanh toán</th>
              <th>Thời gian đặt</th>
              <th>Tổng giá</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {dataBooking.map((booking) => (
              <tr key={booking.MaDatTour}>
                <td>{booking.MaDatTour}</td>
                <td>{booking.HoTen_KH}</td>
                <td>{booking.LienHe}</td>
                <td>{booking.PhanLoaiTK}</td>
                <td>{booking.HoTen_HDV}</td>
                <td>
                  <Image
                    width={70}
                    height={70}
                    src={`http://localhost:2024${booking.HinhAnhTour}`}
                  />
                </td>
                <td>{booking.SoCho}</td>
                <td>{booking.ThanhToan}</td>
                <td>{new Date(booking.ThoiGianDat).toLocaleString()}</td>
                <td>{formatCurrency(booking.TongGia)} VND</td>
                <td>{booking.TrangThai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Donhang;
