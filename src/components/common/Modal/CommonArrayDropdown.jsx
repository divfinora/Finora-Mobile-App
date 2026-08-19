import React, {
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";

import {
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react-native";

import { theme }
  from "../../../theme";


// =====================================================
// COMMON ARRAY DROPDOWN
// =====================================================

const CommonArrayDropdown = ({

  data = [],

  value = "",

  onChange = () => {},

  placeholder = "Select",

  width = "100%",

  backgroundColor =
    theme.colors.gray100,

  height = 48,

  disabled = false,

  borderRadius =
    theme.radius.md,

  borderWidth =
    theme.borderWidth.thin,

  borderColor =
    theme.colors.border,

  containerStyle = {},

  textStyle = {},

  dropdownStyle = {},

  iconStyle = {},

  Top = 0,

}) => {

  // ===================================================
  // STATE
  // ===================================================

  const [
    open,
    setOpen,
  ] = useState(false);


  // ===================================================
  // REF
  // ===================================================

  const buttonRef =
    useRef(null);


  // ===================================================
  // DROPDOWN POSITION
  // ===================================================

  const [
    dropdownLayout,
    setDropdownLayout,
  ] = useState({

    top: 0,

    left: 0,

    width: 0,

  });


  // ===================================================
  // OPEN DROPDOWN
  // ===================================================

  const handleOpen = () => {

    if (disabled) {
      return;
    }

    buttonRef.current?.measure(
      (
        fx,
        fy,
        measuredWidth,
        measuredHeight,
        px,
        py
      ) => {

        setDropdownLayout({

          top:
            py + Top,

          left:
            px,

          width:
            measuredWidth,

        });

        setOpen(true);

      }
    );

  };


  // ===================================================
  // CLOSE DROPDOWN
  // ===================================================

  const handleClose = () => {

    setOpen(false);

  };


  // ===================================================
  // SELECT ITEM
  // ===================================================

  const handleSelect = (
    item
  ) => {

    onChange(item);

    setOpen(false);

  };


  // ===================================================
  // EMPTY DATA
  // ===================================================

  const isEmpty =
    !Array.isArray(data) ||
    data.length === 0;


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <>

      {/* =================================================
          DROPDOWN BUTTON
      ================================================= */}

      <TouchableOpacity

        ref={buttonRef}

        activeOpacity={
          disabled
            ? 1
            : 0.8
        }

        disabled={
          disabled
        }

        onPress={
          handleOpen
        }

        style={{

          width,

          height,

          borderRadius,

          backgroundColor,

          paddingHorizontal:
            theme.spacing.md,

          flexDirection:
            "row",

          alignItems:
            "center",

          justifyContent:
            "space-between",

          borderWidth,

          borderColor,

          opacity:
            disabled
              ? 0.6
              : 1,

          ...containerStyle,

        }}

      >

        {/* =================================================
            SELECTED VALUE
        ================================================= */}

        <Text

          numberOfLines={1}

          style={{

            flex: 1,

            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.medium,

            color:
              value
                ? theme.colors.text
                : theme.colors.textLight,

            ...textStyle,

          }}

        >

          {
            value ||
            placeholder
          }

        </Text>


        {/* =================================================
            CHEVRON
        ================================================= */}

        {open ? (

          <ChevronUp

            size={
              theme.iconSize.sm
            }

            color={
              theme.colors.text
            }

            style={
              iconStyle
            }

          />

        ) : (

          <ChevronDown

            size={
              theme.iconSize.sm
            }

            color={
              theme.colors.text
            }

            style={
              iconStyle
            }

          />

        )}

      </TouchableOpacity>


      {/* =================================================
          MODAL
      ================================================= */}

      <Modal

        visible={
          open
        }

        transparent

        animationType="fade"

        onRequestClose={
          handleClose
        }

      >

        {/* =================================================
            OUTSIDE PRESS
        ================================================= */}

        <Pressable

          style={{
            flex: 1,
          }}

          onPress={
            handleClose
          }

        >

          {/* =================================================
              DROPDOWN POSITION
          ================================================= */}

          <Pressable

            onPress={() => {}}

            style={{

              position:
                "absolute",

              top:
                dropdownLayout.top,

              left:
                dropdownLayout.left,

              width:
                dropdownLayout.width,

            }}

          >

            {/* =================================================
                DROPDOWN CARD
            ================================================= */}

            <View

              style={{

                backgroundColor:
                  theme.colors.card,

                borderRadius:
                  theme.radius.lg,

                borderWidth:
                  theme.borderWidth.thin,

                borderColor:
                  theme.colors.border,

                overflow:
                  "hidden",

                maxHeight:
                  260,

                ...theme.shadows.card,

                ...dropdownStyle,

              }}

            >

              {/* =================================================
                  EMPTY STATE
              ================================================= */}

              {isEmpty ? (

                <View

                  style={{

                    padding:
                      theme.spacing.lg,

                    alignItems:
                      "center",

                  }}

                >

                  <Text

                    style={{

                      fontSize:
                        theme.typography.b2,

                      fontFamily:
                        theme.fonts.medium,

                      color:
                        theme.colors.textLight,

                    }}

                  >
                    No options available
                  </Text>

                </View>

              ) : (

                /* =================================================
                   OPTIONS
                ================================================= */

                <ScrollView

                  showsVerticalScrollIndicator={
                    false
                  }

                  keyboardShouldPersistTaps={
                    "handled"
                  }

                >

                  {
                    data.map(
                      (
                        item,
                        index
                      ) => {

                        const isSelected =
                          value === item;


                        return (

                          <TouchableOpacity

                            key={
                              `${String(item)}-${index}`
                            }

                            activeOpacity={
                              0.8
                            }

                            onPress={() =>
                              handleSelect(
                                item
                              )
                            }

                            style={{

                              minHeight:
                                50,

                              paddingVertical:
                                theme.spacing.md,

                              paddingHorizontal:
                                theme.spacing.md,

                              flexDirection:
                                "row",

                              justifyContent:
                                "space-between",

                              alignItems:
                                "center",

                              backgroundColor:
                                isSelected
                                  ? theme.colors.primary50
                                  : theme.colors.card,

                              borderBottomWidth:
                                index !==
                                data.length - 1
                                  ? theme.borderWidth.thin
                                  : 0,

                              borderBottomColor:
                                theme.colors.border,

                            }}

                          >

                            {/* =================================
                                OPTION TEXT
                            ================================= */}

                            <Text

                              numberOfLines={
                                1
                              }

                              style={{

                                flex: 1,

                                fontSize:
                                  theme.typography.b2,

                                fontFamily:
                                  isSelected
                                    ? theme.fonts.semiBold
                                    : theme.fonts.medium,

                                color:
                                  isSelected
                                    ? theme.colors.primary700
                                    : theme.colors.text,

                              }}

                            >

                              {
                                String(
                                  item
                                )
                              }

                            </Text>


                            {/* =================================
                                CHECK ICON
                            ================================= */}

                            {isSelected && (

                              <Check

                                size={
                                  theme.iconSize.xs
                                }

                                color={
                                  theme.colors.primary500
                                }

                              />

                            )}

                          </TouchableOpacity>

                        );

                      }
                    )
                  }

                </ScrollView>

              )}

            </View>

          </Pressable>

        </Pressable>

      </Modal>

    </>

  );

};


// =====================================================
// EXPORT
// =====================================================

export default React.memo(
  CommonArrayDropdown
);