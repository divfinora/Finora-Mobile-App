// src/screens/LoanDetails/components/HeaderBar.jsx

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import { theme } from '../../../../theme';
import BackButton from '../../../../components/common/BackButton/BackButton';
// import { theme } from '../../../../theme';
// import BackButton from '../../../../components/common/BackButton/BackButton';

 

const HeaderBar = ({
  title = 'Loan Details',
  onBackPress,
  onNotificationPress,
  containerStyle,
}) => {
  return (
    <View
      style={[
        {
          paddingHorizontal: theme?.screen?.horizontalPadding || 20,
          backgroundColor: theme?.colors?.background || '#F6F8F7',
        },
        containerStyle,
      ]}
    >
      <BackButton
        title={title}
        onPress={onBackPress}
        rightComponent={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onNotificationPress}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: theme?.colors?.primary100 || '#FFF4EC',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Bell
              size={18}
              color={theme?.colors?.primary500 || '#F47C2C'}
            />
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default HeaderBar;