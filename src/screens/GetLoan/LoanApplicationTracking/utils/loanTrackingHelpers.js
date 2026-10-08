// src/screens/GetLoan/LoanApplicationTracking/utils/loanTrackingHelpers.js

export const normalizeStatus = value => {
    const status = String(
        value ?? "PENDING"
    )
        .trim()
        .toUpperCase()
        .replaceAll(" ", "_")
        .replaceAll("-", "_");

    // IN-PROGRESS STATUS
    if (
        status === "VISITOR_IN_PROGRESS" ||
        status === "PROCESSING" ||
        status === "VERIFICATION" ||
        status === "VERIFICATION_IN_PROGRESS"
    ) {
        return "IN_PROGRESS";
    }

    // REJECTED STATUS
    if (
        status === "DECLINED" ||
        status === "NOT_APPROVED"
    ) {
        return "REJECTED";
    }

    // APPROVED STATUS
    if (
        status === "SANCTIONED"
    ) {
        return "APPROVED";
    }

    return status;
};


export const getScreenStatus = loan => {

    return normalizeStatus(
        loan?.status ??
        loan?.loanStatus ??
        loan?.applicationStatus ??
        loan?.currentStatus ??
        loan?.currentStep
    );
};


export const getLoanName = loan => {

    const value =
        loan?.loanType ??
        loan?.category ??
        loan?.loanCategory ??
        loan?.loanName ??
        "PERSONAL";

    const normalized =
        String(value)
            .trim()
            .toUpperCase();

    const names = {
        PERSONAL: "Personal Loan",
        GOLD: "Gold Loan",
        HOME: "Home Loan",
        BUSINESS: "Business Loan",
        VEHICLE: "Vehicle Loan",
        EDUCATION: "Education Loan",
        AGRICULTURE: "Agriculture Loan",
        INSTANT: "Instant Loan",
    };

    return (
        names[normalized] ??
        String(value)
    );
};


export const formatAmount = value => {

    const amount =
        Number(value);

    if (!Number.isFinite(amount)) {
        return "₹0";
    }

    return `₹${amount.toLocaleString(
        "en-IN"
    )}`;
};


export const formatDateTime = value => {

    if (!value) {
        return "TODAY, 12:15 PM";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return String(value);
    }

    return date
        .toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }
        )
        .toUpperCase();
};