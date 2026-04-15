import * as React from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical,
  Circle
} from 'lucide-react';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '@/lib/firebase';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Timestamp;
}

const contacts = [
  { id: 'global', name: 'Kênh chung', role: 'Toàn bộ dự án', online: true },
  { id: '1', name: 'Nguyễn Văn A', role: 'Quản lý Dự án', online: true },
  { id: '2', name: 'Tổng Công ty Xi măng', role: 'Nhà cung cấp', online: false },
];

export function Messages() {
  const [activeChat, setActiveChat] = React.useState(contacts[0]);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [newMessage, setNewMessage] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(msgs);
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'messages');
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !auth.currentUser) return;

    try {
      await addDoc(collection(db, 'messages'), {
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName || 'User',
        text: newMessage,
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'messages');
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      <Card className="w-80 flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm hội thoại..." className="pl-8 h-9" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="divide-y">
            {contacts.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={cn(
                  "w-full p-4 flex gap-3 hover:bg-muted/50 transition-colors text-left",
                  activeChat.id === chat.id && "bg-muted"
                )}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm truncate">{chat.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{chat.role}</p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChat.name}`} />
              <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{activeChat.name}</p>
              <p className="text-xs text-muted-foreground">{activeChat.role}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex flex-col",
                  msg.senderId === auth.currentUser?.uid ? "items-end" : "items-start"
                )}
              >
                <span className="text-[10px] text-muted-foreground mb-1 px-1">
                  {msg.senderName}
                </span>
                <div 
                  className={cn(
                    "p-3 rounded-lg max-w-[70%] text-sm",
                    msg.senderId === auth.currentUser?.uid 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}
                >
                  {msg.text}
                </div>
                {idx === messages.length - 1 && <div ref={scrollRef} />}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <form className="flex gap-2" onSubmit={handleSendMessage}>
            <Button variant="outline" size="icon" type="button">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input 
              placeholder="Nhập tin nhắn..." 
              className="flex-1" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button size="icon" type="submit">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
