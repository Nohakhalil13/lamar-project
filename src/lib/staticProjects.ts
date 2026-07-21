// Static project data built from /public/images/projects
// Used in the portfolio page when database is empty

export type StaticProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  images: string[];
};

const BASE = '/images/projects';

export const staticProjects: StaticProject[] = [
  {
    id: 'sp-01',
    slug: 'stucwerk-project-1',
    title: 'Stucwerk woonkamer',
    description: 'Volledig nieuw stucwerk in een moderne woonkamer. Sausklaar afgewerkt en klaar voor verf.',
    coverImage: `${BASE}/image7.jpeg`,
    images: [
      `${BASE}/490837676_18002488040775186_5734868356333061683_nfull.webp`,
      `${BASE}/485683818_17999323868775186_4643868875547615422_nfull.webp`,
      `${BASE}/424484019_758696049058698_5228169096728962049_nfull.jpg`,
    ],
  },
  {
    id: 'sp-02',
    slug: 'stucwerk-project-2',
    title: 'Stucwerk renovatie',
    description: 'Complete stucwerkrenovatie in een bestaande woning. Muren recht en sausklaar opgeleverd.',
    coverImage: `${BASE}/image8.jpeg`,
    images: [
      `${BASE}/438829756_798925164965209_7740383433861504538_nfull.jpg`,
      `${BASE}/430061772_333445143012904_9061525014604183814_nfull.jpg`,
      `${BASE}/432318765_388707650464098_387451058535731138_nfull.jpg`,
    ],
  },
  {
    id: 'sp-03',
    slug: 'schilderwerk-project-1',
    title: 'Schilderwerk appartement',
    description: 'Volledig schilderwerk van een appartement. Muren en plafonds in witte matte afwerking.',
    coverImage: `${BASE}/image9.jpeg`,
    images: [
      `${BASE}/409089609_870919337831295_3429288127286573085_nfull.jpg`,
      `${BASE}/409481422_1251288162206261_4668112953640508655_nfull.jpg`,
      `${BASE}/403986247_856225502664888_3712274798935327116_nfull.jpg`,
    ],
  },
  {
    id: 'sp-04',
    slug: 'latex-spuiten-project-1',
    title: 'Latex spuiten nieuwbouw',
    description: 'Latex gespoten muren en plafonds in een nieuwbouwwoning. Strak en streeploos resultaat.',
    coverImage: `${BASE}/image10.jpeg`,
    images: [
      `${BASE}/452281388_1021125332921548_14055840211373933_nfull.webp`,
      `${BASE}/455255305_1205151147499041_2329569024352065179_nfull.webp`,
      `${BASE}/447641388_1869812416834721_3487541887640104536_nfull.webp`,
    ],
  },
  {
    id: 'sp-05',
    slug: 'stucwerk-project-3',
    title: 'Stucwerk meerdere kamers',
    description: 'Stucwerk en dunpleister door het gehele huis. Inclusief hal, woonkamer en slaapkamers.',
    coverImage: `${BASE}/image11.jpeg`,
    images: [
      `${BASE}/418604640_377779681363760_3756179217099327098_nfull.jpg`,
      `${BASE}/401188181_1429566177590708_389813479765503837_nfull.jpg`,
      `${BASE}/405777666_728826999293022_1035283044340396569_nfull.jpg`,
    ],
  },
  {
    id: 'sp-06',
    slug: 'reparatiewerk-project-1',
    title: 'Reparatiewerk na waterschade',
    description: 'Professioneel herstel van stucwerk na waterschade. Naadloze afwerking aansluitend op bestaand werk.',
    coverImage: `${BASE}/image12.jpeg`,
    images: [
      `${BASE}/400003198_868406317927333_7803728622075592502_nfull.jpg`,
      `${BASE}/399444042_1295084221204039_7890261040434751089_nfull.jpg`,
      `${BASE}/399277487_3429069510736686_3414196156238121346_nfull.jpg`,
    ],
  },
  {
    id: 'sp-07',
    slug: 'stucwerk-project-4',
    title: 'Nieuwbouw stucwerk',
    description: 'Dunpleister en sausklaar stucwerk in een nieuwe woning. Opgeleverd op tijd en binnen budget.',
    coverImage: `${BASE}/image13.jpeg`,
    images: [
      `${BASE}/445562292_1501891280752626_3333340174875258066_nfull.webp`,
      `${BASE}/464180016_520509874082887_6273870259091590272_nfull.webp`,
      `${BASE}/461934169_1057277405515611_5423167309652359782_nfull.webp`,
    ],
  },
  {
    id: 'sp-08',
    slug: 'schilderwerk-project-2',
    title: 'Totaalrenovatie schilderwerk',
    description: 'Volledig schilderwerk van een woning: muren, plafonds en houtwerk in één project.',
    coverImage: `${BASE}/image14.jpeg`,
    images: [
      `${BASE}/399275390_686495466782022_6415886756749841898_nfull.jpg`,
      `${BASE}/399205701_303298992572132_6476474054840144017_nfull.jpg`,
      `${BASE}/398959069_305589872251514_5171858700552022863_nfull.jpg`,
    ],
  },
];
