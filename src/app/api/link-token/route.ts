import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
  CountryCode,
} from "plaid";

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || "sandbox"],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(config);

export async function POST() {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: "kabirbose", // Replace with your unique user identifier
      },
      client_name: "Plaid API Test",
      products: [Products.Auth, Products.Transactions], // Use enum values
      country_codes: [CountryCode.Us, CountryCode.Ca], // Use enum values
      language: "en",
    });

    return new Response(
      JSON.stringify({ link_token: response.data.link_token }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Plaid error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create link token" }),
      {
        status: 500,
      }
    );
  }
}
