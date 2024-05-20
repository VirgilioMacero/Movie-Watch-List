import React from "react";

export default function Toast() {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3 ">
      <div
        id="liveToast"
        className="toast "
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header" style={{ gap: "10px" }}>
          <i id="toastIcon" className="bi bi-app-indicator h5"></i>
          <strong id="toastTitle" className="me-auto h5">
            Bootstrap
          </strong>
          <small>Just Now</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div id="toastBody" className="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>
    </div>
  );
}
