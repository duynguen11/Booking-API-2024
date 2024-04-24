import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "@/components/AdminLayout/AdminLayout";

const Employee_info = () => {
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    axios
      .get(`http://localhost:2024/api/account/user-info/${userId}`)
      .then((response) => {
        setEmployeeInfo(response.data.userInfo);
      })
      .catch((error) => {
        console.error("Error retrieving user information:", error);
      });
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const changeAvatar = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      // Gửi yêu cầu POST đến server để tải lên ảnh và cập nhật avatar_url
      const response = await axios.post(
        `http://localhost:2024/api/account/user/${userId}/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Cập nhật thông tin thành công .");
      }
      // Cập nhật giao diện hoặc thông báo thành công tùy ý
    } catch (error) {
      console.error("Lỗi khi cập nhật ảnh đại diện:", error.message);
      // Xử lý lỗi hoặc hiển thị thông báo lỗi tùy ý
    }
  };

  const handleChange = (fieldName, value) => {
    setEmployeeInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [fieldName]: value,
    }));
  };

  const handleSave = () => {
    axios
      .put("http://localhost:2024/api/account/update/user-info", employeeInfo) // Gửi dữ liệu thông tin cá nhân lên máy chủ
      .then((response) => {
        // Xử lý logic sau khi dữ liệu đã được lưu thành công
        if (response.status === 200) {
          toast.success("Cập nhật thông tin thành công .");
        }
      })

      .catch((error) => {
        console.error("Error saving user info:", error);
        // Xử lý lỗi khi gửi dữ liệu lên máy chủ
        if (error.response.status === 400) {
          toast.error("Vui lòng kiểm tra thông tin .");
          // Xử lý thông báo khi tài khoản đã tồn tại
        } else {
          console.error("Error registering user:", error);
        }
      });
  };

  return (
    <>
      <AdminLayout />
      {employeeInfo ? (
        <div style={{ paddingTop: "50px" }} className="main-content mt-4">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md d-flex">
              <div>
                <h4 className="mb-3">CẬP NHẬT THÔNG TIN CÁ NHÂN</h4>
                <label>Ảnh đại diện:</label>
                <div className="d-flex align-items-center">
                  <Image
                    className="rounded"
                    width={"200"}
                    height={"200"}
                    style={{ width: "200px", height: "200px" }}
                    src={
                      employeeInfo.Avatar_URL
                        ? `http://localhost:2024/${employeeInfo.Avatar_URL}`
                        : "/avatars/avatar_default.jpg"
                    }
                    alt="Avatar user"
                  />
                  {selectedImage && (
                    <div className="d-flex align-items-center ms-2">
                      <i
                        style={{ fontSize: "20px" }}
                        className="fa-solid fa-code-compare"
                      ></i>
                      <Image
                        width={"200"}
                        height={"200"}
                        style={{ width: "200px", height: "200px" }}
                        className="rounded border ms-2"
                        src={
                          selectedImage
                            ? URL.createObjectURL(selectedImage)
                            : ""
                        }
                        alt="Selected avatar"
                      />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mt-2"
                  accept="image/*"
                />
                <br />
                <button
                  className="btn btn-secondary mt-2"
                  onClick={changeAvatar}
                >
                  Đổi ảnh đại diện
                </button>
              </div>

              <div className="mt-5">
                <div className="d-flex align-items-center my-3">
                  <div className="me-2">
                    <label htmlFor="taikhoan" className="me-3">
                      Tài khoản:
                    </label>
                    <input
                      id="taikhoan"
                      className="form-control"
                      type="text"
                      value={employeeInfo.TaiKhoan}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="ms-3 me-3">Mật khẩu:</label>
                    <input
                      className="form-control"
                      type="text"
                      value={employeeInfo.MatKhau}
                      onChange={(e) => handleChange("MatKhau", e.target.value)}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div>
                    <label className="me-3">Họ và tên:</label>
                    <input
                      className="form-control"
                      type="text"
                      value={employeeInfo.HoTen}
                      onChange={(e) => handleChange("HoTen", e.target.value)}
                    />
                  </div>
                  <div></div>
                  <div>
                    <label className="ms-3 me-3">Giới tính:</label>
                    <label>
                      <input
                        type="checkbox"
                        checked={employeeInfo.GioiTinh === "Nam"}
                        onChange={(e) =>
                          handleChange(
                            "GioiTinh",
                            e.target.checked ? "Nam" : "Nữ"
                          )
                        }
                      />{" "}
                      Nam
                    </label>
                    <label className="ms-3 me-3">
                      <input
                        type="checkbox"
                        checked={employeeInfo.GioiTinh === "Nữ"}
                        onChange={(e) =>
                          handleChange(
                            "GioiTinh",
                            e.target.checked ? "Nữ" : "Nam"
                          )
                        }
                      />{" "}
                      Nữ
                    </label>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-2">
                    <label className="me-3">Email:</label>
                    <input
                      className="form-control"
                      type="email"
                      value={employeeInfo.Email}
                      onChange={(e) => handleChange("Email", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="ms-3 me-3">Liên hệ:</label>
                    <input
                      className="form-control"
                      type="text"
                      value={employeeInfo.LienHe}
                      onChange={(e) => handleChange("LienHe", e.target.value)}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-2">
                    <label className="ms-3 me-3">Ngày sinh:</label>
                    <input
                      style={{ width: "206px" }}
                      className="form-control"
                      type="date"
                      value={employeeInfo.NgaySinh}
                      onChange={(e) => handleChange("NgaySinh", e.target.value)}
                    />

                    <div></div>
                  </div>
                </div>
                <div className="w-50 mb-3">
                  <label>Địa chỉ:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={employeeInfo.DiaChi}
                    onChange={(e) => handleChange("DiaChi", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-3"></div>
              <div className="col">
                <button
                  className="btn btn-success main-content"
                  onClick={handleSave}
                >
                  Lưu thông tin
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="main-body text-danger">
          Vui lòng đăng nhập tài khoản ...
        </p>
      )}
      <ToastContainer />
    </>
  );
};

export default Employee_info;
