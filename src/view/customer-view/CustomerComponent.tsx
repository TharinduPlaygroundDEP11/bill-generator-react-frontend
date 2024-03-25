import "./CustomerComponent.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBillStore } from "../../Store";
import Swal from "sweetalert2";
import axios from "axios";

function CustomerComponent() {
  const navigate = useNavigate();
  const billStore = useBillStore();
  const [accountNumber, setAcountNumber] = useState("");

  const handleViewBillClick = async () => {
    if (!accountNumber) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "You should enter an Account Number to view bill!",
        showConfirmButton: false,
        timer: 1800,
      });
      return;
    } else {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/get/${accountNumber}`
        );
        billStore.setValues(+accountNumber);
        navigate("../bill");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Invalid Acount Number!",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    }
  };

  return (
    <>
      <div className="customer-component d-flex vw-100 justify-content-center align-items-center">
        <div className="d-flex justify-content-around align-items-center gap-3 customer-items-container">
          <div className="customer-image"></div>

          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            <div className="customer-header fs-4 fw-bold">View Your Bill</div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="xxxxxxx"
                onChange={(e) => setAcountNumber(e.target.value)}
              />
              <label htmlFor="floatingInput">Account Number</label>
            </div>

            <div className="d-flex align-items-center gap-3 mt-2">
              <div
                className="customer-button text-center d-flex align-items-center justify-content-center border rounded-2"
                onClick={() => navigate("../")}
              >
                Cancel
              </div>
              <div
                className="customer-button text-center d-flex align-items-center justify-content-center border rounded-2"
                onClick={handleViewBillClick}
              >
                View Bill
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerComponent;
