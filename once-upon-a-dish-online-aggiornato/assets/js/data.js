/* ===========================================================================
   Once Upon a Dish — contenuti del menu / menu content
   Bilingue: ogni testo che cambia lingua è { it: '…', en: '…' }.
   Un testo scritto come semplice stringa vale per entrambe le lingue.
   =========================================================================== */

/* --- La lingua corrente --------------------------------------------------
   'en' all'ingresso: l'inglese e' la lingua predefinita del sito.
   Il selettore EN | IT cambia solo questo valore e ridisegna i testi,
   senza ricaricare la pagina. LANGTEXT() legge un campo bilingue; una
   stringa semplice vale per entrambe le lingue.                          */
const OUD = { lang: 'en' };

const LANGTEXT = (v) =>
  (v && typeof v === 'object' && !Array.isArray(v)) ? (v[OUD.lang] ?? v.en ?? '') : (v ?? '');

/* la lettera della rosa dei venti che cambia lingua: Ovest / West */
const W_LABEL = { it: 'O', en: 'W' };

const MENU = [
  {
    id: 'antipasti',
    title: { it: 'Antipasti', en: 'Starters' },
    tag:   { it: 'Per cominciare', en: 'To begin' },
    dishes: [
      {
        slug: 'stia-con-noi',
        name:  { it: 'Antipasto “Stia con Noi”', en: '“Be Our Guest” Starter' },
        price: '14,00',
        inspired: 'Beauty and the Beast',
        short: { it: 'Soufflé al formaggio dorati al forno con la nostra “roba grigia”.',
                 en: 'Golden baked cheese soufflés with our famous “grey stuff”.' },
        long:  { it: 'Soffici soufflé al formaggio dorati al forno, accompagnati dalla nostra misteriosa e prelibata "roba grigia" (mousse salata di fegatini e funghi trifolati).',
                 en: 'Light cheese soufflés baked until golden, served with our mysterious and delicious “grey stuff”: a savoury mousse of chicken liver and sautéed mushrooms.' }
      },
      {
        slug: 'arepas-encanto',
        name:  { it: 'Arepas con Queso di Encanto', en: 'Encanto Cheese Arepas' },
        price: '10,00',
        inspired: 'Encanto',
        short: { it: 'Focaccine di mais colombiane con cuore di formaggio filante.',
                 en: 'Colombian corn flatbreads with a melting cheese heart.' },
        long:  { it: 'Tipiche focaccine colombiane di farina di mais, dorate sulla piastra, con un cuore caldo e filante di formaggio fuso secondo la ricetta di Julieta.',
                 en: 'Traditional Colombian corn flatbreads, griddled until golden, with a warm, stringy heart of melted cheese made to Julieta’s recipe.' }
      },
      {
        slug: 'spinaci-puffs-kronk',
        name:  { it: 'Spinaci Puffs di Kronk', en: 'Kronk’s Spinach Puffs' },
        price: '10,00',
        inspired: 'The Emperor’s New Groove',
        short: { it: 'Fagottini di sfoglia con spinaci, ricotta ed erbe aromatiche.',
                 en: 'Puff pastry parcels with spinach, ricotta and fresh herbs.' },
        long:  { it: 'Fragranti fagottini di pasta sfoglia appena sfornati, ripieni di spinaci freschi, ricotta ed erbe aromatiche del palazzo dell\'Imperatore.',
                 en: 'Fragrant puff pastry parcels straight from the oven, filled with fresh spinach, ricotta and herbs from the Emperor’s own palace garden.' }
      },
      {
        slug: 'cocktail-sebastian',
        name:  { it: 'Il Cocktail di Sebastian', en: 'Sebastian’s Prawn Cocktail' },
        price: '16,00',
        inspired: 'The Little Mermaid',
        short: { it: 'Gamberi scottati su lattuga croccante e salsa rosa delicata.',
                 en: 'Seared prawns on crisp lettuce with a delicate pink sauce.' },
        long:  { it: 'Classico cocktail di gamberi scottati serviti su letto di lattuga croccante e salsa rosa delicata, dritti dalle profondità dell\'oceano.',
                 en: 'The classic prawn cocktail: seared prawns on a bed of crisp lettuce with a delicate pink sauce, straight from the depths of the ocean.' }
      }
    ]
  },
  {
    id: 'primi',
    title: { it: 'Primi', en: 'First Courses' },
    tag:   { it: 'Dalla cucina', en: 'From the kitchen' },
    dishes: [
      {
        slug: 'spaghetti-polpette',
        name:  { it: 'Spaghetti e Polpette di Lilli e il Vagabondo', en: 'Lady and the Tramp Spaghetti and Meatballs' },
        price: '18,00',
        inspired: 'Lady and the Tramp',
        short: { it: 'Spaghettoni al San Marzano con polpette di manzo stufate.',
                 en: 'Thick spaghetti in San Marzano sauce with slow-braised beef meatballs.' },
        long:  { it: 'Spaghettoni trafilati al bronzo con salsa al pomodoro San Marzano e morbide polpette di manzo stufate lentamente a fuoco lento.',
                 en: 'Bronze-drawn thick spaghetti with San Marzano tomato sauce and tender beef meatballs, braised slowly over a low flame.' }
      },
      {
        slug: 'trenette-pesto-luca',
        name:  { it: 'Trenette al Pesto di Luca', en: 'Luca’s Trenette al Pesto' },
        price: '16,00',
        inspired: 'Luca',
        short: { it: 'Trenette liguri al pesto genovese, fagiolini e patate.',
                 en: 'Ligurian trenette with Genoese pesto, green beans and potatoes.' },
        long:  { it: 'Trenette liguri al pesto di basilico fresco genovese, fagiolini teneri e patate a dadini secondo la più autentica tradizione di Portorosso.',
                 en: 'Ligurian trenette with fresh Genoese basil pesto, tender green beans and diced potatoes, in the most authentic Portorosso tradition.' }
      },
      {
        slug: 'zuppa-topolino',
        name:  { it: 'La Zuppa di Topolino', en: 'Mickey’s Soup' },
        price: '15,00',
        inspired: 'Mickey Mouse',
        short: { it: 'Vellutata dell’orto con crostini all’olio e rosmarino.',
                 en: 'Garden velouté with rosemary and olive oil croutons.' },
        long:  { it: 'Confortante vellutata dell\'orto con crostini di pane aromatizzati all\'olio e rosmarino, intagliati a forma delle iconiche orecchie di Topolino.',
                 en: 'A comforting garden velouté with bread croutons in olive oil and rosemary, cut into those unmistakable round ears.' }
      },
      {
        slug: 'bouillabaisse-sirenetta',
        name:  { it: 'Bouillabaisse de La Sirenetta', en: 'The Little Mermaid’s Bouillabaisse' },
        price: '25,00',
        inspired: 'The Little Mermaid',
        short: { it: 'Zuppa di pesce con crostacei, molluschi e pescato del giorno.',
                 en: 'Fish soup with shellfish, molluscs and the day’s catch.' },
        long:  { it: 'Ricca zuppa di pesce tradizionale con crostacei, molluschi e pescato del giorno sfumato al vino bianco e servito con crostoni alla salsa rouille.',
                 en: 'A rich traditional fish soup with shellfish, molluscs and the day’s catch, deglazed with white wine and served with rouille croutons.' }
      }
    ]
  },
  {
    id: 'secondi',
    title: { it: 'Secondi', en: 'Main Courses' },
    tag:   { it: 'Il piatto forte', en: 'The main event' },
    dishes: [
      {
        slug: 'pollo-mulan',
        name:  { it: 'Pollo Arrosto di Mulan', en: 'Mulan’s Roast Chicken' },
        price: '16,00',
        inspired: 'Mulan',
        short: { it: 'Cosciotto marinato a soia e zenzero, glassato al miele.',
                 en: 'Chicken leg marinated in soy and ginger, glazed with honey.' },
        long:  { it: 'Cosciotto di pollo marinato con salsa di soia, zenzero fresco, aglio e spezie orientali, glassato al miele e cotto al forno a legna.',
                 en: 'Chicken leg marinated in soy sauce, fresh ginger, garlic and eastern spices, glazed with honey and roasted in the wood oven.' }
      },
      {
        slug: 'souvlaki-hercules',
        name:  { it: 'Souvlaki di Hercules', en: 'Hercules’ Souvlaki' },
        price: '18,00',
        inspired: 'Hercules',
        short: { it: 'Spiedini alla brace con origano e limone, pita e tzatziki.',
                 en: 'Char-grilled skewers with oregano and lemon, pita and tzatziki.' },
        long:  { it: 'Spiedini greci di carne tenera marinata con origano selvatico e limone, cotti alla brace e accompagnati da pane pita e salsa tzatziki.',
                 en: 'Greek skewers of tender meat marinated with wild oregano and lemon, cooked over charcoal and served with pita bread and tzatziki.' }
      },
      {
        slug: 'banchetto-gaston',
        name:  { it: 'Il banchetto di Gaston', en: 'Gaston’s Feast' },
        sub:   { it: 'Tagliata di manzo', en: 'Sliced beef steak' },
        price: '20,00',
        inspired: 'Beauty and the Beast',
        short: { it: 'Tagliata ai ferri su rucola, pomodorini e scaglie di grana.',
                 en: 'Grilled sliced beef on rocket, cherry tomatoes and aged cheese shavings.' },
        long:  { it: 'Un piatto degno del più forte del villaggio: tagliata di manzo ai ferri con letto di rucola fresca, pomodorini e scaglie di grana stagionato.',
                 en: 'A plate worthy of the strongest man in the village: grilled sliced beef on a bed of fresh rocket with cherry tomatoes and shavings of aged cheese.' }
      },
      {
        slug: 'under-the-sea-platter',
        name:  { it: '“Under the Sea” Seafood Platter', en: '“Under the Sea” Seafood Platter' },
        price: '25,00',
        inspired: 'The Little Mermaid',
        short: { it: 'Gran grigliata di gamberoni, calamari e pescato di paranza.',
                 en: 'A grand grill of king prawns, squid and inshore catch.' },
        long:  { it: 'Gran piatto di pesce misto grigliato: gamberoni imperiali, calamari spadellati e trancio di pescato di paranza marinato con salmoriglio agli agrumi.',
                 en: 'A grand mixed grill from the sea: imperial king prawns, pan-seared squid and a cut of inshore catch marinated in citrus salmoriglio.' }
      }
    ]
  },
  {
    id: 'contorni',
    title: { it: 'Contorni', en: 'Sides' },
    tag:   { it: 'Da accompagnare', en: 'On the side' },
    dishes: [
      {
        slug: 'ratatouille-gusteau',
        name:  { it: 'Ratatouille di Remy', en: 'Remy’s Ratatouille' },
        price: '8,00',
        inspired: 'Ratatouille',
        short: { it: 'Spirale di verdure al forno su peperonata aromatica.',
                 en: 'A spiral of oven-baked vegetables on an aromatic pepper sauce.' },
        long:  { it: 'Spirale geometrica di zucchine, melanzane, pomodori e peperoni cotti al forno su una salsa peperonata aromatica ("chiunque può cucinare!").',
                 en: 'A geometric spiral of courgette, aubergine, tomato and pepper baked over an aromatic pepper sauce — because anyone can cook.' }
      },
      {
        slug: 'patatine-mr-potato',
        name:  { it: 'Patatine Fritte di Mr. Potato', en: 'Mr. Potato’s Fries' },
        price: '5,00',
        inspired: 'Toy Story',
        short: { it: 'Dorate, croccanti, con sale marino.',
                 en: 'Golden, crisp, with sea salt.' },
        long:  { it: 'Patatine fritte dorate e croccanti, servite con sale marino.',
                 en: 'Golden, crisp fries served with sea salt.' }
      },
      {
        slug: 'patate-forno-rosmarino',
        name:  { it: 'Patate al Forno con Rosmarino', en: 'Rosemary Roast Potatoes' },
        price: '5,00',
        inspired: null,
        short: { it: 'Patate novelle a spicchi con rosmarino fresco.',
                 en: 'New potato wedges with fresh rosemary.' },
        long:  { it: 'Patate novelle a spicchi cotte al forno con rosmarino fresco e olio extravergine d\'oliva.',
                 en: 'New potato wedges roasted with fresh rosemary and extra virgin olive oil.' }
      },
      {
        slug: 'insalata-foresta-incantata',
        name:  { it: 'Insalata della Foresta Incantata', en: 'Enchanted Forest Salad' },
        sub:   { it: 'Insalata mista', en: 'Mixed salad' },
        price: '5,00',
        inspired: 'Sleeping Beauty',
        short: { it: 'Misticanza di stagione, finocchi e carote croccanti.',
                 en: 'Seasonal leaves with fennel and crisp carrot.' },
        long:  { it: 'Misticanza di foglie novelle di stagione, finocchi a fette sottili e carote croccanti.',
                 en: 'A mix of young seasonal leaves, thinly sliced fennel and crisp carrot.' }
      }
    ]
  },
  {
    id: 'dolci',
    title: { it: 'Dolci', en: 'Desserts' },
    tag:   { it: 'E vissero felici', en: 'Happily ever after' },
    dishes: [
      {
        slug: 'beignets-tiana',
        name:  { it: 'Beignets di Tiana', en: 'Tiana’s Beignets' },
        price: '8,00',
        inspired: 'The Princess and the Frog',
        short: { it: 'Tre frittelle di New Orleans, zucchero a velo e miele caldo.',
                 en: 'Three New Orleans fritters with icing sugar and warm honey.' },
        long:  { it: 'Tre soffici frittelle quadrate in stile New Orleans, servite calde, ricoperte da una pioggia di zucchero a velo e gocce di miele caldo.',
                 en: 'Three soft square fritters in the New Orleans style, served warm under a snowfall of icing sugar and drops of warm honey.' }
      },
      {
        slug: 'biscotti-eat-me',
        name:  { it: 'Biscotti “Eat Me” del Paese delle Meraviglie', en: 'Wonderland “Eat Me” Biscuits' },
        price: '7,00',
        inspired: 'Alice in Wonderland',
        short: { it: 'Frollini a glassa reale con fialetta digestiva “Drink Me”.',
                 en: 'Royal-iced shortbread with a “Drink Me” digestif vial.' },
        long:  { it: 'Frollini decorati a glassa reale con impresso "Eat Me", accompagnati da una fialetta di liquore digestivo aromatizzato "Drink Me".',
                 en: 'Shortbread biscuits decorated in royal icing and marked “Eat Me”, served with a small vial of aromatic digestif labelled “Drink Me”.' }
      },
      {
        slug: 'torta-uvaspina',
        name:  { it: 'Torta di Uvaspina di Biancaneve', en: 'Snow White’s Gooseberry Pie' },
        price: '8,00',
        inspired: 'Snow White',
        short: { it: 'Crostata di frolla intrecciata con confettura di uva spina.',
                 en: 'Latticed shortcrust tart with wild gooseberry jam.' },
        long:  { it: 'Crostata artigianale con guscio di pasta frolla intrecciata e ripieno acidulo e dolce di confettura di uva spina selvatica.',
                 en: 'A hand-made tart with a latticed shortcrust shell and a sweet-sharp filling of wild gooseberry jam.' }
      },
      {
        slug: 'crema-edgar',
        name:  { it: 'Crema di Edgar', en: 'Edgar’s Cream' },
        price: '8,00',
        inspired: 'The Aristocats',
        short: { it: 'Chantilly alla vaniglia Bourbon con crumble di spezie dolci.',
                 en: 'Bourbon vanilla chantilly with a sweet-spice crumble.' },
        long:  { it: 'Vellutata crema chantilly alla vaniglia Bourbon con crumble di spezie dolci (tranquilli, assolutamente priva di sonnifero!).',
                 en: 'A silky Bourbon vanilla chantilly with a sweet-spice crumble — and absolutely no sleeping draught, we promise.' }
      },
      {
        slug: 'mela-avvelenata',
        name:  { it: 'La Mela Avvelenata', en: 'The Poisoned Apple' },
        price: '8,00',
        inspired: 'Snow White',
        short: { it: 'Trompe-l’œil di cioccolato rosso con cuore di mela cotogna.',
                 en: 'A red chocolate trompe-l’œil with a quince heart.' },
        long:  { it: 'Dolce scenografico a trompe-l\'œil: guscio lucido di cioccolato fondente rosso specchiato con cuore di mousse alla mela cotogna caramellata e cannella.',
                 en: 'A showpiece trompe-l’œil dessert: a mirror-glazed red dark chocolate shell with a heart of caramelised quince and cinnamon mousse.' }
      }
    ]
  },
  {
    id: 'cocktail',
    title: { it: 'Cocktail', en: 'Cocktails' },
    tag:   { it: 'A sip of magic', en: 'A sip of magic' },
    note:  { it: 'Ogni sorso racconta una storia.', en: 'Every sip tells a story.' },
    groups: [
      {
        title: { it: 'Signature Cocktails', en: 'Signature Cocktails' },
        dishes: [
          {
            slug: 'incantesimo-mezzanotte',
            name:  { it: 'L’Incantesimo di Mezzanotte', en: 'The Midnight Spell' },
            price: '10,00',
            eyebrow: { it: 'Signature cocktail', en: 'Signature cocktail' },
            short: { it: 'Gin, Blue Curaçao, sciroppo di lavanda, succo di lime e soda.',
                     en: 'Gin, Blue Curaçao, lavender syrup, lime juice and soda.' },
            long:  { it: 'Gin, Blue Curaçao, sciroppo di lavanda, succo di lime e soda. Un cocktail fresco e agrumato, dalle delicate note floreali e da un brillante colore azzurro, illuminato da un tocco scintillante.',
                     en: 'Gin, Blue Curaçao, lavender syrup, lime juice and soda. A fresh, citrus-forward cocktail with delicate floral notes and a brilliant blue colour, lit by a shimmering touch.' }
          },
          {
            slug: 'bacio-vero-amore',
            name:  { it: 'Il Bacio del Vero Amore', en: 'True Love’s Kiss' },
            price: '10,00',
            eyebrow: { it: 'Signature cocktail', en: 'Signature cocktail' },
            short: { it: 'Vodka, liquore ai fiori di sambuco, purea di lamponi, succo di lime e Prosecco Rosé.',
                     en: 'Vodka, elderflower liqueur, raspberry purée, lime juice and Prosecco Rosé.' },
            long:  { it: 'Vodka, liquore ai fiori di sambuco, purea di lamponi, succo di lime e Prosecco Rosé. Un cocktail fruttato e floreale, dolce e raffinato, con un delicato tocco romantico.',
                     en: 'Vodka, elderflower liqueur, raspberry purée, lime juice and Prosecco Rosé. A fruity, floral cocktail: sweet, refined and quietly romantic.' }
          },
          {
            slug: 'once-upon-a-dream',
            name:  { it: 'Once Upon a Dream', en: 'Once Upon a Dream' },
            price: '10,00',
            eyebrow: { it: 'Signature cocktail', en: 'Signature cocktail' },
            short: { it: 'Vermouth Rosso di Torino, Bitter Select, soda al pompelmo rosa, purea chiarificata di fragoline di bosco.',
                     en: 'Vermouth Rosso di Torino, Bitter Select, pink grapefruit soda, clarified wild strawberry purée.' },
            long:  { it: 'Un sorso agrodolce, fresco e frizzante, dove sfumature speziate e botaniche incontrano l’amaro nobile degli agrumi e una dolcezza fruttata, delicata e avvolgente.',
                     en: 'A bittersweet sip, fresh and sparkling, where spiced and botanical shades meet the noble bitterness of citrus and a delicate, enveloping fruit sweetness.' },
            ingredients: { it: ['Vermouth Rosso di Torino', 'Bitter Select', 'Soda al pompelmo rosa', 'Purea chiarificata di fragoline di bosco'],
                           en: ['Vermouth Rosso di Torino', 'Bitter Select', 'Pink grapefruit soda', 'Clarified wild strawberry purée'] }
          },
          {
            slug: 'fiocco-arendelle',
            name:  { it: 'Fiocco d’Arendelle', en: 'Arendelle Snowflake' },
            price: '10,00',
            eyebrow: { it: 'Signature cocktail', en: 'Signature cocktail' },
            short: { it: 'Gin, sciroppo alla vaniglia, Blue Curaçao, polvere di glitter edibile.',
                     en: 'Gin, vanilla syrup, Blue Curaçao, edible glitter dust.' },
            long:  { it: 'Cocktail glaciale, fresco, ammorbidito da una dolcezza vellutata.',
                     en: 'A glacial, fresh cocktail, softened by a velvety sweetness.' },
            ingredients: { it: ['Gin', 'Sciroppo alla vaniglia', 'Blue Curaçao', 'Polvere di glitter edibile'],
                           en: ['Gin', 'Vanilla syrup', 'Blue Curaçao', 'Edible glitter dust'] }
          },
          {
            slug: 'tre-desideri',
            name:  { it: 'Tre Desideri', en: 'Three Wishes' },
            price: '10,00',
            eyebrow: { it: 'Signature cocktail', en: 'Signature cocktail' },
            short: { it: 'Vodka, sciroppo di lavanda, Prosecco, top di zucchero filato.',
                     en: 'Vodka, lavender syrup, Prosecco, a crown of candy floss.' },
            long:  { it: 'Un cocktail fresco, frizzante e delicatamente floreale, con una dolcezza zuccherina che si scioglie al palato a ogni sorso.',
                     en: 'A fresh, sparkling and delicately floral cocktail, with a sugary sweetness that melts on the palate with every sip.' },
            ingredients: { it: ['Vodka', 'Sciroppo di lavanda', 'Prosecco', 'Top di zucchero filato'],
                           en: ['Vodka', 'Lavender syrup', 'Prosecco', 'Candy floss top'] }
          }
        ]
      },
      {
        title: { it: 'Mocktails', en: 'Mocktails' },
        note:  { it: 'Ogni sorso ha il suo incanto.', en: 'Every sip has its own charm.' },
        dishes: [
          {
            slug: 'teiera-mrs-bric',
            name:  { it: 'La Teiera di Mrs. Bric', en: 'Mrs. Potts’ Teapot' },
            price: '7,00',
            tag: { it: 'Analcolico', en: 'Alcohol-free' },
            eyebrow: { it: 'Mocktail · analcolico', en: 'Mocktail · alcohol-free' },
            short: { it: 'Tè freddo alla pesca e camomilla, frutti di bosco e vaniglia.',
                     en: 'Iced peach and chamomile tea, berries and vanilla.' },
            long:  { it: 'Tè freddo alla pesca e camomilla, frutti di bosco e vaniglia. Una bevanda delicata e profumata, servita in una tazza da tè con una fettina di mela.',
                     en: 'Iced peach and chamomile tea with berries and vanilla. A delicate, fragrant drink served in a teacup with a slice of apple.' }
          },
          {
            slug: 'incanto-zucca',
            name:  { it: 'L’Incanto della Zucca', en: 'The Pumpkin’s Charm' },
            price: '7,00',
            tag: { it: 'Analcolico', en: 'Alcohol-free' },
            eyebrow: { it: 'Mocktail · analcolico', en: 'Mocktail · alcohol-free' },
            short: { it: 'Succo d’arancia, succo di mela, lime, sciroppo alla cannella e ginger ale.',
                     en: 'Orange juice, apple juice, lime, cinnamon syrup and ginger ale.' },
            long:  { it: 'Succo d’arancia, succo di mela, lime, sciroppo alla cannella e ginger ale. Un mocktail agrumato e leggermente speziato, fresco e frizzante, ispirato alla magia delle fiabe.',
                     en: 'Orange juice, apple juice, lime, cinnamon syrup and ginger ale. A citrus mocktail with a light touch of spice, fresh and sparkling, inspired by fairy-tale magic.' }
          },
          {
            slug: 'te-incantato',
            name:  { it: 'Risveglio a Wonderland', en: 'Wonderland Awakening' },
            price: '7,00',
            tag: { it: 'Analcolico', en: 'Alcohol-free' },
            eyebrow: { it: 'Mocktail · analcolico', en: 'Mocktail · alcohol-free' },
            short: { it: 'Tè verde al gelsomino, sciroppo di pesca bianca e lavanda, con una nota di matcha.',
                     en: 'Jasmine green tea, white peach and lavender syrup, with a note of matcha.' },
            long:  { it: 'Tè verde al gelsomino, sciroppo di pesca bianca e lavanda, con una delicata nota di matcha. Un mocktail botanico e aromatico, dalle sfumature verdi e dal finale floreale.',
                     en: 'Jasmine green tea with white peach and lavender syrup and a delicate note of matcha. A botanical, aromatic mocktail with green shades and a floral finish.' }
          }
        ]
      }
    ]
  },
  {
    id: 'soft-drink',
    title: { it: 'Soft Drink', en: 'Soft Drinks' },
    tag:   { it: 'Classic & refreshing', en: 'Classic & refreshing' },
    note:  { it: 'Le bevande classiche per accompagnare ogni storia.',
             en: 'The classics, to go with every story.' },
    simple: true,
    dishes: [
      { name: { it: 'Acqua Panna naturale',  en: 'Still mineral water' },     size: '50 cl', price: '2,00' },
      { name: { it: 'Acqua Panna frizzante', en: 'Sparkling mineral water' }, size: '50 cl', price: '2,00' },
      { name: 'Coca-Cola',       size: '33 cl', price: '3,00' },
      { name: 'Coca-Cola Zero',  size: '33 cl', price: '3,00' },
      { name: 'Fanta',           size: '33 cl', price: '3,00' },
      { name: 'Fanta Lemon',     size: '33 cl', price: '3,00' },
      { name: 'Sprite',          size: '33 cl', price: '3,00' },
      { name: 'Chinotto',        size: '27,5–33 cl', price: '3,00' },
      { name: { it: 'Succhi di frutta assortiti', en: 'Assorted fruit juices' }, size: '', price: '3,00' }
    ]
  },
  {
    id: 'birre',
    title: { it: 'Birre', en: 'Beers' },
    tag:   { it: 'La Cantina delle Fiabe', en: 'The Fairy-Tale Cellar' },
    note:  { it: 'Ogni storia merita un brindisi.', en: 'Every story deserves a toast.' },
    footer:{ it: 'Un piccolo sorso di magia, una grande storia da raccontare.',
             en: 'A small sip of magic, a great story to tell.' },
    simple: true,
    groups: [
      {
        title: { it: 'Birre alla spina', en: 'On tap' },
        dishes: [
          {
            name: { it: 'Birra Bionda', en: 'Lager on tap' },
            short: { it: 'Fresca, dorata e dissetante.', en: 'Fresh, golden and thirst-quenching.' },
            prices: [ { label: '20 cl', price: '3,00' }, { label: '40 cl', price: '5,00' } ]
          },
          {
            name: { it: 'Birra Rossa', en: 'Red ale' },
            short: { it: 'Corposa e avvolgente, con note maltate e caramellate.',
                     en: 'Full-bodied and enveloping, with malty, caramel notes.' },
            prices: [ { label: '20 cl', price: '3,50' }, { label: '40 cl', price: '6,00' } ]
          },
          {
            name: { it: 'Birra IPA', en: 'IPA' },
            short: { it: 'Aromatica e luppolata, con piacevoli note agrumate.',
                     en: 'Aromatic and hoppy, with pleasant citrus notes.' },
            prices: [ { label: '20 cl', price: '3,50' }, { label: '40 cl', price: '6,00' } ]
          }
        ]
      },
      {
        title: { it: 'Birre in bottiglia · 33 cl', en: 'Bottled · 33 cl' },
        dishes: [
          {
            name: { it: 'Birra Lager', en: 'Lager' }, size: '33 cl', price: '4,00',
            short: { it: 'Equilibrata e rinfrescante, perfetta per ogni occasione.',
                     en: 'Balanced and refreshing, right for any occasion.' }
          },
          {
            name: { it: 'Birra Blanche', en: 'Blanche' }, size: '33 cl', price: '4,50',
            short: { it: 'Delicata e speziata, con fresche note agrumate.',
                     en: 'Delicate and spiced, with fresh citrus notes.' }
          },
          {
            name: { it: 'Birra Analcolica', en: 'Alcohol-free beer' }, size: '33 cl', price: '4,00',
            tag: { it: 'Analcolica', en: 'Alcohol-free' },
            short: { it: 'Leggera e dissetante, per brindare senza alcol.',
                     en: 'Light and thirst-quenching, for a toast without alcohol.' }
          }
        ]
      }
    ]
  },
  {
    id: 'vini',
    title: { it: 'Carta dei Vini', en: 'Wine List' },
    tag:   { it: 'I Vini del Regno', en: 'The Wines of the Realm' },
    note:  { it: 'Ogni calice custodisce una storia.', en: 'Every glass holds a story.' },
    footer:{ it: 'Un brindisi alla magia, un calice alla volta.',
             en: 'A toast to magic, one glass at a time.' },
    /* questa sezione si apre in due tempi: prima l'introduzione, poi la carta */
    gated: true,
    gate: {
      lead:  { it: 'La nostra carta è una piccola biblioteca di vendemmie: bianchi che sanno di agrumi e fiori, rossi di frutti maturi e spezie, rosati leggeri e bollicine per i momenti che meritano un brindisi.',
               en: 'Our list is a small library of vintages: whites of citrus and blossom, reds of ripe fruit and spice, light rosés, and bubbles for the moments that deserve a toast.' },
      cta:   { it: 'Clicca qui per scoprire tutti i vini', en: 'Click here to discover all the wines' }
    },
    simple: true,
    groups: [
      {
        title: { it: 'Vini bianchi', en: 'White wines' },
        dishes: [
          {
            name: { it: 'Grillo · Sicilia', en: 'Grillo · Sicily' },
            short: { it: 'Fresco e profumato, con note agrumate e floreali.',
                     en: 'Fresh and fragrant, with citrus and floral notes.' },
            prices: [ { label: { it: 'Calice', en: 'Glass' }, price: '5,00' },
                      { label: { it: 'Bottiglia', en: 'Bottle' }, price: '22,00' } ]
          },
          {
            name: 'Chardonnay',
            short: { it: 'Morbido ed equilibrato, con sentori di frutta a polpa bianca.',
                     en: 'Soft and balanced, with hints of white-fleshed fruit.' },
            prices: [ { label: { it: 'Calice', en: 'Glass' }, price: '5,00' },
                      { label: { it: 'Bottiglia', en: 'Bottle' }, price: '24,00' } ]
          }
        ]
      },
      {
        title: { it: 'Vini rossi', en: 'Red wines' },
        dishes: [
          {
            name: { it: 'Nero d’Avola · Sicilia', en: 'Nero d’Avola · Sicily' },
            short: { it: 'Intenso e avvolgente, con note di frutti rossi maturi e spezie.',
                     en: 'Intense and enveloping, with ripe red fruit and spice.' },
            prices: [ { label: { it: 'Calice', en: 'Glass' }, price: '5,00' },
                      { label: { it: 'Bottiglia', en: 'Bottle' }, price: '22,00' } ]
          },
          {
            name: { it: 'Syrah · Sicilia', en: 'Syrah · Sicily' },
            short: { it: 'Aromatico e strutturato, con sentori di frutti neri e delicate note speziate.',
                     en: 'Aromatic and structured, with black fruit and delicate spice.' },
            prices: [ { label: { it: 'Calice', en: 'Glass' }, price: '5,50' },
                      { label: { it: 'Bottiglia', en: 'Bottle' }, price: '25,00' } ]
          }
        ]
      },
      {
        title: { it: 'Vini rosati', en: 'Rosé wines' },
        dishes: [
          {
            name: { it: 'Rosato Siciliano', en: 'Sicilian Rosé' },
            short: { it: 'Fresco e fruttato, con delicate note floreali.',
                     en: 'Fresh and fruity, with delicate floral notes.' },
            prices: [ { label: { it: 'Calice', en: 'Glass' }, price: '5,00' },
                      { label: { it: 'Bottiglia', en: 'Bottle' }, price: '22,00' } ]
          }
        ]
      },
      {
        title: { it: 'Bollicine', en: 'Sparkling' },
        dishes: [
          {
            name: 'Prosecco DOC',
            short: { it: 'Vivace e delicato, con note di mela e pera. Ideale per brindare a un momento speciale.',
                     en: 'Lively and delicate, with apple and pear. Made for toasting a special moment.' },
            prices: [ { label: { it: 'Calice', en: 'Glass' }, price: '5,00' },
                      { label: { it: 'Bottiglia', en: 'Bottle' }, price: '25,00' } ]
          }
        ]
      }
    ]
  }
];

