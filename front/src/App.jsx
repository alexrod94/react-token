import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Test from "../pages/Test";
import Verify from "../components/Verify";

function App() {
  return (
    <>
      <Routes>
        <Route element={<SignUp />} path="/"></Route>
        <Route element={<Login />} path="/login"></Route>
        <Route
          element={
            <Verify>
              <Test />
            </Verify>
          }
          path="/test"
        ></Route>
      </Routes>
    </>
  );
}

export default App;
