import { load } from "@cashfreepayments/cashfree-js";

export const redirectToPayment = async ({ pgGateway, paymentUrl, paymentSessionId }) => {
  if (pgGateway === 'cashfree' && paymentSessionId) {
    const cashfree = await load({ mode: "production" });
    cashfree.checkout({ paymentSessionId, redirectTarget: "_self" });
  } else if (paymentUrl) {
    window.location.href = paymentUrl;
  } else {
    throw new Error("Unable to initiate payment. Please try again.");
  }
};
