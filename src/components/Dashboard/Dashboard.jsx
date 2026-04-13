import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Dashboard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import {
  fetchToastFloorplan,
  fetchTableStatuses,
  patchTableStatus,
  syncToastTables,
} from "../../utils/table-status.js";
import { createRealtimeSocket } from "../../utils/realtime.js";

const STATUS_OPTIONS = [
  "open",
  "occupied",
  "reserved",
  "dirty",
  "drinks/bread",
  "course1",
  "course2",
  "course3",
  "dessert",
];

function Dashboard() {
  const currentUser = useContext(CurrentUserContext);
  const [tables, setTables] = useState([]);
  const [floorplan, setFloorplan] = useState({
    width: 800,
    height: 520,
    tables: [],
  });
  const [isLoadingFloorplan, setIsLoadingFloorplan] = useState(false);
  const [isSyncingToast, setIsSyncingToast] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const tablesRef = useRef([]);

  const token = useMemo(() => localStorage.getItem("jwt"), []);

  const sections = useMemo(() => {
    const names = new Set(
      (floorplan.tables || []).map((table) => table.section || "Main Dining"),
    );

    return Array.from(names);
  }, [floorplan.tables]);

  const mergeTableStatuses = useCallback((layoutTables, statusTables) => {
    const statusMap = new Map(
      (statusTables || []).map((item) => [String(item.tableId), item.status]),
    );

    return (layoutTables || []).map((table) => ({
      ...table,
      status: statusMap.get(String(table.tableId)) || table.status || "open",
    }));
  }, []);

  const loadFloorplan = useCallback(() => {
    if (!token) {
      return Promise.resolve();
    }

    setIsLoadingFloorplan(true);
    return fetchToastFloorplan(token)
      .then((res) => {
        setFloorplan({
          width: res.width || 800,
          height: res.height || 520,
          tables: mergeTableStatuses(res.tables, tablesRef.current),
        });
      })
      .catch((err) => {
        setStatusMessage(err?.message || "Failed to load Toast floorplan");
      })
      .finally(() => {
        setIsLoadingFloorplan(false);
      });
  }, [mergeTableStatuses, token]);

  useEffect(() => {
    tablesRef.current = tables;
  }, [tables]);

  useEffect(() => {
    if (!token) {
      return undefined;
    }

    fetchTableStatuses(token)
      .then((res) => {
        const nextTables = res.tables || [];
        setTables(nextTables);
        setFloorplan((prev) => ({
          ...prev,
          tables: mergeTableStatuses(prev.tables, nextTables),
        }));
      })
      .catch((err) => {
        setStatusMessage(err?.message || "Failed to load table statuses");
      });

    loadFloorplan();

    const socket = createRealtimeSocket(token);

    socket.on("table:statuses:snapshot", (snapshot) => {
      const nextSnapshot = Array.isArray(snapshot) ? snapshot : [];
      setTables(nextSnapshot);
      setFloorplan((prev) => ({
        ...prev,
        tables: mergeTableStatuses(prev.tables, nextSnapshot),
      }));
    });

    socket.on("table:status:updated", (updatedTable) => {
      setTables((prev) => {
        const index = prev.findIndex(
          (item) => item.tableId === updatedTable.tableId,
        );

        if (index < 0) {
          return [...prev, updatedTable];
        }

        const next = [...prev];
        next[index] = updatedTable;
        return next;
      });

      setFloorplan((prev) => ({
        ...prev,
        tables: (prev.tables || []).map((table) => {
          if (String(table.tableId) !== String(updatedTable.tableId)) {
            return table;
          }

          return {
            ...table,
            status: updatedTable.status,
          };
        }),
      }));
    });

    socket.on("connect_error", (err) => {
      setStatusMessage(err?.message || "Realtime connection failed");
    });

    return () => {
      socket.disconnect();
    };
  }, [loadFloorplan, mergeTableStatuses, token]);

  const handleStatusChange = (tableId, status) => {
    if (!token) {
      setStatusMessage("You must be signed in to update table statuses");
      return;
    }

    patchTableStatus(token, tableId, status)
      .then(() => {
        setStatusMessage(`Updated ${tableId} to ${status}`);
      })
      .catch((err) => {
        setStatusMessage(err?.message || "Failed to update table status");
      });
  };

  const handleSyncToast = () => {
    if (!token) {
      setStatusMessage("You must be signed in to sync with Toast");
      return;
    }

    setIsSyncingToast(true);
    setStatusMessage("");

    syncToastTables(token)
      .then((res) => {
        setStatusMessage(`Toast sync complete: ${res.received} table updates.`);
        return Promise.all([
          fetchTableStatuses(token),
          fetchToastFloorplan(token),
        ]);
      })
      .then(([statusRes, floorplanRes]) => {
        const nextTables = statusRes?.tables || [];
        setTables(nextTables);
        setFloorplan({
          width: floorplanRes?.width || 800,
          height: floorplanRes?.height || 520,
          tables: mergeTableStatuses(floorplanRes?.tables || [], nextTables),
        });
      })
      .catch((err) => {
        setStatusMessage(err?.message || "Toast sync failed");
      })
      .finally(() => {
        setIsSyncingToast(false);
      });
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
          Your floorplan is now pulled directly from Toast, with live statuses
          overlaid in real time and rendered in a Toast-style operator layout.
        </p>

        <div className="dashboard__stats" aria-label="Dashboard metrics">
          <article className="dashboard__stat-card">
            <p className="dashboard__stat-label">Restaurants</p>
            <p className="dashboard__stat-value">1</p>
          </article>
          <article className="dashboard__stat-card">
            <p className="dashboard__stat-label">Imported floorplans</p>
            <p className="dashboard__stat-value">1</p>
          </article>
          <article className="dashboard__stat-card">
            <p className="dashboard__stat-label">Tables mapped</p>
            <p className="dashboard__stat-value">{tables.length}</p>
          </article>
        </div>

        <div className="dashboard__grid">
          <section className="dashboard__panel">
            <h2 className="dashboard__panel-title">Toast Connection</h2>
            <p className="dashboard__panel-copy">
              Refresh your live table statuses and floorplan directly from
              Toast.
            </p>

            <button
              className="dashboard__import-btn dashboard__sync-btn"
              type="button"
              onClick={handleSyncToast}
              disabled={isSyncingToast}
            >
              {isSyncingToast ? "Syncing..." : "Sync From Toast"}
            </button>
            <button
              className="dashboard__import-btn dashboard__refresh-floorplan-btn"
              type="button"
              onClick={loadFloorplan}
              disabled={isLoadingFloorplan}
            >
              {isLoadingFloorplan ? "Refreshing..." : "Refresh Floorplan"}
            </button>

            {statusMessage && (
              <p className="dashboard__sync-state">{statusMessage}</p>
            )}
          </section>

          <section className="dashboard__panel">
            <h2 className="dashboard__panel-title">Floorplans</h2>
            <p className="dashboard__panel-copy">
              Layout and table states are pulled from Toast and rendered below.
            </p>

            {!!sections.length && (
              <div
                className="dashboard__section-strip"
                aria-label="Dining areas"
              >
                {sections.map((section) => (
                  <span className="dashboard__section-chip" key={section}>
                    {section}
                  </span>
                ))}
              </div>
            )}

            {!floorplan.tables.length && (
              <p className="dashboard__empty-state">
                No floorplan tables loaded yet. Set your Toast restaurant GUID,
                then refresh.
              </p>
            )}

            {!!floorplan.tables.length && (
              <div className="dashboard__floorplan-wrap">
                <div
                  className="dashboard__floorplan-canvas"
                  style={{
                    width: `${floorplan.width}px`,
                    height: `${floorplan.height}px`,
                  }}
                >
                  {floorplan.tables.map((table) => {
                    const statusClass = table.status
                      .replace(/[^a-z0-9]/gi, "-")
                      .toLowerCase();

                    return (
                      <button
                        key={table.tableId}
                        className={`dashboard__table-token dashboard__table-token--${table.shape} dashboard__table-token--${statusClass}`}
                        type="button"
                        onClick={() =>
                          handleStatusChange(table.tableId, "occupied")
                        }
                        style={{
                          left: `${table.x}px`,
                          top: `${table.y}px`,
                          width: `${table.width}px`,
                          height: `${table.height}px`,
                          transform: `rotate(${table.rotation || 0}deg)`,
                        }}
                        title={`${table.label} • ${table.status}`}
                      >
                        <span className="dashboard__token-label">
                          {table.label}
                        </span>
                        <span className="dashboard__token-meta">
                          <span
                            className={`dashboard__token-dot dashboard__token-dot--${statusClass}`}
                          />
                          <span className="dashboard__token-status">
                            {table.status}
                          </span>
                          {table.seats ? (
                            <span className="dashboard__token-seats">
                              {table.seats} seats
                            </span>
                          ) : null}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <ul className="dashboard__list">
              {tables.map((table) => (
                <li className="dashboard__list-item" key={table.tableId}>
                  <div className="dashboard__table-row">
                    <span>{table.tableId}</span>
                    <span className="dashboard__table-status">
                      {table.status}
                    </span>
                  </div>
                  <div className="dashboard__table-actions">
                    {STATUS_OPTIONS.map((status) => (
                      <button
                        key={`${table.tableId}-${status}`}
                        className="dashboard__status-btn"
                        type="button"
                        onClick={() =>
                          handleStatusChange(table.tableId, status)
                        }
                        disabled={table.status === status}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
