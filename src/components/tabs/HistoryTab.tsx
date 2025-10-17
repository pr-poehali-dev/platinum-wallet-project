import { Card } from '@/components/ui/card';

interface User {
  fullName: string;
}

interface Request {
  id: string;
  userName: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
}

interface HistoryTabProps {
  currentUser: User;
  requests: Request[];
}

const HistoryTab = ({ currentUser, requests }: HistoryTabProps) => {
  const approvedRequests = requests.filter(r => r.userName === currentUser?.fullName && r.status === 'approved');

  return (
    <div className="animate-fade-in">
      <Card className="glass p-6 border-white/10">
        <h2 className="text-2xl font-heading font-bold mb-6">История операций</h2>
        <div className="space-y-3">
          {approvedRequests.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Нет завершённых операций</p>
          ) : (
            approvedRequests.map((req) => (
              <div key={req.id} className="flex justify-between items-center p-4 bg-muted/10 rounded-lg border border-white/5">
                <div>
                  <p className="font-semibold">{req.type === 'deposit' ? 'Пополнение' : 'Вывод средств'}</p>
                  <p className="text-sm text-muted-foreground">Одобрено</p>
                </div>
                <p className={`font-bold ${req.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                  {req.type === 'deposit' ? '+' : '-'}{req.amount.toLocaleString()}₽
                </p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default HistoryTab;
