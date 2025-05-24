export default function AdminPageLayout({
  title,
  addButton,
  search,
  tableTitle,
  tableDescription,
  children,
  pagination,
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center md:text-left">
          {title}
        </h1>
        {addButton && (
          <div className="flex justify-center md:justify-end">{addButton}</div>
        )}
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            {tableTitle}
          </h2>
          <p className="text-sm text-gray-500 mb-4">{tableDescription}</p>
          {search}
        </div>
      </div>
      <div className="grid grid-cols-1">{children}</div>
      {pagination && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          {pagination}
        </div>
      )}
    </>
  );
}
