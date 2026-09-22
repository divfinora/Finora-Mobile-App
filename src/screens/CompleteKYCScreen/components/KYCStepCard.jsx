import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  Check,
  Clock3,
} from "lucide-react-native";

import { theme } from "../../../theme";

import ShimmerPlaceholder
  from "../../../components/common/Loader/ShimmerPlaceholder";


const KYCStepCard = ({
  icon,
  title,
  subtitle,
  onPress,
  verified = false,
  loading = false,
}) => {

  return (

    <TouchableOpacity
      activeOpacity={
        verified
          ? 1
          : 0.9
      }

      onPress={
        verified
          ? undefined
          : onPress
      }

      style={{
        flexDirection:
          "row",

        alignItems:
          "center",

        backgroundColor:
          "#FFFCF9",

        borderRadius:
          16,

        height:
          72,

        paddingHorizontal:
          18,

        marginBottom:
          16,
      }}
    >

      {/* ===================================================== */}
      {/* LEFT ICON */}
      {/* ===================================================== */}

      <View
        style={{
          width: 40,

          alignItems:
            "center",

          justifyContent:
            "center",
        }}
      >

        {loading ? (

          <ShimmerPlaceholder
            width={24}
            height={24}
            borderRadius={12}
          />

        ) : (

          icon

        )}

      </View>


      {/* ===================================================== */}
      {/* TITLE + SUBTITLE */}
      {/* ===================================================== */}

      <View
        style={{
          marginLeft: 14,

          flex: 1,
        }}
      >

        {loading ? (

          <>

            <ShimmerPlaceholder
              width={150}
              height={16}
              borderRadius={6}
            />

            <ShimmerPlaceholder
              width={100}
              height={12}
              borderRadius={6}
              style={{
                marginTop: 6,
              }}
            />

          </>

        ) : (

          <>

            <Text
              style={{
                color:
                  "#1E1E1E",

                fontFamily:
                  theme.fonts.medium,

                fontSize:
                  15,

                lineHeight:
                  22,
              }}
            >
              {title}
            </Text>


            <Text
              style={{
                marginTop:
                  2,

                color:
                  "#9BA2B0",

                fontFamily:
                  theme.fonts.regular,

                fontSize:
                  12,

                lineHeight:
                  18,
              }}
            >
              {subtitle}
            </Text>

          </>

        )}

      </View>


      {/* ===================================================== */}
      {/* STATUS ICON */}
      {/* ===================================================== */}

      <View
        style={{
          width: 32,

          height: 32,

          alignItems:
            "center",

          justifyContent:
            "center",
        }}
      >

        {loading ? (

          <ShimmerPlaceholder
            width={24}
            height={24}
            borderRadius={12}
          />

        ) : verified ? (

          // ================= VERIFIED =================

          <View
            style={{
              width: 22,
              height: 22,

              borderRadius: 13,

              backgroundColor:
                theme.colors.success,

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          >

            <Check
              size={17}

              color={
                theme.colors.white
              }

              strokeWidth={3}
            />

          </View>

        ) : (

          // ================= PENDING =================

          <View
            style={{
              width: 26,
              height: 26,

              borderRadius: 13,

              backgroundColor:
                theme.colors.primary100,

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          >

            <Clock3
              size={18}

              color={
                theme.colors.primary500
              }

              strokeWidth={2.2}
            />

          </View>

        )}

      </View>

    </TouchableOpacity>
  );
};


export default KYCStepCard;