import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import CreateEventPage from './pages/CreateEventPage';
import ConfirmationPage from './pages/ConfirmationPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <Toaster position="top-center" />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
