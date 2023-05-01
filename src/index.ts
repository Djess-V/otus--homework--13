import "./sass/styles.scss";
import { createStartUI } from "./ui/createStartUI";

const element = document.getElementById("app");

if (element) {
  createStartUI(element);
}
