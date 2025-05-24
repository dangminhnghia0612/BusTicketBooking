export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={
                  col.className ||
                  "px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                }
                style={col.style}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-200">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={
                    col.tdClassName || "px-6 py-4 text-sm text-gray-800"
                  }
                  style={col.tdStyle}
                >
                  {col.render ? col.render(row, i) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
