import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Request {
  id: string;
  userName: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
}

interface RequestsTabProps {
  depositAmount: string;
  setDepositAmount: (value: string) => void;
  withdrawAmount: string;
  setWithdrawAmount: (value: string) => void;
  handleDepositRequest: () => void;
  handleWithdrawRequest: () => void;
  userRequests: Request[];
}

const RequestsTab = ({
  depositAmount,
  setDepositAmount,
  withdrawAmount,
  setWithdrawAmount,
  handleDepositRequest,
  handleWithdrawRequest,
  userRequests
}: RequestsTabProps) => {
  const pendingRequests = userRequests.filter(r => r.status === 'pending');

  return (
    <div className="animate-fade-in">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass p-6 border-white/10">
          <h3 className="text-xl font-heading font-bold mb-4">Пополнить счёт</h3>
          <div className="space-y-4">
            <div>
              <Label>Сумма</Label>
              <Input 
                type="number" 
                placeholder="1000" 
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="mt-1" 
              />
            </div>
            <Button onClick={handleDepositRequest} className="w-full gradient-primary">
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
              <Input 
                type="number" 
                placeholder="500" 
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="mt-1" 
              />
            </div>
            <Button onClick={handleWithdrawRequest} className="w-full bg-destructive hover:bg-destructive/90">
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
        {pendingRequests.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Нет активных заявок</p>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map((req) => (
              <div key={req.id} className="flex justify-between items-center p-4 bg-muted/10 rounded-lg border border-white/5">
                <div>
                  <p className="font-semibold">{req.type === 'deposit' ? 'Пополнение' : 'Вывод'}</p>
                  <p className="text-sm text-muted-foreground">{req.type === 'deposit' ? '+' : '-'}{req.amount.toLocaleString()}₽</p>
                </div>
                <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-sm">
                  На рассмотрении
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default RequestsTab;
