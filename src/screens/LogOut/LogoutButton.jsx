import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { LogOut } from "lucide-react-native";
import { useDispatch } from "react-redux";

import LogoutPopup from "./LogoutPopup.jsx";
import { logoutUser } from "../../utils/authStorage";
import { theme } from "../../theme/index.js";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      const success = await logoutUser(dispatch);

      if (success) {
        setVisible(false);
      }
    } catch (error) {
      console.log("Logout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setVisible(true)}
        disabled={loading}
        style={{
          width: "100%",
          height: 62,

          marginTop: 20,
          marginBottom: 40,

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",

          backgroundColor: "#FFD8C8",

          borderWidth: 1,
          borderColor: "#FFB9A8",

          borderRadius: 12,

          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color="#FF503F"
          />
        ) : (
          <>
            <LogOut
              size={23}
              color="#FF503F"
              strokeWidth={1.8}
            />

            <Text
              style={{
                marginLeft: 12,

                color: "#FF503F",

                fontSize: 17,
                fontFamily: theme.fonts.semiBold,
              }}
            >
              Logout
            </Text>
          </>
        )}
      </TouchableOpacity>

      <LogoutPopup
        visible={visible}
        loading={loading}
        onClose={() => setVisible(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default LogoutButton;
 