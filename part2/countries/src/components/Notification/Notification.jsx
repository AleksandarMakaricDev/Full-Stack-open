import React from "react";
import { isValidNonEmptyString } from "../../utils/validators";
import { modifierStates } from "../../types/constants";
import styles from "./Notification.module.css";

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  const { message, type } = notification;

  let typeClassName;

  switch (type) {
    case modifierStates.error:
      typeClassName = modifierStates.error;
      break;
    case modifierStates.success:
      typeClassName = modifierStates.success;
      break;
    default:
      typeClassName = modifierStates.normal;
  }

  const modifierClassName = `notification--${typeClassName}`;

  return (
    isValidNonEmptyString(message) && (
      <p className={`${styles.notification} ${styles[modifierClassName]}`}>
        {message}
      </p>
    )
  );
};

export default Notification;
