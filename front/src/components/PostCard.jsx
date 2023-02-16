import {useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';

/** api로 요청받은 데이터를 반복하여 얻은 객체와 index를 넣으면,
 * 카드 엘리먼트를 리턴해준다. */
const PostCard = ({postData, index}) => {
    const navigate = useNavigate()

    return (
        <div
            className={
                "border-2 m-2 p-2 transition duration-300 shadow-lg cursor-pointer hover:scale-110 hover:shadow-blue-300"
            }
            key={index}
            onClick={() => {
                navigate("/detail/" + postData._id);
            }}
        >
            <div
                style={{backgroundImage: "url(./img/core_logo.png)"}}
                className={"h-28 bg-center bg-no-repeat"}
            ></div>
            <div>{postData.title}</div>
            <p className={"text-slate-400 text-sm"}>{postData.content}</p>
        </div>
    )
}

PostCard.propTypes = {
    postData: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
}

export default PostCard;