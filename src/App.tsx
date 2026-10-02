import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight, ArrowUp, Bot, CheckCircle2, ChevronRight, Headphones, PhoneCall, Send, Upload } from 'lucide-react';
import { companySettings } from './config/company';
import { benefits, blogPosts, contactChannels, faqItems, hero, processSteps, segments, stats, testimonials } from './content/siteContent';
import { analyticsService } from './services/analytics';
import { leadRepository } from './services/leadRepository';
import type { QuoteRequest } from './types';

const nav = ['Empresa', 'Reforma de Pneus', 'Serviços', 'Tecnologia', 'Qualidade', 'Sustentabilidade', 'Frotas', 'Conteúdos', 'Contato'];

function slug(label: string) {
  return label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#inicio" aria-label="Voltar ao início">
        <span className="brand-mark">SM</span>
        <span>
          <strong>{companySettings.companyName}</strong>
          <small>Reforma inteligente de pneus</small>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {nav.map((item) => <a key={item} href={`#${slug(item)}`}>{item}</a>)}
      </nav>
      <a className="btn btn-primary header-cta" href="#orcamento">Solicitar orçamento</a>
      <button className="icon-button mobile-toggle" onClick={() => setOpen(!open)} aria-label="Abrir menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && (
        <div className="mobile-nav">
          {nav.map((item) => <a key={item} href={`#${slug(item)}`} onClick={() => setOpen(false)}>{item}</a>)}
          <a className="btn btn-primary" href="#orcamento" onClick={() => setOpen(false)}>Solicitar orçamento</a>
        </div>
      )}
    </header>
  );
}

function ButtonLink({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  return <a className={`btn btn-${variant}`} href={href}>{children}<ArrowRight size={18} /></a>;
}

function StatCard({ value, label }: { value: string; label: string }) {
  return <div className="stat-card"><strong>{value}</strong><span>{label}</span></div>;
}

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="section-header reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <img src={hero.image} alt="Caminhão em operação logística com pneus reformados" />
      <div className="hero-overlay" />
      <div className="hero-content reveal">
        <span className="eyebrow">Industrial Premium + Tecnologia + Mobilidade</span>
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
        <div className="actions">
          <ButtonLink href="#orcamento">{hero.primaryCta}</ButtonLink>
          <ButtonLink href="#servicos" variant="secondary">{hero.secondaryCta}</ButtonLink>
        </div>
      </div>
      <div className="hero-stats" aria-label="Indicadores de autoridade">
        {stats.map((item) => <StatCard key={item.label} {...item} />)}
      </div>
    </section>
  );
}

