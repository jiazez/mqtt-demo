import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";

function App() {
  return (
    <Suspense fallback="dd">
      <Router basename="/">
        <Routes />
      </Router>
    </Suspense>
  );
}

export default App;
