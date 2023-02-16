import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import base_url from "../BaseUrl";
import { setPost } from "../store";
import { Cookies } from "react-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Detail(props) {
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const cookies = new Cookies();

  // id에 맞는 상품 찾기
  let finded_post;
  for (let i = 0; i < post.length; i++) {
    if (post[i]._id == id) {
      finded_post = post[i];
    }
  }

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
          {/*<button*/}
          {/*  className="text-slate-100 font-bold rounded-xl bg-blue-400 p-1 w-24 mb-3 shadow-md shadow-blue-500/50 transition ease-in-out hover:bg-red-500 hover:shadow-red-500"*/}
          {/*  onClick={() => {*/}
          {/*    axios*/}
          {/*      .put(base_url + "/edit/" + id, {})*/}
          {/*      .then(() => {*/}
          {/*        axios.get(base_url + "/api/post/read").then((res) => {*/}
          {/*          dispatch(setPost(res.data));*/}
          {/*          navigate("/");*/}
          {/*        });*/}
          {/*      })*/}
          {/*      .catch((err) => {*/}
          {/*        console.log(err);*/}
          {/*      });*/}
          {/*  }}*/}
          {/*>*/}
          {/*  수정하기*/}
          {/*</button>*/}
          <button
            className="text-slate-100 font-bold rounded-xl bg-red-400 p-1 w-24 mb-3 shadow-md shadow-red-500/50 transition ease-in-out hover:bg-blue-500 hover:shadow-blue-500"
            onClick={() => {
              if (!cookies.get("user")) {
                MySwal.fire({
                  icon: "warning",
                  text: "로그인이 필요합니다.",
                  confirmButtonText: "확인",
                });
                return;
              }
              if (!(cookies.get("user").id === finded_post.author_id)) {
                MySwal.fire({
                  icon: "warning",
                  text: "본인이 쓴 글만 삭제 가능합니다.",
                  confirmButtonText: "확인",
                });
              } else {
                axios
                  .delete(base_url + "/delete/" + id)
                  .then(() => {
                    axios.get(base_url + "/api/post/read").then((res) => {
                      dispatch(setPost(res.data));
                      navigate("/");
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
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
