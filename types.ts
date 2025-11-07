
export enum UserRole {
  Investor = 'Investor',
  FinancialAdvisor = 'Financial Advisor',
  DataAnalyst = 'Data Analyst',
  Admin = 'Admin',
}

export interface PerformanceData {
  month: string;
  nav: number;
}

export interface Holding {
  name: string;
  percentage: number;
}

export interface MutualFund {
  id: string;
  name: string;
  category: string;
  description: string;
  nav: number;
  aum: string; // Assets Under Management
  expenseRatio: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  oneYearReturn: number;
  holdings: Holding[];
  performance: PerformanceData[];
}
