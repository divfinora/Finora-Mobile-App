const formatAmount = (
    value,
    options = {}
) => {
    const {
        showCurrency = true,
        compact = false,
    } = options;

    const amount = Number(value);

    if (!Number.isFinite(amount)) {
        return showCurrency ? "₹0" : "0";
    }

    if (!compact) {
        const formattedAmount = amount.toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 0,
            }
        );

        return showCurrency
            ? `₹${formattedAmount}`
            : formattedAmount;
    }

    let formattedValue;
    let suffix = "";

    if (amount >= 10000000) {
        formattedValue = amount / 10000000;
        suffix = "Cr";
    } else if (amount >= 100000) {
        formattedValue = amount / 100000;
        suffix = "L";
    } else if (amount >= 1000) {
        formattedValue = amount / 1000;
        suffix = "K";
    } else {
        formattedValue = amount;
    }

    const valueString = formattedValue
        .toFixed(2)
        .replace(/\.?0+$/, "");

    const result = `${valueString}${suffix}`;

    return showCurrency
        ? `₹${result}`
        : result;
};

export default formatAmount;