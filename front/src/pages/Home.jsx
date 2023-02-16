import { useEffect, useState } from "react";
import base_url from "../BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Home() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);

  const [add_btn, setAdd_btn] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    axios.get(base_url + "/api/post/read").then((res) => {
      dispatch(setPost(res.data));
    });
  }, [add_btn]);

  return (
    <div className={"relative"}>
      <div>
        <span className={"mx-8 text-xl font-bold text-slate-600"}>
          충북대학교 동아리
        </span>
        {add_btn == false ? (
          <button
            type={"button"}
            className={
              "w-24 bg-blue-500 rounded-xl text-slate-100 p-1 m-3 transition duration-300 hover:bg-emerald-600"
            }
            onClick={() => {
              if (cookies.get("user")) {
                setAdd_btn(true);
              } else {
                MySwal.fire({
                  icon: "warning",
                  title: "로그인이 필요합니다.",
                  confirmButtonText: "확인",
                });
              }
            }}
          >
            동아리추가
          </button>
        ) : null}
      </div>

      {/* post[0]는 post가 빈 배열일 때 false를 의미한다. */}
      <div>{post[0] ? <CardComponent post={post} /> : []}</div>

      {add_btn == true ? <Add setAdd_btn={setAdd_btn} /> : null}
    </div>
  );
}

function CardComponent(props) {
  let navigate = useNavigate();

  return (
    <div className={"text-slate-700 m-5 grid grid-cols-2 md:grid-cols-4"}>
      {props.post.map((x, i) => {
        return (
          <div
            className={
              "border-2 m-2 p-2 transition duration-300 shadow-lg cursor-pointer hover:scale-110 hover:shadow-blue-300"
            }
            key={i}
            onClick={() => {
              navigate("/detail/" + x._id);
            }}
          >
            <div
              style={{ backgroundImage: "url(./img/core_logo.png)" }}
              className={"h-28 bg-center bg-no-repeat"}
            ></div>
            <div>{x.title}</div>
            <p className={"text-slate-400 text-sm"}>{x.content}</p>
          </div>
        );
      })}
    </div>
  );
}

function Add(props) {
  let dispatch = useDispatch();
  const cookies = new Cookies();

  return (
    <form
      className={"m-auto w-96"}
      onSubmit={(e) => {
        e.preventDefault();

        const nickname = cookies.get("user").nickname;

        axios
          .post(base_url + "/add", {
            title: e.target.title.value,
            content: e.target.content.value,
            author: nickname,
          })
          .then(() => {
            props.setAdd_btn(false);
          });
      }}
    >
      <div
        className={"border-2 border-blue-300 text-slate-600 w-96 bg-slate-300"}
      >
        <div className={"m-2"}>
          <p>동아리 이름</p>
          <input type={"text"} className={"w-full"} name={"title"} />
        </div>
        <div className={"m-2"}>
          <p>동아리 한줄 소개</p>
          <input type={"text"} className={"w-full"} name={"content"} />
          {/*<textarea className={"w-full h-52"} name={"content"}></textarea>*/}
        </div>
        <button
          type={"submit"}
          className={"w-24 bg-blue-500 rounded-xl text-slate-100 p-1 m-3"}
        >
          발행
        </button>
        <button
          type={"button"}
          className={"w-24 bg-red-500 rounded-xl text-slate-100 p-1 m-3"}
          onClick={() => {
            props.setAdd_btn(false);
          }}
        >
          취소
        </button>
      </div>
    </form>
  );
}

export default Home;