/* --- La nota finale del menu --------------------------------------------- */
const COVER = {
  label: { it: 'Coperto', en: 'Cover charge' },
  note:  { it: 'a persona', en: 'per person' },
  price: '2,00'
};

/* --- Testi dell'interfaccia ----------------------------------------------- */
const UI = {
  tagline:   { it: 'Where every dish tells a story.', en: 'Where every dish tells a story.' },
  open:      { it: 'Apri la storia', en: 'Open the story' },
  scroll:    { it: 'Scorri al menu', en: 'Scroll to the menu' },
  indexTitle:{ it: 'Il Menu', en: 'The Menu' },
  indexNote: { it: 'Scegli un capitolo della storia.', en: 'Choose a chapter of the story.' },
  back:      { it: 'Indice', en: 'Contents' },
  top:       { it: 'Torna su', en: 'Back to top' },
  view:      { it: 'Vedi il piatto', en: 'View dish' },
  closeCard: { it: 'Chiudi la scheda', en: 'Close' },
  house:     { it: 'Dalla nostra cucina', en: 'From our kitchen' },
  inspired:  { it: 'Ispirato a', en: 'Inspired by' },
  soon:      { it: 'FOTOGRAFIA IN ARRIVO', en: 'PHOTOGRAPH COMING SOON' },
  footHead:  { it: 'Once Upon a Dish', en: 'Once Upon a Dish' },
  footText:  { it: 'Cucina d’ispirazione narrativa. Ogni piatto prende il nome da una storia, ma arriva al tavolo come lo immagina la nostra cucina.',
               en: 'Storytelling kitchen. Every dish takes its name from a tale, but reaches the table as our kitchen imagines it.' }
};

