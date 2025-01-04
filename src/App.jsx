import AuthProvider from "./context/AuthProvider";
import { SentimentProvider } from "./context/SentimentContext";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      <SentimentProvider>
        <Routes />
      </SentimentProvider>
    </AuthProvider>
  );
}

export default App;
