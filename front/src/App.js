import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail";
import Tab from "./components/Tab";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path={"/"} element={<Tab />}>
          <Route path={""} element={<Home />} />
          <Route path={"/MyGroup"} element={<div>미완1</div>} />
          <Route path={"/Marketing"} element={<div>미완2</div>} />
        </Route>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path="/detail/:id" element={<Detail />}></Route>
      </Routes>
    </>
  );
}

export default App;
