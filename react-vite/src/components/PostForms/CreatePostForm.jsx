import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { writePost } from "../../redux/postReducer";
import { fetchAllCommunities } from "../../redux/communityReducer";
import { useNavigate } from "react-router-dom";
import "./PostForms.css";

function PostForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const communitiesObj = useSelector((state) => state.communityState);
  const communities = Object.values(communitiesObj);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [communityId, setCommunityId] = useState(communities[0]?.id);
//   setCommunityId(communities[0]?.id);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchAllCommunities());
  }, [dispatch]);

  const communityChoices = communities.map((community) => (
    <option value={community.id} key={community.id}>
      {community.community_name}
    </option>
  ));



  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", name)
    formData.append("description", description)
    formData.append("image_url", image)
    formData.append("community_id", communityId)

    setImageLoading(true)

    // const payload = {
    //   title: name,
    //   description,
    //   image_url: image,
    //   community_id: communityId
    // };

    const newPost = await dispatch(writePost(formData));
    if (newPost.errors) {
      setErrors(newPost.errors);
      setImageLoading(false)
    }
    else navigate(`/communities/${communityId}`);
  };

  return (
    <>
      <div>
        {(
          <div className="post-page-create">
            <form className="post-form" onSubmit={onSubmit}>
              <h1 className="post-title-form">Create Your Post</h1>
              <div className="column-styles">
                <p>What community does your post belong to?</p>
                <select
                  className="input-area"
                  value={communityId}
                  name="communityId"
                  defaultValue={communities[0]?.id}
                  onChange={(e) => {
                    setCommunityId(e.target.value)

                }}
                >
                    {/* <option>select</option> */}
                    {communityChoices}
                </select>

              </div>
              <p className="post-errors">
                  {errors.community_id ? errors.community_id : null}
                </p>

              <div className="column-styles">
                <p>What is the name of your post?</p>
                <input
                  className="input-area"
                  type="text"
                  placeholder="Enter A Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // required
                ></input>

              </div>
              <p className="post-errors">
                  {errors.title ? errors.title : null}
                </p>

              <div className="column-styles">
                <p>What is your post description?</p>
                <input
                  className="input-area"
                  type="text"
                  placeholder="Enter A Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  // required
                ></input>

              </div>
              <p className="post-errors">
                  {errors.description ? errors.description : null}
                </p>

              <div className="column-styles-image">
                <p>Post Image:</p>
                <div className="input-image-div">
                  <input
                    className="input-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  ></input>
                </div>

              </div>
              <p className="post-errors">
                  {errors.image_url ? errors.image_url : null}
                </p>
              <button className="post-submit" type="submit">
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

export default PostForm;
