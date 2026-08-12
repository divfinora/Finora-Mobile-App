import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native';
 
import { theme } from '../../../theme';
import { ChevronDown } from 'lucide-react-native';
import CommonInput from "../Input/CommonInput";

const CustomDropdown = ({ 
  label, 
  placeholder, 
  options = [], 
  selectedValue, 
  onSelect, 
  error,
  required,
  inputContainerStyle 
}) => {
  const [expanded, setExpanded] = useState(false);
 
  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      {/* Tap Listener on Entire Input Area */}
      <TouchableOpacity activeOpacity={0.7} onPress={() => setExpanded(true)}>
        <View pointerEvents="none">
          <CommonInput
            label={label}
            placeholder={placeholder}
            value={selectedValue}
            editable={false}
            required={required}
            error={error}
            rightIcon={<ChevronDown size={theme.iconSize.sm} color={theme.colors.navy700} />}
            inputContainerStyle={{
              backgroundColor: theme.colors.gray100,
              borderColor: error ? theme.colors.error : theme.colors.transparent,
              ...inputContainerStyle,
            }}
            containerStyle={{ marginBottom: 0 }}
          />
        </View>
      </TouchableOpacity>

      {/* Modal Dropdown Options */}
      <Modal 
        visible={expanded} 
        transparent 
        animationType="fade"
        onRequestClose={() => setExpanded(false)} // Android back button support
      >
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: theme.colors.overlay || 'rgba(0,0,0,0.5)', 
            justifyContent: 'center', 
            padding: theme.spacing.xxl 
          }}
          onPress={() => setExpanded(false)} // Background overlay tap to close
        >
          <Pressable 
            style={{ 
              backgroundColor: theme.colors.white, 
              borderRadius: theme.radius.lg, 
              maxHeight: 300, 
              overflow: 'hidden' 
            }}
            onPress={(e) => e.stopPropagation()} // Card ke andhar tap karne par close hone se rokega
          >
            <FlatList
              data={options}
              keyExtractor={(item, index) => item?.toString() || index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    onSelect(item);
                    setExpanded(false);
                  }}
                  style={{
                    paddingVertical: theme.spacing.lg,
                    paddingHorizontal: theme.spacing.xl,
                    backgroundColor: selectedValue === item ? theme.colors.primary50 : theme.colors.transparent,
                    borderBottomWidth: theme.borderWidth.thin,
                    borderBottomColor: theme.colors.divider,
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.b1,
                      fontFamily: theme.fonts.medium,
                      color: selectedValue === item ? theme.colors.primary500 : theme.colors.text,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CustomDropdown;