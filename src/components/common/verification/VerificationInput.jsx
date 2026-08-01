// import React from "react";

// import {
//   View,
//   Text,
//   TextInput,
// } from "react-native";

// import { theme } from "../../../theme";

// const VerificationInput = ({
//   label,
//   placeholder,
//   value,
//   onChangeText,
//   keyboardType = "default",
//   maxLength,
//   autoCapitalize = "none",
//   secureTextEntry = false,
//   editable = true,
//   error,
// }) => {
//   return (
//     <View
//       style={{
//         marginBottom: theme.spacing.xl,
//       }}
//     >
//       {/* Label */}

//       {!!label && (
//         <Text
//           style={{
//             marginBottom: theme.spacing.sm,

//             color: theme.colors.black,

//             fontSize: theme.typography.b2,

//             lineHeight: theme.lineHeight.b2,

//             fontFamily: theme.fonts.semiBold,
//           }}
//         >
//           {label}
//         </Text>
//       )}

//       {/* Input */}

//       <TextInput
//         value={value}
//         placeholder={placeholder}
//         placeholderTextColor={theme.colors.gray400}
//         onChangeText={onChangeText}
//         keyboardType={keyboardType}
//         maxLength={maxLength}
//         autoCapitalize={autoCapitalize}
//         secureTextEntry={secureTextEntry}
//         editable={editable}
//         style={{
//           height: 56,

//           borderWidth: 1,

//           borderColor: error
//             ? theme.colors.error
//             : theme.colors.gray300,

//           borderRadius: theme.radius.lg,

//           paddingHorizontal: theme.spacing.lg,

//           color: theme.colors.black,

//           fontSize: theme.typography.b2,

//           lineHeight: theme.lineHeight.b2,

//           fontFamily: theme.fonts.regular,

//           backgroundColor: theme.colors.white,
//         }}
//       />

//       {/* Error */}

//       {!!error && (
//         <Text
//           style={{
//             marginTop: theme.spacing.sm,

//             color: theme.colors.error,

//             fontSize: theme.typography.b3,

//             lineHeight: theme.lineHeight.b3,

//             fontFamily: theme.fonts.medium,
//           }}
//         >
//           {error}
//         </Text>
//       )}
//     </View>
//   );
// };

// export default VerificationInput;


import React from "react";

import CommonInput from "../../common/Input/CommonInput";

const VerificationInput = (props) => {
  return <CommonInput {...props} />;
};

export default VerificationInput;