import { GET_COMMENT, ADD_COMMENT, DEL_COMMENT } from "../actions/types";

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
        comments: { comments },
      };
    }
    case DEL_COMMENT: {
      let comments = state.comments[action.PokeID][0];
      comments.filter((item) => action.id != item._id);
      return {
        ...state,
        comments: { comments },
      };
    }
    default:
      return state;
  }
}
