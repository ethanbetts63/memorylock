import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import CreateEventPage from './pages/CreateEventPage';
import ConfirmationPage from './pages/ConfirmationPage';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
