import * as React from 'react';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Plus, 
  Trash2,
  Save
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Rule {
  id: string;
  event: 'deadline' | 'overbudget' | 'status_change';
  threshold?: string;
  channel: 'email' | 'push' | 'both';
  active: boolean;
}

export function Notifications() {
  const [rules, setRules] = React.useState<Rule[]>([
    { id: '1', event: 'overbudget', threshold: '90%', channel: 'both', active: true },
    { id: '2', event: 'deadline', threshold: '3 days', channel: 'push', active: true },
  ]);

  const addRule = () => {
    const newRule: Rule = {
      id: Math.random().toString(36).substr(2, 9),
      event: 'status_change',
      channel: 'email',
      active: true
    };
    setRules([...rules, newRule]);
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const updateRule = (id: string, updates: Partial<Rule>) => {
    setRules(rules.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Thông báo & Quy tắc</h2>
          <p className="text-muted-foreground">Thiết lập các quy tắc tự động để nhận cảnh báo về dự án.</p>
        </div>
        <Button onClick={addRule}>
          <Plus className="mr-2 h-4 w-4" /> Thêm quy tắc mới
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Quy tắc hiện tại
            </CardTitle>
            <CardDescription>Các sự kiện sẽ kích hoạt thông báo cho bạn.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex flex-col p-4 border rounded-lg bg-muted/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {rule.event === 'overbudget' && <DollarSign className="h-4 w-4 text-red-500" />}
                        {rule.event === 'deadline' && <Clock className="h-4 w-4 text-yellow-500" />}
                        {rule.event === 'status_change' && <AlertTriangle className="h-4 w-4 text-blue-500" />}
                        <span className="font-medium text-sm">
                          {rule.event === 'overbudget' ? 'Vượt ngân sách' : 
                           rule.event === 'deadline' ? 'Sắp đến hạn' : 'Thay đổi trạng thái'}
                        </span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteRule(rule.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-muted-foreground font-bold">Điều kiện</label>
                        <Select 
                          value={rule.event} 
                          onValueChange={(v: any) => updateRule(rule.id, { event: v })}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="overbudget">Vượt ngân sách</SelectItem>
                            <SelectItem value="deadline">Sắp đến hạn</SelectItem>
                            <SelectItem value="status_change">Đổi trạng thái</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-muted-foreground font-bold">Kênh nhận</label>
                        <Select 
                          value={rule.channel} 
                          onValueChange={(v: any) => updateRule(rule.id, { channel: v })}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="push">Thông báo đẩy</SelectItem>
                            <SelectItem value="both">Cả hai</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {rule.event !== 'status_change' && (
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase text-muted-foreground font-bold">Ngưỡng cảnh báo</label>
                        <Input 
                          className="h-8 text-xs" 
                          value={rule.threshold} 
                          onChange={(e) => updateRule(rule.id, { threshold: e.target.value })}
                          placeholder={rule.event === 'overbudget' ? 'Ví dụ: 90%' : 'Ví dụ: 2 ngày'}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Cấu hình Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email nhận thông báo</label>
                <Input placeholder="example@gmail.com" defaultValue="tvtkdaicat@gmail.com" />
              </div>
              <Button className="w-full">
                <Save className="mr-2 h-4 w-4" /> Lưu cấu hình
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Thông báo đẩy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Trạng thái trình duyệt</p>
                  <p className="text-xs text-muted-foreground">Cho phép BuildMaster gửi thông báo</p>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/5">Đã bật</Badge>
              </div>
              <Button variant="outline" className="w-full">Gửi thông báo thử</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
