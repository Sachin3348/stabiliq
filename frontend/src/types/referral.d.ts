export interface ReferralStats {
  referralCode: string | null;
  walletBalance: number;
  total: number;
  successful: number;
  pending: number;
}