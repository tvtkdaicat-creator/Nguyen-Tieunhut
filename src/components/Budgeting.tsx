import * as React from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Download,
  Plus
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockProjects } from '@/lib/mock-data';

export function Budgeting() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ngân sách & Chi phí</h2>
          <p className="text-muted-foreground">Theo dõi tài chính và dự toán chi phí.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Báo cáo
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Dự toán mới
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tổng dự kiến</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120.4 Tỷ VNĐ</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +5.2% so với năm ngoái
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Thực tế đã chi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">81.1 Tỷ VNĐ</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              65% tổng ngân sách
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ngân sách còn lại</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">39.3 Tỷ VNĐ</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              Đúng tiến độ Q4
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Phân bổ ngân sách dự án</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dự án</TableHead>
                <TableHead>Ngân sách dự kiến</TableHead>
                <TableHead>Thực tế đã chi</TableHead>
                <TableHead>Tỷ lệ sử dụng</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProjects.map((project) => {
                const utilization = (project.spent / project.budget) * 100;
                return (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{(project.budget / 1000000000).toLocaleString('vi-VN', { minimumFractionDigits: 1 })} Tỷ</TableCell>
                    <TableCell>{(project.spent / 1000000000).toLocaleString('vi-VN', { minimumFractionDigits: 1 })} Tỷ</TableCell>
                    <TableCell className="w-[200px]">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span>{utilization.toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={utilization} 
                          className="h-1.5" 
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {utilization > 100 ? (
                        <Badge variant="destructive">Vượt ngân sách</Badge>
                      ) : utilization > 90 ? (
                        <Badge variant="outline" className="text-yellow-500 border-yellow-500">Cảnh báo</Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-500 border-green-500">An toàn</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
