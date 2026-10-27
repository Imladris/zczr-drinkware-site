import type { Article } from '../data/resources';

export type { Article };

export const articlesEs: Article[] = [
  {
    slug: 'briefing-a-custom-drinkware-program',
    title: 'Cómo preparar el brief de un programa de menaje personalizado',
    category: 'Guía para compradores',
    date: 'Octubre 2026',
    readTime: '5 min de lectura',
    excerpt:
      'Un brief claro acorta el muestreo y evita revisiones costosas. Esta es la información que necesita una fábrica antes de cotizar un vaso o una botella de marca privada.',
    image: '/images/forest.webp',
    imageAlt: 'Un sendero tranquilo en el bosque con luz solar entre los árboles.',
    body: [
      'Un programa de menaje avanza más rápido cuando el brief es concreto. La primera conversación no necesita un diseño terminado, pero sí debe dar a la fábrica suficiente información para recomendar un modelo, una construcción y un plan de muestras realista.',
      'Empieza por la forma y la capacidad: vaso, botella, jarra o fiambrera; el volumen en onzas o mililitros; y si debe encajar en un portavasos, una jaula de bicicleta, un bolsillo de mochila o una caja de regalo. Una foto de referencia ayuda, aunque no sea tu diseño, porque da una dirección clara sin ambigüedad.',
      'Después describe el acabado y la marca: recubrimiento en polvo, mate o brillo, un color o un degradado, grabado láser, serigrafía o logotipo en relieve. Incluye una referencia Pantone o una muestra física. Confirma si el logotipo debe rodear el cuerpo y si la tapa también lleva marca.',
      'El embalaje forma parte del producto. Decide si necesitas caja blanca, caja impresa, expositor, bolsa de polietileno o inserto personalizado. Si el producto se venderá en una cadena de retail, pide pronto las dimensiones de la caja, la ubicación del código de barras y los textos obligatorios.',
      'Por último, indica el marco comercial: cantidad objetivo, mercado de destino, documentos de cumplimiento, fecha de embarque e Incoterm preferido. Estos datos determinan la muestra adecuada, el método de embalaje y la ventana de producción. Una fábrica puede cotizar con más precisión cuando el brief está completo.',
    ],
  },
  {
    slug: 'vacuum-insulation-questions',
    title: 'Aislamiento al vacío: qué debe preguntar un comprador mayorista',
    category: 'Técnico',
    date: 'Septiembre 2026',
    readTime: '6 min de lectura',
    excerpt:
      'El doble pared con vacío es una construcción, no una garantía de rendimiento. Estas son las preguntas que separan una muestra fiable de una foto de catálogo prometedora.',
    image: '/images/lake.webp',
    imageAlt: 'Un lago alpino en calma con montañas y una casa de madera reflejadas en el agua.',
    body: [
      'La mayoría del menaje isotérmico utiliza una construcción de doble pared con vacío: una carcasa exterior de acero, una pared interior y un espacio sellado entre ambas. El vacío elimina el aire por el que viaja el calor. Un recubrimiento de cobre o reflectante puede reducir aún más la transferencia de calor radiante.',
      'La construcción es solo el principio. El comprador debe preguntar por el grosor de las paredes, el material de la junta de la tapa, el ajuste de la tapa y las condiciones de ensayo utilizadas para cualquier afirmación de rendimiento. Una cifra de retención de frío medida con hielo y agua a temperatura ambiente no es comparable con otra medida en un coche caliente o a altitud.',
      'Pide el protocolo de muestra. ¿Cuánto tiempo se ensaya, con qué nivel de llenado, con qué temperatura inicial y con qué frecuencia se comprueba? Un proveedor creíble debe poder describir el método, no solo el número final.',
      'La tapa suele ser el punto débil. Comprueba la compresión de la junta, el enganche de la rosca, el sellado de la pajita y si la tapa se puede limpiar bien. Una prueba de fuga debe incluir un mantenimiento boca abajo y una simulación dentro de una mochila, no solo una sacudida rápida.',
      'Por último, confirma cómo se mantendrá la especificación durante la producción en serie. La muestra aprobada, la especificación escrita y la inspección previa al embarque deben describir el mismo producto. Si una prestación es importante para tu mercado, pide el registro de ensayo y guárdalo con la orden de compra.',
    ],
  },
  {
    slug: 'export-packing-powder-coated-drinkware',
    title: 'Embalaje de exportación para menaje con recubrimiento en polvo',
    category: 'Logística',
    date: 'Agosto 2026',
    readTime: '4 min de lectura',
    excerpt:
      'El recubrimiento en polvo puede astillarse, las tapas pueden sonar y las cajas pueden aplastarse. Un brief de embalaje práctico protege el acabado y hace previsible la carga del contenedor.',
    image: '/images/coffee.webp',
    imageAlt: 'Una carretera desierta que se adentra en las montañas.',
    body: [
      'El menaje es ligero pero voluminoso, y el acabado es vulnerable a la abrasión. El embalaje de exportación debe proteger tanto la superficie como la estructura de la caja. Para artículos pequeños, una protección interior resistente a impactos y una caja de doble pared son un buen punto de partida; las bolsas individuales o el papel de seda reducen los roces durante el transporte.',
      'Confirma cómo se colocan los vasos dentro de la caja. Un ajuste firme con separadores o pulpa moldeada reduce el movimiento. Si el producto tiene asa, pajita o caja de regalo, prueba la configuración embalada en lugar de suponer que el producto sin embalar viajará bien.',
      'Para programas grandes, pregunta por el paletizado y la carga del contenedor. Las cajas deben apilarse sin aplastar la capa inferior, y el palé debe ir envuelto y etiquetado para el destino. Las cajas o palés de madera pueden ser adecuados para programas pesados o de alto valor, según los requisitos del país de destino para embalaje de madera.',
      'Prepara una comprobación previa al embarque basada en la especificación de embalaje: dimensiones de caja, peso, cantidad, colocación de etiquetas, legibilidad del código de barras y una prueba de caída o compresión cuando corresponda. Un registro fotográfico de la caja embalada es útil para comprador y proveedor.',
      'El objetivo no es el embalaje más caro, sino un método repetible que proteja el acabado, cumpla los requisitos del retail y llegue con la caja intacta. Confírmalo antes de producir, no después de cargar el contenedor.',
    ],
  },
];

export const getArticleEs = (slug: string) => articlesEs.find((article) => article.slug === slug);
