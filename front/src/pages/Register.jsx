import axios from "axios";
import { useNavigate } from "react-router-dom";
import base_url from "../config/BaseUrl";
import { registerAPI } from "../api/user";
import Swal from "sweetalert2";

axios.defaults.baseURL = base_url;

function Register() {
  const navigate = useNavigate();

  const idWarning = () => {
    Swal.fire({
      icon: "warning",
      title: "이미 존재하는 아이디입니다.",
      text: "다른 아이디를 입력 해 주세요.",
    });
  };

  const onsubmit = (e) => {
    e.preventDefault();

    const data = {
      pw: e.target.pw.value,
      id: e.target.id.value,
      nickname: e.target.nickname.value,
    };
    registerAPI(data).then((res) => {
      if (!res.data.success) {
        idWarning();
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "success",
          title: "회원가입 성공 !",
        });
        navigate("/");
      }
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
