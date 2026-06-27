# 📚 EtudeMax - Assistant de Révision Scolaire

**EtudeMax** est une application éducative complète qui transforme les photos de cours en fiches de révision intelligentes (flashcards), quiz interactifs et plans d'étude personnalisés avec IA.

## 🎯 Caractéristiques

### Plans d'Abonnement
- **Étudiant**: 250 HTG/mois
  - Générations illimitées
  - Flashcards + Quiz + Plan
  - Suivi de progression

- **Étudiant Pro**: 500 HTG/mois
  - Tout du plan Étudiant
  - Examens blancs officiels
  - Analyse avancée
  - Tuteur IA personnalisé

### Plateformes
- 📱 **Android** (APK)
- 🍎 **iPhone** (IPA)
- 🌐 **Web** (Responsive)

## 🛠️ Stack Technologique

- **Frontend**: React 18 + Capacitor
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **IA**: Google Gemini API
- **Paiement**: NatCash

## 📦 Installation

### Pré-requis
- Node.js 18+
- npm ou yarn
- Android Studio (pour APK)
- Xcode (pour IPA sur Mac)

### Setup Frontend

```bash
npm install
npm start
```

### Build Web

```bash
npm run build
```

### Build APK (Android)

```bash
npm run cap:sync
npm run cap:build:android
```

L'APK sera dans: `android/app/build/outputs/apk/release/app-release.apk`

### Build IPA (iPhone)

Sur Mac avec Xcode:

```bash
npm run cap:sync
npm run cap:open:ios
```

Puis dans Xcode: **Product → Archive**

## 🚀 Déploiement

### Web

```bash
npm run build
```

### Google Play Store

Créer un AAB:
```bash
cd android
./gradlew bundleRelease
```

### App Store

Utiliser Xcode pour submit l'IPA.

## 📖 Structure

```
etudemax/
├── src/
│   ├── components/
│   │   └── NatCashFlow.jsx    (Flux de paiement)
│   ├── App.js
│   └── index.js
├── public/
├── android/                    (Généré par Capacitor)
├── ios/                        (Généré par Capacitor)
├── capacitor.config.json
├── package.json
└── README.md
```

## 🔐 Variables d'Environnement

Crée un fichier `.env.local`:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_GEMINI_KEY=your_key
```

## 📱 Langues

- 🇭🇹 Créole Haïtien
- 🇫🇷 Français

## 💳 Paiement NatCash

Numéro: **+509 4055-4790**
Nom: **Bonhomme Derrick**

## 👥 Contributeurs

- Bonhomme Derrick (Owner)

## 📄 Licence

MIT License - 2024

## 📞 Support

Pour toute question: endrick12-sys@github.com

---

## 🚀 Prochaines Étapes

1. **Clone le repo**:
   ```bash
   git clone https://github.com/endrick12-sys/etudemax.git
   cd etudemax
   ```

2. **Install les dépendances**:
   ```bash
   npm install
   ```

3. **Lance en développement**:
   ```bash
   npm start
   ```

4. **Setup Capacitor** (pour mobile):
   ```bash
   npx cap add android
   npx cap add ios
   ```

5. **Build APK**:
   ```bash
   npm run cap:build:android
   ```

Bonne chance! 🎉
