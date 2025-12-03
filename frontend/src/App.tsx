import HomePage from './pages/home';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow">
          <HomePage />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
