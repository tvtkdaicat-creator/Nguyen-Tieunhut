import * as React from 'react';
import { 
  BarChart3, 
  FileText, 
  Download, 
  Filter,
  Calendar as CalendarIcon,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';

const budgetData = [
  { name: 'Vật liệu', value: 45 },
  { name: 'Nhân công', value: 30 },
  { name: 'Thiết bị', value: 15 },
  { name: 'Khác', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Phân tích & Báo cáo</h2>
          <p className="text-muted-foreground">Thông tin chi tiết và dữ liệu có thể xuất bản.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Bộ lọc
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Xuất tất cả
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Phân bổ ngân sách</CardTitle>
            <CardDescription>Phân phối chi phí theo các danh mục</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%" debounce={100}>
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Báo cáo gần đây</CardTitle>
            <CardDescription>Các bản tóm tắt và kiểm tra đã tạo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ReportItem 
                title="Tóm tắt Tài chính Hàng tháng" 
                date="01/04/2024" 
                type="Tài chính"
              />
              <ReportItem 
                title="Kiểm tra Công trường Skyline" 
                date="28/03/2024" 
                type="An toàn"
              />
              <ReportItem 
                title="Hiệu suất Nhân công Quý" 
                date="15/03/2024" 
                type="Hiệu suất"
              />
              <ReportItem 
                title="Kiểm toán Thu mua Vật tư" 
                date="20/02/2024" 
                type="Kho hàng"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ReportItem({ title, date, type }: { title: string, date: string, type: string }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{date} • {type}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}
