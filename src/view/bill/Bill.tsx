import { useNavigate } from "react-router-dom";
import { useBillStore } from "../../Store";
import "./Bill.css";
import jsPDF from "jspdf";
import { ToastContainer, toast } from "react-toastify";
import 'jspdf-autotable'

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

  const handlePayClick = () => {
    toast.warning("The payment options not implemented yet!", {
      position: "top-center",
      theme: "colored",
    });
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDownloadBill = () => {
    const today = new Date();
    const dueDate = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      today.getDate()
    );
    const invoiceNumber = "INV-2024001";

    const pdf = new jsPDF("p", "pt", "a5");

    const pageWidth = pdf.internal.pageSize.getWidth();

    pdf.setFont("arial",  'bold');
    pdf.setFontSize(18);
    pdf.text("Electricity Bill", 160, 30);

    pdf.setFont("arial", "normal");
    pdf.setFontSize(12);

    pdf.text(`Invoice Number : ${invoiceNumber}`, 60, 70);
    pdf.text(`Invoice Date : ${formatDate(today)}`, 60, 90); 
    pdf.text(`Due Date : ${formatDate(dueDate)}`, 60, 110);
    pdf.text(`Account Number : ${accountNumber}`, 60, 130);
    pdf.text(`Customer Name : ${customerName}`, 60, 150);
    
    pdf.text("Last Reading Date : ", 60, 200);
    pdf.text(`${lastDate}`, (pageWidth - 60 - (pdf.getStringUnitWidth(`${lastDate}`) * 12 / pdf.internal.scaleFactor)), 200);
    
    pdf.text('Last Reading Value : ', 60, 220);
    pdf.text(`${lastValue}`, (pageWidth - 60 - (pdf.getStringUnitWidth(`${lastValue}`) * 12 / pdf.internal.scaleFactor)), 220);
    
    pdf.text('Previous Reading Date : ', 60, 240);
    pdf.text(`${previousDate}`, (pageWidth - 60 - (pdf.getStringUnitWidth(`${previousDate}`) * 12 / pdf.internal.scaleFactor)), 240);

    pdf.text('Previous Reading Value : ', 60, 260);
    pdf.text(`${previousValue}`, (pageWidth - 60 - (pdf.getStringUnitWidth(`${previousValue}`) * 12 / pdf.internal.scaleFactor)), 260);
    
    pdf.text('First Range Amount : ', 60, 280);
    pdf.text(`Rs.${firstRangeAmount}`, (pageWidth - 60 - (pdf.getStringUnitWidth(`Rs.${firstRangeAmount}`) * 12 / pdf.internal.scaleFactor)), 280);

    pdf.text('Second Range Amount : ', 60, 300);
    pdf.text(`Rs.${secondRangeAmount}`, (pageWidth - 60 - (pdf.getStringUnitWidth(`Rs.${secondRangeAmount}`) * 12 / pdf.internal.scaleFactor)), 300);
    
    pdf.text('Third Range Amount : ', 60, 320);
    pdf.text(`Rs.${thirdRangeAmount}`, (pageWidth - 60 - (pdf.getStringUnitWidth(`Rs.${thirdRangeAmount}`) * 12 / pdf.internal.scaleFactor)), 320);

    pdf.text('Total Units : ', 60, 340);
    pdf.text(`${totalUnits}`, (pageWidth - 60 - (pdf.getStringUnitWidth(`${totalUnits}`) * 12 / pdf.internal.scaleFactor)), 340);


    pdf.setFont("arial",  'bold');
    pdf.setFontSize(14);
    pdf.text('Total Amount : ', 60, 380);
    pdf.text(`Rs.${totalAmount}`, (pageWidth - 60 - (pdf.getStringUnitWidth(`Rs.${totalAmount}`) * 14 / pdf.internal.scaleFactor)), 380);

    pdf.save("ceb-bill.pdf");

    toast.success('Your bill is being downloaded', {
      position: "top-center",
      theme: "colored",
    });
  };

  return (
    <>
      <ToastContainer closeOnClick autoClose={1000} />
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
            <button
              className="bill-button d-flex justify-content-center align-items-center gap-1"
              onClick={handlePayClick}
            >
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
