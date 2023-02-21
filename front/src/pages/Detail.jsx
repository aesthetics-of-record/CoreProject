import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Cookies } from "react-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { setPost } from "../store/store";
import base_url from "../config/BaseUrl";
import { deleteHomePostAPI } from "../api/post";

const MySwal = withReactContent(Swal);

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

  const onClick = () => {
    deleteHomePostAPI(id)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
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