function ServiceProcess() {
  return (
    <section className="section" id="reforma-de-pneus">
      <SectionHeader eyebrow="Processo" title="Reforma de Pneus" text="Um fluxo técnico, rastreável e preparado para alta exigência operacional." />
      <div className="process-grid">
        {processSteps.map((step) => {
          const Icon = step.icon;
          return (
            <article className="process-card reveal" key={step.number}>
              <span>{step.number}</span>
              <Icon aria-hidden size={28} />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Timeline() {
  const items = ['Pneu recebido', 'Inspeção', 'Avaliação da carcaça', 'Preparação', 'Aplicação da banda', 'Vulcanização', 'Controle de qualidade', 'Liberação'];
  return (
    <section className="section band" id="qualidade">
      <SectionHeader eyebrow="Qualidade" title="Qualidade em cada etapa" text="Inspeção, rastreabilidade, padrões técnicos e processos documentados do recebimento à entrega." />
      <div className="timeline">
        {items.map((item, index) => (
          <div className="timeline-item reveal" key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    const form = new FormData(event.currentTarget);
    const payload: QuoteRequest = {
      name: String(form.get('name') ?? ''),
      company: String(form.get('company') ?? ''),
      document: String(form.get('document') ?? ''),
      phone: String(form.get('phone') ?? ''),
      whatsapp: String(form.get('whatsapp') ?? ''),
      email: String(form.get('email') ?? ''),
      city: String(form.get('city') ?? ''),
      state: String(form.get('state') ?? ''),
      tireQuantity: String(form.get('tireQuantity') ?? ''),
      tireType: String(form.get('tireType') ?? ''),
      tireSize: String(form.get('tireSize') ?? ''),
      serviceType: String(form.get('serviceType') ?? ''),
      notes: String(form.get('message') ?? ''),
      source: 'website_quote',
      status: 'NEW',
      consent: form.get('consent') === 'on',
    };
    try {
      if (!payload.name || !payload.company || !payload.phone || !payload.email || !payload.consent) throw new Error('invalid');
      await leadRepository.createQuote(payload);
      analyticsService.track('quote_submitted', { company: payload.company });
      setStatus('success');
      event.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="quote-form" onSubmit={submit} id="orcamento">
      <div className="form-grid">
        {['name:Nome', 'company:Empresa', 'document:CNPJ', 'phone:Telefone', 'whatsapp:WhatsApp', 'email:E-mail', 'city:Cidade', 'state:Estado', 'tireQuantity:Quantidade de pneus', 'tireType:Tipo de pneu', 'tireSize:Medida', 'serviceType:Tipo de serviço'].map((field) => {
          const [name, label] = field.split(':');
          return <label key={name}>{label}<input name={name} required={['name', 'company', 'phone', 'email'].includes(name)} /></label>;
        })}
      </div>
      <label>Mensagem<textarea name="message" rows={3} /></label>
      <label className="file-field"><Upload size={18} /> Anexos<input type="file" name="attachments" multiple /></label>
      <label className="check"><input type="checkbox" name="consent" required /> Autorizo o contato para atendimento comercial conforme a LGPD.</label>
      <button className="btn btn-primary" disabled={status === 'loading'}><Send size={18} />{status === 'loading' ? 'Enviando...' : 'Enviar orçamento'}</button>
      {status === 'success' && <p className="success">Solicitação registrada. Nossa equipe comercial retornará em breve.</p>}
      {status === 'error' && <p className="error">Revise os campos obrigatórios e tente novamente.</p>}
    </form>
  );
}

function MainSections() {
  return (
    <>
      <section className="section split" id="empresa">
        <div className="reveal">
          <span className="eyebrow">Empresa</span>
          <h2>Experiência que movimenta negócios</h2>
          <p>Estrutura industrial, equipe especializada e atendimento empresarial para quem depende de pneus todos os dias.</p>
          <ButtonLink href="#contato">Conheça nossa empresa</ButtonLink>
        </div>
        <img src="/assets/images/tire-retreading.jpg" alt="Processo industrial de reforma de pneus" loading="lazy" />
      </section>
      <ServiceProcess />
      <Timeline />
      <section className="section split" id="tecnologia">
        <img src="/assets/images/quality-control.jpg" alt="Controle de qualidade em ambiente industrial" loading="lazy" />
        <div className="reveal">
          <span className="eyebrow">Tecnologia</span>
          <h2>Tecnologia aplicada ao controle dos pneus</h2>
          <p>Base preparada para QR Code, RFID, histórico do pneu, quilometragem, laudos, fotos, status e rastreamento por área do cliente.</p>
        </div>
      </section>
      <section className="section" id="servicos">
        <SectionHeader eyebrow="Benefícios" title="Soluções para sua frota" text="Controle operacional, previsibilidade e redução de desperdício para operações de transporte." />
        <div className="card-grid">
          {benefits.map((item) => {
            const Icon = item.icon;
            return <article className="feature-card reveal" key={item.title}><Icon size={26} /><h3>{item.title}</h3><p>{item.description}</p></article>;
          })}
        </div>
      </section>
      <section className="section dark" id="sustentabilidade">
        <SectionHeader eyebrow="Sustentabilidade" title="Mais quilômetros. Menos desperdício." text="Reaproveitamento de carcaças, economia operacional e redução do descarte prematuro com indicadores configuráveis." />
        <div className="stats-row">{stats.map((item) => <StatCard key={item.label} {...item} />)}</div>
      </section>
      <section className="section" id="frotas">
        <SectionHeader eyebrow="Segmentos" title="Para quem transporta todos os dias" text="Atendimento pensado para diferentes operações empresariais." />
        <div className="segment-grid">{segments.map((item) => <span key={item}><ChevronRight size={16} />{item}</span>)}</div>
      </section>
      <section className="section band" id="conteudos">
        <SectionHeader eyebrow="Conteúdos" title="Conteúdos para sua operação" text="Estrutura preparada para CMS, SEO e gestão editorial." />
        <div className="card-grid">{blogPosts.map((post) => <article className="blog-card reveal" key={post.slug}><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p></article>)}</div>
      </section>
      <section className="section">
        <SectionHeader eyebrow="Confiança" title="Quem confia na nossa operação" text="Depoimentos modelados para futura gestão via banco de dados." />
        <div className="testimonial-grid">{testimonials.map((item) => <blockquote key={item.company}>“{item.quote}”<cite>{item.name} · {item.company}</cite></blockquote>)}</div>
      </section>
      <section className="section">
        <SectionHeader eyebrow="FAQ" title="Perguntas frequentes" text="Conteúdo semântico preparado para SEO e atendimento comercial." />
        <div className="faq-list">{faqItems.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>
      <section className="section quote-section">
        <div>
          <span className="eyebrow">Orçamento</span>
          <h2>Solicite seu orçamento</h2>
          <p>Informe os dados da sua operação para receber atendimento comercial. A integração com CRM, WhatsApp e e-mail está isolada em serviços mockáveis.</p>
          <div className="assistant-card">
            <img src="/assets/images/virtual-attendant-tire-clean.png" alt="Atendente virtual da SM Pneus" loading="lazy" />
            <div>
              <span className="eyebrow">URA virtual</span>
              <h3>Atendimento guiado para sua frota</h3>
              <p>Fluxo preparado para WhatsApp, e-mail, atendimento comercial e futura URA com triagem por orçamento, coleta, status e suporte.</p>
              <div className="assistant-actions" aria-label="Opções de atendimento virtual">
                <span><Bot size={16} /> Triagem</span>
                <span><Headphones size={16} /> Comercial</span>
                <span><PhoneCall size={16} /> Retorno</span>
              </div>
            </div>
          </div>
        </div>
        <QuoteForm />
      </section>
      <section className="section contact" id="contato">
        <SectionHeader eyebrow="Contato" title="Fale com um especialista" text="Canais preparados para atendimento comercial e futuras integrações." />
        <div className="contact-grid">{contactChannels.map((channel) => {
          const Icon = channel.icon;
          return <article key={channel.label}><Icon size={24} /><strong>{channel.label}</strong><span>{channel.value}</span></article>;
        })}</div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <strong>{companySettings.companyName}</strong>
      <span>{companySettings.address} · {companySettings.city}/{companySettings.state}</span>
      <nav><a href="#inicio">Início</a><a href="#orcamento">Orçamento</a><a href="#contato">Contato</a><a href="/politica-de-privacidade">Privacidade</a><a href="/politica-de-cookies">Cookies</a></nav>
    </footer>
  );
}

function SiteAssistant() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'duvidas' | 'orcamento'>('duvidas');
  const [message, setMessage] = useState('');

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    analyticsService.track('assistant_message_sent', { mode });
    setMessage('');
  }

  return (
    <div className="site-assistant" aria-live="polite">
      {open && (
        <section className="assistant-panel" aria-label="Chat de atendimento">
          <div className="assistant-panel-header">
            <img src="/assets/images/virtual-attendant-tire-clean.png" alt="" aria-hidden="true" />
            <div>
              <strong>Atendimento SM Pneus</strong>
              <span>Dúvidas e orçamento</span>
            </div>
            <button type="button" className="assistant-close" onClick={() => setOpen(false)} aria-label="Fechar chat">
              <X size={18} />
            </button>
          </div>

          <div className="assistant-thread">
            <p className="assistant-message bot">Olá, posso te ajudar com dúvidas sobre reforma de pneus ou iniciar uma solicitação de orçamento.</p>
            <div className="assistant-options" aria-label="Escolha o tipo de atendimento">
              <button type="button" className={mode === 'duvidas' ? 'is-active' : ''} onClick={() => setMode('duvidas')}>Dúvidas</button>
              <button type="button" className={mode === 'orcamento' ? 'is-active' : ''} onClick={() => setMode('orcamento')}>Orçamento</button>
            </div>
            <p className="assistant-message bot">
              {mode === 'orcamento'
                ? 'Informe empresa, cidade, medida e quantidade de pneus. Se preferir, use o formulário completo da página.'
                : 'Pode perguntar sobre reforma, prazos, coleta, inspeção, qualidade ou atendimento para frota.'}
            </p>
          </div>

          <form className="assistant-input" onSubmit={submit}>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={mode === 'orcamento' ? 'Descreva seu orçamento...' : 'Digite sua dúvida...'}
              aria-label="Mensagem para o atendimento"
              required
            />
            <button type="submit" aria-label="Enviar mensagem"><Send size={18} /></button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="assistant-float"
        aria-label={open ? 'Fechar chat de atendimento' : 'Abrir chat de atendimento'}
        aria-expanded={open}
        onClick={() => {
          setOpen(!open);
          analyticsService.track('assistant_clicked');
        }}
      >
        <img src="/assets/images/virtual-attendant-tire-clean.png" alt="" aria-hidden="true" />
      </button>
    </div>
  );
}

function BackToTop() {
  return (
    <a className="back-to-top" href="#inicio" aria-label="Voltar ao topo">
      <ArrowUp size={22} />
    </a>
  );
}

export function App() {
  useEffect(() => {
    analyticsService.track('page_view', { path: window.location.pathname });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <MainSections />
        <section className="section not-found" id="404">
          <CheckCircle2 size={28} />
          <h2>Parece que este caminho saiu da rota.</h2>
          <ButtonLink href="#inicio">Voltar para o início</ButtonLink>
        </section>
      </main>
      <Footer />
      <SiteAssistant />
      <BackToTop />
    </>
  );
}
