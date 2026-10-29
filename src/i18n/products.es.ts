import type { Product } from '../data/products';
import type { Lang } from './ui';

const names: Record<string, { name: string; short: string; line: string; label: string }> = {
  '1688-795858462577': { name: 'Taza de café 316', short: 'Taza 316', line: 'Serie café', label: 'Taza de café' },
  '1688-799990229526': { name: 'Vaso para auto de 30 oz', short: 'Vaso 30 oz auto', line: 'Vaso para auto', label: 'Vaso' },
  '1688-794653748654': { name: 'Vaso con pajita de 20 oz', short: 'Vaso 20 oz pajita', line: 'Vaso con pajita', label: 'Vaso' },
  '1688-872583398991': { name: 'Vaso para auto de 30 oz II', short: 'Vaso 30 oz auto II', line: 'Vaso para auto', label: 'Vaso' },
  '1688-943081557361': { name: 'Tetera espacial grande', short: 'Tetera espacial', line: 'Tetera espacial', label: 'Tetera' },
  '1688-796185191193': { name: 'Jarra de cerveza con abridor', short: 'Jarra cerveza', line: 'Jarra de cerveza', label: 'Vaso' },
  '1688-854829570591': { name: 'Taza de café de 12 oz', short: 'Taza 12 oz', line: 'Serie café', label: 'Taza de café' },
  '1688-797152773942': { name: 'Vaso sublimable de 20 oz', short: 'Vaso sublimable', line: 'Sublimación', label: 'Vaso' },
  '1688-794630617489': { name: 'Vaso degradado de 30 oz', short: 'Vaso 30 oz degradado', line: 'Serie degradada', label: 'Vaso' },
  '1688-1081888425500': { name: 'Taza de café 316 con asa', short: 'Taza 316 con asa', line: 'Serie café', label: 'Taza de café' },
  '1688-851825626253': { name: 'Taza de café 316 con asa II', short: 'Taza 316 con asa II', line: 'Serie café', label: 'Taza de café' },
  '1688-1079729776645': { name: 'Botella deportiva 500', short: 'Botella Sport 500', line: 'Botella deportiva', label: 'Botella' },
  '1688-1078067502639': { name: 'Vaso con asa de 40 oz', short: 'Vaso 40 oz con asa', line: 'Vaso con asa', label: 'Vaso' },
  '1688-930100025238': { name: 'Vaso para auto de 40 oz', short: 'Vaso 40 oz auto', line: 'Vaso para auto', label: 'Vaso' },
  '1688-1080294990208': { name: 'Taza de café octogonal 316', short: 'Taza octogonal', line: 'Serie café', label: 'Taza de café' },
  '1688-790219051220': { name: 'Jarra de gran capacidad', short: 'Jarra gran capacidad', line: 'Formato grande', label: 'Jarra' },
  '1688-1076397526442': { name: 'Vaso para auto grande', short: 'Vaso auto grande', line: 'Vaso para auto', label: 'Vaso' },
  '1688-790204503582': { name: 'Vaso con pintura diamantada', short: 'Vaso diamantado', line: 'Serie diamantada', label: 'Vaso' },
  '1688-1079232876527': { name: 'Botella isotérmica recta', short: 'Botella recta', line: 'Botella diaria', label: 'Botella' },
  '1688-943601127136': { name: 'Botella deportiva de silicona 34 oz', short: 'Botella 34 oz', line: 'Botella deportiva', label: 'Botella' },
  '1688-1075538063688': { name: 'Vaso de doble bebida', short: 'Vaso doble bebida', line: 'Doble bebida', label: 'Vaso' },
  '1688-1079954683027': { name: 'Vaso para auto de 30 oz III', short: 'Vaso 30 oz auto III', line: 'Vaso para auto', label: 'Vaso' },
  '1688-996829135363': { name: 'Taza de titanio 260', short: 'Taza titanio 260', line: 'Serie titanio', label: 'Taza de café' },
  '1688-856861841021': { name: 'Botella deportiva de boca ancha', short: 'Botella boca ancha', line: 'Botella deportiva', label: 'Botella' },
  '1688-1078491650182': { name: 'Botella en forma de huevo', short: 'Botella huevo', line: 'Botella diaria', label: 'Botella' },
  '1688-1077434657763': { name: 'Vaso para café y leche', short: 'Vaso café y leche', line: 'Serie café', label: 'Taza de café' },
  '1688-795012017777': { name: 'Tetera 316', short: 'Tetera 316', line: 'Serie té', label: 'Tetera' },
  '1688-794460487434': { name: 'Botella deportiva 500 II', short: 'Botella Sport 500 II', line: 'Botella deportiva', label: 'Botella' },
  '1688-801780517247': { name: 'Taza para café helado', short: 'Taza café helado', line: 'Serie café', label: 'Taza de café' },
  '1688-790194947940': { name: 'Vaso con asa de 40 oz II', short: 'Vaso 40 oz con asa II', line: 'Vaso con asa', label: 'Vaso' },
  '1688-1080358581874': { name: 'Taza para café helado II', short: 'Taza café helado II', line: 'Serie café', label: 'Taza de café' },
  '1688-857783845444': { name: 'Taza con asa', short: 'Taza con asa', line: 'Serie tazas', label: 'Taza de café' },
  '1688-858050360701': { name: 'Tetera espacial deportiva', short: 'Tetera deportiva', line: 'Tetera espacial', label: 'Tetera' },
  '1688-843218158734': { name: 'Mini taza de café', short: 'Mini taza', line: 'Serie café', label: 'Taza de café' },
};

const capacityNames: Record<string, string> = {
  'Large capacity': 'Gran capacidad',
  Small: 'Pequeña',
  Mini: 'Mini',
  '316 steel': 'Acero 316',
};

export const localizeProduct = (product: Product, lang: Lang): Product => {
  if (lang === 'en') return product;
  const copy = names[product.slug] ?? { name: product.name, short: product.shortName, line: product.line, label: product.categoryLabel };
  return { ...product, name: copy.name, shortName: copy.short, line: copy.line, categoryLabel: copy.label, capacity: capacityNames[product.capacity] ?? product.capacity, imageAlt: `Imagen de producto ZCZR: ${copy.name}` };
};
