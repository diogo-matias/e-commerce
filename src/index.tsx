import React from "react";
import ReactDOM from "react-dom/client";
import App from "./screens";
import "./index.css";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toast } from "./components/toast";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<div>LOADING...</div>}>
                <Toast />
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
