import {useSelector} from "react-redux";
import PostCard from "./PostCard";

const PostCardScreen = () => {
    const postDataList = useSelector((state) => state.post);

    return (
        <div className={"text-slate-700 m-5 grid grid-cols-2 md:grid-cols-4"}>
            {postDataList.map((postData, index) => {
                    return <PostCard postData={postData} index={index}/>
                }
            )
            }
        </div>
    )
}

export default PostCardScreen;