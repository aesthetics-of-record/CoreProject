import {useEffect} from "react";
import {Cookies} from "react-cookie"; // 쿠키를 다루기 위한 라이브러리

// redux toolkit 사용을 위한 라이브러리 및 만든 함수 불러오기
import {useDispatch, useSelector} from "react-redux";
import {setPost} from "../store/store";

// sweetalert2 : alert 디자인 라이브러리
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// const MySwal = withReactContent(Swal);

// axios : 비동기 HTTP 통신 라이브러리
// axios 기본 url 설정
import axios from "axios";
import base_url from "../BaseUrl";
import PostCard from "../components/PostCard";
import PostCardScreen from "../components/PostCardScreen";

axios.defaults.baseURL = base_url;


function Home() {
    // state 사용을 위한 리덕스 설정
    const dispatch = useDispatch();
    const post = useSelector((state) => state.post);

    // 처음 컴포넌트가 마운트 될 때 실행
    // 외부 api 요청하고 state에 저장함
    useEffect(() => {
        axios.get(base_url + "/api/post/read").then((res) => {
            dispatch(setPost(res.data));
        });
    }, []);


    return (
        <div className={"relative"}>
            <div>
        <span className={"mx-8 text-xl font-bold text-slate-600"}>
          충북대학교 동아리
        </span>
            </div>

            {/* post[0]는 post가 빈 배열일 때 false를 의미한다. */}
            <div>{post[0] ? <PostCardScreen/> : []}</div>
        </div>
    );
}


export default Home;
