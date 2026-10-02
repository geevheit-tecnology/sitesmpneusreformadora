import type { LucideIcon } from 'lucide-react';

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPOSAL'
  | 'NEGOTIATION'
  | 'CONVERTED'
  | 'LOST';

export interface Stat {
  value: string;
  label: string;
}

export interface ServiceStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Lead {
  name: string;
  company: string;
  document?: string;
  phone: string;
  whatsapp?: string;
  email: string;
  city?: string;
  state?: string;
  source: string;
  status: LeadStatus;
  notes?: string;
}

export interface QuoteRequest extends Lead {
  tireQuantity: string;
  tireType: string;
  tireSize?: string;
  serviceType: string;
  consent: boolean;
}
