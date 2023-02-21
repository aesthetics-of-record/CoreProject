import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Tab from "./components/Tab";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import { Write } from "./pages/Write";
import { Marketing } from "./pages/Marketing";

// 기본
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<Tab />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/MyGroup"} element={<div>미완1</div>} />
          <Route path={"/Marketing"} element={<Marketing />} />
        </Route>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/detail/:id"} element={<Detail />}></Route>
        <Route path={"/write"} element={<Write />}></Route>
      </Routes>
    </>
  );
}

export default App;
