# Uppgift: Escape the System

## Bakgrund

Du ska bygga ett enkelt escape room-spel i React med **React Router** och **Context**. Spelaren är instängd i en övergiven AI-forskningsanläggning, _Project NEXUS_, och måste ta sig igenom anläggningens rum, lösa pussel och samla föremål för att till slut låsa upp utgången.

Spelet består av flera **rum** som spelaren navigerar mellan, och ett **inventory** (föremålsfält) som följer med genom hela spelet. Varje rum innehåller ett pussel som löses genom att använda rätt föremål från inventoriet. När ett pussel löses får spelaren ett nytt föremål, som i sin tur behövs för att lösa nästa rum – en kedja hela vägen fram till utgången.

Du bygger applikationen **från grunden**. Du får färdig speldata (`rooms.json`, `items.json`) samt bilder att utgå från. Bilderna ligger i `public` mappen.

**Lärandemål:** routing med React Router (inklusive dynamiska parametrar) samt delad state med Context.

---

## Speldata (given)

- `rooms.json` – varje rum har bl.a.:
  - `roomName`, `roomPath`
  - `unsolvedInstruction` / `solvedInstruction` – instruktionstext för olöst respektive löst läge
  - `unsolvedImage` / `solvedImage` – bild för respektive läge
  - `hint` – en ledtråd
  - `itemToSolve` – id på det föremål som löser rummet
  - `itemToAdd` – id på det föremål man får när rummet löses (är `null` för sista rummet)
- `items.json` – föremålen, med `id`, namn, beskrivning och bild.

Spelaren startar med ett föremål i inventoriet (UV Light).

---

## Speltänk / kedjan

Rummen löses i en kedja: föremålet du får i ett rum behövs för att lösa nästa.

1. **Server Room** – löses med _UV Light_ → ger _Access Code_
2. **Security Room** – löses med _Access Code_ → ger _Security Keycard_
3. **Archives** – löses med _Security Keycard_ → ger _Maintenance Key_
4. **Reactor Room** – löses med _Maintenance Key_ → ger _Admin Credentials_
5. **Vault** – löses med _Admin Credentials_ → ger _Master Override Key_
6. **Exit Node** – löses med _Master Override Key_ → du rymmer (inget nytt föremål)

---

## G-krav

För godkänt ska följande vara uppfyllt:

1. **Routing är uppsatt med React Router** (`BrowserRouter`, `Routes`, `Route`).
2. **Startsida** på `/` som visar en kort introduktion till spelet.
3. **En navigation** med länkar (`Link`) till spelets olika rum.
4. **Alla rum renderas av en och samma komponent**, som man navigerar till via en **parameter i URL:en**. Komponenten använder `useParams()` för att läsa ut vilket rum som ska visas och hämtar rätt rumsdata utifrån parametern. _(Det ska alltså inte finnas en separat hårdkodad route eller komponent per rum.)_
5. **Delad state med Context:** Inventoriet hanteras med Context (`createContext` + `useContext`) så att det är tillgängligt och växer i hela applikationen, oavsett vilket rum spelaren är i.
6. **Pussellogik:** När spelaren klickar på rätt föremål i ett rum (det som matchar rummets `itemToSolve`) markeras rummet som löst, och belöningsföremålet (`itemToAdd`) läggs till i inventoriet.
7. **Rummet visar olika läge** beroende på om det är löst eller inte (olöst/löst bild och instruktionstext).
8. **Beständig lösta-status:** Ett löst rum förblir löst även om spelaren navigerar bort och tillbaka. _(Se tipset nedan – detta ska lösas genom att härleda status från inventoriet, inte med en separat context.)_
9. Koden är strukturerad i komponenter och projektet går att starta och köra utan fel.

### Tips till G-krav 8: härled "löst" från inventoriet

Du behöver **inte** lagra vilka rum som är lösta i en separat state. Ett rum är löst om spelaren redan har fått dess belöningsföremål – och inventoriet ligger ju redan i Context. Härled därför status:

```js
const roomIsSolved = inventory.some((i) => i.id === room.itemToAdd);
```

Navigera bort och tillbaka → inventoriet har kvar föremålet → rummet visas fortfarande som löst. Persistensen kommer "gratis" eftersom inventoriet är den enda källan till sanning.

### Specialfall: sista rummet (Exit Node)

Sista rummet har `itemToAdd: null` och ger inget belöningsföremål – dess lösta-status kan alltså inte härledas från inventoriet. Det är ett **terminalrum**: att lösa det avslutar spelet, så man kommer aldrig tillbaka till det. Därför räcker det med lokal state (`useState`) i rum-komponenten för det rummet.

---

## VG-krav

För väl godkänt ska **samtliga G-krav** vara uppfyllda, plus följande:

1. **`useNavigate()` används på ett meningsfullt sätt.** Minst:
   - När sista rummet (Exit Node) löses kan spelaren ta sig vidare till en **vinstskärm** (t.ex. en knapp "Escape"/"Lämna anläggningen" på det lösta exit-rummet som navigerar till `/victory`), och
   - **redirect vid ogiltig path** – navigera/omdirigera om spelaren hamnar på en sida som inte finns.
2. **`useSearchParams()` för en ledtråds-funktion:** varje rum har ett `hint`-fält. Lägg till en knapp som visar/döljer ledtråden genom att sätta en query-parameter i URL:en (t.ex. `?hint=true`). Ledtråden ska vara en del av URL:en, så att man kan länka direkt till ett rum med ledtråden öppen.
3. **Kodkvalitet:** tydlig komponentindelning, korrekt typning, och rimliga jämförelser (jämför t.ex. rum/föremål på `id` snarare än objektreferens).

---

## Inlämning

Lämna in som ett git-repo i Classroom. Beskriv kort i en `README` hur man startar projektet och vilka krav du har implementerat.
