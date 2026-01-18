import { google } from "googleapis";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const startDate = (query.startDate as string) || "30daysAgo";
  const endDate = (query.endDate as string) || "today";

  const siteUrl =
    process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL ||
    "sc-domain:yamahadetadenpasar.com";

  // Path to service account key
  // We assume the file is in the project root
  const keyFile = "service-account.json";

  try {
    let authOptions: any = {
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    };

    // Prioritize Environment Variable (Best for Vercel)
    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      const jsonStr = process.env.GOOGLE_SERVICE_ACCOUNT_JSON.trim().replace(
        /^['"]|['"]$/g,
        ""
      );
      authOptions.credentials = JSON.parse(jsonStr);
    } else {
      // Fallback to file (Best for Local Dev)
      authOptions.keyFile = keyFile;
    }

    const auth = new google.auth.GoogleAuth(authOptions);

    const searchconsole = google.searchconsole({ version: "v1", auth });

    const res = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: startDate === "30daysAgo" ? getDateXDaysAgo(30) : startDate,
        endDate: endDate === "today" ? getDateXDaysAgo(0) : endDate,
        dimensions: ["date"],
        rowLimit: 30, // Limit to 30 days for the chart
      },
    });

    return {
      success: true,
      data: res.data.rows || [],
    };
  } catch (error: any) {
    console.error("Error fetching Search Console data:", error);
    return {
      success: false,
      error: error.message,
      hint: "Make sure service-account.json exists and has correct permissions.",
    };
  }
});

function getDateXDaysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}
