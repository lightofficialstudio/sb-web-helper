import { store } from "@stores/store";

export const getHeaders = () => {
  const state = store.getState();
  const { school_id, user_id } = state.callRefreshToken.draftValues;
  const token = state.callRefreshToken.response?.data?.token;

  console.log(state.callRefreshToken);

  return {
    "Content-Type": "application/json",
    [`JabjaiKey-${school_id}-${user_id}`]: token,
  };
};
