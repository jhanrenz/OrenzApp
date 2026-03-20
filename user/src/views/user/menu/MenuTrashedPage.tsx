import { Link } from "react-router-dom";
import {
  useFetchTrashedMenus,
  useForceDeleteMenu,
  useRestoreMenu,
} from "../../../stores/useMenu";
import { useFetchCategories } from "../../../stores/useCategory";

const MenuTrashedPage = () => {
  const { data: menus } = useFetchTrashedMenus();
  const { data: categories } = useFetchCategories();

  const restoreMenuMutation = useRestoreMenu();
  const forceDeleteMenuMutation = useForceDeleteMenu();

  const getCategoryName = (categoryId: number) =>
    categories?.find((c) => c.id === categoryId)?.name || "Unknown";

  const handleRestore = async (id: number) => {
    if (!confirm("Are you sure to restore?")) return;
    try {
      await restoreMenuMutation.mutateAsync(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleForceDelete = async (id: number) => {
    if (!confirm("Are you sure to delete permanently?")) return;
    try {
      await forceDeleteMenuMutation.mutateAsync(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Trashed Menus{" "}
          <span className="text-gray-500 text-lg">
            ({menus?.length || 0})
          </span>
        </h1>
        <Link
          to="/menus"
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Profit
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {menus?.length ? (
              menus.map((menu, index) => (
                <tr
                  key={menu.id}
                  className={`transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium whitespace-nowrap">
                    {menu.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {menu.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    {getCategoryName(menu.category_id)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    ₱ {menu.cost}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    ₱ {menu.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                    ₱ {menu.profit}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleRestore(menu.id)}
                      className="px-3 py-1 bg-green-600 text-white font-medium rounded hover:bg-green-700 shadow-sm transition"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => handleForceDelete(menu.id)}
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
                  colSpan={5}
                  className="px-6 py-6 text-center text-gray-500 font-medium"
                >
                  No trashed menus found.
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

export default MenuTrashedPage;