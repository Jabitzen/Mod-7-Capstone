//action type creator
const LOAD_COMMUNITY = "community/loadCommunity";
const LOAD_ALL_COMMUNITIES = "community/loadAllCommunities";
const LOAD_OWNER_COMMUNITIES = "community/ownerCommunities";
const ADD_COMMUNITY = "community/addCommunity";
const REMOVE_COMMUNITY = "community/removeCommunity";
const UPDATE_COMMUNITY = "community/updateCommunity";
const CLEAR_COMMUNITIES = "community/clearCommunities";

//action creator
export const loadCommunity = (community) => {
  return {
    type: LOAD_COMMUNITY,
    community,
  };
};

export const loadAllCommunities = (communities) => {
  return {
    type: LOAD_ALL_COMMUNITIES,
    communities,
  };
};

export const loadOwnerCommunities = (communities) => {
  return {
    type: LOAD_OWNER_COMMUNITIES,
    communities,
  };
};

export const addCommunity = (community) => {
  return {
    type: ADD_COMMUNITY,
    community,
  };
};

export const removeCommunity = (communityId) => {
  return {
    type: REMOVE_COMMUNITY,
    communityId,
  };
};

export const updateCommunity = (community) => {
  return {
    type: UPDATE_COMMUNITY,
    community,
  };
};

export const clearCommunities = () => {
  return {
    type: CLEAR_COMMUNITIES
  };
};

//thunk action creator
export const fetchCommunity = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}`);
  const community = await response.json();
  dispatch(loadCommunity(community));
};

export const fetchAllCommunities = () => async (dispatch) => {
  const response = await fetch("/api/communities/");
  const communities = await response.json();
  dispatch(loadAllCommunities(communities));
};

export const fetchOwnerCommunities = () => async (dispatch) => {
  const response = await fetch(`/api/communities/current`);
  const communities = await response.json();
  dispatch(loadOwnerCommunities(communities));
};

export const writeCommunity = (payload) => async (dispatch) => {
  const response = await fetch("/api/communities/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const community = await response.json();
  if (response.status !== 201) {
    return community;
  }
  if (response.ok) {
    dispatch(addCommunity(community));
    return community;
  }
};

export const deleteCommunity = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}/delete`, {
    method: "DELETE",
  });
  if (response.ok) {
    const community = await response.json();
    dispatch(removeCommunity(communityId));
    return community;
  }
};

export const editCommunity = (communityId, payload) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}/edit`, {
    method: "PUT",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const community = await response.json();
    dispatch(updateCommunity(payload));
    return community;
  } else {
    return await response.json();
  }
};

//reducer
const communityReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_COMMUNITY:
      return { ...state, [action.community.id]: action.community };
    case LOAD_ALL_COMMUNITIES: {
      const communityState = {};
      console.log("HERE", action)
      action.communities.forEach((community) => {
        communityState[community.id] = community;
      });
      return communityState;
    }
    case LOAD_OWNER_COMMUNITIES: {
        const communityState = {};
      action.communities.communities.forEach((community) => {
        communityState[community.id] = community;
      });
      return communityState;
    }
    case ADD_COMMUNITY:
      return { ...state, [action.community.id]: action.community };
    case REMOVE_COMMUNITY: {
      const newState = { ...state };
      delete newState[action.communityId];
      return newState;
    }
    case UPDATE_COMMUNITY:
      return { ...state, [action.community.id]: action.community };
    case CLEAR_COMMUNITIES:
      return {};
    default:
      return state;
  }
};

export default communityReducer;
