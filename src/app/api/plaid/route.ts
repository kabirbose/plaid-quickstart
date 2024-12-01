import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || "sandbox"],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID as string,
      "PLAID-SECRET": process.env.PLAID_SECRET as string,
    },
  },
});

const plaidClient = new PlaidApi(config);

export async function POST(req: Request): Promise<Response> {
  try {
    const { public_token }: { public_token: string } = await req.json();

    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    return new Response(
      JSON.stringify({ access_token: response.data.access_token }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Plaid error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to exchange public token" }),
      { status: 500 }
    );
  }
}
