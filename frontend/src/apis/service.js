import { API_BASE_URL } from "@/constant";
import ApiHandler from "../lib/axios";


const api = new ApiHandler({
  baseURL: API_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

export function getmembershipPaymentLink(url, data){
  return api.post({
    url,
    data,
  })
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
