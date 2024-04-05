import { useDispatch } from "react-redux";
import { deleteCommunity } from "../../redux/communityReducer";
import { useNavigate } from "react-router-dom";
import "./DeleteCommunityButton.css";


function DeleteCommunityButton({ communityId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeCommunity = async (e) => {
    e.preventDefault();
    dispatch(deleteCommunity(communityId)).then(navigate(`/`));
  };
  return (
    <button
      className="delete-community-button"
      onClick={(e) => {
        if (window.confirm("Are you sure you want to delete this Community?")) {
          removeCommunity(e);
        }
      }}
    >
      Delete Community
    </button>
  );
}

export default DeleteCommunityButton;
