import { useState } from "react";
import ApplicationForm from "./components/ApplicationForm.jsx";
import ApplicationsList from "./components/ApplicationList.jsx";

export default function App() {
  const [view, setView] = useState("form"); // "form" | "list"

  return (
    <div
      style={{
        backgroundColor: "#e9f5ff",
        minHeight: "100vh",
      }}
    >
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Loan application</h1>
          {view === "form" ? (
            <button
              className="btn btn-outline-primary"
              onClick={() => setView("list")}
            >
              Submitted applications
            </button>
          ) : (
            <button
              className="btn btn-outline-primary"
              onClick={() => setView("form")}
            >
              Back to form
            </button>
          )}
        </div>

        {view === "form" ? <ApplicationForm /> : <ApplicationsList />}
      </div>
    </div>
  );
}