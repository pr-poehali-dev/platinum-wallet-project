import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import HomeTab from './tabs/HomeTab';
import ProfileTab from './tabs/ProfileTab';
import CasinoTab from './tabs/CasinoTab';
import HistoryTab from './tabs/HistoryTab';
import RequestsTab from './tabs/RequestsTab';
import RulesTab from './tabs/RulesTab';

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

interface StudentDashboardProps {
  currentUser: User;
  currentTab: string;
  setCurrentTab: (value: string) => void;
  requests: Request[];
  depositAmount: string;
  setDepositAmount: (value: string) => void;
  withdrawAmount: string;
  setWithdrawAmount: (value: string) => void;
  handleDepositRequest: () => void;
  handleWithdrawRequest: () => void;
  handleLogout: () => void;
  onBalanceChange: (newBalance: number) => void;
  toast: any;
}

const StudentDashboard = ({
  currentUser,
  currentTab,
  setCurrentTab,
  requests,
  depositAmount,
  setDepositAmount,
  withdrawAmount,
  setWithdrawAmount,
  handleDepositRequest,
  handleWithdrawRequest,
  handleLogout,
  onBalanceChange,
  toast
}: StudentDashboardProps) => {
  const userRequests = requests.filter(r => r.userName === currentUser?.fullName);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/20">
      <nav className="border-b border-white/10 glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold text-white" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
            ZOV BANK
          </h1>
          <Button onClick={handleLogout} variant="ghost" size="sm">
            <Icon name="LogOut" className="mr-2" size={18} />
            Выход
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 glass gap-1">
            <TabsTrigger value="home" className="text-xs sm:text-sm">
              <Icon name="Home" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs sm:text-sm">
              <Icon name="User" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Кабинет</span>
            </TabsTrigger>
            <TabsTrigger value="casino" className="text-xs sm:text-sm">
              <Icon name="Gamepad2" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Казино</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm">
              <Icon name="History" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">История</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="text-xs sm:text-sm">
              <Icon name="FileText" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Заявки</span>
            </TabsTrigger>
            <TabsTrigger value="rules" className="text-xs sm:text-sm">
              <Icon name="BookOpen" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Правила</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <HomeTab currentUser={currentUser} setCurrentTab={setCurrentTab} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="casino">
            <CasinoTab currentUser={currentUser} onBalanceChange={onBalanceChange} toast={toast} />
          </TabsContent>

          <TabsContent value="history">
            <HistoryTab currentUser={currentUser} requests={requests} />
          </TabsContent>

          <TabsContent value="requests">
            <RequestsTab
              depositAmount={depositAmount}
              setDepositAmount={setDepositAmount}
              withdrawAmount={withdrawAmount}
              setWithdrawAmount={setWithdrawAmount}
              handleDepositRequest={handleDepositRequest}
              handleWithdrawRequest={handleWithdrawRequest}
              userRequests={userRequests}
            />
          </TabsContent>

          <TabsContent value="rules">
            <RulesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;