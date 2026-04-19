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
            brand_subtitle: "Finance Transformation · Automation · Analytics",
            nav_home:       "Home",
            nav_results:    "Results",
            nav_expertise:  "Expertise",
            nav_diagnostic: "Diagnostic",
            nav_approach:   "Approach",
            nav_about:      "About",
            nav_contact:    "Contact",
            nav_cta:        "Get in Touch",

            hero_eyebrow:       "Principal-Led Specialist Consulting · Europe",
            hero_title:         "Growth stalls when execution falls short. We build the engine that keeps it running.",
            hero_description:   "MBS Advisory is a principal-led specialist consulting firm partnering with CFOs and senior leadership teams to transform financial operations, automate manual work, and build the decision intelligence that high-performing organisations depend on.",
            hero_btn_primary:   "Get in Touch",
            hero_btn_secondary: "See the Work",
            trust_1_title: "Finance Depth",
            trust_1_text:  "End-to-end command across R2R, P2P, OTC — SAP S/4HANA, controls, and governance",
            trust_2_title: "Technical Execution",
            trust_2_text:  "Automation and analytics built and deployed by the principal — not handed off",
            trust_3_title: "Real Delivery",
            trust_3_text:  "Every engagement runs through to operational adoption, not just recommendations",
            floating_1_label: "Finance Transformation",
            floating_1_text:  "SAP · Automation · Analytics",
            floating_2_label: "Real-Time Executive Dashboards",
            floating_2_text:  "Your business, visible in minutes",

            bar_1: "Finance Transformation",
            bar_2: "SAP S/4HANA",
            bar_3: "Intelligent Automation",
            bar_4: "Executive Dashboards",
            bar_5: "Lean Six Sigma",
            bar_6: "Process Excellence",

            results_tag:      "PROVEN RESULTS",
            results_title:    "The numbers behind the work",
            results_subtitle: "Quantified outcomes from engagements across Europe, delivered end-to-end by the principal.",
            metric_1:         "Reduction in reporting cycle time",
            metric_1_ctx:     "Finance transformation · Automotive sector · EU",
            metric_2:         "Hours saved annually through automation",
            metric_2_ctx:     "RPA deployment · Multi-entity European operations",
            metric_3:         "European jurisdictions managed compliantly",
            metric_3_ctx:     "VAT & tax compliance · Zero material audit findings",
            metric_4:         "Senior leaders receiving real-time dashboards",
            metric_4_ctx:     "Power BI deployment · Replaced manual reporting cycles",

            case_1_sector:  "Finance Transformation · Automotive · European SSC",
            case_1_title:   "From 3-day manual reporting cycles to real-time executive intelligence",
            case_before:    "Before",
            case_after:     "After",
            case_1_before:  "Finance teams across multiple European entities spending 3+ days per month manually compiling reports — no consistent format, no real-time visibility, and no remaining capacity for analysis.",
            case_1_after:   "Automated Power BI dashboards were designed and deployed across all entities, replacing manual compilation entirely. Weekly performance data now reaches 70+ senior leaders in minutes — with full governance and audit traceability.",
            case_1_result:  "~40% reduction in reporting cycle · 70+ leaders served weekly · Entire manual process eliminated",
            case_2_sector:  "Intelligent Automation · Finance Operations · 15+ Entities",
            case_2_title:   "4,000+ hours of manual finance work eliminated in a single programme",
            case_2_before:  "Core finance processes — R2R, P2P, and OTC — reliant on manual data entry, reconciliations, and cross-system transfers. Analyst capacity consumed entirely by low-value tasks with no strategic output.",
            case_2_after:   "RPA bots and Power Automate flows were architected and deployed across the highest-volume processes, fully integrated with SAP S/4HANA — with complete audit trail and governance controls throughout.",
            case_2_result:  "4,000+ hours recaptured annually · Teams redeployed to high-value analysis · Full audit compliance maintained",
            case_3_sector:  "VAT & Tax Compliance · 30+ European Jurisdictions",
            case_3_title:   "Audit-ready tax compliance at scale — zero material findings",
            case_3_before:  "Multinational VAT compliance managed manually across 30+ EU jurisdictions — inconsistent validation logic, high error exposure, and slow response times when audit queries arose.",
            case_3_after:   "Jurisdiction-specific automated validation tools were built and Lean Six Sigma methodology applied to submission accuracy. Full audit documentation standardised and maintained across all entities — zero material findings across all audits.",
            case_3_result:  "Zero material audit findings across all jurisdictions · Significant reduction in compliance review time",

            expertise_tag:  "PRACTICE AREAS",
            expertise_title:"Four areas of deep, evidenced expertise",
            expertise_description: "Each practice area is backed by documented results from real engagements — combining financial depth, technical execution, and structured methodology.",
            expertise_card_1_title: "Finance Transformation",
            expertise_card_1_text:  "End-to-end finance transformation across R2R, P2P and OTC — SAP S/4HANA UAT and post-go-live optimisation, month-end close acceleration, financial controls and multi-jurisdictional governance. Delivered inside a 15+ entity European SSC/GBS.",
            expertise_card_2_title: "Intelligent Automation",
            expertise_card_2_text:  "Recapture thousands of hours from manual, low-value work. Automation solutions designed, built and deployed by the principal — with full SAP integration, governance controls, and audit traceability from day one.",
            expertise_card_3_title: "Executive Dashboards & Analytics",
            expertise_card_3_text:  "Power BI dashboards with advanced DAX modelling, SAP data extraction pipelines, and real-time KPI visibility for senior leadership. Built to replace manual reporting cycles, not supplement them.",
            expertise_card_4_title: "Process Redesign & Lean",
            expertise_card_4_text:  "Lean Six Sigma Black Belt methodology applied to finance and operational processes — identifying root-cause waste, eliminating bottlenecks, and embedding governance structures that make improvements permanent.",

            diagnostic_tag:  "BUSINESS DIAGNOSTIC",
            diagnostic_title:"Which challenge is limiting your organisation right now?",
            diagnostic_description: "Select the area where you want greater impact. We will show you exactly how MBS Advisory would address it — with proven frameworks and real results.",
            diag_tab_1: "Finance & Control",
            diag_tab_2: "Intelligent Automation",
            diag_tab_3: "Analytics & Dashboards",
            diag_tab_4: "Process & Governance",
            metric_src: "Documented engagement outcome",

            diag_finance_title: "Are your numbers driving decisions — or just documenting the past?",
            diag_finance_text:  "Most organisations generate financial reports. Fewer generate financial intelligence. MBS Advisory redesigns your reporting architecture, fortifies budget controls, and deploys executive dashboards that transform finance from a back-office function into your most powerful strategic asset. Backed by hands-on delivery across 15+ European entities inside a major automotive SSC/GBS.",
            diag_finance_b1: "SAP S/4HANA process optimisation — R2R, P2P, OTC",
            diag_finance_b2: "Month-end close acceleration and financial controls",
            diag_finance_b3: "Cash flow visibility and variance analysis",
            diag_finance_b4: "SOX, IFRS and multi-jurisdictional compliance",
            diag_cta: "Discuss a Finance Challenge",
            diag_metric_finance:   "Month-end close reduction",
            diag_metric_finance_2: "EU process bottlenecks eliminated",

            diag_auto_title: "How much analyst capacity is absorbed by work that should not exist?",
            diag_auto_text:  "Every hour spent on manual reconciliations, data entry and report compilation is an hour not spent on analysis and decision support. MBS Advisory designs and deploys automation solutions that scale, integrate with SAP and existing systems, and are built with full governance and audit traceability from day one. The principle is simple: never automate a broken process.",
            diag_auto_b1: "RPA design and deployment — Automation Anywhere, Blue Prism",
            diag_auto_b2: "Power Platform automation — Power Automate, Power Apps",
            diag_auto_b3: "SAP S/4HANA-integrated automation architecture",
            diag_auto_b4: "GDPR-compliant, fully auditable automation programmes",
            diag_cta_auto: "Discuss an Automation Challenge",
            diag_metric_auto:   "Hours saved annually",
            diag_metric_auto_2: "Efficiency contribution",

            diag_analytics_title: "Do your senior leaders have real-time visibility — or are they waiting for someone to compile a spreadsheet?",
            diag_analytics_text:  "Executive dashboards built to replace manual reporting cycles, not supplement them. MBS Advisory designs and deploys Power BI dashboards with advanced DAX modelling, SAP data extraction pipelines, and governance-grade structures that give leadership teams the decision intelligence they need — updated in real time, available anywhere.",
            diag_analytics_b1: "Power BI dashboards with advanced DAX modelling",
            diag_analytics_b2: "SAP data extraction and modelling pipelines",
            diag_analytics_b3: "KPI framework design for executive leadership",
            diag_analytics_b4: "SOX-compliant and audit-ready reporting architecture",
            diag_cta_analytics: "Discuss a Dashboard Challenge",
            diag_metric_analytics:   "Senior leaders served weekly",
            diag_metric_analytics_2: "Reporting cycle time reduction",

            diag_process_title: "Where are your operations losing time, money, and quality without anyone owning the problem?",
            diag_process_text:  "Process inefficiency is invisible until you measure it. MBS Advisory applies Lean Six Sigma Black Belt methodology to identify, prioritise, and eliminate waste at the root — then builds the governance structures and accountability frameworks that prevent it from returning. Delivered across finance, shared services, and operational functions.",
            diag_process_b1: "Lean Six Sigma DMAIC and Value Stream Mapping",
            diag_process_b2: "Cross-functional process redesign — R2R, P2P, OTC",
            diag_process_b3: "Governance frameworks and RACI design",
            diag_process_b4: "Internal controls and compliance architecture",
            diag_cta_process: "Discuss a Process Challenge",
            diag_metric_process:   "Bottlenecks eliminated",
            diag_metric_process_2: "Material audit findings",

            approach_tag:   "OUR METHODOLOGY",
            approach_title: "Four phases. Delivered with precision. Designed to last.",
            step_1_title: "Diagnose",
            step_1_text:  "We start by understanding your business in depth — its financial structure, operational constraints, and where performance is leaving value behind.",
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
            insights_title: "Four reasons senior leaders choose MBS Advisory",
            result_1_title: "Principal-Led Delivery",
            result_1_text:  "Every engagement is led and delivered by the principal — a senior specialist with 12+ years of hands-on experience across European SSC/GBS environments. No juniors running your transformation while a partner supervises from a distance.",
            result_2_title: "Finance Depth Meets Technical Execution",
            result_2_text:  "Most consultants either understand finance or can build automation. MBS Advisory does both — designing the architecture, writing the code, and ensuring every solution is governed, auditable, and built to last.",
            result_3_title: "Cross-Functional Integration",
            result_3_text:  "The work connects finance, operations, IT, and senior leadership — solving root causes rather than isolated symptoms, and building solutions that hold together under real operational pressure.",
            result_4_title: "Implementation as a Core Commitment",
            result_4_text:  "The mandate does not end at the slide deck. Every engagement runs through to operational adoption — ensuring recommendations become measurable, sustainable improvements that compound over time.",

            about_tag:     "ABOUT THE PRINCIPAL",
            about_title:   "The person behind MBS Advisory",
            about_p1:      "MBS Advisory is led by Marlon B. Siqueira — a Finance Transformation specialist with 12+ years of international experience across Europe and Latin America, currently serving as Finance Transformation Lead at Stellantis's European Shared Services Centre of Excellence, one of the most operationally complex SSC/GBS environments in Europe, spanning 15+ legal entities across 8+ countries.",
            about_p2:      "Every engagement handled through MBS Advisory draws directly on this track record: 20+ automation solutions delivering €200K+ in productivity savings, 15+ executive Power BI dashboards serving 70+ senior leaders, a 200,000-communication cross-border programme delivered with zero operational disruption, and 30+ process bottlenecks eliminated using Lean Six Sigma methodology.",
            about_p3:      "The MBS Advisory model is principal-led by design. Clients work directly with the person who has done this work — not with a project manager relaying instructions to a delivery team.",
            about_cred_1:  "Lean Six Sigma Black Belt",
            about_cred_2:  "SAP S/4HANA Certified",
            about_cred_3:  "Automation Anywhere & Blue Prism Certified",
            about_cred_4:  "Mensa Brasil — 98th Percentile",
            about_cred_5:  "Based in Porto · EU Citizen",
            about_linkedin:"View full profile on LinkedIn",
            nav_about:     "About",

            contact_tag:   "START THE CONVERSATION",
            contact_title: "Ready to turn ambition into execution?",
            contact_description: "Whether you need to transform financial operations, automate manual work, build executive dashboards, or redesign core processes — get in touch to discuss what is possible.",
            contact_point_1: "Principal-led delivery — you work directly with the specialist",
            contact_point_2: "Engagements structured for measurable, sustainable results",
            contact_point_3: "Documented track record across European SSC/GBS environments",
            micro_cta_title: "Start with a complimentary 30-minute diagnostic",
            micro_cta_text:  "No obligation. In 30 minutes, we will identify your single highest-value opportunity.",
            form_name_label:    "Full Name",
            form_email_label:   "Business Email",
            form_company_label: "Company",
            form_role_label:    "Your Role",
            form_message_label: "Tell Us Your Challenge",
            form_name:    "Your full name",
            form_email:   "Your business email",
            form_company: "Your company name",
            form_role:    "e.g. CFO, Finance Director",
            form_message: "Describe your current challenge, goal, or the area where you want greater impact",
            form_button:  "Request Your Consultation",
            form_note:    "We respond within one business day. All conversations are strictly confidential.",

            footer_text_1: "Finance Transformation · Intelligent Automation · Analytics · Process Excellence",
            footer_text_2: "© 2026 MBS Advisory. All rights reserved.",
            footer_text_3: "Elegant strategy. Serious execution."
        },


        pt: {
            brand_subtitle: "Transformação Financeira · Automação · Analytics",
            nav_home:       "Início",
            nav_results:    "Resultados",
            nav_expertise:  "Especialidades",
            nav_diagnostic: "Diagnóstico",
            nav_approach:   "Abordagem",
            nav_about:      "Sobre",
            nav_contact:    "Contacto",
            nav_cta:        "Entrar em Contacto",

            hero_eyebrow:       "Consultoria Especialista · Principal-Led · Europa",
            hero_title:         "O crescimento desacelera quando a execução fica para trás. Nós construímos o motor que o mantém a funcionar.",
            hero_description:   "A MBS Advisory é uma consultora especialista liderada pelo principal, que trabalha com CFOs e equipas de liderança sénior para transformar operações financeiras, automatizar trabalho manual e construir a inteligência de decisão de que as organizações de alta performance dependem.",
            hero_btn_primary:   "Entrar em Contacto",
            hero_btn_secondary: "Ver o Trabalho",
            trust_1_title: "Profundidade Financeira",
            trust_1_text:  "Domínio end-to-end em R2R, P2P, OTC — SAP S/4HANA, controlos e governança",
            trust_2_title: "Execução Técnica",
            trust_2_text:  "Automação e analytics construídos e implementados pelo principal — não delegados",
            trust_3_title: "Entrega Real",
            trust_3_text:  "Cada projeto vai até à adoção operacional, não apenas às recomendações",
            floating_1_label: "Transformação Financeira",
            floating_1_text:  "SAP · Automação · Analytics",
            floating_2_label: "Dashboards Executivos em Tempo Real",
            floating_2_text:  "O seu negócio visível em minutos",

            bar_1: "Transformação Financeira",
            bar_2: "SAP S/4HANA",
            bar_3: "Automação Inteligente",
            bar_4: "Dashboards Executivos",
            bar_5: "Lean Six Sigma",
            bar_6: "Excelência de Processos",

            results_tag:      "RESULTADOS COMPROVADOS",
            results_title:    "Os números por detrás do trabalho",
            results_subtitle: "Resultados quantificados de projetos na Europa, entregues end-to-end pelo principal.",
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
            case_1_after:   "Dashboards Power BI automatizados foram projetados e implementados em todas as entidades, substituindo completamente a compilação manual. Os dados de performance semanais chegam agora a 70+ líderes sénior em minutos — com governança total e rastreabilidade de auditoria.",
            case_1_result:  "~40% de redução no ciclo de reporte · 70+ líderes servidos semanalmente · Todo o processo manual eliminado",
            case_2_sector:  "Automação Inteligente · Operações Financeiras · 15+ Entidades",
            case_2_title:   "4.000+ horas de trabalho financeiro manual eliminadas num único programa",
            case_2_before:  "Processos financeiros centrais — R2R, P2P e OTC — dependentes de entrada manual de dados, reconciliações e transferências entre sistemas. Capacidade dos analistas inteiramente consumida por tarefas de baixo valor.",
            case_2_after:   "Bots RPA e fluxos Power Automate foram arquitetados e implementados nos processos de maior volume, totalmente integrados com SAP S/4HANA — com trilha de auditoria completa e controlos de governança.",
            case_2_result:  "4.000+ horas recuperadas anualmente · Equipas reafetadas para análise de valor · Compliance de auditoria mantido",
            case_3_sector:  "Compliance IVA e Fiscal · 30+ Jurisdições Europeias",
            case_3_title:   "Compliance fiscal pronto para auditoria à escala — zero ocorrências materiais",
            case_3_before:  "Compliance IVA multinacional gerido manualmente em 30+ jurisdições da UE — lógica de validação inconsistente, exposição elevada a erros e tempos de resposta lentos quando surgiam questões em auditoria.",
            case_3_after:   "Ferramentas de validação automatizadas por jurisdição foram construídas e metodologia Lean Six Sigma aplicada à precisão das submissões. Documentação de auditoria padronizada e mantida em todas as entidades — zero ocorrências materiais.",
            case_3_result:  "Zero ocorrências materiais em todas as jurisdições · Redução significativa no tempo de revisão de compliance",

            expertise_tag:  "ÁREAS DE PRÁTICA",
            expertise_title:"Quatro áreas de expertise profunda e documentada",
            expertise_description: "Cada área de prática é sustentada por resultados documentados de projetos reais — combinando profundidade financeira, execução técnica e metodologia estruturada.",
            expertise_card_1_title: "Transformação Financeira",
            expertise_card_1_text:  "Transformação financeira end-to-end em R2R, P2P e OTC — UAT SAP S/4HANA e otimização pós-go-live, aceleração do fecho mensal, controlos financeiros e governança multi-jurisdicional. Entregue num SSC/GBS europeu com 15+ entidades.",
            expertise_card_2_title: "Automação Inteligente",
            expertise_card_2_text:  "Recupere milhares de horas de trabalho manual e de baixo valor. Soluções de automação projetadas, construídas e implementadas pelo principal — com integração SAP completa, controlos de governança e rastreabilidade de auditoria desde o primeiro dia.",
            expertise_card_3_title: "Dashboards Executivos e Analytics",
            expertise_card_3_text:  "Dashboards Power BI com modelação DAX avançada, pipelines de extração de dados SAP e visibilidade de KPIs em tempo real para liderança sénior. Construídos para substituir ciclos de reporte manual, não para os complementar.",
            expertise_card_4_title: "Redesenho de Processos e Lean",
            expertise_card_4_text:  "Metodologia Lean Six Sigma Black Belt aplicada a processos financeiros e operacionais — identificando desperdício na causa raiz, eliminando bottlenecks e incorporando estruturas de governança que tornam as melhorias permanentes.",

            diagnostic_tag:  "DIAGNÓSTICO DE NEGÓCIO",
            diagnostic_title:"Qual desafio está a limitar a sua organização agora mesmo?",
            diagnostic_description: "Selecione a área onde quer maior impacto. Mostraremos exatamente como a MBS Advisory atuaria — com frameworks comprovados e resultados reais.",
            diag_tab_1: "Finanças & Controlo",
            diag_tab_2: "Automação Inteligente",
            diag_tab_3: "Analytics & Dashboards",
            diag_tab_4: "Processos & Governança",
            metric_src: "Resultado documentado de projeto",

            diag_finance_title: "Os seus números estão a guiar decisões — ou apenas a documentar o passado?",
            diag_finance_text:  "A maioria das organizações produz relatórios financeiros. Poucas produzem inteligência financeira. A MBS Advisory redesenha a arquitetura de reporte, reforça os controlos orçamentais e implementa dashboards executivos que transformam as finanças de uma função de back-office no seu ativo estratégico mais poderoso. Sustentado por entrega prática em 15+ entidades europeias num grande SSC/GBS automóvel.",
            diag_finance_b1: "Otimização de processos SAP S/4HANA — R2R, P2P, OTC",
            diag_finance_b2: "Aceleração do fecho mensal e controlos financeiros",
            diag_finance_b3: "Visibilidade de cash flow e análise de variações",
            diag_finance_b4: "Compliance SOX, IFRS e multi-jurisdicional",
            diag_cta: "Discutir um Desafio Financeiro",
            diag_metric_finance:   "Redução do fecho mensal",
            diag_metric_finance_2: "Bottlenecks de processo eliminados na UE",

            diag_auto_title: "Quanta capacidade de analista está a ser absorvida por trabalho que não deveria existir?",
            diag_auto_text:  "Cada hora gasta em reconciliações manuais, entrada de dados e compilação de relatórios é uma hora que não é dedicada a análise e suporte à decisão. A MBS Advisory projeta e implementa soluções de automação que escalam, se integram com SAP e os sistemas existentes, e são construídas com governança total e rastreabilidade de auditoria desde o primeiro dia. O princípio é simples: nunca automatizar um processo com problemas.",
            diag_auto_b1: "Design e implementação RPA — Automation Anywhere, Blue Prism",
            diag_auto_b2: "Automação Power Platform — Power Automate, Power Apps",
            diag_auto_b3: "Arquitetura de automação integrada com SAP S/4HANA",
            diag_auto_b4: "Programas de automação GDPR-compliant e totalmente auditáveis",
            diag_cta_auto: "Discutir um Desafio de Automação",
            diag_metric_auto:   "Horas poupadas anualmente",
            diag_metric_auto_2: "Contribuição de eficiência",

            diag_analytics_title: "Os seus líderes sénior têm visibilidade em tempo real — ou estão à espera que alguém compile uma folha de cálculo?",
            diag_analytics_text:  "Dashboards executivos construídos para substituir ciclos de reporte manual, não para os complementar. A MBS Advisory projeta e implementa dashboards Power BI com modelação DAX avançada, pipelines de extração de dados SAP e estruturas de qualidade de governança que dão às equipas de liderança a inteligência de decisão de que precisam — atualizada em tempo real, disponível em qualquer lugar.",
            diag_analytics_b1: "Dashboards Power BI com modelação DAX avançada",
            diag_analytics_b2: "Extração de dados SAP e pipelines de modelação",
            diag_analytics_b3: "Design de frameworks de KPIs para liderança executiva",
            diag_analytics_b4: "Arquitetura de reporte SOX-compliant e pronta para auditoria",
            diag_cta_analytics: "Discutir um Desafio de Dashboards",
            diag_metric_analytics:   "Líderes sénior servidos semanalmente",
            diag_metric_analytics_2: "Redução do ciclo de reporte",

            diag_process_title: "Onde estão as suas operações a perder tempo, dinheiro e qualidade sem que ninguém seja responsável pelo problema?",
            diag_process_text:  "A ineficiência de processos é invisível até a medir. A MBS Advisory aplica metodologia Lean Six Sigma Black Belt para identificar, priorizar e eliminar o desperdício na causa raiz — e depois constrói as estruturas de governança e frameworks de accountability que impedem o seu regresso. Entregue em funções financeiras, de serviços partilhados e operacionais.",
            diag_process_b1: "Lean Six Sigma DMAIC e Value Stream Mapping",
            diag_process_b2: "Redesenho cross-funcional de processos — R2R, P2P, OTC",
            diag_process_b3: "Frameworks de governança e design RACI",
            diag_process_b4: "Arquitetura de controlos internos e compliance",
            diag_cta_process: "Discutir um Desafio de Processos",
            diag_metric_process:   "Bottlenecks eliminados",
            diag_metric_process_2: "Ocorrências materiais em auditoria",

            approach_tag:   "A NOSSA METODOLOGIA",
            approach_title: "Quatro fases. Entregues com precisão. Desenhadas para durar.",
            step_1_title: "Diagnosticar",
            step_1_text:  "Começamos por compreender o seu negócio em profundidade — a sua estrutura financeira, constrangimentos operacionais e onde a performance está a deixar valor para trás.",
            step_2_title: "Priorizar",
            step_2_text:  "Nem tudo precisa de ser corrigido de uma vez. Identificamos as suas oportunidades de maior valor e construímos um plano sequenciado que cria vitórias rápidas enquanto desenvolve capacidade a longo prazo.",
            step_3_title: "Implementar",
            step_3_text:  "Entregamos ao lado da sua equipa — não de forma isolada. Cada solução é desenhada com a adoção em mente, garantindo que as suas pessoas assumem o resultado desde o primeiro dia.",
            step_4_title: "Consolidar",
            step_4_text:  "Incorporamos as rotinas, dashboards e estruturas de governança que tornam os resultados permanentes — para que os ganhos de performance se acumulem em vez de desaparecerem.",
            approach_panel_label: "A Nossa Filosofia",
            approach_panel_title: "Estratégia elegante. Execução séria.",
            approach_panel_text:  "A MBS Advisory combina perspetiva consultiva sénior com disciplina de implementação prática. Não entregamos recomendações — acompanhamos até à realidade operacional.",

            insights_tag:   "A VANTAGEM MBS",
            insights_title: "Quatro razões pelas quais líderes sénior escolhem a MBS Advisory",
            result_1_title: "Entrega Liderada pelo Principal",
            result_1_text:  "Cada projeto é liderado e entregue pelo principal — um especialista sénior com 12+ anos de experiência prática em ambientes SSC/GBS europeus. Sem juniores a gerir a sua transformação enquanto um sócio supervisiona à distância.",
            result_2_title: "Profundidade Financeira e Execução Técnica",
            result_2_text:  "A maioria dos consultores percebe de finanças ou sabe construir automação. A MBS Advisory faz as duas coisas — projetando a arquitetura, escrevendo o código e garantindo que cada solução é governada, auditável e construída para durar.",
            result_3_title: "Integração Multifuncional",
            result_3_text:  "O trabalho liga finanças, operações, TI e liderança sénior — resolvendo causas raiz em vez de sintomas isolados e construindo soluções que resistem sob pressão operacional real.",
            result_4_title: "Implementação como Compromisso Central",
            result_4_text:  "O mandato não termina na apresentação. Cada projeto vai até à adoção operacional — garantindo que as recomendações se tornam melhorias mensuráveis e sustentáveis que se acumulam ao longo do tempo.",

            about_tag:     "SOBRE O PRINCIPAL",
            about_title:   "A pessoa por detrás da MBS Advisory",
            about_p1:      "A MBS Advisory é liderada por Marlon B. Siqueira — especialista em Transformação Financeira com 12+ anos de experiência internacional na Europa e América Latina, atualmente como Finance Transformation Lead no Centro de Excelência de Serviços Partilhados Europeu da Stellantis, um dos ambientes SSC/GBS operacionalmente mais complexos da Europa, abrangendo 15+ entidades jurídicas em 8+ países.",
            about_p2:      "Cada projeto gerido pela MBS Advisory baseia-se diretamente neste historial: 20+ soluções de automação gerando €200K+ em poupanças de produtividade, 15+ dashboards Power BI executivos servindo 70+ líderes sénior, um programa de 200.000 comunicações cross-border entregue com zero perturbação operacional, e 30+ bottlenecks de processo eliminados com metodologia Lean Six Sigma.",
            about_p3:      "O modelo MBS Advisory é liderado pelo principal por design. Os clientes trabalham diretamente com a pessoa que realizou este trabalho — não com um gestor de projeto a transmitir instruções a uma equipa de entrega.",
            about_cred_1:  "Lean Six Sigma Black Belt",
            about_cred_2:  "Certificado SAP S/4HANA",
            about_cred_3:  "Certificado Automation Anywhere & Blue Prism",
            about_cred_4:  "Mensa Brasil — Percentil 98",
            about_cred_5:  "Baseado no Porto · Cidadão UE",
            about_linkedin:"Ver perfil completo no LinkedIn",
            nav_about:     "Sobre",

            contact_tag:   "INICIAR A CONVERSA",
            contact_title: "Pronto para transformar ambição em execução?",
            contact_description: "Seja para transformar operações financeiras, automatizar trabalho manual, construir dashboards executivos ou redesenhar processos centrais — entre em contacto para discutir o que é possível.",
            contact_point_1: "Entrega liderada pelo principal — trabalha diretamente com o especialista",
            contact_point_2: "Projetos estruturados para resultados mensuráveis e sustentáveis",
            contact_point_3: "Historial documentado em ambientes SSC/GBS europeus",
            micro_cta_title: "Comece com um diagnóstico gratuito de 30 minutos",
            micro_cta_text:  "Sem compromisso. Em 30 minutos, identificamos a sua oportunidade de maior valor.",
            form_name_label:    "Nome Completo",
            form_email_label:   "E-mail Profissional",
            form_company_label: "Empresa",
            form_role_label:    "A Sua Função",
            form_message_label: "Conte-nos o Seu Desafio",
            form_name:    "O seu nome completo",
            form_email:   "O seu e-mail profissional",
            form_company: "Nome da sua empresa",
            form_role:    "ex. CFO, Diretor Financeiro",
            form_message: "Descreva o seu desafio atual, objetivo ou a área onde quer maior impacto",
            form_button:  "Solicitar a Sua Consulta",
            form_note:    "Respondemos num prazo de um dia útil. Todas as conversas são estritamente confidenciais.",

            footer_text_1: "Transformação Financeira · Automação Inteligente · Analytics · Excelência de Processos",
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
