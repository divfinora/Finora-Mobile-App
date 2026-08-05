import React from "react";

import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

import {
  LogOut,
} from "lucide-react-native";

 
import CommonButton from "../../components/common/Button/CommonButton";
import { theme } from "../../theme";

 

const LogoutPopup = ({
  visible,
  onClose,
  onLogout,
}) => {

  return (

    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >

      <TouchableWithoutFeedback onPress={onClose}>

        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.45)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >

          <TouchableWithoutFeedback>

            <View
              style={{
                width: "100%",
                backgroundColor: "#FFFFFF",
                borderRadius: 26,
                padding: 24,
              }}
            >

              {/* ========================= */}
              {/* ICON */}
              {/* ========================= */}

              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FFF2F2",
                }}
              >

                <LogOut
                  size={34}
                  color="#E84B4B"
                />

              </View>

              {/* ========================= */}
              {/* TITLE */}
              {/* ========================= */}

              <Text
                style={{
                  marginTop: 18,
                  textAlign: "center",
                  fontSize: 22,
                  color: "#1E293B",
                  fontFamily: theme.fonts.bold,
                }}
              >
                Logout
              </Text>

              {/* ========================= */}
              {/* MESSAGE */}
              {/* ========================= */}

              <Text
                style={{
                  marginTop: 10,
                  textAlign: "center",
                  color: "#64748B",
                  fontSize: 15,
                  lineHeight: 22,
                  paddingHorizontal: 10,
                }}
              >
                Are you sure you want to logout from your account?
              </Text>

              {/* ========================= */}
              {/* BUTTONS */}
              {/* ========================= */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >

                {/* Cancel */}

                <View
                  style={{
                    flex: 1,
                    marginRight: 8,
                  }}
                >

                  <CommonButton
                    title="Cancel"
                    variant="outline"
                    onPress={onClose}
                  />

                </View>

                {/* Logout */}

                <View
                  style={{
                    flex: 1,
                    marginLeft: 8,
                  }}
                >

                  <CommonButton
                    title="Logout"
                    onPress={onLogout}
                  />

                </View>

              </View>

            </View>

          </TouchableWithoutFeedback>

        </View>

      </TouchableWithoutFeedback>

    </Modal>

  );

};

export default LogoutPopup;