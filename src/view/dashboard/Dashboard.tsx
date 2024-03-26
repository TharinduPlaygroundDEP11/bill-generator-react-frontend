import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex vw-100 vh-100 justify-content-center align-items-center red-hat">
        <div className="d-flex justify-content-evenly align-items-center gap-3 dashboard-items-container p-2">
          <div className="dashboard-image"></div>

          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            <div className="dashboard-header fs-2 fw-bold">Dashboard</div>
            <button
              className="dashboard-button"
              onClick={() => navigate("../admin")}
            >
              <i className="bi bi-plus-lg"></i> Reading
            </button>
            <button
              className="dashboard-button"
              onClick={() => navigate("../user")}
            >
              <i className="bi bi-receipt"></i> Bill
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
