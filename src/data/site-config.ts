export type NavLink = {
  text: string;
  href: string;
};

export type SocialLink = NavLink & {
  label: string;
};

export const siteConfig = {
  website: 'https://pheonix2006.github.io',
  title: '李行健｜个人作品集',
  shortTitle: '李行健',
  description: '李行健的个人主页、项目作品、技术文章与工程实践记录。',
  author: '李行健',
  profile: {
    name: '李行健',
    englishName: 'Xingjian Li',
    alternateName: 'Daniel Li',
    handle: 'pheonix2006',
    role: '人工智能本科 / Agent 系统方向',
    education: '香港科技大学（广州）人工智能本科在读',
    educationPeriod: '2024.09 - 2028.07',
    highlights: [
      '2025-2026 春季学期 Dean\'s List',
      '本科入学全额奖学金',
      'DeepWisdom / Atoms 算法研究院实习',
    ],
  },
  contact: {
    email: 'xli807@connect.hkust-gz.edu.cn',
    phone: '+86 186-1071-8620',
    github: 'https://github.com/pheonix2006',
    location: '广州 / 深圳',
  },
  education: [
    {
      school: '香港科技大学（广州）',
      degree: '人工智能本科',
      period: '2024.09 - 2028.07',
      location: '广州',
      details: ['总 GPA：3.5/4.3', '专业 GPA：3.7/4.3', '本科入学全额奖学金', '2025-2026 春季学期 Dean\'s List'],
    },
    {
      school: '中国人民大学附属中学',
      degree: '数学与物理实验班',
      period: '2020.09 - 2024.06',
      location: '北京',
      details: ['高考 658 分', '北京市前 2000 名'],
    },
  ],
  experience: [
    {
      company: 'DeepWisdom / Atoms',
      role: '算法研究院实习生',
      period: '2026.05 - 至今',
      location: '深圳',
      bullets: ['参与多智能体系统和低代码生成平台的研发。', '关注 Agent 编排、工具调用和面向真实业务场景的 AI 工作流。'],
    },
    {
      company: 'Cummins China',
      role: 'AI 实习生（LLM）',
      period: '2025.08 - 2026.05',
      location: '北京',
      bullets: ['负责 EIT 与 OBD 项目中的 LangGraph RAG 工作流，包含多路检索和自动化评测。', '搭建并测试面向财务、IoV/IT 场景的多智能体 Text2SQL 流程，并用图表呈现分析结果。', '使用 Selenium 和 PyGUI 实现 RPA 自动化流程，优化重复业务操作。'],
    },
  ],
  resumeProjects: [
    {
      title: 'IoV 智能数据分析引擎',
      subtitle: 'Text2SQL 多智能体架构',
      period: '2025 - 2026',
      stack: ['LangGraph', 'Milvus', 'Code Agent', 'LLMs'],
      href: '/projects/ai-agent-framework',
      summary: '为车联网分析场景构建意图路由、实体校验、Schema Linking、SQL 自修正和图表化洞察流程。',
    },
    {
      title: 'RAG 检索与评测框架',
      subtitle: '混合检索与自动化评测',
      period: '2025',
      stack: ['RAG', 'Milvus', 'BGE-M3', 'Rerank'],
      href: '/projects/dify-rag-system',
      summary: '实现混合向量检索、rerank、Azure LLM 接入和状态机式评测流程，用于端到端检查 RAG 效果。',
    },
    {
      title: 'Agentic Robustness 优化',
      subtitle: 'Table2Image 框架',
      period: '2025',
      stack: ['LangGraph', 'LangSmith', 'PaddleOCR', 'VLMs'],
      href: '/blog/aorchestra',
      summary: '设计 ReAct 风格的多智能体流程，用于复杂表格理解、视觉状态追踪和数据合成轨迹生成。',
    },
  ],
  skillGroups: [
    {
      title: 'AI Agent 与 RAG',
      items: ['LangGraph', 'ReAct', '多智能体编排', 'RAG', 'Milvus', '自动化评测'],
    },
    {
      title: 'AI 原生工程',
      items: ['Claude Code', 'Vibe Coding', 'Spec Coding', 'MCP Skills', 'Progressive Disclosure'],
    },
    {
      title: '深度学习与系统',
      items: ['PyTorch', 'Python', 'C++', 'Linux', 'Docker', '自动化测试'],
    },
    {
      title: '数据与交互',
      items: ['Text2SQL', 'Code Agent', 'Schema Linking', 'VLMs', 'PaddleOCR', '数据合成'],
    },
  ],
  languages: ['英语：流利，课程教学语言', '中文：母语'],
  hero: {
    eyebrow: '个人作品集',
    title: '李行健 / Xingjian Li',
    text: '香港科技大学（广州）人工智能本科，关注 AI Agent、多智能体系统、RAG、低代码生成平台与工程自动化。我用项目长文记录完整背景、架构、技术取舍、结果和源码链接。',
    primaryAction: { text: '查看项目', href: '/projects' },
    secondaryAction: { text: '关于我', href: '/about' },
  },
  navLinks: [
    { text: '首页', href: '/' },
    { text: '项目', href: '/projects' },
    { text: '博客', href: '/blog' },
    { text: '关于', href: '/about' },
    { text: '联系', href: '/contact' },
  ] satisfies NavLink[],
  socialLinks: [
    { text: 'GitHub', label: 'GitHub 主页', href: 'https://github.com/pheonix2006' },
  ] satisfies SocialLink[],
  projectsPerPage: 12,
  postsPerPage: 12,
};

export default siteConfig;
