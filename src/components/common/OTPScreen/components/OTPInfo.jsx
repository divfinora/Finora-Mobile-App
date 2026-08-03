// import React from "react";

// import {
//   View,
//   Text,
//   TouchableOpacity,
// } from "react-native";

// import {
//   Edit2,
// } from "lucide-react-native";

// import { theme } from "../../../../theme";

// const OTPInfo = ({
//   title = "Enter OTP",

//   subtitle = "A verification code has been sent to",

//   phone,

//   countryCode = "+91",

//   showEdit = false,

//   onEdit,

//   children,

//   containerStyle,

//   titleStyle,

//   subtitleStyle,

//   phoneStyle,
// }) => {
//   return (
//     <View
//       style={[
//         {
//           width: "100%",
//           marginBottom: theme.spacing.xxxl,
//         },
//         containerStyle,
//       ]}
//     >
//       {!!title && (
//         <Text
//           style={[
//             {
//               color: theme.colors.black,
//               fontSize: theme.typography.displayMD,
//               lineHeight: theme.lineHeight.displayMD,
//               fontFamily: theme.fonts.headingBold,
//             },
//             titleStyle,
//           ]}
//         >
//           {title}
//         </Text>
//       )}

//       {!!subtitle && (
//         <Text
//           style={[
//             {
//               marginTop: theme.spacing.sm,
//               color: theme.colors.textSecondary,
//               fontSize: theme.typography.b1,
//               lineHeight: theme.lineHeight.b1,
//               fontFamily: theme.fonts.medium,
//             },
//             subtitleStyle,
//           ]}
//         >
//           {subtitle}
//         </Text>
//       )}

//       {!!phone && (
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             marginTop: theme.spacing.sm,
//           }}
//         >
//           <Text
//             style={[
//               {
//                 flex: 1,
//                 color: theme.colors.black,
//                 fontSize: theme.typography.b1,
//                 lineHeight: theme.lineHeight.b1,
//                 fontFamily: theme.fonts.bold,
//               },
//               phoneStyle,
//             ]}
//           >
//             {countryCode} {phone}
//           </Text>

//           {showEdit && (
//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={onEdit}
//               style={{
//                 marginLeft: theme.spacing.sm,
//               }}
//             >
//               <Edit2
//                 size={18}
//                 color={theme.colors.primary500}
//                 strokeWidth={2}
//               />
//             </TouchableOpacity>
//           )}
//         </View>
//       )}

//       {children}
//     </View>
//   );
// };

// export default OTPInfo;

import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  Edit2,
} from "lucide-react-native";

import { theme } from "../../../../theme";

const OTPInfo = ({
  title = "Enter OTP",

  subtitle = "A verification code has been sent to",

  phone,

  countryCode = "+91",

  showEdit = false,

  onEdit,

  children,

  containerStyle,

  titleStyle,

  subtitleStyle,

  phoneStyle,
}) => {
  return (
    <View
      style={[
        {
          width: "100%",
        },
        containerStyle,
      ]}
    >
      {!!title && (
        <Text
          style={[
            {
              color: theme.colors.black,
              fontSize: theme.typography.displayMD,
              lineHeight: theme.lineHeight.displayMD,
              fontFamily: theme.fonts.headingBold,
            },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      )}

      {!!subtitle && (
        <Text
          style={[
            {
              marginTop: theme.spacing.sm,
              color: theme.colors.textSecondary,
              fontSize: theme.typography.b1,
              lineHeight: theme.lineHeight.b1,
              fontFamily: theme.fonts.medium,
            },
            subtitleStyle,
          ]}
        >
          {subtitle}
        </Text>
      )}

      {!!phone && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: theme.spacing.sm,
          }}
        >
          <Text
            style={[
              {
                flex: 1,
                color: theme.colors.black,
                fontSize: theme.typography.b1,
                lineHeight: theme.lineHeight.b1,
                fontFamily: theme.fonts.bold,
              },
              phoneStyle,
            ]}
          >
            {countryCode} {phone}
          </Text>

          {showEdit && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onEdit}
              style={{
                marginLeft: theme.spacing.sm,
              }}
            >
              <Edit2
                size={18}
                color={theme.colors.primary500}
                strokeWidth={2}
              />
            </TouchableOpacity>
          )}
        </View>
      )}

      {children}
    </View>
  );
};

export default OTPInfo;