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
