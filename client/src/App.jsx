import './App.css'
import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import AppRoutes from "./Routes";
import { Toaster } from 'react-hot-toast';
import StickyMessageIcon from './components/StickyMessageIcon';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
    const {user} = useAuthContext()
    return (
        <>
            <Router>
                <Toaster position={'top-center'} toastOptions={{ duration: 2000 }} />
                <NavigationBar />
                <AppRoutes />
                <Footer />
                {/* {user && (
                    <>
                        <StickyMessageIcon />
                    </>
                )} */}
            </Router>
        </>
    )
}

export default App
