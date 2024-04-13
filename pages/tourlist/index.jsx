import React, { useState, useEffect, useContext } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeLayout from "@/components/HomeLayout/HomeLayout";
import axios from "axios";
import Image from "next/image";
import HomeFooter from "@/components/HomeLayout/HomeFooter";
import { Form, InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import { RingLoader } from "react-spinners";
import ScrollToTop from "@/components/HomeLayout/ScrollToTop";
import CardDataPagination from "@/components/HomeLayout/CardDataPagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TourList = () => {
  const [initialTour, setInitialTour] = useState([]);
  const [sortType, setSortType] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [maxTourPrice, setMaxTourPrice] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [uniqueAreas, setUniqueAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [isDefaultContentVisible, setIsDefaultContentVisible] = useState(true);
  const [isCategoryContentVisible, setIsCategoryContentVisible] =
    useState(false);
  const [isDateContentVisible, setIsDateContentVisible] = useState(false);
  const [prevSelectedCategory, setPrevSelectedCategory] = useState(null);
  const [tour, setTour] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleChangeDataSave = async (maTour) => {
    try {
      const userId = parseInt(localStorage.getItem("userId"));
      // Kiểm tra nếu không có userId
      if (!userId || isNaN(userId)) {
        setShowModal(true);
        return; // Kết thúc hàm nếu không có userId
      }

      // Thực hiện request POST với Axios
      const response = await axios.post(
        "http://localhost:2024/api/tour/touryeuthich",
        {
          MaTour: maTour,
          MaTaikhoan: userId,
        }
      );
      console.log("Response:", response.data);
      if (response.status === 200) {
        toast.success("Đã lưu vào danh sách yêu thích.");
        // Xử lý thành công, có thể thực hiện các hành động khác ở đây nếu cần
      }
      // Xử lý khi request thành công
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu tour:", error);
      // Xử lý khi request thất bại
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (selectedDate) {
      setIsDefaultContentVisible(false);
      setIsCategoryContentVisible(false);
      setIsDateContentVisible(true);
    } else if (selectedLocation) {
      setIsDefaultContentVisible(false);
      setIsCategoryContentVisible(false);
      setIsDateContentVisible(true);
    } else if (selectedArea) {
      setIsDefaultContentVisible(false);
      setIsCategoryContentVisible(false);
      setIsDateContentVisible(true);
    } else {
      setIsDefaultContentVisible(true);
      setIsCategoryContentVisible(false);
      setIsDateContentVisible(false);
    }
  }, [selectedDate, selectedLocation, selectedArea]);

  useEffect(() => {
    if (
      prevSelectedCategory &&
      selectedCategory &&
      prevSelectedCategory !== selectedCategory
    ) {
      setSelectedDate("");
      setSelectedLocation("");
      setSelectedArea(""); // Reset selectedDate to false when switching from selectedCategory
    } else if (selectedCategory && !selectedDate && !selectedDate) {
      // Trường hợp chỉ có selectedCategory được chọn
      setIsDefaultContentVisible(false);
      setIsCategoryContentVisible(true);
      setIsDateContentVisible(false);
    } else if (!selectedCategory && selectedDate && !selectedDate) {
      // Trường hợp chỉ có selectedDate được chọn
      setIsDefaultContentVisible(false);
      setIsCategoryContentVisible(false);
      setIsDateContentVisible(true);
    } else if (!selectedCategory && !selectedDate && selectedDate) {
      // Trường hợp chỉ có selectedDate được chọn
      setIsDefaultContentVisible(false);
      setIsCategoryContentVisible(false);
      setIsDateContentVisible(true);
    } else if (selectedCategory && selectedDate && !selectedDate) {
      // Trường hợp có cả selectedCategory và selectedDate được chọn
      setIsDefaultContentVisible(false);
      setIsCategoryContentVisible(true);
      setIsDateContentVisible(true);
    } else if (selectedCategory && !selectedDate && selectedDate) {
      // Trường hợp có cả selectedCategory và selectedDate được chọn
      setIsDefaultContentVisible(false);
      setIsCategoryContentVisible(true);
      setIsDateContentVisible(true);
    } else if (!selectedCategory && selectedDate && selectedDate) {
      // Trường hợp có cả selectedDate và selectedDate được chọn
      setIsDefaultContentVisible(false);
      setIsCategoryContentVisible(false);
      setIsDateContentVisible(true);
    } else if (selectedCategory && selectedDate && selectedDate) {
      // Trường hợp có cả selectedCategory, selectedDate và selectedDate được chọn
      setIsDefaultContentVisible(false);
      setIsCategoryContentVisible(true);
      setIsDateContentVisible(true);
    } else {
      // Trường hợp không có giá trị nào được chọn
      setIsDefaultContentVisible(true);
      setIsCategoryContentVisible(false);
      setIsDateContentVisible(false);
    }
    setPrevSelectedCategory(selectedCategory);
  }, [selectedCategory, prevSelectedCategory, selectedDate]);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setPriceValue(newValue);
    setDisplayValue(newValue);
    const maxTourPrice = Math.max(...tour.map((t) => t.GiaTour));
    // Filter tours based on price range
    const filteredTour = tour.filter((t) => {
      return t.GiaTour <= newValue;
    });

    setTour(filteredTour); // Update tour state with filtered data
  };

  useEffect(() => {
    // Giả lập thời gian load
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1111); // Thời gian delay là 2 giây
    // Xóa timeout khi component bị unmount
    return () => clearTimeout(timeout);
  }, []);

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
    const storedTour = localStorage.getItem("tour");
    if (storedTour) {
      setTour(JSON.parse(storedTour));
    }
  }, []);

  const handleChangeChude = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Hàm useEffect để fetch dữ liệu ban đầu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2024/api/tour");
        setTour(response.data);
        setInitialTour(response.data);
        const maxPrice = Math.max(...response.data.map((t) => t.GiaTour));
        setMaxTourPrice(maxPrice);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Lọc ra các giá trị duy nhất của NoiKhoiHanh từ tour
    const locations = tour.map((tourItem) => tourItem.NoiKhoiHanh);
    const uniqueLocations = [...new Set(locations)];
    setUniqueLocations(uniqueLocations);

    const areas = tour.map((tourItem) => tourItem.DiemDen);
    const uniqueAreas = [...new Set(areas)];
    setUniqueAreas(uniqueAreas);
  }, [tour]);

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setSelectedLocation(selectedLocation); // Cập nhật giá trị địa điểm được chọn
  };

  const handleAreaChange = (e) => {
    const selectedArea = e.target.value;
    setSelectedArea(selectedArea); // Cập nhật giá trị địa điểm được chọn
  };

  // Hàm useEffect để sắp xếp dữ liệu khi sortType thay đổi
  /*useEffect(() => {
    if (sortType === "price-desc") {
      const sortedTour = [...tour].sort((a, b) => b.GiaTour - a.GiaTour);
      setTour(sortedTour);
    } else if (sortType === "price-asc") {
      const sortedTour = [...tour].sort((a, b) => a.GiaTour - b.GiaTour);
      setTour(sortedTour);
    } else {
      // Reset lại state `tour` về dữ liệu ban đầu
      setTour(initialTour);
    }
  }, [sortType, initialTour]);*/
  // Dùng tour ở đây để đảm bảo useEffect cập nhật khi tour thay đổi

  useEffect(() => {
    if (sortType === "price-desc") {
      const sortedTour = [...initialTour].sort((a, b) => b.GiaTour - a.GiaTour);
      setTour(sortedTour);
    } else if (sortType === "price-asc") {
      const sortedTour = [...initialTour].sort((a, b) => a.GiaTour - b.GiaTour);
      setTour(sortedTour);
    } else {
      // Reset lại state `tour` về dữ liệu ban đầu
      setTour(initialTour);
    }
  }, [sortType, initialTour]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [cardDataPerPage] = useState(12); // Số lượng dữ liệu hiển thị trên mỗi trang

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Tính toán phạm vi dữ liệu cho trang hiện tại
  const indexOfLastCardData = currentPage * cardDataPerPage;
  const indexOfFirstCardData = indexOfLastCardData - cardDataPerPage;
  const currentCardData = tour.slice(indexOfFirstCardData, indexOfLastCardData);

  function formatToDisplay(dateString) {
    if (!dateString || isNaN(Date.parse(dateString))) return ""; // Handle cases where dateString is not provided or is invalid

    // Create a Date object from the provided date string
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();

    // Return formatted date string in dd-mm-yyyy format
    return `${day}-${month}-${year}`;
  }

  const handleDateChange = (e) => {
    const selectedDateValue = formatToDisplay(e.target.value);
    setSelectedDate(selectedDateValue);
  };

  function formatDate(dateString) {
    // Create a Date object from the provided date string
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();

    // Return formatted date string in dd/mm/yyyy format
    return `${day}-${month}-${year}`;
  }

  const filteredTours = tour.filter((tourItem) => {
    const formattedSelectedDate = formatToDisplay(selectedDate);
    const formattedTourDate = formatToDisplay(tourItem.NgayKhoiHanh);

    const isDateFiltered =
      !selectedDate || formattedTourDate === formattedSelectedDate;
    const isLocationFiltered =
      !selectedLocation || tourItem.NoiKhoiHanh === selectedLocation;
    const isAreaFiltered = !selectedArea || tourItem.DiemDen === selectedArea;

    return isDateFiltered && isLocationFiltered && isAreaFiltered;
  });

  return (
    <>
      <HomeLayout />
      <Modal className="mt-5" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Phản hồi từ hệ thống</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-danger fw-bolder">
          Vui lòng đăng nhập để sử dụng tính năng này.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
      {loading ? (
        <div className="loading">
          <RingLoader color="rgba(40, 67, 135, 1)" loading={true} size={100} />
        </div>
      ) : (
        <div style={{ marginTop: "100px" }} className="container">
          <div className="row">
            <div style={{ fontSize: "17px" }} className="col-md-3">
              <h4 className="mb-4 fw-bolder">LỌC THEO YÊU CẦU</h4>
              <div className="">
                <p className="mb-0 fw-bolder">
                  Tìm kiếm theo tên/ ngày tham quan:
                </p>
                <InputGroup className="">
                  <InputGroup.Text>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="Nhập tên hoặc ngày tham quan..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </InputGroup>
              </div>{" "}
              <div className="">
                <label className=" fw-bolder mt-3">Loại hình du lịch:</label>
                <select
                  id="sortSelect"
                  className="form-select"
                  onChange={handleChangeChude}
                  value={selectedCategory}
                >
                  <option value="">Tất cả chủ đề</option>
                  {category.map((c, index) => {
                    return (
                      <option key={index} value={c.TenChuDe}>
                        {c.TenChuDe}
                      </option>
                    );
                  })}
                </select>
              </div>{" "}
              <div className="">
                <label className="fw-bolder mt-3">Điểm xuất phát:</label>
                <select
                  id="locationSelect"
                  className="form-select"
                  name="locationSelect"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                >
                  <option value="">Tất cả địa điểm</option>
                  {uniqueLocations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>{" "}
              <div className="">
                <label className="fw-bolder mt-3">Điểm đến:</label>
                <select
                  id="ariaSelect"
                  className="form-select"
                  name="ariaSelect"
                  value={selectedArea}
                  onChange={handleAreaChange}
                >
                  <option value="">Tất cả địa điểm</option>
                  {uniqueAreas.map((area, index) => (
                    <option key={index} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>{" "}
              <div className="">
                <label htmlFor="selectedDate" className="mb-1 fw-bolder mt-3">
                  Ngày giờ di chuyển:
                </label>
                <input
                  type="date"
                  id="selectedDate"
                  name="selectedDate"
                  className="form-select"
                  value={formatToDisplay(selectedDate)}
                  onChange={handleDateChange}
                />
                {selectedDate && (
                  <p className="mt-2">{formatToDisplay(selectedDate)}</p>
                )}
              </div>
              <div className="">
                <Form>
                  <Form.Group controlId="formRange">
                    <Form.Label className="fw-bolder">
                      Khảo sát giá cả:
                    </Form.Label>
                    <Form.Range
                      className="form-control p-3"
                      min={0}
                      max={maxTourPrice}
                      value={priceValue}
                      onChange={handleChange}
                    />
                    <Form.Label>
                      Khoảng giá: {(priceValue / 1000000).toFixed(1)} triệu VND
                    </Form.Label>
                  </Form.Group>
                </Form>
              </div>{" "}
            </div>
            <div className="col-md-9">
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="fw-bolder">DANH SÁCH TOUR</h4>
                <div className="sort-container d-flex align-items-center">
                  <label htmlFor="sortSelect" className="form-label mb-0 w-100">
                    Sắp xếp theo:
                  </label>
                  <select
                    style={{ width: "auto" }}
                    id="sortSelect"
                    className="form-select ms-2"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                  >
                    <option value="newest">Tour mới nhất</option>
                    <option value="price-desc">Giá giảm dần</option>
                    <option value="price-asc">Giá tăng dần</option>
                  </select>
                </div>
              </div>

              {isCategoryContentVisible && (
                <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
                  {currentCardData.map((t) => {
                    if (
                      searchTerm === "" ||
                      t.TenTour.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      ) ||
                      t.ThoiGian.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      ) ||
                      t.NoiKhoiHanh.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      )
                    ) {
                      if (
                        t.TenChuDe === selectedCategory ||
                        selectedCategory === ""
                      ) {
                        return (
                          <div className="col" key={t.MaTour}>
                            <div className="shadow p-2 rounded card-save">
                              <div
                                style={{
                                  backgroundColor: "white",
                                  borderRadius: "2rem",
                                }}
                                className="btn btn-outline save-button"
                                onClick={() => handleChangeDataSave(t.MaTour)}
                              >
                                <i className="fa-solid fa-heart"></i>
                              </div>
                              <Image
                                width={'300'}
                                height={"220"}
                                src={t.URL}
                                className="card-img-top rounded"
                                alt={t.TenTour}
                              />
                              <div className="card-body pt-3">
                                <h4 className="ps-2 card-title fw-bolder">
                                  {t.TenTour}
                                </h4>
                                <div className="ps-2 pb-3 fw-bolder text-secondary">
                                  <p className="card-title">
                                    <i className="fa-solid fa-ticket"></i>
                                    Mã tour: {t.MaTour}
                                  </p>
                                  <h6
                                    style={{ color: "#007bff" }}
                                    className="card-text mb-0"
                                  >
                                    {t.TenChuDe}
                                  </h6>
                                  <hr className="my-2" />
                                  <p className="card-title">
                                    Nơi khởi hành: {t.NoiKhoiHanh}
                                  </p>
                                  <p className="card-title">
                                    Điểm đến: {t.DiemDen}
                                  </p>
                                  <p className="card-title">
                                    Ngày di chuyển: {t.NgayKhoiHanh}
                                  </p>
                                  <p className="card-title">
                                    Thời gian tham quan: {t.ThoiGian}
                                  </p>
                                  <p className="card-text mb-0">
                                    Giá vé:{" "}
                                    <span className="text-hot">
                                      {t.GiaTour / 1000000} triệu VND
                                    </span>
                                    /người
                                  </p>
                                </div>
                                <div className="d-flex justify-content-end">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div
                                      style={{
                                        backgroundColor: "rgba(40, 67, 135, 1)",
                                      }}
                                      className="d-flex align-items-center btn btn-secondary me-2"
                                    >
                                      <a
                                        href={`/booking/${t.MaTour}`}
                                        className="text-decoration-none text-white fw-bolder"
                                      >
                                        Đặt vé ngay
                                      </a>
                                    </div>
                                  </div>
                                  <a
                                    href={`/thongtintour/${t.MaTour}`}
                                    className="btn btn-outline-secondary fw-bolder"
                                  >
                                    Xem chi tiết
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    }
                    return null;
                  })}
                </div>
              )}
              {isDateContentVisible && (
                <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
                  {filteredTours.map((t) => (
                    <div className="col" key={t.MaTour}>
                      <div className="shadow p-2 rounded card-save">
                        <div
                          style={{
                            backgroundColor: "white",
                            borderRadius: "2rem",
                          }}
                          className="btn btn-outline save-button"
                          onClick={() => handleChangeDataSave(t.MaTour)}
                        >
                          <i class="fa-solid fa-heart"></i>
                        </div>
                        <Image
                        width={'300'}
                          height={"220"}
                          src={t.URL}
                          className="card-img-top rounded"
                          alt={t.TenTour}
                        />
                        <div className="card-body pt-3">
                          <h4 className="ps-2 card-title fw-bolder">
                            {t.TenTour}
                          </h4>
                          <div className="ps-2 pb-3 fw-bolder text-secondary">
                            <p className="card-title">
                              <i class="fa-solid fa-ticket"></i> Mã tour:{" "}
                              {t.MaTour}
                            </p>
                            <h6
                              style={{ color: "#007bff" }}
                              className="card-text mb-0"
                            >
                              {t.TenChuDe}
                            </h6>
                            <hr className="my-2" />
                            <p className="card-title">
                              Nơi khởi hành: {t.NoiKhoiHanh}
                            </p>
                            <p className="card-title">Điểm đến: {t.DiemDen}</p>
                            <p className="card-title">
                              Thời gian tham quan: {t.ThoiGian}
                            </p>
                            <p className="card-title">
                              Ngày di chuyển: {t.NgayKhoiHanh}
                            </p>
                            <p className="card-text mb-0">
                              Giá vé:{" "}
                              <span className="text-hot">
                                {t.GiaTour / 1000000} triệu VND
                              </span>
                              /người
                            </p>
                          </div>
                          <div className="d-flex justify-content-end">
                            <div className="d-flex align-items-center justify-content-between">
                              <div
                                style={{
                                  backgroundColor: "rgba(40, 67, 135, 1)",
                                }}
                                className="d-flex align-items-center btn btn-secondary me-2"
                              >
                                <a
                                  href={`/booking/${t.MaTour}`}
                                  className="text-decoration-none text-white fw-bolder"
                                >
                                  Đặt vé ngay
                                </a>
                              </div>
                            </div>
                            <a
                              href={`/thongtintour/${t.MaTour}`}
                              className="btn btn-outline-secondary fw-bolder"
                            >
                              Xem chi tiết
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {isDefaultContentVisible && (
                <div className="mt-3">
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {currentCardData.map((t) => {
                      if (
                        searchTerm === "" ||
                        t.TenTour.toLowerCase().includes(
                          searchTerm.toLowerCase()
                        ) ||
                        t.ThoiGian.toLowerCase().includes(
                          searchTerm.toLowerCase()
                        ) ||
                        t.NoiKhoiHanh.toLowerCase().includes(
                          searchTerm.toLowerCase()
                        ) ||
                        t.DiemDen.toLowerCase().includes(
                          searchTerm.toLowerCase()
                        ) ||
                        t.TenChuDe.toLowerCase().includes(
                          searchTerm.toLowerCase()
                        )
                      ) {
                        return (
                          <div className="col" key={t.MaTour}>
                            <div className="shadow p-2 rounded card-save">
                              <div
                                style={{
                                  backgroundColor: "white",
                                  borderRadius: "2rem",
                                }}
                                className="btn btn-outline save-button"
                                onClick={() => handleChangeDataSave(t.MaTour)}
                              >
                                <i class="fa-solid fa-heart"></i>
                              </div>
                              <Image
                              width={'300'}
                                height={"220"}
                                src={t.URL}
                                className="card-img-top rounded"
                                alt={t.TenTour}
                              />
                              <div className="card-body pt-3">
                                <h4 className="ps-2 card-title fw-bolder">
                                  {t.TenTour}
                                </h4>
                                <div className="ps-2 pb-3 fw-bolder text-secondary">
                                  <p className="card-title">
                                    <i class="fa-solid fa-ticket"></i> Mã tour:{" "}
                                    {t.MaTour}
                                  </p>
                                  <h6
                                    style={{ color: "#007bff" }}
                                    className="card-text mb-0"
                                  >
                                    {t.TenChuDe}
                                  </h6>
                                  <hr className="my-2" />
                                  <p className="card-title">
                                    Nơi khởi hành: {t.NoiKhoiHanh}
                                  </p>
                                  <p className="card-title">
                                    Điểm đến: {t.DiemDen}
                                  </p>
                                  <p className="card-title">
                                    Thời gian tham quan: {t.ThoiGian}
                                  </p>
                                  <p className="card-title">
                                    Ngày di chuyển: {formatDate(t.NgayKhoiHanh)}
                                  </p>
                                  <p className="card-text mb-0">
                                    Giá vé:{" "}
                                    <span className="text-hot">
                                      {t.GiaTour / 1000000} triệu VND
                                    </span>
                                    /người
                                  </p>
                                </div>
                                <div className="d-flex justify-content-end">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div
                                      style={{
                                        backgroundColor: "rgba(40, 67, 135, 1)",
                                      }}
                                      className="d-flex align-items-center btn btn-secondary me-2"
                                    >
                                      <a
                                        href={`/booking/${t.MaTour}`}
                                        className="text-decoration-none text-white fw-bolder"
                                      >
                                        Đặt vé ngay
                                      </a>
                                    </div>
                                  </div>
                                  <a
                                    href={`/thongtintour/${t.MaTour}`}
                                    className="btn btn-outline-secondary fw-bolder"
                                  >
                                    Xem chi tiết
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  <div className="d-flex justify-content-center mt-4 fw-bolder">
                    <CardDataPagination
                      cardDataPerPage={cardDataPerPage}
                      totalCardData={tour.length}
                      paginate={paginate}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <ScrollToTop />
      <ToastContainer />
      <HomeFooter />
    </>
  );
};

export default TourList;
