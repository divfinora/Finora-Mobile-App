import React, { useState } from "react";

import {
  TouchableOpacity,
  Text,
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

  // ==========================================
  // HANDLE LOGOUT
  // ==========================================

  const handleLogout = async () => {

    try {

      setLoading(true);

      const success = await logoutUser(dispatch);

      if (success) {

        setVisible(false);

      }

    } catch (error) {

      console.log("Logout Error :", error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <>

      {/* ========================================== */}
      {/* LOGOUT BUTTON */}
      {/* ========================================== */}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setVisible(true)}
        style={{

          marginTop: 28,

          marginBottom: 40,

          height: 58,

          borderRadius: 18,

          backgroundColor: "#FFE3DE",

          justifyContent: "center",

          alignItems: "center",

          flexDirection: "row",

        }}
      >

        <LogOut
          size={20}
          color="#FF4D3D"
        />

        <Text
          style={{

            marginLeft: 10,

            color: "#FF4D3D",

            fontSize: 16,

            fontFamily: theme.fonts.semiBold,

          }}
        >
          Logout
        </Text>

      </TouchableOpacity>

      {/* ========================================== */}
      {/* LOGOUT POPUP */}
      {/* ========================================== */}

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