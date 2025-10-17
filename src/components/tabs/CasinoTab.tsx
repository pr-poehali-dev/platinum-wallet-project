import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CasinoTabProps {
  toast: any;
}

const CasinoTab = ({ toast }: CasinoTabProps) => {
  return (
    <div className="animate-fade-in">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass p-6 hover:scale-105 transition-transform cursor-pointer border-white/10">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-black flex items-center justify-center mb-4">
              <Icon name="CircleDot" className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">Рулетка</h3>
            <p className="text-sm text-muted-foreground mb-4">Шанс выигрыша: 45%</p>
            <Button className="w-full gradient-primary" onClick={() => toast({ title: '🎰 В разработке', description: 'Скоро будет доступно' })}>
              Играть
            </Button>
          </div>
        </Card>

        <Card className="glass p-6 hover:scale-105 transition-transform cursor-pointer border-white/10">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center mb-4">
              <Icon name="Plane" className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">Crash</h3>
            <p className="text-sm text-muted-foreground mb-4">Самолёт может упасть в любой момент</p>
            <Button className="w-full gradient-accent" onClick={() => toast({ title: '🎰 В разработке', description: 'Скоро будет доступно' })}>
              Играть
            </Button>
          </div>
        </Card>

        <Card className="glass p-6 hover:scale-105 transition-transform cursor-pointer border-white/10">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Icon name="Bomb" className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">Мины</h3>
            <p className="text-sm text-muted-foreground mb-4">Избегай мин и забирай выигрыш</p>
            <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={() => toast({ title: '🎰 В разработке', description: 'Скоро будет доступно' })}>
              Играть
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CasinoTab;
