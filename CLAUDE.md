# CLAUDE.md

Tento súbor poskytuje kontext pre Claude Code pri práci s Avantle.ai repozitárom.

## Kontext projektu Avantle.ai

**Avantle.ai** je európska platforma pre bezpečné AI agenty s dôrazom na Privacy by Design. Slúži ako hlavná marketingová a produktová stránka pre Avantle ekosystém, ktorý zahŕňa specializované AI nástroje pre compliance a ochranu údajov.

### Architektúra ekosystému

**Tri-komponentová architektúra Avantle ekosystému:**

1. **Avantle.ai** (marketing layer) - **TENTO REPOZITÁR**
   - Doména: `avantle.ai`  
   - Repo: `avantlehq/avantle-ai`
   - Funkcie: landing page, product showcase, lead generation, manifesto, brand identity

2. **DPO Studio** (admin layer)
   - Doména: `dpostudio.ai`
   - Repo: `avantlehq/dpo-studio-ai` 
   - Funkcie: tenant management, billing, whitelabel configurations, SSO

3. **DPIA Agent** (compliance engine)
   - Doména: `dpo.avantle.ai` (runtime), `dpia.avantle.ai` (DPIA suite)
   - Repo: `avantlehq/dpo-avantle-ai`, `avantlehq/dpia-avantle-ai`
   - Funkcie: automated GDPR assessments, AI-powered compliance tools

### Produkt vízia

**"Privacy by Design. One core that powers infinite local agents."**

Avantle.ai prezentuje víziu lokálnych AI agentov s kompletným šifrovaním a data sovereignty:
- **Local-first**: On-premise deployment pre enterprise
- **E2EE**: End-to-end encryption všetkých dát
- **GDPR compliant**: Built-in privacy by design
- **EU-focused**: Európske hodnoty a regulačné štandardy

## Aktuálny stav repozitára (Version 0.2.0)

### ✅ Hotové komponenty (Version 0.2.0 - DPIA Theme Unification)

**Infraštruktúra:**
- Next.js 16 + TypeScript + Tailwind CSS setup
- Vercel deployment konfigurácia (vercel.json)
- Environment variables template
- **Unified theme system** s DPIA Agent (ultra-soft RGB(25,39,52))

**Versioning System:**
```
lib/
└── version.ts               # Complete version tracking with changelog
app/api/
├── version/
│   └── route.ts            # GET /api/version - version info + changelog
└── health/
    └── route.ts            # GET /api/health - health check + version
```

**UI Components (Professional Landing Page):**
- Landing page (app/page.tsx) - hero section, mission, problem/solution, CTA
- Site header (components/site-header.tsx) - navigation, branding
- Site footer (components/site-footer.tsx) - **dynamic versioning**, links, branding
- Hero section - value proposition a core messaging
- Mission/Vision - Avantle philosophy a vízia
- Problem/Solution - market positioning
- Technology stack showcase
- Call-to-action sections

**Theme System (v0.2.0):**
```
app/globals.css              # Ultra-soft RGB(25,39,52) theme system
tailwind.config.ts           # DPIA category colors + gradient utilities  
components/
├── theme-provider.tsx       # Next-themes integration
└── client-theme-provider.tsx # Client-side wrapper
```

### 🎨 Design System (Version 0.2.0)

**Unified Theme Architecture:**
- **Base Background**: Ultra-soft RGB(25,39,52) = `#192734`
- **CSS Variables**: Complete system matching DPIA Agent
- **Category Colors**: Blue, green, orange, red, purple, gray
- **Typography**: Inter font family with antialiasing
- **Gradients**: Theme-aware background gradients (`.avantle-gradient`)

**Color Consistency:**
```css
/* DPIA Color System - CSS Variables */
--color-blue: #4A90E2;    /* Main/Dashboard */
--color-green: #7ED321;   /* Assessment/Pre-check */
--color-orange: #F5A623;  /* Builder/DPIA */
--color-red: #FF6B6B;     /* Risk Management */
--color-purple: #9B59B6;  /* Settings/Export */
--color-gray: #A9A9A9;    /* Drafts/Neutral */

/* Standardized Opacity Variables */
--border-opacity: 0.3;     /* 30% for border accents */
--icon-opacity: 0.15;      /* 15% for icon backgrounds */
--hover-opacity: 0.25;     /* 25% for hover states */
--underline-opacity: 0.4;  /* 40% for underline accents */
```

### 🔧 Technické detaily

**Tech stack:**
- Framework: Next.js 16 s App Router
- Styling: Tailwind CSS v4 s unified theme system
- TypeScript: Plná type safety
- Package manager: npm
- Icons: Lucide React
- Deployment: Vercel automatic deployment
- Versioning: Custom system s API endpoints

