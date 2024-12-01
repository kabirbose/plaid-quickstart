import FetchTransactions from "@/components/FetchTransactions";
import PlaidIntegration from "@/components/PlaidIntegration";

export default function () {
  return (
    <div>
      <h1 className="font-bold">Plaid API Test</h1>
      <PlaidIntegration />
      <FetchTransactions />
    </div>
  );
}
