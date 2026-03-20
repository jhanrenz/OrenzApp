import { useState } from "react";
import type { CategoryData } from "../../../types/category";
import { Link, useNavigate } from "react-router-dom";
import { useCreateCategory } from "../../../stores/useCategory";

export default function CategoryCreatePage() {
  const navigate = useNavigate();
  const createCategoryMutation = useCreateCategory();

  const [data, setData] = useState<CategoryData>({ name: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name.trim()) return;

    try {
      setLoading(true);
      await createCategoryMutation.mutateAsync(data);
      navigate("/categories");
    } catch (err) {
      console.error(err);
      alert("Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Category</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              placeholder="e.g. Food, Drinks, Electronics"
              disabled={loading}
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white 
              focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900
              placeholder:text-slate-400 transition"
            />
            <p className="text-xs text-slate-400 mt-2">
              This will be visible when selecting categories
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Link
              to="/categories"
              className="text-sm text-slate-500 hover:text-slate-700 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium rounded-lg bg-slate-900 text-white 
              hover:bg-slate-800 transition shadow-sm disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}