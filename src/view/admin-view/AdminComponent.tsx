import { useState } from "react";
import "./AdminComponent.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function AdminComponent() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSaveClick = () => {};

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
              />
              <label htmlFor="floatingInput">Account Number</label>
            </div>
    
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                placeholder="xxxxxxx"
              />
              <label htmlFor="floatingInput">Meter Reading</label>
            </div>

            <div className="date-picker mb-3">
              <DatePicker
                className="form-control"
                placeholderText="Select Reading Date"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd-MM-yyyy"
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
