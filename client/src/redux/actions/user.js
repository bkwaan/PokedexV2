import axios from "axios";
import { LOGIN, LOGOUT, VALID_OTP, UPDATE_PROFILE_DATA, VERIFY_ACCOUNT, REQUEST_NEW_VERIFICATION_LINK, LIKE_POKE, FAVORITE_ITEM_CLICKED, FAVORITE_ITEM_CLICKED_CLEAR, GET_USER_COMMENTS } from '../actions/types'

// Actions
export const loginUser = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const verifiedOtp = () => {
  return {
    type: VALID_OTP,
  };
};

export const updateProfile = (data) => {
  return {
    type: UPDATE_PROFILE_DATA,
    payload: data,
  };
};

export const updatePokeLike = (data) => {
  return {
    type: LIKE_POKE,
    payload: data,
  };
};

export const verifyUserAccount = () => {
  return {
    type: VERIFY_ACCOUNT,
  }
}

export const requestNewVerificationLink = () => {
  return {
    type: REQUEST_NEW_VERIFICATION_LINK
  }
}


export const profilePokeClicked = (FavouritePokemonClicked) => {
  return {
    type: FAVORITE_ITEM_CLICKED,
    payload: FavouritePokemonClicked
  }
}

export const profilePokeClickedClear = (id) => {
  return {
    type: FAVORITE_ITEM_CLICKED_CLEAR,
  }
}

export const getUserComments = (data) =>{
  return {
    type: GET_USER_COMMENTS,
    payload: data
  }
}

// Thunks
//Adds user to state after they login and validate their otp
export const verifyOtpCode =
  (userName, token) => async (dispatch, getState) => {
    try {
      const res = await axios.post("/api/User/VerifyOTP", {
        UserName: userName,
        Token: token,
      });
      dispatch(verifiedOtp());
    } catch (err) {
      throw err;
    }
  };

export const loginUserAsync =
  (UserName, Password) => async (dispatch, getState) => {
    try {
      const res = await axios.post("/api/User/Login", {
        UserName: UserName,
        Password: Password,
      });
      dispatch(loginUser(res.data.clientInfo));
    } catch (err) {
      throw err;
    }
  };

export const updateUserAsync = (userData) => async (dispatch, getState) => {
  try {
    const res = await axios.post("api/User/UpdateUser", userData);
    dispatch(updateProfile(res.data.clientInfo));
  } catch (err) {
    throw err;
  }
};

export const updatePokeLikeAsync =
  (PokeID, userID, pokeAction) => async (dispatch, getState) => {
    try {
      var res;
      pokeAction === "like"
        ? (res = await axios.put("api/User/FavouritePoke", {
          userID,
          PokeID,
        }))
        : (res = await axios.put("api/User/UnfavouritePoke", {
          userID,
          PokeID,
        }));
      let data = {
        data: res.data,
        pokeAction,
      };
      dispatch(updatePokeLike(data));
    } catch (error) {
      throw error;
    }
  }

export const verifyUserAccountAsync = (userName, token) => async (dispatch, getState) => {
  try {
    const res = await axios.put('/api/User/VerifyAccount', { UserName: userName, VerifyToken: token });
    dispatch((verifyUserAccount()));
  } catch (err) {
    throw err;
  }
}

export const requestNewVerificationLinkAsync = (userName) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`/api/User/NewVerificationLink/${userName}`);
    dispatch((requestNewVerificationLink()));
  } catch (err) {
    throw err;
  }
}


export const getUserCommentsAsync = (UserName) => async (dispatch, getState) => {
  try{
    const res = await axios.get(`/api/Comment/GetUserComments/${UserName}`)
    dispatch(getUserComments(res.data.payload))
  }catch(err){
    throw err
  }
}





