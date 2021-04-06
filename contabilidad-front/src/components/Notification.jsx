import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function Notification(props) {
  const { notify, setNotify } = props;

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={() =>
        setNotify({
          isOpen: false,
          message: "",
          type: "",
        })
      }
    >
      <Alert severity={notify.type}> {notify.message} </Alert>
    </Snackbar>
  );
}
