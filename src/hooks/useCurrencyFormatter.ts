import { useMemo } from "react";

const useCurrencyFormatter = (currencyCode: string = "KES") => {
  const formatter = useMemo(() => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    });
  }, [currencyCode]);

  const formatCurrency = (amount: number): string => {
    return formatter.format(amount).replace(/KES\s?/, "KES ");
  };

  // Thousands separators
  const formatCurrencyWithThousandsSeparators = (amount: number): string => {
    return amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };


  return { formatCurrency, formatCurrencyWithThousandsSeparators };
};

export default useCurrencyFormatter;
