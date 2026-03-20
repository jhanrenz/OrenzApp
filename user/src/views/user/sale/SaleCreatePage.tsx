import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSale } from "../../../stores/useSale";
import { useFetchMenus } from "../../../stores/useMenu";
import type { SaleData } from "../../../types/sale";

export default function SaleCreatePage() {
  const navigate = useNavigate();
  const createSale = useCreateSale();

  const [search, setSearch] = useState("");
  const [selectedMenuName, setSelectedMenuName] = useState("");

  const { data: menus } = useFetchMenus({
    search: search || undefined,
  });

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
      await createSale.mutateAsync(data);
      navigate("/sales");
    } catch (err) {
      console.error("Failed to create sale:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Create Sale
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Menu Search */}
        <div className="relative">
          <label className="block mb-1 font-medium text-gray-700">
            Search Menu
          </label>

          <input
            type="text"
            value={selectedMenuName || search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedMenuName("");
            }}
            placeholder="Type menu name..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Dropdown Results */}
          {search && !selectedMenuName && menus?.data && menus.data.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow">
              {menus.data.map((menu) => (
                <div
                  key={menu.id}
                  onClick={() => {
                    setData((prev) => ({
                      ...prev,
                      menu_id: menu.id,
                    }));

                    setSelectedMenuName(menu.name); // show selected
                    setSearch(""); // hide dropdown
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <div className="font-medium">{menu.name}</div>
                  <div className="text-sm text-gray-500">
                    ${menu.price}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sale Date */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Sale Date
          </label>
          <input
            type="date"
            name="sale_date"
            value={data.sale_date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={data.quantity}
            onChange={handleChange}
            min={1}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-4 rounded-md shadow-inner space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Current Price</span>
            <span className="font-semibold text-gray-800">
              ₱{data.current_price}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Current Cost</span>
            <span className="font-semibold text-gray-800">
              ₱{data.current_cost}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Total Price</span>
            <span className="font-semibold text-gray-800">
              ₱{data.total_price}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Total Cost</span>
            <span className="font-semibold text-gray-800">
              ₱{data.total_cost}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Total Profit</span>
            <span className="font-semibold text-green-600">
              ₱{data.total_profit}
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || data.menu_id === 0}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
            loading || data.menu_id === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Saving..." : "Create Sale"}
        </button>
      </form>
    </div>
  );
}