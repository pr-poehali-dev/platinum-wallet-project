import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface User {
  fullName: string;
  balance: number;
}

interface ProfileTabProps {
  currentUser: User;
}

const ProfileTab = ({ currentUser }: ProfileTabProps) => {
  return (
    <div className="animate-fade-in">
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
    </div>
  );
};

export default ProfileTab;
