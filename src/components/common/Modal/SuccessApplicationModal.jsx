import React from "react";

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  CircleCheckBig,
  Copy,
  Eye,
  X,
} from "lucide-react-native";

import { theme } from "../../../theme";

const SuccessApplicationModal = ({
  visible,
  onClose,
  referenceId = "VL2026012636",
  onCopy,
  onViewStatus,
}) => {

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >

      {/* ================= OVERLAY ================= */}

      <View
        style={{
          flex: 1,

          backgroundColor:
            "rgba(0,0,0,0.58)",

          justifyContent: "center",

          alignItems: "center",

          paddingHorizontal: 30,
        }}
      >



        {/* ================= MODAL ================= */}

        <View
          style={{
            width: "100%",

            maxWidth: 370,

            backgroundColor:
              theme.colors.white,

            borderRadius: 24,

            overflow: "hidden",

            elevation: 20,

            shadowColor: "#000",

            shadowOffset: {
              width: 0,
              height: 10,
            },

            shadowOpacity: 0.30,

            shadowRadius: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,

              width: 36,
              height: 36,

              borderRadius: 18,

              backgroundColor: "#F5F5F5",

              justifyContent: "center",
              alignItems: "center",

              zIndex: 20,
            }}
          >
            <X
              size={20}
              color={theme.colors.gray700}
              strokeWidth={2}
            />
          </TouchableOpacity>
          {/* ================= SUCCESS ICON ================= */}

          <View
            style={{
              alignItems: "center",

              paddingTop: 40,
            }}
          >

            {/* Outer Cream Circle */}

            <View
              style={{
                width: 100,

                height: 100,

                borderRadius: 50,

                backgroundColor:
                  "#FFF0D9",

                justifyContent:
                  "center",

                alignItems:
                  "center",
              }}
            >

              {/* Orange Circle */}

              <View
                style={{
                  width: 68,

                  height: 68,

                  borderRadius: 34,

                  backgroundColor:
                    "#F4510B",

                  justifyContent:
                    "center",

                  alignItems:
                    "center",

                  elevation: 5,

                  shadowColor:
                    "#F4510B",

                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },

                  shadowOpacity: 0.30,

                  shadowRadius: 8,
                }}
              >

                <CircleCheckBig
                  size={34}
                  color="#FFFFFF"
                  strokeWidth={3}
                />

              </View>

            </View>

          </View>


          {/* ================= TITLE ================= */}

          <Text
            style={{
              marginTop: 22,

              textAlign: "center",

              color:
                theme.colors.navy900,

              fontSize: 24,

              lineHeight: 30,

              fontFamily:
                theme.fonts.headingBold,
            }}
          >
            Application Submitted!
          </Text>


          {/* ================= DESCRIPTION ================= */}

          <Text
            style={{
              marginTop: 8,

              marginHorizontal: 18,

              textAlign: "center",

              color:
                theme.colors.gray700,

              fontSize: 16,

              lineHeight: 23,

              fontFamily:
                theme.fonts.medium,
            }}
          >
            Your loan application has been received and
            {"\n"}
            is being processed by our team.
          </Text>


          {/* ================= REFERENCE ================= */}

          <View
            style={{
              marginTop: 18,

              height: 34,

              backgroundColor:
                "#FFF9F3",

              borderTopWidth: 1,

              borderBottomWidth: 1,

              borderColor:
                "#F5E8DA",

              flexDirection: "row",

              justifyContent: "center",

              alignItems: "center",
            }}
          >

            <Text
              style={{
                color:
                  theme.colors.gray600,

                fontSize: 11,

                fontFamily:
                  theme.fonts.medium,

                letterSpacing: 0.6,
              }}
            >
              REFERENCE ID :
            </Text>

            <Text
              style={{
                marginLeft: 8,

                color:
                  theme.colors.navy900,

                fontSize: 13,

                fontFamily:
                  theme.fonts.bold,
              }}
            >
              {referenceId}
            </Text>

          </View>


          {/* ================= COPY ID ================= */}

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onCopy}
            style={{
              height: 38,

              backgroundColor:
                "#FFF9F3",

              flexDirection: "row",

              justifyContent:
                "center",

              alignItems:
                "center",
            }}
          >

            <Copy
              size={16}
              color="#A7A7A7"
              strokeWidth={1.8}
            />

            <Text
              style={{
                marginLeft: 8,

                color:
                  "#A7A7A7",

                fontSize: 12,

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              Copy ID
            </Text>

          </TouchableOpacity>


          {/* ================= STATUS BUTTON ================= */}

          <View
            style={{
              paddingHorizontal: 72,

              paddingTop: 28,

              paddingBottom: 40,
            }}
          >

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onViewStatus}
              style={{
                height: 48,

                borderRadius: 8,

                borderWidth: 1,

                borderColor:
                  "#FFD8BE",

                backgroundColor:
                  "#FFFFFF",

                flexDirection: "row",

                justifyContent:
                  "center",

                alignItems: "center",
              }}
            >

              <Eye
                size={17}
                color="#F4510B"
                strokeWidth={2}
              />

              <Text
                style={{
                  marginLeft: 10,

                  color:
                    "#F4510B",

                  fontSize: 13,

                  fontFamily:
                    theme.fonts.semiBold,
                }}
              >
                View Application Status
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </View>

    </Modal>
  );
};

export default SuccessApplicationModal;