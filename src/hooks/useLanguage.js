import { useState } from 'react'

const translations = {
  en: {
    changeLanguage: 'Switch to Polish',
    exampleWebpages: [
      { title: 'Google', url: 'https://google.com' },
      { title: 'Facebook', url: 'https://facebook.com' },
      { title: 'Twitter', url: 'https://twitter.com' },
      { title: 'GitHub', url: 'https://github.com' },
      { title: 'Wikipedia', url: 'https://wikipedia.com' },
      { title: 'YouTube', url: 'https://youtube.com' },
      { title: 'Reddit', url: 'https://reddit.com' },
      { title: 'Amazon', url: 'https://amazon.com' },
      { title: 'Instagram', url: 'https://instagram.com' },
      { title: 'LinkedIn', url: 'https://linkedin.com' }
    ],
    maxLimitReached: 'You can add only up to 10 pages!',
    chooseOrTypePages: 'Pick your favorite webpages or add your own below',
    path: 'URL',
    title: 'Title',
    delete: 'Delete',
    addAnother: 'Add Another Page',
    createScene: 'Create 3D Scene!'
  },
  pl: {
    changeLanguage: 'Switch to English',
    exampleWebpages: [
      { title: 'Google', url: 'https://google.com' },
      { title: 'Facebook', url: 'https://facebook.com' },
      { title: 'Twitter', url: 'https://twitter.com' },
      { title: 'GitHub', url: 'https://github.com' },
      { title: 'Wikipedia', url: 'https://wikipedia.com' },
      { title: 'Onet', url: 'https://onet.pl' },
      { title: 'YouTube', url: 'https://youtube.com' },
      { title: 'Reddit', url: 'https://reddit.com' },
      { title: 'Allegro', url: 'https://allegro.pl' },
      { title: 'Instagram', url: 'https://instagram.com' },
      { title: 'LinkedIn', url: 'https://linkedin.com' }
    ],
    maxLimitReached: 'Można dodać maksymalnie 10 stron!',
    chooseOrTypePages: 'Wybierz ulubione strony lub dodaj własne poniżej',
    path: 'URL',
    title: 'Tytuł',
    delete: 'Usuń',
    addAnother: 'Dodaj Kolejną Stronę',
    createScene: 'Stwórz Scenę 3D!'
  }
}

export function useLanguage() {
  const [language, setLanguage] = useState('en')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'pl' : 'en')
  }

  return {
    language,
    translations: translations[language],
    toggleLanguage
  }
}