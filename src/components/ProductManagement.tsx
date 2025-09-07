import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MoreHorizontal, Edit, Trash2, Eye, GripVertical, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  price: string;
  stock: number;
  status: "active" | "inactive" | "outofstock";
  statusText: string;
  category: string;
  image: string;
  sales: number;
}

const initialProducts: Product[] = [
  {
    id: "PRD001",
    name: "无线蓝牙耳机",
    price: "¥299",
    stock: 45,
    status: "active",
    statusText: "在售",
    category: "电子产品",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    sales: 128
  },
  {
    id: "PRD002", 
    name: "智能手机壳",
    price: "¥89",
    stock: 0,
    status: "outofstock",
    statusText: "缺货",
    category: "配件",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=200&h=200&fit=crop",
    sales: 89
  },
  {
    id: "PRD003",
    name: "运动T恤",
    price: "¥199",
    stock: 23,
    status: "active", 
    statusText: "在售",
    category: "服装",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    sales: 156
  },
  {
    id: "PRD004",
    name: "咖啡杯",
    price: "¥79",
    stock: 67,
    status: "inactive",
    statusText: "下架",
    category: "家居",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=200&h=200&fit=crop",
    sales: 45
  },
  {
    id: "PRD005",
    name: "笔记本电脑",
    price: "¥5999",
    stock: 12,
    status: "active",
    statusText: "在售", 
    category: "电子产品",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop",
    sales: 34
  },
];

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  outofstock: "bg-red-100 text-red-800",
};

export function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProducts(items);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-gradient">商品管理</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Input
            placeholder="搜索商品..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="类别筛选" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类别</SelectItem>
              <SelectItem value="电子产品">电子产品</SelectItem>
              <SelectItem value="服装">服装</SelectItem>
              <SelectItem value="家居">家居</SelectItem>
              <SelectItem value="配件">配件</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gradient-bg">
            <Plus className="h-4 w-4 mr-2" />
            添加商品
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
        <p className="text-blue-800 text-sm">
          💡 提示：您可以通过拖拽来调整商品在列表中的顺序，这将影响前台展示的优先级。
        </p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="products">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <Draggable key={product.id} draggableId={product.id} index={index}>
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`card-hover animate-slide-up ${
                        snapshot.isDragging ? "shadow-2xl rotate-2" : ""
                      }`}
                      style={{
                        ...provided.draggableProps.style,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <div className="flex items-center space-x-2">
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-grab active:cursor-grabbing"
                          >
                            <GripVertical className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.id}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              查看详情
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              编辑商品
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              删除商品
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="aspect-square rounded-lg overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-foreground">{product.price}</span>
                          <Badge className={statusColors[product.status]}>
                            {product.statusText}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>库存: {product.stock}</span>
                          <span>销量: {product.sales}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          类别: {product.category}
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" className="flex-1 gradient-bg">
                            编辑
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            详情
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}