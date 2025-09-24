export const formatCurrency = (amount: number) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 3,
  });
  return formatter.format(amount);
};