import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchMenus } from "../../../stores/useMenu";
import { useFetchSales, useUpdateSale } from "../../../stores/useSale";
import type { SaleData } from "../../../types/sale";

export default function SaleEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const saleId = Number(id);

  const [search, setSearch] = useState("");
  const [selectedMenuName, setSelectedMenuName] = useState("");

  const { data: menus } = useFetchMenus({
    search: search || undefined,
  });

  const { data: sales } = useFetchSales();
  const updateSale = useUpdateSale();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<SaleData>({
    menu_id: 0,
    sale_date: "",
    quantity: 0,
    current_cost: 0,
    current_price: 0,
    total_cost: 0,
    total_price: 0,
    total_profit: 0,
  });

  useEffect(() => {
    if (sales) {
      const sale = sales.find((s) => s.id === saleId);
      if (sale) {
        setData({
          menu_id: sale.menu_id,
          sale_date: sale.sale_date,
          quantity: sale.quantity,
          current_cost: sale.current_cost,
          current_price: sale.current_price,
          total_cost: sale.total_cost,
          total_price: sale.total_price,
          total_profit: sale.total_profit,
        });
      }
    }
  }, [sales, saleId]);

  useEffect(() => {
    if (menus?.data && data.menu_id) {
      const menu = menus.data.find((m) => m.id === data.menu_id);
      if (menu) {
        setSelectedMenuName(menu.name);
      }
    }
  }, [menus, data.menu_id]);

  useEffect(() => {
    const selectedMenu = menus?.data?.find(
      (menu) => menu.id === data.menu_id
    );

    if (selectedMenu) {
      const current_price = selectedMenu.price;
      const current_cost = selectedMenu.cost;
      const total_price = current_price * data.quantity;
      const total_cost = current_cost * data.quantity;
      const total_profit = total_price - total_cost;

      setData((prev) => ({
        ...prev,
        current_price,
        current_cost,
        total_price,
        total_cost,
        total_profit,
      }));
    }
  }, [data.menu_id, data.quantity, menus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "menu_id"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSale.mutateAsync({ id: saleId, data });
      navigate("/sales");
    } catch (err) {
      console.error("Failed to update sale:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!sales) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="animate-spin border-4 border-blue-600 border-t-transparent rounded-full w-12 h-12"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Sale
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Menu Search */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Menu
            </label>

            <input
              type="text"
              value={selectedMenuName || search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedMenuName("");
              }}
              placeholder="Search menu..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {/* Dropdown */}
            {search && !selectedMenuName && menus?.data && menus.data.length > 0 && (
              <div className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-2 shadow-lg max-h-48 overflow-y-auto">
                {menus.data.map((menu) => (
                  <div
                    key={menu.id}
                    onClick={() => {
                      setData((prev) => ({
                        ...prev,
                        menu_id: menu.id,
                      }));

                      setSelectedMenuName(menu.name);
                      setSearch("");
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition"
                  >
                    <div className="font-medium text-gray-800">
                      {menu.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      ₱{menu.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sale Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sale Date
            </label>
            <input
              type="date"
              name="sale_date"
              value={data.sale_date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={data.quantity}
              onChange={handleChange}
              min={1}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Summary Card */}
          <div className="bg-gray-50 rounded-lg p-4 border space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Price</span>
              <span className="font-semibold">
                ₱{data.current_price.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Current Cost</span>
              <span className="font-semibold">
                ₱{data.current_cost.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Total Price</span>
              <span className="font-semibold">
                ₱{data.total_price.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Total Cost</span>
              <span className="font-semibold">
                ₱{data.total_cost.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-700 font-medium">Profit</span>
              <span className="font-bold text-green-600">
                ₱{data.total_profit.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || data.menu_id === 0}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading || data.menu_id === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update Sale"}
          </button>
        </form>
      </div>
    </div>
  );
}