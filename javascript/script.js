document.addEventListener("DOMContentLoaded", () => {

    /* ── Element references ──────────────────────────── */
    const header       = document.getElementById("header");
    const mobileBtn    = document.getElementById("mobile_btn");
    const mobileMenu   = document.getElementById("mobile_menu");
    const mobileIcon   = mobileBtn?.querySelector("i");
    const desktopLinks = document.querySelectorAll("#nav_list a");
    const mobileLinks  = document.querySelectorAll("#mobile_nav_list a");
    const allNavLinks  = document.querySelectorAll("#nav_list a, #mobile_nav_list a");
    const sections     = document.querySelectorAll("main section[id]");
    const revealEls    = document.querySelectorAll(".reveal");
    const langButtons  = document.querySelectorAll(".lang-btn");

    /* ══════════════════════════════════════════════════
       TRANSLATIONS
    ══════════════════════════════════════════════════ */
    const translations = {
        en: {
            brand_aria: "Go to homepage",
            brand_subtitle: "Sales & Transformation Consulting",
            mobile_nav_aria: "Mobile navigation",

            nav_home: "Home",
            nav_expertise: "Expertise",
            nav_industries: "Industries",
            nav_approach: "Approach",
            nav_insights: "Insights",
            nav_contact: "Contact",
            nav_cta: "Schedule a Consultation",

            hero_eyebrow: "PREMIUM SALES & BUSINESS ADVISORY",
            hero_title: "Advisory that strengthens revenue, modernizes execution, and elevates decision-making.",
            hero_description: "We help companies improve sales performance, redesign processes, strengthen finance visibility, and implement automation with an executive-grade approach focused on growth, control, and measurable business value.",
            hero_btn_primary: "Schedule a Consultation",
            hero_btn_secondary: "Explore Expertise",

            trust_1_title: "Revenue-Focused",
            trust_1_text: "Commercial improvement with strategic discipline",
            trust_2_title: "Finance + Operations",
            trust_2_text: "Integrated performance view for leadership teams",
            trust_3_title: "Execution-Led",
            trust_3_text: "Practical transformation, not slide-only consulting",

            floating_1_label: "Strategic Sales Advisory",
            floating_1_text: "Growth with structure",
            floating_2_label: "Automation & Dashboards",
            floating_2_text: "Visibility for faster decisions",

            bar_1: "Executive Advisory",
            bar_2: "Sales Transformation",
            bar_3: "Finance Excellence",
            bar_4: "Automation Strategy",
            bar_5: "Performance Dashboards",
            bar_6: "Operational Discipline",

            expertise_tag: "EXPERTISE",
            expertise_title: "Advisory capabilities designed to improve growth, control and performance",
            expertise_description: "A premium consulting model for companies that want stronger commercial execution, smarter reporting, leaner operations, and better leadership visibility.",
            expertise_card_1_title: "Sales & Revenue Performance",
            expertise_card_1_text: "Improve commercial discipline, pipeline visibility, decision frameworks and the routines that drive stronger sales execution.",
            expertise_card_2_title: "Automation & Productivity",
            expertise_card_2_text: "Reduce manual effort, increase speed and create more scalable operations through intelligent automation and workflow redesign.",
            expertise_card_3_title: "Dashboards & Executive Visibility",
            expertise_card_3_text: "Turn business data into high-impact executive dashboards that support better prioritization and faster decisions.",
            expertise_card_4_title: "Process Redesign",
            expertise_card_4_text: "Map the current reality, identify bottlenecks and redesign operating flows for higher efficiency and better governance.",
            expertise_card_5_title: "Governance & Control",
            expertise_card_5_text: "Support leadership teams with stronger accountability, process ownership, reporting discipline and operational consistency.",
            expertise_card_6_title: "Transformation Execution",
            expertise_card_6_text: "Move from diagnosis to implementation with practical delivery, stakeholder alignment and business-oriented prioritization.",
            expertise_img_1_alt: "Finance and performance transformation",
            expertise_img_2_alt: "Business automation consulting",
            expertise_img_3_alt: "Executive dashboards and analytics",

            industries_tag: "INDUSTRIES",
            industries_title: "Business context matters — we bring a versatile, cross-sector perspective",
            industry_1_title: "Industrial & Automotive",
            industry_1_text: "Transformation support for complex operations, reporting structures and performance environments.",
            industry_2_title: "Large-Scale Operations",
            industry_2_text: "Operational clarity, process discipline and management visibility for complex business ecosystems.",
            industry_3_title: "Services & Education",
            industry_3_text: "Advisory for organizations seeking scalable service delivery, efficiency and stronger management routines.",
            industry_img_1_alt: "Automotive and industrial operations consulting",
            industry_img_2_alt: "Large scale operations and performance advisory",
            industry_img_3_alt: "Education and service organizations consulting",

            approach_tag: "APPROACH",
            approach_title: "A consulting approach built around clarity, speed and measurable value",
            step_1_title: "Diagnose",
            step_1_text: "We assess your current sales, finance, reporting and process landscape to identify what is slowing growth or execution.",
            step_2_title: "Prioritize",
            step_2_text: "We define what matters most first: visibility, process redesign, automation, governance or leadership reporting.",
            step_3_title: "Implement",
            step_3_text: "We execute with business realism, stakeholder alignment and a sharp focus on outcomes that leaders can actually feel.",
            step_4_title: "Scale",
            step_4_text: "We help embed routines, dashboards and operating discipline so improvements are sustained and expanded over time.",
            approach_panel_label: "Advisory Philosophy",
            approach_panel_title: "Elegant strategy. Serious execution.",
            approach_panel_text: "We combine executive perspective with hands-on delivery, creating a consulting experience that feels premium, focused and deeply practical.",
            approach_img_alt: "Continuous improvement and structured advisory",

            insights_tag: "WHY MBS",
            insights_title: "What clients value in our consulting style",
            result_1_title: "Commercial Lens",
            result_1_text: "We do not treat process and reporting as isolated functions — they exist to support better growth decisions and stronger execution.",
            result_2_title: "Premium Positioning",
            result_2_text: "Our approach is structured, polished and executive-ready, helping your business present itself with greater clarity and confidence.",
            result_3_title: "Cross-Functional Strength",
            result_3_text: "We connect finance, sales, operations and systems to solve the real causes of inefficiency rather than only the symptoms.",
            result_4_title: "Hands-on Transformation",
            result_4_text: "We stay close to implementation so change becomes operational reality, not just a strategic recommendation.",

            showcase_tag: "VISUAL SHOWCASE",
            showcase_title: "A premium consulting brand deserves visual authority",
            showcase_title_1: "Executive Advisory",
            showcase_title_2: "Data Visibility",
            showcase_title_3: "Commercial Growth",
            showcase_img_1_alt: "Business advisory visual identity",
            showcase_img_2_alt: "Corporate transformation consulting",
            showcase_img_3_alt: "Business process and sales consulting",

            contact_tag: "CONTACT",
            contact_title: "Let's talk about your next stage of growth and transformation",
            contact_description: "Whether you want to improve sales effectiveness, redesign processes, build better dashboards, or increase operating efficiency, we can structure the next move with clarity and executive-level focus.",
            contact_point_1: "Premium positioning for modern companies",
            contact_point_2: "Sales, finance and operations in one advisory lens",
            contact_point_3: "Practical transformation with measurable business value",
            contact_social_aria: "Contact social links",
            form_subject: "New consultation request - MBS Advisory",
            form_name: "Full name",
            form_email: "Business email",
            form_company: "Company",
            form_message: "Tell us about your challenge, goals, or project scope",
            form_button: "Request Consultation",

            footer_text_1: "Sales, Finance & Business Transformation Consulting",
            footer_text_2: "© 2026 MBS Advisory",
            footer_text_3: "Elegant strategy. Serious execution."
        },

        pt: {
            brand_aria: "Ir para a página inicial",
            brand_subtitle: "Consultoria em Vendas e Transformação",
            mobile_nav_aria: "Navegação móvel",

            nav_home: "Início",
            nav_expertise: "Especialidades",
            nav_industries: "Setores",
            nav_approach: "Abordagem",
            nav_insights: "Diferenciais",
            nav_contact: "Contato",
            nav_cta: "Agende uma Consultoria",

            hero_eyebrow: "CONSULTORIA PREMIUM EM VENDAS E NEGÓCIOS",
            hero_title: "Consultoria que fortalece a receita, moderniza a execução e eleva a tomada de decisão.",
            hero_description: "Ajudamos empresas a melhorar a performance comercial, redesenhar processos, fortalecer a visibilidade financeira e implementar automação com uma abordagem executiva focada em crescimento, controle e valor mensurável.",
            hero_btn_primary: "Agende uma Consultoria",
            hero_btn_secondary: "Explorar Especialidades",

            trust_1_title: "Foco em Receita",
            trust_1_text: "Evolução comercial com disciplina estratégica",
            trust_2_title: "Finanças + Operações",
            trust_2_text: "Visão integrada de performance para a liderança",
            trust_3_title: "Execução na Prática",
            trust_3_text: "Transformação prática, não apenas consultoria de slides",

            floating_1_label: "Consultoria Estratégica em Vendas",
            floating_1_text: "Crescimento com estrutura",
            floating_2_label: "Automação & Dashboards",
            floating_2_text: "Visibilidade para decisões mais rápidas",

            bar_1: "Consultoria Executiva",
            bar_2: "Transformação Comercial",
            bar_3: "Excelência Financeira",
            bar_4: "Estratégia de Automação",
            bar_5: "Dashboards de Performance",
            bar_6: "Disciplina Operacional",

            expertise_tag: "ESPECIALIDADES",
            expertise_title: "Capacidades de consultoria desenhadas para melhorar crescimento, controle e performance",
            expertise_description: "Um modelo premium de consultoria para empresas que buscam execução comercial mais forte, relatórios mais inteligentes, operações mais enxutas e melhor visibilidade para a liderança.",
            expertise_card_1_title: "Performance de Vendas & Receita",
            expertise_card_1_text: "Melhore a disciplina comercial, a visibilidade do pipeline, os frameworks de decisão e as rotinas que impulsionam uma execução comercial mais forte.",
            expertise_card_2_title: "Automação & Produtividade",
            expertise_card_2_text: "Reduza esforço manual, aumente velocidade e crie operações mais escaláveis por meio de automação inteligente e redesenho de fluxos de trabalho.",
            expertise_card_3_title: "Dashboards & Visibilidade Executiva",
            expertise_card_3_text: "Transforme dados de negócio em dashboards executivos de alto impacto que apoiam melhor priorização e decisões mais rápidas.",
            expertise_card_4_title: "Redesenho de Processos",
            expertise_card_4_text: "Mapeie a realidade atual, identifique gargalos e redesenhe fluxos operacionais para maior eficiência e melhor governança.",
            expertise_card_5_title: "Governança & Controle",
            expertise_card_5_text: "Apoie equipes de liderança com maior accountability, ownership de processos, disciplina de reporte e consistência operacional.",
            expertise_card_6_title: "Execução da Transformação",
            expertise_card_6_text: "Saia do diagnóstico para a implementação com entrega prática, alinhamento de stakeholders e priorização orientada ao negócio.",
            expertise_img_1_alt: "Transformação financeira e de performance",
            expertise_img_2_alt: "Consultoria em automação de negócios",
            expertise_img_3_alt: "Dashboards executivos e analytics",

            industries_tag: "SETORES",
            industries_title: "O contexto do negócio importa — trazemos uma perspectiva versátil e multissetorial",
            industry_1_title: "Industrial & Automotivo",
            industry_1_text: "Apoio à transformação em operações complexas, estruturas de reporte e ambientes orientados à performance.",
            industry_2_title: "Operações em Larga Escala",
            industry_2_text: "Clareza operacional, disciplina de processos e visibilidade gerencial para ecossistemas empresariais complexos.",
            industry_3_title: "Serviços & Educação",
            industry_3_text: "Consultoria para organizações que buscam entrega de serviços escalável, eficiência e rotinas de gestão mais fortes.",
            industry_img_1_alt: "Consultoria em operações automotivas e industriais",
            industry_img_2_alt: "Consultoria para operações em larga escala",
            industry_img_3_alt: "Consultoria para educação e serviços",

            approach_tag: "ABORDAGEM",
            approach_title: "Uma abordagem de consultoria construída em torno de clareza, velocidade e valor mensurável",
            step_1_title: "Diagnosticar",
            step_1_text: "Avaliamos seu cenário atual de vendas, finanças, reporting e processos para identificar o que está desacelerando o crescimento ou a execução.",
            step_2_title: "Priorizar",
            step_2_text: "Definimos primeiro o que mais importa: visibilidade, redesenho de processos, automação, governança ou reporting para a liderança.",
            step_3_title: "Implementar",
            step_3_text: "Executamos com realismo de negócio, alinhamento de stakeholders e foco claro em resultados que a liderança realmente percebe.",
            step_4_title: "Escalar",
            step_4_text: "Apoiamos a incorporação de rotinas, dashboards e disciplina operacional para que as melhorias sejam sustentadas e ampliadas ao longo do tempo.",
            approach_panel_label: "Filosofia de Consultoria",
            approach_panel_title: "Estratégia elegante. Execução séria.",
            approach_panel_text: "Combinamos visão executiva com entrega prática, criando uma experiência de consultoria que transmite sofisticação, foco e profunda aplicabilidade.",
            approach_img_alt: "Melhoria contínua e consultoria estruturada",

            insights_tag: "POR QUE MBS",
            insights_title: "O que os clientes valorizam no nosso estilo de consultoria",
            result_1_title: "Visão Comercial",
            result_1_text: "Não tratamos processo e reporting como funções isoladas — eles existem para apoiar melhores decisões de crescimento e execução mais forte.",
            result_2_title: "Posicionamento Premium",
            result_2_text: "Nossa abordagem é estruturada, refinada e pronta para o nível executivo, ajudando sua empresa a se apresentar com mais clareza e confiança.",
            result_3_title: "Força Multifuncional",
            result_3_text: "Conectamos finanças, vendas, operações e sistemas para resolver as causas reais da ineficiência, e não apenas os sintomas.",
            result_4_title: "Transformação na Prática",
            result_4_text: "Permanecemos próximos da implementação para que a mudança se torne realidade operacional, e não apenas uma recomendação estratégica.",

            showcase_tag: "MOSTRA VISUAL",
            showcase_title: "Uma marca de consultoria premium merece autoridade visual",
            showcase_title_1: "Consultoria Executiva",
            showcase_title_2: "Visibilidade de Dados",
            showcase_title_3: "Crescimento Comercial",
            showcase_img_1_alt: "Identidade visual para consultoria empresarial",
            showcase_img_2_alt: "Consultoria em transformação corporativa",
            showcase_img_3_alt: "Consultoria em processos e vendas",

            contact_tag: "CONTATO",
            contact_title: "Vamos conversar sobre o próximo estágio do seu crescimento e transformação",
            contact_description: "Se você deseja melhorar a efetividade de vendas, redesenhar processos, construir dashboards melhores ou aumentar a eficiência operacional, podemos estruturar o próximo passo com clareza e foco executivo.",
            contact_point_1: "Posicionamento premium para empresas modernas",
            contact_point_2: "Vendas, finanças e operações em uma única lente consultiva",
            contact_point_3: "Transformação prática com valor de negócio mensurável",
            contact_social_aria: "Links sociais de contato",
            form_subject: "Novo pedido de consultoria - MBS Advisory",
            form_name: "Nome completo",
            form_email: "E-mail corporativo",
            form_company: "Empresa",
            form_message: "Conte sobre seu desafio, objetivos ou escopo do projeto",
            form_button: "Solicitar Consultoria",

            footer_text_1: "Consultoria em Vendas, Finanças e Transformação de Negócios",
            footer_text_2: "© 2026 MBS Advisory",
            footer_text_3: "Estratégia elegante. Execução séria."
        }
    };

    /* ── i18n engine ─────────────────────────────────── */
    const applyTranslations = (lang) => {
        const dict = translations[lang] || translations.en;
        document.documentElement.lang = lang;

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const v = dict[el.dataset.i18n];
            if (v !== undefined) el.textContent = v;
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const v = dict[el.dataset.i18nPlaceholder];
            if (v !== undefined) el.setAttribute("placeholder", v);
        });

        document.querySelectorAll("[data-i18n-aria-label]").forEach(el => {
            const v = dict[el.dataset.i18nAriaLabel];
            if (v !== undefined) el.setAttribute("aria-label", v);
        });

        document.querySelectorAll("[data-i18n-alt]").forEach(el => {
            const v = dict[el.dataset.i18nAlt];
            if (v !== undefined) el.setAttribute("alt", v);
        });

        document.querySelectorAll("[data-i18n-value]").forEach(el => {
            const v = dict[el.dataset.i18nValue];
            if (v !== undefined) el.setAttribute("value", v);
        });

        langButtons.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.lang === lang);
        });

        try { localStorage.setItem("mbsLang", lang); } catch (_) {}
    };

    langButtons.forEach(btn => {
        btn.addEventListener("click", () => applyTranslations(btn.dataset.lang));
    });

    /* ── Mobile menu ─────────────────────────────────── */
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

    const toggleMenu = () =>
        mobileMenu?.classList.contains("active") ? closeMenu() : openMenu();

    mobileBtn?.addEventListener("click", toggleMenu);
    allNavLinks.forEach(l => l.addEventListener("click", closeMenu));

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && mobileMenu?.classList.contains("active")) closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1170) closeMenu();
    });

    /* ── Header scroll state ─────────────────────────── */
    const syncHeader = () =>
        header?.classList.toggle("scrolled", window.scrollY > 24);

    /* ── Active nav section ──────────────────────────── */
    const syncActive = () => {
        const pos = window.scrollY + 180;
        let current = sections[0]?.getAttribute("id") || "";

        sections.forEach(sec => {
            if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
                current = sec.getAttribute("id");
            }
        });

        [desktopLinks, mobileLinks].forEach(list =>
            list.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current}`))
        );
    };

    window.addEventListener("scroll", () => { syncHeader(); syncActive(); }, { passive: true });

    /* ── Reveal on scroll — with stagger ──────────────── */
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const siblings = [...(entry.target.parentElement?.querySelectorAll(".reveal:not(.show)") || [])];
                const idx = siblings.indexOf(entry.target);
                const delay = Math.max(0, Math.min(idx * 90, 360));

                setTimeout(() => entry.target.classList.add("show"), delay);
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add("show"));
    }

    /* ── Graceful image fallback ─────────────────────── */
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.opacity = "0";
            img.setAttribute("aria-hidden", "true");
        });
    });

    /* ── Init ────────────────────────────────────────── */
    let savedLang = "en";
    try { savedLang = localStorage.getItem("mbsLang") || "en"; } catch (_) {}
    applyTranslations(savedLang);
    syncHeader();
    syncActive();
});
