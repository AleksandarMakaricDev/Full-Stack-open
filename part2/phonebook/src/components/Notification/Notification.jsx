import React from "react";
import styles from "./Notification.module.css";
import { isValidString } from "../../utils/validators";
import { modifierStates } from "../../types/constants";

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
    isValidString(message) && (
      <p className={`${styles.notification} ${styles[modifierClassName]}`}>
        {message}
      </p>
    )
  );
};

export default Notification;
