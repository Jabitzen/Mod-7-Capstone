import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/postReducer";
import { useNavigate } from "react-router-dom";
import "./DeletePostButton.css";


function DeletePostButton({ postId, communityId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removePost = async (e) => {
    e.preventDefault();

    navigate(`/communities/${communityId}`)
    dispatch(deletePost(postId))
  };
  return (
    <button
      className="delete-post-button"
      onClick={(e) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this Post?")) {
          removePost(e);
        }
      }}
    >
      Delete
    </button>
  );
}

export default DeletePostButton;
