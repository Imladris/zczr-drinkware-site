import type { Category, Product } from '../data/products';
import type { Lang } from './ui';

type NameCopy = { name: string; short: string; line: string; label: string };

const names: Record<string, NameCopy> = {
  '40oz-handled-tumbler': { name: 'Vaso con asa de 40 oz', short: 'Vaso 40 oz con asa', line: 'Vaso principal', label: 'Vaso' },
  '40oz-car-tumbler': { name: 'Vaso para auto de 40 oz', short: 'Vaso 40 oz auto', line: 'Vaso para auto', label: 'Vaso' },
  '30oz-handled-tumbler': { name: 'Vaso con asa de 30 oz', short: 'Vaso 30 oz con asa', line: 'Vaso con asa', label: 'Vaso' },
  '30oz-straw-tumbler': { name: 'Vaso con pajita de 30 oz', short: 'Vaso 30 oz pajita', line: 'Vaso con pajita', label: 'Vaso' },
  '30oz-gradient-tumbler': { name: 'Vaso degradado de 30 oz', short: 'Vaso 30 oz degradado', line: 'Serie degradada', label: 'Vaso' },
  '30oz-diamond-tumbler': { name: 'Vaso diamantado de 30 oz', short: 'Vaso 30 oz diamantado', line: 'Serie diamantada', label: 'Vaso' },
  '20oz-car-tumbler': { name: 'Vaso para auto de 20 oz', short: 'Vaso 20 oz auto', line: 'Vaso para auto', label: 'Vaso' },
  'big-mac-tumbler': { name: 'Vaso Big Mac', short: 'Big Mac', line: 'Formato grande', label: 'Vaso' },
  'sport-bottle-500': { name: 'Botella deportiva 500', short: 'Botella Sport 500', line: 'Botella deportiva', label: 'Botella' },
  'sport-bottle-750': { name: 'Botella deportiva 750', short: 'Botella Sport 750', line: 'Botella deportiva', label: 'Botella' },
  'sport-bottle-24': { name: 'Botella deportiva de 24 oz', short: 'Botella Sport 24', line: 'Botella deportiva', label: 'Botella' },
  'sport-bottle-32': { name: 'Botella deportiva de 32 oz', short: 'Botella Sport 32', line: 'Botella deportiva', label: 'Botella' },
  'small-mouth-bottle-500': { name: 'Botella de boca pequeña 500', short: 'Botella boca pequeña 500', line: 'Botella diaria', label: 'Botella' },
  'bottle-16oz': { name: 'Botella de 16 oz', short: 'Botella 16 oz', line: 'Botella degradada', label: 'Botella' },
  'jug-64oz': { name: 'Jarra de 64 oz', short: 'Jarra 64 oz', line: 'Formato grande', label: 'Jarra' },
  'ice-bucket-4l': { name: 'Cubo de hielo de 4 L', short: 'Cubo 4 L', line: 'Formato grande', label: 'Cubo de hielo' },
  'large-kettle-2-8l': { name: 'Tetera grande de 2,8 L', short: 'Tetera 2,8 L', line: 'Tetera grande', label: 'Tetera' },
  'space-kettle-18oz': { name: 'Tetera espacial de 18 oz', short: 'Tetera 18 oz', line: 'Tetera espacial', label: 'Tetera' },
  'space-kettle-32oz': { name: 'Tetera espacial de 32 oz', short: 'Tetera 32 oz', line: 'Tetera espacial', label: 'Tetera' },
  'coffee-cup-830': { name: 'Taza de café de 830 ml', short: 'Taza 830 ml', line: 'Serie café', label: 'Taza de café' },
  'new-coffee-cup': { name: 'Nueva taza de café', short: 'Nueva taza', line: 'Serie café', label: 'Taza de café' },
  'handle-cup-14oz': { name: 'Taza con asa de 14 oz', short: 'Taza 14 oz', line: 'Taza con asa', label: 'Taza de café' },
  'swallow-cup-330': { name: 'Taza Golondrina de 330 ml', short: 'Taza 330 ml', line: 'Taza de pared simple', label: 'Taza de café' },
  'element-500-handle': { name: 'Taza Element de 500 ml con asa', short: 'Element 500', line: 'Serie Element', label: 'Taza de café' },
  'leather-cup': { name: 'Taza forrada en cuero', short: 'Taza de cuero', line: 'Serie cuero', label: 'Taza de café' },
};

const featuresEs: Record<Category, { title: string; copy: string }[]> = {
  tumblers: [
    { title: 'Base de vaso de referencia', copy: 'Formato con asa o para portavasos; tapa, pajita y acabado se confirman en la muestra aprobada.' },
    { title: 'Color y logotipo personalizados', copy: 'Recubrimiento en polvo, degradados y impresión se desarrollan según tu brief.' },
    { title: 'Embalaje listo para exportación', copy: 'Protección individual y cajas; la cantidad por caja se confirma por modelo.' },
  ],
  bottles: [
    { title: 'Tapa deportiva o de pajita', copy: 'El estilo de tapa, la boca y las opciones de transporte se confirman con el modelo de referencia.' },
    { title: 'Perfil de botella compacto', copy: 'Un formato práctico para programas de retail, outdoor y promocionales.' },
    { title: 'Color y logotipo personalizados', copy: 'Acabados lisos, degradados e impresión se desarrollan para tu mercado.' },
  ],
  jugs: [
    { title: 'Gran capacidad', copy: 'Un formato de alto volumen para programas de grupo, outdoor y food service.' },
    { title: 'Asa de transporte', copy: 'Asa equilibrada y boca ancha para un uso diario práctico.' },
    { title: 'Color y logotipo personalizados', copy: 'Color, logotipo y embalaje desarrollados para tu programa.' },
  ],
  kettles: [
    { title: 'Perfil que ahorra espacio', copy: 'Un formato de tetera compacto para bolsos, escritorios y programas de viaje.' },
    { title: 'Tapa roscada', copy: 'Una tapa segura y una apertura práctica confirmadas en la muestra aprobada.' },
    { title: 'Color y logotipo personalizados', copy: 'Acabados lisos y degradados disponibles para desarrollo.' },
  ],
  coffee: [
    { title: 'Formato para café', copy: 'Un perfil esbelto para programas de commuting, oficina y regalo.' },
    { title: 'Interior de acero inoxidable', copy: 'Los modelos de referencia usan paredes interiores de acero 304 o 316 según especificación.' },
    { title: 'Color y logotipo personalizados', copy: 'Color, logotipo y embalaje de retail desarrollados según tu brief.' },
  ],
};

const colorNames: Record<string, string> = {
  White: 'Blanco', Navy: 'Azul marino', Green: 'Verde', Pink: 'Rosa', 'Deep Green': 'Verde oscuro',
  Orange: 'Naranja', Mist: 'Bruma', 'Blue-Black': 'Azul negro', Black: 'Negro', Blue: 'Azul',
  Purple: 'Morado', Yellow: 'Amarillo', 'Light Blue': 'Azul claro', Red: 'Rojo', Mint: 'Menta',
  'Deep Blue': 'Azul profundo', Sage: 'Salvia', Lemon: 'Amarillo limón', 'Pale Purple': 'Morado claro',
  'Military Green': 'Verde militar', Cream: 'Crema', Coral: 'Coral', Matcha: 'Verde matcha',
  Indigo: 'Índigo', Rose: 'Rosa', 'Royal Blue': 'Azul real', 'Bamboo Green': 'Verde bambú',
  Coffee: 'Café', Gradient: 'Degradado',
};

const capacityNames: Record<string, string> = {
  'Large format': 'Gran formato',
  '17.6 cm tall': '17,6 cm de alto',
  '26.7 cm tall': '26,7 cm de alto',
};

const localizeCapacity = (value: string) => {
  const mapped = capacityNames[value] ?? value;
  return mapped.replace(/\.(\d)/g, ',$1');
};

const badgeNames: Record<string, string> = {
  'Core model': 'Modelo principal',
  New: 'Nuevo',
  'Large format': 'Gran formato',
  'Heavy duty': 'Alta resistencia',
};

export const localizeColor = (lang: Lang, name: string) => (lang === 'es' ? colorNames[name] ?? name : name);

export const localizeBadge = (lang: Lang, badge?: string) => {
  if (!badge) return undefined;
  return lang === 'es' ? badgeNames[badge] ?? badge : badge;
};

const materialEs = (value: string) => {
  if (value.includes('316 stainless inner / 201 stainless outer')) return 'Acero inoxidable 316 interior / 201 exterior';
  if (value.includes('304 stainless inner / 201 stainless outer')) return 'Acero inoxidable 304 interior / 201 exterior';
  if (value.includes('Single-wall 304 stainless')) return 'Acero inoxidable 304 de pared simple';
  if (value.includes('304 stainless inner')) return 'Acero inoxidable 304 interior';
  return value;
};

export const localizeSpecLabel = (lang: Lang, label: string) => {
  if (lang === 'en') return label;
  const labels: Record<string, string> = {
    'Reference capacity': 'Capacidad de referencia',
    'Reference dimensions': 'Dimensiones de referencia',
    Material: 'Material',
    'Weight with lid': 'Peso con tapa',
    Packing: 'Embalaje',
    'Carton size': 'Tamaño de caja',
  };
  return labels[label] ?? label;
};

export const localizeSpecValue = (lang: Lang, label: string, value: string) => {
  if (lang === 'en') return value;
  if (label === 'Material') return materialEs(value);
  if (label === 'Packing') {
    return value
      .replace(/(\d+)\s*pcs\s*\/\s*carton/, '$1 uds. / caja')
      .replace('Confirm per order', 'A confirmar por pedido');
  }
  return value.replace(/\.(\d)/g, ',$1');
};

export const localizeProduct = (product: Product, lang: Lang): Product => {
  if (lang === 'en') return product;
  const copy = names[product.slug] ?? {
    name: product.name,
    short: product.shortName,
    line: product.line,
    label: product.categoryLabel,
  };
  return {
    ...product,
    name: copy.name,
    shortName: copy.short,
    line: copy.line,
    categoryLabel: copy.label,
    badge: localizeBadge(lang, product.badge),
    capacity: localizeCapacity(product.capacity),
    description: `Modelo de referencia de la gama de menaje isotérmico ZCZR, disponible en formato ${product.capacity}.`,
    longDescription: `El ${copy.name} es un modelo de referencia de la gama ZCZR. Utiliza una construcción de ${materialEs(
      product.specs.find((spec) => spec.label === 'Material')?.value ?? 'acero inoxidable'
    )} y se muestra con la gama de colores del catálogo. El color, el logotipo, la tapa y el embalaje se pueden desarrollar para su programa; la especificación final se confirma en la muestra aprobada.`,
    story: 'Modelo de referencia del catálogo ZCZR. Las dimensiones y pesos proceden del catálogo actual y deben confirmarse en la muestra aprobada.',
    imageAlt: `Fotografía de producto ZCZR: ${copy.name}`,
    features: featuresEs[product.category],
    colors: product.colors.map((color) => ({ ...color, name: colorNames[color.name] ?? color.name })),
  };
};
