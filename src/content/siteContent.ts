import {
  BadgeCheck,
  BarChart3,
  Factory,
  Gauge,
  Leaf,
  MessagesSquare,
  PackageCheck,
  Radar,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
} from 'lucide-react';
import type { ServiceStep, Stat } from '../types';

export const hero = {
  title: 'Mais vida útil para seus pneus. Mais eficiência para sua operação.',
  subtitle:
    'Tecnologia, qualidade e controle para transformar o ciclo de vida dos pneus da sua frota.',
  primaryCta: 'Solicitar orçamento',
  secondaryCta: 'Conheça nossos serviços',
  image: '/assets/images/hero-truck.jpg',
};

export const stats: Stat[] = [
  { value: '+20', label: 'anos de experiência' },
  { value: '+80 mil', label: 'pneus reformados' },
  { value: '+600', label: 'clientes atendidos' },
  { value: '100%', label: 'controle de qualidade' },
];

export const processSteps: ServiceStep[] = [
  { number: '01', title: 'Recebimento', description: 'Entrada controlada com identificação do pneu e da frota.', icon: Truck },
  { number: '02', title: 'Inspeção', description: 'Análise técnica da carcaça antes de qualquer avanço no processo.', icon: Radar },
  { number: '03', title: 'Preparação', description: 'Tratamento da superfície com padrões industriais de execução.', icon: Wrench },
  { number: '04', title: 'Aplicação', description: 'Aplicação da banda conforme medida, uso e perfil operacional.', icon: PackageCheck },
  { number: '05', title: 'Vulcanização', description: 'Processo controlado para aderência, resistência e durabilidade.', icon: Factory },
  { number: '06', title: 'Inspeção final', description: 'Conferência documentada antes da liberação para operação.', icon: BadgeCheck },
  { number: '07', title: 'Liberação', description: 'Entrega com rastreabilidade e orientação para uso da frota.', icon: ShieldCheck },
];

export const benefits = [
  { title: 'Redução de custos', description: 'Melhor aproveitamento das carcaças e menor custo por quilômetro.', icon: BarChart3 },
  { title: 'Maior vida útil', description: 'Ampliação planejada do ciclo de utilização dos pneus.', icon: Gauge },
  { title: 'Controle', description: 'Acompanhamento do processo e histórico preparado para integração.', icon: Radar },
  { title: 'Segurança', description: 'Inspeções técnicas em etapas críticas da reforma.', icon: ShieldCheck },
  { title: 'Sustentabilidade', description: 'Redução do descarte prematuro sem inventar indicadores ambientais.', icon: Leaf },
  { title: 'Gestão', description: 'Informações para tomada de decisão em operações de frota.', icon: Sparkles },
];

export const segments = ['Transportadoras', 'Logística', 'Distribuição', 'Agronegócio', 'Construção', 'Indústria', 'Frotistas', 'Operações especiais'];

export const faqItems = [
  ['Como funciona a reforma de pneus?', 'O pneu passa por recebimento, inspeção, preparação, aplicação da banda, vulcanização, inspeção final e liberação.'],
  ['Quais pneus podem ser reformados?', 'A possibilidade depende do estado da carcaça, medida, histórico de uso e critérios técnicos de segurança.'],
  ['Como funciona a inspeção?', 'A equipe avalia danos, estrutura, medidas e condições da carcaça antes de aprovar o processo.'],
  ['Quanto tempo leva o processo?', 'O prazo varia conforme volume, serviço, agenda produtiva e logística de coleta ou entrega.'],
  ['Atendem transportadoras?', 'Sim. A estrutura foi pensada para pequenas, médias e grandes frotas.'],
  ['Existe coleta?', 'A coleta pode ser combinada conforme região, volume e agenda comercial.'],
  ['Como solicitar orçamento?', 'Pelo formulário de orçamento, WhatsApp, telefone ou e-mail comercial.'],
  ['Como acompanhar o serviço?', 'A base já está preparada para rastreamento futuro por área do cliente e integrações.'],
];

export const blogPosts = [
  { title: 'Como reduzir custo por quilômetro na frota', category: 'Gestão', slug: 'reduzir-custo-por-quilometro', excerpt: 'Boas práticas para ampliar previsibilidade na operação de pneus.' },
  { title: 'Inspeção de carcaça: por que ela importa', category: 'Pneus', slug: 'inspecao-de-carcaca', excerpt: 'O papel da avaliação técnica antes da reforma.' },
  { title: 'Sustentabilidade no ciclo de vida dos pneus', category: 'Sustentabilidade', slug: 'sustentabilidade-pneus', excerpt: 'Mais quilômetros com menor desperdício operacional.' },
];

export const testimonials = [
  { name: 'Cliente referência', company: 'Transportadora parceira', role: 'Gerente de frota', quote: 'A operação ganhou controle, previsibilidade e um processo mais claro para gestão dos pneus.' },
  { name: 'Cliente referência', company: 'Operação logística', role: 'Coordenador operacional', quote: 'O atendimento técnico ajudou nossa equipe a organizar melhor o ciclo de reforma.' },
];

export const contactChannels = [
  { label: 'WhatsApp', value: 'Atendimento comercial', icon: MessagesSquare },
  { label: 'E-mail', value: 'comercial@smpneus.com.br', icon: PackageCheck },
  { label: 'Horário', value: 'Segunda a sexta, horário comercial', icon: Gauge },
];
