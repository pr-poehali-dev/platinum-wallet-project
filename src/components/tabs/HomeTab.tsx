import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface User {
  fullName: string;
  balance: number;
}

interface HomeTabProps {
  currentUser: User;
  setCurrentTab: (value: string) => void;
}

const HomeTab = ({ currentUser, setCurrentTab }: HomeTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="glass p-8 text-center border-white/10">
        <p className="text-sm text-muted-foreground mb-2">Ваш баланс</p>
        <h2 className="text-5xl font-heading font-bold mb-4 text-white" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, -2px 0 0 #000, 2px 0 0 #000, 0 -2px 0 #000, 0 2px 0 #000' }}>
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
    </div>
  );
};

export default HomeTab;
