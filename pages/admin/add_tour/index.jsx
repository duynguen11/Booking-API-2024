import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useRouter } from "next/router";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const initialFormData = {
  NgayKhoiHanh: new Date(),
  ChudeData: [],
  TenTour: "",
  GiaTour: "",
  ThoiGian: "",
  NoiKhoiHanh: "",
  SoCho: "",
  MoTa: "",
  DiemDen: "",
  PhuongTien: "Xe khách",
  MaChuDe: "1",
  HinhAnh: [],
};

const AddTourForm = () => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    axios
      .get("http://localhost:2024/api/chude")
      .then((result) => {
        if (result.data) {
          // Ở đây, chúng ta cần gán dữ liệu chủ đề vào ChudeData, không phải value của select
          setFormData((prevData) => ({
            ...prevData,
            ChudeData: result.data,
          }));
        } else {
          alert(result.data.err);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "NgayKhoiHanh") {
        formDataToSend.append(
          key,
          value.toISOString().slice(0, 19).replace("T", " ")
        );
      } else if (key === "HinhAnh") {
        value.forEach((file) => formDataToSend.append(key, file));
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:2024/api/test_tour/addtour",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data) {
        router.push("/admin/tour");
      }
    } catch (error) {
      console.error("Error adding tour:", error);
    }
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      NgayKhoiHanh: date,
    }));
  };

  const handleHinhAnhChange = (e) => {
    const files = e.target.files;
    setFormData((prevData) => ({
      ...prevData,
      HinhAnh: [...files],
    }));
  };

  return (
    <div>
      <AdminLayout />
      <div className="main-body">
        <h4 className="fw-bold">Tạo tour mới</h4>
        <form
          className="row d-flex justify-content-around w-70 my-4"
          onSubmit={handleSubmit}
        >
          <div
            style={{ marginLeft: "1rem" }}
            className="col-7 rounded bg-white"
          >
            <label className="mt-3">Hình ảnh tour:</label>
            <div className="">
              {formData.HinhAnh.map((file, index) => (
                <Image
                  className="py-1 rounded"
                  key={index}
                  src={URL.createObjectURL(file)} // Tạo đường dẫn URL tạm thời cho hình ảnh
                  style={{ width: "100%" }}
                />
              ))}
            </div>
            <input
              className="pb-3"
              type="file"
              name="HinhAnh"
              multiple
              onChange={handleHinhAnhChange}
            />
          </div>
          <div style={{ paddingLeft: "1.5rem" }} className="col">
            <label>Tên tour:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Tên tour"
              value={formData.TenTour}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  TenTour: e.target.value,
                }))
              }
            />
            <label className="mt-2">Giá tour:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Giá tour"
              value={formData.GiaTour}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  GiaTour: e.target.value,
                }))
              }
            />
            <label className="mt-2">Thời gian tham quan:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Ngày tham quan"
              value={formData.ThoiGian}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  ThoiGian: e.target.value,
                }))
              }
            />
            <label className="mt-2" htmlFor="ngayKhoiHanh">
              Ngày khởi hành:
            </label>
            <div>
              <DatePicker
                className="date_pick"
                selected={formData.NgayKhoiHanh}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"
              />
            </div>
          </div>
          <div style={{ paddingLeft: 0 }} className="col">
            <label>Nơi khởi hành:</label>
            <input
              className="form-control pl-0"
              type="text"
              placeholder="Nơi tập trung"
              value={formData.NoiKhoiHanh}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  NoiKhoiHanh: e.target.value,
                }))
              }
            />
            <label className="mt-2">Số chỗ:</label>
            <input
              className="form-control pl-0"
              type="number"
              placeholder="Số chỗ trống"
              value={formData.SoCho}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  SoCho: e.target.value,
                }))
              }
            />
            <label className="mt-2">Điểm đến:</label>
            <input
              className="form-control pl-0"
              type="text"
              placeholder="Điểm đến"
              value={formData.DiemDen}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  DiemDen: e.target.value,
                }))
              }
            />
            <label className="mt-2">Phương tiện:</label>
            <select
              className="form-select pl-0"
              value={formData.PhuongTien}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  PhuongTien: e.target.value,
                }))
              }
            >
              <option value={"Xe khách"}>Xe khách</option>
              <option value={"Tàu lửa"}>Tàu lửa</option>
              <option value={"Máy bay"}>Máy bay</option>
            </select>
            <label className="mt-2">Chủ đề:</label>
            <select
              className="form-select pl-0"
              name="category"
              value={formData.MaChuDe} // Sử dụng ChuDe thay vì ChudeData
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  MaChuDe: e.target.value,
                }))
              }
            >
              {formData.ChudeData.map((item) => (
                <option key={item.MaChuDe} value={item.MaChuDe}>
                  {item.TenChuDe}
                </option>
              ))}
            </select>
          </div>
          <div style={{ paddingLeft: "1rem" }}>
            <label className="mt-3" htmlFor="moTa">
              Mô tả tour:
            </label>
            <textarea
              style={{ height: "150px" }}
              id="moTa"
              className="form-control mb-3"
              type="text"
              placeholder="Giới thiệu ngắn về tour"
              value={formData.MoTa}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  MoTa: e.target.value,
                }))
              }
            />
          </div>
          <div className="d-flex justify-content-between">
            <a className="btn btn-secondary" href="/admin/tour">
              Quay lại
            </a>
            <div className="d-flex">
              <Link href="/admin/addtour">
                <a className="btn btn-secondary me-2">
                  <i className="fa-solid fa-arrow-rotate-right"></i>
                </a>
              </Link>
              <Button color="success" type="submit">
                Lưu thông tin
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTourForm;
