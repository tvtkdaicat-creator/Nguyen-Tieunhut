import * as React from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  MapPin, 
  Calendar as CalendarIcon,
  User
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockProjects } from '@/lib/mock-data';
import { ProjectStatus } from '@/types';

const statusColors: Record<ProjectStatus, string> = {
  'Planning': 'bg-blue-500/10 text-blue-500',
  'In Progress': 'bg-green-500/10 text-green-500',
  'On Hold': 'bg-yellow-500/10 text-yellow-500',
  'Completed': 'bg-gray-500/10 text-gray-500',
  'Delayed': 'bg-red-500/10 text-red-500',
};

const statusLabels: Record<ProjectStatus, string> = {
  'Planning': 'Lập kế hoạch',
  'In Progress': 'Đang thi công',
  'On Hold': 'Tạm dừng',
  'Completed': 'Hoàn thành',
  'Delayed': 'Chậm tiến độ',
};

export function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dự án</h2>
          <p className="text-muted-foreground">Quản lý và theo dõi tất cả các công trường.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Dự án mới
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm dự án..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">Bộ lọc</Button>
      </div>

      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên dự án</TableHead>
              <TableHead>Vị trí</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Tiến độ</TableHead>
              <TableHead>Ngân sách</TableHead>
              <TableHead>Quản lý</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  {project.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {project.location}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[project.status]}>
                    {statusLabels[project.status]}
                  </Badge>
                </TableCell>
                <TableCell className="w-[150px]">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" />
                  </div>
                </TableCell>
                <TableCell>
                  {(project.budget / 1000000000).toFixed(1)} Tỷ
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center">
                      <User className="h-3 w-3" />
                    </div>
                    <span className="text-sm">{project.manager}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
