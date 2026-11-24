export type Lang = 'en' | 'es' | 'fr' | 'zh';

export const languages: Lang[] = ['en', 'es', 'fr', 'zh'];

export const languageNames: Record<Lang, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  zh: '中文',
};

export const languageCodes: Record<Lang, string> = {
  en: 'EN',
  es: 'ES',
  fr: 'FR',
  zh: 'ZH',
};

export const languageSummary: Record<Lang, string> = {
  en: 'EN',
  es: 'ES',
  fr: 'FR',
  zh: '中文',
};

export const localePath = (lang: Lang, path: string) => {
  if (path === '/404/' || path === '/404') {
    return lang === 'en' ? '/404.html' : `/${lang}/404/`;
  }
  if (lang === 'en') return path;
  if (path === '/') return `/${lang}/`;
  return `/${lang}${path}`;
};

export const stripLocale = (pathname: string) => {
  for (const lang of ['es', 'fr', 'zh'] as const) {
    if (pathname === `/${lang}`) return '/';
    if (pathname.startsWith(`/${lang}/`)) return pathname.slice(lang.length + 1) || '/';
  }
  return pathname;
};

type Dictionary = {
  categories: { tumblers: string; bottles: string; jugs: string; kettles: string; coffee: string };
  header: {
    descriptor: string;
    quote: string;
    search: string;
    menu: string;
    tagline: string;
    searchTitle: string;
    searchPlaceholder: string;
    searchEmpty: string;
    nav: { drinkware: string; capabilities: string; company: string; resources: string; contact: string };
    language: string;
    closeMenu: string;
    closeSearch: string;
    mobileNav: string;
  };
  announcement: { one: string; two: string };
  card: { quote: string; oem: string; view: string };
  newsletter: {
    eyebrow: string;
    titleOne: string;
    titleTwo: string;
    body: string;
    placeholder: string;
    note: string;
    subscribe: string;
  };
  footer: {
    description: string;
    locations: string[];
    drinkware: string;
    allModels: string;
    tumblers: string;
    bottles: string;
    jugs: string;
    kettles: string;
    coffee: string;
    company: string;
    about: string;
    capabilities: string;
    quality: string;
    resources: string;
    working: string;
    quote: string;
    sampling: string;
    payment: string;
    faq: string;
    briefing: string;
    briefingBody: string;
    workEmail: string;
    inquiries: string;
    tradeTerms: string;
    demoTail: string;
    privacy: string;
    terms: string;
    accessibility: string;
    companyLinks: string;
    contact: string;
  };
};

