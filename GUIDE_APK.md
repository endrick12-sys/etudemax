# 📱 Guide Complet - Générer l'APK EtudeMax

## 🎯 Prérequis

### Sur Windows/Mac/Linux:
- ✅ Node.js 18+ ([télécharger](https://nodejs.org))
- ✅ Java JDK 11+ ([télécharger](https://www.oracle.com/java/technologies/downloads/))
- ✅ Android SDK
- ✅ Gradle

### Installation rapide:

**Windows (avec Chocolatey):**
```bash
choco install nodejs jdk11 android-sdk
```

**Mac (avec Homebrew):**
```bash
brew install node openjdk@11
brew install --cask android-studio
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install nodejs npm openjdk-11-jdk
```

---

## 🚀 Étapes pour générer l'APK

### 1️⃣ Clone et installe les dépendances

```bash
git clone https://github.com/endrick12-sys/etudemax.git
cd etudemax
npm install
```

### 2️⃣ Configure les variables d'environnement

Crée `.env.local`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_GEMINI_KEY=sk-xxxxx
```

### 3️⃣ Build la version web

```bash
npm run build
```

### 4️⃣ Ajoute Capacitor pour Android

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/camera @capacitor/filesystem
npx cap init
npx cap add android
```

### 5️⃣ Sync les fichiers

```bash
npx cap sync
```

### 6️⃣ Ouvre le projet Android

```bash
npx cap open android
```

Cela ouvre Android Studio automatiquement.

---

## 🏗️ Build APK dans Android Studio

### Option A: APK de Debug (Test rapide)

1. **Dans Android Studio:**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - Attends la compilation

2. **Localise l'APK:**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

3. **Transfère sur ton téléphone:**
   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

### Option B: APK Release (Pour Google Play)

1. **Crée une clé de signature** (une seule fois):
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
   ```

2. **Configure le signing dans Android Studio:**
   - Build → Generate Signed Bundle / APK
   - Sélectionne "APK"
   - Clique "Next"
   - Sélectionne ton keystore
   - Clique "Next"
   - Sélectionne "Release"
   - Clique "Finish"

3. **Récupère l'APK:**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

---

## 📲 Install l'APK sur ton téléphone

### Via USB:
```bash
adb devices  # Vérifie que le téléphone est connecté
adb install app-release.apk
```

### Via QR Code (Recommandé):
1. Upload l'APK sur une cloud (Google Drive, Dropbox)
2. Crée un QR code pointant vers le lien de téléchargement
3. Scanne avec ton téléphone
4. Installe

### Via Google Play Console:
1. Crée un compte Google Play Developer ($25)
2. Upload l'APK release
3. Soumets pour review
4. L'app sera disponible sur le Play Store

---

## 🐛 Troubleshooting

### Erreur: "ANDROID_SDK_ROOT not set"
```bash
# Windows
set ANDROID_SDK_ROOT=C:\Users\VotreNom\AppData\Local\Android\Sdk

# Mac/Linux
export ANDROID_SDK_ROOT=~/Android/Sdk
```

### Erreur: "Gradle build failed"
```bash
cd android
./gradlew clean
./gradlew build
```

### Erreur: "ADB not found"
```bash
# Ajoute ADB au PATH
# Windows: C:\Users\VotreNom\AppData\Local\Android\Sdk\platform-tools
# Mac: ~/Android/Sdk/platform-tools
# Linux: ~/Android/Sdk/platform-tools
```

---

## 📊 Commandes Utiles

```bash
# Voir les appareils connectés
adb devices

# Voir les logs en temps réel
adb logcat

# Redémarrer l'app
adb shell am force-stop com.etudemax.app
adb shell am start -n com.etudemax.app/.MainActivity

# Vider le cache
adb shell pm clear com.etudemax.app
```

---

## 💾 Fichier APK Généré

Une fois généré, l'APK sera dans:
- **Debug:** `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release:** `android/app/build/outputs/apk/release/app-release.apk`

**Taille moyenne:** 15-25 MB

---

## 🎉 Bravo!

Ton APK EtudeMax est prêt! 🚀

**Prochaines étapes:**
1. Teste l'app sur Android
2. Corrige les bugs
3. Upload sur Google Play
4. Célèbre! 🎊

---

## 📞 Support

Besoin d'aide? Contacte: endrick12-sys@github.com

**Documentation officielle:**
- [Capacitor Docs](https://capacitorjs.com)
- [Android Studio Docs](https://developer.android.com/studio)
- [React Docs](https://react.dev)
