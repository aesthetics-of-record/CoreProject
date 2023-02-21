import axios from "axios";
import base_url from "../config/BaseUrl";
import { addHomePostAPI } from "../api/post";
import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = base_url;

export const Write = () => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
      content: e.target.content.value,
    };
    addHomePostAPI(data).then((res) => {
      console.log(res.data);
      navigate("/");
    });
  };
  const titleLengthLimit = (value) => {
    return value.length <= 10;
  };
  const contentLengthLimit = (value) => {
    return value.length <= 20;
  };

  const titleInput = useInput("", titleLengthLimit);
  const contentInput = useInput("", contentLengthLimit);

  return (
    <div className={"w-96 m-auto text-slate-500 font-bold"}>
      <form
        className={"bg-slate-300 text-center py-10 rounded-2xl"}
        onSubmit={onSubmit}
      >
        <p>동아리 명</p>
        <input
          type="text"
          name={"title"}
          className={"w-64 mb-3"}
          {...titleInput}
        />
        <p>소개</p>
        <input
          type={"text"}
          name={"content"}
          className={"w-64"}
          {...contentInput}
        />
        <div className={"mb-3"} />
        <button
          type={"submit"}
          className={
            "w-24 bg-red-500 rounded-xl text-slate-100 p-1 m-3 hover:scale-110"
          }
        >
          발행
        </button>
        <button
          type={"button"}
          className={
            "w-24 bg-blue-500 rounded-xl text-slate-100 p-1 m-3 hover:scale-110"
          }
          onClick={() => {
            navigate("/");
          }}
        >
          취소
        </button>
      </form>
    </div>
  );
};
