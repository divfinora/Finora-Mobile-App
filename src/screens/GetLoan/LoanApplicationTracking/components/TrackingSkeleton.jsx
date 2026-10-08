// src/screens/GetLoan/LoanApplicationTracking/components/TrackingSkeleton.jsx

import React, {
    memo,
} from "react";

import {
    ScrollView,
    View,
} from "react-native";

import {
    theme,
} from "../../../../theme";


const SkeletonBox = ({
    width = "100%",
    height = 16,
}) => {

    return (
        <View
            style={{
                width,

                height,

                borderRadius: 8,

                backgroundColor:
                    theme.skeleton.background,
            }}
        />
    );
};


const TrackingSkeleton = () => {

    return (
        <ScrollView
            showsVerticalScrollIndicator={
                false
            }
            contentContainerStyle={{
                paddingHorizontal:
                    theme.spacing.lg,

                paddingTop:
                    theme.spacing.lg,

                paddingBottom:
                    theme.spacing.massive,
            }}
        >

            {/* PROGRESS */}

            <View
                style={{
                    backgroundColor:
                        theme.colors.white,

                    borderWidth: 1,

                    borderColor:
                        theme.colors.gray300,

                    borderRadius: 16,

                    padding:
                        theme.spacing.lg,
                }}
            >

                <View
                    style={{
                        flexDirection:
                            "row",

                        justifyContent:
                            "space-between",
                    }}
                >

                    <SkeletonBox
                        width={130}
                        height={12}
                    />

                    <SkeletonBox
                        width={40}
                        height={18}
                    />

                </View>


                <SkeletonBox
                    height={10}
                />


                <View
                    style={{
                        flexDirection:
                            "row",

                        justifyContent:
                            "space-between",

                        marginTop:
                            theme.spacing.sm,
                    }}
                >

                    <SkeletonBox
                        width={65}
                        height={10}
                    />

                    <SkeletonBox
                        width={65}
                        height={10}
                    />

                </View>

            </View>


            {/* TIMELINE */}

            <View
                style={{
                    marginTop:
                        theme.spacing.lg,

                    backgroundColor:
                        theme.colors.white,

                    borderWidth: 1,

                    borderColor:
                        theme.colors.gray300,

                    borderRadius: 16,

                    padding:
                        theme.spacing.lg,
                }}
            >

                <SkeletonBox
                    width={120}
                    height={12}
                />


                {[1, 2, 3].map(
                    item => (
                        <View
                            key={item}
                            style={{
                                flexDirection:
                                    "row",

                                marginTop:
                                    theme.spacing.xl,
                            }}
                        >

                            <SkeletonBox
                                width={30}
                                height={30}
                            />


                            <View
                                style={{
                                    flex: 1,

                                    marginLeft:
                                        theme.spacing.md,
                                }}
                            >

                                <SkeletonBox
                                    width="55%"
                                    height={16}
                                />

                                <View
                                    style={{
                                        marginTop:
                                            theme.spacing.sm,
                                    }}
                                >

                                    <SkeletonBox
                                        width="85%"
                                        height={12}
                                    />

                                </View>

                            </View>

                        </View>
                    )
                )}

            </View>

        </ScrollView>
    );
};


export default memo(
    TrackingSkeleton
);