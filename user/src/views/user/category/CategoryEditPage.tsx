import { useState, useEffect } from "react";
import type { CategoryData } from "../../../types/category";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchCategories, useUpdateCategory } from "../../../stores/useCategory";

const CategoryEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: categories, isLoading } = useFetchCategories();
  const updateCategoryMutation = useUpdateCategory();

  const category = categories?.find((c) => c.id === Number(id));

  const [data, setData] = useState<CategoryData>({ name: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setData({ name: category.name });
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name.trim()) return;

    try {
      setLoading(true);
      await updateCategoryMutation.mutateAsync({
        id: Number(id),
        data,
      });
      navigate("/categories");
    } catch (err) {
      console.error(err);
      alert("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
        <span className="animate-spin border-4 border-slate-900 border-t-transparent rounded-full w-12 h-12"></span>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Category not found</p>
          <Link
            to="/categories"
            className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center items-start">

      <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Category</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category Name
            </label>
            <input
              name="name"
              type="text"
              value={data.name}
              onChange={handleChange}
              required
              autoFocus
              placeholder="e.g. Food, Drinks, Electronics"
              disabled={loading}
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white
              focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900
              placeholder:text-slate-400 transition"
            />
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
              {loading ? "Updating..." : "Update Category"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CategoryEditPage;