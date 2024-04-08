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
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("community_name", name)
    formData.append("description", description)
    formData.append("image_url", image)

    setImageLoading(true);

    // const payload = {
    //   community_name: name,
    //   description,
    //   image_url: image,
    // };

    const newCommunity = await dispatch(writeCommunity(formData));
    if (newCommunity.errors) {
      setErrors(newCommunity.errors);
      setImageLoading(false)
    }
    else navigate(`/communities/${newCommunity.id}`);
  };

  return (
    <>
      <div>
        {(
          <div className="community-page-create">
            <form className="community-form" onSubmit={onSubmit} encType="multipart/form-data">
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
              </div>
              <p className="community-errors">
                  {errors.community_name ? errors.community_name : null}
              </p>

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
              </div>
              <p className="community-errors">
                  {errors.description ? errors.description : null}
                </p>

              <div className="column-styles-image">
                <p>Community Image:</p>
                <div className="input-image-div">
                  <input
                    className="input-image"
                    type="file"
                    accept="image/*"
                    // value={image}
                    onChange={(e) => setImage(e.target.files[0])}
                  ></input>
                </div>
              </div>
              <p className="community-errors">
                  {errors.image_url ? errors.image_url : null}
                </p>
              <button className="community-submit" type="submit">
                Submit
              </button>
              <div className="loading">
                {(imageLoading) && <p>Loading...</p>}
              </div>

            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default CommunityForm;
