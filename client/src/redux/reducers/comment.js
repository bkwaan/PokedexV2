import {
  GET_COMMENT,
  ADD_COMMENT,
  DEL_COMMENT,
  EDIT_COMMENT,
  SORT_COMMENT,
  LIKE_COMMENT,
} from "../actions/types";

let comments = [...Array(156)].map(() => [[]]);

const initialState = {
  comments,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT:
      let comments = [...state.comments];
      let getComments = action.payload;
      getComments.map((comment) => {
        comments[action.id][0].push(comment);
      });
      return {
        ...state,
        comments,
      };
    case ADD_COMMENT: {
      let comments = [...state.comments];
      comments[action.id][0].push(action.payload);
      return {
        ...state,
        comments,
      };
    }
    case DEL_COMMENT: {
      let comments = [...state.comments];
      comments[action.PokeID][0] = comments[action.PokeID][0].filter(
        (item) => action.id != item._id
      );
      return {
        ...state,
        comments,
      };
    }
    //   case EDIT_COMMENT: {
    //     let comments = state.comments;
    //     let index = comments[action.PokeID][0].findIndex(
    //       (comment) => comment._id === action._id
    //     );
    //     comments[action.PokeID][0][index].CommentBody =
    //       action.payload.CommentBody;
    //     return {
    //       ...state,
    //       comments,
    //     };
    //   }

    case SORT_COMMENT: {
      let comments = [...state.comments];
      let sortComments = comments[action.payload.PokeId][0];

      action.payload.sortBy === "Newest"
        ? (sortComments = sortComments.sort(
            (a, b) => Date.parse(b.CommentDate) - Date.parse(a.CommentDate)
          ))
        : (sortComments = sortComments.sort(
            (a, b) => Date.parse(a.CommentDate) - Date.parse(b.CommentDate)
          ));

      comments[action.payload.PokeID] = sortComments;
      return {
        ...state,
        comments,
      };
    }

    case LIKE_COMMENT: {
      let comments = [...state.comments];
      let commentIndex = comments[action.payload.PokeID][0].findIndex(
        (comment) => comment._id === action.payload.commentID
      );
      action.payload.likeAction === "like"
        ? comments[action.payload.PokeID][0][commentIndex].Likes.push(
            action.payload.userID
          )
        : (comments[action.payload.PokeID][0][commentIndex].Likes = comments[
            action.payload.PokeID
          ][0][commentIndex].Likes.filter(
            (item) => item != action.payload.userID
          ));
      return {
        ...state,
        comments,
      };
    }
    default:
      return state;
  }
}
