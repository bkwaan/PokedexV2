import {
  GET_COMMENT,
  ADD_COMMENT,
  DEL_COMMENT,
  EDIT_COMMENT,
} from "../actions/types";

const initialState = { comments: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT:
      return {
        ...state,
        comments: { ...state.comments, [action.id]: [action.payload] },
      };
    case ADD_COMMENT: {
      let comments = state.comments;
      let newComm = [action.payload];
      comments[action.id] === undefined
        ? (comments[action.id] = newComm)
        : comments[action.id][0].push(action.payload);
      return {
        ...state,
        comments
      };
    }
    case DEL_COMMENT: {
      let comments = state.comments;
      comments[action.PokeID][0] = comments[action.PokeID][0].filter(
        (item) => action.id != item._id
      );
      return {
        ...state,
        comments,
      };
    }
    case EDIT_COMMENT: {
      let comments = state.comments;
      let index = comments[action.PokeID][0].findIndex(
        (comment) => comment._id === action._id
      );
      comments[action.PokeID][0][index].CommentBody =
        action.payload.CommentBody;
      return {
        ...state,
        comments,
      };
    }
    default:
      return state;
  }
}
