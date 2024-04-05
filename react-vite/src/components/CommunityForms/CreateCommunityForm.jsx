import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeCommunity } from "../../redux/communityReducer";
import { useNavigate } from "react-router-dom";
import "./CreateCommunityForm.css";

function CommunityForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      community_name: name,
      description,
      image_url: image,
    };

    const newCommunity = await dispatch(writeCommunity(payload));
    console.log(newCommunity)
    if (newCommunity.errors) setErrors(newCommunity.errors);
    else navigate(`/communities/${newCommunity.id}`);
  };

  return (
    <>
      <div>
        {(
          <div className="community-page-create">
            <form className="community-form" onSubmit={onSubmit}>
              <h1 className="community-title-form">Create Your Community</h1>
              <div className="column-styles">
                <p>What is the name of your community?</p>
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
                <p>What is your community description?</p>
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
                <p>Community Image</p>
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
    </>
  );
}

export default CommunityForm;
