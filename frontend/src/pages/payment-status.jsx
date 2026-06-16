import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PHONEPE_PAYMENT_FINAL_STATE, DEFAULT_TEST_ERROR } from "../constant";
import stabiliqLogo from "@/assets/svgs/logo.svg";
import { getPaymentStatus, initiatePayment } from "../apis/service";
import { redirectToPayment } from "../utils/payment";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import paymentSuccessImage from "@/assets/svgs/paymentSuccess.svg";
import paymentWarningImage from "@/assets/svgs/paymentWarning.svg";

const infoMessageByStatus = {
  [PHONEPE_PAYMENT_FINAL_STATE.completed]:
    "Payment successful! You can now access your dashboard.",
  [PHONEPE_PAYMENT_FINAL_STATE.pendingFailed]:
    "Your payment transaction failed. If any money was deducted from your account, it will be refunded within 3-5 days.",
  [PHONEPE_PAYMENT_FINAL_STATE.failed]:
    "Your payment transaction failed. Please try again.",
  [PHONEPE_PAYMENT_FINAL_STATE.pending]:
    "Your transaction is under processing. Please wait while we update the status.",
};

const headingMappingByStatus = {
  [PHONEPE_PAYMENT_FINAL_STATE.pending]: "Payment Processing...",
  [PHONEPE_PAYMENT_FINAL_STATE.failed]: "Payment Failed",
  [PHONEPE_PAYMENT_FINAL_STATE.pendingFailed]: "Payment Failed",
  [PHONEPE_PAYMENT_FINAL_STATE.completed]: "Congratulations!",
};

const PaymentStatusPage = () => {
  const [redirectionSecs, setRedirectionSecs] = useState(5);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);
  const [pollingCount, setPollingCount] = useState(0);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token, user } = useAuth();

  const transactionId = searchParams.get("transactionId") || "";

  // Fetch payment status from /api/payment/status
  const fetchPaymentStatus = useCallback(async () => {
    try {
      const response = await getPaymentStatus(token);
      const data = response.data?.data;
      const status = data?.paymentStatus || "";

      setIsLoading(false);

      if (!status) {
        setErrorMsg("No payment record found.");
        return;
      }

      setPaymentStatus(status);

      // If still pending, poll up to 5 times
      if (status === PHONEPE_PAYMENT_FINAL_STATE.pending && pollingCount < 5) {
        setTimeout(() => {
          setPollingCount((prev) => prev + 1);
        }, 5000);
      }
    } catch (error) {
      console.error("Error fetching payment status:", error);
      setErrorMsg(
        error?.response?.data?.detail ||
        error?.message ||
        DEFAULT_TEST_ERROR
      );
    } finally {
      setIsLoading(false);
    }
  }, [token, pollingCount]);

  // Poll for status when pollingCount changes
  useEffect(() => {
      if (token) {
          fetchPaymentStatus();
        }
    // eslint-disable-next-line 
  }, [pollingCount, token]);

  // Redirect countdown after success
  useEffect(() => {
    if (paymentStatus !== PHONEPE_PAYMENT_FINAL_STATE.completed) return;

    const timer = setInterval(() => {
      setRedirectionSecs((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paymentStatus, navigate]);

  // Handle retry payment
  async function handleRetryPayment() {
    try {
      setIsPaymentInitiated(true);
      setErrorMsg("");

      const response = await initiatePayment(
        { plan: localStorage.getItem("selectedPlan") || "basic", timestamp: new Date().toISOString() },
        token
      );
      const data = response.data;

      await redirectToPayment({
        pgGateway: data?.pgGateway,
        paymentUrl: data?.checkoutPageUrl,
        paymentSessionId: data?.paymentSessionId
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      setErrorMsg(
        error?.response?.data?.detail ||
        error?.message ||
        DEFAULT_TEST_ERROR
      );
    } finally {
      setIsPaymentInitiated(false);
    }
  }

  function getButtonText() {
    if (isPaymentInitiated) return "Processing...";
    if (paymentStatus === PHONEPE_PAYMENT_FINAL_STATE.completed)
      return "Go to Dashboard";
    return "Retry Payment";
  }

  function handleButtonClick() {
    if (paymentStatus === PHONEPE_PAYMENT_FINAL_STATE.completed) {
      navigate("/dashboard");
    } else {
      handleRetryPayment();
    }
  }

  const statusImage =
    paymentStatus === PHONEPE_PAYMENT_FINAL_STATE.completed
      ? paymentSuccessImage
      : paymentWarningImage;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - logo only */}
      <header className="w-full px-6 py-4 bg-white border-b border-gray-100 shadow-sm">
        <div
          className="flex items-center cursor-pointer w-fit"
          onClick={() => navigate("/")}
        >
          <img src={stabiliqLogo} alt="STABILIQ" className="h-9 w-auto" />
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
              <p className="text-muted-foreground">
                Fetching your payment status...
              </p>
            </div>
          ) : (
            <>
              {paymentStatus === PHONEPE_PAYMENT_FINAL_STATE.completed && (
                <p className="text-sm text-muted-foreground">
                  Redirecting to dashboard in {redirectionSecs}s
                </p>
              )}

              <h2 className="text-2xl font-bold">
                {headingMappingByStatus[paymentStatus] || "Payment Status"}
              </h2>

              <div className="w-32 h-32 relative">
                <img
                  src={statusImage}
                  alt="Payment status"
                  className="w-full h-full object-contain"
                />
              </div>

              {!errorMsg && infoMessageByStatus[paymentStatus] && (
                <p className="text-muted-foreground">
                  {infoMessageByStatus[paymentStatus]}
                </p>
              )}

              {errorMsg && (
                <p className="text-destructive text-sm">{errorMsg}</p>
              )}

              {paymentStatus === PHONEPE_PAYMENT_FINAL_STATE.pending && (
                <p className="text-xs text-muted-foreground italic">
                  Please do not press back or close the page.
                </p>
              )}

              {paymentStatus !== PHONEPE_PAYMENT_FINAL_STATE.pending && (
                <Button
                  onClick={handleButtonClick}
                  disabled={isPaymentInitiated}
                  className="w-full"
                >
                  {getButtonText()}
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default PaymentStatusPage;
