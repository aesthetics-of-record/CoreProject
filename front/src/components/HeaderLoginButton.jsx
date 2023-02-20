import { useEffect } from "react";
import { checkLogInAPI } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { setLogIn } from "../store/store";
import { useNavigate } from "react-router-dom";

export const HeaderLoginButton = () => {
  const logIn = useSelector((state) => state.logIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 업데이트 될 때마다 불려진다. [logIn] 을 추가하면, 이상하게 안 된다. 추후 최적화하자.
  useEffect(() => {
    checkLogInAPI().then((res) => {
      console.log("렌더링");
      dispatch(setLogIn(res.data.logIn));
    });
  });

  return (
    <>
      {logIn ? (
        <button
          type={"button"}
          className={
            "w-24 bg-blue-500 rounded-xl text-slate-100 p-1 transition duration-300 hover:bg-red-500"
          }
          onClick={() => {
            navigate("/");
          }}
        >
          로그아웃
        </button>
      ) : (
        <button
          type={"button"}
          className={
            "w-24 bg-blue-500 rounded-xl text-slate-100 p-1 transition duration-300 hover:bg-red-500"
          }
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </button>
      )}
    </>
  );
};
