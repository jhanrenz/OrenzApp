import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateMenu } from "../../../stores/useMenu";
import { useFetchCategories } from "../../../stores/useCategory";
import type { MenuData } from "../../../types/menu";

export default function MenuCreatePage() {
  const navigate = useNavigate();
  const createMenu = useCreateMenu();
  const { data: categories } = useFetchCategories();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MenuData>({
    name: "",
    category_id: 0,
    description: "",
    cost: 0,
    price: 0,
    image: null,
  });

  // ✅ Live profit calculation
  const profit = data.price - data.cost;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]:
        name === "cost" || name === "price" || name === "category_id"
          ? Number(value)
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      image: e.target.files?.[0] || null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirm("Are you sure you want to save?")) return;

    if (data.price < data.cost) {
      alert("Lugi ka dito 😅 (price is lower than cost)");
      return;
    }

    try {
      setLoading(true);
      await createMenu.mutateAsync(data);
      navigate("/menus");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="animate-spin border-4 border-slate-900 border-t-transparent rounded-full w-12 h-12"></span>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-start bg-slate-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6 border border-slate-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Menu</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Menu Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="e.g. Burger, Pizza"
              required
              className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Menu description"
              required
              className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Cost Price</label>
            <input
              type="number"
              name="cost"
              value={data.cost}
              onChange={handleChange}
              min={0}
              required
              className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Selling Price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              min={0}
              required
              className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Profit</label>
            <input
              type="text"
              value={
                profit >= 0
                  ? `₱ ${profit.toFixed(2)}`
                  : `Loss: ₱ ${Math.abs(profit).toFixed(2)}`
              }
              readOnly
              className={`border rounded-lg px-4 py-2 font-medium ${
                profit >= 0
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Category</label>
            <select
              name="category_id"
              value={data.category_id}
              onChange={handleChange}
              required
              className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value={0} disabled>Select Category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Menu Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <Link to="/menus" className="text-sm text-gray-500 hover:text-gray-700">
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}