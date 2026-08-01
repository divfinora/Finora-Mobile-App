import React from "react";

import BackButton from "../..//BackButton/BackButton";

const OTPHeader = ({
  title,
  onBack,
  subtitle,
  rightComponent,
  containerStyle,
  titleStyle,
  subtitleStyle,
}) => {
  return (
    <BackButton
      title={title}
      subtitle={subtitle}
      onPress={onBack}
      rightComponent={rightComponent}
      containerStyle={containerStyle}
      titleStyle={titleStyle}
      subtitleStyle={subtitleStyle}
    />
  );
};

export default OTPHeader;