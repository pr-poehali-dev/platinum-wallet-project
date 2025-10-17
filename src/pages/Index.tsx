import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface User {
  fullName: string;
  pin: string;
  balance: number;
  role: 'student' | 'staff';
}

const STAFF_PASSWORD = 'admin123';

const Index = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTab, setCurrentTab] = useState('home');

  const [loginFullName, setLoginFullName] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [registerFullName, setRegisterFullName] = useState('');
  const [registerPin, setRegisterPin] = useState('');
  const [staffPassword, setStaffPassword] = useState('');

  const [users] = useState<User[]>([
    { fullName: 'Иван Петров', pin: '1234', balance: 5000, role: 'student' },
    { fullName: 'Мария Сидорова', pin: '4321', balance: 3500, role: 'student' },
  ]);

  const handleLogin = () => {
    const user = users.find(u => u.fullName === loginFullName && u.pin === loginPin);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      toast({ title: '✅ Вход выполнен', description: `Добро пожаловать, ${user.fullName}!` });
    } else {
      toast({ title: '❌ Ошибка', description: 'Неверное ФИО или PIN-код', variant: 'destructive' });
    }
  };

  const handleRegister = () => {
    if (registerFullName && registerPin.length === 4) {
      const newUser: User = {
        fullName: registerFullName,
        pin: registerPin,
        balance: 0,
        role: 'student'
      };
      setCurrentUser(newUser);
      setIsLoggedIn(true);
      toast({ title: '✅ Регистрация успешна', description: 'Добро пожаловать!' });
    } else {
      toast({ title: '❌ Ошибка', description: 'Заполните все поля корректно', variant: 'destructive' });
    }
  };

  const handleStaffLogin = () => {
    if (staffPassword === STAFF_PASSWORD) {
      setCurrentUser({ fullName: 'Персонал', pin: '', balance: 0, role: 'staff' });
      setIsLoggedIn(true);
      toast({ title: '✅ Вход в панель персонала', description: 'Добро пожаловать!' });
    } else {
      toast({ title: '❌ Ошибка', description: 'Неверный пароль', variant: 'destructive' });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentTab('home');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        
        <Card className="w-full max-w-md glass border-white/10 shadow-2xl animate-scale-in relative z-10">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-heading font-bold mb-2 gradient-primary bg-clip-text text-transparent">
                School Bank
              </h1>
              <p className="text-muted-foreground">Цифровая валюта школы</p>
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
  }

  if (currentUser?.role === 'staff') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-heading font-bold">Панель персонала</h1>
            <Button onClick={handleLogout} variant="outline">
              <Icon name="LogOut" className="mr-2" size={18} />
              Выход
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="glass p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/20">
                  <Icon name="Users" className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Всего учеников</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-secondary/20">
                  <Icon name="ClipboardList" className="text-secondary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Активные заявки</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-accent/20">
                  <Icon name="TrendingUp" className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Всего в обороте</p>
                  <p className="text-2xl font-bold">8 500₽</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="glass p-6">
            <h2 className="text-xl font-heading font-bold mb-4">Заявки на обработку</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-white/5">
                <div>
                  <p className="font-semibold">Иван Петров</p>
                  <p className="text-sm text-muted-foreground">Пополнение: +1000₽</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Icon name="Check" size={16} />
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-white/5">
                <div>
                  <p className="font-semibold">Мария Сидорова</p>
                  <p className="text-sm text-muted-foreground">Вывод: -500₽</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Icon name="Check" size={16} />
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/20">
      <nav className="border-b border-white/10 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold gradient-primary bg-clip-text text-transparent">
            School Bank
          </h1>
          <Button onClick={handleLogout} variant="ghost" size="sm">
            <Icon name="LogOut" className="mr-2" size={18} />
            Выход
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 glass">
            <TabsTrigger value="home">
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="profile">
              <Icon name="User" size={18} className="mr-2" />
              Кабинет
            </TabsTrigger>
            <TabsTrigger value="casino">
              <Icon name="Gamepad2" size={18} className="mr-2" />
              Казино
            </TabsTrigger>
            <TabsTrigger value="history">
              <Icon name="History" size={18} className="mr-2" />
              История
            </TabsTrigger>
            <TabsTrigger value="requests">
              <Icon name="FileText" size={18} className="mr-2" />
              Заявки
            </TabsTrigger>
            <TabsTrigger value="rules">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Правила
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-fade-in">
            <Card className="glass p-8 text-center border-white/10">
              <p className="text-sm text-muted-foreground mb-2">Ваш баланс</p>
              <h2 className="text-5xl font-heading font-bold mb-4 gradient-primary bg-clip-text text-transparent">
                {currentUser?.balance.toLocaleString()}₽
              </h2>
              <p className="text-muted-foreground">Добро пожаловать, {currentUser?.fullName}!</p>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="glass p-6 hover:scale-105 transition-transform cursor-pointer border-white/10" onClick={() => setCurrentTab('requests')}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-green-600/20">
                    <Icon name="ArrowUp" className="text-green-400" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">Пополнить счёт</p>
                    <p className="text-sm text-muted-foreground">Создать заявку на пополнение</p>
                  </div>
                </div>
              </Card>

              <Card className="glass p-6 hover:scale-105 transition-transform cursor-pointer border-white/10" onClick={() => setCurrentTab('requests')}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-red-600/20">
                    <Icon name="ArrowDown" className="text-red-400" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">Вывести средства</p>
                    <p className="text-sm text-muted-foreground">Получить деньги в школе</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="glass p-6 border-white/10">
              <h3 className="text-xl font-heading font-bold mb-4">Статистика</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">+2,500₽</p>
                  <p className="text-sm text-muted-foreground">Пополнено</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-400">-1,200₽</p>
                  <p className="text-sm text-muted-foreground">Выведено</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">15</p>
                  <p className="text-sm text-muted-foreground">Операций</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <Card className="glass p-6 border-white/10">
              <h2 className="text-2xl font-heading font-bold mb-6">Личный кабинет</h2>
              <div className="space-y-4">
                <div>
                  <Label>ФИО</Label>
                  <Input value={currentUser?.fullName} disabled className="mt-1" />
                </div>
                <div>
                  <Label>Баланс</Label>
                  <Input value={`${currentUser?.balance.toLocaleString()}₽`} disabled className="mt-1" />
                </div>
                <div>
                  <Label>PIN-код</Label>
                  <Input value="••••" disabled className="mt-1" />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="casino" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="glass p-6 hover:scale-105 transition-transform cursor-pointer border-white/10 animate-pulse-glow">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-black flex items-center justify-center mb-4">
                    <Icon name="CircleDot" className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">Рулетка</h3>
                  <p className="text-sm text-muted-foreground mb-4">Шанс выигрыша: 45%</p>
                  <Button className="w-full gradient-primary">Играть</Button>
                </div>
              </Card>

              <Card className="glass p-6 hover:scale-105 transition-transform cursor-pointer border-white/10 animate-pulse-glow">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mb-4">
                    <Icon name="Plane" className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">Crash</h3>
                  <p className="text-sm text-muted-foreground mb-4">Самолёт может упасть в любой момент</p>
                  <Button className="w-full gradient-accent">Играть</Button>
                </div>
              </Card>

              <Card className="glass p-6 hover:scale-105 transition-transform cursor-pointer border-white/10 animate-pulse-glow">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <Icon name="Bomb" className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">Мины</h3>
                  <p className="text-sm text-muted-foreground mb-4">Избегай мин и забирай выигрыш</p>
                  <Button className="w-full bg-secondary hover:bg-secondary/90">Играть</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <Card className="glass p-6 border-white/10">
              <h2 className="text-2xl font-heading font-bold mb-6">История операций</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-muted/10 rounded-lg border border-white/5">
                  <div>
                    <p className="font-semibold">Пополнение</p>
                    <p className="text-sm text-muted-foreground">15.10.2025, 14:30</p>
                  </div>
                  <p className="text-green-400 font-bold">+1,000₽</p>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted/10 rounded-lg border border-white/5">
                  <div>
                    <p className="font-semibold">Рулетка - Выигрыш</p>
                    <p className="text-sm text-muted-foreground">14.10.2025, 18:15</p>
                  </div>
                  <p className="text-green-400 font-bold">+500₽</p>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted/10 rounded-lg border border-white/5">
                  <div>
                    <p className="font-semibold">Вывод средств</p>
                    <p className="text-sm text-muted-foreground">13.10.2025, 10:00</p>
                  </div>
                  <p className="text-red-400 font-bold">-200₽</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass p-6 border-white/10">
                <h3 className="text-xl font-heading font-bold mb-4">Пополнить счёт</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Сумма</Label>
                    <Input type="number" placeholder="1000" className="mt-1" />
                  </div>
                  <Button className="w-full gradient-primary">
                    Создать заявку на пополнение
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    После одобрения персоналом деньги поступят на баланс
                  </p>
                </div>
              </Card>

              <Card className="glass p-6 border-white/10">
                <h3 className="text-xl font-heading font-bold mb-4">Вывести средства</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Сумма</Label>
                    <Input type="number" placeholder="500" className="mt-1" />
                  </div>
                  <Button className="w-full bg-destructive hover:bg-destructive/90">
                    Создать заявку на вывод
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Деньги можно будет получить в школе после одобрения
                  </p>
                </div>
              </Card>
            </div>

            <Card className="glass p-6 mt-6 border-white/10">
              <h3 className="text-xl font-heading font-bold mb-4">Мои активные заявки</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-muted/10 rounded-lg border border-white/5">
                  <div>
                    <p className="font-semibold">Пополнение</p>
                    <p className="text-sm text-muted-foreground">+1,000₽</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-sm">
                    На рассмотрении
                  </span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="animate-fade-in">
            <Card className="glass p-6 border-white/10">
              <h2 className="text-2xl font-heading font-bold mb-6">Правила системы</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">💰 Общие правила</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>School Bank — это внутренняя валюта школы</li>
                    <li>Регистрация доступна всем ученикам</li>
                    <li>Храните PIN-код в секрете</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">📥 Пополнение и вывод</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Все операции проходят через персонал школы</li>
                    <li>Заявки обрабатываются в течение 1 рабочего дня</li>
                    <li>Минимальная сумма вывода: 100₽</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">🎰 Казино</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Рулетка: шанс выигрыша 45%, проигрыша 55%</li>
                    <li>Crash: самолёт может упасть в любой момент (множитель до 22.23x)</li>
                    <li>Мины: выбирайте количество мин (2, 4, 6, 10), каждая клетка удваивает выигрыш</li>
                    <li>Играйте ответственно!</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
