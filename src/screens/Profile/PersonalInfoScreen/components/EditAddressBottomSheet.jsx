
import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from "react-native";

import {
    MapPin,
    Building2,
    MapPinned,
    ChevronDown,
    X,
} from "lucide-react-native";

import { theme } from "../../../../theme";

import NewCustomBottomSheet from "../../../../components/common/BottomSheet/NewCustomBottomSheet";

import CommonButton from "../../../../components/common/Button/CommonButton";

const EditAddressBottomSheet = ({
    visible,
    onClose,
    initialAddress = "",
    initialCity = "",
    initialState = "",
    initialPinCode = "",
    onSave,
}) => {
    const [address, setAddress] = useState(initialAddress);
    const [city, setCity] = useState(initialCity);
    const [state, setState] = useState(initialState);
    const [pinCode, setPinCode] = useState(initialPinCode);

    const [errors, setErrors] = useState({});

    const [dropdown, setDropdown] = useState(null);

    const cities = [
        "Gurgaon",
        "Delhi",
        "Noida",
        "Faridabad",
        "Ghaziabad",
        "Mumbai",
        "Bengaluru",
    ];

    const states = [
        "Haryana",
        "Delhi",
        "Uttar Pradesh",
        "Rajasthan",
        "Maharashtra",
        "Karnataka",
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!address.trim()) {
            newErrors.address = "Please enter your current address";
        }

        if (!city) {
            newErrors.city = "Please select a city";
        }

        if (!state) {
            newErrors.state = "Please select a state";
        }

        if (!/^\d{6}$/.test(pinCode)) {
            newErrors.pinCode = "Enter a valid 6-digit PIN code";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        Keyboard.dismiss();

        if (!validateForm()) {
            return;
        }

        onSave?.({
            address: address.trim(),
            city,
            state,
            pinCode,
        });

        onClose?.();
    };

    const handleClose = () => {
        Keyboard.dismiss();
        setDropdown(null);
        onClose?.();
    };

    const renderLabel = (label, required = true) => (
        <Text
            style={{
                fontSize: 14,
                color: "#172033",
                fontFamily: theme.fonts.medium,
                marginBottom: 7,
            }}
        >
            {label}
            {required && (
                <Text style={{ color: "#EF4444" }}> *</Text>
            )}
        </Text>
    );

    const inputContainer = (hasError) => ({
        minHeight: 56,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8F9FB",
        borderRadius: 13,
        borderWidth: 1,
        borderColor: hasError ? "#EF4444" : "#EEF0F3",
        paddingHorizontal: 16,
    });

    const renderDropdown = (type, options, selected, onSelect) => {
        if (dropdown !== type) {
            return null;
        }

        return (
            <View
                style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    marginTop: 6,
                    overflow: "hidden",
                }}
            >
                {options.map((item) => (
                    <TouchableOpacity
                        key={item}
                        activeOpacity={0.7}
                        onPress={() => {
                            onSelect(item);
                            setDropdown(null);
                            setErrors((prev) => ({
                                ...prev,
                                [type]: undefined,
                            }));
                        }}
                        style={{
                            minHeight: 44,
                            justifyContent: "center",
                            paddingHorizontal: 14,
                            backgroundColor:
                                selected === item ? "#FFF4EC" : "#FFFFFF",
                            borderBottomWidth: 1,
                            borderBottomColor: "#F1F2F4",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                color: selected === item
                                    ? theme.colors.primary500
                                    : "#344054",
                                fontFamily: selected === item
                                    ? theme.fonts.semiBold
                                    : theme.fonts.regular,
                            }}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <NewCustomBottomSheet
            visible={visible}
            onClose={handleClose}
            showHeader={false}
            showDragHandle={false}
            enableDrag={false}
            closeOnBackdrop={false}
            closeOnDragDown={false}
            heightPercent={0.57}
            sheetBg="#FFFFFF"
            sheetStyle={{
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                overflow: "visible",
            }}
            contentStyle={{
                paddingHorizontal: 20,
                paddingTop: 76,
                paddingBottom: 20,
            }}
        >
            {/* CLOSE BUTTON */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleClose}
                style={{
                    position: "absolute",
                    top: -64,
                    alignSelf: "center",
                    left: 0,
                    right: 0,
                    marginHorizontal: "auto",
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: "#000000",
                    borderWidth: 5,
                    borderColor: "rgba(255,255,255,0.75)",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 100,
                }}
            >
                <X size={21} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>

            {/* CURRENT ADDRESS */}
            <View style={{ marginBottom: 14 }}>
                {renderLabel("Current Address")}

                <View style={inputContainer(errors.address)}>
                    <MapPin size={19} color="#91A4C2" />

                    <TextInput
                        value={address}
                        onChangeText={(value) => {
                            setAddress(value);
                            setErrors((prev) => ({
                                ...prev,
                                address: undefined,
                            }));
                        }}
                        placeholder="Enter your complete address"
                        placeholderTextColor="#91A4C2"
                        multiline={false}
                        returnKeyType="done"
                        style={{
                            flex: 1,
                            marginLeft: 12,
                            paddingVertical: 0,
                            fontSize: 15,
                            color: "#172033",
                            fontFamily: theme.fonts.regular,
                        }}
                    />
                </View>

                {!!errors.address && (
                    <Text style={errorTextStyle}>{errors.address}</Text>
                )}
            </View>

            {/* CITY AND STATE */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 20,
                    marginBottom: 14,
                }}
            >
                {/* CITY */}
                <View style={{ flex: 1 }}>
                    {renderLabel("City")}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            Keyboard.dismiss();
                            setDropdown(dropdown === "city" ? null : "city");
                        }}
                        style={inputContainer(errors.city)}
                    >
                        <Building2 size={18} color="#91A4C2" />

                        <Text
                            numberOfLines={1}
                            style={{
                                flex: 1,
                                marginLeft: 10,
                                fontSize: 14,
                                color: city ? "#172033" : "#91A4C2",
                                fontFamily: theme.fonts.regular,
                            }}
                        >
                            {city || "Select City"}
                        </Text>

                        <ChevronDown size={17} color="#64748B" />
                    </TouchableOpacity>

                    {!!errors.city && (
                        <Text style={errorTextStyle}>{errors.city}</Text>
                    )}

                    {renderDropdown("city", cities, city, setCity)}
                </View>

                {/* STATE */}
                <View style={{ flex: 1 }}>
                    {renderLabel("State")}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            Keyboard.dismiss();
                            setDropdown(dropdown === "state" ? null : "state");
                        }}
                        style={inputContainer(errors.state)}
                    >
                        <Building2 size={18} color="#91A4C2" />

                        <Text
                            numberOfLines={1}
                            style={{
                                flex: 1,
                                marginLeft: 10,
                                fontSize: 14,
                                color: state ? "#172033" : "#91A4C2",
                                fontFamily: theme.fonts.regular,
                            }}
                        >
                            {state || "Select State"}
                        </Text>

                        <ChevronDown size={17} color="#64748B" />
                    </TouchableOpacity>

                    {!!errors.state && (
                        <Text style={errorTextStyle}>{errors.state}</Text>
                    )}

                    {renderDropdown("state", states, state, setState)}
                </View>
            </View>

            {/* PIN CODE */}
            <View>
                {renderLabel("Pin Code")}

                <View style={inputContainer(errors.pinCode)}>
                    <MapPinned size={19} color="#91A4C2" />

                    <TextInput
                        value={pinCode}
                        onChangeText={(value) => {
                            setPinCode(value.replace(/\D/g, "").slice(0, 6));
                            setErrors((prev) => ({
                                ...prev,
                                pinCode: undefined,
                            }));
                        }}
                        placeholder="Enter 6-digit PIN"
                        placeholderTextColor="#91A4C2"
                        keyboardType="number-pad"
                        maxLength={6}
                        style={{
                            flex: 1,
                            marginLeft: 12,
                            paddingVertical: 0,
                            fontSize: 15,
                            color: "#172033",
                            fontFamily: theme.fonts.regular,
                        }}
                    />
                </View>

                {!!errors.pinCode && (
                    <Text style={errorTextStyle}>{errors.pinCode}</Text>
                )}
            </View>

            {/* SAVE BUTTON */}
            <View
                style={{
                    marginTop: 42,
                    marginBottom: 8,
                }}
            >
                <CommonButton
                    title="Save Changes"
                    onPress={handleSave}
                />
            </View>
        </NewCustomBottomSheet>
    );
};

const errorTextStyle = {
    color: "#EF4444",
    fontSize: 11,
    marginTop: 4,
    fontFamily: theme.fonts.regular,
};

export default EditAddressBottomSheet;
