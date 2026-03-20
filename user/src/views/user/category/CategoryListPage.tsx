import { Link } from "react-router-dom";
import { useFetchCategories, useDeleteCategory } from "../../../stores/useCategory";
import { useState } from "react";

const CategoryListPage = () => {
  const { data: categories } = useFetchCategories();
  const deleteCategoryMutation = useDeleteCategory();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure to delete this category?")) return;
    try {
        setLoading(true)
      await deleteCategoryMutation.mutateAsync(id);
      setLoading(false)
    } catch (err) {
      console.error(err);
      alert("Failed to delete category");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Categories <span className="text-gray-500 text-lg">({categories?.length || 0})</span>
        </h1>
         <div className="flex flex-wrap gap-3">
          <Link
            to="/categories/create"
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-sm transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Create
          </Link>
          <Link
            to="/categories/trashed"
            className={`px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 shadow-sm transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Trashed
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {categories?.length ? (
              categories.map((category, index) => (
                <tr
                  key={category.id}
                  className={`transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium whitespace-nowrap">
                    {category.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-right flex justify-end gap-2">
                    <Link
                      to={`/categories/edit/${category.id}`}
                      className="px-3 py-1 bg-green-600 text-white font-medium rounded hover:bg-green-700 shadow-sm transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="px-3 py-1 bg-red-600 text-white font-medium rounded hover:bg-red-700 shadow-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-6 text-center text-gray-500 font-medium"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryListPage;