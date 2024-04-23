import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

const Donhang = () => {
  const router = useRouter();
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

  const handleUpdateStatus = async (MaDatTour) => {
    try {
      // Gọi API để cập nhật trạng thái của tour
      const response = await axios.put(
        "http://localhost:2024/api/chitietdattour/updateBookingStatus",
        {
          TrangThai: "Tour đã được duyệt",
          MaDatTour: MaDatTour, // Trạng thái mới
        }
      );

      // Kiểm tra xem cập nhật trạng thái có thành công hay không
      if (response.status === 200) {
        const updatedDataBooking = dataBooking.map((booking) =>
          booking.MaDatTour === MaDatTour
            ? { ...booking, TrangThai: "Tour đã được duyệt" }
            : booking
        );
        setDataBooking(updatedDataBooking);
      }
    } catch (error) {
      console.error("Đã có lỗi xảy ra khi cập nhật trạng thái:", error);
    }
  };

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
              <th>Thao tác</th>
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
                    height={50}
                    src={`http://localhost:2024${booking.HinhAnhTour}`}
                  />
                </td>
                <td>{booking.SoCho}</td>
                <td>{booking.ThanhToan}</td>
                <td>{new Date(booking.ThoiGianDat).toLocaleString()}</td>
                <td>{formatCurrency(booking.TongGia)} VND</td>
                <td>{booking.TrangThai}</td>
                {booking.TrangThai === "HDV đã xác nhận" && (
                  <td>
                    <button
                      onClick={() => handleUpdateStatus(booking.MaDatTour)}
                      className="btn btn-success"
                    >
                      Phê duyệt
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Donhang;
