 
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native';
 
import { theme } from '../../../theme';
import { ChevronDown, Check } from 'lucide-react-native'
import CommonInput from "../Input/CommonInput";
const CustomDropdown = ({ 
  label, 
  placeholder, 
  options, 
  selectedValue, 
  onSelect, 
  error,
  required 
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setExpanded(true)}>
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
            }}
            containerStyle={{ marginBottom: 0 }}
          />
        </View>
      </TouchableOpacity>

      {/* Modal Dropdown Options */}
      <Modal visible={expanded} transparent animationType="fade">
        <Pressable 
          style={{ 
            flex: 1, 
            backgroundColor: theme.colors.overlay, 
            justifyContent: 'center', 
            padding: theme.spacing.xxl 
          }}
          onPress={() => setExpanded(false)}
        >
          <View 
            style={{ 
              backgroundColor: theme.colors.white, 
              borderRadius: theme.radius.lg, 
              maxHeight: 300, 
              overflow: 'hidden' 
            }}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
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
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
export default CustomDropdown