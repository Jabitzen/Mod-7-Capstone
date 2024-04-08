import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCommunity } from "../../redux/communityReducer";
import { fetchPost } from "../../redux/postReducer";
import { useNavigate, useParams } from "react-router-dom";
import "./PostPage.css";
// import DeleteRestaurantButton from "./DeleteRestaurantButton";
import DeleteCommunityButton from "../CommunityPage/DeleteCommunityButton";
import DeletePostButton from "../PostForms/DeletePostButton";

function PostPage() {
  const { postId } = useParams();
  const posts = useSelector((state) => state.postState);
  const post = posts[postId];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const communityId = post?.community_id;
  const communities = useSelector((state) => state.communityState);
  const community = communities[communityId]

  console.log("POST", posts)

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchPost(postId));
    dispatch(fetchCommunity(communityId))
  }, [dispatch, postId, communityId]);

  return (
    <>
      {community && post && (
        <div className="community-page-container">

          <div className="banner-image-container">
            {/* <img className="banner-image" src={community[communityId]?.imageUrl}></img> */}
          </div>

          <div className="community-page-header-container">
            <img className="community-page-header-image" src={community.image_url}></img>
            <h1 className="community-name">Welcome to {community?.community_name} </h1>
          </div>

          <div className="community-details-container">

            <div className="posts-container">
              {/* {postsArr?.map((post) => ( */}
                  <div
                    className="post-page-card"
                    key={post.id}
                  >
                    <p className="post-title">{post?.title}</p>
                    <h4 className="post-owner">Posted by {post?.owner?.username}</h4>
                    <div className="post-image-container">
                      <img
                        className="post-image"
                        src={post?.image_url}
                      />
                    </div>
                    <p className="post-description">"{post.description}"</p>
                    <div className="post-manage-buttons">
                      {post?.owner_id === user?.id && (
                        <>
                          <button
                            className="update-post-button"
                            onClick={() =>
                              navigate(`/posts/${post?.id}/update`)
                            }
                          >
                            Update Post
                          </button>
                          <DeletePostButton
                            postId={post?.id}
                            communityId={communityId}
                          />
                        </>
                      )}

                    </div>
                  </div>
                {/* // ))} */}
            </div>

            <div className="about-community-container">
              <h1>About Community</h1>
              <h2>{community.description}</h2>

              <div className="manage-community-button-container">


                    <button
                      className="manage-community-button"
                      onClick={() =>
                        navigate(`/communities/${post?.community_id}`)
                      }
                    >
                      Back to Community
                    </button>


              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
export default PostPage;
