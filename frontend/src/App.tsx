import HomePage from './pages/home';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