export const ui: Record<Lang, Dictionary> = {
  en: {
    categories: { tumblers: 'Tumblers', bottles: 'Bottles', jugs: 'Jugs & buckets', kettles: 'Kettles', coffee: 'Coffee cups' },
    header: {
      descriptor: 'Insulated drinkware',
      quote: 'Request a quote',
      search: 'Search drinkware',
      menu: 'Menu',
      tagline: 'Insulated drinkware, built for your brand.',
      searchTitle: 'Search the drinkware range',
      searchPlaceholder: 'Try “tumbler”, “bottle”, or “vacuum”',
      searchEmpty: 'No models found. Try a different word.',
      nav: { drinkware: 'Drinkware', capabilities: 'Capabilities', company: 'Company', resources: 'Resources', contact: 'Contact' },
      language: 'Language',
      closeMenu: 'Close menu',
      closeSearch: 'Close search',
      mobileNav: 'Mobile navigation',
    },
    announcement: { one: 'OEM / ODM insulated drinkware', two: 'Samples available · Yixing, Wuxi, Jiangsu, China' },
    card: { quote: 'Quote on request', oem: 'OEM / ODM', view: 'View' },
    newsletter: {
      eyebrow: 'Buyer briefing',
      titleOne: 'New models.',
      titleTwo: 'Factory notes.',
      body: 'Occasional updates for sourcing teams: new drinkware models, finish options, packaging notes and production windows. No consumer noise.',
      placeholder: 'Work email',
      note: 'For B2B buyers and sourcing teams. Unsubscribe anytime.',
      subscribe: 'Subscribe',
    },
    footer: {
      description: 'Wuxi Zhenchuang Zhuorui International Trade Co., Ltd. is a manufacturing and trading company focused on insulated stainless-steel drinkware for global buyers.',
      locations: ['Yixing headquarters', 'Yongkang factory', 'Zhejiang, China'],
      drinkware: 'Drinkware',
      allModels: 'All models',
      tumblers: 'Tumblers',
      bottles: 'Bottles',
      jugs: 'Jugs & buckets',
      kettles: 'Kettles',
      coffee: 'Coffee cups',
      company: 'Company',
      about: 'About ZCZR',
      capabilities: 'Capabilities',
      quality: 'Quality control',
      resources: 'Buyer resources',
      working: 'Working with us',
      quote: 'Request a quote',
      sampling: 'Sampling process',
      payment: 'Payment & packaging',
      faq: 'FAQ',
      briefing: 'Buyer briefing',
      briefingBody: 'New models, finish options, and factory notes for sourcing teams. No consumer noise.',
      workEmail: 'Work email',
      inquiries: 'Inquiries',
      tradeTerms: 'Trade terms',
      demoTail: 'Product models and specifications are illustrative and subject to confirmation. Company and contact information supplied by ZCZR.',
      privacy: 'Privacy',
      terms: 'Terms',
      accessibility: 'Accessibility',
      companyLinks: 'Company links',
      contact: 'Contact',
    },
  },
  es: {
    categories: { tumblers: 'Vasos', bottles: 'Botellas', jugs: 'Jarras y cubos', kettles: 'Teteras', coffee: 'Tazas de café' },
    header: {
      descriptor: 'Menaje isotérmico',
      quote: 'Solicitar cotización',
      search: 'Buscar productos',
      menu: 'Menú',
      tagline: 'Menaje isotérmico, fabricado para tu marca.',
      searchTitle: 'Buscar en la gama de menaje',
      searchPlaceholder: 'Prueba “vaso”, “botella” o “vacío”',
      searchEmpty: 'No se encontraron modelos. Prueba otra palabra.',
      nav: { drinkware: 'Productos', capabilities: 'Capacidades', company: 'Empresa', resources: 'Recursos', contact: 'Contacto' },
      language: 'Idioma',
      closeMenu: 'Cerrar menú',
      closeSearch: 'Cerrar búsqueda',
      mobileNav: 'Navegación móvil',
    },
    announcement: { one: 'Menaje isotérmico OEM / ODM', two: 'Muestras disponibles · Yixing, Wuxi, Jiangsu, China' },
    card: { quote: 'Cotización bajo pedido', oem: 'OEM / ODM', view: 'Ver' },
    newsletter: {
      eyebrow: 'Información para compradores',
      titleOne: 'Nuevos modelos.',
      titleTwo: 'Notas de fábrica.',
      body: 'Actualizaciones ocasionales para equipos de compras: nuevos modelos, acabados, embalaje y ventanas de producción. Sin ruido comercial.',
      placeholder: 'Correo corporativo',
      note: 'Para compradores B2B y equipos de compras. Cancela cuando quieras.',
      subscribe: 'Suscribirse',
    },
    footer: {
      description: 'Wuxi Zhenchuang Zhuorui International Trade Co., Ltd. es una empresa manufacturera y comercial centrada en menaje isotérmico de acero inoxidable para compradores internacionales.',
      locations: ['Sede de Yixing', 'Fábrica de Yongkang', 'Zhejiang, China'],
      drinkware: 'Menaje',
      allModels: 'Todos los modelos',
      tumblers: 'Vasos',
      bottles: 'Botellas',
      jugs: 'Jarras y cubos',
      kettles: 'Teteras',
      coffee: 'Tazas de café',
      company: 'Empresa',
      about: 'Sobre ZCZR',
      capabilities: 'Capacidades',
      quality: 'Control de calidad',
      resources: 'Recursos para compradores',
      working: 'Trabajar con nosotros',
      quote: 'Solicitar cotización',
      sampling: 'Proceso de muestras',
      payment: 'Pago y embalaje',
      faq: 'Preguntas frecuentes',
      briefing: 'Información para compradores',
      briefingBody: 'Nuevos modelos, opciones de acabado y notas de fábrica para equipos de compras. Sin ruido comercial.',
      workEmail: 'Correo corporativo',
      inquiries: 'Consultas',
      tradeTerms: 'Condiciones comerciales',
      demoTail: 'Los modelos y especificaciones son ilustrativos y están sujetos a confirmación. Información de empresa y contacto facilitada por ZCZR.',
      privacy: 'Privacidad',
      terms: 'Términos',
      accessibility: 'Accesibilidad',
      companyLinks: 'Enlaces de empresa',
      contact: 'Contacto',
    },
  },
  fr: {
    categories: { tumblers: 'Gobelets', bottles: 'Bouteilles', jugs: 'Cruches et seaux', kettles: 'Bouilloires', coffee: 'Tasses à café' },
    header: {
      descriptor: 'Gobelets isothermes',
      quote: 'Demander un devis',
      search: 'Rechercher un produit',
      menu: 'Menu',
      tagline: 'Des gobelets isothermes conçus pour votre marque.',
      searchTitle: 'Rechercher dans la gamme',
      searchPlaceholder: 'Essayez « gobelet », « bouteille » ou « vide »',
      searchEmpty: 'Aucun modèle trouvé. Essayez un autre mot.',
      nav: { drinkware: 'Produits', capabilities: 'Capacités', company: 'Entreprise', resources: 'Ressources', contact: 'Contact' },
      language: 'Langue',
      closeMenu: 'Fermer le menu',
      closeSearch: 'Fermer la recherche',
      mobileNav: 'Navigation mobile',
    },
    announcement: { one: 'Gobelets isothermes OEM / ODM', two: 'Échantillons disponibles · Yixing, Wuxi, Jiangsu, Chine' },
    card: { quote: 'Devis sur demande', oem: 'OEM / ODM', view: 'Voir' },
    newsletter: {
      eyebrow: 'Brief acheteur',
      titleOne: 'Nouveaux modèles.',
      titleTwo: "Notes d'usine.",
      body: "Des mises à jour occasionnelles pour les équipes d'achat : nouveaux modèles, finitions, emballage et fenêtres de production. Sans bruit grand public.",
      placeholder: 'E-mail professionnel',
      note: 'Pour les acheteurs B2B et les équipes d’achat. Désinscription à tout moment.',
      subscribe: "S'abonner",
    },
    footer: {
      description: "Wuxi Zhenchuang Zhuorui International Trade Co., Ltd. est une entreprise de fabrication et de négoce spécialisée dans les gobelets isothermes en acier inoxydable pour les acheteurs internationaux.",
      locations: ['Siège de Yixing', 'Usine de Yongkang', 'Zhejiang, Chine'],
      drinkware: 'Gobelets',
      allModels: 'Tous les modèles',
      tumblers: 'Gobelets',
      bottles: 'Bouteilles',
      jugs: 'Cruches et seaux',
      kettles: 'Bouilloires',
      coffee: 'Tasses à café',
      company: 'Entreprise',
      about: 'À propos de ZCZR',
      capabilities: 'Capacités',
      quality: 'Contrôle qualité',
      resources: 'Ressources acheteurs',
      working: 'Travailler avec nous',
      quote: 'Demander un devis',
      sampling: "Processus d'échantillonnage",
      payment: 'Paiement et emballage',
      faq: 'FAQ',
      briefing: 'Brief acheteur',
      briefingBody: 'Nouveaux modèles, finitions et notes d’usine pour les équipes d’achat. Sans bruit grand public.',
      workEmail: 'E-mail professionnel',
      inquiries: 'Demandes',
      tradeTerms: 'Conditions commerciales',
      demoTail: 'Les modèles et spécifications sont indicatifs et sous réserve de confirmation. Informations société et contact fournies par ZCZR.',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      accessibility: 'Accessibilité',
      companyLinks: 'Liens entreprise',
      contact: 'Contact',
    },
  },
  zh: {
    categories: { tumblers: '保温杯', bottles: '水瓶', jugs: '壶桶', kettles: '茶壶', coffee: '咖啡杯' },
    header: {
      descriptor: '不锈钢保温饮具',
      quote: '获取报价',
      search: '搜索产品',
      menu: '菜单',
      tagline: '为您的品牌打造的保温饮具。',
      searchTitle: '搜索产品系列',
      searchPlaceholder: '试试“杯”“水瓶”或“真空”',
      searchEmpty: '未找到型号，请尝试其他关键词。',
      nav: { drinkware: '产品', capabilities: '能力', company: '公司', resources: '资源', contact: '联系我们' },
      language: '语言',
      closeMenu: '关闭菜单',
      closeSearch: '关闭搜索',
      mobileNav: '移动端导航',
    },
    announcement: { one: 'OEM / ODM 保温饮具', two: '可提供样品 · 中国江苏无锡宜兴' },
    card: { quote: '按需报价', oem: 'OEM / ODM', view: '查看' },
    newsletter: {
      eyebrow: '采购简报',
      titleOne: '新品上市。',
      titleTwo: '工厂动态。',
      body: '面向采购团队的定期更新：新品型号、表面工艺、包装方案与生产档期，不发送消费者促销信息。',
      placeholder: '工作邮箱',
      note: '面向 B2B 采购商与采购团队，可随时退订。',
      subscribe: '订阅',
    },
    footer: {
      description: '无锡臻创卓锐国际贸易有限公司是一家专注于不锈钢保温饮具的工贸企业，为全球采购商提供产品与服务。',
      locations: ['无锡宜兴总部', '浙江永康工厂', '中国浙江'],
      drinkware: '饮具',
      allModels: '全部型号',
      tumblers: '保温杯',
      bottles: '水瓶',
      jugs: '壶桶',
      kettles: '茶壶',
      coffee: '咖啡杯',
      company: '公司',
      about: '关于 ZCZR',
      capabilities: '能力',
      quality: '质量控制',
      resources: '采购资源',
      working: '合作方式',
      quote: '获取报价',
      sampling: '打样流程',
      payment: '付款与包装',
      faq: '常见问题',
      briefing: '采购简报',
      briefingBody: '为采购团队提供新品、表面工艺与工厂动态，不发送消费者促销信息。',
      workEmail: '工作邮箱',
      inquiries: '询盘',
      tradeTerms: '贸易条款',
      demoTail: '产品型号与规格仅供参考，以最终确认结果为准。公司与联系信息由 ZCZR 提供。',
      privacy: '隐私',
      terms: '条款',
      accessibility: '无障碍',
      companyLinks: '公司链接',
      contact: '联系我们',
    },
  },
};

export type UI = Dictionary;
