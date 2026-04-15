import * as React from 'react';
import { 
  Truck, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Search,
  ExternalLink
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockSuppliers } from '@/lib/mock-data';

export function Suppliers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Chợ Nhà cung cấp</h2>
          <p className="text-muted-foreground">Kết nối với các đơn vị cung cấp vật tư đã được xác minh.</p>
        </div>
        <Button>
          <Truck className="mr-2 h-4 w-4" /> Đăng ký Nhà cung cấp
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm nhà cung cấp hoặc danh mục..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Bê tông</Button>
          <Button variant="outline">Sắt thép</Button>
          <Button variant="outline">Thiết bị điện</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockSuppliers.map((supplier) => (
          <Card key={supplier.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{supplier.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" /> {supplier.location}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded text-sm font-bold">
                  <Star className="h-3 w-3 fill-current" /> {supplier.rating}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{supplier.category}</Badge>
                <Badge variant="outline">Đối tác tin cậy</Badge>
                <Badge variant="outline">Giao hàng nhanh</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" /> {supplier.contact}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" /> +84 123 456 789
                </div>
              </div>

              <div className="pt-4 border-t flex gap-2">
                <Button className="flex-1">Yêu cầu báo giá</Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
