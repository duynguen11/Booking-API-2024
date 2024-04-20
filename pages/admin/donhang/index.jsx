import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Donhang = () => {
  const [dataBooking, setDataBooking] = useState([]);

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
        <h4>Danh sách đặt tour</h4>
        <table className="mt-3" responsive striped>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Liên hệ</th>
              <th>Mã đặt tour</th>
              <th>Mã tài khoản HDV</th>
              <th>Mã tài khoản KH</th>
              <th>Mã tour</th>
              <th>Số chỗ</th>
              <th>Thanh toán</th>
              <th>Thời gian đặt</th>
              <th>Tổng giá</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {dataBooking.map((booking) => (
              <tr key={booking.MaDatTour}>
                <td>{booking.HoTen}</td>
                <td>{booking.LienHe}</td>
                <td>{booking.MaDatTour}</td>
                <td>{booking.MaTaikhoan_HDV}</td>
                <td>{booking.MaTaikhoan_KH}</td>
                <td>{booking.MaTour}</td>
                <td>{booking.SoCho}</td>
                <td>{booking.ThanhToan}</td>
                <td>{new Date(booking.ThoiGianDat).toLocaleString()}</td>
                <td>{booking.TongGia}</td>
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
