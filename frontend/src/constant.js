export const PLANS = ["basic", "pro"];

export const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
export const API_ENDPOINTS = {
    paymentApi: "/api/payment",
    paymentStatus:"/api/payment/status",
}

export const PHONEPE_PAYMENT_FINAL_STATE = {
    completed: "PAYMENT_SUCCESS",
    failed: "FAILED",
    pending: "PAYMENT_PENDING",
    pendingFailed: "PENDING_FAILED"
};

export const REFERRAL_STORAGE_KEY = "stabiliq_referral_code";

export const PAYMENT_CATEGORY = {
    applicationFee: "application-fee"
}

export const DEFAULT_TEST_ERROR = 'Oops! Something went wrong. Please try again later or contact support if the issue persists. We apologize for any inconvenience this may cause.';