import React, {
  memo,
} from "react";

import {
  View,
} from "react-native";
import InlineRetry from "../../../../components/common/RetryScreen/InlineRetry";

 


const VisitorHomeScreenRetry = ({
  onRetry,
  loading,
}) => {

  return (

    <View
      style={{
        marginHorizontal: 24,

     
      }}
    >

      <InlineRetry

        title="Unable to load jobs"

        description={
          "We couldn't fetch your dashboard data. Please try again."
        }

        buttonText="Retry"

        loading={
          loading
        }

        onRetry={
          onRetry
        }

        containerStyle={{

          borderRadius: 16,

          paddingVertical: 28,

          paddingHorizontal: 20,

          borderColor:
            "#EEEEEE",

        }}

        buttonContainerStyle={{
          width: 145,
        }}

      />

    </View>

  );
};

export default memo(
  VisitorHomeScreenRetry
);
 