import { store } from "../redux/store";
import { authApi } from "../redux/features/auth/authApi";
import { updateUser } from "../redux/slices/authSlice";

export const syncVisitorProfile = async () => {

  try {

    const result = await store.dispatch(

      authApi.endpoints.getVisitorProfile.initiate(
        undefined,
        {
          subscribe: false,
          forceRefetch: true,
        }
      )

    );

    const profile =
      result?.data?.data;

    if (!profile) {

      console.log(
        "Visitor Profile Sync: Profile not found"
      );

      return null;

    }

    store.dispatch(
      updateUser(profile)
    );

    console.log(
      "✅ Visitor Profile Synced Successfully"
    );

    return profile;

  } catch (error) {

    console.log(
      "❌ Visitor Profile Sync Error:",
      error
    );

    return null;

  }

};