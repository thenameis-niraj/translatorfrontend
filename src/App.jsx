import "./App.css";
import Translator from "./components/Translator";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Translator />
      <Footer />
    </div>
  );
}

export default App;
