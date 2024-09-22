import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from "@/app/lib/data";

export default async function Page() {
  try {
    // Fetch revenue and latest invoices concurrently for better performance
    const [revenue, latestInvoices, cardData] = await Promise.all([
      fetchRevenue(),
      fetchLatestInvoices(),
      fetchCardData(),
    ]);

    const {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    } = cardData;

    return (
      <main>
        <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>

        {/* Card section */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card title="Collected" value={totalPaidInvoices} type="collected" />
          <Card title="Pending" value={totalPendingInvoices} type="pending" />
          <Card
            title="Total Invoices"
            value={numberOfInvoices}
            type="invoices"
          />
          <Card
            title="Total Customers"
            value={numberOfCustomers}
            type="customers"
          />
        </div>

        {/* Chart and Latest Invoices section */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <RevenueChart revenue={revenue} />
          <LatestInvoices latestInvoices={latestInvoices} />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    return (
      <main>
        <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
        <p className="text-red-500">
          Failed to load dashboard data. Please try again later.
        </p>
      </main>
    );
  }
}
