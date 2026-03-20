import { Link } from "react-router-dom";
import { useFetchMenus, useDeleteMenu } from "../../../stores/useMenu";
import { useFetchCategories } from "../../../stores/useCategory";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

function useDebounce(value: string, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function MenuListPage() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  const { data: menus } = useFetchMenus({
    search: debouncedSearch,
    category_id: categoryId === "" ? undefined : categoryId,
    page,
  });

  const { data: categories } = useFetchCategories();
  const deleteMenuMutation = useDeleteMenu();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure to delete this menu item?")) return;

    try {
      setLoading(true);
      await deleteMenuMutation.mutateAsync(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete menu item");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, categoryId]);

  if(loading) return null;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Menus{" "}
            <span className="text-gray-500 text-lg">
              ({menus?.data?.length || 0})
            </span>
            <span className="text-gray-500 text-lg">
            ({menus?.data?.length || 0} shown / {menus?.total || 0} total)
          </span>
          </h1>

          <div className="flex flex-wrap gap-3">
            <Link to="/menus/create" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Create
            </Link>

            <Link to="/menus/trashed" className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
              Trashed
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 w-full">
          <div className="relative flex-[2]">
            <input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition bg-gray-50"
            />

            <div className="absolute left-3 top-2.5 text-gray-400">
              <Search />
            </div>
          </div>

          <div className="flex-[1]">
            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition bg-gray-50"
            >
              <option value="">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
       {/* Cards Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {menus?.data?.length ? (
    menus.data.map((menu) => (
      <div
        key={menu.id}
        className="bg-white rounded-xl shadow border border-gray-200 flex flex-col hover:shadow-lg transition"
      >
        {/* Image */}
        <div className="h-60 w-full bg-gray-100">
          {menu.image ? (
            <img
              src={`${import.meta.env.VITE_API_URL.replace(
                "/api",
                ""
              )}/storage/${menu.image}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h2 className="text-lg font-semibold text-gray-800">
            {menu.name}
          </h2>

          <p className="text-sm text-gray-500">
            {menu.category?.name}
          </p>

          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {menu.description}
          </p>

          {/* Prices */}
          <div className="mt-3 text-sm space-y-1">
            <p>Cost: ₱ {menu.cost}</p>
            <p className="font-semibold">Price: ₱ {menu.price}</p>
            <p className="text-green-600">
              Profit: ₱ {menu.profit}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-auto pt-4 flex gap-2">
            <Link
              to={`/menus/edit/${menu.id}`}
              className="flex-1 text-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Edit
            </Link>

            <button
              onClick={() => handleDelete(menu.id)}
              className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-full text-center text-gray-500 py-10">
      No menus found.
    </div>
  )}
</div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={menus?.current_page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-gray-700">
            Page {menus?.current_page} of {menus?.last_page}
          </span>

          <button
            disabled={menus?.current_page === menus?.last_page}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}