**Theme Integration:**
- Konzistentný s DPIA Agent styling systémom
- CSS variables pre seamless theming
- Tailwind utilities pre DPIA category colors
- Theme-aware gradients pre light/dark mode
- Professional enterprise-grade appearance

**API Endpoints:**
```bash
GET /api/health          # Health check + version info
GET /api/version         # Complete version data + changelog
```

### 🚀 Deployment status

**GitHub:**
- Repozitár: https://github.com/avantlehq/avantle-ai
- Current commit: cb80678 (v0.2.0 - DPIA Theme Unification)
- Auto-deployment: Vercel webhook configured

**Production:**
- Platform: Vercel 
- Region: Europe (fra1)
- Auto-deploy: GitHub main branch trigger
- URL: [Vercel assigned URL]

### 📊 Version History

**v0.2.0 (2024-11-23) - "DPIA Theme Unification"**
- ✅ Complete theme unification s DPIA Agent
- ✅ Ultra-soft RGB(25,39,52) theme system implementation
- ✅ CSS variables system pre consistent theming
- ✅ DPIA category color integration 
- ✅ Comprehensive versioning system
- ✅ API endpoints pre version tracking
- ✅ Dynamic version display v footer

**v0.1.0 (2024-11-20) - "Initial Release"**
- ✅ Next.js 16 application foundation
- ✅ Professional landing page structure
- ✅ Tailwind CSS styling setup
- ✅ TypeScript configuration
- ✅ Vercel deployment ready

### 📋 Ďalšie kroky (budúce rozvojové fázy)

**Phase 3A: Content Enhancement**
1. Enhanced marketing copy a messaging
2. Case studies a product showcases  
3. Customer testimonials integration
4. Blog/resources section
5. Detailed product documentation

**Phase 3B: Interactive Features**
1. Contact forms s lead capture
2. Newsletter subscription
3. Demo booking system
4. Interactive product tours
5. Customer portal integration

**Phase 3C: Advanced Marketing**
1. SEO optimization a content marketing
2. Multi-language support (SK/CZ/EN)
3. A/B testing infrastructure
4. Analytics a conversion tracking
5. Social media integration

**Phase 4: Ecosystem Integration**
1. Single Sign-On s DPO Studio
2. Unified user journey cross-platform
3. Shared branding a design system
4. Cross-platform analytics
5. Federated identity management

### 🎯 Technologická vízia

**Local-First Architecture:**
- On-premise deployment možnosti
- End-to-end encryption pre všetky dáta
- Offline-capable functionality
- European data sovereignty compliance

**Privacy by Design:**
- GDPR-compliant z default
- Zero-knowledge architecture
- Transparent data processing
- User-controlled privacy settings

**Enterprise Ready:**
- Whitelabel customization options
- Multi-tenant architecture support
- Enterprise security standards
- Professional support infrastructure

## Lokálna cesta

**Projekt sa nachádza v:** `C:\Users\rasti\Projects\avantlehq\avantle-ai\`

## Development commands

```bash
# Development (z avantlehq/avantle-ai/)
npm run dev              # Start dev server (http://localhost:3000)
npm run build           # Build for production  
npm run start           # Start production server
npm run lint            # Run ESLint

# API Testing
curl http://localhost:3000/api/health   # Health check + version
curl http://localhost:3000/api/version  # Complete version info + changelog

# Deployment
git add . && git commit -m "message" && git push origin main  # Trigger auto-deployment
```

## 🎨 Theme Development Guidelines

**When working with styling:**
1. **Always use CSS variables** from globals.css
2. **Follow DPIA color categories** pre consistent branding
3. **Use Tailwind utilities** s predefined gradients
4. **Maintain theme consistency** across Avantle ecosystem
5. **Test both light and dark modes** (when implemented)

**Color Usage:**
- `dpia-blue` - Primary actions, main navigation
- `dpia-green` - Success states, positive actions  
- `dpia-orange` - Warnings, important highlights
- `dpia-red` - Errors, critical actions
- `dpia-purple` - Premium features, special content
- `dpia-gray` - Neutral states, secondary content

## 🔄 Integration Notes

**Ecosystem Consistency:**
- Shared theme system s DPIA Agent a DPO Studio
- Consistent versioning pattern across projects  
- Unified branding a visual identity
- Shared development practices a tooling

**Cross-Project Dependencies:**
- Theme variables synchronized s DPIA Agent
- Version tracking pattern matches DPIA implementation
- API structure consistent s compliance tools
- Security practices aligned across ecosystem