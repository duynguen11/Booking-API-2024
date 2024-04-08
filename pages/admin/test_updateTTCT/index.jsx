import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateTTCT = () => {
  const [schedules, setSchedules] = useState([
    {
      NgayThamQuan: "",
      DiaDiem: "",
      NoiDung: "",
    },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSchedules = [...schedules];
    updatedSchedules[index][name] = value;
    setSchedules(updatedSchedules);
  };

  const id = 17; // Thay YOUR_ID_VALUE bằng giá trị id bạn muốn sử dụng
  const handleSubmit = async (e) => {
    e.preventDefault();

    schedules.forEach(async (schedule) => {
      const { NgayThamQuan, DiaDiem, NoiDung } = schedule;

      console.log("Giá trị trước khi gửi yêu cầu:");
      console.log("Ngày Thăm Quan:", NgayThamQuan);
      console.log("Địa Điểm:", DiaDiem);
      console.log("Nội Dung:", NoiDung);

      try {
        console.log("Sending data:", { NgayThamQuan, DiaDiem, NoiDung });
        const response = await axios.put(
          `http://localhost:2024/api/tour/update-schedule/${id}`,
          { NgayThamQuan, DiaDiem, NoiDung }
        );
        console.log("Response:", response.data);
        // Đoạn mã xử lý phản hồi từ máy chủ ở đây (nếu cần)
      } catch (error) {
        console.error("Error:", error);
        // Xử lý lỗi ở đây (nếu cần)
      }
    });
  };

  const handleCreateAnotherSchedule = () => {
    setSchedules([
      ...schedules,
      { NgayThamQuan: "", DiaDiem: "", NoiDung: "" },
    ]);
  };

  return (
    <div>
      {schedules.map((schedule, index) => (
        <div key={index}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ngày Thăm Quan"
              name="NgayThamQuan"
              value={schedule.NgayThamQuan}
              onChange={(e) => handleChange(e, index)}
            />
            <input
              type="text"
              placeholder="Địa Điểm"
              name="DiaDiem"
              value={schedule.DiaDiem}
              onChange={(e) => handleChange(e, index)}
            />
            <textarea
              cols="30"
              rows="10"
              placeholder="Nội Dung"
              name="NoiDung"
              value={schedule.NoiDung}
              onChange={(e) => handleChange(e, index)}
            ></textarea>
            <button type="submit">Gửi</button>
          </form>
        </div>
      ))}
      <button onClick={handleCreateAnotherSchedule}>Tạo thêm lịch</button>
    </div>
  );
};

export default UpdateTTCT;
