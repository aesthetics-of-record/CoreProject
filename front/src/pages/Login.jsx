import axios from "axios";
import base_url from "../config/BaseUrl";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { logInAPI } from "../api/user";
const MySwal = withReactContent(Swal);

axios.defaults.baseURL = base_url;

function Login() {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: e.target.id.value,
      pw: e.target.pw.value,
    };
    logInAPI(data).then(async (res) => {
      console.log(res.data);
      navigate("/");
    });
  };

  return (
    <form className={"m-auto w-96"} onSubmit={onSubmit}>
      <div
        className={"border-2 border-blue-300 text-slate-600 w-96 bg-slate-300"}
      >
        <div className={"m-2"}>
          <p>아이디</p>
          <input type={"text"} className={"w-full"} name={"id"} required />
        </div>
        <div className={"m-2"}>
          <p>비밀번호</p>
          <input type={"password"} className={"w-full"} name={"pw"} required />
        </div>
        <button
          type={"submit"}
          className={
            "w-24 bg-blue-500 rounded-xl text-slate-100 p-1 m-3 hover:bg-red-500"
          }
        >
          로그인
        </button>
        <button
          type={"button"}
          className={
            "ml-36 w-24 bg-green-600 rounded-xl text-slate-100 p-1 m-3 hover:bg-indigo-500"
          }
          onClick={() => {
            navigate("/register");
          }}
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

export default Login;
