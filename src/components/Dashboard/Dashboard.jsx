import { useContext, useState } from "react";
import "./Dashboard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

function Dashboard() {
  const currentUser = useContext(CurrentUserContext);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileChange = (evt) => {
    const file = evt.target.files?.[0];
    setSelectedFileName(file ? file.name : "");
  };

  return (
    <section className="dashboard">
      <div className="dashboard__inner">
        <p className="dashboard__eyebrow">Dashboard</p>
        <h1 className="dashboard__title">Restaurant Dashboard</h1>
        <p className="dashboard__description">
          {currentUser?.email
            ? `Signed in as ${currentUser.email}.`
            : "Signed in."}{" "}
          Upload a Toast floorplan export to start building your restaurant
          layout workflow.
        </p>

        <div className="dashboard__stats" aria-label="Dashboard metrics">
          <article className="dashboard__stat-card">
            <p className="dashboard__stat-label">Restaurants</p>
            <p className="dashboard__stat-value">1</p>
          </article>
          <article className="dashboard__stat-card">
            <p className="dashboard__stat-label">Imported floorplans</p>
            <p className="dashboard__stat-value">0</p>
          </article>
          <article className="dashboard__stat-card">
            <p className="dashboard__stat-label">Tables mapped</p>
            <p className="dashboard__stat-value">0</p>
          </article>
        </div>

        <div className="dashboard__grid">
          <section className="dashboard__panel">
            <h2 className="dashboard__panel-title">Import from Toast</h2>
            <p className="dashboard__panel-copy">
              Select a Toast export file to prototype your import workflow.
              Backend ingestion can be connected later without changing this UI.
            </p>

            <label className="dashboard__upload-label" htmlFor="toast-file">
              Choose export file
            </label>
            <input
              className="dashboard__upload-input"
              id="toast-file"
              name="toast-file"
              type="file"
              accept=".json,.csv,.txt"
              onChange={handleFileChange}
            />

            <p className="dashboard__upload-state">
              {selectedFileName
                ? `Selected: ${selectedFileName}`
                : "No file selected yet."}
            </p>

            <button className="dashboard__import-btn" type="button">
              Start import
            </button>
          </section>

          <section className="dashboard__panel">
            <h2 className="dashboard__panel-title">Floorplans</h2>
            <p className="dashboard__panel-copy">
              Imported layouts will appear here with room and table details.
            </p>
            <ul className="dashboard__list">
              <li className="dashboard__list-item">
                No floorplans imported yet.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
