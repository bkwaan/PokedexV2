import * as actions from "./types";
import axios from "axios";

export const getComment = (id) => async (dispatch) => {
  try {
    let comment = await axios.get("/api/Comment/GetComment/PokeID/" + id);
    if (comment.data.Success) {
      dispatch({
        type: actions.GET_COMMENT,
        payload: comment.data.Data,
        id: id,
      });
    } else {
      dispatch({
        type: actions.GET_COMMENT,
        payload: "Comment has not been added",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const addComment =
  (PokeID, UserName, CommentBody) => async (dispatch) => {
    try {
      let comment = await axios.post("/api/Comment/AddComment", {
        PokeID: PokeID,
        UserName: UserName,
        CommentBody: CommentBody,
      });
      dispatch({
        type: actions.ADD_COMMENT,
        payload: comment.data.Data,
        id: PokeID,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const delComment = (PokeID, id) => async (dispatch) => {
  try {
    let comment = await axios.delete("/api/Comment/DeleteComment", {
      data: {
        PokeID: PokeID,
        id: id,
      },
    });
    dispatch({
      type: actions.DEL_COMMENT,
      payload: comment.data.Msg,
      PokeID: PokeID,
      id: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const likeComment =
  (PokeID, commentID, userID, likeAction) => async (dispatch) => {
    try {
      let comment =
        likeAction === "like"
          ? await axios.put("/api/Comment/LikeComment", {
              commentID,
              userID,
            })
          : await axios.put("/api/Comment/UnlikeComment", {
              commentID,
              userID,
            });
      dispatch({
        type: actions.LIKE_COMMENT,
        payload: { comment: comment.data.Data, PokeID, commentID, userID, likeAction },
      });
    } catch (err) {
      console.log(err);
    }
  };



export const editComment = (PokeID, _id, CommentBody) => async (dispatch) => {
  try {
    let comment = await axios.put("/api/Comment/UpdateComment", {
      _id,
      CommentBody,
    });
    dispatch({
      type: actions.EDIT_COMMENT,
      payload: comment.data.Data,
      PokeID: PokeID,
      _id: _id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const sortComment = (PokeId, sortBy) => (dispatch) => {
  dispatch({
    type: actions.SORT_COMMENT,
    payload: {
      PokeId,
      sortBy,
    },
  });
};
