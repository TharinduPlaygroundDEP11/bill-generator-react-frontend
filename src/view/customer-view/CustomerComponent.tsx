import "./CustomerComponent.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBillStore } from "../../Store";
import { ToastContainer, toast } from "react-toastify";

function CustomerComponent() {
  const navigate = useNavigate();
  const billStore = useBillStore();
  const [accountNumber, setAcountNumber] = useState("");
  const toastError = (message:string)=>{
    toast.error(`${message}`, {
      position: "top-center",
      theme: "colored"
    });
  };

  const handleViewBillClick = async () => {
    if (!accountNumber) {
      toastError("You should enter an account number to generate the bill!");
      return;
    } else {
      try {
        const response = await fetch(
          `http://localhost:8000/api/get/${accountNumber}`
        );

        if (response.ok) {
          const data = await response.json();

          if (data) {
            billStore.setValues(+accountNumber);
            navigate("../bill");
          } else {
            toastError("Error!, try again!")
          }
        } else {
          if (response.status === 404) {
            toastError("No records to calculate the bill!")
          } else {
            toastError("Invalid Account Number!");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="customer-component d-flex vw-100 justify-content-center align-items-center red-hat">
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

            <div className="d-flex align-items-center gap-3 mt-2 customer-button-container">
              <div
                className="customer-button"
                onClick={() => navigate("../")}
              >
                Cancel
              </div>
              <div
                className="customer-button"
                onClick={handleViewBillClick}
              >
                Generate
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer closeOnClick autoClose={1500}/>
    </>
  );
}

export default CustomerComponent;
