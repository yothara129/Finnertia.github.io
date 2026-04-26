import { useState, useMemo } from 'react';
import { Card, Slider } from './ui';
import { calculateEMI } from '../lib/calculations';
import { formatCurrency } from '../lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

export const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const result = useMemo(() => {
    return calculateEMI(loanAmount, rate, years);
  }, [loanAmount, rate, years]);

  const pieData = [
    { name: 'Principal Loan Amount', value: loanAmount },
    { name: 'Total Interest', value: result.totalInterest },
  ];

  const COLORS = ['#1e293b', '#EF4444'];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      <div className="xl:col-span-4 space-y-8">
        <Card className="p-6 space-y-8">
          <Slider 
            label="Loan Amount" 
            value={loanAmount} 
            min={100000} 
            max={100000000} 
            step={100000} 
            onChange={setLoanAmount} 
            prefix="₹"
          />
          <Slider 
            label="Interest Rate (% p.a)" 
            value={rate} 
            min={5} 
            max={20} 
            step={0.1} 
            onChange={setRate} 
            suffix="%"
          />
          <Slider 
            label="Loan Tenure (Years)" 
            value={years} 
            min={1} 
            max={30} 
            onChange={setYears} 
            suffix="Y"
          />
        </Card>
        
        <Card className="p-6 bg-slate-900 text-white">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Monthly EMI</p>
          <h2 className="text-4xl font-black">{formatCurrency(result.emi)}</h2>
        </Card>
      </div>

      <div className="xl:col-span-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Payment Breakdown</h3>
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

          <Card className="p-6 flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Interest Payable</p>
                <p className="text-2xl font-bold text-red-500">{formatCurrency(result.totalInterest)}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Amount Payable</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(result.totalPayment)}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Amortization (First 5 Years)</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={result.amortization}>
                <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/100000}L`} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="principalPaid" fill="#1e293b" name="Principal" radius={[4, 4, 0, 0]} />
                <Bar dataKey="interestPaid" fill="#EF4444" name="Interest" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
