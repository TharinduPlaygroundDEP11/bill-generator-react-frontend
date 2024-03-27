import { useNavigate } from "react-router-dom";
import { useBillStore } from "../../Store";
import "./Bill.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ToastContainer, toast } from "react-toastify";

function Bill() {
  const navigate = useNavigate();
  const {
    accountNumber,
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

  const toastError = (message:string)=>{
    toast.error(`${message}`, {
      position: "top-center",
      theme: "colored"
    });
  };

  const toastSuccess = (message:string)=>{
    toast.success(`${message}`, {
      position: "top-center",
      theme: "colored"
    });
  };

  const handleDownloadBill = () => {
    const content = document.getElementById("content");
    const elementsToHide = content!.querySelectorAll(".btn-close, .bill-image") as NodeListOf<HTMLElement>;
    elementsToHide.forEach((element) => {
      element.style.display = "none";
    });

    html2canvas(content!, { scale: 4 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "pt", "a5");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = pdfWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

        elementsToHide.forEach((element) => {
          element.style.display = "block";
        });

        pdf.save("downloaded-bill.pdf");
        toastSuccess("Your bill is downloaded");
      })
      .catch((err) => {
        console.log(err);
        toastError("Failed to download the bill, try again!");
      });
  };

  return (
    <>
    <ToastContainer closeOnClick autoClose={1000}/>
      <div className="bill-bg vw-100 vh-100 d-flex justify-content-center align-items-center red-hat">
        <div className="bill-container d-flex flex-column shadow-lg p-3 mb-5 bg-body-tertiary rounded">
          <div id="content">
            <div className="bill-header d-flex justify-content-between border-bottom pb-2 mb-1">
              <div className="fs-4 fw-bold bill-title">
                Bill of - {customerName}
              </div>
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
                <div className="bill-acc-number mt-2 mb-2">
                  Account Number: <span>{accountNumber}</span>
                </div>
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
          <div className="bill-footer border-top pt-2 mt-1 d-flex justify-content-end">
            <button className="bill-button d-flex justify-content-center align-items-center gap-1">
              <i className="bi bi-credit-card"></i> Pay
            </button>
            <button
              className="bill-button d-flex justify-content-center align-items-center gap-1"
              onClick={handleDownloadBill}
            >
              <i className="bi bi-download"></i> Download
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bill;
