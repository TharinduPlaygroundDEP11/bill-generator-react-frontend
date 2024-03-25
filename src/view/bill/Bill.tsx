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
      <div className="bill-bg vw-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="bill-container d-flex flex-column shadow-lg p-3 mb-5 bg-body-tertiary rounded">
          <div className="bill-header d-flex justify-content-between border-bottom pb-2 mb-4">
            <div className="fs-5 fw-bold">Bill of {customerName}</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={()=> {navigate('../')}}
            ></button>
          </div>
          <div className="bill-body">
            <div>Last Reading Date : {lastDate}</div>
            <div>Last Reading Value : {lastValue}</div>
            <div>Previous Reading : {previousDate}</div>
            <div>Previous Reading Value : {previousValue}</div>
            <div>First Range Amount : Rs.{firstRangeAmount}</div>
            <div>Second Range Amount : Rs.{secondRangeAmount}</div>
            <div>Third Range Amount : Rs.{thirdRangeAmount}</div>
            <div>Total Units : {totalUnits}</div>
            <div>Total Amount : Rs.{totalAmount}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bill;
