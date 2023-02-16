import axios from "axios";
import base_url from "../BaseUrl";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Login() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  return (
    <form
      className={"m-auto w-96"}
      onSubmit={async (e) => {
        e.preventDefault();

        axios
          .post(base_url + "/login", {
            id: e.target.id.value,
            pw: e.target.pw.value,
          })
          .then(async (res) => {
            if (res.data.success === false) {
              MySwal.fire({
                title: "로그인 실패",
                text: res.data.message,
                icon: "warning",
                confirmButtonText: "확인",
              });
              return;
            }
            if (res.data.success === true) {
              await cookies.set(
                "user",
                { id: res.data.user.id, nickname: res.data.user.nickname },
                {
                  path: "/",
                  secure: true,
                  maxAge: 1200,
                }
              );
              navigate("/");
              const Toast = MySwal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "success",
                title: "Signed in successfully",
              });
            }
          });
      }}
    >
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
            navigate("../register");
          }}
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

export default Login;
