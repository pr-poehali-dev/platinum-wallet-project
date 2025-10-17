import { Card } from '@/components/ui/card';

const RulesTab = () => {
  return (
    <div className="animate-fade-in">
      <Card className="glass p-6 border-white/10">
        <h2 className="text-2xl font-heading font-bold mb-6">Правила системы</h2>
        <div className="space-y-4 text-muted-foreground">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">💰 Общие правила</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>ZOV BANK — это внутренняя валюта школы</li>
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
    </div>
  );
};

export default RulesTab;
