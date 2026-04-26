import { useState, useMemo } from 'react';
import { Card, Slider } from './ui';
import { calculateFD } from '../lib/calculations';
import { formatCurrency } from '../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const FDCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [compounding, setCompounding] = useState<'monthly' | 'quarterly' | 'half-yearly' | 'yearly'>('quarterly');

  const result = useMemo(() => {
    return calculateFD(principal, rate, years, compounding);
  }, [principal, rate, years, compounding]);

  const pieData = [
    { name: 'Principal', value: result.principal },
    { name: 'Interest', value: result.totalInterest },
  ];

  const COLORS = ['#1e293b', '#10B981'];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      <div className="xl:col-span-4 space-y-8">
        <Card className="p-6 space-y-8">
          <Slider 
            label="Principal Amount" 
            value={principal} 
            min={1000} 
            max={10000000} 
            step={1000} 
            onChange={setPrincipal} 
            prefix="₹"
          />
          <Slider 
            label="Interest Rate (% p.a)" 
            value={rate} 
            min={1} 
            max={15} 
            step={0.1} 
            onChange={setRate} 
            suffix="%"
          />
          <Slider 
            label="Tenure (Years)" 
            value={years} 
            min={0.5} 
            max={20} 
            step={0.5} 
            onChange={setYears} 
            suffix="Y"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Compounding Frequency</label>
            <div className="grid grid-cols-2 gap-2">
              {['monthly', 'quarterly', 'half-yearly', 'yearly'].map((f) => (
                <button
                  key={f}
                  onClick={() => setCompounding(f as any)}
                  className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                    compounding === f 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="xl:col-span-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 flex flex-col justify-center items-center text-center">
            <div className="space-y-4">
              <div>
                <p className="text-slate-500 text-sm mb-1">Maturity Value</p>
                <h2 className="text-3xl font-black text-slate-900">{formatCurrency(result.maturityValue)}</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Total Interest</p>
                  <p className="font-bold text-emerald-600">{formatCurrency(result.totalInterest)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Initial Principal</p>
                  <p className="font-bold text-slate-700">{formatCurrency(result.principal)}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
             <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
