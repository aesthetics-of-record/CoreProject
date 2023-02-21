import axios from "axios";
import { useNavigate } from "react-router-dom";
import base_url from "../config/BaseUrl";
import { registerAPI } from "../api/user";

axios.defaults.baseURL = base_url;

function Register() {
  const navigate = useNavigate();

  const onsubmit = (e) => {
    e.preventDefault();

    const data = {
      id: e.target.id.value,
      pw: e.target.pw.value,
      nickname: e.target.nickname.value,
    };
    registerAPI().then((res) => {
      navigate("/");
    });
  };

  return (
    <form className={"m-auto w-96"} onSubmit={onsubmit}>
      <div
        className={
          "border-2 border-blue-300 rounded-xl text-slate-600 w-96 bg-indigo-300"
        }
      >
        <div className={"m-2"}>
          <p>아이디</p>
          <input
            type={"text"}
            className={"w-full rounded-xl px-3 py-1"}
            name={"id"}
            required
          />
        </div>
        <div className={"m-2"}>
          <p>비밀번호</p>
          <input
            type={"password"}
            className={"w-full rounded-xl px-3 py-1"}
            name={"pw"}
            required
          />
        </div>
        <div className={"m-2"}>
          <p>닉네임</p>
          <input
            type={"text"}
            className={"w-full rounded-xl px-3 py-1"}
            name={"nickname"}
            required
          />
        </div>
        <button
          type={"submit"}
          className={
            "ml-36 w-24 transition duration-500 bg-fuchsia-400 shadow-md shadow-fuchsia-400/70 rounded-xl text-slate-100 p-1 m-3 hover:bg-indigo-500 hover:shadow-indigo-500/70 hover:scale-110"
          }
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

export default Register;