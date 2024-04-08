// import { useState } from "react";
import { deleteCommunity } from "../../redux/communityReducer";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom"
import "../CommunityPage/DeleteModal.css";

function DeletePostModal({postId, communityId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deletePost(postId))
    closeModal();
    navigate(`/communities/${communityId}`)

  };

  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  };


  return (
    <>
        <div className="login-modal">
            <h1 className="title">Are you sure you want to delete?</h1>
            <button className="yes" onClick={handleDelete}>Yes</button>
            <button className="no" onClick={handleCancel}>No</button>
        </div>
    </>
  );
}

export default DeletePostModal;
