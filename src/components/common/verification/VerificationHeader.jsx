// import React from "react";

// import {
//   View,
//   Text,
//   TouchableOpacity,
// } from "react-native";

// import {
//   ArrowLeft,
// } from "lucide-react-native";

// import { theme } from "../../../theme";

// const VerificationHeader = ({
//   title,
//   step,
//   onBack,
// }) => {
//   return (
//     <View
//       style={{
//         paddingTop: theme.spacing.md,
//         paddingBottom: theme.spacing.xxxl,
//       }}
//     >
//       {/* Back Button */}

//       <TouchableOpacity
//         activeOpacity={0.7}
//         onPress={onBack}
//         style={{
//           position: "absolute",
//           left: 0,
//           top: theme.spacing.lg,

//           width: 40,
//           height: 40,

//           justifyContent: "center",
//           alignItems: "center",

//           zIndex: 10,
//         }}
//       >
//         <ArrowLeft
//           size={26}
//           strokeWidth={2}
//           color={theme.colors.black}
//         />
//       </TouchableOpacity>

//       {/* Title */}

//       <View
//         style={{
//           alignItems: "center",
//         }}
//       >
//         <Text
//           style={{
//             color: theme.colors.black,

//             fontSize: theme.typography.h3,

//             lineHeight: theme.lineHeight.h3,

//             fontFamily: theme.fonts.headingBold,
//           }}
//         >
//           {title}
//         </Text>

//         {!!step && (
//           <Text
//             style={{
//               marginTop: 2,

//               color: theme.colors.textSecondary,

//               fontSize: theme.typography.b2,

//               lineHeight: theme.lineHeight.b2,

//               fontFamily: theme.fonts.regular,
//             }}
//           >
//             {step}
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// };

// export default VerificationHeader;


import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import BackButton from '../BackButton/BackButton'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../../theme'

const VerificationHeader = () => {
    const navigation = useNavigation();
    return (
        <>

            <BackButton
                onPress={() => navigation.goBack()}
                title="Quick KYC"
                subtitle="Step 2 of 4"
                titleStyle={{
                    fontFamily: theme.fonts.headingSemiBold,
                    fontSize: 16,
                    lineHeight: 18,
                    letterSpacing: -0.45,
                }}
                subtitleStyle={{
                    fontFamily: theme.fonts.semiBold,
                    fontSize: 12,
                    lineHeight: 16,
                    letterSpacing: theme.letterSpacing.none,
                }}
            />
        </>
    )
}

export default VerificationHeader