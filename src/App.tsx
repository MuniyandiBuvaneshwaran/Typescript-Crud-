import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import ContextTable from "./Component/ContextTable";
import ContextForm from "./Component/ContextForm";
import { GlobalProvider } from "./Context/ContextState";

function App() {
  return (
    <GlobalProvider>
    <>
      <Routes>
        <Route path="/ContextForm" element={<ContextForm />} />
        <Route path="/ContextTable" element={<ContextTable/>} />
        <Route path="/ContextForm/:id" element={<ContextForm />} />
      </Routes>
    </>
    </GlobalProvider>
  );
}

export default App;

