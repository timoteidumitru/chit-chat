import { render } from "react-dom";
import "./index.css";
import Chat from "./src/components/chat/chat";
const app = <Chat />;
const root = document.querySelector("#root");

render(app, root);
