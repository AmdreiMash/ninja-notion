import {
  API_HOST,
  ROUT_LOGIN,
  ROUT_SAVE_PAGES,
  ROUT_USER,
} from "../../data/constants";
// import { dataTestUser } from "../../data/dataTestUser";

import {
  IUserEmailPassword,
  IPage,
  IUserData,
  IUserResponseMessage,
} from "../../types/interface";

import { AppDispatch } from "../store";
import { userSlice } from "./user.slice";

export const gerUset =
  (userLogin: IUserEmailPassword) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userSlice.actions.getUser());
      const url = `${API_HOST}${ROUT_LOGIN}`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userLogin),
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });

      const data: IUserData = await response.json();
      // const data = dataTestUser; // demo
      if (response.status === 500) {
        throw new Error("Server is not available");
      }
      if (
        response.status === 200 &&
        data &&
        data.accessToken &&
        data.refreshToken
      ) {
        sessionStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch(userSlice.actions.getUserSuccess(data));
      } else {
        throw new Error("Error Server");
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(userSlice.actions.getUserError(error?.message));
      }
    }
  };

const UserService = {
  async createUser(
    email: string,
    password: string,
    name: string
  ): Promise<IUserResponseMessage | undefined> {
    try {
      const url = `${API_HOST}${ROUT_USER}}`;
      const body = { email, password, name };
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const status = response.status;
      if (status === 200) {
        const pagesData: IUserResponseMessage = await response.json();
        return { ...pagesData, ...{ status } };
      } else {
        throw new Error("Error Server");
      }
    } catch (err) {
      console.error(err);
    }
  },

  async updateUser(
    updateData: IUserData
  ): Promise<IUserResponseMessage | undefined> {
    try {
      const url = `${API_HOST}${ROUT_USER}/`;
      const accessToken = sessionStorage.getItem("accessToken");
      const body = { ...updateData, ...{ accessToken: accessToken } };
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const status = response.status;

      if (status === 200) {
        const pagesData: IUserResponseMessage = await response.json();
        return { ...pagesData, ...{ status } };
      } else {
        throw new Error("Error Server");
      }
    } catch (err) {
      console.error(err);
    }
  },

  async updatePages(pages: IPage[]): Promise<IUserResponseMessage | undefined> {
    try {
      const url = `${API_HOST}${ROUT_SAVE_PAGES}`;
      const accessToken = sessionStorage.getItem("accessToken");
      const body = { ...{ accessToken: accessToken }, ...{ pages: pages } };
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const status = response.status;
      if (status === 200) {
        const pagesData: IUserResponseMessage = await response.json();
        return { ...pagesData, ...{ status } };
      } else {
        throw new Error("Error Server " + status);
      }
    } catch (err) {
      console.error(err);
    }
  },

  async activeteUser(id: string): Promise<IUserResponseMessage | undefined> {
    try {
      const url = `${API_HOST}${ROUT_USER}/${id}`;
      const response = await fetch(url);
      const status = response.status;
      if (status === 200) {
        const pagesData: IUserResponseMessage = await response.json();
        return { ...pagesData, ...{ status } };
      } else {
        throw new Error("Error Server");
      }
    } catch (err) {
      console.error(err);
    }
  },
};

export default UserService;
