import crypto from "crypto";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();

  // Get timestamp
  const timestamp = Math.round(new Date().getTime() / 1000);

  // String to sign (just timestamp for simple upload, you can add more parameters like folder, eager, etc.)
  const strToSign = `timestamp=${timestamp}${config.cloudinaryApiSecret}`;

  // Create SHA-1 signature
  const signature = crypto.createHash("sha1").update(strToSign).digest("hex");

  return {
    timestamp,
    signature,
    apiKey: config.public.cloudinaryApiKey,
    cloudName: config.public.cloudinaryCloudName,
  };
});
