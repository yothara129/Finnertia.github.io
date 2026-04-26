import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { Card } from './ui';
import { formatCurrency } from '../lib/utils';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface SharedResultProps {
  totalInvested: number;
  totalReturns: number;
  maturityValue: number;
  yearlyData: any[];
  title?: string;
}

export const SharedResult = ({ totalInvested, totalReturns, maturityValue, yearlyData, title = "Investment Growth" }: SharedResultProps) => {
  const pieData = [
    { name: 'Invested Amount', value: totalInvested },
    { name: 'Est. Returns', value: totalReturns },
  ];

  const COLORS = ['#10B981', '#F59E0B'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-emerald-50/50 border-emerald-100">
          <p className="text-sm text-slate-500 mb-1">Total Invested</p>
          <p className="text-xl font-bold text-slate-900">{formatCurrency(totalInvested)}</p>
        </Card>
        <Card className="p-4 bg-amber-50/50 border-amber-100">
          <p className="text-sm text-slate-500 mb-1">Est. Returns</p>
          <p className="text-xl font-bold text-slate-900">{formatCurrency(totalReturns)}</p>
        </Card>
        <Card className="p-4 bg-slate-900 text-white border-transparent">
          <p className="text-sm text-slate-300 mb-1">Total Value</p>
          <p className="text-xl font-bold">{formatCurrency(maturityValue)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-500" />
            Asset Breakdown
          </h3>
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
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <ArrowUpRight size={20} className="text-emerald-500" />
            {title}
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/100000}L`} />
                <Tooltip 
                   formatter={(value: number) => formatCurrency(value)}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10B981" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} name="Value" />
                <Area type="monotone" dataKey="invested" stroke="#94a3b8" fillOpacity={0} name="Invested" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <a 
          href="https://groww.in/mutual-funds" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 bg-[#00D09C] text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          Start SIP on Groww
        </a>
        <a 
          href="https://coin.zerodha.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 bg-[#387ED1] text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          Start SIP on Zerodha
        </a>
      </div>
    </div>
  );
};
