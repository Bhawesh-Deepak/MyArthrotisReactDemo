import React from "react";
import { ErrorMessage } from "formik";

export default function ValidationHelper(props) {
  return (
    <ErrorMessage name={props.name}>
      {(msg) => <span style={{ color: "red" }}>{msg}</span>}
    </ErrorMessage>
  );
}
