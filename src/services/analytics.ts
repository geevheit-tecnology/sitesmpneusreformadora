export type AnalyticsEvent =
  | 'page_view'
  | 'quote_started'
  | 'quote_submitted'
  | 'assistant_clicked'
  | 'assistant_message_sent'
  | 'whatsapp_clicked'
  | 'phone_clicked'
  | 'email_clicked'
  | 'contact_submitted';

export interface AnalyticsService {
  track(event: AnalyticsEvent, payload?: Record<string, unknown>): void;
}

export const analyticsService: AnalyticsService = {
  track(event, payload = {}) {
    console.info('[analytics:mock]', event, payload);
  },
};
