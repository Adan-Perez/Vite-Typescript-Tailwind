import { v4 } from "uuid";
import { Task } from "./interfaces/Task";
import "./index.css";
import {
  showDeleteAllToast,
  showDeleteToast,
  showToast,
} from "./toastifys/Toasts";

let tasks: Task[] = [];

const taskForm = document.querySelector<HTMLFormElement>("#taskForm");
const tasksList = document.querySelector<HTMLDivElement>("#tasksList");

taskForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["title"] as unknown as HTMLInputElement;
  const description = taskForm["description"] as unknown as HTMLTextAreaElement;

  tasks.unshift({
    title: title.value,
    description: description.value,
    id: v4(),
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);

  taskForm.reset();
  title.focus();

  showToast();
});

// Load tasks from localstorage when the app loads
document.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  renderTasks(tasks);
});

function renderTasks(tasks: Task[]) {
  tasksList!.innerHTML = "";

  const tasksHeader = document.createElement("h3");
  tasksHeader.className = "text-md mb-4 font-bold";
  tasksHeader.innerText = "Tasks";
  tasksList?.append(tasksHeader);

  if (tasks.length === 0) {
    const noTasks = document.createElement("h2");
    noTasks.className = "text-gray-400 text-md mb-4 font-bold";
    noTasks.innerText = "No tasks, add a new task";
    tasksList?.append(noTasks);
  }

  if (tasks.length > 0) {
    const deleteAllButton = document.createElement("button");
    deleteAllButton.innerText = "Delete All";
    deleteAllButton.className =
      "bg-red-600 px-3 py-1 mb-4 rounded-md hover:bg-red-400";
    deleteAllButton.addEventListener("click", () => {
      deleteAllTasks();
    });
    tasksList?.append(deleteAllButton);
  }

  tasks.forEach((task: Task) => {
    const taskElement = document.createElement("div");
    taskElement.className =
      "bg-slate-800 mb-1 p-4 rounded-lg hover:bg-slate-700";

    const header = document.createElement("header");
    header.className = "flex justify-between";

    const title = document.createElement("span");

    title.innerText = task.title || "Untitled";
    if (task.title?.length! > 25) {
      title.innerText = task.title?.substring(0, 25) + "...";
    }
    header.append(title);

    const btnDelete = document.createElement("button");
    btnDelete.innerText = "delete";
    btnDelete.className =
      "bg-red-500 px-2 py-1 rounded-md text-white hover:bg-red-600";
    header.append(btnDelete);

    btnDelete.addEventListener("click", () => {
      deleteTask(task);
    });

    taskElement?.append(header);

    const id = document.createElement("p");
    id.className = "text-gray-400 text-xs";
    id.innerText = "id: " + task.id;
    taskElement?.append(id);

    const description = document.createElement("div");
    description.innerText = task.description || "This task has no description";
    if (task.description?.length! > 25) {
      description.innerText = task.description?.substring(0, 25) + "...";
    }
    taskElement.append(description);

    tasksList?.append(taskElement);
  });
}

function deleteTask(task: Task) {
  const index = tasks.findIndex((t) => t.id === task.id);
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);

  showDeleteToast();
}

function deleteAllTasks() {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);

  showDeleteAllToast();
}
