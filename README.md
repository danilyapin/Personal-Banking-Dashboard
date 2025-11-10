# Personal Banking Dashboard

Das **Personal Banking Dashboard** ist eine Webanwendung zur Verwaltung persönlicher Finanzen.
Man kann sich einloggen, eigene **Konten** und **Transaktionen** anlegen und bekommt eine übersichtliche **Darstellung seiner Einnahmen und Ausgaben**.

Ziel des Projekts war es, ein modernes, einfach zu nutzendes **Finanz-Dashboard** zu entwickeln, das alle wichtigen Informationen auf einen Blick zeigt.

---

## Funktionen

- **Registrieren und Anmelden**
  Benutzer können sich registrieren und mit Username und Passwort anmelden.

- **Konten verwalten**
  Mehrere Konten (z. B. Girokonto, Sparkonto) können angelegt und verwaltet werden.

- **Transaktionen hinzufügen**
  Einnahmen und Ausgaben lassen sich erfassen, mit Betrag, Kategorie (z. B. „Essen“, „Miete“) und Beschreibung.

- **Statistiken und Diagramme**
  Übersichtliche Auswertungen zeigen, wofür das Geld ausgegeben wird – z. B. pro Kategorie oder über einen Zeitraum.

- **Modernes und responsives Design**
  Funktioniert sowohl am Computer als auch am Handy.

---

## Technologie-Stack

**Frontend:**
- React (Vite + TypeScript)
- Material UI (Design)
- Axios / Fetch (API-Anbindung)
- Material UI Charts und Diagramme

**Backend:**
- Spring Boot (Java)
- MongoDB
- JWT Authentication (Login und Sicherheit)
- REST API

---

## Projektidee und Ziel

Ich wollte eine Anwendung entwickeln, mit der man **seine Finanzen im Alltag besser im Blick behält**, ähnlich wie eine einfache Banking-App.
Der Fokus lag auf:
- übersichtlichem Design
- einfacher Bedienung
- klarer Struktur zwischen Frontend & Backend

---

## Entwicklungsphasen

### Woche 1 – Backend und Grundstruktur
**Ziel:** API läuft, Datenmodell steht, CRUD für User/Konten/Transaktionen/Categories.
- Spring Boot Projekt aufgesetzt
- MongoDB eingebunden
- Datenmodell erstellt
- Endpoints gebaut (inkl. JWT-Login)
- Test mit Postman

### Woche 2 – Frontend und Integration
**Ziel:** Benutzer kann Konten, Transaktionen und Kategorien sehen und verwalten.
- React-Projekt mit Vite/TypeScript erstellt
- Material UI eingebunden
- Login-/Registrierungsseite, Dashboard, Transaktionsliste
- API-Anbindung mit JWT
- Responsives Layout

### Woche 3 – Extras und Feinschliff
**Ziel:** Projekt Portfolio-tauglich machen.
- Diagramme (Ausgaben nach Kategorie, Verlauf über Zeit)
- Dashboard-Statistiken (Einnahmen, Ausgaben)
- CSV-Export für alle Transactionen
- UI/UX Feinschliff (Farben, Buttons, Layout)
- SonarQube eingebunden zur Code-Analyse und Qualitätsprüfung
- Deployment vorbereitet und auf **Render** bereitgestellt
