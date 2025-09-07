import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  FileText,
  Truck,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: BarChart3, label: "数据分析", id: "analytics", active: true },
  { icon: ShoppingCart, label: "订单管理", id: "orders" },
  { icon: Package, label: "商品管理", id: "products" },
  { icon: Users, label: "客户管理", id: "customers" },
  { icon: Truck, label: "物流管理", id: "logistics" },
  { icon: CreditCard, label: "财务管理", id: "finance" },
  { icon: FileText, label: "报表中心", id: "reports" },
  { icon: Settings, label: "系统设置", id: "settings" },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-gray-200 flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Button
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-12 transition-all duration-200",
                  collapsed ? "px-3" : "px-4",
                  activeTab === item.id && "gradient-bg text-white shadow-lg"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}