import { useNavigate } from "react-router-dom";
import { useBillStore } from "../../Store";
import "./Bill.css";

function Bill() {
  const navigate = useNavigate();
  const {
    customerName,
    lastDate,
    lastValue,
    previousDate,
    previousValue,
    totalUnits,
    firstRangeAmount,
    secondRangeAmount,
    thirdRangeAmount,
    totalAmount,
  } = useBillStore();
  return (
    <>
      <div className="bill-bg vw-100 vh-100 d-flex justify-content-center align-items-center red-hat">
        <div className="bill-container d-flex flex-column shadow-lg p-3 mb-5 bg-body-tertiary rounded">
          <div className="bill-header d-flex justify-content-between border-bottom pb-2 mb-1">
            <div className="fs-4 fw-bold bill-title">Bill of {customerName}</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                navigate("../");
              }}
            ></button>
          </div>
          <div className="bill-body d-flex align-items-center">
            <div className="bill-image"></div>
            <div className="bill-details">
              <div className="d-flex justify-content-between mb-1">
                <div>Last Reading Date : </div>
                <div>{lastDate}</div>
              </div>

              <div className="d-flex justify-content-between mb-1">
                <div>Last Reading Value : </div>
                <div>{lastValue}</div>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <div>Previous Reading : </div>
                <div>{previousDate}</div>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <div>Previous Reading Value : </div>
                <div>{previousValue}</div>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <div>First Range Amount : </div>
                <div>Rs.{firstRangeAmount}</div>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <div>Second Range Amount : </div>
                <div>Rs.{secondRangeAmount}</div>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <div>Third Range Amount : </div>
                <div>Rs.{thirdRangeAmount}</div>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <div>Total Units : </div>
                <div>{totalUnits}</div>
              </div>
              <div className="d-flex justify-content-between mt-2 fw-bold">
                <div>Total Amount : </div>
                <div>Rs.{totalAmount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bill;
