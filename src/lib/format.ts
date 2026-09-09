export function inr(value: number, compact = false) {
  if (compact) {
    if (value >= 1_00_00_000) {
      const cr = value / 1_00_00_000;
      return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1)} Cr`;
    }
    if (value >= 1_00_000) {
      const lakh = value / 1_00_000;
      return `₹${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1)} L`;
    }
    if (value >= 1_000) {
      return `₹${Math.round(value / 1_000)}K`;
    }
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function maskMobile(mobile: string) {
  const digits = mobile.replace(/\D/g, "").slice(-10);
  if (digits.length < 10) return mobile;
  return `+91 ${digits.slice(0, 2)}•••••${digits.slice(-3)}`;
}

export function maskPan(pan: string) {
  const v = pan.toUpperCase();
  if (v.length < 10) return pan;
  return `${v.slice(0, 3)}••••${v.slice(-2)}`;
}
