document.addEventListener("DOMContentLoaded", () => {

    /* ── References ──────────────────────────────────── */
    const htmlEl           = document.documentElement;
    const header           = document.getElementById("header");
    const mobileBtn        = document.getElementById("mobile_btn");
    const mobileMenu       = document.getElementById("mobile_menu");
    const mobileIcon       = mobileBtn?.querySelector("i");
    const desktopLinks     = document.querySelectorAll("#nav_list a");
    const mobileLinks      = document.querySelectorAll("#mobile_nav_list a");
    const allNavLinks      = document.querySelectorAll("#nav_list a, #mobile_nav_list a");
    const sections         = document.querySelectorAll("main section[id]");
    const revealEls        = document.querySelectorAll(".reveal");
    const langButtons      = document.querySelectorAll(".lang-btn");
    const themeToggle      = document.getElementById("theme-toggle");
    const themeToggleMobile= document.getElementById("theme-toggle-mobile");
    const themeIcon        = document.getElementById("theme-icon");
    const themeIconMobile  = document.getElementById("theme-icon-mobile");
    const metricEls        = document.querySelectorAll(".metric-value[data-target]");
    const diagTabs         = document.querySelectorAll(".diag-tab");
    const diagPanels       = document.querySelectorAll(".diag-panel");


    /* ══════════════════════════════════════════════════
       DARK MODE
       Priority: 1. localStorage  2. OS preference  3. light
    ══════════════════════════════════════════════════ */
    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    const getSaved = () => { try { return localStorage.getItem("mbsTheme"); } catch { return null; } };

    const applyTheme = (theme) => {
        htmlEl.setAttribute("data-theme", theme);
        const isDark = theme === "dark";
        const add    = isDark ? "fa-sun"  : "fa-moon";
        const remove = isDark ? "fa-moon" : "fa-sun";
        [themeIcon, themeIconMobile].forEach(el => {
            if (!el) return;
            el.classList.remove(remove);
            el.classList.add(add);
        });
        try { localStorage.setItem("mbsTheme", theme); } catch {}
    };

    const toggleTheme = () => {
        const current = htmlEl.getAttribute("data-theme") || "light";
        applyTheme(current === "dark" ? "light" : "dark");
    };

    // Respect OS changes if user has no saved preference
    window.matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", e => { if (!getSaved()) applyTheme(e.matches ? "dark" : "light"); });

    themeToggle?.addEventListener("click", toggleTheme);
    themeToggleMobile?.addEventListener("click", toggleTheme);

    // Init: light by default as required, but respect saved/OS if present
    applyTheme(getSaved() || "light");


    /* ══════════════════════════════════════════════════
       TRANSLATIONS
    ══════════════════════════════════════════════════ */
    const T = {
        en: {
            brand_subtitle: "Consulting · Revenue · Transformation",
            nav_home:       "Home",
            nav_results:    "Results",
            nav_expertise:  "Expertise",
            nav_diagnostic: "Diagnostic",
            nav_approach:   "Approach",
            nav_contact:    "Contact",
            nav_cta:        "Book a Discovery Call",

            hero_eyebrow:       "Specialist Consulting Firm · Europe & the Americas",
            hero_title:         "Growth stalls when execution falls short. We build the engine that keeps it running.",
            hero_description:   "MBS Advisory is a specialist consulting firm partnering with CEOs, CFOs, and senior leadership teams to drive revenue growth, transform financial operations, and build the execution infrastructure that high-performing organisations depend on.",
            hero_btn_primary:   "Book a Discovery Call",
            hero_btn_secondary: "See Our Work",
            trust_1_title: "Revenue-Led",
            trust_1_text:  "Commercial strategy aligned to growth targets, not activity metrics",
            trust_2_title: "Finance & Ops",
            trust_2_text:  "End-to-end visibility across your numbers and processes",
            trust_3_title: "Real Execution",
            trust_3_text:  "We build and implement — not just advise and leave",
            floating_1_label: "Sales & Revenue Advisory",
            floating_1_text:  "Structured growth, not guesswork",
            floating_2_label: "Automation & Real-Time Dashboards",
            floating_2_text:  "Your business, visible in minutes",

            bar_1: "Revenue Growth",
            bar_2: "Finance Transformation",
            bar_3: "Executive Advisory",
            bar_4: "Intelligent Automation",
            bar_5: "Real-Time Dashboards",
            bar_6: "Operational Excellence",

            results_tag:    "PROVEN RESULTS",
            results_title:  "The numbers behind our engagements",
            results_subtitle: "Quantified outcomes from client engagements across Europe and the Americas, delivered by our specialist team.",
            metric_1:       "Reduction in reporting cycle time",
            metric_1_ctx:   "Finance transformation · Automotive sector · EU",
            metric_2:       "Hours saved annually through automation",
            metric_2_ctx:   "RPA deployment · Multi-entity European operations",
            metric_3:       "European jurisdictions managed compliantly",
            metric_3_ctx:   "VAT & tax compliance · Zero material audit findings",
            metric_4:       "Senior leaders receiving real-time dashboards",
            metric_4_ctx:   "Power BI deployment · Replaced manual reporting cycles",

            case_1_sector:  "Finance Transformation · Automotive · European SSC",
            case_1_title:   "From 3-day manual reporting cycles to real-time executive intelligence",
            case_before:    "Before",
            case_after:     "After",
            case_1_before:  "Finance teams across multiple European entities spending 3+ days per month manually compiling reports — no consistent format, no real-time visibility, and no remaining capacity for analysis.",
            case_1_after:   "MBS Advisory designed and deployed automated Power BI dashboards across all entities. Weekly performance data now reaches 70+ senior leaders in minutes — zero manual compilation required.",
            case_1_result:  "~40% reduction in reporting cycle · 70+ leaders served weekly · Entire manual process eliminated",
            case_2_sector:  "Intelligent Automation · Finance Operations · 15+ Entities",
            case_2_title:   "4,000+ hours of manual finance work eliminated in a single programme",
            case_2_before:  "Core finance processes — R2R, P2P, and OTC — reliant on manual data entry, reconciliations, and cross-system transfers. Analyst capacity consumed entirely by low-value tasks with no strategic output.",
            case_2_after:   "Our team architected and deployed RPA bots and Power Automate flows across the highest-volume processes, fully integrated with SAP S/4HANA — with complete audit trail and governance controls throughout.",
            case_2_result:  "4,000+ hours recaptured annually · Teams redeployed to high-value analysis · Full audit compliance maintained",
            case_3_sector:  "VAT & Tax Compliance · 30+ European Jurisdictions",
            case_3_title:   "Audit-ready tax compliance at scale — zero material findings",
            case_3_before:  "Multinational VAT compliance managed manually across 30+ EU jurisdictions — inconsistent validation logic, high error exposure, and slow response times when audit queries arose.",
            case_3_after:   "MBS Advisory built jurisdiction-specific automated validation tools and applied Lean Six Sigma methodology to submission accuracy. Full audit documentation standardised and maintained across all entities.",
            case_3_result:  "Zero material audit findings across all jurisdictions · Significant reduction in compliance review time",

            expertise_tag:  "PRACTICE AREAS",
            expertise_title:"Six areas where MBS Advisory delivers measurable impact for your business",
            expertise_description: "We bring a team of specialists — not generalists — to each engagement, delivering cross-functional transformation that combines commercial strategy, financial intelligence, and operational execution.",
            expertise_card_1_title: "Sales & Revenue Growth",
            expertise_card_1_text:  "Build the commercial discipline, pipeline visibility, and decision frameworks that convert strategy into consistent revenue. We redesign how your team sells, tracks, and wins.",
            expertise_card_2_title: "Intelligent Automation",
            expertise_card_2_text:  "Recapture thousands of hours from manual, low-value work. We design and deploy automation solutions that scale, integrate with your systems, and deliver immediate ROI.",
            expertise_card_3_title: "Executive Dashboards & Analytics",
            expertise_card_3_text:  "Give your leadership team real-time visibility over the metrics that matter. We build high-impact dashboards that replace report compilation and accelerate decisions.",
            expertise_card_4_title: "Process Redesign & Lean",
            expertise_card_4_text:  "Identify where your operations lose time, money, and quality — then redesign them. We apply Lean Six Sigma methodology to produce durable, measurable process improvements.",
            expertise_card_5_title: "Governance & Internal Controls",
            expertise_card_5_text:  "Define clear ownership, accountability, and reporting structures that make your organisation faster, more transparent, and audit-ready at every level.",
            expertise_card_6_title: "Transformation Programme Management",
            expertise_card_6_text:  "Complex change requires experienced leadership. We manage the full transformation lifecycle — from diagnosis to adoption — keeping stakeholders aligned and results on track.",

            diagnostic_tag:  "BUSINESS DIAGNOSTIC",
            diagnostic_title:"Which challenge is limiting your organisation right now?",
            diagnostic_description: "Select the area where you want greater impact. Our team will show you exactly how MBS Advisory would address it — with proven frameworks and real results.",
            diag_tab_1: "Finance & Control",
            diag_tab_2: "Sales & Revenue",
            diag_tab_3: "Governance",
            diag_tab_4: "People & HR",
            diag_tab_5: "Logistics",
            diag_tab_6: "Service & Ops",
            diag_tab_7: "Customer Experience",
            metric_src: "From a verified client engagement",

            diag_finance_title: "Are your numbers driving decisions — or just documenting the past?",
            diag_finance_text:  "Most organisations generate financial reports. Fewer generate financial intelligence. MBS Advisory redesigns your reporting architecture, fortifies budget controls, and deploys executive dashboards that transform finance from a back-office function into your most powerful strategic asset.",
            diag_finance_b1: "Budget control and cost management frameworks",
            diag_finance_b2: "Real-time executive financial dashboards",
            diag_finance_b3: "Cash flow visibility and variance analysis",
            diag_finance_b4: "SOX, IFRS, and regulatory compliance",
            diag_cta: "Talk to Our Finance Team",
            diag_metric_finance:   "Reporting cycle reduction",
            diag_metric_finance_2: "Leadership KPI visibility",

            diag_sales_title: "Is your pipeline reflecting reality — or wishful thinking?",
            diag_sales_text:  "Revenue growth is a management problem before it is a sales problem. MBS Advisory brings structured commercial discipline: rigorous pipeline management, evidence-based forecasting, and the performance routines that make high-performing teams consistently outperform.",
            diag_sales_b1: "Pipeline accuracy and revenue forecasting",
            diag_sales_b2: "Commercial performance frameworks and routines",
            diag_sales_b3: "Sales team structure and incentive alignment",
            diag_sales_b4: "Win/loss analysis and conversion improvement",
            diag_cta_sales: "Talk to Our Sales Team",
            diag_metric_sales:   "Revenue improvement",
            diag_metric_sales_2: "Pipeline visibility",

            diag_gov_title: "Can every senior leader answer: who owns this, and what happens next?",
            diag_gov_text:  "Ambiguity is expensive. MBS Advisory designs governance frameworks that eliminate confusion, accelerate decision-making, and create accountability across every function. The result: fewer fires, faster execution, and a leadership team that operates with confidence.",
            diag_gov_b1: "Clear process ownership and RACI design",
            diag_gov_b2: "Decision-making authority and escalation frameworks",
            diag_gov_b3: "Internal controls and compliance architecture",
            diag_gov_b4: "Reporting cadence and governance routines",
            diag_cta_gov: "Talk to Our Governance Team",
            diag_metric_gov:   "Process escalations",
            diag_metric_gov_2: "Process ownership defined",

            diag_hr_title: "Are your people processes enabling high performance — or quietly draining it?",
            diag_hr_text:  "The most expensive inefficiency in most businesses is time: absorbed by unclear processes, manual administration, and the friction that slows everything down. MBS Advisory structures people operations so your team focuses on what creates value.",
            diag_hr_b1: "Performance management design and tracking",
            diag_hr_b2: "Onboarding and role standardisation",
            diag_hr_b3: "People analytics and HR reporting",
            diag_hr_b4: "Workload design and team efficiency",
            diag_cta_hr: "Talk to Our People Team",
            diag_metric_hr:   "Admin time per person",
            diag_metric_hr_2: "Team productivity",

            diag_log_title: "Is your supply chain a competitive advantage — or a cost centre you manage reactively?",
            diag_log_text:  "Logistics inefficiencies compound quietly and cost disproportionately. MBS Advisory maps your end-to-end flow, surfaces hidden waste, and redesigns your supply chain to deliver speed, cost control, and total visibility — applying Lean principles with operational precision.",
            diag_log_b1: "End-to-end supply chain mapping and redesign",
            diag_log_b2: "Lead time reduction and cost optimisation",
            diag_log_b3: "Inventory management and flow design",
            diag_log_b4: "Logistics performance KPIs and dashboards",
            diag_cta_log: "Talk to Our Operations Team",
            diag_metric_log:   "Logistics cost",
            diag_metric_log_2: "Lead time",

            diag_svc_title: "Are your service operations scalable — or straining under growth?",
            diag_svc_text:  "Scaling a business exposes every operational weakness. MBS Advisory redesigns your service delivery model, eliminates the manual work that should not exist, and builds the management systems that make consistent quality possible — at any volume.",
            diag_svc_b1: "Service delivery model redesign",
            diag_svc_b2: "Workflow automation and digital integration",
            diag_svc_b3: "Operational KPI frameworks and reporting",
            diag_svc_b4: "Standard operating procedures and quality control",
            diag_cta_svc: "Talk to Our Operations Team",
            diag_metric_svc:   "Manual task volume",
            diag_metric_svc_2: "Delivery speed",

            diag_cx_title: "Is your customer experience generating loyalty — or churning it quietly?",
            diag_cx_text:  "Every touchpoint is either building your brand or eroding it. MBS Advisory maps your customer journey in full, identifies where friction turns into attrition, and redesigns interactions to create the loyalty that drives referrals, retention, and revenue.",
            diag_cx_b1: "End-to-end customer journey mapping",
            diag_cx_b2: "Friction analysis and touchpoint redesign",
            diag_cx_b3: "NPS, CSAT, and satisfaction framework design",
            diag_cx_b4: "Retention, loyalty, and re-engagement programmes",
            diag_cta_cx: "Talk to Our CX Team",
            diag_metric_cx:   "Customer satisfaction",
            diag_metric_cx_2: "Churn rate",

            approach_tag:   "OUR METHODOLOGY",
            approach_title: "Four phases. Delivered with precision. Designed to last.",
            step_1_title: "Diagnose",
            step_1_text:  "We start by understanding your business in depth — its revenue model, financial structure, operational constraints, and where performance is leaving value behind.",
            step_2_title: "Prioritise",
            step_2_text:  "Not everything needs fixing at once. We identify your highest-value opportunities and build a sequenced plan that creates early wins while developing long-term capability.",
            step_3_title: "Implement",
            step_3_text:  "We deliver alongside your team — not in isolation. Every solution is designed with adoption in mind, ensuring your people own the result from day one.",
            step_4_title: "Sustain",
            step_4_text:  "We embed the routines, dashboards, and governance structures that make results permanent — so performance gains compound, not fade.",
            approach_panel_label: "Our Advisory Philosophy",
            approach_panel_title: "Elegant strategy. Serious execution.",
            approach_panel_text:  "MBS Advisory combines senior advisory perspective with hands-on implementation discipline. We do not hand off recommendations — we see them through to operational reality.",

            insights_tag:   "THE MBS ADVANTAGE",
            insights_title: "Four reasons senior leaders choose MBS Advisory over a generalist firm",
            result_1_title: "A Specialist Team, Not a Solo Consultant",
            result_1_text:  "MBS Advisory brings a curated network of specialists across finance, commercial strategy, operations, and technology — giving every client access to the right expertise at every stage of the engagement.",
            result_2_title: "Commercial Rigour in Every Engagement",
            result_2_text:  "We approach every project through a commercial lens — asking not just what is efficient, but what creates measurable value for your customers, your team, and your bottom line.",
            result_3_title: "Cross-Functional Integration",
            result_3_text:  "We connect the dots between sales, finance, operations, and technology — solving root causes instead of isolated symptoms, and building solutions that hold together under real pressure.",
            result_4_title: "Implementation as a Core Commitment",
            result_4_text:  "Our mandate does not end at the slide deck. We remain engaged through implementation, ensuring every recommendation becomes a measurable, sustainable operational improvement.",

            contact_tag:   "START THE CONVERSATION",
            contact_title: "Ready to turn ambition into execution?",
            contact_description: "Whether you need to grow revenue, control costs, automate operations, or build better executive visibility — MBS Advisory has the expertise, the team, and the track record to make it happen.",
            contact_point_1: "Specialist teams across finance, commercial, and operations",
            contact_point_2: "Engagements structured for results, not just recommendations",
            contact_point_3: "Proven track record with leaders across Europe and the Americas",
            micro_cta_title: "Start with a complimentary 30-minute diagnostic",
            micro_cta_text:  "No obligation. In 30 minutes, we will identify your single highest-value opportunity.",
            form_name_label:    "Full Name",
            form_email_label:   "Business Email",
            form_company_label: "Company",
            form_message_label: "Tell Us Your Challenge",
            form_name:    "Your full name",
            form_email:   "Your business email",
            form_company: "Your company name",
            form_message: "Describe your current challenge, goal, or the area where you want greater impact",
            form_button:  "Request Your Consultation",
            form_note:    "We respond within one business day. All conversations are strictly confidential.",

            footer_text_1: "Specialist Consulting · Revenue · Finance · Operations · Transformation",
            footer_text_2: "© 2026 MBS Advisory. All rights reserved.",
            footer_text_3: "Elegant strategy. Serious execution."
        },

        pt: {
            brand_subtitle: "Consultoria · Crescimento · Transformação",
            nav_home:       "Início",
            nav_results:    "Resultados",
            nav_expertise:  "Especialidades",
            nav_diagnostic: "Diagnóstico",
            nav_approach:   "Abordagem",
            nav_contact:    "Contacto",
            nav_cta:        "Agendar Consulta",

            hero_eyebrow:       "Consultora Especialista · Europa e Américas",
            hero_title:         "O crescimento desacelera quando a execução fica para trás. Nós construímos o motor que o mantém a funcionar.",
            hero_description:   "A MBS Advisory é uma consultora especialista que trabalha com CEOs, CFOs e equipas de liderança sénior para impulsionar o crescimento de receita, transformar operações financeiras e construir a infraestrutura de gestão de que as organizações de alta performance dependem.",
            hero_btn_primary:   "Agendar Consulta",
            hero_btn_secondary: "Ver o Nosso Trabalho",
            trust_1_title: "Foco na Receita",
            trust_1_text:  "Estratégia comercial alinhada a objetivos de crescimento, não a métricas de atividade",
            trust_2_title: "Finanças & Operações",
            trust_2_text:  "Visibilidade completa sobre os seus números e processos",
            trust_3_title: "Execução Real",
            trust_3_text:  "Construímos e implementamos — não apenas aconselhamos e partimos",
            floating_1_label: "Consultoria em Vendas e Receita",
            floating_1_text:  "Crescimento estruturado, não intuição",
            floating_2_label: "Automação e Dashboards em Tempo Real",
            floating_2_text:  "O seu negócio visível em minutos",

            bar_1: "Crescimento de Receita",
            bar_2: "Transformação Financeira",
            bar_3: "Consultoria Executiva",
            bar_4: "Automação Inteligente",
            bar_5: "Dashboards em Tempo Real",
            bar_6: "Excelência Operacional",

            results_tag:    "RESULTADOS COMPROVADOS",
            results_title:  "Os números por detrás dos nossos projetos",
            results_subtitle: "Resultados quantificados de projetos com clientes na Europa e nas Américas, entregues pela nossa equipa de especialistas.",
            metric_1:     "Redução no ciclo de reporte",
            metric_1_ctx: "Transformação financeira · Setor automóvel · UE",
            metric_2:     "Horas poupadas anualmente com automação",
            metric_2_ctx: "Implementação RPA · Operações europeias multi-entidade",
            metric_3:     "Jurisdições europeias geridas com compliance",
            metric_3_ctx: "Compliance IVA e fiscal · Zero ocorrências materiais em auditoria",
            metric_4:     "Líderes sénior com dashboards em tempo real",
            metric_4_ctx: "Implementação Power BI · Ciclos de reporte manual substituídos",

            case_1_sector:  "Transformação Financeira · Automóvel · SSC Europeu",
            case_1_title:   "De ciclos de reporte manual de 3 dias para inteligência executiva em tempo real",
            case_before:    "Antes",
            case_after:     "Depois",
            case_1_before:  "Equipas financeiras em múltiplas entidades europeias a gastar 3+ dias mensais na compilação manual de relatórios — sem formato consistente, sem visibilidade em tempo real e sem capacidade restante para análise.",
            case_1_after:   "A MBS Advisory projetou e implementou dashboards Power BI automatizados em todas as entidades. Os dados de performance semanais chegam agora a 70+ líderes sénior em minutos — sem qualquer compilação manual.",
            case_1_result:  "~40% de redução no ciclo de reporte · 70+ líderes servidos semanalmente · Todo o processo manual eliminado",
            case_2_sector:  "Automação Inteligente · Operações Financeiras · 15+ Entidades",
            case_2_title:   "4.000+ horas de trabalho financeiro manual eliminadas num único programa",
            case_2_before:  "Processos financeiros centrais — R2R, P2P e OTC — dependentes de entrada manual de dados, reconciliações e transferências entre sistemas. Capacidade dos analistas inteiramente consumida por tarefas de baixo valor.",
            case_2_after:   "A nossa equipa projetou e implementou bots RPA e fluxos Power Automate nos processos de maior volume, totalmente integrados com SAP S/4HANA — com trilha de auditoria completa e controlos de governança.",
            case_2_result:  "4.000+ horas recuperadas anualmente · Equipas reafetadas para análise de valor · Compliance de auditoria mantido",
            case_3_sector:  "Compliance IVA e Fiscal · 30+ Jurisdições Europeias",
            case_3_title:   "Compliance fiscal pronto para auditoria à escala — zero ocorrências materiais",
            case_3_before:  "Compliance IVA multinacional gerido manualmente em 30+ jurisdições da UE — lógica de validação inconsistente, exposição elevada a erros e tempos de resposta lentos quando surgiam questões em auditoria.",
            case_3_after:   "A MBS Advisory desenvolveu ferramentas de validação automatizadas por jurisdição e aplicou metodologia Lean Six Sigma à precisão das submissões. Documentação de auditoria padronizada e mantida em todas as entidades.",
            case_3_result:  "Zero ocorrências materiais em todas as jurisdições · Redução significativa no tempo de revisão de compliance",

            expertise_tag:  "ÁREAS DE PRÁTICA",
            expertise_title:"Seis áreas onde a MBS Advisory cria impacto mensurável para o seu negócio",
            expertise_description: "Reunimos uma equipa de especialistas — não generalistas — em cada projeto, entregando transformação multifuncional que combina estratégia comercial, inteligência financeira e execução operacional.",
            expertise_card_1_title: "Crescimento de Vendas e Receita",
            expertise_card_1_text:  "Construa a disciplina comercial, visibilidade do pipeline e frameworks de decisão que convertem estratégia em receita consistente. Redesenhamos a forma como a sua equipa vende, acompanha e ganha.",
            expertise_card_2_title: "Automação Inteligente",
            expertise_card_2_text:  "Recupere milhares de horas de trabalho manual e de baixo valor. Projetamos e implementamos soluções de automação que escalam, se integram com os seus sistemas e entregam ROI imediato.",
            expertise_card_3_title: "Dashboards Executivos e Analítica",
            expertise_card_3_text:  "Dê à sua liderança visibilidade em tempo real sobre as métricas que realmente importam. Construímos dashboards de alto impacto que substituem a compilação de relatórios e aceleram decisões.",
            expertise_card_4_title: "Redesenho de Processos e Lean",
            expertise_card_4_text:  "Identifique onde as suas operações perdem tempo, dinheiro e qualidade — e redesenhe-as. Aplicamos metodologia Lean Six Sigma para produzir melhorias de processo duradouras e mensuráveis.",
            expertise_card_5_title: "Governança e Controlos Internos",
            expertise_card_5_text:  "Defina ownership, accountability e estruturas de reporte claras que tornam a sua organização mais rápida, transparente e preparada para auditoria em todos os níveis.",
            expertise_card_6_title: "Gestão de Programas de Transformação",
            expertise_card_6_text:  "Mudanças complexas exigem liderança experiente. Gerimos o ciclo completo de transformação — do diagnóstico à adoção — mantendo stakeholders alinhados e resultados no caminho certo.",

            diagnostic_tag:  "DIAGNÓSTICO DE NEGÓCIO",
            diagnostic_title:"Qual desafio está a limitar a sua organização agora mesmo?",
            diagnostic_description: "Selecione a área onde quer maior impacto. A nossa equipa mostrará exatamente como a MBS Advisory atuaria — com frameworks comprovados e resultados reais.",
            diag_tab_1: "Finanças & Controlo",
            diag_tab_2: "Vendas & Receita",
            diag_tab_3: "Governança",
            diag_tab_4: "Pessoas & RH",
            diag_tab_5: "Logística",
            diag_tab_6: "Serviços & Ops",
            diag_tab_7: "Experiência do Cliente",
            metric_src: "De um projeto verificado com cliente",

            diag_finance_title: "Os seus números estão a guiar decisões — ou apenas a documentar o passado?",
            diag_finance_text:  "A maioria das organizações produz relatórios financeiros. Poucas produzem inteligência financeira. A MBS Advisory redesenha a arquitetura de reporte, reforça os controlos orçamentais e implementa dashboards executivos que transformam as finanças de uma função de back-office no seu ativo estratégico mais poderoso.",
            diag_finance_b1: "Frameworks de controlo orçamental e gestão de custos",
            diag_finance_b2: "Dashboards financeiros executivos em tempo real",
            diag_finance_b3: "Visibilidade de cash flow e análise de variações",
            diag_finance_b4: "Compliance SOX, IFRS e regulatório",
            diag_cta: "Fale com a Nossa Equipa Financeira",
            diag_metric_finance:   "Redução no ciclo de reporte",
            diag_metric_finance_2: "Visibilidade de KPIs da liderança",

            diag_sales_title: "O seu pipeline reflete a realidade — ou o pensamento desejoso?",
            diag_sales_text:  "O crescimento de receita é um problema de gestão antes de ser um problema de vendas. A MBS Advisory traz disciplina comercial estruturada: gestão rigorosa do pipeline, previsão baseada em evidências e as rotinas de performance que fazem as equipas de alta performance superarem consistentemente.",
            diag_sales_b1: "Precisão do pipeline e previsão de receita",
            diag_sales_b2: "Frameworks de performance comercial e rotinas",
            diag_sales_b3: "Estrutura da equipa de vendas e alinhamento de incentivos",
            diag_sales_b4: "Análise win/loss e melhoria de conversão",
            diag_cta_sales: "Fale com a Nossa Equipa Comercial",
            diag_metric_sales:   "Melhoria de receita",
            diag_metric_sales_2: "Visibilidade do pipeline",

            diag_gov_title: "Cada líder sénior consegue responder: quem é responsável por isto e qual é o próximo passo?",
            diag_gov_text:  "A ambiguidade é cara. A MBS Advisory desenha frameworks de governança que eliminam a confusão, aceleram a tomada de decisão e criam accountability em todas as funções. O resultado: menos problemas, execução mais rápida e uma equipa de liderança que age com confiança.",
            diag_gov_b1: "Ownership de processos claro e design RACI",
            diag_gov_b2: "Autoridade de decisão e frameworks de escalação",
            diag_gov_b3: "Arquitetura de controlos internos e compliance",
            diag_gov_b4: "Cadência de reporte e rotinas de governança",
            diag_cta_gov: "Fale com a Nossa Equipa de Governança",
            diag_metric_gov:   "Escalações de processo",
            diag_metric_gov_2: "Ownership de processos definido",

            diag_hr_title: "Os seus processos de pessoas estão a impulsionar a alta performance — ou a drenar silenciosamente?",
            diag_hr_text:  "A ineficiência mais cara na maioria dos negócios é o tempo: absorvido por processos pouco claros, administração manual e a fricção que abranda tudo. A MBS Advisory estrutura as operações de pessoas para que a sua equipa se foque no que cria valor.",
            diag_hr_b1: "Design e acompanhamento de gestão de performance",
            diag_hr_b2: "Onboarding e padronização de funções",
            diag_hr_b3: "Analítica de pessoas e reporting de RH",
            diag_hr_b4: "Design de carga de trabalho e eficiência da equipa",
            diag_cta_hr: "Fale com a Nossa Equipa de Pessoas",
            diag_metric_hr:   "Tempo administrativo por pessoa",
            diag_metric_hr_2: "Produtividade da equipa",

            diag_log_title: "A sua cadeia de abastecimento é uma vantagem competitiva — ou um centro de custo gerido reativamente?",
            diag_log_text:  "As ineficiências logísticas acumulam-se silenciosamente e custam de forma desproporcional. A MBS Advisory mapeia o fluxo end-to-end, identifica desperdícios ocultos e redesenha a cadeia de abastecimento para entregar velocidade, controlo de custos e visibilidade total — aplicando princípios Lean com precisão operacional.",
            diag_log_b1: "Mapeamento e redesenho end-to-end da cadeia de abastecimento",
            diag_log_b2: "Redução de lead time e otimização de custos",
            diag_log_b3: "Gestão de inventário e design de fluxo",
            diag_log_b4: "KPIs de performance logística e dashboards",
            diag_cta_log: "Fale com a Nossa Equipa de Operações",
            diag_metric_log:   "Custo logístico",
            diag_metric_log_2: "Lead time",

            diag_svc_title: "As suas operações de serviço são escaláveis — ou estão a ceder sob o crescimento?",
            diag_svc_text:  "Escalar um negócio expõe todas as fraquezas operacionais. A MBS Advisory redesenha o seu modelo de entrega de serviços, elimina o trabalho manual que não deveria existir e constrói os sistemas de gestão que tornam a qualidade consistente possível — a qualquer volume.",
            diag_svc_b1: "Redesenho do modelo de entrega de serviços",
            diag_svc_b2: "Automação de fluxos de trabalho e integração digital",
            diag_svc_b3: "Frameworks de KPIs operacionais e reporting",
            diag_svc_b4: "Procedimentos operacionais padrão e controlo de qualidade",
            diag_cta_svc: "Fale com a Nossa Equipa de Operações",
            diag_metric_svc:   "Volume de tarefas manuais",
            diag_metric_svc_2: "Velocidade de entrega",

            diag_cx_title: "A sua experiência de cliente está a gerar fidelização — ou a perdê-la silenciosamente?",
            diag_cx_text:  "Cada touchpoint está ou a construir a sua marca ou a erodí-la. A MBS Advisory mapeia a jornada do cliente na íntegra, identifica onde a fricção se transforma em abandono e redesenha as interações para criar a fidelização que impulsiona referências, retenção e receita.",
            diag_cx_b1: "Mapeamento end-to-end da jornada do cliente",
            diag_cx_b2: "Análise de fricção e redesenho de touchpoints",
            diag_cx_b3: "Design de frameworks de NPS, CSAT e satisfação",
            diag_cx_b4: "Programas de retenção, fidelização e reativação",
            diag_cta_cx: "Fale com a Nossa Equipa de CX",
            diag_metric_cx:   "Satisfação do cliente",
            diag_metric_cx_2: "Taxa de churn",

            approach_tag:   "A NOSSA METODOLOGIA",
            approach_title: "Quatro fases. Entregues com precisão. Desenhadas para durar.",
            step_1_title: "Diagnosticar",
            step_1_text:  "Começamos por compreender o seu negócio em profundidade — o seu modelo de receita, estrutura financeira, constrangimentos operacionais e onde a performance está a deixar valor para trás.",
            step_2_title: "Priorizar",
            step_2_text:  "Nem tudo precisa de ser corrigido de uma vez. Identificamos as suas oportunidades de maior valor e construímos um plano sequenciado que cria vitórias rápidas enquanto desenvolve capacidade a longo prazo.",
            step_3_title: "Implementar",
            step_3_text:  "Entregamos ao lado da sua equipa — não de forma isolada. Cada solução é desenhada com a adoção em mente, garantindo que as suas pessoas assumem o resultado desde o primeiro dia.",
            step_4_title: "Consolidar",
            step_4_text:  "Incorporamos as rotinas, dashboards e estruturas de governança que tornam os resultados permanentes — para que os ganhos de performance se acumulem em vez de desaparecerem.",
            approach_panel_label: "A Nossa Filosofia de Consultoria",
            approach_panel_title: "Estratégia elegante. Execução séria.",
            approach_panel_text:  "A MBS Advisory combina perspetiva consultiva sénior com disciplina de implementação prática. Não entregamos recomendações — acompanhamos até à realidade operacional.",

            insights_tag:   "A VANTAGEM MBS",
            insights_title: "Quatro razões pelas quais líderes sénior escolhem a MBS Advisory em vez de uma consultora generalista",
            result_1_title: "Uma Equipa de Especialistas, Não um Consultor Isolado",
            result_1_text:  "A MBS Advisory reúne uma rede curada de especialistas em finanças, estratégia comercial, operações e tecnologia — dando a cada cliente acesso à expertise certa em cada etapa do projeto.",
            result_2_title: "Rigor Comercial em Cada Projeto",
            result_2_text:  "Abordamos cada projeto com uma lente comercial — questionando não apenas o que é eficiente, mas o que cria valor mensurável para os seus clientes, a sua equipa e o seu resultado final.",
            result_3_title: "Integração Multifuncional",
            result_3_text:  "Conectamos os pontos entre vendas, finanças, operações e tecnologia — resolvendo causas raiz em vez de sintomas isolados, e construindo soluções que resistem sob pressão real.",
            result_4_title: "Implementação como Compromisso Central",
            result_4_text:  "O nosso mandato não termina na apresentação. Mantemo-nos envolvidos durante a implementação, garantindo que cada recomendação se transforma numa melhoria operacional mensurável e sustentável.",

            contact_tag:   "INICIAR A CONVERSA",
            contact_title: "Pronto para transformar ambição em execução?",
            contact_description: "Seja para crescer a receita, controlar custos, automatizar operações ou construir melhor visibilidade executiva — a MBS Advisory tem a expertise, a equipa e o historial para o tornar realidade.",
            contact_point_1: "Equipas especialistas em finanças, comercial e operações",
            contact_point_2: "Projetos estruturados para resultados, não apenas recomendações",
            contact_point_3: "Historial comprovado com líderes na Europa e nas Américas",
            micro_cta_title: "Comece com um diagnóstico gratuito de 30 minutos",
            micro_cta_text:  "Sem compromisso. Em 30 minutos, identificamos a sua oportunidade de maior valor.",
            form_name_label:    "Nome Completo",
            form_email_label:   "E-mail Profissional",
            form_company_label: "Empresa",
            form_message_label: "Conte-nos o Seu Desafio",
            form_name:    "O seu nome completo",
            form_email:   "O seu e-mail profissional",
            form_company: "Nome da sua empresa",
            form_message: "Descreva o seu desafio atual, objetivo ou a área onde quer maior impacto",
            form_button:  "Solicitar a Sua Consulta",
            form_note:    "Respondemos num prazo de um dia útil. Todas as conversas são estritamente confidenciais.",

            footer_text_1: "Consultoria Especialista · Receita · Finanças · Operações · Transformação",
            footer_text_2: "© 2026 MBS Advisory. Todos os direitos reservados.",
            footer_text_3: "Estratégia elegante. Execução séria."
        }
    };

    const applyTranslations = (lang) => {
        const dict = T[lang] || T.en;
        htmlEl.lang = lang;

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const v = dict[el.dataset.i18n];
            if (v !== undefined) el.textContent = v;
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const v = dict[el.dataset.i18nPlaceholder];
            if (v !== undefined) el.setAttribute("placeholder", v);
        });

        langButtons.forEach(btn =>
            btn.classList.toggle("active", btn.dataset.lang === lang)
        );

        try { localStorage.setItem("mbsLang", lang); } catch {}
    };

    langButtons.forEach(btn =>
        btn.addEventListener("click", () => applyTranslations(btn.dataset.lang))
    );


    /* ══════════════════════════════════════════════════
       ANIMATED COUNTERS
    ══════════════════════════════════════════════════ */
    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

    const animateCounter = (el) => {
        const target   = parseInt(el.dataset.target, 10);
        const suffix   = el.dataset.suffix || "";
        const prefix   = el.dataset.prefix || "";
        const reduced  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const duration = 1800;

        if (reduced) { el.textContent = prefix + target.toLocaleString() + suffix; return; }

        const start = performance.now();
        const tick  = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const value    = Math.round(easeOutQuart(progress) * target);
            el.textContent = prefix + value.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const resultsSection = document.getElementById("results");
    let countersRun = false;

    if (resultsSection && "IntersectionObserver" in window) {
        const co = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !countersRun) {
                countersRun = true;
                metricEls.forEach(el => animateCounter(el));
                co.disconnect();
            }
        }, { threshold: 0.25 });
        co.observe(resultsSection);
    } else {
        metricEls.forEach(el => animateCounter(el));
    }


    /* ══════════════════════════════════════════════════
       DIAGNOSTIC TABS
    ══════════════════════════════════════════════════ */
    diagTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.target;
            diagTabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
            diagPanels.forEach(p => p.classList.remove("active"));
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            const panel = document.getElementById(target);
            if (panel) panel.classList.add("active");
        });
    });


    /* ══════════════════════════════════════════════════
       MOBILE MENU
    ══════════════════════════════════════════════════ */
    const openMenu = () => {
        if (!mobileMenu || !mobileBtn) return;
        mobileMenu.classList.add("active");
        mobileBtn.setAttribute("aria-expanded", "true");
        mobileBtn.setAttribute("aria-label", "Close menu");
        mobileIcon?.classList.replace("fa-bars", "fa-xmark");
        document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
        if (!mobileMenu || !mobileBtn) return;
        mobileMenu.classList.remove("active");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileBtn.setAttribute("aria-label", "Open menu");
        mobileIcon?.classList.replace("fa-xmark", "fa-bars");
        document.body.classList.remove("menu-open");
    };

    mobileBtn?.addEventListener("click", () =>
        mobileMenu?.classList.contains("active") ? closeMenu() : openMenu()
    );
    allNavLinks.forEach(l => l.addEventListener("click", closeMenu));
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && mobileMenu?.classList.contains("active")) closeMenu();
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 1170) closeMenu(); });


    /* ══════════════════════════════════════════════════
       HEADER SCROLL
    ══════════════════════════════════════════════════ */
    const syncHeader = () =>
        header?.classList.toggle("scrolled", window.scrollY > 24);


    /* ══════════════════════════════════════════════════
       ACTIVE NAV
    ══════════════════════════════════════════════════ */
    const syncActive = () => {
        const pos = window.scrollY + 180;
        let current = sections[0]?.getAttribute("id") || "";
        sections.forEach(sec => {
            if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight)
                current = sec.getAttribute("id");
        });
        [desktopLinks, mobileLinks].forEach(list =>
            list.forEach(a => {
                const active = a.getAttribute("href") === `#${current}`;
                a.classList.toggle("active", active);
                a.setAttribute("aria-current", active ? "page" : "false");
            })
        );
    };

    window.addEventListener("scroll", () => { syncHeader(); syncActive(); }, { passive: true });


    /* ══════════════════════════════════════════════════
       REVEAL ON SCROLL with stagger
    ══════════════════════════════════════════════════ */
    if ("IntersectionObserver" in window) {
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const siblings = [...(entry.target.parentElement?.querySelectorAll(".reveal:not(.show)") || [])];
                const idx   = siblings.indexOf(entry.target);
                const delay = Math.max(0, Math.min(idx * 90, 360));
                setTimeout(() => entry.target.classList.add("show"), delay);
                o.unobserve(entry.target);
            });
        }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
        revealEls.forEach(el => obs.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add("show"));
    }


    /* ══════════════════════════════════════════════════
       IMAGE FALLBACK
    ══════════════════════════════════════════════════ */
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.opacity = "0";
            img.setAttribute("aria-hidden", "true");
        });
    });


    /* ══════════════════════════════════════════════════
       INIT
    ══════════════════════════════════════════════════ */
    let savedLang = "en";
    try { savedLang = localStorage.getItem("mbsLang") || "en"; } catch {}
    applyTranslations(savedLang in T ? savedLang : "en");
    syncHeader();
    syncActive();

});
