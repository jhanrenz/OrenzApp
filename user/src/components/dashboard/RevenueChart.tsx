type Props = {
  data: {
    date: string;
    revenue: number;
    profit: number;
  }[];
};

export default function RevenueChart({ data }: Props) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h2 className="text-lg font-semibold mb-6">Revenue Overview</h2>

      <div className="flex items-end gap-4 h-64">
        {data.map((item, index) => {
          const height = (item.revenue / maxRevenue) * 100;

          return (
            <div key={index} className="flex flex-col items-center w-full">
              
              <div className="w-full flex items-end h-48">
                <div
                  className="w-full bg-gray-800 rounded-t"
                  style={{ height: `${height}%` }}
                />
              </div>

              <span className="text-xs mt-2 text-gray-600 truncate w-full text-center">
                {item.date}
              </span>

              <span className="text-xs font-semibold text-gray-800">
                ₱{item.revenue.toFixed(0)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}