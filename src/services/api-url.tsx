interface ApiUrl {
  [key: string]: string;
}
export const API_URL: ApiUrl = {
  PROD_PAYMENT_API_URL:
    process.env.NEXT_PUBLIC_PRODUCTION_PAYMENT_API_URL ?? "error",
  PROD_SB_API_URL: process.env.NEXT_PUBLIC_PRODUCTION_SB_API_URL ?? "error",
};
