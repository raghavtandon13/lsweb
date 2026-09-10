import {
  Banknote,
  Briefcase,
  Clock,
  Coins,
  CreditCard,
  Landmark,
  LineChart,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const productIcons: Record<string, LucideIcon> = {
  payday: Wallet,
  "short-term-personal": Clock,
  personal: Banknote,
  gold: Coins,
  "against-mutual-funds": LineChart,
  "against-fd": Landmark,
  "card-against-fd": CreditCard,
  "unsecured-business": Briefcase,
  "credit-card": CreditCard,
};
