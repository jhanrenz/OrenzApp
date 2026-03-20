import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchCategories } from "../../../stores/useCategory";
import { useFetchMenus, useUpdateMenu } from "../../../stores/useMenu";
import type { MenuData } from "../../../types/menu";

export default function MenuEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: menus, isLoading: menusLoading } = useFetchMenus();
  const { data: categories } = useFetchCategories();
  const updateMenuMutation = useUpdateMenu();

  const menu = menus?.data?.find((m) => m.id === Number(id));

  const [data, setData] = useState<MenuData>({
    name: "",
    category_id: 0,
    description: "",
    cost: "" as unknown as number,
    price: "" as unknown as number,
    image: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (menu) {
      setData({
        name: menu.name,
        category_id: menu.category_id,
        description: menu.description,
        cost: menu.cost,
        price: menu.price,
        image: null,
      });
    }
  }, [menu]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "cost" || name === "price" || name === "category_id"
        ? Number(value)
        : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      image: e.target.files?.[0] ?? null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!confirm("Are you sure to update this menu?")) return;

    try {
      setLoading(true);
      await updateMenuMutation.mutateAsync({ id: Number(id), data });
      navigate("/menus");
    } catch (err) {
      console.error(err);
      alert("Failed to update menu");
    } finally {
      setLoading(false);
    }
  };

  if (menusLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="animate-spin border-4 border-slate-900 border-t-transparent rounded-full w-12 h-12"></span>
      </div>
    );
  }

  if (!menu) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-red-500 text-lg mb-4">Menu not found</p>
        <Link
          to="/menus"
          className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
        >
          Back to Menus
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start p-8 bg-slate-50">
      <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Menu</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>
            <input
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
            <select
              name="category_id"
              value={data.category_id}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            >
              <option value={0}>Select Category</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Old Price
              </label>
              <input
                type="number"
                name="cost"
                value={data.cost || ""}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                New Price
              </label>
              <input
                type="number"
                name="price"
                value={data.price || ""}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              disabled={loading}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Link
              to="/menus"
              className="text-sm text-slate-500 hover:text-slate-700 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Menu"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}