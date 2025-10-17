import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface User {
  fullName: string;
  balance: number;
}

interface CasinoTabProps {
  currentUser: User;
  onBalanceChange: (newBalance: number) => void;
  toast: any;
}

const CasinoTab = ({ currentUser, onBalanceChange, toast }: CasinoTabProps) => {
  const [rouletteBet, setRouletteBet] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  const playRoulette = () => {
    const bet = parseInt(rouletteBet);
    if (isNaN(bet) || bet <= 0) {
      toast({ title: '❌ Ошибка', description: 'Введите корректную ставку', variant: 'destructive' });
      return;
    }
    if (bet > currentUser.balance) {
      toast({ title: '❌ Ошибка', description: 'Недостаточно средств', variant: 'destructive' });
      return;
    }

    setIsSpinning(true);
    
    setTimeout(() => {
      const random = Math.random() * 100;
      const isWin = random < 45;
      
      if (isWin) {
        const newBalance = currentUser.balance + bet;
        onBalanceChange(newBalance);
        toast({ 
          title: '🎉 ВЫИГРЫШ!', 
          description: `Вы выиграли ${bet.toLocaleString()}₽! Новый баланс: ${newBalance.toLocaleString()}₽`,
          duration: 5000
        });
      } else {
        const newBalance = currentUser.balance - bet;
        onBalanceChange(newBalance);
        toast({ 
          title: '😔 Проигрыш', 
          description: `Вы проиграли ${bet.toLocaleString()}₽. Баланс: ${newBalance.toLocaleString()}₽`,
          variant: 'destructive',
          duration: 5000
        });
      }
      
      setRouletteBet('');
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="animate-fade-in">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass p-6 border-white/10">
          <div className="text-center">
            <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-black flex items-center justify-center mb-4 ${isSpinning ? 'animate-spin' : ''}`}>
              <Icon name="CircleDot" className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">Рулетка</h3>
            <p className="text-sm text-muted-foreground mb-4">Шанс выигрыша: 45%</p>
            <div className="space-y-3">
              <div>
                <Label>Ставка</Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={rouletteBet}
                  onChange={(e) => setRouletteBet(e.target.value)}
                  disabled={isSpinning}
                  className="mt-1"
                />
              </div>
              <Button 
                className="w-full gradient-primary" 
                onClick={playRoulette}
                disabled={isSpinning}
              >
                {isSpinning ? 'Крутим...' : 'Играть'}
              </Button>
              <p className="text-xs text-muted-foreground">
                Баланс: {currentUser.balance.toLocaleString()}₽
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass p-6 border-white/10 opacity-50">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mb-4">
              <Icon name="Plane" className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">Crash</h3>
            <p className="text-sm text-muted-foreground mb-4">Самолёт может упасть в любой момент</p>
            <Button className="w-full gradient-accent" disabled>
              Скоро
            </Button>
          </div>
        </Card>

        <Card className="glass p-6 border-white/10 opacity-50">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Icon name="Bomb" className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">Мины</h3>
            <p className="text-sm text-muted-foreground mb-4">Избегай мин и забирай выигрыш</p>
            <Button className="w-full bg-secondary hover:bg-secondary/90" disabled>
              Скоро
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CasinoTab;
