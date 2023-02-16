import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Tab from "./components/Tab";


// 기본
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
        <Route path={"/login"} element={<span />} />
        <Route path={"/register"} element={<span />} />
        <Route path={"/detail/:id"} element={<span />}></Route>
      </Routes>
    </>
  );
}

export default App;
