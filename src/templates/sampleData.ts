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

export const ARCHITECT_DATA: ResumeData = {
  personal: {
    firstName: 'Vikram',
    lastName: 'Nair',
    headline: 'Principal Software Engineer',
    email: 'vikram.nair@distributed.sh',
    phone: '(425) 555-0197',
    location: 'Redmond, WA',
    website: 'vikramnair.dev',
    linkedin: 'linkedin.com/in/vikramnair',
    github: 'github.com/vikramnair',
    summary: 'Principal engineer with 12+ years designing high-throughput distributed systems. Expert in consensus algorithms, storage engines, and performance-critical infrastructure. Passionate about mentoring and building teams that ship reliable, observable systems.',
    avatarUrl: null,
  },
  summary: 'Principal engineer with 12+ years designing high-throughput distributed systems. Expert in consensus algorithms, storage engines, and performance-critical infrastructure. Passionate about mentoring and building teams that ship reliable, observable systems.',
  experience: [
    { id: 'e1', company: 'Nexus Systems', position: 'Principal Software Engineer', location: 'Redmond, WA', dateRange: { startDate: '2019-06', endDate: null, current: true }, description: 'Core infrastructure team \u2014 storage engine for a globally distributed database.\n\n\u2022 Designed and implemented a new LSM-tree storage engine reducing write amplification by 60%.\n\u2022 Led the Raft consensus implementation used across 12 data regions.\n\u2022 Reduced p99 read latency from 120ms to 12ms through a caching layer redesign.\n\u2022 Mentored 8 engineers through the senior promotion track.', highlights: [] },
    { id: 'e2', company: 'Quantum Data', position: 'Staff Software Engineer', location: 'Seattle, WA', dateRange: { startDate: '2015-02', endDate: '2019-05', current: false }, description: 'Built the real-time analytics query engine.\n\n\u2022 Designed a columnar storage format that halved storage costs.\n\u2022 Wrote the query federation layer spanning 5 data sources.', highlights: [] },
    { id: 'e3', company: 'Streamline', position: 'Software Engineer', location: 'Portland, OR', dateRange: { startDate: '2012-08', endDate: '2015-01', current: false }, description: 'Contributed to the stream processing framework.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'University of Washington', degree: 'Ph.D.', field: 'Computer Science', location: 'Seattle, WA', dateRange: { startDate: '2008-09', endDate: '2012-06', current: false }, gpa: '3.9', description: '', highlights: [] },
    { id: 'ed2', institution: 'Indian Institute of Technology, Madras', degree: 'B.Tech', field: 'Computer Science', location: 'Chennai, India', dateRange: { startDate: '2004-08', endDate: '2008-06', current: false }, gpa: '4.0', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Onyx \u2014 Distributed Database Engine', description: 'Open-source LSM-tree storage engine with pluggable compaction strategies.', technologies: ['Rust', 'RocksDB', 'gRPC', 'Tokio'], url: 'github.com/vikramnair/onyx', githubUrl: 'github.com/vikramnair/onyx', dateRange: { startDate: '2021-01', endDate: null, current: true }, highlights: [] },
    { id: 'p2', name: 'Observability Pipeline v2', description: 'Internal tracing infrastructure handling 5TB of span data per day.', technologies: ['Go', 'Kafka', 'ClickHouse', 'OpenTelemetry'], url: '', githubUrl: '', dateRange: { startDate: '2023-01', endDate: '2023-12', current: false }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Systems', skills: ['Distributed Systems', 'Storage Engines', 'Consensus Algorithms', 'Performance Optimisation', 'Observability'], level: 'expert' },
    { id: 's2', name: 'Languages', skills: ['Rust', 'Go', 'C++', 'Python', 'TypeScript'], level: 'expert' },
    { id: 's3', name: 'Infrastructure', skills: ['Kubernetes', 'Kafka', 'gRPC', 'Linux', 'Networking'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'Google Cloud Professional Cloud Architect', issuer: 'Google Cloud', date: '2023-03', expirationDate: null, credentialId: 'GCP-ARCH-9921', url: '' },
  ],
  achievements: [
    { id: 'a1', title: '60% Write Amplification Reduction', description: 'The LSM-tree redesign became the storage foundation for the flagship product.', date: '2024-01' },
    { id: 'a2', title: 'Conference Keynote \u2014 Systems@Scale 2023', description: 'Presented on building reliable distributed storage at scale.', date: '2023-11' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'full' },
    { id: 'l2', language: 'Malayalam', proficiency: 'native' },
    { id: 'l3', language: 'Hindi', proficiency: 'native' },
  ],
  interests: [{ id: 'i1', name: 'Chess' }, { id: 'i2', name: 'Cycling' }, { id: 'i3', name: 'Home automation' }],
  awards: [{ id: 'aw1', title: 'Distinguished Engineer Award', issuer: 'Nexus Systems', date: '2024-02', description: 'For contributions to the distributed database platform.' }],
  publications: [{ id: 'pu1', title: 'Building a Pluggable Compaction Framework for LSM-Trees', publisher: 'ACM SIGMOD', date: '2024-04', url: 'sigmod.org/vikram-nair', description: 'A technical paper on extensible compaction strategies for LSM-based storage engines.', authors: ['Vikram Nair', 'Sarah Chen'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'Papers We Love Seattle', role: 'Organiser', location: 'Seattle, WA', dateRange: { startDate: '2022-01', endDate: null, current: true }, description: 'Organises monthly meetups to read and discuss seminal CS papers.', highlights: [] }],
  custom: {},
}

export const FULLSTACK_TECH_DATA: ResumeData = {
  personal: {
    firstName: 'Jordan',
    lastName: 'Rivera',
    headline: 'Full Stack Developer',
    email: 'jordan.rivera@hey.dev',
    phone: '(512) 555-0384',
    location: 'Austin, TX',
    website: 'jordanrivera.dev',
    linkedin: 'linkedin.com/in/jordanrivera',
    github: 'github.com/jordanrivera',
    summary: 'Full-stack developer with 8 years building production web applications across the entire JavaScript ecosystem. Expert in React, Node.js, and cloud-native architectures. Open-source maintainer and conference speaker.',
    avatarUrl: null,
  },
  summary: 'Full-stack developer with 8 years building production web applications across the entire JavaScript ecosystem. Expert in React, Node.js, and cloud-native architectures. Open-source maintainer and conference speaker.',
  experience: [
    { id: 'e1', company: 'Flux Technologies', position: 'Senior Full Stack Engineer', location: 'Austin, TX', dateRange: { startDate: '2021-04', endDate: null, current: true }, description: 'Building the developer platform for serverless application deployment.\n\n\u2022 Architected the real-time deployment dashboard serving 50K+ users.\n\u2022 Built an event-driven CI/CD pipeline reducing deploy times from 12 min to 90 seconds.\n\u2022 Led frontend architecture migration from class components to hooks across 200+ files.', highlights: [] },
    { id: 'e2', company: 'Nimbus Labs', position: 'Full Stack Developer', location: 'Austin, TX', dateRange: { startDate: '2018-02', endDate: '2021-03', current: false }, description: 'Core developer for the design collaboration platform.\n\n\u2022 Implemented WebSocket-based real-time collaboration supporting 100+ concurrent editors.\n\u2022 Designed a GraphQL API layer serving 5M+ queries per day.', highlights: [] },
    { id: 'e3', company: 'Craft Studios', position: 'Junior Developer', location: 'Dallas, TX', dateRange: { startDate: '2016-06', endDate: '2018-01', current: false }, description: 'Built customer-facing web apps for e-commerce clients.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'University of Texas at Austin', degree: 'B.S.', field: 'Computer Science', location: 'Austin, TX', dateRange: { startDate: '2012-09', endDate: '2016-05', current: false }, gpa: '3.7', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Flux \u2014 Serverless Deploy Dashboard', description: 'Real-time deployment monitoring and management for serverless applications.', technologies: ['React', 'TypeScript', 'GraphQL', 'AWS Lambda', 'WebSockets'], url: 'flux.dev', githubUrl: '', dateRange: { startDate: '2022-01', endDate: null, current: true }, highlights: [] },
    { id: 'p2', name: 'Tailkit \u2014 Open-Source Component Library', description: 'A collection of accessible, themeable React components with full TypeScript support.', technologies: ['React', 'TypeScript', 'Storybook', 'Vitest'], url: 'tailkit.dev', githubUrl: 'github.com/jordanrivera/tailkit', dateRange: { startDate: '2023-06', endDate: null, current: true }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'GraphQL', 'Storybook'], level: 'expert' },
    { id: 's2', name: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Prisma', 'tRPC'], level: 'advanced' },
    { id: 's3', name: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Vercel', 'GitHub Actions', 'Terraform', 'Cloudflare'], level: 'advanced' },
    { id: 's4', name: 'Testing', skills: ['Vitest', 'Playwright', 'Cypress', 'Storybook Tests'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'AWS Certified Developer \u2014 Associate', issuer: 'Amazon Web Services', date: '2023-11', expirationDate: null, credentialId: 'AWS-DA-7734', url: '' },
    { id: 'c2', name: 'HashiCorp Certified Terraform Associate', issuer: 'HashiCorp', date: '2024-01', expirationDate: null, credentialId: 'TFA-5512', url: '' },
  ],
  achievements: [
    { id: 'a1', title: 'Tailkit Reached 3K GitHub Stars', description: 'Open-source component library gained community traction within 6 months.', date: '2024-03' },
    { id: 'a2', title: 'Speaker \u2014 ReactConf 2024', description: 'Presented Building Accessible Design Systems', date: '2024-05' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'Spanish', proficiency: 'full' },
  ],
  interests: [{ id: 'i1', name: 'Open source' }, { id: 'i2', name: 'Trail running' }, { id: 'i3', name: 'Indie games' }],
  awards: [{ id: 'aw1', title: 'OSS Contributor Award', issuer: 'Flux Technologies', date: '2024-02', description: 'For significant contributions to open-source tooling.' }],
  publications: [{ id: 'pu1', title: 'Event-Driven CI/CD with AWS Lambda and EventBridge', publisher: 'CSS-Tricks', date: '2024-01', url: 'css-tricks.com/jordan-rivera', description: 'A practical guide to building serverless CI/CD pipelines.', authors: ['Jordan Rivera'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'Free Code Camp Austin', role: 'Mentor', location: 'Austin, TX', dateRange: { startDate: '2022-06', endDate: null, current: true }, description: 'Leads weekly workshops on React and TypeScript for career-changers.', highlights: [] }],
  custom: {},
}

export const DATA_AI_DATA: ResumeData = {
  personal: {
    firstName: 'Maya',
    lastName: 'Lin',
    headline: 'Senior Machine Learning Engineer',
    email: 'maya.lin@ml-research.io',
    phone: '(650) 555-0412',
    location: 'Palo Alto, CA',
    website: 'mayalin.dev',
    linkedin: 'linkedin.com/in/mayalin',
    github: 'github.com/mayalin',
    summary: 'ML engineer with 10 years of experience building production AI systems. Specialises in NLP, recommendation systems, and MLOps. Passionate about translating research breakthroughs into products that serve millions of users daily.',
    avatarUrl: null,
  },
  summary: 'ML engineer with 10 years of experience building production AI systems. Specialises in NLP, recommendation systems, and MLOps. Passionate about translating research breakthroughs into products that serve millions of users daily.',
  experience: [
    { id: 'e1', company: 'Cortex AI', position: 'Senior Machine Learning Engineer', location: 'Palo Alto, CA', dateRange: { startDate: '2021-03', endDate: null, current: true }, description: 'Core ML team \u2014 recommendation and personalisation.\n\n\u2022 Designed and deployed a real-time personalisation system serving 50M+ users with 300ms p99 latency.\n\u2022 Built a feature store unifying online and offline feature computation across 12 product teams.\n\u2022 Led the MLOps initiative that reduced model deployment time from weeks to 2 hours.\n\u2022 Published two papers at top-tier conferences (RecSys, KDD).', highlights: [] },
    { id: 'e2', company: 'Bright Research', position: 'Applied ML Scientist', location: 'San Francisco, CA', dateRange: { startDate: '2017-09', endDate: '2021-02', current: false }, description: 'NLP research group focused on language understanding.\n\n\u2022 Developed a novel attention-pruning technique reducing inference costs by 40%.\n\u2022 Built the text classification pipeline used across all customer-facing products.', highlights: [] },
    { id: 'e3', company: 'DataLab', position: 'Data Scientist', location: 'Berkeley, CA', dateRange: { startDate: '2015-07', endDate: '2017-08', current: false }, description: 'Built predictive models for customer churn and lifetime value.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'Stanford University', degree: 'Ph.D.', field: 'Computer Science (AI/ML)', location: 'Stanford, CA', dateRange: { startDate: '2011-09', endDate: '2015-06', current: false }, gpa: '4.0', description: '', highlights: [] },
    { id: 'ed2', institution: 'UC Berkeley', degree: 'B.S.', field: 'Electrical Engineering & Computer Science', location: 'Berkeley, CA', dateRange: { startDate: '2007-09', endDate: '2011-06', current: false }, gpa: '3.9', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Orion \u2014 Real-Time Personalisation Engine', description: 'Low-latency feature computation and model inference for personalised recommendations.', technologies: ['Python', 'Ray', 'Spark', 'Kubernetes', 'Redis AI'], url: '', githubUrl: '', dateRange: { startDate: '2022-01', endDate: '2023-06', current: false }, highlights: [] },
    { id: 'p2', name: 'FeatureForge \u2014 Unified Feature Store', description: 'Open-source feature store for online and offline ML workflows.', technologies: ['Python', 'Go', 'PostgreSQL', 'Redis', 'gRPC'], url: 'github.com/mayalin/featureforge', githubUrl: 'github.com/mayalin/featureforge', dateRange: { startDate: '2023-01', endDate: null, current: true }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Machine Learning', skills: ['NLP', 'Recommendation Systems', 'Deep Learning', 'Reinforcement Learning', 'MLOps'], level: 'expert' },
    { id: 's2', name: 'Engineering', skills: ['Python', 'PyTorch', 'Ray', 'Spark', 'Kubernetes', 'Docker'], level: 'expert' },
    { id: 's3', name: 'Infrastructure', skills: ['AWS SageMaker', 'Kubeflow', 'MLflow', 'Feature Stores', 'Model Monitoring'], level: 'advanced' },
    { id: 's4', name: 'Research', skills: ['Experimental Design', 'A/B Testing', 'Statistical Analysis', 'Paper Writing'], level: 'expert' },
  ],
  certifications: [
    { id: 'c1', name: 'AWS Certified Machine Learning \u2014 Specialty', issuer: 'Amazon Web Services', date: '2023-08', expirationDate: null, credentialId: 'AWS-ML-8823', url: '' },
    { id: 'c2', name: 'TensorFlow Developer Certificate', issuer: 'Google', date: '2022-05', expirationDate: null, credentialId: 'TF-DEV-4419', url: '' },
  ],
  achievements: [
    { id: 'a1', title: 'Paper Accepted at KDD 2024', description: 'Orion: Real-Time Personalisation at Scale.', date: '2024-02' },
    { id: 'a2', title: 'Conference Talk \u2014 NeurIPS 2023', description: 'Presented attention-pruning techniques for efficient NLP.', date: '2023-12' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'Mandarin Chinese', proficiency: 'native' },
    { id: 'l3', language: 'French', proficiency: 'professional' },
  ],
  interests: [{ id: 'i1', name: 'Photography' }, { id: 'i2', name: 'Hiking' }, { id: 'i3', name: 'Board games' }],
  awards: [{ id: 'aw1', title: 'Best Paper Award \u2014 RecSys 2023', issuer: 'ACM', date: '2023-09', description: 'For the paper on real-time personalisation at scale.' }],
  publications: [{ id: 'pu1', title: 'Real-Time Personalisation at Scale: The Orion System', publisher: 'ACM KDD', date: '2024-02', url: 'kdd2024.org/maya-lin', description: 'A systems paper on building a real-time personalisation engine serving 50M+ users.', authors: ['Maya Lin', 'James Park', 'Wei Zhang'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'Black in AI', role: 'Mentorship Lead', location: 'Remote', dateRange: { startDate: '2022-01', endDate: null, current: true }, description: 'Coordinates mentorship matching for aspiring ML researchers from underrepresented backgrounds.', highlights: [] }],
  custom: {},
}

export const CLOUD_OPS_DATA: ResumeData = {
  personal: {
    firstName: 'Kofi',
    lastName: 'Owusu',
    headline: 'DevOps & Cloud Infrastructure Lead',
    email: 'kofi.owusu@cloud-infra.io',
    phone: '+44 20 7123 4567',
    location: 'London, UK',
    website: 'kofiowusu.dev',
    linkedin: 'linkedin.com/in/kofiowusu',
    github: 'github.com/kofiowusu',
    summary: 'Cloud infrastructure lead with 9 years designing and operating large-scale distributed systems. Expert in Kubernetes, service mesh, and platform engineering. Passionate about building internal developer platforms that make deployment boring and reliable.',
    avatarUrl: null,
  },
  summary: 'Cloud infrastructure lead with 9 years designing and operating large-scale distributed systems. Expert in Kubernetes, service mesh, and platform engineering. Passionate about building internal developer platforms that make deployment boring and reliable.',
  experience: [
    { id: 'e1', company: 'Titan Cloud', position: 'Cloud Infrastructure Lead', location: 'London, UK', dateRange: { startDate: '2021-06', endDate: null, current: true }, description: 'Leading the platform engineering team for a fintech infrastructure provider.\n\n\u2022 Designed and built an internal developer platform serving 200+ engineers across 15 squads.\n\u2022 Reduced infrastructure costs by 42% through right-sizing and spot instance adoption.\n\u2022 Implemented a multi-cluster service mesh handling 500K+ requests per second.\n\u2022 Led the migration of 80 services from EC2 to EKS with zero customer-impacting downtime.', highlights: [] },
    { id: 'e2', company: 'Nexus Infrastructure', position: 'Senior DevOps Engineer', location: 'London, UK', dateRange: { startDate: '2018-03', endDate: '2021-05', current: false }, description: 'Built and maintained the AWS foundation for a SaaS platform.\n\n\u2022 Architected a multi-account AWS landing zone with automated guardrails.\n\u2022 Automated disaster recovery reducing RTO from 4 hours to 15 minutes.', highlights: [] },
    { id: 'e3', company: 'Stackworx', position: 'DevOps Engineer', location: 'Manchester, UK', dateRange: { startDate: '2015-09', endDate: '2018-02', current: false }, description: 'Managed the CI/CD pipeline and production infrastructure.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'University of Cambridge', degree: 'M.Eng.', field: 'Computer Science', location: 'Cambridge, UK', dateRange: { startDate: '2011-10', endDate: '2015-06', current: false }, gpa: 'First Class', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Atlas \u2014 Internal Developer Platform', description: 'Self-service platform with service catalog, scorecards, and automated provisioning.', technologies: ['Backstage', 'Kubernetes', 'Terraform', 'Go', 'Crossplane'], url: '', githubUrl: '', dateRange: { startDate: '2022-01', endDate: null, current: true }, highlights: [] },
    { id: 'p2', name: 'Cluster Autoscaler Optimisation', description: 'Custom K8s cluster autoscaler policies reducing spend by 35% while maintaining SLOs.', technologies: ['Kubernetes', 'AWS', 'Go', 'Prometheus'], url: '', githubUrl: '', dateRange: { startDate: '2023-03', endDate: '2023-09', current: false }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Cloud Platforms', skills: ['AWS', 'GCP', 'Azure', 'Terraform', 'Crossplane', 'Pulumi'], level: 'expert' },
    { id: 's2', name: 'Kubernetes Ecosystem', skills: ['EKS', 'Istio', 'ArgoCD', 'Helm', 'Kyverno', 'Cert-Manager'], level: 'expert' },
    { id: 's3', name: 'Platform & Observability', skills: ['Backstage', 'Prometheus', 'Grafana', 'OpenTelemetry', 'ELK Stack'], level: 'advanced' },
    { id: 's4', name: 'Scripting & Automation', skills: ['Go', 'Python', 'Bash', 'Ansible', 'Packer'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'AWS Certified Solutions Architect \u2014 Professional', issuer: 'Amazon Web Services', date: '2023-06', expirationDate: null, credentialId: 'AWS-PSA-9912', url: '' },
    { id: 'c2', name: 'Certified Kubernetes Administrator', issuer: 'CNCF', date: '2022-08', expirationDate: null, credentialId: 'CKA-8842', url: '' },
    { id: 'c3', name: 'HashiCorp Certified Vault Associate', issuer: 'HashiCorp', date: '2023-02', expirationDate: null, credentialId: 'VA-5517', url: '' },
  ],
  achievements: [
    { id: 'a1', title: '42% Infrastructure Cost Reduction', description: 'Right-sizing and spot instance adoption across 200+ services.', date: '2024-01' },
    { id: 'a2', title: 'KubeCon EU 2024 \u2014 Keynote Speaker', description: 'Presented Building Internal Developer Platforms at Scale.', date: '2024-03' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'Twi', proficiency: 'native' },
    { id: 'l3', language: 'French', proficiency: 'professional' },
  ],
  interests: [{ id: 'i1', name: 'Electronics' }, { id: 'i2', name: 'Sailing' }, { id: 'i3', name: 'Home brewing' }],
  awards: [{ id: 'aw1', title: 'Infrastructure Innovation Award', issuer: 'Titan Cloud', date: '2024-02', description: 'For the platform engineering initiative and cost optimisation programme.' }],
  publications: [{ id: 'pu1', title: 'Platform Engineering: A Practical Guide to Internal Developer Platforms', publisher: 'ACM Queue', date: '2024-03', url: 'queue.acm.org/kofi-owusu', description: 'A case study on building IDPs with Backstage and Kubernetes.', authors: ['Kofi Owusu'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'CNCF London Meetup', role: 'Co-Organiser', location: 'London, UK', dateRange: { startDate: '2022-01', endDate: null, current: true }, description: 'Coordinates monthly Kubernetes and cloud-native community meetups.', highlights: [] }],
  custom: {},
}

export const PRODUCT_DESIGNER_DATA: ResumeData = {
  personal: {
    firstName: 'Sakura',
    lastName: 'Tanaka',
    headline: 'Senior Product Designer',
    email: 'sakura.tanaka@design.studio',
    phone: '(415) 555-0273',
    location: 'San Francisco, CA',
    website: 'sakuratanaka.design',
    linkedin: 'linkedin.com/in/sakuratanaka',
    github: 'github.com/sakuratanaka',
    summary: 'Senior product designer with 9 years crafting intuitive interfaces for B2B SaaS and developer tools. Expert in design systems, interaction design, and accessibility. Combines deep user research skills with pixel-perfect execution to ship products that users love.',
    avatarUrl: null,
  },
  summary: 'Senior product designer with 9 years crafting intuitive interfaces for B2B SaaS and developer tools. Expert in design systems, interaction design, and accessibility. Combines deep user research skills with pixel-perfect execution to ship products that users love.',
  experience: [
    { id: 'e1', company: 'Lumina Design Systems', position: 'Senior Product Designer', location: 'San Francisco, CA', dateRange: { startDate: '2021-05', endDate: null, current: true }, description: 'Design lead for the design system and platform experience.\n\n\u2022 Built and scaled a comprehensive design system adopted across 6 product lines.\n\u2022 Led the redesign of the developer dashboard \u2014 task completion rate improved from 68% to 91%.\n\u2022 Established a user research practice conducting 60+ moderated sessions per quarter.\n\u2022 Reduced UI-related bug reports by 55% through systematic design QA processes.', highlights: [] },
    { id: 'e2', company: 'Axis Analytics', position: 'Product Designer', location: 'San Francisco, CA', dateRange: { startDate: '2018-04', endDate: '2021-04', current: false }, description: 'Designed the analytics platform for mid-market businesses.\n\n\u2022 Shipped a completely redesigned reporting interface that reduced time-to-insight by 40%.\n\u2022 Created a prototyping system that cut design-to-dev handoff time by 60%.', highlights: [] },
    { id: 'e3', company: 'Form Studio', position: 'Junior Designer', location: 'Oakland, CA', dateRange: { startDate: '2015-08', endDate: '2018-03', current: false }, description: 'Designed landing pages and marketing websites for startups.', highlights: [] },
  ],
  education: [
    { id: 'ed1', institution: 'California College of the Arts', degree: 'BFA', field: 'Interaction Design', location: 'Oakland, CA', dateRange: { startDate: '2011-09', endDate: '2015-05', current: false }, gpa: '3.9', description: '', highlights: [] },
  ],
  projects: [
    { id: 'p1', name: 'Stellar Design System', description: 'Comprehensive, accessible design system with theming, documentation, and interactive playground.', technologies: ['Figma', 'React', 'Storybook', 'Radix UI', 'Tailwind'], url: 'stellar-ds.dev', githubUrl: 'github.com/sakuratanaka/stellar', dateRange: { startDate: '2021-06', endDate: null, current: true }, highlights: [] },
    { id: 'p2', name: 'Insight Dashboard Redesign', description: 'Complete overhaul of the analytics dashboard improving task completion by 23 percentage points.', technologies: ['Figma', 'User Research', 'Prototyping', 'Motion Design'], url: '', githubUrl: '', dateRange: { startDate: '2022-03', endDate: '2022-12', current: false }, highlights: [] },
  ],
  skills: [
    { id: 's1', name: 'Design', skills: ['Product Design', 'Interaction Design', 'Design Systems', 'Prototyping', 'Typography', 'Motion Design'], level: 'expert' },
    { id: 's2', name: 'Research', skills: ['User Research', 'Usability Testing', 'A/B Testing', 'Information Architecture', 'Accessibility'], level: 'advanced' },
    { id: 's3', name: 'Engineering', skills: ['React', 'TypeScript', 'CSS', 'Storybook', 'Figma API', 'HTML'], level: 'advanced' },
    { id: 's4', name: 'Leadership', skills: ['Design Critique', 'Mentoring', 'Cross-functional Collaboration', 'Design Operations'], level: 'advanced' },
  ],
  certifications: [
    { id: 'c1', name: 'IAAP Certified Professional in Accessibility Core Competencies', issuer: 'IAAP', date: '2023-06', expirationDate: null, credentialId: 'CPACC-7712', url: '' },
    { id: 'c2', name: 'Nielsen Norman UX Master Certificate', issuer: 'NN/g', date: '2022-08', expirationDate: null, credentialId: 'NNM-6623', url: '' },
  ],
  achievements: [
    { id: 'a1', title: 'Stellar Design System \u2014 Adopted by 6 Product Teams', description: 'Design system scaled across the organisation with 200+ components.', date: '2024-01' },
    { id: 'a2', title: 'Speaker \u2014 Config 2024', description: 'Presented Building Accessible Design Systems at Figma\'s annual conference.', date: '2024-05' },
  ],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'native' },
    { id: 'l2', language: 'Japanese', proficiency: 'native' },
    { id: 'l3', language: 'Spanish', proficiency: 'professional' },
  ],
  interests: [{ id: 'i1', name: 'Calligraphy' }, { id: 'i2', name: 'Film photography' }, { id: 'i3', name: 'Tea ceremony' }],
  awards: [{ id: 'aw1', title: 'Design Excellence Award', issuer: 'Lumina Design Systems', date: '2024-02', description: 'For outstanding contributions to the design system and platform experience.' }],
  publications: [{ id: 'pu1', title: 'Design Systems Are Not Just Component Libraries', publisher: 'Smashing Magazine', date: '2024-02', url: 'smashingmagazine.com/sakura-tanaka', description: 'An essay on treating design systems as products that serve both designers and engineers.', authors: ['Sakura Tanaka'] }],
  references: [],
  volunteer: [{ id: 'v1', organization: 'AIGA San Francisco', role: 'Mentorship Coordinator', location: 'San Francisco, CA', dateRange: { startDate: '2022-01', endDate: null, current: true }, description: 'Runs portfolio review sessions and career mentorship for emerging designers.', highlights: [] }],
  custom: {},
}


