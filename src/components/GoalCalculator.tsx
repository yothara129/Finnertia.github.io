import { useState, useMemo } from 'react';
import { Card, Slider, Input } from './ui';
import { calculateGoalSIP } from '../lib/calculations';
import { formatCurrency } from '../lib/utils';
import { Target, Goal } from 'lucide-react';

export const GoalCalculator = () => {
  const [targetGoal, setTargetGoal] = useState(5000000);
  const [years, setYears] = useState(10);
  const [annualRate, setAnnualRate] = useState(12);

  const monthlySIP = useMemo(() => {
    return calculateGoalSIP(targetGoal, years, annualRate);
  }, [targetGoal, years, annualRate]);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <Goal className="text-emerald-500" />
              Plan Your Goal
            </h3>
            
            <Slider 
              label="Target Financial Goal" 
              value={targetGoal} 
              min={100000} 
              max={100000000} 
              step={100000} 
              onChange={setTargetGoal} 
              prefix="₹"
            />
            <Slider 
              label="Years to Achieve Goal" 
              value={years} 
              min={1} 
              max={40} 
              onChange={setYears} 
              suffix="Y"
            />
            <Slider 
              label="Expected Return Rate (% p.a)" 
              value={annualRate} 
              min={1} 
              max={30} 
              step={0.5} 
              onChange={setAnnualRate} 
              suffix="%"
            />
          </div>

          <div className="flex flex-col justify-center items-center text-center space-y-6 bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
              <Target size={32} />
            </div>
            <div>
              <p className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-1">Required Monthly SIP</p>
              <h2 className="text-4xl font-black text-slate-900">{formatCurrency(monthlySIP)}</h2>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[250px]">
              Investing this amount monthly will help you reach your goal of {formatCurrency(targetGoal)} in {years} years.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
