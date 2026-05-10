const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const TABLES_STATUS_PATH =
  import.meta.env.VITE_TABLES_STATUS_PATH || "/tables/statuses";
const TABLES_UPDATE_PATH_TEMPLATE =
  import.meta.env.VITE_TABLE_UPDATE_PATH || "/tables/:tableId/status";
const TOAST_SYNC_PATH = import.meta.env.VITE_TOAST_SYNC_PATH || "/toast/sync";
const TABLES_FLOORPLAN_PATH =
  import.meta.env.VITE_TABLES_FLOORPLAN_PATH || "/tables/floorplan";

const processResponse = async (res) => {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

const makeUpdatePath = (tableId) => {
  return TABLES_UPDATE_PATH_TEMPLATE.replace(
    ":tableId",
    encodeURIComponent(tableId),
  );
};

export const fetchTableStatuses = (token) => {
  return fetch(`${BASE_URL}${TABLES_STATUS_PATH}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(processResponse);
};

export const patchTableStatus = (token, tableId, status) => {
  return fetch(`${BASE_URL}${makeUpdatePath(tableId)}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  }).then(processResponse);
};

export const syncToastTables = (token) => {
  return fetch(`${BASE_URL}${TOAST_SYNC_PATH}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(processResponse);
};

export const fetchToastFloorplan = (token) => {
  return fetch(`${BASE_URL}${TABLES_FLOORPLAN_PATH}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(processResponse);
};
