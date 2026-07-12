import { API_BASE_URL } from "@/constant";
import ApiHandler from "../lib/axios";
import axios from "axios";


const api = new ApiHandler({
  baseURL: API_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

export function getmembershipPaymentLink(url, data, token){
  localStorage.setItem("selectedPlan", data.plan);
  return axios.post(`${API_BASE_URL}${url}`, data, {
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`
    },
  });
}

export function getPaymentStatus(token) {
  return axios.get(`${API_BASE_URL}/api/payment/payment-status`, {
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`
    },
  });
}

export function initiatePayment(data, token) {
  localStorage.setItem("selectedPlan", data.plan);
  return axios.post(`${API_BASE_URL}/api/payment`, data, {
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`
    },
  });
}

export function validateCoupon(code, plan, token, context="subscription") {
  return axios.post(`${API_BASE_URL}/api/coupons/validate`, { code, plan, context }, {
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`
    },
  });
}

export function getReferralStats(token) {
  return axios.get(`${API_BASE_URL}/api/referral/stats`, {
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`
    },
  });
}


// export function loginAPI(url, data) {
//   return api.post({
//     url,
//     data,
//   });
// }

// export function registerAPI(url, data) {
//   return api.post({
//     url,
//     data,
//   });
// }

// export function verifyOTPApi(url, data) {
//   return api.post({
//     url,
//     data,
//   });
// }

// export function resendOTPAPI(url, data) {
//   return api.post({
//     url,
//     data,
//   });
// }

// export function registerEventAPI(url, data) {
//   return api.post({
//     url,
//     data,
//   });
// }
