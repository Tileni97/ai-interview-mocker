import React from "react";
import styles from "./ErrorComponent.module.css";

const ErrorComponent = ({ message }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>❌</div>
      <p className={styles.errorMessage}>
        {message || "An error occurred. Please try again."}
      </p>
    </div>
  );
};

export default ErrorComponent;
