type Sale = {
  quantity: number;
  menu?: {
    name?: string;
  };
};

type Props = {
  sales: Sale[];
};

export default function TopMenus({ sales }: Props) {
  const menuMap: Record<string, number> = {};

  sales.forEach((sale) => {
    const name = sale.menu?.name || "Unknown";
    menuMap[name] = (menuMap[name] || 0) + sale.quantity;
  });

  const sorted = Object.entries(menuMap)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  return (
    <div className="bg-white shadow rounded-xl border border-gray-200 p-5">
      
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Top Selling Menus
      </h2>

      <div className="divide-y divide-gray-100">
        {sorted.length ? (
          sorted.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3"
            >
              <span className="text-gray-700 text-sm">
                {item.name}
              </span>

              <span className="text-gray-900 font-semibold text-sm">
                {item.qty}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No data available
          </p>
        )}
      </div>
    </div>
  );
}