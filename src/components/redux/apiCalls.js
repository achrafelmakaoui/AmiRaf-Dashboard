import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../../RequestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));

    // Save token in localStorage after successful login
    localStorage.setItem("userToken", res.data.accessToken);
  } catch (err) {
    dispatch(loginFailure());
  }
};
