import { PHONEPE_PAYMENT_FINAL_STATE } from "../../constant";
import styles from "./image-button.module.css";

const ImageButton = ({ onClickAction, buttonText, originalFeeAmount, buttonStyle, isPaymentInitiated, paymentStatus='' }) => {

  return (
    <>
    <button className={`${styles.button} ${buttonStyle}`} onClick={onClickAction}>
      <div className={styles.btnContentWrapper}>
        {!isPaymentInitiated && paymentStatus !== PHONEPE_PAYMENT_FINAL_STATE["completed"] && <span>Pay&nbsp;</span>}
        {originalFeeAmount && <span className={styles.feeAmount}>{originalFeeAmount}</span>}
        <span>{buttonText || "Refreshing Total Amount..."}</span>
      </div>
    </button>
    </>
  );
};

export default ImageButton;
