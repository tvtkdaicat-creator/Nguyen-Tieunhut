import * as React from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Mail, 
  Phone,
  Briefcase,
  Star,
  MessageSquare
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { mockLabor } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function Workforce() {
  const [workers, setWorkers] = React.useState(mockLabor.map(w => ({ ...w, rating: 4.5, reviews: 12 })));
  const [selectedWorker, setSelectedWorker] = React.useState<any>(null);
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState('');

  const handleRate = (workerId: string) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        const newReviewCount = w.reviews + 1;
        const newRating = ((w.rating * w.reviews) + rating) / newReviewCount;
        return { ...w, rating: Number(newRating.toFixed(1)), reviews: newReviewCount };
      }
      return w;
    }));
    setSelectedWorker(null);
    setComment('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Nhân sự & Đánh giá</h2>
          <p className="text-muted-foreground">Quản lý nhân công, đánh giá hiệu suất và trình độ chuyên môn.</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Thêm thành viên
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm nhân công..."
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Tất cả vai trò</Button>
          <Button variant="outline">Đang làm việc</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workers.map((worker) => (
          <Card key={worker.id} className="overflow-hidden">
            <CardHeader className="border-b bg-muted/30 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-background">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${worker.name}`} />
                    <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{worker.name}</CardTitle>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-medium">{worker.rating}</span>
                      <span className="text-[10px] text-muted-foreground">({worker.reviews})</span>
                    </div>
                  </div>
                </div>
                <Badge variant={worker.status === 'Active' ? 'default' : 'secondary'}>
                  {worker.status === 'Active' ? 'Đang làm' : 'Nghỉ phép'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Briefcase className="h-3 w-3" /> Vai trò
                  </p>
                  <p className="font-medium">{worker.role}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Star className="h-3 w-3" /> Trình độ
                  </p>
                  <p className="font-medium">{worker.skillLevel === 'Senior' ? 'Cao cấp' : worker.skillLevel === 'Lead' ? 'Trưởng nhóm' : 'Trung cấp'}</p>
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger
                      render={
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setSelectedWorker(worker)}>
                          <Star className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Đánh giá nhân sự</DialogTitle>
                        <DialogDescription>
                          Để lại đánh giá cho {selectedWorker?.name} dựa trên hiệu suất công việc.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex justify-center gap-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button key={s} onClick={() => setRating(s)}>
                              <Star className={cn("h-8 w-8", s <= rating ? "fill-yellow-500 text-yellow-500" : "text-muted")} />
                            </button>
                          ))}
                        </div>
                        <Input 
                          placeholder="Nhận xét về trình độ, thái độ..." 
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                      <DialogFooter>
                        <Button onClick={() => handleRate(selectedWorker?.id)}>Gửi đánh giá</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <Button variant="ghost" size="sm">Xem hồ sơ</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
