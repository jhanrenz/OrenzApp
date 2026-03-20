import { useMemo } from "react";

type Menu = {
  id: number;
  name?: string;
};

type Category = {
  id: number;
  name: string;
  menus?: Menu[];
};

type Props = {
  categories: Category[];
};

export default function TotalCategoriesWithMenus({ categories }: Props) {
  const breakdown = useMemo(() => {
    return categories.map((cat) => ({
      name: cat.name,
      count: cat.menus?.length || 0,
    }));
  }, [categories]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          Total Categories
        </span>
        <span className="text-2xl font-bold text-gray-900">
          {categories.length}
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {breakdown.length ? (
          breakdown.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2"
            >
              <span className="text-sm text-gray-700">
                {item.name}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {item.count} menus
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No categories found
          </p>
        )}
      </div>
    </div>
  );
}