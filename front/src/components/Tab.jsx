import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../store";

function Tab() {
  let navigate = useNavigate()
  const tab = useSelector((state) => state.tab);
  const dispatch = useDispatch()

  return (
    <><div className={"grid grid-cols-8 justify-items-stretch border-b-2 border-slate-400 text-center"}>
      <div className={"rounded-t-xl hover:border-slate-200 hover:border-t-2 hover:border-x-2 " + (tab === 0? 'rounded-t-xl border-slate-400 border-x-2 border-t-2':null)} onClick={()=>{navigate('/')
        dispatch(setTab(0))}}>홈</div>
      <div className={"rounded-t-xl hover:border-slate-200 hover:border-t-2 hover:border-x-2 " + (tab === 1? 'rounded-t-xl border-slate-400 border-x-2 border-t-2':null)} onClick={()=>{navigate('/MyGroup')
        dispatch(setTab(1))}}>나의 동아리</div>
      <div className={"rounded-t-xl hover:border-slate-200 hover:border-t-2 hover:border-x-2 " + (tab === 2? 'rounded-t-xl border-slate-400 border-x-2 border-t-2':null)} onClick={()=>{navigate('/Marketing')
        dispatch(setTab(2))}}>홍보게시판</div>
    </div>
    <Outlet></Outlet>
    </>

  );
}

export default Tab;