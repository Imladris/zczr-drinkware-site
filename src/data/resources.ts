export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: 'briefing-a-custom-drinkware-program',
    title: 'How to brief a custom drinkware program',
    category: 'Buyer guide',
    date: 'October 2026',
    readTime: '5 min read',
    excerpt:
      'A clear brief shortens sampling and avoids expensive revisions. Here is the information a factory needs before quoting a private-label tumbler or bottle.',
    image: '/images/forest.webp',
    imageAlt: 'A quiet forest trail with sunlight coming through the trees.',
    body: [
      'A drinkware program moves faster when the brief is specific. The first conversation does not need a finished design, but it should give the factory enough information to recommend a model, a construction and a realistic sampling path.',
      'Start with the shape and capacity: tumbler, bottle, jug or food flask; the volume in ounces or millilitres; and whether it needs to fit a cup holder, a bike cage, a backpack pocket or a retail gift box. A reference photo is useful, even if it is not your own design, because it gives the factory a clear direction without ambiguity.',
      'Next, describe the finish and branding. Powder coat, matte or gloss, one colour or a gradient, laser engraving, silk-screen or a debossed logo. If you have a Pantone reference or a physical colour chip, include it. Confirm whether the logo must wrap around the body and whether the lid should be branded as well.',
      'Packaging is part of the product. Decide whether you need a white box, a printed colour box, a display carton, a poly bag or a custom insert. If the product will be sold in a retail chain, ask for the carton dimensions, barcode placement and any required warning text early.',
      'Finally, state the commercial frame: target quantity, destination market, required compliance documents, target ship date and preferred Incoterm. These details determine the right sample, the packing method and the production window. A factory can quote more accurately when the brief is complete.',
    ],
  },
  {
    slug: 'vacuum-insulation-questions',
    title: 'Vacuum insulation: what wholesale buyers should ask',
    category: 'Technical',
    date: 'September 2026',
    readTime: '6 min read',
    excerpt:
      'Double-wall vacuum is a construction, not a performance guarantee. These are the questions that separate a reliable sample from a promising catalogue photo.',
    image: '/images/lake.webp',
    imageAlt: 'A still alpine lake reflecting mountains and a wooden boathouse.',
    body: [
      'Most insulated drinkware uses a double-wall vacuum construction: an outer steel shell, an inner steel wall, and a sealed gap between them. The vacuum removes the air that heat needs to travel through. A copper or reflective lining can further reduce radiant heat transfer.',
      'The construction is only the beginning. Buyers should ask about the wall thickness, the lid gasket material, the lid fit and the test conditions used for any performance claim. A cold-retention number measured with ice water at room temperature is not directly comparable to a number measured in a hot car or at altitude.',
      'Ask for the sample protocol. How long is the sample tested, at what fill level, with what starting temperature, and how often is it checked? A credible supplier should be able to describe the method, not only the final number.',
      'The lid is often the weak point. Check the gasket compression, the thread engagement, the straw seal and whether the lid can be cleaned properly. A leak test should include an upside-down hold and a packed-bag simulation, not only a quick hand shake.',
      'Finally, confirm how the specification will be held during mass production. The approved sample, the written specification and the pre-shipment inspection should all describe the same product. If a performance claim matters to your market, ask for the test record and keep it with the purchase order.',
    ],
  },
  {
    slug: 'export-packing-powder-coated-drinkware',
    title: 'Export packing for powder-coated drinkware',
    category: 'Logistics',
    date: 'August 2026',
    readTime: '4 min read',
    excerpt:
      'Powder coat can chip, lids can rattle, and cartons can crush. A practical packing brief protects the finish and keeps the container load predictable.',
    image: '/images/coffee.webp',
    imageAlt: 'An empty desert road leading toward mountains.',
    body: [
      'Drinkware is light but bulky, and the finish is vulnerable to abrasion. Export packing needs to protect both the surface and the carton structure. For small items, a shock-resistant inner pack and a double-wall carton are a sensible starting point; individual poly bags or tissue wraps can reduce scuffing during transit.',
      'Confirm how the vessels sit inside the carton. A snug fit with dividers or molded pulp reduces movement. If the product has a handle, straw or gift box, test the packed configuration rather than assuming the unpacked product will travel well.',
      'For larger programs, ask about palletisation and container loading. Cartons should be stackable without crushing the bottom layer, and the pallet should be wrapped and labelled for the destination. Wooden crates or pallets may be appropriate for heavier or higher-value programs, subject to the destination country’s wood packaging requirements.',
      'Build a pre-shipment check around the packing spec: carton dimensions, carton weight, product quantity, label placement, barcode readability and a sample drop or compression check where appropriate. A photo record of the packed carton is useful for both buyer and supplier.',
      'The goal is not the most expensive packing. It is a repeatable packing method that protects the finish, meets the retailer’s requirements and arrives with the carton intact. Confirm it before production, not after the container is loaded.',
    ],
  },
];

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
