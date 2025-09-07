import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DashboardStats } from "@/components/DashboardStats";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";
import { OrderCards } from "@/components/OrderCards";
import { ProductManagement } from "@/components/ProductManagement";

const Index = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  const renderContent = () => {
    switch (activeTab) {
      case "analytics":
        return (
          <div className="space-y-8">
            <DashboardStats />
            <AnalyticsCharts />
          </div>
        );
      case "orders":
        return <OrderCards />;
      case "products":
        return <ProductManagement />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-muted-foreground">
                {activeTab === "customers" && "客户管理"}
                {activeTab === "logistics" && "物流管理"} 
                {activeTab === "finance" && "财务管理"}
                {activeTab === "reports" && "报表中心"}
                {activeTab === "settings" && "系统设置"}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                功能开发中，敬请期待...
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;