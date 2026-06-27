import { useState } from "react";
import axios from "axios";

const COLORS = {
  navy: "#0F1F3D",
  indigo: "#2D3A8C",
  violet: "#5B4FCF",
  mint: "#3ECFB2",
  cream: "#F7F6F2",
  white: "#FFFFFF",
  gray: "#8A8FA8",
  lightGray: "#EEEDF5",
  gold: "#F5C842",
  danger: "#E85D5D",
  natcash: "#E8162B",
};

const PLANS = [
  {
    id: "basic",
    name: "Etidyan",
    nameF: "Étudiant",
    price: "250 HTG",
    period: "/ mwa",
    periodF: "/ mois",
    features: [
      { kr: "Jenere san limit", fr: "Générations illimitées" },
      { kr: "Flashcards + Quiz + Plan", fr: "Flashcards + Quiz + Plan" },
      { kr: "Siw pwogrè ou", fr: "Suivi de progression" },
    ],
    highlight: false,
  },
  {
    id: "pro",
    name: "Etidyan Pro",
    nameF: "Étudiant Pro",
    price: "500 HTG",
    period: "/ mwa",
    periodF: "/ mois",
    features: [
      { kr: "Tout plan Etidyan", fr: "Tout plan Étudiant inclus" },
      { kr: "Egzamen blan ofisyèl", fr: "Examens blancs officiels" },
      { kr: "Analiz pwogrè avanse", fr: "Analyse avancée" },
      { kr: "AI Tutè pèsonèl", fr: "Tuteur IA personnalisé" },
    ],
    highlight: true,
  },
];

const NATCASH_NUMBER = "+509 4055-4790";
const OWNER_NAME = "Bonhomme Derrick";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function Step({ number, active, done }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%",
      background: done ? COLORS.mint : active ? COLORS.violet : COLORS.lightGray,
      color: done || active ? COLORS.white : COLORS.gray,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: 14, flexShrink: 0,
      transition: "all 0.3s"
    }}>
      {done ? "✓" : number}
    </div>
  );
}

