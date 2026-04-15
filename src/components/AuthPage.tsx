import * as React from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HardHat, LogIn, UserPlus, Building2, UserCircle2 } from 'lucide-react';

export function AuthPage() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('contractor');
  const [error, setError] = React.useState('');

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // Store role in localStorage for App.tsx to pick up
      localStorage.setItem('pending_role', role);
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Convert phone to email format for Firebase Auth
    const email = `${phone.replace(/\s/g, '')}@buildmaster.pro`;
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Store role in localStorage for App.tsx to pick up
        localStorage.setItem('pending_role', role);
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError('Đăng nhập bằng Email/Mật khẩu chưa được bật trong Firebase Console. Vui lòng liên hệ quản trị viên.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Định dạng số điện thoại không hợp lệ.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Số điện thoại hoặc mật khẩu không chính xác.');
      } else {
        setError(err.message);
      }
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <Card className="w-full max-w-lg border-slate-700 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-5 h-full">
          <div className="hidden md:flex md:col-span-2 bg-primary p-8 flex-col justify-between text-primary-foreground">
            <div>
              <HardHat className="h-12 w-12 mb-6" />
              <h1 className="text-3xl font-bold leading-tight">BuildMaster Pro</h1>
              <p className="mt-4 text-primary-foreground/80 text-sm">
                Giải pháp quản lý thi công toàn diện cho nhà thầu và chủ đầu tư.
              </p>
            </div>
            <div className="space-y-4 text-xs opacity-70">
              <p>✓ Quản lý dự án thời gian thực</p>
              <p>✓ Dự toán chính xác 99%</p>
              <p>✓ Kết nối linh hoạt</p>
            </div>
          </div>

          <div className="md:col-span-3 p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-bold text-white">
                {isLogin ? 'Chào mừng trở lại' : 'Bắt đầu ngay'}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {isLogin ? 'Đăng nhập bằng số điện thoại của bạn' : 'Tạo tài khoản để quản lý công trình'}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 space-y-6">
              {!isLogin && (
                <div className="space-y-3">
                  <Label className="text-slate-300">Bạn là ai?</Label>
                  <RadioGroup 
                    defaultValue="contractor" 
                    onValueChange={setRole}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="contractor" id="contractor" className="peer sr-only" />
                      <Label
                        htmlFor="contractor"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:text-white peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                      >
                        <Building2 className="mb-2 h-6 w-6" />
                        <span className="text-xs font-semibold">Nhà thầu</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="investor" id="investor" className="peer sr-only" />
                      <Label
                        htmlFor="investor"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 hover:text-white peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                      >
                        <UserCircle2 className="mb-2 h-6 w-6" />
                        <span className="text-xs font-semibold">Chủ đầu tư</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300">Số điện thoại</Label>
                  <Input 
                    id="phone"
                    type="tel" 
                    placeholder="09xx xxx xxx" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300">Mật khẩu</Label>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-primary"
                    required
                  />
                </div>
                {error && <p className="text-xs text-red-400 bg-red-400/10 p-2 rounded border border-red-400/20">{error}</p>}
                <Button type="submit" className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]">
                  {isLogin ? <LogIn className="mr-2 h-5 w-5" /> : <UserPlus className="mr-2 h-5 w-5" />}
                  {isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}
                </Button>
              </form>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-slate-500">Hoặc tiếp tục với</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full h-11 border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white transition-all" 
                onClick={handleGoogleSignIn}
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </CardContent>
            <CardFooter className="p-0 mt-6">
              <Button 
                variant="link" 
                className="w-full text-sm text-slate-400 hover:text-primary transition-colors" 
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
