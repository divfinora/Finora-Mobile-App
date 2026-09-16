import React from "react";

import {
  View,
  TouchableOpacity,
} from "react-native";

import {
  Bell,
} from "lucide-react-native";

import { theme } from "../../../../theme";

import BackButton from '../../../../components/common/BackButton/BackButton'
import BackButtonLinerGradint from "../../../../components/common/BackButton/BackButtonLinerGradint";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const LoanCommonHeader = ({
  onBack,
  onNotification,
  title = "Loan requirements"
}) => {


  const insets = useSafeAreaInsets()
  return (

    <View

    >

      <BackButtonLinerGradint

        onPress={onBack}
        title={title}
        containerStyle={{
          paddingTop: insets.top,
          paddingHorizontal: theme.spacing.xxl,
        }}


        rightComponent={

          <TouchableOpacity

            activeOpacity={0.8}

            onPress={onNotification}

            style={{

              width: 44,

              height: 44,

              borderRadius: 14,

              backgroundColor: "#FFF2E2",

              justifyContent: "center",

              alignItems: "center",

            }}

          >

            <Bell

              size={22}

              color={theme.colors.primary500}

              fill={theme.colors.primary500}

            />

            <View

              style={{

                position: "absolute",

                top: 10,

                right: 10,

                width: 8,

                height: 8,

                borderRadius: theme.radius.circle,

                backgroundColor: theme.colors.error,

                borderWidth: 1.5,

                borderColor: theme.colors.white,

              }}

            />

          </TouchableOpacity>

        }

      />

    </View>

  );

};

export default LoanCommonHeader;


