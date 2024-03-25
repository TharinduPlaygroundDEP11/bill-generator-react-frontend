import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex vw-100 vh-100 justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center gap-3 dashboard-items-container">
          <div className="dashboard-image"></div>

          <div className="d-flex flex-column justify-content-center align-items-center gap-3">
            <div className="dashboard-header fs-2 fw-bold">Dashboard</div>
            <div
              className="dashboard-button text-center d-flex align-items-center justify-content-center border p-2"
              onClick={() => navigate("../admin")}
            >
              Add Meter Reading
            </div>
            <div
              className="dashboard-button text-center d-flex align-items-center justify-content-center border p-2"
              onClick={() => navigate("../user")}
            >
              View Bill
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
