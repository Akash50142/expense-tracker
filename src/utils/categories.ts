import { 
  Home, Car, ShoppingCart, Lightbulb, Umbrella, 
  Heart, PiggyBank, Shirt, Film, GraduationCap, 
  CreditCard, HelpCircle
} from 'lucide-react';
import { ExpenseCategory } from '../types';

export const CATEGORIES: Record<ExpenseCategory, {
  label: string,
  icon: React.ElementType,
  color: string,
  bgColor: string
}> = {
  housing: {
    label: 'Housing',
    icon: Home,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  transportation: {
    label: 'Transportation',
    icon: Car,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  food: {
    label: 'Food & Groceries',
    icon: ShoppingCart,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  utilities: {
    label: 'Utilities',
    icon: Lightbulb,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  insurance: {
    label: 'Insurance',
    icon: Umbrella,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  },
  healthcare: {
    label: 'Healthcare',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  savings: {
    label: 'Savings & Investments',
    icon: PiggyBank,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100'
  },
  personal: {
    label: 'Personal Care',
    icon: Shirt,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100'
  },
  entertainment: {
    label: 'Entertainment',
    icon: Film,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  education: {
    label: 'Education',
    icon: GraduationCap,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100'
  },
  debt: {
    label: 'Debt Payments',
    icon: CreditCard,
    color: 'text-slate-600',
    bgColor: 'bg-slate-100'
  },
  other: {
    label: 'Other',
    icon: HelpCircle,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  }
};

export const getCategoryOptions = () => {
  return Object.entries(CATEGORIES).map(([value, { label }]) => ({
    value: value as ExpenseCategory,
    label
  }));
};