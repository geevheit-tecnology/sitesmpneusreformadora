import type { Lead, QuoteRequest } from '../types';

export interface WhatsAppService {
  sendMessage(recipient: string, message: string): Promise<void>;
  sendTemplate(recipient: string, template: string, data?: Record<string, string>): Promise<void>;
  notifyLead(lead: Lead): Promise<void>;
  notifyQuote(quote: QuoteRequest): Promise<void>;
}

export interface MailService {
  sendLeadConfirmation(lead: Lead): Promise<void>;
  sendQuoteNotification(quote: QuoteRequest): Promise<void>;
}

export const whatsappService: WhatsAppService = {
  async sendMessage(recipient, message) {
    console.info('[whatsapp:mock]', { recipient, message });
  },
  async sendTemplate(recipient, template, data = {}) {
    console.info('[whatsapp-template:mock]', { recipient, template, data });
  },
  async notifyLead(lead) {
    console.info('[lead-whatsapp:mock]', lead);
  },
  async notifyQuote(quote) {
    console.info('[quote-whatsapp:mock]', quote);
  },
};

export const mailService: MailService = {
  async sendLeadConfirmation(lead) {
    console.info('[mail-lead:mock]', lead.email);
  },
  async sendQuoteNotification(quote) {
    console.info('[mail-quote:mock]', quote.email);
  },
};
