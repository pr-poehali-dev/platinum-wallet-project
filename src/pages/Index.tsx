import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import AuthScreen from '@/components/AuthScreen';
import StaffPanel from '@/components/StaffPanel';
import StudentDashboard from '@/components/StudentDashboard';

interface User {
  fullName: string;
  pin: string;
  balance: number;
  role: 'student' | 'staff';
}

interface Request {
  id: string;
  userName: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
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

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('zovbank_users');
    return saved ? JSON.parse(saved) : [
      { fullName: 'Иван Петров', pin: '1234', balance: 5000, role: 'student' },
      { fullName: 'Мария Сидорова', pin: '4321', balance: 3500, role: 'student' },
    ];
  });

  const [requests, setRequests] = useState<Request[]>(() => {
    const saved = localStorage.getItem('zovbank_requests');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [bonusAmount, setBonusAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  useEffect(() => {
    localStorage.setItem('zovbank_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('zovbank_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    if (currentUser && currentUser.role === 'student') {
      const updatedUser = users.find(u => u.fullName === currentUser.fullName);
      if (updatedUser) {
        setCurrentUser(updatedUser);
      }
    }
  }, [users]);

  const handleGiveBonusToAll = () => {
    const amount = parseInt(bonusAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({ title: '❌ Ошибка', description: 'Введите корректную сумму', variant: 'destructive' });
      return;
    }
    setUsers(prev => prev.map(user => ({
      ...user,
      balance: user.balance + amount
    })));
    setBonusAmount('');
    toast({ 
      title: '✅ Бонус начислен', 
      description: `Всем участникам начислено +${amount.toLocaleString()}₽` 
    });
  };

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
      setUsers(prev => [...prev, newUser]);
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

  const handleDepositRequest = () => {
    const amount = parseInt(depositAmount);
    if (!currentUser || isNaN(amount) || amount <= 0) {
      toast({ title: '❌ Ошибка', description: 'Введите корректную сумму', variant: 'destructive' });
      return;
    }
    const newRequest: Request = {
      id: Date.now().toString(),
      userName: currentUser.fullName,
      type: 'deposit',
      amount: amount,
      status: 'pending'
    };
    setRequests(prev => [...prev, newRequest]);
    setDepositAmount('');
    toast({ title: '✅ Заявка создана', description: 'Ожидайте одобрения персонала' });
  };

  const handleWithdrawRequest = () => {
    const amount = parseInt(withdrawAmount);
    if (!currentUser || isNaN(amount) || amount <= 0) {
      toast({ title: '❌ Ошибка', description: 'Введите корректную сумму', variant: 'destructive' });
      return;
    }
    if (amount > currentUser.balance) {
      toast({ title: '❌ Ошибка', description: 'Недостаточно средств', variant: 'destructive' });
      return;
    }
    const newRequest: Request = {
      id: Date.now().toString(),
      userName: currentUser.fullName,
      type: 'withdraw',
      amount: amount,
      status: 'pending'
    };
    setRequests(prev => [...prev, newRequest]);
    setWithdrawAmount('');
    toast({ title: '✅ Заявка создана', description: 'Ожидайте одобрения персонала' });
  };

  const handleApproveRequest = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    setRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status: 'approved' as const } : r
    ));

    if (request.type === 'deposit') {
      setUsers(prev => prev.map(u => 
        u.fullName === request.userName ? { ...u, balance: u.balance + request.amount } : u
      ));
    } else {
      setUsers(prev => prev.map(u => 
        u.fullName === request.userName ? { ...u, balance: u.balance - request.amount } : u
      ));
    }

    toast({ title: '✅ Заявка одобрена' });
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status: 'rejected' as const } : r
    ));
    toast({ title: '❌ Заявка отклонена' });
  };

  const handleBalanceChange = (newBalance: number) => {
    if (!currentUser) return;
    setUsers(prev => prev.map(u => 
      u.fullName === currentUser.fullName ? { ...u, balance: newBalance } : u
    ));
  };

  if (!isLoggedIn) {
    return (
      <AuthScreen
        loginFullName={loginFullName}
        setLoginFullName={setLoginFullName}
        loginPin={loginPin}
        setLoginPin={setLoginPin}
        registerFullName={registerFullName}
        setRegisterFullName={setRegisterFullName}
        registerPin={registerPin}
        setRegisterPin={setRegisterPin}
        staffPassword={staffPassword}
        setStaffPassword={setStaffPassword}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        handleStaffLogin={handleStaffLogin}
      />
    );
  }

  if (currentUser?.role === 'staff') {
    return (
      <StaffPanel
        users={users}
        requests={requests}
        bonusAmount={bonusAmount}
        setBonusAmount={setBonusAmount}
        handleGiveBonusToAll={handleGiveBonusToAll}
        handleApproveRequest={handleApproveRequest}
        handleRejectRequest={handleRejectRequest}
        handleLogout={handleLogout}
      />
    );
  }

  return (
    <StudentDashboard
      currentUser={currentUser!}
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      requests={requests}
      depositAmount={depositAmount}
      setDepositAmount={setDepositAmount}
      withdrawAmount={withdrawAmount}
      setWithdrawAmount={setWithdrawAmount}
      handleDepositRequest={handleDepositRequest}
      handleWithdrawRequest={handleWithdrawRequest}
      handleLogout={handleLogout}
      onBalanceChange={handleBalanceChange}
      toast={toast}
    />
  );
};

export default Index;