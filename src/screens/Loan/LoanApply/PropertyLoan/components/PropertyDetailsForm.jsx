import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native';
import CommonInput from '../../../../../components/common/Input/CommonInput';
import { theme } from '../../../../../theme';
import { ChevronDown, Check } from 'lucide-react-native';
import CustomDropdown from '../../../../../components/common/Modal/CustomDropdown'
// ===== Custom Dropdown Reusing CommonInput & Theme Tokens =====


// ===== Option Card Button using Theme Tokens =====
// ======================================================
// OPTION CARD
// ======================================================

const OptionCard = ({
  title,
  selected,
  onPress,
  showCheckIcon = false,
}) => {

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        flex: 1,

        height: 66,

        borderRadius:
          theme.radius.md,

        borderWidth:
          theme.borderWidth.thin,

        borderColor:
          selected
            ? theme.colors.primary500
            : theme.colors.gray300,

        backgroundColor:
          selected
            ? theme.colors.card
            : theme.colors.white,

        flexDirection: "row",

        alignItems: "center",

        justifyContent: "center",

        paddingHorizontal: 8,

        // IMPORTANT
        minWidth: 0,
      }}
    >

      {/* SELECTED CHECK */}

      {selected && showCheckIcon && (

        <View
          style={{
            width: 20,

            height: 20,

            borderRadius:
              theme.radius.circle,

            backgroundColor:
              theme.colors.primary500,

            justifyContent:
              "center",

            alignItems:
              "center",

            marginRight: 6,

            flexShrink: 0,
          }}
        >

          <Check
            size={13}
            color={
              theme.colors.white
            }
            strokeWidth={3}
          />

        </View>

      )}


      {/* TITLE */}

      <Text
        numberOfLines={2}
        adjustsFontSizeToFit={false}
        style={{
          fontSize:
            theme.typography.b2,

          fontFamily:
            theme.fonts.medium,

          color:
            theme.colors.text,

          textAlign:
            "center",

          flexShrink: 1,

          lineHeight: 20,
        }}
      >
        {title}
      </Text>

    </TouchableOpacity>
  );
};

// ===== Main Component =====
const PropertyDetailsForm = ({ formData, setFormData, errors, setErrors }) => {
  const propertyTypes = ['Residential', 'Commercial', 'Industrial', 'Agricultural'];
  const ownershipTypes = ['Self-owned', 'Rented', 'Leased', 'Parental'];
  const constructionStatuses = ['Ready to Move', 'Under Construction'];
  const occupiedBy = ['Self', 'Tenant', 'Vacant'];
const commonBorderStyle = {



  borderWidth: 0.3,



  borderColor: '#48484a58',



}
  return (
    <View style={{ paddingVertical: theme.spacing.sm }}>
      
      {/* ===== Property Type Dropdown ===== */}
      <CustomDropdown
        label="Property Type"
        placeholder="Select Property type"
        options={propertyTypes}
        selectedValue={formData?.propertyType}
        onSelect={(value) => {
          setFormData((prev) => ({ ...prev, propertyType: value }));
          setErrors((prev) => ({ ...prev, propertyType: '' }));
        }}
        inputContainerStyle={commonBorderStyle}
        error={errors?.propertyType}
      />

      {/* ===== Property Ownership Dropdown ===== */}
      <CustomDropdown
        label="Property Ownership"
        placeholder="Select Ownership type"
        options={ownershipTypes}
        selectedValue={formData?.propertyOwnership}
        onSelect={(value) => {
          setFormData((prev) => ({ ...prev, propertyOwnership: value }));
          setErrors((prev) => ({ ...prev, propertyOwnership: '' }));
        }}
        inputContainerStyle={commonBorderStyle}
        error={errors?.propertyOwnership}
      />

      {/* ===== Card 1: Current Address Inputs ===== */}
      <View style={theme.card.default}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <View
            style={{
              width: 4,
              height: 18,
              backgroundColor: theme.colors.primary500,
              borderRadius: theme.radius.sm,
              marginRight: theme.spacing.sm,
            }}
          />
          <Text
            style={{
              fontSize: theme.typography.b1,
              fontFamily: theme.fonts.bold,
              color: theme.colors.text,
            }}
          >
            Current Address
          </Text>
        </View>

        <CommonInput
          label="Market Value (₹)"
          placeholder="Approx Value"
          value={formData?.marketValue}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, marketValue: text }));
            setErrors((prev) => ({ ...prev, marketValue: '' }));
          }}
          keyboardType="numeric"
          error={errors?.marketValue}
          containerStyle={{ marginBottom: theme.spacing.lg }}
        />

        <CommonInput
          label="Property Age ( Years )"
          placeholder="Age in Years"
          value={formData?.propertyAge}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, propertyAge: text }));
            setErrors((prev) => ({ ...prev, propertyAge: '' }));
          }}
          keyboardType="numeric"
          error={errors?.propertyAge}
          containerStyle={{ marginBottom: theme.spacing.lg }}
        />

        <CommonInput
          label="Property Areas ( Sq.ft.)"
          placeholder="Built-up Area"
          value={formData?.builtUpArea}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, builtUpArea: text }));
            setErrors((prev) => ({ ...prev, builtUpArea: '' }));
          }}
          keyboardType="numeric"
          error={errors?.builtUpArea}
          containerStyle={{ marginBottom: 0 }}
        />
      </View>

      {/* ===== Card 2: Construction Status ===== */}
      <View style={[theme.card.default, { marginTop: theme.spacing.lg }]}>
        <Text
          style={{
            fontSize: theme.typography.b1,
            fontFamily: theme.fonts.medium,
            color: theme.colors.gray700,
            marginBottom: theme.spacing.md,
          }}
        >
          Construction Status
        </Text>
        
        <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
          {constructionStatuses.map((status) => (
            <OptionCard
              key={status}
              title={status}
              selected={formData?.constructionStatus === status}
              showCheckIcon={formData?.constructionStatus === status}
              onPress={() => {
                setFormData((prev) => ({ ...prev, constructionStatus: status }));
                setErrors((prev) => ({ ...prev, constructionStatus: '' }));
              }}
            />
          ))}
        </View>

        {!!errors?.constructionStatus && (
          <Text
            style={{
              color: theme.colors.error,
              fontSize: theme.typography.b3,
              marginTop: theme.spacing.xs,
              fontFamily: theme.fonts.medium,
            }}
          >
            {errors.constructionStatus}
          </Text>
        )}
      </View>

      {/* ===== Card 3: Occupied By ===== */}
      <View style={[theme.card.default, { marginTop: theme.spacing.lg }]}>
        <Text
          style={{
            fontSize: theme.typography.b1,
            fontFamily: theme.fonts.medium,
            color: theme.colors.gray700,
            marginBottom: theme.spacing.md,
          }}
        >
          Occupied By
        </Text>

        <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
          {occupiedBy.map((option) => (
            <OptionCard
              key={option}
              title={option}
              selected={formData?.occupiedBy === option}
              onPress={() => {
                setFormData((prev) => ({ ...prev, occupiedBy: option }));
                setErrors((prev) => ({ ...prev, occupiedBy: '' }));
              }}
            />
          ))}
        </View>

        {!!errors?.occupiedBy && (
          <Text
            style={{
              color: theme.colors.error,
              fontSize: theme.typography.b3,
              marginTop: theme.spacing.xs,
              fontFamily: theme.fonts.medium,
            }}
          >
            {errors.occupiedBy}
          </Text>
        )}
      </View>

    </View>
  );
};

export default PropertyDetailsForm;