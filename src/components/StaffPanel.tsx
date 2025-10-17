import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

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

interface StaffPanelProps {
  users: User[];
  requests: Request[];
  bonusAmount: string;
  setBonusAmount: (value: string) => void;
  handleGiveBonusToAll: () => void;
  handleApproveRequest: (requestId: string) => void;
  handleRejectRequest: (requestId: string) => void;
  handleLogout: () => void;
}

const StaffPanel = ({
  users,
  requests,
  bonusAmount,
  setBonusAmount,
  handleGiveBonusToAll,
  handleApproveRequest,
  handleRejectRequest,
  handleLogout
}: StaffPanelProps) => {
  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);
  const activeRequests = requests.filter(r => r.status === 'pending');

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
                <p className="text-sm text-muted-foreground">Всего участников</p>
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
                <p className="text-2xl font-bold">{activeRequests.length}</p>
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
                <p className="text-2xl font-bold">{totalBalance.toLocaleString()}₽</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="glass p-6 mb-6">
          <h2 className="text-xl font-heading font-bold mb-4">Начислить бонус всем участникам</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="bonus-amount">Сумма бонуса</Label>
              <Input
                id="bonus-amount"
                type="number"
                placeholder="1000"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button 
              onClick={handleGiveBonusToAll}
              className="gradient-primary"
            >
              <Icon name="Gift" className="mr-2" size={18} />
              Начислить всем
            </Button>
          </div>
        </Card>

        <Card className="glass p-6">
          <h2 className="text-xl font-heading font-bold mb-4">Заявки на обработку</h2>
          {activeRequests.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Нет активных заявок</p>
          ) : (
            <div className="space-y-4">
              {activeRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-white/5">
                  <div>
                    <p className="font-semibold">{request.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.type === 'deposit' ? 'Пополнение' : 'Вывод'}: {request.type === 'deposit' ? '+' : '-'}{request.amount.toLocaleString()}₽
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveRequest(request.id)}
                    >
                      <Icon name="Check" size={16} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StaffPanel;
