import Image from "next/image";
export const platformAssets: Record<string, { file: string; name: string }> = {
  shopify: { file: "shopify", name: "Shopify" },
  amazon: { file: "amazon", name: "Amazon" },
  google: { file: "google", name: "Google" },
  etsy: { file: "etsy", name: "Etsy" },
  ebay: { file: "ebay", name: "eBay" },
  youtube: { file: "youtube", name: "YouTube" },
  tiktok: { file: "tiktok", name: "TikTok" },
  walmart: { file: "walmart", name: "Walmart" },
  "google-ads": { file: "google-ads", name: "Google Ads" },
};
export default function PlatformLogo({
  platform,
  className = "",
}: {
  platform: string;
  className?: string;
}) {
  const asset = platformAssets[platform];
  if (!asset) return null;
  return (
    <Image
      className={`platform-logo platform-logo-${platform} ${className}`}
      src={`/logos/${asset.file}.svg`}
      alt={asset.name}
      width={160}
      height={58}
      unoptimized
    />
  );
}
