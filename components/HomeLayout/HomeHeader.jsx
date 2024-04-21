import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import { Modal, Button, Form, Toast } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";

const HomeHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [localUserName, setLocalUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setLocalUserName(storedUserName);
    }
  }, []);

  const router = useRouter();
  const handleItemClick = useCallback(
    (path) => {
      router.push(path);
    },
    [router]
  );
  const activeItem = useMemo(() => router.pathname, [router.pathname]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameEmpty(e.target.value.trim() === "");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordEmpty(e.target.value.trim() === "");
  };

  const handleLogin = async () => {
    if (username.trim() === "") {
      setUsernameEmpty(true);
    } else {
      setUsernameEmpty(false);
    }

    if (password.trim() === "") {
      setPasswordEmpty(true);
    } else {
      setPasswordEmpty(false);
    }

    try {
      // Thực hiện xác thực người dùng và nhận thông tin người dùng từ server
      const response = await axios.post(
        "http://localhost:2024/api/account/user/login",
        {
          TaiKhoan: username,
          MatKhau: password,
        }
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.userName);
        router.reload();
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Vui lòng kiểm tra thông tin đăng nhập !");
        // Xử lý thông báo khi tài khoản đã tồn tại
      }
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    // Xóa dữ liệu người dùng từ localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    // Chuyển hướng người dùng về trang đăng nhập hoặc trang chính
    router.reload(); // Điều hướng đến trang đăng nhập
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2024/api/chude");
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const dropdownMenuList = document.querySelectorAll(".dropdown-menu");
    dropdownMenuList.forEach((dropdownMenu) => {
      const dropdownToggle =
        dropdownMenu.parentElement.querySelector(".dropdown-toggle");
      dropdownToggle.addEventListener("mouseover", () => {
        dropdownMenu.classList.add("show");
      });
      dropdownToggle.addEventListener("mouseleave", () => {
        dropdownMenu.classList.remove("show");
      });
      dropdownMenu.addEventListener("mouseover", () => {
        dropdownMenu.classList.add("show");
      });
      dropdownMenu.addEventListener("mouseleave", () => {
        dropdownMenu.classList.remove("show");
      });
    });
  }, []);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <nav
      style={{ position: "fixed", top: "0" }}
      className="navbar navbar-expand-lg navbar-light bg-light px-5 navbar-header"
    >
      <div className="container-fluid">
        <Link
          style={{ fontSize: "25px" }}
          className="navbar-brand fw-bolder text-logo"
          href="/"
        >
          <i className="fa-solid fa-dice-d20"></i> NEXT BOOKING
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul
            style={{ marginLeft: "50px" }}
            className="navbar-nav mb-2 mb-lg-0 fw-bolder header_home"
          >
            <li className="nav-item">
              <Link
                className={`nav-link ${activeItem === "/" ? "active" : ""}`}
                href="/"
              >
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  activeItem === "/tourlist" ? "active" : ""
                }`}
                href="/tourlist"
              >
                Du lịch
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dịch vụ khác{" "}
              </a>
              <ul
                className="dropdown-menu drop-header"
                aria-labelledby="navbarDropdown"
              >
                {category.map((c, index) => (
                  <li key={index}>
                    <Link className="dropdown-item" href="#">
                      {c.TenChuDe}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  activeItem === "/lienhe" ? "active" : ""
                }`}
                href="/lienhe"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center rounded fw-bolder">
            {localUserName ? (
              <div style={{ position: "relative" }}>
                <div style={{ cursor: "pointer" }} onClick={handleToggleModal}>
                  <p className="m-0 d-flex justify-content-between align-items-center">
                    <i className="fa-regular fa-face-smile me-1"></i>Xin chào,{" "}
                    <span className="text-danger ms-1"> {localUserName}</span>
                    <div className="py-1 px-2 ms-3 border rounded">
                      <i className="fa-solid fa-bars"></i>
                    </div>{" "}
                  </p>
                </div>
                {isModalOpen && (
                  <div
                    className="modal-box rounded border w-100 p-2 bg-white "
                    style={{ position: "absolute", top: "50px", zIndex: "999" }}
                  >
                    <Link href="/thongtinuser" className="nav-link ">
                      <i className="fa fa-user me-2"></i>Hồ sơ cá nhân
                    </Link>
                    <hr className="m-2" />
                    <Link href="/touryeuthich" className="nav-link">
                      <i className="fa-solid fa-layer-group me-2"></i>Tour đã
                      lưu
                    </Link>
                    <hr className="m-2" />
                    <Link href="/history-booking" className="nav-link">
                      <i className="fa-solid fa-business-time me-2"></i>Lịch sử
                      thanh toán
                    </Link>
                    <hr className="m-2" />
                    <button
                      className="btn btn-danger p-1 w-100"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                      <i className="fas fa-sign-out-alt ms-2"></i>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <a
                  className="p-2 btn btn-info text-white fw-bolder me-1"
                  href="/register"
                >
                  Đăng ký
                </a>
                <a
                  style={{ backgroundColor: "rgba(40, 67, 135, 1)" }}
                  className="nav-link p-2 text-white rounded "
                  href="#"
                  onClick={handleShow}
                >
                  Đăng Nhập
                  <i className="fa fa-user ms-2"></i>
                </a>
              </div>
            )}
          </div>
          <Modal
            className="mt-5 fw-bolder"
            show={showModal}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Vui Lòng Đăng Nhập Tài Khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label className="d-flex align-items-center">
                    <i className="fa-regular fa-user me-2"></i>Tài khoản
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={username}
                    onChange={handleUsernameChange}
                    isInvalid={usernameEmpty}
                    className={username !== "" && !usernameEmpty ? "" : ""}
                  />
                  {usernameEmpty && (
                    <Form.Text className="text-danger">
                      Vui lòng nhập tên đăng nhập.
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mt-3" controlId="formPassword">
                  <Form.Label>
                    <i className="fa-solid fa-unlock-keyhole me-2"></i>Mật khẩu
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={handlePasswordChange}
                    isInvalid={passwordEmpty}
                    className={password !== "" && !passwordEmpty ? "" : ""}
                  />
                  {passwordEmpty && (
                    <Form.Text className="text-danger">
                      Vui lòng nhập mật khẩu.
                    </Form.Text>
                  )}
                </Form.Group>
                <div className="py-3">
                  Hoặc
                  <div className="rounded border mt-2 p-1">
                    <Image
                      className="rounded me-2"
                      width={40}
                      height={40}
                      src={"/banner/Banner_10.jpg"}
                      alt="logo-login"
                    />
                    Đăng nhập với google
                  </div>
                  <div className="rounded border mt-2 p-1">
                    <Image
                      className="rounded me-2"
                      width={40}
                      height={40}
                      src={"/banner/Banner_11.jpg"}
                      alt="logo-login"
                    />
                    Đăng nhập với facebook
                  </div>
                </div>
                <Link href="/register">Bạn đã có tài khoản? Đăng ký.</Link>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="fw-bolder w-100 py-2"
                variant="primary"
                onClick={handleLogin}
              >
                Đăng nhập
              </Button>
            </Modal.Footer>
            <ToastContainer />
          </Modal>
        </div>
      </div>
    </nav>
  );
};

export default HomeHeader;
