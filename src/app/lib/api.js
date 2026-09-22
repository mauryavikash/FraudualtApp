import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const HOME_DASHBOARD_URL =
  "http://localhost:8000/api/home";
export const CASES_URL = "http://localhost:8000/api/cases";
export const RECOVERIES_URL = "http://localhost:8000/api/recoveries";
export const AUDIT_URL = "http://localhost:8000/api/audit";
export const VENDORS_URL = "http://localhost:8000/api/vendors";

let homeDashboardRequest;
let casesRequest;
let recoveriesRequest;
let auditRequest;
let vendorsRequest;

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

export default axiosInstance;
