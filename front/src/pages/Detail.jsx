import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Cookies } from "react-cookie";
import { setLogIn, setPost } from "../store/store";
import base_url from "../config/BaseUrl";
import { deleteHomePostAPI } from "../api/post";

// sweetalert2 : alerts 디자인 라이브러리
import Swal from "sweetalert2";
import { checkLogInAPI } from "../api/user";

axios.defaults.baseURL = base_url;

function Detail(props) {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // id에 맞는 글 찾기
  let finded_post;
  for (let i = 0; i < post.length; i++) {
    if (post[i]._id == id) {
      finded_post = post[i];
    }
  }

  const loginWarning = () => {
    Swal.fire({
      icon: "warning",
      title: "로그인이 필요합니다.",
    });
  };

  const authorWarning = () => {
    Swal.fire({
      icon: "warning",
      title: "본인이 작성한 글만 삭제 가능합니다.",
    });
  };

  const deleteWarning = () => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "한 번 삭제하면 다시 되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제!",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("삭제!", "글이 성공적으로 삭제 되었습니다.", "success");
        deleteHomePostAPI(id)
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const onClick = () => {
    checkLogInAPI().then((res) => {
      // console.log(res.data);
      if (!res.data.logIn) {
        loginWarning();
      } else if (res.data.id != finded_post.id) {
        authorWarning();
      } else {
        deleteWarning();
      }
    });
  };

  return (
    <div
      className={
        "border-4 border-slate-500 p-4 rounded-3xl mt-20 ml-28 mr-28 h-96"
      }
    >
      <div
        className={
          "border-b-4 border-slate-500 text-slate-700 grid grid-cols-2"
        }
      >
        <div className={""}>
          {finded_post.title}{" "}
          <span className={"text-slate-400"}>({finded_post.author})</span>
        </div>
        <div className={"place-self-end"}>
          <button
            className="text-slate-100 font-bold rounded-xl bg-red-400 p-1 w-24 mb-3 shadow-md shadow-red-500/50 transition ease-in-out hover:bg-blue-500 hover:shadow-blue-500"
            onClick={onClick}
          >
            삭제
          </button>
        </div>
      </div>
      <div className={"whitespace-pre-wrap text-slate-700"}>
        {finded_post.content}
      </div>
    </div>
  );
}

export default Detail;
