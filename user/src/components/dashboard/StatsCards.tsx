type Props = {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  profitMargin: number;
};

export default function StatsCards({
  totalRevenue,
  totalCost,
  totalProfit,
  profitMargin,
}: Props) {
  const format = (value: number) =>
    `₱${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  const cards = [
    { label: "Total Revenue", value: format(totalRevenue), color: "blue" },
    { label: "Total Cost", value: format(totalCost), color: "red" },
    { label: "Total Profit", value: format(totalProfit), color: "green" },
    { label: "Profit Margin", value: `${profitMargin.toFixed(2)}%`, color: "purple" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-xl shadow border border-gray-200"
        >
          <p className="text-sm text-gray-500">{card.label}</p>
          <h2 className="text-xl font-bold text-gray-800 mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}