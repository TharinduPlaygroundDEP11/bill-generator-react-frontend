import "./CustomerComponent.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBillStore } from "../../Store";


function CustomerComponent() {
  const navigate = useNavigate();
  const billStore = useBillStore();
  const [accountNumber, setAcountNumber] = useState(0);

  const handleViewBillClick = () => {
    billStore.setValues(accountNumber);
    navigate("../bill");
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
                onChange={(e)=>setAcountNumber(+e.target.value)}
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
                Get Bill
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerComponent;
