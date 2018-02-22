export default class LanguageProvider {
  static toogleLanguage = () => {
    if (LanguageProvider.language == "pl") LanguageProvider.language = "en";
    else LanguageProvider.language = "pl";
    console.log(LanguageProvider.language);
  };
  static get = () => {
    if (LanguageProvider.language == "pl")
      return {
        changeLanguage: "Switch to English",
        exampleWebpages: [
          { title: "Google", url: "http://google.com" },
          { title: "Facebook", url: "http://facebook.com" },
          { title: "Twitter", url: "http://twitter.com" },
          { title: "Github", url: "http://github.com" },
          { title: "Wikipedia", url: "http://wikipedia.com" },
          { title: "Onet", url: "http://onet.pl" },
          { title: "Bergsoft", url: "http://bergsoft.pl" },
          { title: "YouTube", url: "http://youtube.com" },
          { title: "Reddit", url: "http://reddit.com" },
          { title: "Amazon", url: "http://amazon.com" },
          { title: "Allegro", url: "http://allegro.pl" },
          { title: "Instagram", url: "http://instagram.com" },
          { title: "LinkedIn", url: "http://linkedin.com" }
        ],
        maxLimitReached: "Można dodać maksykalnie 10 stron!",
        chooseOrTypePages: "Wybierz strony które najczęściej odwiedzasz, lub wpisz własne poniżej",
        path: "Ścieżka",
        title: "Tytuł",
        delete: "Usuń",
        addAnother: "Dodaj kolejną stronę",
        createScene: "Stwórz scenę!"
      };
    else
      return {
        changeLanguage: "Zmień na język polski",
        exampleWebpages: [
          { title: "Google", url: "http://google.com" },
          { title: "Facebook", url: "http://facebook.com" },
          { title: "Twitter", url: "http://twitter.com" },
          { title: "Github", url: "http://github.com" },
          { title: "Wikipedia", url: "http://wikipedia.com" },
          { title: "Bergsoft", url: "http://bergsoft.pl#en" },
          { title: "YouTube", url: "http://youtube.com" },
          { title: "Reddit", url: "http://reddit.com" },
          { title: "Amazon", url: "http://amazon.com" },
          { title: "Instagram", url: "http://instagram.com" },
          { title: "LinkedIn", url: "http://linkedin.com" }
        ],
        maxLimitReached: "You can add only up to 10 pages!",
        chooseOrTypePages: "Pick your favoruite webpages or write your own in form below",
        path: "Path",
        title: "Title",
        delete: "Delete",
        addAnother: "Add another page",
        createScene: "Create scene!"
      };
  };
  static language = "pl";
}
