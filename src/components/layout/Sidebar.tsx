import * as React from 'react';
import { 
  LayoutDashboard, 
  HardHat, 
  Package, 
  Calculator, 
  Users, 
  Bell,
  Sparkles,
  Calendar, 
  Truck, 
  MessageSquare, 
  BarChart3,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { auth } from '@/lib/firebase';
import { LogIn } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Bảng điều khiển', icon: LayoutDashboard },
  { id: 'projects', label: 'Dự án', icon: HardHat },
  { id: 'inventory', label: 'Vật tư', icon: Package },
  { id: 'budget', label: 'Ngân sách', icon: Calculator },
  { id: 'workforce', label: 'Nhân sự', icon: Users },
  { id: 'schedule', label: 'Tiến độ', icon: Calendar },
  { id: 'suppliers', label: 'Nhà cung cấp', icon: Truck },
  { id: 'messages', label: 'Tin nhắn', icon: MessageSquare },
  { id: 'notifications', label: 'Thông báo', icon: Bell },
  { id: 'ai_assistant', label: 'Trợ lý AI', icon: Sparkles },
  { id: 'reports', label: 'Báo cáo', icon: BarChart3 },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transition-transform duration-300 ease-in-out lg:translate-x-0",
        !isOpen && "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-bottom">
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <HardHat className="h-6 w-6 text-primary" />
              BuildMaster Pro
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Quản lý Xây dựng</p>
          </div>

          <ScrollArea className="flex-1 px-4">
            <nav className="space-y-1 py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    activeTab === item.id 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t space-y-2">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              <Settings className="h-4 w-4" />
              Cài đặt
            </button>
            <button 
              onClick={() => auth.signOut()}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-destructive rounded-md hover:bg-destructive/10 transition-colors"
            >
              <LogIn className="h-4 w-4 rotate-180" />
              Đăng xuất
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
