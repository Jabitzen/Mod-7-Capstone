import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCommunities } from "../../redux/communityReducer";
import { fetchAllPosts } from "../../redux/postReducer";
import { useNavigate } from "react-router-dom";
import DeletePostButton from "../PostForms/DeletePostButton";
import "./LandingPage.css";

function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const communities = useSelector((state) => state.communityState);
    const communityArr = Object.values(communities);
    const posts = useSelector((state) => state.postState)
    const postsArr = Object.values(posts);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
      dispatch(fetchAllCommunities())
      .then(dispatch(fetchAllPosts()));
    }, [dispatch]);

    if (!communities) return;
    if (!communityArr) return;
    if (!posts) return;
    if (!postsArr) return;

    return (
      <div>
        <h1 className="welcome-bar">Welcome to the feed!</h1>

        <div className="landing-page-container">

          <div className="landing-page-posts-container">
          <h1 className="posts-header">Popular posts to check out!</h1>
              <div className="card-container">
                {postsArr?.map((post) => (
                  <div
                    className="post-card"
                    key={post.id}
                    onClick={() => {
                      navigate(`/posts/${post.id}`)
                    }}
                  >
                    <p className="post-title">{post.title}</p>
                      <div className="post-image-container">
                        <img
                          className="post-image"
                          src={post.image_url}
                        />
                      </div>
                      {/* <p className="post-description">"{post.description}"</p> */}
                      {/* <div className="post-manage-buttons">
                      {post?.owner_id === user?.id && (
                        <>
                          <button
                            className="update-post-button"
                            onClick={() =>
                              navigate(`/posts/${post.id}/update`)
                            }
                          >
                            Update Post
                          </button>
                          <DeletePostButton
                            postId={post.id}
                          />
                        </>
                      )}

                    </div> */}
                    </div>

              ))}
              </div>
          </div>

          <div className="landing-page-community-container">
            <h1 className="community-header">Cool Communities!</h1>
            <div className="landing-page-buttons-container">
                {user && (
                  <>
                    <button
                      className="create-post-button"
                      onClick={() =>
                        navigate(`/posts/new`)
                      }
                    >
                      Create Post
                    </button>
                  </>
                )}
                {user && (
                  <>
                    <button
                      className="create-community-button"
                      onClick={() =>
                        navigate(`/communities/new`)
                      }
                    >
                      Create Community
                    </button>
                  </>
                )}
            </div>

            {communityArr?.map((community, idx) => (
              <div
                className="community-card"
                key={idx}
                onClick={() => {
                  navigate(`/communities/${community.id}`);
                }}
              >
                <div className="community-card-content">
                  <h2 className="community-name">{community.community_name}</h2>
                  <h2 className="community-description">{community.description}</h2>
                  <img className="community-image" src={community.image_url}></img>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  export default LandingPage;