/* --- La legenda degli allergeni -------------------------------------------
   Elenco generale delle quattordici categorie previste dalla legge: non
   dichiara quali allergeni contenga ciascun piatto. La mappatura piatto per
   piatto va fatta sulle ricette e sulle schede dei fornitori.             */
const ALLERGENS = {
  id: 'allergeni',
  title: { it: 'Allergeni', en: 'Allergens' },
  tag:   { it: 'La tua sicurezza fa parte della nostra storia.',
           en: 'Your safety is part of our story.' },
  lead:  { it: 'Per garantire un’esperienza piacevole e consapevole, informiamo i nostri ospiti che i nostri piatti e le nostre bevande possono contenere ingredienti appartenenti alle seguenti categorie di allergeni.',
           en: 'To help our guests make informed choices, please be aware that our food and beverages may contain ingredients belonging to the following allergen categories.' },
  list: [
    { it: 'Cereali contenenti glutine',        en: 'Cereals containing gluten' },
    { it: 'Crostacei',                         en: 'Crustaceans' },
    { it: 'Uova',                              en: 'Eggs' },
    { it: 'Pesce',                             en: 'Fish' },
    { it: 'Arachidi',                          en: 'Peanuts' },
    { it: 'Soia',                              en: 'Soybeans' },
    { it: 'Latte e lattosio',                  en: 'Milk and lactose' },
    { it: 'Frutta a guscio',                   en: 'Nuts' },
    { it: 'Sedano',                            en: 'Celery' },
    { it: 'Senape',                            en: 'Mustard' },
    { it: 'Semi di sesamo',                    en: 'Sesame seeds' },
    { it: 'Anidride solforosa e solfiti',      en: 'Sulphur dioxide and sulphites' },
    { it: 'Lupini',                            en: 'Lupin' },
    { it: 'Molluschi',                         en: 'Molluscs' }
  ],
  noteTitle: { it: 'Hai un’allergia o un’intolleranza?',
               en: 'Do you have a food allergy or intolerance?' },
  note: {
    it: ['Ti invitiamo a informare il nostro personale prima di ordinare. Saremo lieti di fornirti informazioni sugli allergeni presenti nei singoli piatti.',
         'La presenza degli allergeni deve essere verificata in base agli ingredienti effettivamente utilizzati e alle procedure di preparazione. In caso di allergie, chiedi sempre informazioni al personale prima di effettuare l’ordine.'],
    en: ['Please inform our staff before ordering. We will be happy to provide information about the allergens present in individual dishes.',
         'The presence of allergens must be verified against the ingredients actually used and the food preparation procedures. If you have a food allergy, please speak to our staff before ordering.']
  },
  legal: { it: 'Informazioni sugli allergeni ai sensi del Regolamento (UE) n. 1169/2011.',
           en: 'Allergen information in accordance with Regulation (EU) No 1169/2011.' }
};

