import React, { useMemo } from "react";
import { useFetchSales } from "../../stores/useSale";

import StatsCards from "../../components/dashboard/StatsCards";
import RevenueChart from "../../components/dashboard/RevenueChart";
import TopMenus from "../../components/dashboard/TopMenus";

const Dashboard: React.FC = () => {
  const { data: sales = [], isLoading } = useFetchSales();

  const { totalRevenue, totalCost, totalProfit, profitMargin } = useMemo(() => {
    const totals = sales.reduce(
      (acc, sale) => {
        acc.totalRevenue += sale.total_price;
        acc.totalCost += sale.total_cost;
        acc.totalProfit += sale.total_profit;
        return acc;
      },
      { totalRevenue: 0, totalCost: 0, totalProfit: 0 }
    );

    const margin = totals.totalRevenue
      ? (totals.totalProfit / totals.totalRevenue) * 100
      : 0;

    return { ...totals, profitMargin: margin };
  }, [sales]);

  const chartData = useMemo(() => {
    const grouped: Record<string, { revenue: number; profit: number }> = {};

    sales.forEach((sale) => {
      const date = sale.sale_date;

      if (!grouped[date]) {
        grouped[date] = { revenue: 0, profit: 0 };
      }

      grouped[date].revenue += sale.total_price;
      grouped[date].profit += sale.total_profit;
    });

    return Object.entries(grouped)
      .map(([date, values]) => ({
        date,
        ...values,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [sales]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 animate-pulse max-w-7xl mx-auto">
        <div className="h-8 w-48 bg-gray-300 rounded" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-300 rounded-xl" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-300 rounded-xl" />
          <div className="h-64 bg-gray-300 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-6 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of your sales performance
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <StatsCards
            totalRevenue={totalRevenue}
            totalCost={totalCost}
            totalProfit={totalProfit}
            profitMargin={profitMargin}
          />
        </div>

        {/* Two Column Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* Revenue Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <div className="mb-5 border-b pb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                Revenue Overview
              </h2>
              <p className="text-sm text-gray-500">
                Revenue and profit trends over time
              </p>
            </div>

            <div className="flex-1">
              <RevenueChart data={chartData} />
            </div>
          </div>

          {/* Top Menus */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
            <div className="mb-5 border-b pb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                Top Menus
              </h2>
              <p className="text-sm text-gray-500">
                Best performing items by quantity sold
              </p>
            </div>

            <div className="flex-1">
              <TopMenus sales={sales} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Dashboard;