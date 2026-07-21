/**
 * Per-template sample datasets.
 *
 * Each Professional template renders its own realistic dataset so the live
 * gallery preview looks distinct and representative. These are illustrative
 * only — users overwrite them with real content in the editor.
 */

import type { ResumeData } from '@/types/resume'

export const EDGE_DATA: ResumeData = {
  personal: {
    firstName: 'Alexandra',
    lastName: 'Reyes',
    headline: 'Director of Engineering',
    email: 'alexandra.reyes@northwind.io',
    phone: '(415) 555-0173',
    location: 'Seattle, WA',
    website: 'areyes.dev',
    linkedin: 'linkedin.com/in/alexreyes',
    github: '',
    summary: 'Engineering leader with 14+ years building large-scale distributed systems and high-performing teams. Known for translating ambiguous strategy into reliable platforms that move revenue.',
    avatarUrl: null,
  },
  summary: 'Engineering leader with 14+ years building large-scale distributed systems and high-performing teams. Known for translating ambiguous strategy into reliable platforms that move revenue.',
  experience: [
    { id: 'e1', company: 'Northwind Cloud', position: 'Director of Engineering', location: 'Seattle, WA', dateRange: { startDate: '2019-04', endDate: null, current: true }, description: 'Leads 60+ engineers across 5 squads owning the core platform.\n\n• Cut p99 latency by 47% through a service-mesh migration.\n• Drove an SRE practice that lifted uptime from 99.5% to 99.98%.', highlights: [] },
    { id: 'e2', company: 'Brightwave', position: 'Senior Engineering Manager', location: 'Portland, OR', dateRange: { startDate: '2015-02', endDate: '2019-03', current: false }, description: 'Scaled the payments org from 8 to 34 engineers.\n\n• Shipped a ledger rewrite processing $2B annually.', highlights: [] },
    { id: 'e3', company: 'Cobalt Systems', position: 'Staff Software Engineer', location: 'Remote', dateRange: { startDate: '2011-06', endDate: '2015-01', current: false }, description: 'Built the real-time event pipeline still in production today.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'University of Washington', degree: 'M.S.', field: 'Computer Science', location: 'Seattle, WA', dateRange: { startDate: '2009-09', endDate: '2011-05', current: false }, gpa: '3.9', description: '', highlights: [] },
    { id: 'ed2', institution: 'UC San Diego', degree: 'B.S.', field: 'Electrical Engineering', location: 'La Jolla, CA', dateRange: { startDate: '2005-09', endDate: '2009-05', current: false }, gpa: '3.7', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Atlas Platform', description: 'Multi-region control plane powering internal developer experience for 200+ services.', technologies: ['Go', 'Kubernetes', 'gRPC'], url: 'northwind.io/atlas', githubUrl: '', dateRange: { startDate: '2020-01', endDate: null, current: true }, highlights: [] },
    { id: 'p2', name: 'Ledger Core', description: 'Event-sourced financial ledger with strict consistency guarantees.', technologies: ['Java', 'Kafka', 'Postgres'], url: '', githubUrl: '', dateRange: { startDate: '2016-03', endDate: '2018-11', current: false }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Leadership', skills: ['Org Design', 'Mentoring', 'Strategy', 'Hiring', 'Roadmapping'], level: 'expert' },
    { id: 's2', name: 'Technical', skills: ['Distributed Systems', 'Go', 'Kubernetes', 'Observability', 'Cost Optimization'], level: 'expert' },
  ],
  certifications: [
    { id: 'c1', name: 'AWS Certified Solutions Architect — Professional', issuer: 'Amazon Web Services', date: '2022-06', expirationDate: null, credentialId: 'AWS-PSA-2291', url: '' },
    { id: 'c2', name: 'Certified Kubernetes Administrator', issuer: 'CNCF', date: '2021-03', expirationDate: null, credentialId: 'CKA-7741', url: '' },
  ],
  achievements: [
    { id: 'a1', title: 'Keynote, QCon San Francisco 2023', description: 'Presented platform engineering at scale to 1,200 engineers.', date: '2023-11' },
    { id: 'a2', title: 'Patent: Adaptive Rate Limiting', description: 'US Patent 11,482,113 on dynamic throttling.', date: '2022-08' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'Spanish', proficiency: 'professional' },
    { id: 'l3', language: 'Mandarin', proficiency: 'limited' },
  ],
  interests: [{ id: 'i1', name: 'Mountaineering' }, { id: 'i2', name: 'Piano' }],
  awards: [{ id: 'aw1', title: 'Outstanding Leader Award', issuer: 'Northwind Cloud', date: '2023-01', description: 'Recognized for the platform reliability program.' }],
  publications: [{ id: 'pu1', title: 'Designing for Failure: Lessons from 99.98%', publisher: 'ACM Queue', date: '2023-04', url: 'acmqueue.com/areyes', description: 'A practitioner essay on resilient platform design.', authors: ['Alexandra Reyes'] }],
  references: [{ id: 'r1', name: 'Daniel Cho', position: 'VP Engineering', company: 'Northwind Cloud', email: 'daniel.cho@northwind.io', phone: '(415) 555-0110', relationship: 'Manager' }],
  volunteer: [{ id: 'v1', organization: 'Code for America', role: 'Technical Advisor', location: 'Seattle, WA', dateRange: { startDate: '2020-01', endDate: null, current: true }, description: 'Advises on civic tech infrastructure.', highlights: [] }],
  custom: {},
}

export const MERIDIAN_DATA: ResumeData = {
  personal: {
    firstName: 'Marcus',
    lastName: 'Bennett',
    headline: 'Management Consultant',
    email: 'marcus.bennett@meridian-cg.com',
    phone: '(212) 555-0148',
    location: 'New York, NY',
    website: '',
    linkedin: 'linkedin.com/in/marcusbennett',
    github: '',
    summary: 'Strategy consultant specializing in operating-model design and post-merger integration for Fortune 500 clients.',
    avatarUrl: null,
  },
  summary: 'Strategy consultant specializing in operating-model design and post-merger integration for Fortune 500 clients.',
  experience: [
    { id: 'e1', company: 'Meridian Consulting Group', position: 'Engagement Manager', location: 'New York, NY', dateRange: { startDate: '2018-09', endDate: null, current: true }, description: 'Leads 4–6 person teams on transformation engagements.\n\n• Delivered $120M run-rate cost takeout for a global bank.\n• Designed a target operating model adopted across 12 countries.', highlights: [] },
    { id: 'e2', company: 'Lattice Partners', position: 'Business Analyst', location: 'Chicago, IL', dateRange: { startDate: '2015-07', endDate: '2018-08', current: false }, description: 'Built market-entry models for consumer and industrial clients.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'Wharton School, UPenn', degree: 'MBA', field: 'Finance', location: 'Philadelphia, PA', dateRange: { startDate: '2013-08', endDate: '2015-05', current: false }, gpa: '3.8', description: '', highlights: [] },
    { id: 'ed2', institution: 'University of Michigan', degree: 'B.B.A.', field: 'Economics', location: 'Ann Arbor, MI', dateRange: { startDate: '2009-09', endDate: '2013-05', current: false }, gpa: '3.6', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Global Bank TOM', description: 'Operating-model redesign across retail and commercial banking.', technologies: ['Strategy', 'Org Design'], url: '', githubUrl: '', dateRange: { startDate: '2021-02', endDate: '2022-01', current: false }, highlights: [] },
    { id: 'p2', name: 'Retail Turnaround', description: 'Profitability program for a 400-store retailer.', technologies: ['Cost Reduction', 'Pricing'], url: '', githubUrl: '', dateRange: { startDate: '2019-03', endDate: '2019-12', current: false }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Strategy', skills: ['Operating Models', 'M&A Integration', 'Market Entry', 'Financial Modeling'], level: 'expert' },
    { id: 's2', name: 'Tools', skills: ['PowerPoint', 'Excel', 'Tableau', 'SQL'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'PMP', issuer: 'Project Management Institute', date: '2020-05', expirationDate: null, credentialId: 'PMP-3391', url: '' },
    { id: 'c2', name: 'Lean Six Sigma Black Belt', issuer: 'ASQ', date: '2019-09', expirationDate: null, credentialId: 'LSSBB-2210', url: '' },
  ],
  achievements: [{ id: 'a1', title: 'Top 5% Performer', description: 'Recognized firm-wide for client impact.', date: '2022-12' }],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'French', proficiency: 'professional' },
  ],
  interests: [{ id: 'i1', name: 'Sailing' }, { id: 'i2', name: 'Wine' }],
  awards: [{ id: 'aw1', title: 'Excellence in Client Service', issuer: 'Meridian Consulting Group', date: '2022-06', description: '' }],
  publications: [],
  references: [{ id: 'r1', name: 'Priya Anand', position: 'Partner', company: 'Meridian Consulting Group', email: 'priya.anand@meridian-cg.com', phone: '(212) 555-0190', relationship: 'Supervisor' }],
  volunteer: [{ id: 'v1', organization: 'Junior Achievement', role: 'Mentor', location: 'New York, NY', dateRange: { startDate: '2017-01', endDate: null, current: true }, description: 'Coaches high-school students on entrepreneurship.', highlights: [] }],
  custom: {},
}

export const ATLAS_DATA: ResumeData = {
  personal: {
    firstName: 'Sofia',
    lastName: 'Nakamura',
    headline: 'Senior Product Designer',
    email: 'sofia.nakamura@atlasdesign.co',
    phone: '(503) 555-0192',
    location: 'Portland, OR',
    website: 'sofianakamura.design',
    linkedin: 'linkedin.com/in/sofiadesign',
    github: '',
    summary: 'Product designer crafting calm, accessible interfaces for complex enterprise software.',
    avatarUrl: null,
  },
  summary: 'Product designer crafting calm, accessible interfaces for complex enterprise software.',
  experience: [
    { id: 'e1', company: 'Atlas Design Co.', position: 'Senior Product Designer', location: 'Portland, OR', dateRange: { startDate: '2020-03', endDate: null, current: true }, description: 'Owns end-to-end design for the analytics suite.\n\n• Raised task success rate from 71% to 94%.\n• Built a token system now used by 9 product teams.', highlights: [] },
    { id: 'e2', company: 'Fernlight', position: 'Product Designer', location: 'Remote', dateRange: { startDate: '2017-01', endDate: '2020-02', current: false }, description: 'Designed the onboarding flow that improved activation by 31%.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'Rhode Island School of Design', degree: 'BFA', field: 'Graphic Design', location: 'Providence, RI', dateRange: { startDate: '2012-09', endDate: '2016-05', current: false }, gpa: '3.8', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Analytics Suite Redesign', description: 'Ground-up redesign of a data-heavy enterprise dashboard.', technologies: ['Figma', 'Design Systems'], url: 'sofianakamura.design/analytics', githubUrl: '', dateRange: { startDate: '2021-01', endDate: '2022-06', current: false }, highlights: [] },
    { id: 'p2', name: 'Token Library', description: 'Open design-token system with theming support.', technologies: ['Figma', 'JSON'], url: '', githubUrl: '', dateRange: { startDate: '2022-07', endDate: null, current: true }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Craft', skills: ['Interaction Design', 'Prototyping', 'Design Systems', 'Accessibility'], level: 'expert' },
    { id: 's2', name: 'Tools', skills: ['Figma', 'Framer', 'HTML/CSS', 'User Research'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'Nielsen Norman UX Certification', issuer: 'NN/g', date: '2021-04', expirationDate: null, credentialId: 'NNG-UX-552', url: '' },
  ],
  achievements: [{ id: 'a1', title: 'Design Award, Enterprise UX', description: 'Won for the analytics suite redesign.', date: '2023-03' }],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'Japanese', proficiency: 'full' },
  ],
  interests: [{ id: 'i1', name: 'Ceramics' }, { id: 'i2', name: 'Cycling' }],
  awards: [{ id: 'aw1', title: 'Designer of the Year', issuer: 'Atlas Design Co.', date: '2023-02', description: '' }],
  publications: [{ id: 'pu1', title: 'Designing Calm Interfaces', publisher: 'Smashing Magazine', date: '2022-09', url: 'smashingmagazine.com/sofia', description: 'An essay on restraint in enterprise UI.', authors: ['Sofia Nakamura'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'AIGA', role: 'Chapter Lead', location: 'Portland, OR', dateRange: { startDate: '2018-01', endDate: null, current: true }, description: 'Runs a monthly portfolio review group.', highlights: [] }],
  custom: {},
}

export const PINNACLE_DATA: ResumeData = {
  personal: {
    firstName: 'David',
    lastName: 'Okafor',
    headline: 'Finance Manager',
    email: 'david.okafor@summitfinance.com',
    phone: '(312) 555-0166',
    location: 'Chicago, IL',
    website: '',
    linkedin: 'linkedin.com/in/davidokafor',
    github: '',
    summary: 'Finance manager with a track record of improving forecasting accuracy and capital efficiency.',
    avatarUrl: null,
  },
  summary: 'Finance manager with a track record of improving forecasting accuracy and capital efficiency.',
  experience: [
    { id: 'e1', company: 'Summit Finance', position: 'Finance Manager', location: 'Chicago, IL', dateRange: { startDate: '2019-06', endDate: null, current: true }, description: 'Leads FP&A for a $400M revenue business unit.\n\n• Improved forecast accuracy from 82% to 96%.\n• Identified $8M in annual savings through working-capital review.', highlights: [] },
    { id: 'e2', company: 'Harbor Capital', position: 'Senior Financial Analyst', location: 'Boston, MA', dateRange: { startDate: '2015-08', endDate: '2019-05', current: false }, description: 'Built the quarterly board reporting package.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'University of Chicago', degree: 'M.S.', field: 'Finance', location: 'Chicago, IL', dateRange: { startDate: '2013-09', endDate: '2015-06', current: false }, gpa: '3.9', description: '', highlights: [] },
    { id: 'ed2', institution: 'University of Illinois', degree: 'B.S.', field: 'Accountancy', location: 'Urbana, IL', dateRange: { startDate: '2009-09', endDate: '2013-05', current: false }, gpa: '3.7', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Rolling Forecast Model', description: '13-week cash-flow forecast adopted company-wide.', technologies: ['Excel', 'Power BI'], url: '', githubUrl: '', dateRange: { startDate: '2020-02', endDate: '2020-09', current: false }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Finance', skills: ['FP&A', 'Financial Modeling', 'Forecasting', 'Capital Allocation'], level: 'expert' },
    { id: 's2', name: 'Tools', skills: ['Excel', 'Power BI', 'SAP', 'SQL'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'CFA Charterholder', issuer: 'CFA Institute', date: '2018-08', expirationDate: null, credentialId: 'CFA-11923', url: '' },
    { id: 'c2', name: 'CPA', issuer: 'AICPA', date: '2016-05', expirationDate: null, credentialId: 'CPA-7741', url: '' },
  ],
  achievements: [{ id: 'a1', title: 'Finance Team of the Year', description: 'Led the team that won the internal award.', date: '2023-01' }],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'French', proficiency: 'limited' },
  ],
  interests: [{ id: 'i1', name: 'Golf' }, { id: 'i2', name: 'Chess' }],
  awards: [{ id: 'aw1', title: 'CFO Excellence Award', issuer: 'Summit Finance', date: '2022-11', description: '' }],
  publications: [],
  references: [{ id: 'r1', name: 'Helen Park', position: 'CFO', company: 'Summit Finance', email: 'helen.park@summitfinance.com', phone: '(312) 555-0122', relationship: 'Manager' }],
  volunteer: [{ id: 'v1', organization: 'Junior Achievement', role: 'Volunteer', location: 'Chicago, IL', dateRange: { startDate: '2019-01', endDate: null, current: true }, description: 'Teaches financial literacy to teens.', highlights: [] }],
  custom: {},
}

export const CADENCE_DATA: ResumeData = {
  personal: {
    firstName: 'Priya',
    lastName: 'Sharma',
    headline: 'Software Engineer',
    email: 'priya.sharma@cadence.dev',
    phone: '(408) 555-0139',
    location: 'San Jose, CA',
    website: 'priyasharma.dev',
    linkedin: 'linkedin.com/in/priyasharma',
    github: 'github.com/priyasharma',
    summary: 'Full-stack engineer focused on developer tooling and reliable APIs.',
    avatarUrl: null,
  },
  summary: 'Full-stack engineer focused on developer tooling and reliable APIs.',
  experience: [
    { id: 'e1', company: 'Cadence Labs', position: 'Software Engineer', location: 'San Jose, CA', dateRange: { startDate: '2021-07', endDate: null, current: true }, description: 'Builds the internal CLI used by 500+ engineers.\n\n• Reduced build times by 38%.\n• Authored the API contract testing framework.', highlights: [] },
    { id: 'e2', company: 'Quanta', position: 'Junior Software Engineer', location: 'Sunnyvale, CA', dateRange: { startDate: '2019-06', endDate: '2021-06', current: false }, description: 'Shipped customer-facing features for a billing product.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'San Jose State University', degree: 'B.S.', field: 'Software Engineering', location: 'San Jose, CA', dateRange: { startDate: '2015-09', endDate: '2019-05', current: false }, gpa: '3.8', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'DevKit CLI', description: 'Open-source developer CLI with plugin architecture.', technologies: ['TypeScript', 'Node.js'], url: 'github.com/priyasharma/devkit', githubUrl: 'github.com/priyasharma/devkit', dateRange: { startDate: '2022-01', endDate: null, current: true }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Languages', skills: ['TypeScript', 'Go', 'Python', 'SQL'], level: 'advanced' },
    { id: 's2', name: 'Domains', skills: ['API Design', 'Developer Tooling', 'Testing', 'CI/CD'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: '2023-02', expirationDate: null, credentialId: 'AWS-D-8891', url: '' },
  ],
  achievements: [{ id: 'a1', title: 'Open Source Maintainer', description: 'DevKit CLI surpassed 5k GitHub stars.', date: '2023-10' }],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'full' },
    { id: 'l2', language: 'Hindi', proficiency: 'native' },
  ],
  interests: [{ id: 'i1', name: 'Badminton' }, { id: 'i2', name: 'Photography' }],
  awards: [{ id: 'aw1', title: 'Rising Engineer Award', issuer: 'Cadence Labs', date: '2023-05', description: '' }],
  publications: [],
  references: [],
  volunteer: [{ id: 'v1', organization: 'Girls Who Code', role: 'Instructor', location: 'San Jose, CA', dateRange: { startDate: '2022-01', endDate: null, current: true }, description: 'Teaches web development to students.', highlights: [] }],
  custom: {},
}

export const PORTFOLIO_DATA: ResumeData = {
  personal: {
    firstName: 'Elena',
    lastName: 'Vasquez',
    headline: 'Creative Director & Brand Strategist',
    email: 'elena.vasquez@studioev.com',
    phone: '(212) 555-0247',
    location: 'Brooklyn, NY',
    website: 'studioev.com',
    linkedin: 'linkedin.com/in/elenavasquez',
    github: 'github.com/elenavasquez',
    summary: 'Award-winning creative director with 10+ years transforming brand identities for Fortune 500 startups and cultural institutions. Blends strategic thinking with meticulous craft to build campaigns that move markets and win hearts.',
    avatarUrl: null,
  },
  summary: 'Award-winning creative director with 10+ years transforming brand identities for Fortune 500 startups and cultural institutions. Blends strategic thinking with meticulous craft to build campaigns that move markets and win hearts.',
  experience: [
    { id: 'e1', company: 'Studio EV', position: 'Creative Director & Founder', location: 'Brooklyn, NY', dateRange: { startDate: '2018-01', endDate: null, current: true }, description: 'Independent creative studio serving startups and cultural institutions.\n\n• Led brand strategy and visual identity for 40+ clients across tech, fashion, and non-profit sectors.\n• Grew the studio from solo practice to a team of 6 designers.\n• Work featured in Communication Arts, AIGA Eye on Design, and It\'s Nice That.', highlights: [] },
    { id: 'e2', company: 'Lumina Brands', position: 'Senior Art Director', location: 'New York, NY', dateRange: { startDate: '2014-06', endDate: '2017-12', current: false }, description: 'Led visual direction for the flagship lifestyle brand.\n\n• Directed a complete brand refresh that increased unaided awareness by 34%.\n• Managed a team of 5 designers and 2 copywriters.', highlights: [] },
    { id: 'e3', company: 'Redwood Partners', position: 'Designer', location: 'San Francisco, CA', dateRange: { startDate: '2012-09', endDate: '2014-05', current: false }, description: 'Designed brand systems for early-stage tech companies.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'California College of the Arts', degree: 'BFA', field: 'Graphic Design', location: 'Oakland, CA', dateRange: { startDate: '2008-09', endDate: '2012-05', current: false }, gpa: '3.9', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Field Notes Rebrand', description: 'Complete visual identity overhaul for a heritage outdoor brand.', technologies: ['Brand Strategy', 'Visual Identity', 'Packaging'], url: 'studioev.com/field-notes', githubUrl: '', dateRange: { startDate: '2023-01', endDate: '2023-06', current: false }, highlights: [] },
    { id: 'p2', name: 'Atlas Design System', description: 'Open-source component library with accessibility-first tokens.', technologies: ['Figma', 'Storybook', 'CSS'], url: 'studioev.com/atlas', githubUrl: 'github.com/elenavasquez/atlas', dateRange: { startDate: '2022-03', endDate: null, current: true }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Creative Direction', skills: ['Brand Strategy', 'Art Direction', 'Campaign Planning', 'Creative Concepting', 'Storytelling'], level: 'expert' },
    { id: 's2', name: 'Design', skills: ['Visual Identity', 'Typography', 'Packaging', 'Editorial Design', 'Motion'], level: 'expert' },
    { id: 's3', name: 'Tools', skills: ['Figma', 'After Effects', 'Cinema 4D', 'Illustrator', 'InDesign'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'Brand Strategy Certificate', issuer: 'SVA NYC', date: '2021-08', expirationDate: null, credentialId: 'BSC-4412', url: '' },
  ],
  achievements: [
    { id: 'a1', title: 'AIGA 100 Best Design Projects', description: 'Selected for the annual design annual.', date: '2023-05' },
    { id: 'a2', title: 'Communication Arts Design Award', description: 'Excellence in brand identity design.', date: '2022-10' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'Spanish', proficiency: 'native' },
    { id: 'l3', language: 'French', proficiency: 'professional' },
  ],
  interests: [{ id: 'i1', name: 'Ceramics' }, { id: 'i2', name: 'Vinyl collecting' }, { id: 'i3', name: 'Architecture' }],
  awards: [{ id: 'aw1', title: 'ADC Young Gun', issuer: 'Art Directors Club', date: '2019-01', description: 'Awarded to emerging creative talent worldwide.' }],
  publications: [{ id: 'pu1', title: 'The Case for Quiet Branding', publisher: 'AIGA Eye on Design', date: '2023-03', url: 'eyeondesign.aiga.org/elena-vasquez', description: 'An essay on restraint and clarity in brand identity.', authors: ['Elena Vasquez'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'AIGA NYC', role: 'Board Member, Mentorship', location: 'New York, NY', dateRange: { startDate: '2020-01', endDate: null, current: true }, description: 'Runs the emerging-designer mentorship program.', highlights: [] }],
  custom: {},
}

export const ACCENT_DATA: ResumeData = {
  personal: {
    firstName: 'James',
    lastName: 'Hartwell',
    headline: 'Chief Technology Officer',
    email: 'james.hartwell@northlogic.io',
    phone: '(206) 555-0318',
    location: 'San Francisco, CA',
    website: 'jameshartwell.io',
    linkedin: 'linkedin.com/in/jameshartwell',
    github: 'github.com/jameshartwell',
    summary: 'CTO and engineering leader who has scaled platforms from zero to millions of users. Deep expertise in cloud infrastructure, platform engineering, and high-performing team culture.',
    avatarUrl: null,
  },
  summary: 'CTO and engineering leader who has scaled platforms from zero to millions of users. Deep expertise in cloud infrastructure, platform engineering, and high-performing team culture.',
  experience: [
    { id: 'e1', company: 'North Logic', position: 'Chief Technology Officer', location: 'San Francisco, CA', dateRange: { startDate: '2020-02', endDate: null, current: true }, description: 'Leading engineering, infrastructure, and data teams.\n\n• Scaled the platform from 10K to 1.2M users while reducing infrastructure cost by 40%.\n• Built and mentored a 45-person engineering org across 4 offices.\n• Established a security-first culture achieving SOC 2 Type II in under 8 months.', highlights: [] },
    { id: 'e2', company: 'Pulse Healthcare', position: 'VP of Engineering', location: 'Seattle, WA', dateRange: { startDate: '2016-03', endDate: '2020-01', current: false }, description: 'Led the engineering team building HIPAA-compliant telemedicine platforms.\n\n• Delivered a real-time video platform serving 500K+ consultations annually.\n• Reduced mean-time-to-recovery from 4 hours to 12 minutes.', highlights: [] },
    { id: 'e3', company: 'Dataforge', position: 'Senior Software Engineer', location: 'Portland, OR', dateRange: { startDate: '2013-01', endDate: '2016-02', current: false }, description: 'Core contributor to the distributed data pipeline.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'Stanford University', degree: 'M.S.', field: 'Computer Science', location: 'Stanford, CA', dateRange: { startDate: '2011-09', endDate: '2013-06', current: false }, gpa: '3.9', description: '', highlights: [] },
    { id: 'ed2', institution: 'University of Washington', degree: 'B.S.', field: 'Computer Engineering', location: 'Seattle, WA', dateRange: { startDate: '2007-09', endDate: '2011-06', current: false }, gpa: '3.8', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Infra-as-Code Platform', description: 'Internal platform for self-service infrastructure provisioning used by 400+ engineers.', technologies: ['Terraform', 'Kubernetes', 'Crossplane', 'Go'], url: '', githubUrl: '', dateRange: { startDate: '2021-04', endDate: '2022-08', current: false }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Leadership', skills: ['Org Design', 'Technical Strategy', 'Mentoring', 'Budgeting', 'Culture Building'], level: 'expert' },
    { id: 's2', name: 'Infrastructure', skills: ['Kubernetes', 'AWS', 'Terraform', 'Observability', 'Security'], level: 'expert' },
    { id: 's3', name: 'Development', skills: ['Go', 'Python', 'Rust', 'Distributed Systems', 'API Design'], level: 'expert' },
  ],
  certifications: [
    { id: 'c1', name: 'AWS Certified Solutions Architect — Professional', issuer: 'Amazon Web Services', date: '2022-11', expirationDate: null, credentialId: 'AWS-PRO-7712', url: '' },
    { id: 'c2', name: 'Certified Kubernetes Administrator', issuer: 'CNCF', date: '2021-08', expirationDate: null, credentialId: 'CKA-8823', url: '' },
  ],
  achievements: [
    { id: 'a1', title: 'Built SOC 2 Compliant Infrastructure', description: 'Achieved SOC 2 Type II certification in under 8 months.', date: '2022-06' },
    { id: 'a2', title: 'Keynote Speaker, KubeCon 2023', description: 'Presented platform engineering lessons to 3,000 attendees.', date: '2023-11' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'German', proficiency: 'professional' },
  ],
  interests: [{ id: 'i1', name: 'Sailing' }, { id: 'i2', name: 'Classical guitar' }],
  awards: [{ id: 'aw1', title: 'Engineering Excellence Award', issuer: 'North Logic', date: '2023-03', description: 'Recognised for infrastructure transformation and team growth.' }],
  publications: [{ id: 'pu1', title: 'Platform Engineering at Scale: Lessons from 1M Users', publisher: 'ACM Queue', date: '2024-01', url: 'queue.acm.org/hartwell', description: 'A practitioner case study on internal developer platforms.', authors: ['James Hartwell', 'Maria Chen'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'Code.org', role: 'Technical Advisor', location: 'Remote', dateRange: { startDate: '2021-01', endDate: null, current: true }, description: 'Advises on K-12 computer science curriculum development.', highlights: [] }],
  custom: {},
}

export const MAGAZINE_DATA: ResumeData = {
  personal: {
    firstName: 'Aisha',
    lastName: 'Okonkwo',
    headline: 'Investigative Journalist & Media Strategist',
    email: 'aisha.okonkwo@protonmail.com',
    phone: '+44 20 7946 0238',
    location: 'London, UK',
    website: 'aishaokonkwo.co.uk',
    linkedin: 'linkedin.com/in/aishaokonkwo',
    github: '',
    summary: 'Multi-award-winning investigative journalist with 12 years covering technology policy, human rights, and global health. Published in The Guardian, The Atlantic, and Reuters. Now building independent media strategies for non-profit organisations.',
    avatarUrl: null,
  },
  summary: 'Multi-award-winning investigative journalist with 12 years covering technology policy, human rights, and global health. Published in The Guardian, The Atlantic, and Reuters. Now building independent media strategies for non-profit organisations.',
  experience: [
    { id: 'e1', company: 'The Guardian', position: 'Senior Investigative Reporter', location: 'London, UK', dateRange: { startDate: '2019-02', endDate: null, current: true }, description: 'Investigates technology policy, surveillance, and digital rights.\n\n• Led a 14-month investigation into algorithmic bias in UK public services — read 25M+ times.\n• Finalist for the Orwell Prize for Political Writing, 2023.\n• Broke stories that led to two parliamentary inquiries.', highlights: [] },
    { id: 'e2', company: 'Reuters', position: 'Correspondent, West Africa', location: 'Lagos, Nigeria', dateRange: { startDate: '2015-04', endDate: '2019-01', current: false }, description: 'Covered politics, public health, and technology across 12 countries.\n\n• Reported on the Ebola and Lassa fever outbreaks for a global audience.\n• Won the Kurt Schork Award for International Reporting.', highlights: [] },
    { id: 'e3', company: 'The Atlantic', position: 'Contributing Writer', location: 'Washington, D.C.', dateRange: { startDate: '2013-01', endDate: '2015-03', current: false }, description: 'Wrote long-form features on technology and society.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'London School of Economics', degree: 'M.Sc.', field: 'International Relations', location: 'London, UK', dateRange: { startDate: '2011-09', endDate: '2012-09', current: false }, gpa: 'Distinction', description: '', highlights: [] },
    { id: 'ed2', institution: 'University of Ibadan', degree: 'B.A.', field: 'English Literature', location: 'Ibadan, Nigeria', dateRange: { startDate: '2007-10', endDate: '2011-06', current: false }, gpa: 'First Class', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Digital Rights Tracker', description: 'Open-source platform tracking legislation affecting digital rights across Africa.', technologies: ['Research', 'Data Journalism'], url: 'digitalrightstracker.org', githubUrl: '', dateRange: { startDate: '2022-01', endDate: null, current: true }, highlights: [] },
    { id: 'p2', name: 'The Privacy Papers', description: 'A podcast series exploring the human impact of surveillance technology.', technologies: ['Audio Production', 'Investigative Journalism'], url: '', githubUrl: '', dateRange: { startDate: '2021-03', endDate: '2022-12', current: false }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Journalism', skills: ['Investigative Reporting', 'Data Journalism', 'Feature Writing', 'Editing', 'Fact-Checking'], level: 'expert' },
    { id: 's2', name: 'Media', skills: ['Media Strategy', 'Crisis Comms', 'Podcast Production', 'Documentary'], level: 'advanced' },
    { id: 's3', name: 'Languages', skills: ['English', 'Yoruba', 'French', 'Hausa'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'Data Journalism Certificate', issuer: 'European Journalism Centre', date: '2020-06', expirationDate: null, credentialId: 'DJC-8841', url: '' },
  ],
  achievements: [
    { id: 'a1', title: 'Orwell Prize for Political Writing (Finalist)', description: 'For the algorithmic bias investigation series.', date: '2023-05' },
    { id: 'a2', title: 'Kurt Schork Award in International Reporting', description: 'For coverage of the West Africa health crisis.', date: '2017-10' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'Yoruba', proficiency: 'native' },
    { id: 'l3', language: 'French', proficiency: 'full' },
    { id: 'l4', language: 'Hausa', proficiency: 'professional' },
  ],
  interests: [{ id: 'i1', name: 'Vinyl records' }, { id: 'i2', name: 'Birdwatching' }, { id: 'i3', name: 'Sailing' }],
  awards: [{ id: 'aw1', title: 'British Press Awards — Reporter of the Year (Nominee)', issuer: 'Society of Editors', date: '2024-02', description: '' }],
  publications: [{ id: 'pu1', title: 'The Black Box of British Welfare', publisher: 'The Guardian Long Read', date: '2023-04', url: 'theguardian.com/okonkwo', description: 'A 12,000-word investigation into automated decision-making in public services.', authors: ['Aisha Okonkwo'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'Committee to Protect Journalists', role: 'Emergency Response Volunteer', location: 'Remote', dateRange: { startDate: '2020-01', endDate: null, current: true }, description: 'Provides rapid support to journalists under threat.', highlights: [] }],
  custom: {},
}

export const DESIGNER_DATA: ResumeData = {
  personal: {
    firstName: 'Lucas',
    lastName: 'Moreau',
    headline: 'Principal Product Designer',
    email: 'lucas.moreau@hey.com',
    phone: '(416) 555-0476',
    location: 'Toronto, ON',
    website: 'lucasmoreau.design',
    linkedin: 'linkedin.com/in/lucasmoreau',
    github: 'github.com/lucasmoreau',
    summary: 'Principal product designer who turns complex workflows into intuitive experiences. 12 years in SaaS, fintech, and developer tools. Design systems thinker and accessibility advocate.',
    avatarUrl: null,
  },
  summary: 'Principal product designer who turns complex workflows into intuitive experiences. 12 years in SaaS, fintech, and developer tools. Design systems thinker and accessibility advocate.',
  experience: [
    { id: 'e1', company: 'Torch Software', position: 'Principal Product Designer', location: 'Toronto, ON', dateRange: { startDate: '2021-04', endDate: null, current: true }, description: 'Design lead for the core platform experience.\n\n• Led the redesign of the analytics dashboard — NPS improved from 12 to 54.\n• Established a design review culture that reduced UI bugs by 60%.\n• Built and maintained the company design system used across 4 product lines.', highlights: [] },
    { id: 'e2', company: 'Clear Finance', position: 'Senior Product Designer', location: 'Toronto, ON', dateRange: { startDate: '2018-02', endDate: '2021-03', current: false }, description: 'Designed a B2B payments platform for mid-market businesses.\n\n• Shipped a new onboarding flow that cut time-to-first-transaction by 70%.\n• Conducted 80+ user research sessions across 4 countries.', highlights: [] },
    { id: 'e3', company: 'Railstack', position: 'Product Designer', location: 'Montreal, QC', dateRange: { startDate: '2015-06', endDate: '2018-01', current: false }, description: 'Designed developer tools for the API platform.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'OCAD University', degree: 'B.Des', field: 'Industrial Design', location: 'Toronto, ON', dateRange: { startDate: '2010-09', endDate: '2014-05', current: false }, gpa: '3.8', description: '', highlights: [] },
    { id: 'ed2', institution: 'Concordia University', degree: 'Diploma', field: 'Interaction Design', location: 'Montreal, QC', dateRange: { startDate: '2014-09', endDate: '2015-05', current: false }, gpa: '', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Starlight Design System', description: 'A comprehensive, accessible design system powering 4 products across web and mobile.', technologies: ['React', 'Figma', 'Storybook', 'Radix UI'], url: 'lucasmoreau.design/starlight', githubUrl: 'github.com/lucasmoreau/starlight', dateRange: { startDate: '2021-06', endDate: null, current: true }, highlights: [] },
    { id: 'p2', name: 'Flow — UX Research Repository', description: 'Open-source tool for organising and synthesising user research findings.', technologies: ['Next.js', 'Supabase', 'Tailwind'], url: 'flow-research.dev', githubUrl: 'github.com/lucasmoreau/flow', dateRange: { startDate: '2023-01', endDate: null, current: true }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Design', skills: ['Product Design', 'Interaction Design', 'Design Systems', 'Prototyping', 'User Research'], level: 'expert' },
    { id: 's2', name: 'Engineering', skills: ['React', 'TypeScript', 'CSS', 'Storybook', 'Figma API'], level: 'advanced' },
    { id: 's3', name: 'Leadership', skills: ['Design Critique', 'Mentoring', 'Cross-functional Collaboration', 'Hiring'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'IAAP Certified Professional in Accessibility Core Competencies', issuer: 'IAAP', date: '2023-06', expirationDate: null, credentialId: 'CPACC-9921', url: '' },
    { id: 'c2', name: 'Nielsen Norman UX Master Certificate', issuer: 'NN/g', date: '2022-03', expirationDate: null, credentialId: 'NNM-5512', url: '' },
  ],
  achievements: [
    { id: 'a1', title: 'Starlight Design System — Open Sourced', description: 'Design system adopted by 12 external products since launch.', date: '2023-09' },
    { id: 'a2', title: 'Speaker, Config 2024', description: 'Presented accessible design systems at Figma\'s annual conference.', date: '2024-05' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'French', proficiency: 'native' },
    { id: 'l3', language: 'Spanish', proficiency: 'professional' },
  ],
  interests: [{ id: 'i1', name: 'Typography' }, { id: 'i2', name: 'Jazz guitar' }, { id: 'i3', name: 'Cycling' }],
  awards: [{ id: 'aw1', title: 'Design Leader of the Year (Finalist)', issuer: 'UX Awards Canada', date: '2024-02', description: '' }],
  publications: [{ id: 'pu1', title: 'Building Accessible Design Systems at Scale', publisher: 'Smashing Magazine', date: '2023-10', url: 'smashingmagazine.com/lucas-moreau', description: 'A practical guide to weaving accessibility into design system components.', authors: ['Lucas Moreau'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'Accessibility Toronto', role: 'Workshop Facilitator', location: 'Toronto, ON', dateRange: { startDate: '2022-01', endDate: null, current: true }, description: 'Runs monthly accessibility audits and training for local startups.', highlights: [] }],
  custom: {},
}

export const MODERN_CREATIVE_DATA: ResumeData = {
  personal: {
    firstName: 'Zara',
    lastName: 'Al-Jamil',
    headline: 'Senior Product Manager',
    email: 'zara.aljamil@bridgeproduct.co',
    phone: '(510) 555-0682',
    location: 'Oakland, CA',
    website: 'zaraaljamil.com',
    linkedin: 'linkedin.com/in/zaraaljamil',
    github: 'github.com/zaraaljamil',
    summary: 'Senior product manager with a track record of launching AI-powered products used by millions. Combines deep technical understanding with user empathy to ship products that solve real problems.',
    avatarUrl: null,
  },
  summary: 'Senior product manager with a track record of launching AI-powered products used by millions. Combines deep technical understanding with user empathy to ship products that solve real problems.',
  experience: [
    { id: 'e1', company: 'Bridge Products', position: 'Senior Product Manager', location: 'Oakland, CA', dateRange: { startDate: '2022-01', endDate: null, current: true }, description: 'Leading product for the AI-assisted writing platform.\n\n• Launched the AI co-pilot feature — drove 40% increase in DAU within 6 weeks.\n• Led a cross-functional team of 8 engineers and 2 designers using Shape Up methodology.\n• Grew monthly active users from 80K to 550K through iterative feature releases.', highlights: [] },
    { id: 'e2', company: 'Cortex Analytics', position: 'Product Manager', location: 'San Francisco, CA', dateRange: { startDate: '2019-04', endDate: '2021-12', current: false }, description: 'Product lead for the embedded analytics SDK.\n\n• Launched the self-serve analytics dashboard used by 200+ B2B customers.\n• Drove a 25% reduction in churn through a customer health score initiative.', highlights: [] },
    { id: 'e3', company: 'Modus', position: 'Associate Product Manager', location: 'San Francisco, CA', dateRange: { startDate: '2017-07', endDate: '2019-03', current: false }, description: 'Worked on the developer API platform.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'UC Berkeley, Haas School of Business', degree: 'MBA', field: 'Product Management', location: 'Berkeley, CA', dateRange: { startDate: '2015-08', endDate: '2017-05', current: false }, gpa: '3.9', description: '', highlights: [] },
    { id: 'ed2', institution: 'Massachusetts Institute of Technology', degree: 'B.S.', field: 'Computer Science & Engineering', location: 'Cambridge, MA', dateRange: { startDate: '2011-09', endDate: '2015-06', current: false }, gpa: '3.7', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'AI Co-Pilot Launch', description: 'Led the discovery, prototyping, and launch of an AI-assisted writing feature.', technologies: ['Product Strategy', 'ML', 'React', 'OpenAI'], url: '', githubUrl: '', dateRange: { startDate: '2022-06', endDate: '2023-03', current: false }, highlights: [] },
    { id: 'p2', name: 'Growth Experimentation Framework', description: 'Built a systematic A/B testing infrastructure enabling 100+ concurrent experiments.', technologies: ['Analytics', 'Feature Flags', 'Statistics'], url: '', githubUrl: '', dateRange: { startDate: '2023-04', endDate: null, current: true }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Product', skills: ['Product Strategy', 'Roadmapping', 'User Research', 'A/B Testing', 'OKRs', 'Analytics'], level: 'expert' },
    { id: 's2', name: 'Technical', skills: ['SQL', 'Python', 'ML Fundamentals', 'API Design', 'Systems Thinking'], level: 'advanced' },
    { id: 's3', name: 'Leadership', skills: ['Cross-functional Leadership', 'Mentoring', 'Stakeholder Management', 'Hiring'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'Machine Learning for Products', issuer: 'Stanford Online', date: '2023-08', expirationDate: null, credentialId: 'MLP-7723', url: '' },
    { id: 'c2', name: 'Pragmatic Certified Product Manager', issuer: 'Pragmatic Institute', date: '2022-06', expirationDate: null, credentialId: 'PCPM-9923', url: '' },
  ],
  achievements: [
    { id: 'a1', title: 'Product Launch of the Year', description: 'Awarded for the AI co-pilot launch at Bridge Products.', date: '2023-12' },
    { id: 'a2', title: 'Speaker, ProductCon 2024', description: 'Presented AI product management best practices to 1,000+ PMs.', date: '2024-04' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'Arabic', proficiency: 'native' },
    { id: 'l3', language: 'French', proficiency: 'professional' },
  ],
  interests: [{ id: 'i1', name: 'Trail running' }, { id: 'i2', name: 'Documentary films' }, { id: 'i3', name: 'Urban farming' }],
  awards: [{ id: 'aw1', title: 'Women in Product — Rising Star Award', issuer: 'Women in Product', date: '2024-03', description: 'Acknowledged for leadership in AI product management.' }],
  publications: [{ id: 'pu1', title: 'Shipping AI Products Users Actually Trust', publisher: 'Mind the Product', date: '2024-02', url: 'mindtheproduct.com/zara-aljamil', description: 'A framework for building trustworthy AI features.', authors: ['Zara Al-Jamil'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'Techbridge Girls', role: 'Product Mentor', location: 'Oakland, CA', dateRange: { startDate: '2022-01', endDate: null, current: true }, description: 'Mentors middle-school girls exploring STEM careers through product thinking.', highlights: [] }],
  custom: {},
}

export const SOFTWARE_ENGINEER_DATA: ResumeData = {
  personal: {
    firstName: 'Ravi',
    lastName: 'Sundaram',
    headline: 'Senior Software Engineer, Backend',
    email: 'ravi.sundaram@outlook.com',
    phone: '(408) 555-0912',
    location: 'San Jose, CA',
    website: 'ravisundaram.dev',
    linkedin: 'linkedin.com/in/ravisundaram',
    github: 'github.com/ravisundaram',
    summary: 'Backend engineer with 8 years building high-throughput, low-latency systems. Expert in distributed data pipelines and API design. Passionate about performance optimisation and clean architecture.',
    avatarUrl: null,
  },
  summary: 'Backend engineer with 8 years building high-throughput, low-latency systems. Expert in distributed data pipelines and API design. Passionate about performance optimisation and clean architecture.',
  experience: [
    { id: 'e1', company: 'Streamline Data', position: 'Senior Software Engineer', location: 'San Jose, CA', dateRange: { startDate: '2021-03', endDate: null, current: true }, description: 'Building the real-time event processing platform.\n\n• Designed a Kafka-backed pipeline processing 2M+ events/sec with p99 latency under 50ms.\n• Migrated 40 microservices from monolith to service mesh, reducing deployment time by 70%.\n• Mentored 4 junior engineers through the onboarding process.', highlights: [] },
    { id: 'e2', company: 'Cortex', position: 'Software Engineer', location: 'Sunnyvale, CA', dateRange: { startDate: '2018-02', endDate: '2021-02', current: false }, description: 'Core contributor for the analytics ingestion API.\n\n• Rewrote the REST API in Go, cutting p50 latency from 300ms to 45ms.\n• Built a circuit-breaker library adopted across 12 services.', highlights: [] },
    { id: 'e3', company: 'Helix', position: 'Junior Software Engineer', location: 'Santa Clara, CA', dateRange: { startDate: '2016-06', endDate: '2018-01', current: false }, description: 'Contributed to the CI/CD platform used by 200+ developers.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'Carnegie Mellon University', degree: 'M.S.', field: 'Software Engineering', location: 'Pittsburgh, PA', dateRange: { startDate: '2014-09', endDate: '2016-05', current: false }, gpa: '3.9', description: '', highlights: [] },
    { id: 'ed2', institution: 'Indian Institute of Technology, Bombay', degree: 'B.Tech', field: 'Computer Science', location: 'Mumbai, India', dateRange: { startDate: '2010-08', endDate: '2014-06', current: false }, gpa: '3.8', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Helios — Distributed Task Queue', description: 'Open-source task queue with priority scheduling, retries, and observability built in.', technologies: ['Go', 'Redis', 'gRPC', 'Prometheus'], url: 'github.com/ravisundaram/helios', githubUrl: 'github.com/ravisundaram/helios', dateRange: { startDate: '2022-06', endDate: null, current: true }, highlights: [] },
    { id: 'p2', name: 'K9 — Kubernetes Dashboard CLI', description: 'Terminal-based Kubernetes monitoring tool inspired by k9s, built in Rust.', technologies: ['Rust', 'Kubernetes', 'Tokio'], url: 'github.com/ravisundaram/k9', githubUrl: 'github.com/ravisundaram/k9', dateRange: { startDate: '2023-01', endDate: '2023-08', current: false }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Languages', skills: ['Go', 'Rust', 'Python', 'Java', 'TypeScript'], level: 'expert' },
    { id: 's2', name: 'Infrastructure', skills: ['Kafka', 'Kubernetes', 'Docker', 'Terraform', 'Prometheus'], level: 'advanced' },
    { id: 's3', name: 'Systems', skills: ['Distributed Systems', 'API Design', 'Database Internals', 'Performance Optimisation'], level: 'expert' },
  ],
  certifications: [
    { id: 'c1', name: 'Google Cloud Professional Data Engineer', issuer: 'Google Cloud', date: '2023-04', expirationDate: null, credentialId: 'GCP-DE-7712', url: '' },
    { id: 'c2', name: 'Confluent Certified Developer for Apache Kafka', issuer: 'Confluent', date: '2022-11', expirationDate: null, credentialId: 'CCDAK-3341', url: '' },
  ],
  achievements: [
    { id: 'a1', title: '2M Events/sec Pipeline', description: 'Designed and delivered the highest-throughput pipeline in the company.', date: '2023-06' },
    { id: 'a2', title: 'Open Source Contributor of the Year', description: 'Awarded for contributions to the Go ecosystem.', date: '2022-12' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'full' },
    { id: 'l2', language: 'Tamil', proficiency: 'native' },
    { id: 'l3', language: 'Hindi', proficiency: 'native' },
  ],
  interests: [{ id: 'i1', name: 'Chess' }, { id: 'i2', name: 'Trail running' }, { id: 'i3', name: 'Home roasting coffee' }],
  awards: [{ id: 'aw1', title: 'Engineering Excellence Award', issuer: 'Streamline Data', date: '2023-12', description: 'For the real-time pipeline architecture and delivery.' }],
  publications: [{ id: 'pu1', title: 'Building Resilient Event Pipelines with Kafka', publisher: 'InfoQ', date: '2023-08', url: 'infoq.com/articles/resilient-kafka-pipelines', description: 'A technical deep-dive into the architectural patterns behind high-throughput event processing.', authors: ['Ravi Sundaram'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'First Robotics', role: 'Technical Mentor', location: 'San Jose, CA', dateRange: { startDate: '2019-01', endDate: null, current: true }, description: 'Mentors high-school robotics teams on software architecture.', highlights: [] }],
  custom: {},
}

export const FULLSTACK_DATA: ResumeData = {
  personal: {
    firstName: 'Morgan',
    lastName: 'Chen',
    headline: 'Full Stack Developer',
    email: 'morgan.chen@hey.dev',
    phone: '(503) 555-0821',
    location: 'Portland, OR',
    website: 'morganchen.dev',
    linkedin: 'linkedin.com/in/morganchen',
    github: 'github.com/morganchen',
    summary: 'Full stack developer passionate about building delightful web experiences. Proficient across the entire JS/TS ecosystem with a focus on React, Node.js, and serverless architectures. Open-source contributor and technical writer.',
    avatarUrl: null,
  },
  summary: 'Full stack developer passionate about building delightful web experiences. Proficient across the entire JS/TS ecosystem with a focus on React, Node.js, and serverless architectures. Open-source contributor and technical writer.',
  experience: [
    { id: 'e1', company: 'Pinwheel Studios', position: 'Senior Full Stack Developer', location: 'Remote', dateRange: { startDate: '2021-05', endDate: null, current: true }, description: 'Building the next-generation collaborative design platform.\n\n• Architected the real-time collaboration engine using CRDTs and WebSockets — supports 500+ concurrent users.\n• Built a plugin system with a sandboxed runtime that enabled 60+ community extensions.\n• Reduced CI pipeline from 18 min to 4 min via layered caching and test parallelisation.', highlights: [] },
    { id: 'e2', company: 'Sparrow Health', position: 'Full Stack Developer', location: 'Portland, OR', dateRange: { startDate: '2019-02', endDate: '2021-04', current: false }, description: 'Built patient-facing web applications for a telehealth startup.\n\n• Delivered the video appointment booking flow used by 200K+ patients monthly.\n• Migrated the frontend from Angular to React, reducing bundle size by 55%.', highlights: [] },
    { id: 'e3', company: 'Digital Forge', position: 'Junior Developer', location: 'Portland, OR', dateRange: { startDate: '2017-08', endDate: '2019-01', current: false }, description: 'Built and maintained internal tools and customer-facing dashboards.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'Oregon State University', degree: 'B.S.', field: 'Computer Science', location: 'Corvallis, OR', dateRange: { startDate: '2013-09', endDate: '2017-06', current: false }, gpa: '3.7', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Prism — Design System Toolkit', description: 'Open-source component library and documentation generator for design systems.', technologies: ['React', 'TypeScript', 'Storybook', 'Tailwind'], url: 'prism-ds.dev', githubUrl: 'github.com/morganchen/prism', dateRange: { startDate: '2022-01', endDate: null, current: true }, highlights: [] },
    { id: 'p2', name: 'Retro — Sprint Retrospective Tool', description: 'A real-time retrospective board for remote teams with anonymous voting.', technologies: ['Next.js', 'Supabase', 'PartyKit'], url: 'retro-app.dev', githubUrl: 'github.com/morganchen/retro', dateRange: { startDate: '2023-06', endDate: '2024-01', current: false }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Framer Motion', 'Storybook'], level: 'expert' },
    { id: 's2', name: 'Backend', skills: ['Node.js', 'Python', 'GraphQL', 'PostgreSQL', 'Redis', 'Serverless'], level: 'advanced' },
    { id: 's3', name: 'DevOps', skills: ['AWS', 'Docker', 'Vercel', 'GitHub Actions', 'Terraform'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'AWS Certified Developer — Associate', issuer: 'Amazon Web Services', date: '2023-03', expirationDate: null, credentialId: 'AWS-DA-8832', url: '' },
    { id: 'c2', name: 'HashiCorp Certified Terraform Associate', issuer: 'HashiCorp', date: '2022-09', expirationDate: null, credentialId: 'TFA-4421', url: '' },
  ],
  achievements: [
    { id: 'a1', title: 'Prism — 5K GitHub Stars', description: 'Open-source design system toolkit reached 5K stars on GitHub.', date: '2024-02' },
    { id: 'a2', title: 'Conference Talk — Reactathon 2023', description: 'Presented Building Real-Time Apps with CRDTs.', date: '2023-05' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'Mandarin Chinese', proficiency: 'full' },
  ],
  interests: [{ id: 'i1', name: 'Open source' }, { id: 'i2', name: 'Digital art' }, { id: 'i3', name: 'Snowboarding' }],
  awards: [{ id: 'aw1', title: 'OSS Contributor Award', issuer: 'Pinwheel Studios', date: '2023-11', description: 'Recognised for community contributions and Prism adoption.' }],
  publications: [{ id: 'pu1', title: 'CRDTs in Practice: Building Collaborative Features', publisher: 'CSS-Tricks', date: '2024-01', url: 'css-tricks.com/crdts-in-practice', description: 'A hands-on guide to implementing conflict-free replicated data types in the browser.', authors: ['Morgan Chen'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'Free Code Camp Portland', role: 'Mentor & Workshop Lead', location: 'Portland, OR', dateRange: { startDate: '2022-01', endDate: null, current: true }, description: 'Leads weekly workshops on React and TypeScript for career-changers.', highlights: [] }],
  custom: {},
}

export const ENG_PORTFOLIO_DATA: ResumeData = {
  personal: {
    firstName: 'Daniel',
    lastName: 'Park',
    headline: 'Staff Engineer, Frontend Platform',
    email: 'daniel.park@staff.engineer',
    phone: '(206) 555-0734',
    location: 'Seattle, WA',
    website: 'danielpark.engineer',
    linkedin: 'linkedin.com/in/danielpark',
    github: 'github.com/danielpark',
    summary: 'Staff engineer focused on frontend infrastructure and developer experience. Builds tools that make other engineers faster. Specialises in build tooling, design systems, and performance at scale.',
    avatarUrl: null,
  },
  summary: 'Staff engineer focused on frontend infrastructure and developer experience. Builds tools that make other engineers faster. Specialises in build tooling, design systems, and performance at scale.',
  experience: [
    { id: 'e1', company: 'Omni Inc.', position: 'Staff Frontend Engineer', location: 'Seattle, WA', dateRange: { startDate: '2020-01', endDate: null, current: true }, description: 'Frontend platform team — building the foundation for 150+ frontend engineers.\n\n• Designed a module federation architecture that cut cold-start times by 60%.\n• Led the migration from Webpack to Turbopack, reducing build times by 80%.\n• Created an observability framework tracking 200+ Core Web Vitals metrics daily.', highlights: [] },
    { id: 'e2', company: 'Lumina', position: 'Senior Frontend Engineer', location: 'Seattle, WA', dateRange: { startDate: '2017-03', endDate: '2019-12', current: false }, description: 'Built the design system and component library.\n\n• Shipped 80+ accessible, themeable components adopted across 4 product teams.\n• Introduced visual regression testing, catching 200+ regressions before production.', highlights: [] },
    { id: 'e3', company: 'Nucleus Software', position: 'Frontend Engineer', location: 'Redmond, WA', dateRange: { startDate: '2014-09', endDate: '2017-02', current: false }, description: 'Built customer-facing web applications for enterprise collaboration tools.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'University of Washington', degree: 'B.S.', field: 'Computer Science & Engineering', location: 'Seattle, WA', dateRange: { startDate: '2010-09', endDate: '2014-06', current: false }, gpa: '3.9', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Vite Plugin Shell', description: 'Build tool for micro-frontend orchestration with zero-config module federation support.', technologies: ['Vite', 'TypeScript', 'Rollup', 'Node.js'], url: 'github.com/danielpark/vite-plugin-shell', githubUrl: 'github.com/danielpark/vite-plugin-shell', dateRange: { startDate: '2022-08', endDate: null, current: true }, highlights: [] },
    { id: 'p2', name: 'StatsDash', description: 'Real-time dashboard tracking Core Web Vitals across 20+ production endpoints.', technologies: ['React', 'D3', 'WebSockets', 'ClickHouse'], url: 'statsdash.dev', githubUrl: '', dateRange: { startDate: '2023-01', endDate: '2023-09', current: false }, highlights: [] },
    { id: 'p3', name: 'Focal — Image Optimisation Service', description: 'Edge-deployed image optimisation service using WebAssembly for fast transforms.', technologies: ['Rust', 'WASM', 'Cloudflare Workers', 'Sharp'], url: '', githubUrl: 'github.com/danielpark/focal', dateRange: { startDate: '2021-06', endDate: '2022-04', current: false }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'Webpack', 'Vite', 'CSS'], level: 'expert' },
    { id: 's2', name: 'Infrastructure', skills: ['Module Federation', 'Build Tooling', 'Performance', 'Observability', 'CI/CD'], level: 'expert' },
    { id: 's3', name: 'Languages', skills: ['TypeScript', 'Rust', 'Go', 'Python'], level: 'advanced' },
  ],
  certifications: [],
  achievements: [
    { id: 'a1', title: '80% Build-Time Reduction', description: 'Led the migration to Turbopack, saving 1,500+ engineer-hours per year.', date: '2023-11' },
    { id: 'a2', title: 'JSConf US Speaker', description: 'Presented on frontend performance at scale.', date: '2023-06' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'Korean', proficiency: 'native' },
  ],
  interests: [{ id: 'i1', name: 'Photography' }, { id: 'i2', name: 'Hiking' }],
  awards: [{ id: 'aw1', title: 'Distinguished Engineer Award', issuer: 'Omni Inc.', date: '2023-12', description: 'For contributions to frontend infrastructure and developer productivity.' }],
  publications: [{ id: 'pu1', title: 'Micro-Frontends at Scale: A Module Federation Case Study', publisher: 'Smashing Magazine', date: '2024-03', url: 'smashingmagazine.com/daniel-park', description: 'A detailed case study on scaling frontend architecture with module federation.', authors: ['Daniel Park'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'Seattle JS Meetup', role: 'Organiser', location: 'Seattle, WA', dateRange: { startDate: '2018-01', endDate: null, current: true }, description: 'Organises monthly talks and workshops for the local JavaScript community.', highlights: [] }],
  custom: {},
}

export const DEVOPS_DATA: ResumeData = {
  personal: {
    firstName: 'Naomi',
    lastName: 'Osei',
    headline: 'DevOps & Platform Engineer',
    email: 'naomi.osei@platform.sh',
    phone: '+353 1 555 0783',
    location: 'Dublin, Ireland',
    website: 'naomiosei.dev',
    linkedin: 'linkedin.com/in/naomiosei',
    github: 'github.com/naomiosei',
    summary: 'Platform engineer specialising in cloud infrastructure, Kubernetes, and developer workflows. Passionate about building internal developer platforms that make deployment boring and reliable.',
    avatarUrl: null,
  },
  summary: 'Platform engineer specialising in cloud infrastructure, Kubernetes, and developer workflows. Passionate about building internal developer platforms that make deployment boring and reliable.',
  experience: [
    { id: 'e1', company: 'Nimbus Cloud', position: 'Senior Platform Engineer', location: 'Dublin, Ireland', dateRange: { startDate: '2022-02', endDate: null, current: true }, description: 'Building the internal developer platform for 300+ engineers.\n\n• Designed a self-service Kubernetes platform reducing new-service setup from weeks to hours.\n• Implemented a cluster-autoscaling strategy that cut infrastructure costs by 35%.\n• Led the adoption of GitOps across 80+ microservices using ArgoCD.', highlights: [] },
    { id: 'e2', company: 'Tower Health', position: 'DevOps Engineer', location: 'Dublin, Ireland', dateRange: { startDate: '2019-04', endDate: '2022-01', current: false }, description: 'Managed the AWS infrastructure for a health-tech platform.\n\n• Migrated 60 services from EC2 to EKS with zero downtime.\n• Built a comprehensive monitoring stack with Datadog and PagerDuty.', highlights: [] },
    { id: 'e3', company: 'Redcat Software', position: 'Systems Administrator', location: 'Cork, Ireland', dateRange: { startDate: '2016-09', endDate: '2019-03', current: false }, description: 'Managed on-premise and cloud infrastructure for a SaaS company.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'University College Dublin', degree: 'B.Sc.', field: 'Computer Science', location: 'Dublin, Ireland', dateRange: { startDate: '2012-09', endDate: '2016-06', current: false }, gpa: 'First Class Honours', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'KubeForge', description: 'Internal developer portal with service catalog, scorecards, and self-service actions.', technologies: ['Backstage', 'Kubernetes', 'Go', 'PostgreSQL'], url: '', githubUrl: '', dateRange: { startDate: '2022-06', endDate: null, current: true }, highlights: [] },
    { id: 'p2', name: 'Terraform Module Registry', description: 'Curated library of reusable Terraform modules for common infrastructure patterns.', technologies: ['Terraform', 'AWS', 'GCP', 'CI/CD'], url: '', githubUrl: 'github.com/naomiosei/tf-registry', dateRange: { startDate: '2021-03', endDate: '2022-05', current: false }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Cloud', skills: ['AWS', 'GCP', 'Azure', 'Terraform', 'Crossplane'], level: 'expert' },
    { id: 's2', name: 'Kubernetes', skills: ['EKS', 'GKE', 'Helm', 'ArgoCD', 'Istio', 'Kyverno'], level: 'expert' },
    { id: 's3', name: 'Platform', skills: ['Backstage', 'GitOps', 'Observability', 'Prometheus', 'Go'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'AWS Certified Solutions Architect — Professional', issuer: 'Amazon Web Services', date: '2023-08', expirationDate: null, credentialId: 'AWS-PSA-9912', url: '' },
    { id: 'c2', name: 'Certified Kubernetes Administrator', issuer: 'CNCF', date: '2022-05', expirationDate: null, credentialId: 'CKA-4492', url: '' },
    { id: 'c3', name: 'HashiCorp Certified Vault Associate', issuer: 'HashiCorp', date: '2022-11', expirationDate: null, credentialId: 'VA-3318', url: '' },
  ],
  achievements: [
    { id: 'a1', title: 'Self-Service Platform Launch', description: 'Reduced new-service setup from 2 weeks to 2 hours.', date: '2023-06' },
    { id: 'a2', title: 'KubeCon EU 2024 Talk', description: 'Co-presented on platform engineering best practices.', date: '2024-03' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'Twi', proficiency: 'limited' },
  ],
  interests: [{ id: 'i1', name: 'Electronics' }, { id: 'i2', name: 'Cycling' }],
  awards: [{ id: 'aw1', title: 'Infrastructure Excellence Award', issuer: 'Nimbus Cloud', date: '2024-01', description: 'For the platform engineering initiative and cost optimisation programme.' }],
  publications: [{ id: 'pu1', title: 'Platform Engineering: A Practitioner\'s Guide to Internal Developer Platforms', publisher: 'ACM Queue', date: '2024-02', url: 'queue.acm.org/naomi-osei', description: 'A practical guide to building IDPs using Backstage and Kubernetes.', authors: ['Naomi Osei'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'Kubernetes Community Days', role: 'Organising Committee', location: 'Dublin, Ireland', dateRange: { startDate: '2023-01', endDate: null, current: true }, description: 'Helps organise the annual KCD Dublin conference.', highlights: [] }],
  custom: {},
}

export const TECH_LEAD_DATA: ResumeData = {
  personal: {
    firstName: 'Anika',
    lastName: 'Patel',
    headline: 'Engineering Director',
    email: 'anika.patel@techlead.io',
    phone: '(415) 555-0623',
    location: 'San Francisco, CA',
    website: 'anikapatel.com',
    linkedin: 'linkedin.com/in/anikapatel',
    github: 'github.com/anikapatel',
    summary: 'Engineering director with 15+ years building and leading high-performing teams at hyper-growth tech companies. Proven track record scaling organisations from 10 to 100+ engineers while shipping products used by millions.',
    avatarUrl: null,
  },
  summary: 'Engineering director with 15+ years building and leading high-performing teams at hyper-growth tech companies. Proven track record scaling organisations from 10 to 100+ engineers while shipping products used by millions.',
  experience: [
    { id: 'e1', company: 'Zeno Technologies', position: 'Engineering Director', location: 'San Francisco, CA', dateRange: { startDate: '2020-06', endDate: null, current: true }, description: 'Leading the platform engineering division across 3 offices.\n\n• Scaled the engineering org from 25 to 90 engineers across 12 squads.\n• Established an engineering career framework adopted company-wide.\n• Drove a platform consolidation that reduced infrastructure costs by 45%.\n• Shipped the AI-powered recommendation engine — 18% revenue uplift.', highlights: [] },
    { id: 'e2', company: 'Meridian Commerce', position: 'Senior Engineering Manager', location: 'San Francisco, CA', dateRange: { startDate: '2016-04', endDate: '2020-05', current: false }, description: 'Managed the payments and checkout teams.\n\n• Grew the team from 8 to 35 engineers while maintaining 95%+ retention.\n• Delivered a payment platform rewrite processing $5B+ annually.\n• Introduced blameless post-mortems and incident management processes.', highlights: [] },
    { id: 'e3', company: 'BrightPath', position: 'Engineering Manager', location: 'Oakland, CA', dateRange: { startDate: '2013-01', endDate: '2016-03', current: false }, description: 'Managed the infrastructure team.\n\n• Migrated the entire production environment from on-prem to AWS.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'Stanford University', degree: 'M.S.', field: 'Computer Science', location: 'Stanford, CA', dateRange: { startDate: '2008-09', endDate: '2010-06', current: false }, gpa: '3.9', description: '', highlights: [] },
    { id: 'ed2', institution: 'UC Berkeley', degree: 'B.S.', field: 'Electrical Engineering & Computer Science', location: 'Berkeley, CA', dateRange: { startDate: '2004-09', endDate: '2008-06', current: false }, gpa: '3.8', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Engineering Career Framework', description: 'Company-wide progression framework with clear competencies, levels, and promotion criteria.', technologies: ['Org Design', 'Performance Management'], url: '', githubUrl: '', dateRange: { startDate: '2021-08', endDate: '2022-03', current: false }, highlights: [] },
    { id: 'p2', name: 'Platform Consolidation', description: 'Unified multiple legacy platforms into a single cloud-native infrastructure.', technologies: ['Kubernetes', 'Terraform', 'AWS', 'Migration'], url: '', githubUrl: '', dateRange: { startDate: '2022-04', endDate: '2023-06', current: false }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Leadership', skills: ['Org Design', 'Team Building', 'Career Coaching', 'Strategic Planning', 'Inclusive Culture'], level: 'expert' },
    { id: 's2', name: 'Engineering', skills: ['System Design', 'Platform Engineering', 'Cloud Architecture', 'ML Infrastructure'], level: 'advanced' },
    { id: 's3', name: 'Operations', skills: ['Incident Management', 'SLO/SLI', 'Budgeting', 'Vendor Evaluation', 'Compliance'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'AWS Certified Solutions Architect — Professional', issuer: 'Amazon Web Services', date: '2023-06', expirationDate: null, credentialId: 'AWS-PSA-8834', url: '' },
    { id: 'c2', name: 'Google Cloud Professional Cloud Architect', issuer: 'Google Cloud', date: '2022-09', expirationDate: null, credentialId: 'GCP-ARCH-5712', url: '' },
  ],
  achievements: [
    { id: 'a1', title: 'Scaling from 25 to 90 Engineers', description: 'Built a world-class engineering org with diverse leadership representation.', date: '2024-01' },
    { id: 'a2', title: 'Keynote Speaker, LeadDev 2023', description: 'Presented on engineering culture and inclusive leadership.', date: '2023-06' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'Gujarati', proficiency: 'full' },
  ],
  interests: [{ id: 'i1', name: 'Sailing' }, { id: 'i2', name: 'Wine' }],
  awards: [{ id: 'aw1', title: 'Top 50 Engineering Leaders', issuer: 'TechRocket', date: '2024-03', description: 'Recognised as one of the top engineering leaders in the industry.' }],
  publications: [{ id: 'pu1', title: 'Engineering Culture Is Your Product', publisher: 'LeadDev', date: '2023-06', url: 'leaddev.com/anika-patel', description: 'An essay on treating engineering culture as a first-class product.', authors: ['Anika Patel'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'Women Who Code', role: 'Executive Sponsor', location: 'San Francisco, CA', dateRange: { startDate: '2021-01', endDate: null, current: true }, description: 'Sponsors mentorship programmes and career development workshops.', highlights: [] }],
  custom: {},
}
