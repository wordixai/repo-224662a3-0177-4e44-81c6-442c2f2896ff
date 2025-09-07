import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const salesData = [
  { name: "1月", sales: 12000, orders: 120 },
  { name: "2月", sales: 19000, orders: 180 },
  { name: "3月", sales: 15000, orders: 150 },
  { name: "4月", sales: 25000, orders: 220 },
  { name: "5月", sales: 22000, orders: 200 },
  { name: "6月", sales: 30000, orders: 280 },
];

const categoryData = [
  { name: "服装", value: 35, color: "#4F46E5" },
  { name: "电子产品", value: 25, color: "#2563EB" },
  { name: "家居用品", value: 20, color: "#7C3AED" },
  { name: "食品", value: 15, color: "#059669" },
  { name: "其他", value: 5, color: "#DC2626" },
];

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>销售趋势</CardTitle>
          <div className="flex space-x-2">
            <Select defaultValue="6months">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">近1月</SelectItem>
                <SelectItem value="3months">近3月</SelectItem>
                <SelectItem value="6months">近6月</SelectItem>
                <SelectItem value="1year">近1年</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#4F46E5" 
                strokeWidth={3}
                dot={{ fill: "#4F46E5", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: "#2563EB" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>商品类别分布</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>订单统计</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">导出数据</Button>
            <Button size="sm" className="gradient-bg">实时刷新</Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="orders" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}