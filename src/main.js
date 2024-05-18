"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
var App_tsx_1 = require("./App.tsx");
var ThemeContext_tsx_1 = require("./context/ThemeContext.tsx");
require("./style.css");
client_1.default.createRoot(document.getElementById("root")).render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(ThemeContext_tsx_1.ContextTheme, null,
        react_1.default.createElement(App_tsx_1.default, null))));
