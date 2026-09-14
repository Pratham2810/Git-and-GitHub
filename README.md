# ECO Vyapar — Green Retail Sustainability Platform

**Where Local Retail Goes Green.**  
*Small Shops. Smarter Choices. Sustainable Future.*

ECO Vyapar is a **functional web-based sustainability platform prototype** created to explore how small local retailers and consumers can reduce unnecessary plastic use and adopt more responsible retail practices.

The platform converts a field-based Business Ethics intervention into an interactive digital experience combining verified field observations, sustainability self-assessment, scenario modelling, decision tools, 3D retail storytelling, consumer participation, retailer pledges and positive recognition.

## Live Demo

**https://eco-vyapar-97kg16.v2.appdeploy.ai/**

> A custom domain has been configured separately and will be used once DNS verification is complete.

## Field Foundation

The initial intervention was conducted with a limited sample of **6 local retail outlets in Gothapatna, Bhubaneswar**.

- 6 retailers observed
- 4 retailers using plastic bags
- 2 retailers using paper / biodegradable / other sustainable alternatives
- 66.7% of the observed sample using plastic
- 33.3% of the observed sample using alternatives
- 2 retailers recognised for positive green-retail behaviour

These figures are presented as **local field observations only**. The project does not claim that this sample represents all retailers in Gothapatna, Bhubaneswar or India.

## What ECO Vyapar Does

### 1. Cinematic 3D Retail Journey
A scroll-reactive Three.js environment visualises the transition from plastic dependence to a greener retail ecosystem through five stages:

1. Plastic Dependence
2. Awareness
3. Retailer Action
4. Consumer Participation
5. Green Retail Network

### 2. Field Impact Dashboard
Displays verified project data through KPI cards, charts and interpretation panels while clearly separating observed data from scenarios and future concepts.

### 3. Green Score 3.0
An educational self-assessment built around six practices:

- Avoid unnecessary plastic bags
- Offer sustainable alternatives
- Encourage reusable bags
- Minimise unnecessary packaging
- Manage shop waste responsibly
- Communicate sustainable choices to customers

The result is a readiness signal, **not an official certification**.

### 4. Sustainable Material Lab
Compares practical trade-offs between:

- No bag
- Reusable bag
- Paper bag
- Compostable option
- Plastic bag

The tool focuses on reuse potential, practicality, waste implications and ethical considerations rather than unsupported carbon claims.

### 5. Retail Decision Simulator
Lets users compare checkout choices such as plastic, paper, reusable and no-bag decisions across convenience, reuse, packaging, waste and ethics.

### 6. 3D Green Store Simulator
Users can activate greener retail practices and watch a conceptual shop evolve in real time.

Available practices include:

- Plastic reduction
- Paper alternatives
- Reusable-bag encouragement
- Minimal packaging
- Waste segregation
- Efficient lighting
- Consumer-awareness signage

### 7. One Shop → One Year Scenario
A transparent scenario calculator estimates potential bag reduction using user-selected assumptions such as customers per day, bags per day and a reduction target.

Outputs are explicitly labelled as **scenario estimates**, not measured field outcomes.

### 8. Green Retail Pledge
A student-led digital pledge encourages retailers to commit to practical actions such as reducing unnecessary plastic, encouraging reusable bags and managing waste responsibly.

### 9. Consumer Green Challenge
A five-action challenge encourages consumers to:

- Bring their own bag
- Refuse unnecessary plastic
- Reuse existing bags
- Choose better packaging
- Encourage local retailers

### 10. Positive Recognition
Highlights responsible behaviour without public shaming. Retailer identities remain anonymous unless appropriate consent exists.

### 11. Ethics & Transparency
The platform is built around four core principles:

- **No Greenwashing**
- **Transparency**
- **Consent & Privacy**
- **Positive Reinforcement**

Guiding philosophy:

**Encourage > Shame**  
**Enable > Lecture**  
**Measure > Exaggerate**  
**Recognise > Criticise**

## Data Integrity

ECO Vyapar intentionally distinguishes four types of information:

- **Observed Data** — directly collected from the six-shop field sample
- **Qualitative Findings** — field observations such as convenience, habit and customer expectations
- **Scenario Estimates** — calculated illustrations based on user assumptions
- **Planned Concepts** — future ideas such as a wider Green Retail Network

The project does not invent carbon-equivalent savings, city-wide impact figures or official certification claims.

## Technology Stack

- **TypeScript**
- **Vite**
- **Three.js / WebGL**
- **GSAP + ScrollTrigger**
- **Lenis**
- **Tailwind CSS**
- **Lucide icons**
- **Syne Variable** and **Manrope Variable** typography

## Design System

ECO Vyapar uses a premium climate-tech / ESG-inspired visual language:

- Deep forest dark mode
- Warm eco-light mode
- Lime sustainability accents
- Editorial typography
- Data-product dashboards
- Scroll-linked motion
- Responsive mobile fallbacks
- Reduced-motion support
- Performance-aware 3D rendering

## Running Locally

```bash
npm install
npm run dev
```

Then open the local Vite development URL shown in the terminal.

To build for production:

```bash
npm run build
```

## Repository Structure

```text
.
├── index.html
├── package.json
├── public/
│   ├── eco-vyapar-icon.svg
│   └── eco-vyapar-profile.svg
├── src/
│   ├── main.ts
│   ├── scene3d.ts
│   ├── simulator3d.ts
│   ├── parallax.ts
│   ├── charts.ts
│   ├── future.ts
│   ├── upgrade.ts
│   └── stylesheets...
├── tests/
├── vite.config.ts
├── tsconfig.json
└── LICENSE
```

## Current Project Positioning

ECO Vyapar is best described as a **functional web-based sustainability platform prototype**. It is more than a static informational website because it contains interactive tools and simulations, but it is not yet a full production platform with persistent retailer accounts, a backend database, verified live-network participation or official certification authority.

## Future Scope

- Wider retailer awareness across Gothapatna
- Follow-up measurement after 1–3 months
- Structured Green Retail Rating / recognition model
- Consumer awareness posters and campaigns
- Verified retailer participation network
- Community partnerships
- Data-informed sustainability insights
- Optional backend and account system for a future production release

## Project Vision

> **The problem exists at the local level — so does the opportunity to solve it.**

ECO Vyapar aims to make carrying a reusable bag and reducing unnecessary plastic as normal as carrying a wallet or phone.

---

**ECO Vyapar**  
*Where Local Retail Goes Green.*
