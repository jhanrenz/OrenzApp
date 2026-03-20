import { Link } from "react-router-dom";
import { useFetchSales, useDeleteSale } from "../../../stores/useSale";
import { useState } from "react";

export default function SaleListPage() {
  const { data: sales } = useFetchSales();
  const deleteSaleMutation = useDeleteSale();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this sale?")) return;
    try {
      setLoading(true);
      await deleteSaleMutation.mutateAsync(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete sale.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => `₱${value.toFixed(2)}`;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
       <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2 md:gap-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Sales History <span className="text-gray-500 text-lg">({sales?.length || 0})</span>
        </h1>

        <div className="flex gap-2">
          <Link
            to="/sales/create"
            className={`px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 shadow-sm transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Create
          </Link>

        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">Menu</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">Sale Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">Total Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">Total Cost</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">Profit</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {sales?.length ? (
              sales.map((sale, index) => (
                <tr
                  key={sale.id}
                  className={`transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium whitespace-nowrap">{sale.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{sale.menu?.name || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{sale.sale_date}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{sale.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{formatCurrency(sale.total_price)}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{formatCurrency(sale.total_cost)}</td>
                  <td
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                      sale.total_profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {sale.total_profit >= 0
                      ? formatCurrency(sale.total_profit)
                      : `Loss: ${formatCurrency(Math.abs(sale.total_profit))}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{sale.sale_date}</td>

                  <td className="px-6 py-4 text-sm text-right flex justify-end gap-2">
                    <Link
                      to={`/sales/edit/${sale.id}`}
                      className="px-3 py-1 bg-green-600 text-white font-medium rounded hover:bg-green-700 shadow-sm transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(sale.id)}
                      className="px-3 py-1 bg-red-600 text-white font-medium rounded hover:bg-red-700 shadow-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-6 text-center text-gray-500 font-medium">
                  No active sales found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}