//action type creator
const LOAD_POST = "post/loadPost";
const LOAD_ALL_POSTS = "post/loadAllPosts";
const LOAD_OWNER_POSTS = "post/ownerPosts";
const LOAD_COMMUNITY_POSTS = "posts/communityPosts"
const ADD_POST = "post/addPost";
const REMOVE_POST = "post/removePost";
const UPDATE_POST = "post/updatePost";
const CLEAR_POSTS = "post/clearPosts";

//action creator
export const loadPost = (post) => {
  return {
    type: LOAD_POST,
    post,
  };
};

export const loadAllPosts = (posts) => {
  return {
    type: LOAD_ALL_POSTS,
    posts,
  };
};

export const loadCommunityPosts = (posts) => {
  return {
    type: LOAD_COMMUNITY_POSTS,
    posts,
  };
};

export const loadOwnerPosts = (posts) => {
  return {
    type: LOAD_OWNER_POSTS,
    posts,
  };
};

export const addPost = (post) => {
  return {
    type: ADD_POST,
    post,
  };
};

export const removePost = (postId) => {
  return {
    type: REMOVE_POST,
    postId,
  };
};

export const updatePost = (post) => {
  return {
    type: UPDATE_POST,
    post,
  };
};

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  };
};

//thunk action creator
export const fetchPost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);
  const post = await response.json();
  dispatch(loadPost(post));
};

export const fetchCommunityPosts = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}/posts`);
  const posts = await response.json();
  dispatch(loadAllPosts(posts));
};

export const fetchAllPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts/");
  const posts = await response.json();
  dispatch(loadAllPosts(posts));
};

export const fetchOwnerPosts = () => async (dispatch) => {
  const response = await fetch(`/api/posts/current`);
  const posts = await response.json();
  dispatch(loadOwnerPosts(posts));
};

export const writePost = (payload) => async (dispatch) => {
  const response = await fetch("/api/posts/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const post = await response.json();
  if (response.status !== 201) {
    return post;
  }
  if (response.ok) {
    dispatch(addPost(post));
    return post;
  }
};

export const deletePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/delete`, {
    method: "DELETE",
  });
  if (response.ok) {
    const post = await response.json();
    dispatch(removePost(postId));
    return post;
  }
};

export const editPost = (postId, payload) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/edit`, {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const post = await response.json();
    dispatch(updatePost(payload));
    return post;
  }
};

//reducer
const postReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_POST:
      return { ...state, [action.post.id]: action.post };
    case LOAD_ALL_POSTS: {
      const postState = {};
      console.log("action", action)
      action.posts.forEach((post) => {
        postState[post.id] = post;
      });
      return postState;
    }
    case LOAD_OWNER_POSTS: {
        const postState = {};
      action.posts.posts.forEach((post) => {
        postState[post.id] = post;
      });
      return postState;
    }
    case LOAD_COMMUNITY_POSTS: {
      const postState = {};
    action.posts.posts.forEach((post) => {
      postState[post.id] = post;
    });
    return postState;
  }
    case ADD_POST:
      return { ...state, [action.post.id]: action.post };
    case REMOVE_POST: {
      const newState = { ...state };
      delete newState[action.postId];
      return newState;
    }
    case UPDATE_POST:
      return { ...state, [action.post.id]: action.post };
    case CLEAR_POSTS:
      return {};
    default:
      return state;
  }
};

export default postReducer;
