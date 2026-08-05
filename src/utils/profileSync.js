import { store } from "../redux/store";
import { authApi } from "../redux/features/auth/authApi";
import { updateUser } from "../redux/slices/authSlice";

export const syncProfile = async () => {

  try {

    const result = await store.dispatch(

      authApi.endpoints.getProfile.initiate(undefined, {

        subscribe: false,

        forceRefetch: true,

      })

    );

    const profile = result?.data?.data;

    if (!profile) return null;

    store.dispatch(

      updateUser(profile)

    );

    return profile;

  } catch (error) {

    console.log("Profile Sync Error :", error);

    return null;

  }

};