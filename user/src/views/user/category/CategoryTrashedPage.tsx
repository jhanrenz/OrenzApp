import { Link } from "react-router-dom";
import {
  useFetchTrashedCategories,
  useForceDeleteCategory,
  useRestoreCategory,
} from "../../../stores/useCategory";

const CategoryTrashedPage = () => {
  const { data: categories } = useFetchTrashedCategories();
  const forceDeleteCategoryMutation = useForceDeleteCategory();
  const restoreCategoryMutation = useRestoreCategory();

  const handleForceDelete = async (id: number) => {
    if (!confirm("Are you sure to delete permanently?")) return;
    try {
      await forceDeleteCategoryMutation.mutateAsync(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestore = async (id: number) => {
    if (!confirm("Are you sure to restore?")) return;
    try {
      await restoreCategoryMutation.mutateAsync(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Trashed Categories{" "}
          <span className="text-gray-500 text-lg">
            ({categories?.length || 0})
          </span>
        </h1>
        <Link
          to="/categories"
          className="px-4 py-2 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 shadow-sm transition"
        >
          Back
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-white uppercase tracking-wider">
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
                    <button
                      onClick={() => handleRestore(category.id)}
                      className="px-3 py-1 bg-green-600 text-white font-medium rounded hover:bg-green-700 shadow-sm transition"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => handleForceDelete(category.id)}
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
                  No trashed categories found.
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

export default CategoryTrashedPage;