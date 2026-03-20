import React from "react";
import type { Sale } from "../../types/sale";

interface Props {
  sales?: Sale[]; 
}

const RecentSales: React.FC<Props> = ({ sales = [] }) => {
  return (
    <div className="mt-10">
      <h4 className="text-lg font-bold mb-4">Recent Sales</h4>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Menu</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Revenue</th>
            <th className="p-2 border">Profit</th>
          </tr>
        </thead>
        <tbody>
          {sales.slice(0, 5).map((sale) => (
            <tr key={sale.id}>
              <td className="p-2 border">{sale.menu?.name ?? "N/A"}</td>
              <td className="p-2 border">{sale.sale_date}</td>
              <td className="p-2 border">{sale.quantity}</td>
              <td className="p-2 border">
                ₱{sale.total_price.toLocaleString()}
              </td>
              <td className="p-2 border">
                ₱{sale.total_profit.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentSales;