import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeHeader from "@/components/HomeLayout/HomeHeader";
import HomeFooter from "@/components/HomeLayout/HomeFooter";

const ThongtinUser = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kiểm tra xem có userId đã lưu trong Local Storage không
    const userId = localStorage.getItem("userId");
    if (userId && !userInfo) {
      // Nếu có userId và userInfo chưa được thiết lập, thực hiện yêu cầu để lấy thông tin người dùng
      axios
        .get(`http://localhost:2024/api/account/user-info/${userId}`)
        .then((response) => {
          setUserInfo(response.data.userInfo);
          console.log("Thông tin user:", response.data.userInfo);
          setIsLoggedIn(true); // Đánh dấu đã đăng nhập
        })
        .catch((error) => {
          console.error("Error retrieving user information:", error);
        });
    }
  }, [userInfo]);

  const handleChange = (fieldName, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [fieldName]: value,
    }));
  };

  const handleSave = () => {
    axios
      .put("http://localhost:2024/api/account/update/user-info", userInfo) // Gửi dữ liệu thông tin cá nhân lên máy chủ
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

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const changeAvatar = async () => {
    const userId = localStorage.getItem("userId");
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

  return (
    <div>
      <HomeHeader />
      {userInfo ? (
        <div style={{ paddingTop: "50px" }} className="main-content mt-5">
          <div className="row">
            <div className="col">
              <ul
                style={{ marginTop: "1rem", paddingRight: "5rem" }}
                className="nav-ttcn px-5"
              >
                <li>
                  <Link href="/thongtinuser">
                    <i className="fa fa-user me-2"></i>Hồ sơ cá nhân
                  </Link>
                </li>
                <li>
                  <Link href="/touryeuthich">
                    <i className="fa-solid fa-layer-group me-2"></i>Tour đã lưu
                  </Link>
                </li>
                <li>
                  <Link href="/history-booking">
                    <i className="fa-solid fa-business-time me-2"></i>Lịch sử
                    thanh toán
                  </Link>
                </li>
                <li>
                  <Link href="/phanhoi">
                    <i className="fa-solid fa-inbox me-2"></i>
                    Hộp thư
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-9">
              <h4>THÔNG TIN CÁ NHÂN</h4>
              <div className="d-flex">
                <div className="me-5 mt-3">
                  <label className="fw-bolder">Ảnh đại diện</label>
                  <div className="d-flex align-items-center">
                    <Image
                      className="rounded"
                      width={"200"}
                      height={"200"}
                      style={{ width: "200px", height: "200px" }}
                      src={
                        userInfo.Avatar_URL
                          ? `http://localhost:2024/${userInfo.Avatar_URL}`
                          : "/avatar/avatar_default.jpg"
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
                    Thay đổi avatar
                  </button>
                </div>
                <div className="">
                  <div className="d-flex align-items-center my-3">
                    <div className="me-2">
                      <label htmlFor="taikhoan" className="me-3 fw-bolder">
                        Tài khoản
                      </label>
                      <input
                        id="taikhoan"
                        className="form-control"
                        type="text"
                        value={userInfo.TaiKhoan}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="fw-bolder">
                        Mật khẩu{" "}
                        <span className="text-danger">(Thay đổi mật khẩu)</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={userInfo.MatKhau}
                        onChange={(e) =>
                          handleChange("MatKhau", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div>
                      <label className="me-3 fw-bolder">Họ và tên</label>
                      <input
                        className="form-control"
                        type="text"
                        value={userInfo.HoTen}
                        onChange={(e) => handleChange("HoTen", e.target.value)}
                      />
                    </div>
                    <div></div>
                    <div>
                      <label className="ms-3 me-3 fw-bolder">Giới tính</label>
                      <label>
                        <input
                          type="checkbox"
                          checked={userInfo.GioiTinh === "Nam"}
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
                          checked={userInfo.GioiTinh === "Nữ"}
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
                      <label className="me-3 fw-bolder">Email</label>
                      <input
                        className="form-control"
                        type="email"
                        value={userInfo.Email}
                        onChange={(e) => handleChange("Email", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="fw-bolder">Liên hệ</label>
                      <input
                        className="form-control"
                        type="text"
                        value={userInfo.LienHe}
                        onChange={(e) => handleChange("LienHe", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-2">
                      <label className="fw-bolder">Ngày sinh</label>
                      <input
                        style={{ width: "206px" }}
                        className="form-control"
                        type="date"
                        value={userInfo.NgaySinh}
                        onChange={(e) =>
                          handleChange("NgaySinh", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="fw-bolder">Địa chỉ</label>
                    <input
                      className="form-control"
                      type="text"
                      value={userInfo.DiaChi}
                      onChange={(e) => handleChange("DiaChi", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <button className="btn btn-success" onClick={handleSave}>
                Lưu thông tin
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p
          style={{ marginTop: "50px" }}
          className="main-content p-5 text-danger"
        >
          Không thể lấy thông tin người dùng...
        </p>
      )}
      <ToastContainer />
      <HomeFooter />
    </div>
  );
};

export default ThongtinUser;