/* --- Proporzioni delle fotografie (larghezza / altezza) -------------------
   Servono solo a riservare lo spazio giusto prima che l'immagine arrivi,
   così la scheda non salta. Se sostituisci una foto con una di forma
   diversa non devi aggiornare nulla: il sito corregge da solo al caricamento.
   Per rigenerare la tabella: ruby tools/ratios.rb                          */
const AR = {
  'arepas-encanto': 1.004,
  'bacio-vero-amore': 0.751,
  'banchetto-gaston': 1.013,
  'beignets-tiana': 0.996,
  'biscotti-eat-me': 1.006,
  'bouillabaisse-sirenetta': 1.007,
  'cocktail-sebastian': 0.994,
  'crema-edgar': 1.011,
  'fiocco-arendelle': 0.806,
  'incantesimo-mezzanotte': 0.731,
  'incanto-zucca': 1.178,
  'insalata-foresta-incantata': 1.916,
  'mela-avvelenata': 1.781,
  'once-upon-a-dream': 0.753,
  'patate-forno-rosmarino': 1.358,
  'patatine-mr-potato': 1.006,
  'pollo-mulan': 1.013,
  'ratatouille-gusteau': 1.007,
  'souvlaki-hercules': 1.007,
  'spaghetti-polpette': 1.033,
  'spinaci-puffs-kronk': 1.013,
  'stia-con-noi': 1.029,
  'te-incantato': 0.986,
  'teiera-mrs-bric': 0.808,
  'torta-uvaspina': 1.000,
  'tre-desideri': 0.743,
  'trenette-pesto-luca': 1.375,
  'under-the-sea-platter': 1.004,
  'zuppa-topolino': 1.000
};

