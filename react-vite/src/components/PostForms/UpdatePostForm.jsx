import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, editPost } from "../../redux/postReducer";
import { fetchAllCommunities } from "../../redux/communityReducer";
import { useNavigate, useParams } from "react-router-dom";
import "./PostForms.css";

function UpdatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const post = useSelector((state) => state.postState[postId])

  const [name, setName] = useState(post?.title);
  const [description, setDescription] = useState(post?.description);
  const [image, setImage] = useState(post?.image_url);
//   const [communityId, setCommunityId] = useState(post?.community_id);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchPost(postId));
    setName(post?.title);
    setDescription(post?.description);
    setImage(post?.image_url);
  }, [dispatch, postId, post?.title, post?.description, post?.image_url]);


  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: name || post?.title,
      description: description || post?.description,
      image_url: image || post?.image_url,
      community_id: post?.community_id,
    };

    const newPost = await dispatch(editPost(postId, payload));
    if (newPost.errors) setErrors(newPost.errors);
    else navigate(`/posts/${post?.id}`);
  };

  return (
    <>
      <div>
        {(
          <div className="post-page-create form">
            <form className="post-form" onSubmit={onSubmit}>
              <h1 className="post-title-form">Create Your Post</h1>

              <div className="column-styles">
                <p>Update your post title (optional)</p>
                <input
                  className="input-area"
                  type="text"
                  placeholder="Enter A Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // required
                ></input>
                <p className="post-errors">
                  {errors.title ? errors.title : null}
                </p>
              </div>

              <div className="column-styles">
                <p>Update your post description (optional)</p>
                <input
                  className="input-area"
                  type="text"
                  placeholder="Enter A Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  // required
                ></input>
                <p className="post-errors">
                  {errors.description ? errors.description : null}
                </p>
              </div>

              <div className="column-styles">
                <p>Update your post image (optional)</p>
                <input
                  className="input-area"
                  type="url"
                  placeholder="Enter New Image Url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <p className="post-errors">
                  {errors.image_url ? errors.image_url : null}
                </p>
              </div>
              <button className="post-submit" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default UpdatePost;
