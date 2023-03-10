import {
  API_HOST,
  ROUT_GETUSER,
  ROUT_SAVE_PAGES,
  ROUT_USER,
  ROUT_ACTIVATION,
  ROUT_RESET_PASSWORD,
} from "../../data/constants";

import { IPage, IUserData, IUserResponseMessage } from "../../types/interface";

import { AppDispatch } from "../store";
import { userSlice } from "./user.slice";
import autorization from "./autorization";
import getTokens from "./getTokens";

export const getUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.getUser());
    const url = `${API_HOST}${ROUT_GETUSER}`;
    const accessToken = sessionStorage.getItem("accessToken");
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ accessToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const status = response.status;

    if (status === 500) {
      throw new Error("Server is not available");
    }

    if (status === 401) {
      await autorization(getUser());
    }

    if (status === 200) {
      const data: IUserData = await response.json();
      data.accessToken &&
        sessionStorage.setItem("accessToken", data.accessToken);
      data.refreshToken &&
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

export async function sendActivationMail(email: string) {
  try {
    const url = `${API_HOST}${ROUT_ACTIVATION}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return response;
  } catch (error) {
    console.error("Couldn't send activation email");
  }
}

export async function resetPasswordFromLogin(email: string) {
  try {
    const url = `${API_HOST}${ROUT_RESET_PASSWORD}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return response;
  } catch (error) {
    console.error("Couldn't reset password");
  }
}

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

      if (status === 500) {
        throw new Error("Server is not available");
      }
      if (status === 401) {
        throw new Error("Invalid token");
      }
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
    let loading = false;
    if (!loading) {
      try {
        loading = true;
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

        if (status === 500) {
          throw new Error("Server is not available");
        }
        if (status === 401) {
          await getTokens();
          this.updateUser(updateData);
        }
        if (status === 200) {
          const pagesData: IUserResponseMessage = await response.json();
          loading = false;
          return { ...pagesData, ...{ status } };
        } else {
          throw new Error("Error Server");
        }
      } catch (err) {
        console.error(err);
      }
    }
  },

  async updatePages(pages: IPage[]): Promise<IUserResponseMessage | undefined> {
    let loading = false;
    if (!loading) {
      try {
        loading = true;
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
        if (status === 500) {
          throw new Error("Server is not available");
        }
        if (status === 401) {
          await getTokens();
          this.updatePages(pages);
        }
        if (status === 200) {
          const pagesData: IUserResponseMessage = await response.json();
          loading = false;
          return { ...pagesData, ...{ status } };
        }
      } catch (err) {
        console.error(err);
      }
    }
  },

  async activeteUser(id: string): Promise<IUserResponseMessage | undefined> {
    try {
      const url = `${API_HOST}${ROUT_USER}/${id}`;
      const response = await fetch(url);
      const status = response.status;
      if (status === 500) {
        throw new Error("Server is not available");
      }
      if (status === 401) {
        throw new Error("Invalid token");
      }
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
