import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";
import Image from "next/image";

const AdminPage = () => {
  const [countTour, setCountTour] = useState(null);
  const [dataTourRun, setDataTourRun] = useState([]);
  const [countNhanvien, setCountNhanvien] = useState(null);
  const [countHopthu, setCountHopthu] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartInstance = useRef(null);
  const pieChartInstance = useRef(null);
  const [revenueByMonth, setRevenueByMonth] = useState({});

  useEffect(() => {
    // Tạo biểu đồ cột
    if (barChartRef && barChartRef.current) {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
      const ctx = barChartRef.current.getContext("2d");
      barChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Đà Nẵng",
            "Hồ Chí Minh",
            "Hải Phòng",
            "Huế",
            "Trong nước",
            "Nước ngoài",
          ],
          datasets: [
            {
              label: "Tham gia các chuyến đi",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Tạo biểu đồ tròn
    if (pieChartRef && pieChartRef.current) {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
      const ctx = pieChartRef.current.getContext("2d");
      pieChartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: [
            "Tour trong nước",
            "Tour trọn gói",
            "Tour ưu đãi",
            "Tour nước ngoài",
          ],
          datasets: [
            {
              data: [30, 35, 15, 20],
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          plugins: {
            datalabels: {
              formatter: (value, context) => {
                return (
                  context.chart.data.labels[context.dataIndex] +
                  ": " +
                  value +
                  "%"
                );
              },
            },
            title: {
              display: true,
              text: "Phân phối tỷ lệ các danh mục tour",
            },
          },
        },
      });
    }
  }, []);

  const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
    return formattedAmount.replace(/\s₫/g, "");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2024/api/chitietdattour/tourrunning"
        );
        setDataTourRun(response.data);
        console.log("Dữ liệu tour run:", response.data);

        // Tính toán tổng doanh thu theo tháng từ dữ liệu nhận được
        const calculateRevenueByMonth = (data) => {
          const revenueByMonth = {};

          data.forEach((booking) => {
            const date = new Date(booking.ThoiGianDat);
            const month = date.getMonth() + 1; // Lấy tháng từ 0 - 11 nên cần cộng thêm 1 để đổi về từ 1 - 12

            if (!revenueByMonth[month]) {
              revenueByMonth[month] = 0;
            }

            revenueByMonth[month] += booking.TongGia;
          });

          return revenueByMonth;
        };

        // Tính toán doanh thu theo tháng từ dữ liệu nhận được và lưu vào state
        const revenue = calculateRevenueByMonth(response.data);
        setRevenueByMonth(revenue);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi cho người dùng
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        if (token) {
          const [toursResponse, employeesResponse, messsagesResponse] =
            await Promise.all([
              axios.get("http://localhost:2024/api/tour", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }),
              axios.get("http://localhost:2024/api/account/employees", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }),
              axios.get("http://localhost:2024/api/hopthu", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }),
            ]);

          if (toursResponse.status === 200) {
            // Xử lý dữ liệu tour ở đây
            setCountTour(toursResponse.data);
          } else {
            console.error("Lỗi khi lấy dữ liệu tour:", toursResponse.data);
          }

          if (employeesResponse.status === 200) {
            // Xử lý dữ liệu nhân viên ở đây
            setCountNhanvien(employeesResponse.data);
          } else {
            console.error(
              "Lỗi khi lấy dữ liệu nhân viên:",
              employeesResponse.data
            );
          }

          if (messsagesResponse.status === 200) {
            setCountHopthu(messsagesResponse.data.data);
          }
        } else {
          console.error("Token không tồn tại");
        }
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AdminLayout />
      <div className="main-body ms-4">
        <div className="d-flex justify-content-between">
          <div className="flex-fill">
            <div
              style={{
                backgroundColor: "#afcfff",
                color: "GrayText",
                height: "150px",
              }}
              className="d-flex align-items-center justify-content-between p-4 rounded me-4"
            >
              <i
                style={{ fontSize: "50px" }}
                class="fa-solid fa-mountain-sun  p-2 rounded border"
              ></i>
              <div className="text-center">
                <h4 className="fw-bolder">
                  {countTour ? countTour.length : 0}
                </h4>
                <p>Chuyến đi</p>
              </div>
            </div>
          </div>
          <div className="flex-fill">
            <div
              style={{
                backgroundColor: "thistle",
                color: "GrayText",
                height: "150px",
              }}
              className="d-flex align-items-center justify-content-between p-4 rounded me-4"
            >
              <i
                style={{ fontSize: "50px" }}
                className="fa-solid fa-people-carry-box p-2 rounded border"
              ></i>
              <div className="text-center">
                <h4 className="fw-bolder">
                  {countNhanvien ? countNhanvien.length : 0}
                </h4>
                <p>Nhân viên</p>
              </div>
            </div>
          </div>
          <div className="flex-fill">
            <div
              style={{
                backgroundColor: "beige",
                color: "GrayText",
                height: "150px",
              }}
              className="d-flex align-items-center justify-content-between p-4 rounded me-4"
            >
              <i
                style={{ fontSize: "50px" }}
                className="fa-solid fa-truck-fast p-2 rounded border"
              ></i>
              <div className="text-center">
                <h4 className="fw-bolder">
                  {countTour ? countTour.length : 0}
                </h4>
                <p>Đơn hàng</p>
              </div>
            </div>
          </div>
          <div className="flex-fill">
            <div
              style={{
                backgroundColor: "#f8b7a0",
                color: "GrayText",
                height: "150px",
              }}
              className="d-flex align-items-center justify-content-between p-4 rounded me-4"
            >
              <i
                style={{ fontSize: "50px" }}
                className="fa-solid fa-envelopes-bulk p-2 rounded border"
              ></i>
              <div className="text-center">
                <h4 className="fw-bolder">
                  {countHopthu ? countHopthu.length : 0}
                </h4>
                <p>Hộp thư</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h4 className="fw-bolder">BẢNG THỐNG KÊ CHI TIẾT</h4>
          <div className="d-flex justify-content-around">
            <div className="me-4 col">
              <canvas ref={barChartRef}></canvas>
              <h4 className="mt-5 fw-bolder">DANH SÁCH TOUR ĐANG HOẠT ĐỘNG</h4>
              <div>
                <table
                  className="table table-bordered table-striped mt-3"
                  responsive
                  striped
                >
                  <thead>
                    <tr>
                      <th>Mã đặt tour</th>
                      <th>Tour đặt</th>
                      <th>Khách hàng</th>
                      <th>Liên hệ</th>
                      <th>Số vé</th>
                      <th>Thời gian đặt</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTourRun.map((booking) => (
                      <tr key={booking.MaDatTour}>
                        <td>{booking.MaDatTour}</td>
                        <td>
                          <Image
                            width={70}
                            height={50}
                            src={`http://localhost:2024${booking.URL}`}
                          />
                        </td>
                        <td>{booking.HoTen}</td>
                        <td>{booking.LienHe}</td>

                        <td>{booking.SoCho}</td>
                        <td>
                          {new Date(booking.ThoiGianDat).toLocaleString()}
                        </td>
                        <td>{booking.TrangThai}</td>
                        {booking.TrangThai === "HDV đã xác nhận" && (
                          <td>
                            <button
                              onClick={() =>
                                handleUpdateStatus(booking.MaDatTour)
                              }
                              className="btn btn-success"
                            >
                              Phê duyệt
                            </button>
                          </td>
                        )}
                        {booking.TrangThai === "Tour đã bị hủy" && (
                          <td>
                            <button
                              onClick={() =>
                                handleUpdateStatus(booking.MaDatTour)
                              }
                              className="btn btn-danger"
                            >
                              Xóa đơn
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-4">
              <canvas style={{ width: "200px"}} ref={pieChartRef}></canvas>
              <h4 className="mt-5 fw-bolder">THỐNG KÊ DOANH THU</h4>
              <div>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Tháng</th>
                      <th>Doanh thu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(revenueByMonth).map((month) => (
                      <tr key={month}>
                        <td>{month}</td>
                        <td>{formatCurrency(revenueByMonth[month])} VND</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table style={{ display: isTableVisible ? "table" : "none" }}>
        <tbody>
          {countTour && countTour.map((item, index) => <tr key={index}></tr>)}
          {countNhanvien &&
            countNhanvien.map((item, index) => <tr key={index}></tr>)}
          {countHopthu &&
            countHopthu.map((item, index) => <tr key={index}></tr>)}
        </tbody>
      </table>
    </>
  );
};

export default AdminPage;
