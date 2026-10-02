import type { Lead, QuoteRequest } from '../types';
import { mailService, whatsappService } from './communication';

export interface LeadRepository {
  createLead(lead: Lead): Promise<{ id: string }>;
  createQuote(quote: QuoteRequest): Promise<{ id: string }>;
}

export const leadRepository: LeadRepository = {
  async createLead(lead) {
    const id = crypto.randomUUID();
    localStorage.setItem(`lead:${id}`, JSON.stringify({ ...lead, id, createdAt: new Date().toISOString() }));
    await whatsappService.notifyLead(lead);
    await mailService.sendLeadConfirmation(lead);
    return { id };
  },
  async createQuote(quote) {
    const id = crypto.randomUUID();
    localStorage.setItem(`quote:${id}`, JSON.stringify({ ...quote, id, createdAt: new Date().toISOString() }));
    await whatsappService.notifyQuote(quote);
    await mailService.sendQuoteNotification(quote);
    return { id };
  },
};