/* --- Fotografie incorporate ----------------------------------------------
   Vuoto nella versione a cartella: le foto si caricano da assets/photos/.
   La build "un file solo" (build.rb) riempie questa tabella.            */
const PHOTOS = {};

/* --- I luoghi nascosti nella mappa (easter egg: passa col mouse) ----------
   x, y  = coordinate sulla pergamena (larga 1600; y cresce scendendo)
   s     = scala del disegno
   g     = nome della miniatura, definita in map.js
   Lascia libera la fascia centrale 440–1160: è la colonna del menu.        */
const LANDMARKS = [
  /* banda di sinistra */
  { x:  248, y:  300, s: 1.00, g: 'tavern',    label: 'The Snuggly Duckling',    sub: 'Rapunzel’s world' },
  { x:  240, y:  660, s: 1.00, g: 'castle',    label: 'Castle of the Thorns',    sub: 'Sleeping Beauty' },
  { x:  232, y: 1020, s: 0.96, g: 'teaparty',  label: 'The Mad Tea Party',       sub: 'Alice’s world' },
  { x:  250, y: 1372, s: 0.96, g: 'village',   label: 'Villeneuve',              sub: 'Beauty and the Beast' },
  { x:  236, y: 1716, s: 0.96, g: 'temple',    label: 'Temple of the Hero',      sub: 'Hercules’ world' },
  { x:  246, y: 2060, s: 0.98, g: 'casita',    label: 'Casita Madrigal',         sub: 'Encanto' },
  { x:  238, y: 2232, s: 0.74, g: 'bistro',    label: 'Gusteau’s',               sub: 'Anyone can cook' },
  { x:  234, y: 2404, s: 0.96, g: 'pyramid',   label: 'The Emperor’s Palace',    sub: 'Kronk’s kitchen' },
  { x:  242, y: 2748, s: 0.96, g: 'balcony',   label: 'Vieux Carré',             sub: 'Tiana’s New Orleans' },
  { x:  246, y: 3086, s: 0.98, g: 'orchard',   label: 'Orchard of the Red Apple', sub: 'Snow White’s world' },
  /* banda di destra */
  { x: 1310, y:  186, s: 1.00, g: 'tower',     label: 'The Tower',               sub: 'Rapunzel’s world' },
  { x: 1424, y:  400, s: 0.92, g: 'lanterns',  label: 'Floating Lanterns',       sub: 'A sky full of wishes' },
  { x: 1302, y:  772, s: 0.98, g: 'forest',    label: 'The Enchanted Forest',    sub: 'Sleeping Beauty' },
  { x: 1320, y: 1118, s: 0.96, g: 'greatTree', label: 'Wonderland',              sub: 'Alice’s world' },
  { x: 1310, y: 1464, s: 0.98, g: 'gothic',    label: 'The Beast’s Castle',      sub: 'Beauty and the Beast' },
  { x: 1320, y: 1810, s: 0.96, g: 'bistro',    label: 'Tony’s Restaurant',       sub: 'Lady and the Tramp' },
  { x: 1310, y: 2156, s: 0.96, g: 'pagoda',    label: 'The Imperial Garden',     sub: 'Mulan’s world' },
  { x: 1310, y: 2502, s: 0.98, g: 'harbour',   label: 'Portorosso',              sub: 'Home of Luca' },
  { x: 1320, y: 2848, s: 0.96, g: 'undersea',  label: 'Atlantica',               sub: 'Under the sea' },
  { x: 1310, y: 3194, s: 0.98, g: 'cottage',   label: 'The Dwarfs’ Cottage',     sub: 'Snow White’s world' }
];
