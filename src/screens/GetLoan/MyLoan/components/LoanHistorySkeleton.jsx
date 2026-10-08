// ============================================================
// src/screens/GetLoan/MyLoan/components/LoanHistorySkeleton.jsx
// ============================================================

import React, {
    memo,
} from "react";

import {
    FlatList,
    View,
} from "react-native";

import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder";
 
import {
    theme,
} from "../../../../theme";


// ============================================================
// SINGLE SKELETON
// ============================================================

const SkeletonCard = memo(() => {

    return (

        <View
            style={{
                marginBottom:
                    theme.spacing.md,

                padding:
                    theme.spacing.lg,

                borderRadius:
                    theme.radius.lg,

                backgroundColor:
                    theme.colors.white,

                borderWidth: 1,

                borderColor:
                    "#D4C8C0",
            }}
        >

            {/* TOP */}

            <View
                style={{
                    flexDirection: "row",

                    alignItems: "center",
                }}
            >

                <ShimmerPlaceholder
                    width={52}
                    height={52}
                    borderRadius={14}
                />


                <View
                    style={{
                        flex: 1,

                        marginLeft:
                            theme.spacing.md,
                    }}
                >

                    <ShimmerPlaceholder
                        width="55%"
                        height={16}
                        borderRadius={6}
                    />

                    <View
                        style={{
                            marginTop:
                                theme.spacing.sm,
                        }}
                    >

                        <ShimmerPlaceholder
                            width="40%"
                            height={22}
                            borderRadius={6}
                        />

                    </View>

                </View>


                <ShimmerPlaceholder
                    width={82}
                    height={28}
                    borderRadius={8}
                />

            </View>


            {/* MESSAGE */}

            <View
                style={{
                    marginTop:
                        theme.spacing.lg,
                }}
            >

                <ShimmerPlaceholder
                    width="100%"
                    height={62}
                    borderRadius={16}
                />

            </View>


            {/* DETAILS */}

            <View
                style={{
                    flexDirection: "row",

                    marginTop:
                        theme.spacing.lg,
                }}
            >

                <View
                    style={{
                        flex: 1,

                        marginRight:
                            theme.spacing.sm,
                    }}
                >

                    <ShimmerPlaceholder
                        width="100%"
                        height={70}
                        borderRadius={14}
                    />

                </View>


                <View
                    style={{
                        flex: 1,

                        marginLeft:
                            theme.spacing.sm,
                    }}
                >

                    <ShimmerPlaceholder
                        width="100%"
                        height={70}
                        borderRadius={14}
                    />

                </View>

            </View>

        </View>
    );
});


// ============================================================
// LIST SKELETON
// ============================================================

const LoanHistorySkeleton = () => {

    return (

        <FlatList
            data={[
                "skeleton-1",
                "skeleton-2",
                "skeleton-3",
            ]}
            keyExtractor={(item) => item}
            renderItem={() => (
                <SkeletonCard />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal:
                    theme.spacing.lg,

                paddingTop:
                    theme.spacing.md,

                paddingBottom:
                    theme.spacing.xxxl,
            }}
        />

    );
};


export default memo(
    LoanHistorySkeleton
);