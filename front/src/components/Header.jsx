import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTab } from "../store/store";
import { HeaderLoginButton } from "./HeaderLoginButton";

function Header() {
  const dispatch = useDispatch();

  return (
    <nav className={"mb-5"}>
      <ul className="md:grid md:grid-cols-12 md:justify-items-center">
        <li>
          <Link
            to={"/"}
            onClick={() => {
              dispatch(setTab(0));
            }}
          >
            <i className="fa-sharp fa-solid fa-house text-xl"></i>
          </Link>
        </li>
        <li>
          <Link
            to="/"
            onClick={() => {
              dispatch(setTab(0));
            }}
          >
            CoreProject
          </Link>
        </li>
        <li className={"col-end-9"}>
          <form className={"flex h-8"}>
            <input
              type={"text"}
              className={"bg-slate-200 rounded-l-lg p-2"}
              placeholder={"동아리 이름, 분야"}
            />
            <i className="fa-solid fa-magnifying-glass bg-slate-200 text-2xl px-3 rounded-r-lg"></i>
          </form>
        </li>
        <li className={"col-end-12"}>
          <HeaderLoginButton />
        </li>
        <li className={"col-end-13"}>
          <i className="fa-solid fa-circle-user text-2xl text-slate-500 transition duration-300 hover:text-indigo-500" />
        </li>
      </ul>
    </nav>
  );
}

export default Header;
