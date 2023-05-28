import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function showToast() {
  Toastify({
    text: "Task Saved at: " + new Date().toLocaleTimeString(),
    duration: 2000,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  }).showToast();
}

export function showDeleteToast() {
  Toastify({
    text: "Task Deleted at: " + new Date().toLocaleTimeString(),
    duration: 2000,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #ff0000, #ff6a6a)",
  }).showToast();
}

export function showDeleteAllToast() {
  Toastify({
    text: "All Tasks Deleted at: " + new Date().toLocaleTimeString(),
    duration: 2500,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #ff0000, #ff6a6a)",
  }).showToast();
}