export default function NatCashFlow() {
  const [lang, setLang] = useState("kr");
  const [screen, setScreen] = useState("plans");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const t = (kr, fr) => lang === "kr" ? kr : fr;

  function copyNumber() {
    navigator.clipboard?.writeText(NATCASH_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  }

  async function handleSubmitProof() {
    if (!photo) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/payment/submit-proof`, {
        plan: selectedPlan,
        proof: photo,
        amount: PLANS.find(p => p.id === selectedPlan)?.price,
        timestamp: new Date().toISOString(),
      });
      
      if (response.status === 200) {
        setScreen("pending");
      }
    } catch (err) {
      setError(t("Erè nan transmisyon", "Erreur lors de la transmission"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const step = screen === "plans" ? 1 : screen === "payment" ? 2 : screen === "upload" ? 3 : 4;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.indigo})`,
        padding: "0 20px", height: 58,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: `linear-gradient(135deg, ${COLORS.mint}, ${COLORS.violet})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, color: COLORS.white, fontSize: 15
          }}>E</div>
          <span style={{ color: COLORS.white, fontWeight: 700, fontSize: 17 }}>EtudeMax</span>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.1)", borderRadius: 20,
          display: "flex", overflow: "hidden"
        }}>
          {["kr", "fr"].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              background: lang === l ? COLORS.mint : "transparent",
              color: lang === l ? COLORS.navy : COLORS.white,
              border: "none", padding: "5px 14px", fontSize: 12,
              fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
            }}>
              {l === "kr" ? "🇭🇹 KR" : "🇫🇷 FR"}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: COLORS.white, padding: "16px 20px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, maxWidth: 360, margin: "0 auto" }}>
          {[
            { n: 1, label: t("Plan", "Plan") },
            { n: 2, label: t("Peman", "Paiement") },
            { n: 3, label: t("Prèv", "Preuve") },
            { n: 4, label: t("Tann", "Attente") },
          ].map((s, i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < 3 ? 1 : "unset" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <Step number={s.n} active={step === s.n} done={step > s.n} />
                <span style={{ fontSize: 10, color: step >= s.n ? COLORS.violet : COLORS.gray, fontWeight: 600 }}>
                  {s.label}
                </span>
              </div>
              {i < 3 && (
                <div style={{
                  flex: 1, height: 2, margin: "0 4px", marginBottom: 16,
                  background: step > s.n ? COLORS.mint : COLORS.lightGray,
                  transition: "background 0.3s"
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "24px 20px" }}>

        {/* SCREEN 1 — PLANS */}
        {screen === "plans" && (
          <div>
            <h2 style={{ color: COLORS.navy, fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>
              {t("Chwazi Plan ou", "Choisissez votre plan")}
            </h2>
            <p style={{ color: COLORS.gray, fontSize: 14, margin: "0 0 24px" }}>
              {t("Aktive kont ou pou jwenn aksè konplè", "Activez votre compte pour un accès complet")}
            </p>

            {PLANS.map(plan => (
              <div key={plan.id} onClick={() => setSelectedPlan(plan.id)}
                style={{
                  background: selectedPlan === plan.id
                    ? `linear-gradient(135deg, ${COLORS.indigo}, ${COLORS.violet})`
                    : COLORS.white,
                  border: `2px solid ${selectedPlan === plan.id ? COLORS.violet : COLORS.lightGray}`,
                  borderRadius: 18, padding: "20px",
                  marginBottom: 14, cursor: "pointer",
                  boxShadow: plan.highlight ? "0 4px 24px rgba(91,79,207,0.18)" : "0 1px 8px rgba(0,0,0,0.05)",
                  position: "relative", transition: "all 0.25s"
                }}>
                {plan.highlight && (
                  <div style={{
                    position: "absolute", top: -10, right: 16,
                    background: COLORS.gold, color: COLORS.navy,
                    fontSize: 10, fontWeight: 800, padding: "3px 12px",
                    borderRadius: 20, textTransform: "uppercase"
                  }}>⭐ {t("Pi bon", "Meilleur")}</div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <h3 style={{
                      color: selectedPlan === plan.id ? COLORS.white : COLORS.navy,
                      fontSize: 17, fontWeight: 700, margin: "0 0 2px"
                    }}>{t(plan.name, plan.nameF)}</h3>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{
                      color: selectedPlan === plan.id ? COLORS.mint : COLORS.violet,
                      fontSize: 22, fontWeight: 800
                    }}>{plan.price}</span>
                    <span style={{
                      color: selectedPlan === plan.id ? "rgba(255,255,255,0.6)" : COLORS.gray,
                      fontSize: 12
                    }}>{t(plan.period, plan.periodF)}</span>
                  </div>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {plan.features.map((f, i) => (
                    <li key={i} style={{
                      color: selectedPlan === plan.id ? "rgba(255,255,255,0.85)" : COLORS.gray,
                      fontSize: 13, marginBottom: 6, display: "flex", alignItems: "center", gap: 8
                    }}>
                      <span style={{ color: selectedPlan === plan.id ? COLORS.mint : COLORS.violet, fontWeight: 700 }}>✓</span>
                      {t(f.kr, f.fr)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <button
              disabled={!selectedPlan}
              onClick={() => setScreen("payment")}
              style={{
                width: "100%", marginTop: 8,
                background: selectedPlan ? `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.indigo})` : COLORS.lightGray,
                color: selectedPlan ? COLORS.white : COLORS.gray,
                border: "none", borderRadius: 14, padding: "15px",
                fontSize: 16, fontWeight: 700, cursor: selectedPlan ? "pointer" : "not-allowed",
                transition: "all 0.2s"
              }}>
              {t("Kontinye →", "Continuer →")}
            </button>
          </div>
        )}

        {/* SCREEN 2 — PAYMENT INSTRUCTIONS */}
        {screen === "payment" && (
          <div>
            <h2 style={{ color: COLORS.navy, fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>
              {t("Fè Depozit NatCash", "Effectuer le dépôt NatCash")}
            </h2>
            <p style={{ color: COLORS.gray, fontSize: 14, margin: "0 0 24px" }}>
              {t("Swiv etap yo pou aktive plan ou", "Suivez les étapes pour activer votre plan")}
            </p>

            <div style={{
              background: `linear-gradient(135deg, ${COLORS.natcash} 0%, #a50f1e 100%)`,
              borderRadius: 18, padding: "24px 20px", marginBottom: 20,
              boxShadow: "0 6px 30px rgba(232,22,43,0.35)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{
                  background: "rgba(255,255,255,0.2)", borderRadius: 10,
                  padding: "6px 12px", display: "flex", alignItems: "center", gap: 6
                }}>
                  <span style={{ fontSize: 18 }}>💳</span>
                  <span style={{ color: COLORS.white, fontWeight: 800, fontSize: 14 }}>NatCash</span>
                </div>
              </div>

              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 1 }}>
                {t("Nimeyo pou voye lajan", "Numéro pour envoyer")}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: COLORS.white, fontSize: 26, fontWeight: 800, letterSpacing: 2 }}>
                  {NATCASH_NUMBER}
                </span>
                <button onClick={copyNumber} style={{
                  background: "rgba(255,255,255,0.2)", color: COLORS.white,
                  border: "none", borderRadius: 10, padding: "8px 14px",
                  fontSize: 12, fontWeight: 700, cursor: "pointer"
                }}>
                  {copied ? "✓ " + t("Kopye!", "Copié!") : t("Kopye", "Copier")}
                </button>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", marginTop: 16, paddingTop: 16 }}>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, margin: "0 0 4px" }}>
                  {t("Non kont lan", "Nom du compte")}
                </p>
                <p style={{ color: COLORS.white, fontSize: 16, fontWeight: 700, margin: 0 }}>
                  {OWNER_NAME}
                </p>
              </div>
            </div>

            <div style={{
              background: COLORS.white, borderRadius: 14, padding: "16px 20px",
              marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center",
              boxShadow: "0 1px 8px rgba(0,0,0,0.05)"
            }}>
              <span style={{ color: COLORS.gray, fontSize: 14 }}>{t("Montan pou voye", "Montant à envoyer")}</span>
              <span style={{ color: COLORS.violet, fontSize: 20, fontWeight: 800 }}>
                {PLANS.find(p => p.id === selectedPlan)?.price}
              </span>
            </div>

            <div style={{
              background: COLORS.white, borderRadius: 14, padding: "20px", marginBottom: 24, boxShadow: "0 1px 8px rgba(0,0,0,0.05)"
            }}>
              <p style={{ color: COLORS.navy, fontWeight: 700, fontSize: 14, margin: "0 0 16px" }}>
                {t("📋 Etap yo:", "📋 Étapes :")}
              </p>
              {[
                t("Ouvri aplikasyon NatCash ou a", "Ouvrez votre application NatCash"),
                t("Klike sou 'Transfert' oswa 'Voye Lajan'", "Cliquez sur 'Transfert' ou 'Envoyer'"),
                t(`Antre nimewo a: ${NATCASH_NUMBER}`, `Entrez le numéro : ${NATCASH_NUMBER}`),
                t(`Voye ${PLANS.find(p => p.id === selectedPlan)?.price}`, `Envoyez ${PLANS.find(p => p.id === selectedPlan)?.price}`),
                t("Pran screenshot/foto prèv la", "Prenez une capture d'écran de la preuve"),
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: COLORS.violet, color: COLORS.white,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1
                  }}>{i + 1}</div>
                  <p style={{ color: COLORS.gray, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{step}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setScreen("plans")} style={{
                flex: 1, background: COLORS.lightGray, color: COLORS.navy,
                border: "none", borderRadius: 14, padding: "14px",
                fontSize: 14, fontWeight: 600, cursor: "pointer"
              }}>← {t("Retounen", "Retour")}</button>
              <button onClick={() => setScreen("upload")} style={{
                flex: 2, background: `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.indigo})`,
                color: COLORS.white, border: "none", borderRadius: 14, padding: "14px",
                fontSize: 15, fontWeight: 700, cursor: "pointer"
              }}>{t("Mwen fè depozit →", "J'ai déposé →")}</button>
            </div>
          </div>
        )}

        {/* SCREEN 3 — UPLOAD PROOF */}
        {screen === "upload" && (
          <div>
            <h2 style={{ color: COLORS.navy, fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>
              {t("Voye Prèv Depozit la", "Envoyer la preuve du dépôt")}
            </h2>
            <p style={{ color: COLORS.gray, fontSize: 14, margin: "0 0 24px" }}>
              {t("Pran yon foto oswa screenshot tranzaksyon NatCash ou a", "Prenez une photo ou capture d'écran de votre transaction NatCash")}
            </p>

            {error && (
              <div style={{
                background: "#FFE6E6", border: `1px solid ${COLORS.danger}`,
                borderRadius: 12, padding: "12px 16px", marginBottom: 20,
                color: COLORS.danger, fontSize: 13
              }}>
                {error}
              </div>
            )}

            <label style={{
              display: "block", border: `2px dashed ${photo ? COLORS.mint : COLORS.violet}`,
              borderRadius: 18, padding: "32px 20px", textAlign: "center",
              cursor: "pointer", background: photo ? "#f0fdf9" : COLORS.white,
              marginBottom: 20, transition: "all 0.2s"
            }}>
              <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
              {photo ? (
                <div>
                  <img src={photo} alt="proof" style={{ maxWidth: "100%", maxHeight: 220, borderRadius: 12, marginBottom: 12 }} />
                  <p style={{ color: COLORS.mint, fontWeight: 700, fontSize: 14, margin: 0 }}>
                    ✓ {t("Foto chaje!", "Photo chargée !")} — {photoName}
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📸</div>
                  <p style={{ color: COLORS.violet, fontWeight: 700, fontSize: 15, margin: "0 0 6px" }}>
                    {t("Touche pou chwazi foto", "Appuyez pour choisir une photo")}
                  </p>
                  <p style={{ color: COLORS.gray, fontSize: 13, margin: 0 }}>
                    {t("Screenshot oswa foto resi NatCash ou a", "Screenshot ou photo du reçu NatCash")}
                  </p>
                </div>
              )}
            </label>

            <div style={{
              background: "#FFF9E6", border: `1px solid ${COLORS.gold}`,
              borderRadius: 12, padding: "14px 16px", marginBottom: 24,
              display: "flex", gap: 10, alignItems: "flex-start"
            }}>
              <span style={{ fontSize: 18 }}>💡</span>
              <p style={{ color: "#7A5C00", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                {t(
                  "Foto a dwe montre: nimewo, montan, ak dat tranzaksyon an. Nou pral aktive kont ou nan 1-2 èdtan.",
                  "La photo doit montrer : le numéro, le montant, et la date de la transaction. Nous activerons votre compte sous 1-2 heures."
                )}
              </p>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setScreen("payment")} style={{
                flex: 1, background: COLORS.lightGray, color: COLORS.navy,
                border: "none", borderRadius: 14, padding: "14px",
                fontSize: 14, fontWeight: 600, cursor: "pointer"
              }}>← {t("Retounen", "Retour")}</button>
              <button
                disabled={!photo || loading}
                onClick={handleSubmitProof}
                style={{
                  flex: 2,
                  background: photo ? `linear-gradient(135deg, ${COLORS.mint}, #2aaa90)` : COLORS.lightGray,
                  color: photo ? COLORS.navy : COLORS.gray,
                  border: "none", borderRadius: 14, padding: "14px",
                  fontSize: 15, fontWeight: 700, cursor: photo && !loading ? "pointer" : "not-allowed"
                }}>
                {loading ? t("Tann...", "Envoi...") : t("Voye Prèv →", "Envoyer la preuve →")}
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4 — PENDING */}
        {screen === "pending" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>⏳</div>
            <h2 style={{ color: COLORS.navy, fontSize: 24, fontWeight: 800, margin: "0 0 12px" }}>
              {t("Nou resevwa prèv ou a!", "Nous avons reçu votre preuve !")}
            </h2>
            <p style={{ color: COLORS.gray, fontSize: 15, margin: "0 0 32px", lineHeight: 1.6 }}>
              {t(
                "Nou pral verifye depozit ou a epi aktive kont ou nan 1 a 2 èdtan. Mèsi pou pasyans ou!",
                "Nous allons vérifier votre dépôt et activer votre compte sous 1 à 2 heures. Merci pour votre patience !"
              )}
            </p>

            <div style={{
              background: COLORS.white, borderRadius: 18, padding: "24px 20px",
              boxShadow: "0 2px 20px rgba(15,31,61,0.07)", marginBottom: 24, textAlign: "left"
            }}>
              {[
                { icon: "✅", label: t("Plan chwazi", "Plan choisi"), value: t(PLANS.find(p => p.id === selectedPlan)?.name, PLANS.find(p => p.id === selectedPlan)?.nameF) },
                { icon: "✅", label: t("Depozit voye", "Dépôt envoyé"), value: PLANS.find(p => p.id === selectedPlan)?.price },
                { icon: "✅", label: t("Prèv resevwa", "Preuve reçue"), value: t("Wi", "Oui") },
                { icon: "⏳", label: t("Aktivasyon kont", "Activation compte"), value: t("1-2 èdtan", "1-2 heures") },
              ].map((row, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 0", borderBottom: i < 3 ? `1px solid ${COLORS.lightGray}` : "none"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span>{row.icon}</span>
                    <span style={{ color: COLORS.gray, fontSize: 13 }}>{row.label}</span>
                  </div>
                  <span style={{ color: COLORS.navy, fontWeight: 600, fontSize: 13 }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${COLORS.indigo}, ${COLORS.violet})`,
              borderRadius: 14, padding: "16px 20px", marginBottom: 20
            }}>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, margin: "0 0 4px" }}>
                {t("Administratè", "Administrateur")}
              </p>
              <p style={{ color: COLORS.white, fontWeight: 700, fontSize: 16, margin: "0 0 4px" }}>
                {OWNER_NAME}
              </p>
              <p style={{ color: COLORS.mint, fontSize: 13, margin: 0 }}>
                {NATCASH_NUMBER}
              </p>
            </div>

            <button onClick={() => { setScreen("plans"); setSelectedPlan(null); setPhoto(null); setPhotoName(""); }} style={{
              background: COLORS.lightGray, color: COLORS.navy, border: "none",
              borderRadius: 12, padding: "12px 28px", fontWeight: 600, cursor: "pointer", fontSize: 14
            }}>{t("Tounen nan Akèy", "Retour à l'accueil")}</button>
          </div>
        )}
      </div>
    </div>
  );
}
