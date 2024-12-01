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
    const { access_token }: { access_token: string } = await req.json();

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 12);
    const endDate = new Date();

    const response = await plaidClient.transactionsGet({
      access_token,
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
    });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error("Plaid error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch transactions" }),
      { status: 500 }
    );
  }
}
