import * as React from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Image as ImageIcon, 
  MapPin, 
  Brain,
  Camera,
  Loader2,
  Maximize2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { GoogleGenAI } from "@google/genai";
import { auth } from '@/lib/firebase';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  type?: 'text' | 'image' | 'analysis';
  imageUrl?: string;
  thinking?: string;
}

export function AIAssistant() {
  const [messages, setMessages] = React.useState<Message[]>([
    { 
      id: '1', 
      role: 'model', 
      text: 'Xin chào! Tôi là trợ lý AI BuildMaster. Tôi có thể giúp bạn phân tích bản vẽ, dự toán chi phí, tạo hình ảnh phối cảnh hoặc tra cứu thông tin bản đồ. Bạn cần giúp gì hôm nay?' 
    }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [mode, setMode] = React.useState<'chat' | 'image' | 'thinking' | 'maps'>('chat');
  const [imageSize, setImageSize] = React.useState<'1K' | '2K' | '4K'>('1K');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let modelName = "gemini-1.5-flash";
      let config: any = {};

      if (mode === 'thinking') {
        modelName = "gemini-2.0-flash-thinking-exp-01-21";
      }

      const model = (genAI as any).getGenerativeModel({ model: modelName });
      
      let result;
      if (mode === 'maps') {
        result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: input }] }],
          tools: [{ googleSearchRetrieval: {} } as any]
        });
      } else {
        result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: input }] }],
          ...(mode === 'thinking' ? { generationConfig: { thinkingConfig: { includeProcess: true } } } : {})
        });
      }

      const response = await result.response;
      const text = response.text();

      const modelMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: text,
        thinking: mode === 'thinking' ? "Đang suy luận chuyên sâu..." : undefined
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        text: 'Rất tiếc, đã có lỗi xảy ra khi kết nối với trí tuệ nhân tạo.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    
    // Mocking image generation for UI demonstration
    setTimeout(() => {
      const imgMsg: Message = {
        id: Date.now().toString(),
        role: 'model',
        text: `Đã tạo hình ảnh phối cảnh với độ phân giải ${imageSize} cho yêu cầu: "${input}"`,
        type: 'image',
        imageUrl: `https://picsum.photos/seed/${Math.random()}/1024/768`
      };
      setMessages(prev => [...prev, imgMsg]);
      setIsLoading(false);
      setInput('');
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      <Card className="flex-1 flex flex-col overflow-hidden border-primary/20 bg-slate-900/50 backdrop-blur-sm">
        <CardHeader className="border-b bg-muted/30 flex flex-row items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Trợ lý AI BuildMaster</CardTitle>
          </div>
          <div className="flex gap-1">
            <Button 
              variant={mode === 'chat' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setMode('chat')}
              className="h-8 text-xs"
            >
              <Sparkles className="mr-1 h-3 w-3" /> Chat
            </Button>
            <Button 
              variant={mode === 'thinking' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setMode('thinking')}
              className="h-8 text-xs"
            >
              <Brain className="mr-1 h-3 w-3" /> Tư duy cao
            </Button>
            <Button 
              variant={mode === 'image' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setMode('image')}
              className="h-8 text-xs"
            >
              <ImageIcon className="mr-1 h-3 w-3" /> Phối cảnh
            </Button>
            <Button 
              variant={mode === 'maps' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setMode('maps')}
              className="h-8 text-xs"
            >
              <MapPin className="mr-1 h-3 w-3" /> Bản đồ
            </Button>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                  msg.role === 'user' ? "bg-primary" : "bg-muted border"
                )}>
                  {msg.role === 'user' ? <User className="h-4 w-4 text-primary-foreground" /> : <Bot className="h-4 w-4 text-primary" />}
                </div>
                <div className={cn(
                  "flex flex-col max-w-[80%]",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}>
                  {msg.thinking && (
                    <Badge variant="outline" className="mb-1 text-[10px] animate-pulse">
                      <Brain className="mr-1 h-2 w-2" /> {msg.thinking}
                    </Badge>
                  )}
                  <div className={cn(
                    "p-3 rounded-2xl text-sm shadow-sm",
                    msg.role === 'user' 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-card border rounded-tl-none"
                  )}>
                    {msg.text}
                    {msg.imageUrl && (
                      <div className="mt-3 rounded-lg overflow-hidden border">
                        <img src={msg.imageUrl} alt="AI Generated" className="w-full h-auto" referrerPolicy="no-referrer" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-muted border flex items-center justify-center">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                </div>
                <div className="bg-card border p-3 rounded-2xl rounded-tl-none text-sm italic text-muted-foreground">
                  Đang xử lý yêu cầu...
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-muted/20">
          <div className="flex flex-col gap-3">
            {mode === 'image' && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">Độ phân giải:</span>
                <Select value={imageSize} onValueChange={(v: any) => setImageSize(v)}>
                  <SelectTrigger className="h-7 w-20 text-[10px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1K">1K</SelectItem>
                    <SelectItem value="2K">2K</SelectItem>
                    <SelectItem value="4K">4K</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="shrink-0">
                <Camera className="h-4 w-4" />
              </Button>
              <Input 
                placeholder={
                  mode === 'image' ? "Mô tả phối cảnh bạn muốn tạo..." : 
                  mode === 'thinking' ? "Đặt câu hỏi kỹ thuật phức tạp..." :
                  mode === 'maps' ? "Tìm kiếm vị trí công trình hoặc nhà cung cấp..." :
                  "Hỏi trợ lý AI về dự án..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (mode === 'image' ? generateImage() : handleSend())}
                className="flex-1 bg-background/50"
              />
              <Button onClick={mode === 'image' ? generateImage() : handleSend()} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="w-72 hidden xl:flex flex-col border-primary/10 bg-slate-900/30">
        <CardHeader className="py-4">
          <CardTitle className="text-sm">Gợi ý AI</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 space-y-3">
          <button 
            onClick={() => setInput("Phân tích rủi ro ngân sách dự án Skyline")}
            className="w-full text-left p-2 text-xs rounded-lg border bg-background/50 hover:border-primary transition-colors"
          >
            "Phân tích rủi ro ngân sách dự án Skyline"
          </button>
          <button 
            onClick={() => setInput("Tạo phối cảnh 3D nhà phố hiện đại 3 tầng")}
            className="w-full text-left p-2 text-xs rounded-lg border bg-background/50 hover:border-primary transition-colors"
          >
            "Tạo phối cảnh 3D nhà phố hiện đại 3 tầng"
          </button>
          <button 
            onClick={() => setInput("Tìm các cửa hàng vật liệu xây dựng gần Quận 1")}
            className="w-full text-left p-2 text-xs rounded-lg border bg-background/50 hover:border-primary transition-colors"
          >
            "Tìm cửa hàng vật liệu gần Quận 1"
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

import { cn } from '@/lib/utils';
