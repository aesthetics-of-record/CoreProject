import axios from "axios";
import base_url from "../config/BaseUrl";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { logInAPI } from "../api/user";

axios.defaults.baseURL = base_url;

function Login() {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: e.target.id.value,
      pw: e.target.pw.value,
    };
    logInAPI(data)
      .then(async (res) => {
        if (res.data.success) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            // didOpen: (toast) => {
            //   toast.addEventListener("mouseenter", Swal.stopTimer);
            //   toast.addEventListener("mouseleave", Swal.resumeTimer);
            // },
          });

          Toast.fire({
            icon: "success",
            title: "로그인 성공 !",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        Swal.fire({
          icon: "error",
          title: "다시 입력 해주세요",
          text: "아이디/비번이 올바르지 않습니다.",
        });
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
