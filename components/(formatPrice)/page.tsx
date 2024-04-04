// This function formats a given number as a price in US dollars
const formatPrice = (amount: number) => {
  // Create a new Intl.NumberFormat object with options for formatting
  // Here, we specify the locale as "en-US" for English language and US region
  // We also specify the currency as "USD" for US dollars
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Export the formatPrice function as the default export
export default formatPrice;
