export const convertToRupees = (priceInDollars) => {
    const conversionRate = 82; // 1 USD = 82 INR
    return priceInDollars * conversionRate;
};