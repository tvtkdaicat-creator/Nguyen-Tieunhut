import * as React from 'react';
import { cn } from '@/lib/utils';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockProjects } from '@/lib/mock-data';

export function Schedule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tiến độ dự án</h2>
          <p className="text-muted-foreground">Theo dõi dòng thời gian và các mốc quan trọng.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center border rounded-md px-1 bg-card">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-4">Tháng 4, 2024</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Thêm mốc mới
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {mockProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" /> {project.startDate} đến {project.endDate}
                  </span>
                  <Badge variant="outline">{project.status === 'In Progress' ? 'Đang thi công' : project.status === 'Planning' ? 'Đang lập kế hoạch' : 'Chậm tiến độ'}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative pt-8 pb-4">
                {/* Timeline Bar */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full" />
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                />

                {/* Milestones */}
                <div className="flex justify-between relative z-10">
                  <MilestonePoint label="Móng" date="15/01" completed />
                  <MilestonePoint label="Khung" date="10/03" completed />
                  <MilestonePoint label="Mái" date="25/04" active />
                  <MilestonePoint label="Nội thất" date="12/06" />
                  <MilestonePoint label="Hoàn thiện" date="30/08" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MilestonePoint({ label, date, completed, active }: { label: string, date: string, completed?: boolean, active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn(
        "h-4 w-4 rounded-full border-2 bg-background flex items-center justify-center",
        completed ? "border-primary bg-primary" : active ? "border-primary" : "border-muted"
      )}>
        {completed && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold">{label}</p>
        <p className="text-[10px] text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}

