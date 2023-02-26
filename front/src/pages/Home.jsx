import { useEffect } from "react";
import { Cookies } from "react-cookie"; // 쿠키를 다루기 위한 라이브러리

// redux toolkit 사용을 위한 라이브러리 및 만든 함수 불러오기
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../store/store";

// sweetalert2 : alerts 디자인 라이브러리
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// const MySwal = withReactContent(Swal);

// axios : 비동기 HTTP 통신 라이브러리
// axios 기본 url 설정
import axios from "axios";
import base_url from "../config/BaseUrl";

// 컴포넌트
import PostCardScreen from "../components/PostCardScreen";
import { loadHomePostsAPI } from "../api/post";
import { useNavigate } from "react-router-dom";
import { checkLogInAPI } from "../api/user";
import Swal from "sweetalert2";

axios.defaults.baseURL = base_url;

function Home() {
  // state 사용을 위한 리덕스 설정
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const navigate = useNavigate();

  // 처음 컴포넌트가 마운트 될 때 실행
  // 외부 api 요청하고 state에 저장함
  useEffect(() => {
    loadHomePostsAPI().then((res) => {
      dispatch(setPost(res.data));
    });
  }, []);

  const loginWarning = () => {
    Swal.fire({
      icon: "warning",
      title: "로그인이 필요합니다.",
    });
  };

  const onClick = () => {
    checkLogInAPI().then((res) => {
      if (res.data.logIn) {
        navigate("/write");
      } else {
        loginWarning();
      }
    });
  };

  return (
    <div className={"relative"}>
      <div>
        <span className={"mx-8 text-xl font-bold text-slate-600"}>
          충북대학교 동아리
        </span>
        <button
          className={
            "bg-blue-400 text-slate-100 font-bold p-1 px-2 rounded-xl transition hover:scale-110"
          }
          onClick={onClick}
        >
          동아리추가
        </button>
      </div>

      {/* post[0]는 post가 빈 배열일 때 false를 의미한다. */}
      <div>{post[0] ? <PostCardScreen /> : []}</div>
    </div>
  );
}

export default Home;
