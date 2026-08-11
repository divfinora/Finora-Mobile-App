import React from 'react';
import { View, Text } from 'react-native';
 

 
 
import { Building2, Banknote } from 'lucide-react-native';
import CommonInput from '../../../../../components/common/Input/CommonInput.jsx';
import CustomDropdown from '../../../../../components/common/Modal/CustomDropdown.jsx';
import { theme } from '../../../../../theme/index.js';

const BUSINESS_TYPES = [
  'Sole Proprietorship',
  'Partnership Firm',
  'Private Limited (Pvt Ltd)',
  'Public Limited',
  'Limited Liability Partnership (LLP)',
  'One Person Company (OPC)',
];

const INDUSTRIES = [
  'Manufacturing',
  'Textiles & Apparel',
  'Retail & Wholesale Trade',
  'Information Technology & Services',
  'Healthcare & Pharmaceuticals',
  'Real Estate & Construction',
  'Food & Beverages',
  'Logistics & Transportation',
  'Other',
];

const CommercialBusinessDetails = ({ formData, setFormData, errors, setErrors }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (setErrors) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Reusable Theme Styles
  const cardStyle = {
    backgroundColor: theme.colors?.white || '#FFFFFF',
    borderRadius: theme.radius?.lg || 16,
    padding: theme.spacing?.lg || 16,
    marginBottom: theme.spacing?.lg || 16,
    ...theme.shadows?.card,
  };

  const inputContainerStyle = {
    backgroundColor: theme.colors?.gray100 || '#F3F4F6',
    borderRadius: theme.radius?.md || 12,
    borderWidth: 0,
  };

  return (
    <View style={{ paddingVertical: theme.spacing?.sm || 8 }}>
      {/* ===== CARD 1: Business Information ===== */}
      <View style={cardStyle}>
        {/* Header Indicator */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing?.lg || 16,
          }}
        >
          <Building2
            size={theme.iconSize?.md || 20}
            color={theme.colors?.primary500 || '#FF6B35'}
            style={{ marginRight: theme.spacing?.sm || 8 }}
          />
          <Text
            style={{
              fontSize: theme.typography?.h4 || 16,
              fontFamily: theme.fonts?.bold,
              fontWeight: '700',
              color: theme.colors?.text || '#1E293B',
            }}
          >
            Business Information
          </Text>
        </View>

        {/* Business Name * */}
        <CommonInput
          label="Business Name *"
          placeholder="Legal business name"
          value={formData?.businessName || ''}
          onChangeText={(text) => handleChange('businessName', text)}
          error={errors?.businessName}
          inputContainerStyle={inputContainerStyle}
        />

        {/* Business Type * */}
        <CustomDropdown
          label="Business Type *"
          placeholder="Select business type"
          options={BUSINESS_TYPES}
          selectedValue={formData?.businessType || ''}
          onSelect={(item) => handleChange('businessType', item)}
          error={errors?.businessType}
          inputContainerStyle={inputContainerStyle}
        />

        {/* Nature of Business * */}
        <CommonInput
          label="Nature of Business *"
          placeholder="e.g. Export of textile goods"
          value={formData?.natureOfBusiness || ''}
          onChangeText={(text) => handleChange('natureOfBusiness', text)}
          error={errors?.natureOfBusiness}
          inputContainerStyle={inputContainerStyle}
        />

        {/* Industry * */}
        <CustomDropdown
          label="Industry *"
          placeholder="Select industry"
          options={INDUSTRIES}
          selectedValue={formData?.industry || ''}
          onSelect={(item) => handleChange('industry', item)}
          error={errors?.industry}
          inputContainerStyle={inputContainerStyle}
        />

        {/* GST Number */}
        <CommonInput
          label="GST Number"
          placeholder="22AAAAA0000A1Z5"
          value={formData?.gstNumber || ''}
          onChangeText={(text) => handleChange('gstNumber', text)}
          autoCapitalize="characters"
          error={errors?.gstNumber}
          inputContainerStyle={inputContainerStyle}
        />

        {/* Business Reg. No. */}
        <CommonInput
          label="Business Reg. No."
          placeholder="Registration number"
          value={formData?.businessRegNo || ''}
          onChangeText={(text) => handleChange('businessRegNo', text)}
          error={errors?.businessRegNo}
          inputContainerStyle={inputContainerStyle}
        />

        {/* Udyam/MSME Registration */}
        <CommonInput
          label="Udyam/MSME Registration"
          placeholder="UDYAM-XX-00-0000000"
          value={formData?.udyamRegistration || ''}
          onChangeText={(text) => handleChange('udyamRegistration', text)}
          autoCapitalize="characters"
          error={errors?.udyamRegistration}
          inputContainerStyle={inputContainerStyle}
        />
      </View>

      {/* ===== CARD 2: Business Financials ===== */}
      <View style={cardStyle}>
        {/* Header Indicator */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing?.lg || 16,
          }}
        >
          <Banknote
            size={theme.iconSize?.md || 20}
            color={theme.colors?.primary500 || '#FF6B35'}
            style={{ marginRight: theme.spacing?.sm || 8 }}
          />
          <Text
            style={{
              fontSize: theme.typography?.h4 || 16,
              fontFamily: theme.fonts?.bold,
              fontWeight: '700',
              color: theme.colors?.text || '#1E293B',
            }}
          >
            Business Financials
          </Text>
        </View>

        {/* Side-by-Side: Years in Business & Employees */}
        <View
          style={{
            flexDirection: 'row',
            gap: theme.spacing?.md || 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <CommonInput
              label="Years in Business *"
              placeholder="0"
              value={formData?.yearsInBusiness || ''}
              onChangeText={(text) => handleChange('yearsInBusiness', text)}
              keyboardType="numeric"
              error={errors?.yearsInBusiness}
              inputContainerStyle={inputContainerStyle}
            />
          </View>

          <View style={{ flex: 1 }}>
            <CommonInput
              label="Employees"
              placeholder="0"
              value={formData?.employeesCount || ''}
              onChangeText={(text) => handleChange('employeesCount', text)}
              keyboardType="numeric"
              error={errors?.employeesCount}
              inputContainerStyle={inputContainerStyle}
            />
          </View>
        </View>

        {/* Annual Turnover * */}
        <CommonInput
          label="Annual Turnover *"
          placeholder="₹  0.00"
          value={formData?.annualTurnover || ''}
          onChangeText={(text) => handleChange('annualTurnover', text)}
          keyboardType="numeric"
          error={errors?.annualTurnover}
          inputContainerStyle={inputContainerStyle}
        />

        {/* Annual Net Profit * */}
        <CommonInput
          label="Annual Net Profit *"
          placeholder="₹  0.00"
          value={formData?.annualNetProfit || ''}
          onChangeText={(text) => handleChange('annualNetProfit', text)}
          keyboardType="numeric"
          error={errors?.annualNetProfit}
          inputContainerStyle={inputContainerStyle}
        />
      </View>
    </View>
  );
};

export default CommercialBusinessDetails;