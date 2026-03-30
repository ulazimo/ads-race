export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  points: number;
  timeoutSeconds: number;
}

export interface Ad {
  id: string;
  title: string;
  brand: string;
  videoUri: string | number;
  /** Koliko sekundi korisnik gleda reklamu pre kviza */
  watchSeconds: number;
  questions: Question[];
}

const ads: Ad[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Kit Kat Bars (2013, 15s)
  //    Crveno pakovanje, lomljenje čokoladice, "Break me off a piece"
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'kitkat-2013',
    title: 'Kit Kat Bars',
    brand: 'Kit Kat',
    videoUri:
      'https://archive.org/download/2013_USA_TV_Commercials/2013%20-%20Commercial%20-%20Candy%20-%20Kit%20Kat%20Bars.mp4',
    watchSeconds: 15,
    questions: [
      {
        id: 'q1',
        text: 'Koje boje je pakovanje Kit Kat čokoladice?',
        options: ['Plavo', 'Crveno', 'Zeleno', 'Žuto'],
        correctIndex: 1,
        points: 10,
        timeoutSeconds: 10,
      },
      {
        id: 'q2',
        text: 'Šta je karakteristična radnja sa Kit Kat čokoladicom u reklami?',
        options: ['Topi se', 'Lomi se / puca', 'Baca se', 'Pakuje se'],
        correctIndex: 1,
        points: 15,
        timeoutSeconds: 12,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Reese's Peanut Butter Cups (2013, ~15s)
  //    Narandžasto pakovanje, čokolada + kikiriki puter
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'reeses-2013',
    title: "Peanut Butter Cups",
    brand: "Reese's",
    videoUri:
      'https://archive.org/download/2013_USA_TV_Commercials/2013%20-%20Commercial%20-%20Candy%20-%20Reese%27s%20Peanut%20Butter%20Cups.mp4',
    watchSeconds: 15,
    questions: [
      {
        id: 'q1',
        text: "Koje boje je pakovanje Reese's proizvoda?",
        options: ['Crveno', 'Plavo', 'Narandžasto', 'Zeleno'],
        correctIndex: 2,
        points: 10,
        timeoutSeconds: 10,
      },
      {
        id: 'q2',
        text: 'Od koja dva glavna sastojka se pravi ovaj proizvod?',
        options: [
          'Čokolada i karamel',
          'Čokolada i kikiriki puter',
          'Čokolada i nugat',
          'Čokolada i kokos',
        ],
        correctIndex: 1,
        points: 15,
        timeoutSeconds: 12,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Snickers Bites sa Kenny G (2013, ~15s)
  //    Kenny G svira saksofon, "You're not you when you're hungry"
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'snickers-kenny-g',
    title: 'Snickers Bites (Kenny G)',
    brand: 'Snickers',
    videoUri:
      'https://archive.org/download/2013_USA_TV_Commercials/2013%20-%20Commercial%20-%20Candy%20-%20Snickers%20Bites%20(Kenny%20G).mp4',
    watchSeconds: 15,
    questions: [
      {
        id: 'q1',
        text: 'Koji muzičar se pojavljuje u ovoj Snickers reklami?',
        options: ['Elton John', 'Kenny G', 'Stevie Wonder', 'Billy Joel'],
        correctIndex: 1,
        points: 10,
        timeoutSeconds: 10,
      },
      {
        id: 'q2',
        text: 'Koji instrument svira poznata osoba u reklami?',
        options: ['Gitara', 'Klavir', 'Saksofon', 'Bubnjevi'],
        correctIndex: 2,
        points: 15,
        timeoutSeconds: 12,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Twix (2013, ~15s)
  //    Zlatno pakovanje, čokoladica sa karamelom i keksom
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'twix-2013',
    title: 'Twix',
    brand: 'Twix',
    videoUri:
      'https://archive.org/download/2013_USA_TV_Commercials/2013%20-%20Commercial%20-%20Candy%20-%20Twix.mp4',
    watchSeconds: 15,
    questions: [
      {
        id: 'q1',
        text: 'Koje boje je pakovanje Twix čokoladice?',
        options: ['Crveno', 'Plavo', 'Zlatno/žuto', 'Zeleno'],
        correctIndex: 2,
        points: 10,
        timeoutSeconds: 10,
      },
      {
        id: 'q2',
        text: 'Koliko štapića dolazi u jednom Twix pakovanju?',
        options: ['Jedan', 'Dva', 'Tri', 'Četiri'],
        correctIndex: 1,
        points: 15,
        timeoutSeconds: 12,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. Hershey's Drops (2013, ~15s)
  //    Braon brending, male čokoladne kuglice
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'hersheys-drops',
    title: "Hershey's Drops",
    brand: "Hershey's",
    videoUri:
      'https://archive.org/download/2013_USA_TV_Commercials/2013%20-%20Commercial%20-%20Candy%20-%20Hershey%27s%20Drops.mp4',
    watchSeconds: 15,
    questions: [
      {
        id: 'q1',
        text: "Koje boje je karakteristični Hershey's brending?",
        options: ['Crveno', 'Narandžasto', 'Braon/smeđe', 'Ljubičasto'],
        correctIndex: 2,
        points: 10,
        timeoutSeconds: 10,
      },
      {
        id: 'q2',
        text: 'Kakav je oblik proizvoda koji se reklamira?',
        options: ['Štapić', 'Male kuglice/kapi', 'Tabla', 'Bombona'],
        correctIndex: 1,
        points: 15,
        timeoutSeconds: 12,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. M&M's sa Daisy Fuentes (1995, 15s)
  //    Animirani M&M likovi, Daisy Fuentes, Crveni M&M
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'mms-daisy-fuentes',
    title: "M&M's (Daisy Fuentes)",
    brand: "M&M's",
    videoUri:
      "https://archive.org/download/blue-sky-studios-commercials/M%26M%27s%201995%20%27Daisy%20Fuentes%20-%20Partial%20to%20Red%27%20TV%20Commercial.mp4",
    watchSeconds: 15,
    questions: [
      {
        id: 'q1',
        text: 'Koje boje je M&M lik koji se pojavljuje u reklami?',
        options: ['Žuti', 'Crveni', 'Zeleni', 'Plavi'],
        correctIndex: 1,
        points: 10,
        timeoutSeconds: 10,
      },
      {
        id: 'q2',
        text: 'Da li su M&M likovi u reklami animirani ili su pravi glumci u kostimu?',
        options: ['Pravi glumci u kostimu', 'Animirani (CGI)', 'Crtani 2D', 'Lutke'],
        correctIndex: 1,
        points: 15,
        timeoutSeconds: 12,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. Airheads (2013, ~15s)
  //     Šareni taffy bombone
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'airheads-2013',
    title: 'Airheads Candy',
    brand: 'Airheads',
    videoUri:
      'https://archive.org/download/2013_USA_TV_Commercials/2013%20-%20Commercial%20-%20Candy%20-%20Airheads.mp4',
    watchSeconds: 15,
    questions: [
      {
        id: 'q1',
        text: 'Kakav tip slatkiša je Airheads?',
        options: ['Čokoladica', 'Žvakaća guma', 'Taffy/žele traka', 'Lollipop'],
        correctIndex: 2,
        points: 10,
        timeoutSeconds: 10,
      },
      {
        id: 'q2',
        text: 'Koliko boja pakovanja se pojavljuje u reklami?',
        options: ['Samo jedna', 'Dve', 'Tri ili više', 'Nijedna'],
        correctIndex: 2,
        points: 15,
        timeoutSeconds: 12,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. Brookside Chocolate (2013, ~15s)
  //     Tamna čokolada sa voćem, ljubičasto/tamno pakovanje
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'brookside-2013',
    title: 'Brookside Chocolate',
    brand: 'Brookside',
    videoUri:
      'https://archive.org/download/2013_USA_TV_Commercials/2013%20-%20Commercial%20-%20Candy%20-%20Brookside.mp4',
    watchSeconds: 15,
    questions: [
      {
        id: 'q1',
        text: 'Koji tip čokolade reklamira Brookside?',
        options: ['Bela čokolada', 'Mlečna čokolada', 'Tamna čokolada', 'Čokolada sa karamelom'],
        correctIndex: 2,
        points: 10,
        timeoutSeconds: 10,
      },
      {
        id: 'q2',
        text: 'Sa čim je kombinovana čokolada u ovom proizvodu?',
        options: ['Orasima', 'Voćem', 'Keksom', 'Pirinčem'],
        correctIndex: 1,
        points: 15,
        timeoutSeconds: 12,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. Johnson's Baby Lotion (2013, ~15s)
  //     Beba, nežne boje, roze/belo
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'johnsons-baby',
    title: "Johnson's Baby Lotion",
    brand: "Johnson's",
    videoUri:
      'https://archive.org/download/2013_USA_TV_Commercials/2013%20-%20Commercial%20-%20Beauty%20-%20Johnson%27s%20Baby%20Lotion.mp4',
    watchSeconds: 15,
    questions: [
      {
        id: 'q1',
        text: 'Za koga je namenjen reklamirani proizvod?',
        options: ['Odrasle žene', 'Muškarce', 'Bebe', 'Tinejdžere'],
        correctIndex: 2,
        points: 10,
        timeoutSeconds: 10,
      },
      {
        id: 'q2',
        text: 'Kakav tip proizvoda se reklamira?',
        options: ['Šampon', 'Losion/krema', 'Puder', 'Sapun'],
        correctIndex: 1,
        points: 10,
        timeoutSeconds: 10,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. Starburst Hard Candy (1999, 15s)
  //     CGI animacija, šarene bombone
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'starburst-1999',
    title: 'Hard Candy',
    brand: 'Starburst',
    videoUri:
      'https://archive.org/download/blue-sky-studios-commercials/Starburst%20Hard%20Candy%20Commercial%20(1999).mp4',
    watchSeconds: 15,
    questions: [
      {
        id: 'q1',
        text: 'Da li je reklama snimljena uživo ili je animirana?',
        options: ['Uživo (pravi ljudi)', 'Animirana (CGI)', 'Kombinacija', 'Crno-bela fotografija'],
        correctIndex: 1,
        points: 10,
        timeoutSeconds: 10,
      },
      {
        id: 'q2',
        text: 'Kakav tip slatkiša je Starburst Hard Candy?',
        options: ['Čokoladica', 'Žvakaća guma', 'Tvrda bombona', 'Gumeni bomboni'],
        correctIndex: 2,
        points: 10,
        timeoutSeconds: 10,
      },
    ],
  },
];

export default ads;
