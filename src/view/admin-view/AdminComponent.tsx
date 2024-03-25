import { useState } from "react";
import "./AdminComponent.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminComponent() {
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [reading, setReading] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSaveClick = async () => {
    let formattedDate = "";
    if (selectedDate !== null) {
      const year = selectedDate?.getFullYear();
      const month = ("0" + (selectedDate!.getMonth() + 1)).slice(-2);
      const day = ("0" + selectedDate?.getDate()).slice(-2);
      formattedDate = `${year}-${month}-${day}`;
    }
    try {
      const response = await fetch("http://localhost:8000/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: accountNumber,
          date: formattedDate,
          value: reading,
        }),
      });

      if (response.status === 201) {
        navigate("../home");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Saved Reading",
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error!",
          text: "Invalid Input values!",
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(response);
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: "Check your inputs, They can't be empty!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <div className="admin-component d-flex vw-100 justify-content-center align-items-center">
        <div className="d-flex justify-content-around align-items-center gap-3 admin-items-container">
          <div className="admin-image"></div>

          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            <div className="admin-header fs-4 fw-bold">Add Meter Reading</div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="xxxxxxx"
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <label htmlFor="floatingInput">Account Number</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                placeholder="xxxxxxx"
                onChange={(e) => setReading(+e.target.value)}
              />
              <label htmlFor="floatingInput">Meter Reading</label>
            </div>

            <div className="date-picker mb-3">
              <DatePicker
                className="form-control"
                placeholderText="Select Reading Date"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
              />
            </div>

            <div className="d-flex align-items-center gap-3 mt-2">
              <div
                className="admin-button text-center d-flex align-items-center justify-content-center border rounded-2"
                onClick={() => navigate("../")}
              >
                Cancel
              </div>
              <div
                className="admin-button text-center d-flex align-items-center justify-content-center border rounded-2"
                onClick={handleSaveClick}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminComponent;
