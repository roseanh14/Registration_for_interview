import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

export default function ApplicationsList() {
  const [apps, setApps] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [changing, setChanging] = useState(false);

  // load all apps
  useEffect(() => {
    fetch(`${API_URL}/applications`)
      .then((res) => res.json())
      .then((data) => {
        setApps(data);
        if (data.length > 0) {
          setSelected(data[0]);
        }
      })
      .catch(() => setError("Failed to load applications"));
  }, []);

  const updateStatus = async (newStatus) => {
    if (!selected) return;
    setChanging(true);
    try {
      const resp = await fetch(
        `${API_URL}/applications/${selected.id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!resp.ok) {
        throw new Error("Failed to update status");
      }

      const updated = await resp.json();

      // update list
      setApps((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      // update detail
      setSelected(updated);
    } catch (err) {
      console.warn(err);
      alert("Could not change status");
    } finally {
      setChanging(false);
    }
  };

  // helper for badge
  const renderStatusBadge = (status) => {
    if (status === "approved") {
      return <span className="badge bg-success">approved</span>;
    }
    if (status === "rejected") {
      return <span className="badge bg-danger">rejected</span>;
    }
    return <span className="badge bg-secondary">pending</span>;
  };

  return (
    <div className="card p-3">
      <h2 className="h5 mb-3">Submitted applications</h2>

      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        <div className="col-lg-7">
          {apps.length === 0 ? (
            <p className="text-muted">No applications yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm table-bordered bg-white mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Created</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Amount</th>
                    <th>Years</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map((app) => (
                    <tr
                      key={app.id}
                      onClick={() => setSelected(app)}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selected && selected.id === app.id
                            ? "#e9f5ff"
                            : "white",
                      }}
                    >
                      <td>{app.id}</td>
                      <td>
                        {app.created_at
                          ? app.created_at.slice(0, 19).replace("T", " ")
                          : ""}
                      </td>
                      <td>{app.first_name}</td>
                      <td>{app.last_name}</td>
                      <td>{app.requested_amount}</td>
                      <td>{app.loan_term_years}</td>
                      <td>{renderStatusBadge(app.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="col-lg-5 mt-3 mt-lg-0">
          {selected ? (
            <div className="border rounded p-3 bg-white h-100">
              <h3 className="h6 mb-3">Application detail</h3>
              <p className="mb-1">
                <strong>Name:</strong> {selected.first_name}{" "}
                {selected.last_name}
              </p>
              <p className="mb-1">
                <strong>Email:</strong> {selected.email}
              </p>
              <p className="mb-1">
                <strong>Gender:</strong> {selected.gender || "—"}
              </p>
              <p className="mb-1">
                <strong>Amount:</strong> {selected.requested_amount} CZK
              </p>
              <p className="mb-1">
                <strong>Repayment:</strong> {selected.loan_term_years} years
              </p>
              <p className="mb-1">
                <strong>Purpose:</strong>{" "}
                {selected.loan_purpose || selected.custom_purpose || "—"}
              </p>
              <p className="mb-3">
                <strong>Status:</strong> {renderStatusBadge(selected.status)}
              </p>

              <div className="d-flex gap-2">
                {selected.status !== "approved" && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => updateStatus("approved")}
                    disabled={changing}
                  >
                    Approve
                  </button>
                )}
                {selected.status !== "rejected" && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => updateStatus("rejected")}
                    disabled={changing}
                  >
                    Reject
                  </button>
                )}
                {selected.status !== "pending" && (
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => updateStatus("pending")}
                    disabled={changing}
                  >
                    Set to pending
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-muted">Select an application to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
