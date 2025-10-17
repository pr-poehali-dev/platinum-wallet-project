import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthScreenProps {
  loginFullName: string;
  setLoginFullName: (value: string) => void;
  loginPin: string;
  setLoginPin: (value: string) => void;
  registerFullName: string;
  setRegisterFullName: (value: string) => void;
  registerPin: string;
  setRegisterPin: (value: string) => void;
  staffPassword: string;
  setStaffPassword: (value: string) => void;
  handleLogin: () => void;
  handleRegister: () => void;
  handleStaffLogin: () => void;
}

const AuthScreen = ({
  loginFullName,
  setLoginFullName,
  loginPin,
  setLoginPin,
  registerFullName,
  setRegisterFullName,
  registerPin,
  setRegisterPin,
  staffPassword,
  setStaffPassword,
  handleLogin,
  handleRegister,
  handleStaffLogin
}: AuthScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
      
      <Card className="w-full max-w-md glass border-white/10 shadow-2xl animate-scale-in relative z-10">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold mb-2 text-white" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, -2px 0 0 #000, 2px 0 0 #000, 0 -2px 0 #000, 0 2px 0 #000' }}>
              ZOV BANK
            </h1>
            <p className="text-muted-foreground">Зовская валюта</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
              <TabsTrigger value="staff">Персонал</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div>
                <Label htmlFor="login-name">ФИО</Label>
                <Input
                  id="login-name"
                  placeholder="Иван Петров"
                  value={loginFullName}
                  onChange={(e) => setLoginFullName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="login-pin">PIN-код</Label>
                <Input
                  id="login-pin"
                  type="password"
                  placeholder="****"
                  maxLength={4}
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button onClick={handleLogin} className="w-full gradient-primary">
                Войти
              </Button>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div>
                <Label htmlFor="register-name">ФИО</Label>
                <Input
                  id="register-name"
                  placeholder="Иван Петров"
                  value={registerFullName}
                  onChange={(e) => setRegisterFullName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="register-pin">Придумайте PIN-код (4 цифры)</Label>
                <Input
                  id="register-pin"
                  type="password"
                  placeholder="****"
                  maxLength={4}
                  value={registerPin}
                  onChange={(e) => setRegisterPin(e.target.value.replace(/\D/g, ''))}
                  className="mt-1"
                />
              </div>
              <Button onClick={handleRegister} className="w-full gradient-primary">
                Зарегистрироваться
              </Button>
            </TabsContent>

            <TabsContent value="staff" className="space-y-4">
              <div>
                <Label htmlFor="staff-password">Пароль персонала</Label>
                <Input
                  id="staff-password"
                  type="password"
                  placeholder="••••••••"
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button onClick={handleStaffLogin} className="w-full bg-accent hover:bg-accent/90">
                Войти как персонал
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default AuthScreen;
