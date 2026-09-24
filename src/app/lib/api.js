import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const HOME_DASHBOARD_URL = "http://localhost:8000/api/home";
export const CASES_URL = "http://localhost:8000/api/cases";
export const RECOVERIES_URL = "http://localhost:8000/api/recoveries";
export const AUDIT_URL = "http://localhost:8000/api/audit";
export const VENDORS_URL = "http://localhost:8000/api/vendors";
export const COPILOT_CHAT_URL = "http://localhost:8000/api/v1/copilot/chat";
export const LOGIN_URL = "http://localhost:8000/api/auth/login";
export const REGISTER_URL = "http://localhost:8000/api/auth/register";
let homeDashboardRequest;
let casesRequest;
let recoveriesRequest;
let auditRequest;
let vendorsRequest;

axiosInstance.interceptors.request.use(
  (config) => {
  if (typeof window !== "undefined") {
  const token = localStorage.getItem("access_token");

  if (token) {
  config.headers.Authorization = `Bearer ${token}`;
  }
  }

  return config;
  },
  (error) => Promise.reject(error)
);
export async function loginUser(email, password) {
const response = await axiosInstance.post("/auth/login", {
email,
password,
});
 
return response.data;
}

export async function registerUser(
email,
password,
confirm_password
) {
const response = await axiosInstance.post("/auth/register", {
email,
password,
confirm_password,
});
return response.data;
}

// homeDashboardRequest = axiosInstance
// .get(HOME_DASHBOARD_URL)

export async function getHomeDashboard() {
  if (!homeDashboardRequest) {
    homeDashboardRequest = axios
      .get(HOME_DASHBOARD_URL)
      .then((response) => response.data)
      .catch((error) => {
        homeDashboardRequest = undefined;
        throw error;
      });
  }

  return homeDashboardRequest;
}

export async function getCases() {
  if (!casesRequest) {
    casesRequest = axios
      .get(CASES_URL)
      .then((response) => response.data)
      .catch((error) => {
        casesRequest = undefined;
        throw error;
      });
  }

  return casesRequest;
}

export async function getRecoveries() {
  if (!recoveriesRequest) {
    recoveriesRequest = axios
      .get(RECOVERIES_URL)
      .then((response) => response.data)
      .catch((error) => {
        recoveriesRequest = undefined;
        throw error;
      });
  }

  return recoveriesRequest;
}

export async function getAudit() {
  if (!auditRequest) {
    auditRequest = axios
      .get(AUDIT_URL)
      .then((response) => response.data)
      .catch((error) => {
        auditRequest = undefined;
        throw error;
      });
  }

  return auditRequest;
}

export async function getVendors() {
  if (!vendorsRequest) {
    vendorsRequest = axios
      .get(VENDORS_URL)
      .then((response) => response.data)
      .catch((error) => {
        vendorsRequest = undefined;
        throw error;
      });
  }

  return vendorsRequest;
}

export async function sendCopilotMessage(message, userId, userName) {
  const response = await axios.post(COPILOT_CHAT_URL, {
    userId,
    userName,
    message,
    timestamp: new Date().toISOString(),
  });

  return response.data;
}

export default axiosInstance;
