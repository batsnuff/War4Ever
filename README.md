# WOJNA 3.0 🎮⚔️

Nowoczesna wersja klasycznej gry w Wojnę z zaawansowanymi mechanikami, power-upami, efektami specjalnymi i systemem AI z emocjami!

## 🎯 Funkcje

- 📱 **Progressive Web App (PWA)** - można zainstalować na telefonie i komputerze!
- ⚔️ **Klasyczna gra w Wojnę** z nowoczesnymi mechanikami
- 🎨 **Piękny interfejs** z animacjami i efektami cząsteczkiwymi
- 🔥 **System Rage** - wściekłość zwiększa szansę na critical hit
- 💎 **Power-upy**: Tarcza, Boost, Przewidywanie, Zmiana Wymiaru, Spowolnienie Czasu
- 🌟 **Ultimate Abilities** - potężne umiejętności specjalne
- 🎁 **Loot Boxy** - losowe nagrody
- 🔥💧🌿⚡🌙 **System żywiołów** - przewagi elementarne
- ☀️🌧️❄️ **Efekty pogodowe** wpływające na rozgrywkę
- 📈 **Momentum** - mnożnik siły zmieniający się podczas gry
- 🤖 **AI z emocjami** - adaptacyjny przeciwnik
- 🏆 **System osiągnięć**
- ✨ **Synergia kart** - bonusy za kombinacje
- 📱 **Responsive design** - działa na telefonach i komputerach

## 🚀 Jak uruchomić lokalnie

### Wymagania
- Node.js (wersja 16 lub wyższa)
- npm lub yarn

### Instalacja

1. Sklonuj repozytorium:
```bash
git clone https://github.com/TwojaNazwa/War4Ever.git
cd War4Ever
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Uruchom w trybie deweloperskim:
```bash
npm run dev
```

4. Otwórz przeglądarkę i przejdź do `http://localhost:5173`

## 📦 Build na produkcję

```bash
npm run build
```

Zbudowana aplikacja znajdzie się w folderze `dist/`.

## 🌐 Deployment na GitHub Pages

1. **Ustaw nazwę repozytorium w `vite.config.js`**:
   - Otwórz plik `vite.config.js`
   - Zmień `base: '/War4Ever/'` na `base: '/TwojaNazwaRepo/'` (gdzie TwojaNazwaRepo to nazwa Twojego repozytorium GitHub)

2. **Zainstaluj zależności** (jeśli jeszcze nie):
```bash
npm install
```

3. **Deploy**:
```bash
npm run deploy
```

Komenda automatycznie:
- Zbuduje projekt (`npm run build`)
- Wypchnie zawartość folderu `dist` na branch `gh-pages`

4. **Aktywuj GitHub Pages**:
   - Przejdź do Settings → Pages w swoim repozytorium
   - W sekcji "Source" wybierz branch `gh-pages`
   - Kliknij Save
   - Po chwili Twoja gra będzie dostępna pod adresem: `https://TwojaNazwa.github.io/War4Ever/`

## 📱 Instalacja aplikacji (PWA)

### Na telefonie (Android/iOS):
1. Otwórz grę w przeglądarce (Chrome, Safari, Firefox)
2. Kliknij menu przeglądarki (⋮ lub 􀅴)
3. Wybierz **"Dodaj do ekranu głównego"** lub **"Zainstaluj aplikację"**
4. Gra będzie dostępna jak zwykła aplikacja!

### Na komputerze (Chrome, Edge):
1. Otwórz grę w przeglądarce
2. Kliknij ikonę instalacji (⊕) w pasku adresu
3. Lub menu → "Zainstaluj WOJNA 3.0"
4. Gra będzie działać w osobnym oknie!

## 🎮 Jak grać

1. Kliknij **"ROZPOCZNIJ EPICKĄ PRZYGODĘ"**
2. **Kliknij w pole gry** aby zagrać kartą
3. **Zbieraj energię** (żółte kwadraty) - dostajesz ją za wygrane
4. **Używaj power-upów** - kosztują 3 energii
5. **Ładuj Ultimate** - kliknij miernik Ultimate gdy osiągnie 100%
6. **Otwieraj skrzynki** - kliknij na ikonę skrzynki gdy ją zdobędziesz

### Power-upy (3 energii każdy):
- 🛡️ **Tarcza** - ochrona przed utratą kart w następnej rundzie
- ⚡ **Boost** - +2 do wartości Twojej następnej karty
- 👁️ **Podgląd** - zobacz następną kartę przeciwnika (5 sekund)
- 🌀 **Wymiar** - przesuń wartości wszystkich kart (3 sekundy)
- ⏱️ **Zwolnienie** - więcej czasu na decyzję (10 sekund)

### Ultimate Abilities (100% ładowania):
- 💥 **Podwójna stawka** - następna runda daje podwójne punkty
- 🎯 **Tryb zabójcy** - następna wygrana zabiera 5x więcej kart
- 🎁 **Deszcz skrzynek** - otrzymujesz 3 loot boxy

## 🛠️ Technologie

- **React 18** - biblioteka UI
- **Vite** - build tool
- **Lucide React** - ikony
- **CSS3** - animacje i styling
- **GitHub Pages** - hosting

## 📝 Licencja

MIT

## 🎨 Autor

Stworzone z ❤️ dla fanów gry w Wojnę!

---

**Miłej zabawy! 🎮✨**

