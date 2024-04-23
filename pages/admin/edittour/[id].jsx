import React, { useState, useEffect } from "react";
import { Button, Alert, Container, Row, Col, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EditTour = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tour, setTour] = useState({
    MaTour: "",
    TenTour: "",
    GiaTour: "",
    ThoiGian: "",
    NgayKhoiHanh: "",
    NoiKhoiHanh: "",
    SoCho: "",
    PhuongTien: "",
    MoTa: "",
    MaChuDe: "",
    DiemDen: "",
    MaHinhAnh: "",
    URL: "",
  });

  useEffect(() => {
    if (id) {
      axios
        //.get(`https://api-bookingnodejs.onrender.com/api/tour/${id}`)
        .get(`http://localhost:2024/api/tour/${id}`)
        .then((result) => {
          setTour((prevTour) => ({
            ...prevTour,
            MaTour: result.data[0].MaTour,
            TenTour: result.data[0].TenTour,
            GiaTour: result.data[0].GiaTour,
            ThoiGian: result.data[0].ThoiGian,
            SoCho: result.data[0].SoCho,
            PhuongTien: result.data[0].PhuongTien,
            NoiKhoiHanh: result.data[0].NoiKhoiHanh,
            MaChuDe: result.data[0].MaChuDe,
            NgayKhoiHanh: new Date(result.data[0].NgayKhoiHanh),
            MoTa: result.data[0].MoTa,
            DiemDen: result.data[0].DiemDen,
            MaHinhAnh: result.data[0].MaHinhAnh,
            URL: result.data[0].URL,
          }));
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      //.get("https://api-bookingnodejs.onrender.com/api/chude")
      .get("http://localhost:2024/api/chude")
      .then((result) => {
        if (result.data) {
          setCategory(result.data);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleInfoTour = async (e) => {
    e.preventDefault();

    if (id) {
      // Format date to the expected format ('YYYY-MM-DD')
      const formattedNgayKhoiHanh = new Date(tour.NgayKhoiHanh)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      // Update the tour object with the formatted date
      const updatedTour = {
        ...tour,
        NgayKhoiHanh: formattedNgayKhoiHanh,
      };

      axios
        /*.put(`https://api-bookingnodejs.onrender.com/api/tour/update/${id}`, updatedTour, {
          headers: {
            "Content-Type": "application/json", // Set Content-Type to application/json
          },
        })*/
        .put(`http://localhost:2024/api/tour/update/${id}`, updatedTour, {
          headers: {
            "Content-Type": "application/json", // Set Content-Type to application/json
          },
        })
        .then((result) => {
          if (result.data) {
            setAlertMessage("Lưu thông tin thành công !");
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 5000);
          } else {
            alert("Không lưu được dữ liệu");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  // Tạo FormData object để chứa dữ liệu gửi đi

  const [schedules, setSchedules] = useState([
    {
      NgayThamQuan: "",
      DiaDiem: "",
      NoiDung: "",
    },
  ]);

  const handleChangeLichtrinh = (e, index) => {
    const { name, value } = e.target;
    const updatedSchedules = [...schedules];
    updatedSchedules[index][name] = value;
    setSchedules(updatedSchedules);
  };

  const handleCreateAnotherSchedule = () => {
    setSchedules([
      ...schedules,
      { NgayThamQuan: "", DiaDiem: "", NoiDung: "" },
    ]);
  };

  const handleSubmit_TTCT = async (e) => {
    e.preventDefault();

    schedules.forEach(async (schedule) => {
      const { NgayThamQuan, DiaDiem, NoiDung } = schedule;
      try {
        const response = await axios.put(
          `http://localhost:2024/api/tour/update-schedule/${id}`,
          { NgayThamQuan, DiaDiem, NoiDung }
        );
        // Đoạn mã xử lý phản hồi từ máy chủ ở đây (nếu cần)
      } catch (error) {
        console.error("Error:", error);
        // Xử lý lỗi ở đây (nếu cần)
      }
    });
  };

  const [ngayDi, setNgayDi] = useState("");
  const [ngayVe, setNgayVe] = useState("");
  const [tapTrung, setTapTrung] = useState("");
  const [diemDen_ttct, setDiemDen_ttct] = useState("");
  const [hoten, setHoten] = useState("");
  const [gioitinh, setGioitinh] = useState("");
  const [email, setEmail] = useState("");
  const [lienhe, setLienhe] = useState("");

  function formatDateTTCT(dateString) {
    const date = new Date(dateString);
    // Lấy các phần tử ngày, tháng, năm
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Thêm số 0 phía trước nếu cần
    const day = String(date.getDate()).padStart(2, "0"); // Thêm số 0 phía trước nếu cần
    // Trả về ngày tháng định dạng yyyy-MM-dd
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const apiUrl = `http://localhost:2024/api/tour/ttct_tour/${id}`;
      try {
        const response = await axios.get(apiUrl);
        const data = response.data[0];
        const ngayDi = new Date(data.TTCT_ngaydi);
        setNgayDi(ngayDi);
        const ngayVe = new Date(data.TTCT_ngayve);
        setNgayVe(ngayVe);
        setTapTrung(data.TTCT_taptrung);
        setDiemDen_ttct(data.TTCT_diemden);
        setHoten(data.HoTen);
        setGioitinh(data.GioiTinh);
        setEmail(data.Email);
        setLienhe(data.LienHe);
      } catch (error) {
        console.error("Error fetching tour detail:", error);
      }
    };

    fetchData();
  }, [id]);

  const [employees, setEmployees] = useState([]);
  const [selectedMaTaikhoan, setSelectedMaTaikhoan] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gửi yêu cầu Axios không cần token
        const response = await axios.get(
          "http://localhost:2024/api/account/client/employees"
        );

        console.log("Danh sách nhân viên:", response.data);
        setEmployees(response.data);
        if (!selectedMaTaikhoan && response.data.length > 0) {
          setSelectedMaTaikhoan(response.data[0].MaTaikhoan);
        }
        setDataLoaded(true);
      } catch (error) {
        console.error("Đã có lỗi xảy ra khi gửi yêu cầu:", error);
      }
    };

    fetchData();
  }, []);

  const handleInsert = async () => {
    const requestData = {
      TTCT_ngaydi: formatDateTTCT(ngayDi),
      TTCT_ngayve: formatDateTTCT(ngayVe),
      TTCT_taptrung: tapTrung,
      TTCT_diemden: diemDen_ttct,
      MaTaikhoan: parseInt(selectedMaTaikhoan),
    };

    try {
      const apiUrl = `http://localhost:2024/api/tour/ttct_tourInsert/${id}`;
      console.log("Data to be sent:", requestData);

      const response = await axios.post(apiUrl, requestData);
      // Thực hiện các công việc cần thiết sau khi thêm mới thành công
    } catch (error) {
      console.error("Error:", error);
      // Xử lý lỗi nếu có
    }
  };

  const handleUpdate = async (id) => {
    try {
      const apiUrl = `http://localhost:2024/api/tour/ttct_tourUpdate/${id}`;
      const requestData = {
        TTCT_ngaydi: formatDateTTCT(ngayDi),
        TTCT_ngayve: formatDateTTCT(ngayVe),
        TTCT_taptrung: tapTrung,
        TTCT_diemden: diemDen_ttct,
        MaTaikhoan: parseInt(selectedMaTaikhoan),
      };

      const response = await axios.put(apiUrl, requestData);
      console.log("Data to be update:", requestData);

      // Thực hiện các công việc cần thiết sau khi cập nhật thành công
    } catch (error) {
      console.error("Error:", error);
      // Xử lý lỗi nếu có
    }
  };

  const [selectedCateImage, setCateSelectedImage] = useState(null);
  const handleImageCateChange = (event) => {
    const file = event.target.files[0];
    setCateSelectedImage(file);
    // Log link của hình ảnh
    const imageUrl = URL.createObjectURL(file);
  };

  const changeCategoryImage = async (id) => {
    const formData = new FormData();
    formData.append("image", selectedCateImage);

    try {
      // Gửi yêu cầu POST đến server để tải lên ảnh và cập nhật avatar_url
      const response = await axios.post(
        `http://localhost:2024/api/tour/uploadCateImage/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Cập nhật giao diện hoặc thông báo thành công tùy ý
    } catch (error) {
      console.error("Lỗi khi cập nhật ảnh đại diện:", error.message);
      // Xử lý lỗi hoặc hiển thị thông báo lỗi tùy ý
    }
  };

  const handleDelCategoryImgs = (idHinhanh) => {
    axios.delete(`http://localhost:2024/api/tour/deleteImage/${idHinhanh}`);
  };

  const [lichtrinh, setLichtrinh] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2024/api/tour/lichtrinhtour/${id}`
        );
        setLichtrinh(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateSchedule = async (scheduleId, updatedItem) => {
    try {
      const response = await axios.put(
        `http://localhost:2024/api/tour/schedule_lichtrinh/${scheduleId}`,
        updatedItem
      );
      console.log("Cập nhật thành công:", response.data);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      const apiURL = `http://localhost:2024/api/tour/scheduleDelete_lichtrinh/${scheduleId}`;
      const response = await axios.delete(apiURL);
      if (response.status === 200) {
        console.log("Xóa lịch trình thành công.");
      } else {
        console.log("Không thể xóa lịch trình.");
      }
    } catch (error) {
      console.log("Lỗi khi xóa:", error);
    }
  };

  const [formData, setFormData] = useState({
    nguoilon: "",
    treem: "",
    trenho: "",
    embe: "",
    phuthu: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2024/api/chitietgiatour/ctgt/${id}`
        );
        const data = response.data;
        console.log("Dữ liệu giá tour:", data);
        // Cập nhật dữ liệu từ URL vào state formData
        const filteredData = {};
        data.forEach((item) => {
          switch (item.LoaiKhach) {
            case 1:
              filteredData.nguoilon = item.GiaTourChiTiet;
              break;
            case 2:
              filteredData.treem = item.GiaTourChiTiet;
              break;
            case 3:
              filteredData.trenho = item.GiaTourChiTiet;
              break;
            case 4:
              filteredData.embe = item.GiaTourChiTiet;
              break;
            case 5:
              filteredData.phuthu = item.GiaTourChiTiet;
              break;
            default:
              break;
          }
        });

        setFormData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const chitietgiatourAdd = async () => {
    const dataCTGT = { ...formData, matour: id };
    try {
      const apiURL = "http://localhost:2024/api/chitietgiatour/createctgt";
      const response = await axios.post(apiURL, dataCTGT);
    } catch (err) {
      console.error("Đã có lỗi xảy ra khi gửi yêu cầu:", err.message); // Thông báo lỗi
    }
  };

  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    const fetchImageURLs = async () => {
      try {
        const response = await axios.get(
          //`https://api-bookingnodejs.onrender.com/api/tour/imageExtras/${id}`
          `http://localhost:2024/api/tour/imageExtras/${id}`
        );
        setImageURLs(response.data.images);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };

    fetchImageURLs();
  }, [id]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = [];
    for (let i = 0; i < Math.min(files.length, 5); i++) {
      imagesArray.push(files[i]);
    }
    setImages(imagesArray);
  };

  const handleSubmitImage = async () => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append("images", image); // Đặt tên trường là "images"
    });

    try {
      const response = await axios.post(
        //`https://api-bookingnodejs.onrender.com/api/tour/uploadExtras/${id}`,
        `http://localhost:2024/api/tour/uploadExtras/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Xử lý phản hồi nếu cần
    } catch (error) {
      console.error("Error uploading images:", error);
      // Xử lý lỗi nếu cần
    }
  };

  const handleDeleteImage = async (MaHinhanh) => {
    try {
      // Gửi yêu cầu DELETE với MaHinh tương ứng
      await axios.delete(
        `http://localhost:2024/api/tour/deleteImage/${MaHinhanh}`
      );
      // Cập nhật danh sách hình ảnh sau khi xóa
      setImageURLs(imageURLs.filter((image) => image.MaHinhanh !== MaHinhanh));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <>
      <AdminLayout />
      <div className="main-body px-5">
        <h4 className="fw-bold">Cập nhật thông tin tour</h4>
        <Alert
          className="mt-2 mb-0 alert_top"
          variant="success"
          show={showAlert}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
        <div className="row d-flex d-flex justify-content-around w-70 my-3">
          <div className="col-8">
            <div className="mb-3">
              <Image
                width={"700"}
                height={"500"}
                //src={`https://api-bookingnodejs.onrender.com/${tour.URL}`}
                src={`http://localhost:2024/${tour.URL}`}
                alt="Tour Big Image"
                className="mr-3 rounded"
                style={{ width: "100%", objectFit: "cover" }}
              />
              <div className="mt-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => changeCategoryImage(id)}
                >
                  Tải lên ảnh chủ đề
                </button>
                <button
                  className="btn btn-danger ms-1"
                  onClick={() => handleDelCategoryImgs(tour.MaHinhAnh)}
                >
                  Xóa bỏ
                </button>
              </div>
            </div>
            <div>
              <p className="mb-0">Hình ảnh tour:</p>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                id="imageInput"
                name="imageInput"
                onChange={handleImageCateChange}
              />
            </div>
            <br />
          </div>
          <h4>Bộ sưu tập ảnh</h4>
          <div className="d-flex justify-content-between">
            <div className="image-container mb-5">
              {imageURLs.map((imageURL, index) => (
                <div className="image-wrapper" key={index}>
                  <Image
                    width={"200"}
                    height={"200"}
                    className="rounded"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    key={index}
                    //src={`https://api-bookingnodejs.onrender.com${imageURL.URL}`}
                    src={`http://localhost:2024/${imageURL.URL}`}
                    alt={`Image ${index + 1}`}
                  />
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteImage(imageURL.MaHinhanh)}
                  >
                    Xóa bỏ
                  </button>
                </div>
              ))}
              <div>
                <p className="fw-bolder">Tải lên bộ sưu tập</p>
                <div className="image-preview d-flex">
                  {images.map((image, index) => (
                    <div key={index}>
                      <Image
                        width={"200"}
                        height={"200"}
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        className="preview-image rounded ms-2"
                      />
                    </div>
                  ))}
                </div>
                <div className="">
                  <input type="file" multiple onChange={handleImageChange} />
                  <button
                    className="btn btn-secondary"
                    onClick={handleSubmitImage}
                  >
                    Tải lên
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-50">
            <h4 className="fw-bolder">Chi tiết giá tour</h4>
            <label htmlFor="nguoilon">Người lớn:</label>
            <input
              id="nguoilon"
              className="form-control"
              type="text"
              name="nguoilon"
              value={formData.nguoilon}
              onChange={handleChange}
            />
            <label htmlFor="treem">Trẻ em:</label>
            <input
              id="treem"
              className="form-control"
              type="text"
              name="treem"
              value={formData.treem}
              onChange={handleChange}
            />
            <label htmlFor="trenho">Trẻ nhỏ:</label>
            <input
              id="trenho"
              className="form-control"
              type="text"
              name="trenho"
              value={formData.trenho}
              onChange={handleChange}
            />
            <label htmlFor="embe">Em bé:</label>
            <input
              id="embe"
              className="form-control"
              type="text"
              name="embe"
              value={formData.embe}
              onChange={handleChange}
            />
            <label htmlFor="phuthu">Phụ thu phòng đơn:</label>
            <input
              id="phuthu"
              className="form-control"
              type="text"
              name="phuthu"
              value={formData.phuthu}
              onChange={handleChange}
            />
            <button
              className="btn btn-secondary mt-2"
              onClick={chitietgiatourAdd}
            >
              Cập nhật
            </button>
          </div>
          <div className="col">
            <h4 className="fw-bolder">Thông tin cơ bản</h4>
            <div className="row">
              <div className="col">
                <label htmlFor="tenTour">Tên tour:</label>
                <input
                  id="tenTour"
                  className="form-control"
                  type="text"
                  placeholder="Tên tour"
                  value={tour.TenTour}
                  onChange={(e) =>
                    setTour({ ...tour, TenTour: e.target.value })
                  }
                />
                <label htmlFor="giaTour">Giá tour:</label>
                <input
                  id="giaTour"
                  className="form-control"
                  type="text"
                  placeholder="Giá tour"
                  value={tour.GiaTour}
                  onChange={(e) =>
                    setTour({ ...tour, GiaTour: e.target.value })
                  }
                />
                <label htmlFor="thoiGian">Thời gian tham quan:</label>
                <input
                  id="thoiGian"
                  className="form-control"
                  type="text"
                  placeholder="Thời gian"
                  value={tour.ThoiGian}
                  onChange={(e) =>
                    setTour({ ...tour, ThoiGian: e.target.value })
                  }
                />
                <label htmlFor="noiKhoiHanh">Nơi khởi hành:</label>
                <input
                  id="noiKhoiHanh"
                  className="form-control"
                  type="text"
                  placeholder="Nơi khởi hành"
                  value={tour.NoiKhoiHanh}
                  onChange={(e) =>
                    setTour({ ...tour, NoiKhoiHanh: e.target.value })
                  }
                />
                <label htmlFor="ngayKhoiHanh">Ngày khởi hành:</label>
                <div>
                  <DatePicker
                    id="ngayKhoiHanh"
                    className="date_pick"
                    selected={tour.NgayKhoiHanh}
                    onChange={(date) =>
                      setTour({ ...tour, NgayKhoiHanh: date })
                    }
                    dateFormat="dd/MM/yyyy HH:mm" // Date format including time
                    showTimeSelect // Enable time selection
                    timeFormat="HH:mm" // Time format
                    timeIntervals={15} // Time interval
                  />
                </div>
              </div>
              <div className="col">
                <label htmlFor="diemDen">Điểm đến:</label>
                <input
                  id="diemDen"
                  className="form-control"
                  type="text"
                  placeholder="Điểm đến"
                  value={tour.DiemDen}
                  onChange={(e) =>
                    setTour({ ...tour, DiemDen: e.target.value })
                  }
                />
                <label htmlFor="soCho">Số chỗ:</label>
                <input
                  id="soCho"
                  className="form-control"
                  type="number"
                  placeholder="Số chỗ"
                  value={tour.SoCho}
                  onChange={(e) => setTour({ ...tour, SoCho: e.target.value })}
                />
                <label htmlFor="phuongTien">Phương tiện:</label>
                <select
                  id="phuongTien"
                  className="form-select"
                  value={tour.PhuongTien}
                  onChange={(e) =>
                    setTour({ ...tour, PhuongTien: e.target.value })
                  }
                >
                  <option value={"Xe khách"}>Xe khách</option>
                  <option value={"Tàu lửa"}>Tàu lửa</option>
                  <option value={"Máy bay"}>Máy bay</option>
                </select>
                <div>
                  <label htmlFor="category">Chủ đề tour:</label>
                  <select
                    id="category"
                    className="form-select"
                    value={tour.MaChuDe}
                    onChange={(e) =>
                      setTour({ ...tour, MaChuDe: e.target.value })
                    }
                  >
                    {category.map((c) => {
                      return (
                        <option key={c.MaChuDe} value={c.MaChuDe}>
                          {c.TenChuDe}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="moTa">Mô tả tour:</label>
          <textarea
            style={{ height: "150px" }}
            id="moTa"
            className="form-control mb-3"
            type="text"
            placeholder="Giới thiệu ngắn về tour"
            value={tour.MoTa}
            onChange={(e) => setTour({ ...tour, MoTa: e.target.value })}
          />
        </div>
        <div className="d-flex justify-content-between">
          <a className=""></a>
          <div className="d-flex">
            <Button onClick={handleInfoTour} variant="success" type="submit">
              Lưu thông tin
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-around">
          <div style={{ flex: 1 }} className="pe-5">
            <h4 className="fw-bolder">Thông tin hướng dẫn viên</h4>
              <label htmlFor="ttct_hdv">Chọn hướng dẫn viên</label>
              <select style={{width: 'fit-content'}}
                id="ttct_hdv"
                className="form-select mb-4"
                value={selectedMaTaikhoan} // Sử dụng selectedMaTaikhoan để đồng bộ giá trị đã chọn với state
                onChange={(e) => setSelectedMaTaikhoan(e.target.value)} // Cập nhật giá trị khi có sự thay đổi
              >
                {employees.map((c) => (
                  <option key={c.MaTaikhoan} value={c.MaTaikhoan}>
                    {c.HoTen}
                  </option>
                ))}
              </select>
            <div className="ps-3 mt-3">
              <div
                style={{ width: "200px", height: "200px" }}
                className="border rounded"
              >
                <Image
                  width={"200"}
                  height={"200"}
                  src="/avatar/avatar_default.jpg"
                  alt=""
                />
              </div>
              <div className="mt-2">
                <div>Họ tên: {hoten}</div>
                <div>Giới tính: {gioitinh}</div>
                <div>Email: {email}</div>
                <div>Liên hệ: {lienhe}</div>
              </div>
            </div>
          </div>
          <div style={{ flex: "0 0 33.33%" }}>
            <h4 className="fw-bolder mt-3">Thông tin tour chi tiết</h4>
            <label htmlFor="ttct_ngaydi">TTCT ngày đi</label>
            <input
              id="ttct_ngaydi"
              className="form-control"
              type="date"
              placeholder="Ngày di chuyển"
              value={formatDateTTCT(ngayDi)}
              onChange={(e) => setNgayDi(e.target.value)}
            />
            <label htmlFor="ttct_ngayve">TTCT ngày về</label>
            <input
              id="ttct_ngayve"
              className="form-control"
              type="date"
              placeholder="Ngày về"
              value={formatDateTTCT(ngayVe)}
              onChange={(e) => setNgayVe(e.target.value)}
            />
            <label htmlFor="ttct_taptrung">TTCT nơi tập trung</label>
            <input
              id="ttct_taptrung"
              className="form-control"
              type="text"
              placeholder="Nơi tập trung"
              value={tapTrung}
              onChange={(e) => setTapTrung(e.target.value)}
            />
            <label htmlFor="ttct_diemden">TTCT điểm đến</label>
            <input
              id="ttct_diemden"
              className="form-control"
              type="text"
              placeholder="Điểm đến"
              value={diemDen_ttct}
              onChange={(e) => setDiemDen_ttct(e.target.value)}
            />

            <button className="btn btn-secondary me-2" onClick={handleInsert}>
              <i className="fa-solid fa-circle-down"></i>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleUpdate(id)}
            >
              Cập nhật
            </button>
          </div>
        </div>

        <div>
          <h4 className="fw-bolder mt-5">Thông tin lịch trình chi tiết</h4>
          <div>
            <h5 className="fw-bolder mt-3">Danh sách lịch đã tạo</h5>
            {lichtrinh.map((item, index) => {
              return (
                <div key={index}>
                  <div className="d-flex justify-content-between">
                    <input
                      className="form-control me-5"
                      type="text"
                      placeholder="Ngày Thăm Quan"
                      value={item.NgayThamQuan}
                      onChange={(e) => {
                        const updatedLichtrinh = [...lichtrinh];
                        updatedLichtrinh[index].NgayThamQuan = e.target.value;
                        setLichtrinh(updatedLichtrinh);
                      }}
                    />
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Địa Điểm"
                      value={item.DiaDiem}
                      onChange={(e) => {
                        const updatedLichtrinh = [...lichtrinh];
                        updatedLichtrinh[index].DiaDiem = e.target.value;
                        setLichtrinh(updatedLichtrinh);
                      }}
                    />
                  </div>
                  <label className="mt-3" htmlFor="NoiDung">
                    Lịch trình di chuyển trong ngày:
                  </label>
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="5"
                    placeholder="Nội Dung"
                    value={item.NoiDung}
                    onChange={(e) => {
                      const updatedLichtrinh = [...lichtrinh];
                      updatedLichtrinh[index].NoiDung = e.target.value;
                      setLichtrinh(updatedLichtrinh);
                    }}
                  ></textarea>
                  <div className="d-flex justify-content-end mt-2">
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDeleteSchedule(item.MaLichtrinh)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        handleUpdateSchedule(item.MaLichtrinh, {
                          NgayThamQuan: item.NgayThamQuan,
                          DiaDiem: item.DiaDiem,
                          NoiDung: item.NoiDung,
                        })
                      }
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <div>
            {schedules.map((schedule, index) => (
              <div key={index}>
                <h5 className="fw-bolder mt-4">
                  Thêm lịch trình di chuyển mới
                </h5>
                <form onSubmit={handleSubmit_TTCT}>
                  <div className="d-flex justify-content-between">
                    <input
                      className="form-control me-5"
                      type="text"
                      placeholder="Ngày Thăm Quan"
                      name="NgayThamQuan"
                      value={schedule.NgayThamQuan}
                      onChange={(e) => handleChangeLichtrinh(e, index)}
                    />
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Địa Điểm"
                      name="DiaDiem"
                      value={schedule.DiaDiem}
                      onChange={(e) => handleChangeLichtrinh(e, index)}
                    />
                  </div>
                  <label className="mt-3" htmlFor="NoiDung">
                    Lịch trình di chuyển trong ngày:
                  </label>
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="5"
                    placeholder="Nội Dung"
                    name="NoiDung"
                    value={schedule.NoiDung}
                    onChange={(e) => handleChangeLichtrinh(e, index)}
                  ></textarea>
                  <hr />
                </form>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={handleCreateAnotherSchedule}
            >
              Tạo thêm lịch
            </button>
            <button
              className="btn btn-success"
              type="submit"
              onClick={handleSubmit_TTCT}
            >
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTour;
