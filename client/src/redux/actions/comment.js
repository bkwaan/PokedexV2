import * as actions from "./types";
import axios from "axios";

export const getComment = (id) => async (dispatch) => {
  try {
    let comment = await axios.get("/api/Comment/GetComment/PokeID/" + id);
    dispatch({
      type: actions.GET_COMMENT,
      payload: comment.data.Data,
      id: id,
    });
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
      PokeID: PokeID,
      id: id,
    });
    dispatch({
      type: actions.DEL_COMMENT,
      payload: comment.data.Success,
      PokeID: PokeID,
      id: id
    });
  } catch (err) {
    console.log(err);
  }
};
