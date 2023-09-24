// import './App.css'

import { BrowserRouter as Router } from "react-router-dom";

import { Toaster } from 'react-hot-toast';
import AppRoutes from "./Routes";

function App() {
    return (
        <>
            <Router>
                <Toaster position={'top-center'} toastOptions={{ duration: 2000 }} />
                <AppRoutes />
            </Router>
        </>
    )
}

export default App
