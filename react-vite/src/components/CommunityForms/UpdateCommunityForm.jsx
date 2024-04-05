import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCommunity, editCommunity } from "../../redux/communityReducer";
import "./CreateCommunityForm.css";

function UpdateCommunity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { communityId } = useParams();
  const community = useSelector(
    (state) => state.communityState[communityId]
  );

  const [name, setName] = useState(community?.community_name);
  const [description, setDescription] = useState(community?.description);
  const [image, setImage] = useState(community?.image_url);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCommunity(communityId))
    setName(community?.community_name);
    setDescription(community?.description);
    setImage(community?.image_url);
  }, [ dispatch, communityId, community?.community_name, community?.description, community?.image_url]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      community_name: name || community?.community_name,
      description: description || community?.description,
      image_url: image || community?.image_url,
    };

    const response = await dispatch(editCommunity(communityId, payload));
    console.log("RESPONSE", response)
    if (response.errors) setErrors(response.errors);
    else navigate(`/communities/${response.id}`);
  };

  return (
    <div>
      {community && (
        <div className="community-page-create">
          <form className="community-form" onSubmit={onSubmit}>
            <h1 className="community-title-form">Update Your Community</h1>
            <div className="column-styles">
              <p>Update community name (optional)</p>
              <input
                className="input-area"
                type="text"
                placeholder="Enter A Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                // required
              ></input>
              <p className="community-errors">
                {errors.community_name ? errors.community_name : null}
              </p>
            </div>

            <div className="column-styles">
              <p>Update community description (optional)</p>
              <input
                className="input-area"
                type="text"
                placeholder="Enter A Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                // required
              ></input>
              <p className="community-errors">
                {errors.description ? errors.description : null}
              </p>
            </div>
            <div className="column-styles">
              <p>Update community image (optional)</p>
              <input
                className="input-area"
                type="url"
                placeholder="Enter New Image Url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
              <p className="community-errors">
                {errors.image_url ? errors.image_url : null}
              </p>
            </div>
            <button className="community-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateCommunity;
