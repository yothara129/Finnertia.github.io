import { useState, useMemo } from 'react';
import { Card, Slider, Input } from './ui';
import { calculateSIP } from '../lib/calculations';
import { SharedResult } from './SharedResult';
import { Info } from 'lucide-react';

export const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [years, setYears] = useState(10);
  const [annualRate, setAnnualRate] = useState(12);
  const [inflationRate, setInflationRate] = useState(0);

  const result = useMemo(() => {
    return calculateSIP(monthlyInvestment, years, annualRate, inflationRate);
  }, [monthlyInvestment, years, annualRate, inflationRate]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      <div className="xl:col-span-5 space-y-8">
        <Card className="p-6 space-y-8">
          <Slider 
            label="Monthly Investment" 
            value={monthlyInvestment} 
            min={500} 
            max={100000} 
            step={500} 
            onChange={setMonthlyInvestment} 
            prefix="₹"
          />
          <Slider 
            label="Investment Duration (Years)" 
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
          <div className="pt-4 border-t border-slate-100">
            <Slider 
              label="Inflation Adjustment (% p.a)" 
              value={inflationRate} 
              min={0} 
              max={15} 
              step={0.1} 
              onChange={setInflationRate} 
              suffix="%"
            />
            <p className="mt-2 text-xs text-slate-400 flex gap-1.5 items-start">
              <Info size={14} className="mt-0.5 shrink-0" />
              Shows the future value in today's purchasing power terms.
            </p>
          </div>
        </Card>

        <section className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
          <h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
            <Info size={18} />
            Tax Pulse
          </h4>
          <p className="text-sm text-emerald-800 leading-relaxed">
            Equity investments held for &gt;1 year are subject to <strong>LTCG tax of 10%</strong> on gains exceeding ₹1.25 lakh per year. 
            Held for &lt;1 year, <strong>STCG tax of 20%</strong> applies.
          </p>
        </section>
      </div>

      <div className="xl:col-span-7">
        <SharedResult 
          totalInvested={result.totalInvested} 
          totalReturns={result.totalReturns} 
          maturityValue={result.maturityValue} 
          yearlyData={result.yearlyData}
        />
      </div>
    </div>
  );
};
