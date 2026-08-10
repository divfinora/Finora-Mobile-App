// components/StepProgress.jsx (Best)
import React from 'react';
import { View, Text } from 'react-native';
 
 
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../../../../theme';

const StepProgress = ({ currentStep, totalSteps , progress }) => {
  return (
    <View style={{ 
      // paddingHorizontal: theme.spacing.xl,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.md,
      // backgroundColor: theme.colors.white,
    }}>
      {/* Step 1 of 6 -------- 14% */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm
      }}>
        <Text style={{
          fontSize: theme.typography.b2,
          fontFamily: theme.fonts.medium,
          color: theme.colors.gray700,
          letterSpacing: 0.3,
        }}>
          Step {currentStep} of {totalSteps}
        </Text>
        <Text style={{
          fontSize: theme.typography.b2,
          fontFamily: theme.fonts.semiBold,
          color: '#FBA250',
          letterSpacing: 0.3,
        }}>
          {progress }%
        </Text>
      </View>

      {/* Progress Bar with Gradient - Exact Colors from Image */}
      <View style={{
        height: 6,
        backgroundColor: theme.colors.gray200,
        borderRadius: 3,
        overflow: 'hidden',
      }}>
        <LinearGradient
          colors={['#FBA250', '#26B35B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: `${progress}%`,
            height: 6,
            borderRadius: 3,
          }}
        />
      </View>
    </View>
  );
};

export default StepProgress;