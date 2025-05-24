import { Bus, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

export default function DesktopSidebar({
  menuItems,
  pathname,
  openSubmenu,
  toggleSubmenu,
}) {
  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Bus className="h-6 w-6 text-gray-700" />
          <span className="ml-2 text-lg font-semibold text-gray-900">
            Bus Ticket Admin
          </span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Menu Quản Trị
        </p>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const isSubmenuActive = item.submenu?.some(
              (subitem) => pathname === subitem.href
            );
            const isOpen = openSubmenu === item.title;

            return (
              <li key={item.href}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 text-sm rounded-md",
                        isSubmenuActive || isOpen
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-4 w-4 mr-3" />
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isOpen ? "rotate-180" : ""
                        )}
                      />
                    </button>
                    {isOpen && (
                      <ul className="mt-1 pl-8 space-y-1">
                        {item.submenu.map((subitem) => (
                          <li key={subitem.href}>
                            <Link
                              to={subitem.href}
                              className={cn(
                                "flex items-center px-3 py-2 text-sm rounded-md",
                                pathname === subitem.href
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700 hover:bg-gray-100"
                              )}
                            >
                              <subitem.icon className="h-4 w-4 mr-3" />
                              <span>{subitem.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm rounded-md",
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    <span>{item.title}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
