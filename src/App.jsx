import Body from "./components/Body";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import appStore from "./utils/appStore.js";
import { Provider } from "react-redux";
import Feed from "./components/Feed.jsx";

function App() {
  return (
    <Provider store={appStore} >
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ Provider>

  );
}

export default App;
