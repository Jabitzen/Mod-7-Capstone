import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCommunity } from "../../redux/communityReducer";
import { fetchCommunityPosts } from "../../redux/postReducer";
import { useNavigate, useParams } from "react-router-dom";
import "./CommunityPage.css";
// import DeleteRestaurantButton from "./DeleteRestaurantButton";
import DeleteCommunityButton from "./DeleteCommunityButton";
import DeletePostButton from "../PostForms/DeletePostButton";

function CommunityPage() {
  const { communityId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const communities = useSelector((state) => state.communityState);
  const community = communities[communityId]

  const posts = useSelector((state) => state.postState)
  const postsArr = Object.values(posts);
  console.log("POST", posts)

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchCommunity(communityId));
    dispatch(fetchCommunityPosts(communityId))
  }, [dispatch, communityId]);

  return (
    <>
      {community && (
        <div className="community-page-container">

          <div className="banner-image-container">
            {/* <img className="banner-image" src={community[communityId]?.imageUrl}></img> */}
          </div>
          <hr></hr>

          <div className="community-page-header-container">
            <img className="community-page-header-image" src={community.image_url}></img>
            <h1 className="community-name">Welcome to {community?.community_name} </h1>
          </div>
          <hr></hr>

          <div className="community-page-details-container">

            <div className="community-page-posts-container">
              {postsArr?.map((post) => (
                  <div
                    className="post-card"
                    key={post.id}
                    onClick={() => {
                      navigate(`/posts/${post.id}`)
                    }}
                  >
                    <p className="post-title">{post.title}</p>
                    <h4 className="post-owner">Posted by {post.owner?.username}</h4>
                    <div className="post-image-container">
                      <img
                        className="post-image"
                        src={post.image_url}
                      />
                    </div>
                    <p className="post-description">"{post.description}"</p>
                    <div className="post-manage-buttons">
                      {post?.owner_id === user?.id && (
                        <>
                          <button
                            className="update-post-button"
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/posts/${post.id}/update`)
                              }
                            }
                          >
                            Update Post
                          </button>
                          <DeletePostButton
                            postId={post.id}
                            communityId={communityId}
                          />
                        </>
                      )}

                    </div>
                  </div>
                ))}
            </div>

            <div className="about-community-container">
              <h1>About Community</h1>
              <h2>{community.description}</h2>

              <div className="manage-community-button-container">
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
                {community?.owner_id === user?.id && (
                  <>
                    <button
                      className="manage-community-button"
                      onClick={() =>
                        navigate(`/communities/${community.id}/update`)
                      }
                    >
                      Update Community
                    </button>
                    <DeleteCommunityButton
                      communityId={community.id}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
}

export default CommunityPage;
