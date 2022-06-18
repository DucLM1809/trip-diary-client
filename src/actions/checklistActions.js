import api from "../api/axios";
import { CHECKLIST_GET_DATA } from "../constants/checklistConstants";

export const getCheckList = (location) => async (dispatch) => {
  try {
    const accessToken = localStorage
      .getItem("accessToken")
      .toString()
      .split('"')[1];

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (accessToken) {
      config.headers.Authorization = `bearer ${accessToken}`;
    }

    const { data } = await api.get(
      `/trips/${location.pathname.split("/")[3]}/checklist`,
      config
    );
    dispatch({ type: CHECKLIST_GET_DATA, payload: data });
  } catch {}
};
