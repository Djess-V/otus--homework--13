import { createStartUI } from "./ui/createStartUI";
import "./sass/styles.scss";

const element = document.getElementById("app");

if (element) {
  createStartUI(element);
}
