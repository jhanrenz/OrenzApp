import React from "react";

interface Data {
  name: string;
  value: number;
}

interface Props {
  data: Data[];
}

const BarChart: React.FC<Props> = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bg-white shadow rounded-xl border border-gray-200 p-5">
      
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Revenue by Menu
      </h2>

      <div className="flex items-end gap-4 h-52">
        {data.map((item, index) => {
          const height = (item.value / max) * 100;

          return (
            <div key={index} className="flex flex-col items-center w-full">
              
              <div className="w-6 bg-blue-600 hover:bg-blue-700 transition rounded-t"
                style={{ height: `${height}%` }}
              />

              <span className="text-xs text-gray-600 mt-2 text-center">
                {item.name}
              </span>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;