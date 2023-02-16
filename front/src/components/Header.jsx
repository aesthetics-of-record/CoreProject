import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTab } from "../store";
import { Cookies } from "react-cookie";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

  return (
    <nav className={"mb-5"}>
      <ul className="md:grid md:grid-cols-12 md:justify-items-center">
        <Link
          to={"/"}
          onClick={() => {
            dispatch(setTab(0));
          }}
        >
          <i className="fa-sharp fa-solid fa-house text-xl"></i>
        </Link>
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
          {cookies.get("user") ? (
            <button
              type={"button"}
              className={
                "w-24 bg-blue-500 rounded-xl text-slate-100 p-1 transition duration-300 hover:bg-red-500"
              }
              onClick={async () => {
                if (cookies.get("user")) {
                  cookies.remove("user");
                  await dispatch(setTab(0));
                  navigate("/");
                }
              }}
            >
              로그아웃
            </button>
          ) : (
            <button
              type={"button"}
              className={
                "w-24 bg-blue-500 rounded-xl text-slate-100 p-1 transition duration-300 hover:bg-red-500"
              }
              onClick={() => {
                if (!cookies.get("user")) {
                  navigate("/login");
                }
              }}
            >
              로그인
            </button>
          )}
        </li>
        <li className={"col-end-13"}>
          {cookies.get("user") ? (
            <i className="fa-solid fa-circle-user text-2xl text-blue-500 transition duration-300 hover:text-indigo-500" />
          ) : (
            <i className="fa-solid fa-circle-user text-2xl transition duration-300 hover:text-indigo-500" />
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
