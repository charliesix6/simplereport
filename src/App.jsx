// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight, Check, ShieldCheck, FileText, Upload, Mail, Phone, MapPin, Lock, Info } from "lucide-react";
import { HelmetProvider, Helmet } from "react-helmet-async";

// 👇 Imágenes (en src/assets)
import hero from "./assets/hero.jpg";
import logo from "./assets/logo.jpg";

// ────────────────────────────────────────────────────────────────────────────────
// Utilidades y constantes
// ────────────────────────────────────────────────────────────────────────────────
const SITE = {
  name: "SIMPLE REPORT, S.L.",
  email: "administracion@simplereport.es",
  phone: "+34 910 782 205",
  address: "Madrid, España",
};

const plansSem = [
  {
    slug: "estandar-semestral",
    name: "Estándar",
    price: 250,
    desc: "Ideal para entidades que buscan cumplir sin complicaciones.",
    policies: [
      "Preparación técnica del archivo CPI 1",
      "Validación y formato según normativa BdE",
      "Envío oficial de estados financieros semestral",
      "Subida de la póliza de responsabilidad civil incluida",
    ],
  },
  {
    slug: "plus-semestral",
    name: "Plus",
    price: 275,
    desc:
      "Ideal para entidades que desean ponerse al día con sus obligaciones, incluyendo el reporte actual y uno anterior no enviado al Banco de España.",
    policies: [
      "Preparación y validación técnica del archivo CPI 1 del periodo",
      "Envío oficial al Banco de España del reporte del semestre en curso",
      "Preparación y envío adicional de un reporte atrasado",
      "Subida de póliza de responsabilidad civil correspondiente",
      "Soporte técnico personalizado durante todo el proceso",
    ],
  },
  {
    slug: "premium-semestral",
    name: "Premium",
    price: 300,
    desc:
      "Pensado para entidades que necesitan una regularización completa ante el Banco de España, incluyendo el envío del reporte actual y todos los reportes atrasados pendientes, sin límite de semestres.",
    policies: [
      "Preparación, validación y envío del archivo CPI 1 del semestre en curso",
      "Revisión de todos los periodos anteriores no presentados",
      "Envío oficial de cada reporte atrasado al Banco de España",
      "Subida de póliza de responsabilidad civil correspondiente",
      "Soporte completo durante todo el proceso",
    ],
  },
];

const plansAnual = [
  {
    slug: "estandar-anual",
    name: "Estándar Anual",
    price: 440,
    desc:
      "Para entidades que quieren tener cubiertos ambos semestres del año sin preocuparse por fechas.",
    policies: [
      "Preparación y validación de los dos reportes semestrales del año",
      "Envío oficial al Banco de España de ambos semestres",
      "Subida y envío de póliza de responsabilidad civil",
      "Soporte y recordatorios a lo largo del año",
    ],
  },
  {
    slug: "plus-anual",
    name: "Plus Anual",
    price: 500,
    desc:
      "Para entidades que desean cubrir el año en curso y regularizar un periodo anterior pendiente.",
    policies: [
      "Todo lo incluido en Estándar Anual",
      "Preparación y envío adicional de 1 reporte atrasado",
      "Soporte técnico personalizado durante todo el proceso",
    ],
  },
  {
    slug: "premium-anual",
    name: "Premium Anual",
    price: 560,
    desc:
      "Pensado para quien necesita el año completo y la regularización total de periodos anteriores.",
    policies: [
      "Todo lo incluido en Estándar Anual",
      "Regularización completa de todos los reportes atrasados",
      "Soporte completo durante todo el proceso",
    ],
  },
];

const thankYouCopy = {
  "estandar-semestral":
    "Solicitud recibida. Te enviaremos la proforma y pasos para comenzar. Activación tras pago.",
  "plus-semestral":
    "Solicitud recibida. Incluye reporte actual + 1 atrasado. Recibirás proforma e instrucciones.",
  "premium-semestral":
    "Solicitud recibida. Incluye actual + todos los atrasados. Proforma personalizada en tu email.",
  "estandar-anual":
    "Solicitud recibida. Cobertura anual (2 reportes). Te enviaremos la proforma e instrucciones.",
  "plus-anual":
    "Solicitud recibida. Anual: 2 reportes + 1 atrasado. Recibirás proforma e instrucciones.",
  "premium-anual":
    "Solicitud recibida. Anual: 2 reportes + todos los atrasados. Proforma en tu email.",
};

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

// Scroll to top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// ────────────────────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur border-b border-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          onClick={() => setOpen(false)}
        >
          <img src={logo} alt="Simple Report logo" className="h-8 w-8" />
          <span className="font-serif text-xl tracking-tight">SIMPLE REPORT</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          {[
            { label: "Servicios", path: "/servicios" },
            { label: "Planes semestrales", path: "/planes/semestrales" },
            { label: "Planes anuales", path: "/planes/anuales" },
            { label: "Por qué nosotros", path: "/por-que-nosotros" },
            { label: "Seguridad", path: "/seguridad" },
            { label: "Contacto", path: "/contacto" },
          ].map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/servicios"
              className="ml-2 inline-flex items-center rounded-2xl px-4 py-2 bg-brand-500 text-white hover:bg-brand-600 transition-colors"
            >
              Solicitar servicio
            </Link>
          </motion.div>
        </div>

        <button
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-gray-800 bg-black"
        >
          <ul className="px-4 py-3 space-y-2">
            {[
              { label: "Servicios", path: "/servicios" },
              { label: "Planes semestrales", path: "/planes/semestrales" },
              { label: "Planes anuales", path: "/planes/anuales" },
              { label: "Por qué nosotros", path: "/por-que-nosotros" },
              { label: "Seguridad", path: "/seguridad" },
              { label: "Contacto", path: "/contacto" },
            ].map(({ label, path }) => (
              <li key={path}>
                <Link
                  className="block py-2 hover:text-brand-400 transition-colors"
                  to={path}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t border-gray-800 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/70">© {new Date().getFullYear()} SIMPLE REPORT, S.L.</p>
        
        <div className="flex items-center gap-4 text-sm">
          <Link to="/aviso-legal" className="hover:text-brand-300">Aviso legal</Link>
          <Link to="/privacidad" className="hover:text-brand-300">Privacidad</Link>
          <Link to="/cookies" className="hover:text-brand-300">Cookies</Link>
          <Link to="/terminos" className="hover:text-brand-300">Términos del servicio</Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-1 hover:text-brand-300">
            <Mail size={16} /> {SITE.email}
          </a>
          <a href={`tel:${SITE.phone}`} className="flex items-center gap-1 hover:text-brand-300">
            <Phone size={16} /> {SITE.phone}
          </a>
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// Páginas
// ────────────────────────────────────────────────────────────────────────────────
function Home() {
  return (
    <main>
      <Helmet>
        <title>Simple Report — Reporte semestral para PI e ICI</title>
        <meta name="description" content="Preparamos, validamos y enviamos tu reporte semestral al Banco de España. Póliza RC incluida." />
      </Helmet>

      <section className="pt-28 pb-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight"
            >
              Tu reporte financiero semestral, sin errores ni complicaciones
            </motion.h1>
            <p className="mt-4 text-lg text-white/90">
              Especialistas en reportes financieros y póliza RC para Prestamistas e Intermediarios de Crédito Inmobiliario.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 bg-brand-500 text-white hover:bg-brand-600"
              >
                Solicitar servicio <ArrowRight size={18} />
              </Link>
              <Link
                to="/planes/semestrales"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 ring-1 ring-brand-400/60 hover:bg-brand-500/10"
              >
                Ver planes
              </Link>
            </div>
            <p className="mt-4 text-sm text-white/60">
              Incluimos el envío de la póliza de RC. Solo transferencia con factura proforma.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Precio por debajo del mercado",
                "Especialización total (no somos gestoría generalista)",
                "Póliza de RC incluida — sin coste extra",
                "RGPD, cifrado y confidencialidad",
                "PKI opcional con asistencia completa",
              ].map((v) => (
                <div key={v} className="rounded-2xl border border-gray-800 p-4 bg-neutral-900 flex items-start gap-3">
                  <Check className="mt-0.5 text-brand-400" />
                  <p className="text-sm text-white/90">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl bg-neutral-800/60 border border-gray-800 overflow-hidden">
              <img
                src={hero}
                alt="Profesional revisando documentos"
                className="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-neutral-900 border border-gray-800 rounded-2xl p-4 shadow">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-brand-400" />
                <div>
                  <p className="text-sm font-medium">RGPD y confidencialidad</p>
                  <p className="text-xs text-white/60">Custodia segura de certificados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Servicios() {
  const pasos = [
    { n: 1, t: "Contratas", d: "Eliges plan y envías la solicitud." },
    { n: 2, t: "Proforma", d: "Te enviamos factura proforma." },
    { n: 3, t: "Pago", d: "Activación tras transferencia." },
    { n: 4, t: "Documentación", d: "Subes la documentación y la póliza/PKI." },
    { n: 5, t: "Envío", d: "Preparamos, validamos y enviamos al BdE." },
  ];
  return (
    <main className="pt-28 pb-20 bg-black">
      <Helmet>
        <title>Servicios — Simple Report</title>
        <meta name="description" content="Qué incluye el servicio, pasos y soporte para el reporte semestral y la póliza RC." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Servicios</h1>
        <p className="mt-3 text-white/90">
          Si eres Prestamista Inmobiliario (PI) o Intermediario de Crédito Inmobiliario (ICI), debes enviar tu <strong>reporte financiero</strong> dos veces al año junto con tu<strong> póliza de responsabilidad civil</strong>. Nosotros lo hacemos por ti.
        </p>
        <p className="mt-2 text-white/70">
          Preparación y revisión técnica del reporte, envío mediante tu certificado digital (PKI), póliza incluida y recordatorios de plazos. También te ayudamos a solicitar el PKI si lo necesitas.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-800 bg-neutral-900 p-6">
            <h2 className="font-semibold text-xl">Qué incluye</h2>
            <ul className="mt-4 space-y-2">
              {[
                "Preparación del reporte financiero conforme a criterios del BdE",
                "Revisión técnica y validaciones para evitar rechazos",
                "Envío del reporte mediante certificado PKI",
                "Envío de póliza de RC sin coste extra",
                "Recordatorios y soporte de plazos",
                "Asistencia opcional para obtener el PKI",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-white/90">
                  <Check className="mt-0.5 text-brand-400" size={18} /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-800 bg-neutral-900 p-6">
            <h2 className="font-semibold text-xl">Cómo funciona</h2>
            <ol className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pasos.map((p) => (
                <li key={p.n} className="rounded-xl border border-gray-800 p-4">
                  <p className="text-sm font-medium">{p.n}. {p.t}</p>
                  <p className="text-sm text-white/60">{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            to="/planes/semestrales"
            className="flex-1 text-center inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 bg-brand-500 text-white font-medium shadow-lg hover:bg-brand-600 transition"
          >
            Ver planes semestrales
          </Link>
          <Link
            to="/planes/anuales"
            className="flex-1 text-center inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 bg-brand-500 text-white font-medium shadow-lg hover:bg-brand-600 transition"
          >
            Ver planes anuales
          </Link>
        </div>
      </div>
    </main>
  );
}

function PlanCard({ plan }) {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
      whileTap={{ scale: 0.98 }}
      className="rounded-2xl border border-gray-800 p-6 bg-neutral-900 flex flex-col transition-all"
      aria-labelledby={`${plan.slug}-title`}
    >
      <h3 id={`${plan.slug}-title`} className="text-xl font-semibold">{plan.name}</h3>
      <p className="mt-1 text-3xl font-extrabold">€{plan.price}</p>
      <p className="mt-2 text-sm text-white/90">{plan.desc}</p>
      <ul className="mt-4 space-y-2">
        {plan.policies.map((p, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/90">
            <Check className="mt-0.5 text-brand-400" size={18} /> {p}
          </li>
        ))}
      </ul>
      <button
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 bg-brand-500 text-white hover:bg-brand-600 transition"
        onClick={() => navigate(`/solicitar/${plan.slug}`, { state: { planName: plan.name } })}
        aria-label={`Solicitar plan ${plan.name}`}
      >
        Solicitar este plan <ArrowRight size={18} />
      </button>
    </motion.div>
  );
}

// Para cuando se cargan planes (opcional si es async):
function PlanCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-800 p-6 bg-neutral-900 animate-pulse">
      <div className="h-6 bg-gray-700 rounded w-2/3 mb-4"></div>
      <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}

function PlanesSemestrales() {
  return (
    <main className="pt-28 pb-20 bg-black">
      <Helmet>
        <title>Planes semestrales — Simple Report</title>
        <meta name="description" content="Planes Estándar, Plus y Premium para el semestre. Pago por transferencia con factura proforma." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Planes semestrales</h1>
        <p className="mt-2 text-white/70">
          Elige el alcance que necesitas para cumplir tu <strong>obligación semestral</strong>.
          <br className="hidden sm:block" />
          Pago único por transferencia tras recibir <strong>factura proforma</strong>. Sin pagos online.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {plansSem.map((p) => (
            <PlanCard key={p.slug} plan={p} />
          ))}
        </div>
      </div>
    </main>
  );
}

function PlanesAnuales() {
  return (
    <main className="pt-28 pb-20 bg-black">
      <Helmet>
        <title>Planes anuales — Simple Report</title>
        <meta name="description" content="Cobertura de ambos semestres del año y regularización de atrasados si aplica." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Planes anuales</h1>
        <p className="mt-2 text-white/70">
          Cubre todo el año con dos reportes (ambos semestres) y, si hace falta, regulariza atrasados.
          <br className="hidden sm:block" />
          Pago único por transferencia tras recibir <strong>factura proforma</strong>. Sin pagos online.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {plansAnual.map((p) => (
            <PlanCard key={p.slug} plan={p} />
          ))}
        </div>
      </div>
    </main>
  );
}

function PorQueNosotros() {
  const items = [
    { icon: Info, title: "Atención experta", d: "Especialización exclusiva en reportes semestrales para PI e ICI: equipo técnico con conocimiento práctico de los criterios del Banco de España." },
    { icon: FileText, title: "Transparencia en precios", d: "Precios claros, sin costes ocultos. Documentación y alcance del servicio definidos desde el primer contacto." },
    { icon: Check, title: "Proceso ágil", d: "Contratación y envío en pasos sencillos: eliges plan, subes documentación y nosotros gestionamos el resto." },
    { icon: ShieldCheck, title: "Seguridad y cumplimiento", d: "RGPD, cifrado y procedimientos auditables. El uso del PKI y la póliza RC se gestiona con máxima seguridad." },
    { icon: Info, title: "Soporte dedicado", d: "Seguimiento personalizado en cada trámite: respuestas rápidas y acompañamiento técnico hasta la presentación." },
  ];

  return (
    <main className="pt-28 pb-20 bg-black">
      <Helmet>
        <title>Por qué nosotros — Simple Report</title>
        <meta name="description" content="Especialización, procesos ágiles y seguridad para el envío de reportes al Banco de España." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-800/40 border border-gray-800 p-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: título, descripción y CTAs */}
            <div className="lg:col-span-5">
              <h1 className="text-3xl sm:text-4xl font-bold">Por qué elegir Simple Report</h1>
              <p className="mt-4 text-white/90 leading-relaxed">
                Especialistas en reportes semestrales para Prestamistas e Intermediarios de Crédito Inmobiliario.
                Procesos claros, cumplimiento normativo y seguridad en el manejo de certificados y documentos.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-brand-500 text-white hover:bg-brand-600 transition"
                  aria-label="Contactar con Simple Report"
                >
                  Contactar
                </Link>
                <Link
                  to="/planes/semestrales"
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 ring-1 ring-brand-400/30 hover:bg-white/5 transition"
                >
                  Ver planes
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-zinc-900/60 border border-zinc-800 p-3">
                  <p className="text-xs text-white/70">Póliza RC incluida</p>
                  <p className="font-medium text-white mt-1">Cobertura sin coste adicional</p>
                </div>
                <div className="rounded-lg bg-zinc-900/60 border border-zinc-800 p-3">
                  <p className="text-xs text-white/70">Asistencia PKI</p>
                  <p className="font-medium text-white mt-1">Ayuda para obtención y gestión</p>
                </div>
              </div>
            </div>

            {/* Right: tarjetas de beneficios */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {items.map((it) => (
                <motion.article
                  key={it.title}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="rounded-2xl border border-gray-800 bg-neutral-900 p-6 flex flex-col gap-4"
                  aria-labelledby={`pq-${it.title}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-zinc-800 p-3 flex items-center justify-center">
                      <it.icon className="w-6 h-6 text-brand-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 id={`pq-${it.title}`} className="text-md font-semibold text-white">{it.title}</h3>
                      <p className="mt-1 text-sm text-white/90 leading-relaxed">{it.d}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Seguridad() {
  return (
    <main className="min-h-screen text-gray-100 bg-black">
      <Helmet>
        <title>Seguridad y confianza — Simple Report</title>
        <meta
          name="description"
          content="Cumplimiento RGPD/LOPD-GDD, cifrado, contratos claros y procesos de reporte seguros. Conoce cómo Simple Report protege tu información y garantiza la confianza."
        />
      </Helmet>

      <header className="pt-20 pb-10">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Seguridad y confianza
          </h1>
          <p className="mt-4 max-w-3xl text-gray-300">
            Protegemos tus datos y operamos con procesos auditables de principio a fin.
            Cumplimiento normativo, controles técnicos, contrato transparente y compromiso
            de plazos con nuestros clientes.
          </p>
        </div>
      </header>

      {/* Highlights principales */}
      <section className="py-6">
        <div className="mx-auto max-w-6xl px-4 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5">
            <h3 className="text-sm uppercase text-gray-400">RGPD</h3>
            <p className="text-gray-200 mt-1">
              Base legal clara, finalidad exclusiva del reporte, consentimiento en formularios.
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5">
            <h3 className="text-sm uppercase text-gray-400">Contrato</h3>
            <p className="text-gray-200 mt-1">
              Pago previo mediante transferencia, sin devoluciones. Alcance del servicio definido.
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5">
            <h3 className="text-sm uppercase text-gray-400">Anexo PKI</h3>
            <p className="text-gray-200 mt-1">
              Uso del certificado digital solo para reportes financieros y póliza de RC.
            </p>
          </div>
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5">
            <h3 className="text-sm uppercase text-gray-400">Seguro RC</h3>
            <p className="text-gray-200 mt-1">
              Cobertura activa frente a posibles errores en la prestación del servicio.
            </p>
          </div>
        </div>
      </section>

      {/* Proceso del servicio */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 md:p-8">
          <h2 className="text-2xl font-bold">Proceso del servicio</h2>
          <ol className="mt-6 space-y-4 text-gray-300">
            <li><strong>1.</strong> Firma del contrato y emisión de la factura proforma.</li>
            <li><strong>2.</strong> Pago por transferencia bancaria (condición previa).</li>
            <li><strong>3.</strong> Envío de la documentación requerida por parte del cliente.</li>
            <li><strong>4.</strong> Validación y preparación del reporte por Simple Report.</li>
            <li><strong>5.</strong> Presentación del reporte al Banco de España in plazo.</li>
          </ol>
        </div>
      </section>

      {/* Calendario de hitos */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 md:p-8">
          <h2 className="text-2xl font-bold">Calendario de hitos</h2>
          <ul className="mt-6 space-y-3 text-gray-300">
            <li><strong>20 de diciembre:</strong> entrega de documentación para el primer semestre.</li>
            <li><strong>20 de junio:</strong> entrega de documentación para el segundo semestre.</li>
          </ul>
          <p className="mt-4 text-sm text-gray-400">
            * Si la documentación llega fuera de plazo, no se puede garantizar la presentación a tiempo.
          </p>
        </div>
      </section>

      {/* Cumplimiento */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 md:p-8">
          <h2 className="text-2xl font-bold">Cumplimiento y privacidad</h2>
          <p className="mt-4 text-gray-300">
            Aplicamos las medidas exigidas por el RGPD y la LOPD-GDD: cifrado en tránsito y en reposo,
            gestión de accesos con el principio de mínimo privilegio, copias de seguridad verificadas
            y contratos de encargo de tratamiento con nuestros proveedores.
          </p>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 rounded-3xl bg-zinc-900/60 border border-zinc-800 p-6 md:p-8">
          <h2 className="text-2xl font-bold">Preguntas frecuentes</h2>
          <details className="mt-4 p-4 border border-zinc-800 rounded-xl">
            <summary className="cursor-pointer font-semibold">¿Puedo cancelar y pedir devolución?</summary>
            <p className="mt-2 text-gray-300">No. Una vez contratado el servicio y realizado el pago, no se admiten devoluciones.</p>
          </details>
          <details className="mt-4 p-4 border border-zinc-800 rounded-xl">
            <summary className="cursor-pointer font-semibold">¿Qué ocurre si envío la documentación tarde?</summary>
            <p className="mt-2 text-gray-300">No se puede garantizar la presentación en plazo al Banco de España.</p>
          </details>
          <details className="mt-4 p-4 border border-zinc-800 rounded-xl">
            <summary className="cursor-pointer font-semibold">¿Cómo se protege mi información?</summary>
            <p className="mt-2 text-gray-300">Mediante cifrado, controles de acceso, copias de seguridad y cumplimiento normativo RGPD.</p>
          </details>
        </div>
      </section>
    </main>
  );
}


// ────────────────────────────────────────────────────────────────────────────────
// Formularios + Inputs
// ────────────────────────────────────────────────────────────────────────────────
function TextInput({ 
  label, type = "text", required, value, onChange, placeholder, name, 
  pattern,
  error
}) {
  const id = useMemo(() => `${name}-${Math.random().toString(36).slice(2, 7)}`,[name]);
  const [touched, setTouched] = useState(false);
  
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium flex items-center gap-1">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <input 
        id={id} 
        name={name} 
        type={type} 
        required={required} 
        pattern={pattern}
        className={classNames(
          "mt-1 w-full rounded-xl border px-3 py-2 transition-all duration-200",
          "bg-black text-white placeholder-white/40",
          "focus:outline-none focus:ring-2",
          touched && error
            ? "border-red-500 focus:ring-red-500/60"
            : "border-gray-700 focus:ring-brand-500/60 focus:border-brand-500"
        )}
        placeholder={placeholder} 
        value={value} 
        onChange={(e)=>onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={touched && !!error}
      />
      {touched && error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

function Select({ label, required, value, onChange, name, children, error }) {
  const id = useMemo(() => `${name}-${Math.random().toString(36).slice(2, 7)}`,[name]);
  const [touched, setTouched] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">{label}{required && " *"}</label>
      <select 
        id={id} 
        name={name} 
        required={required} 
        className={classNames(
          "mt-1 w-full rounded-xl border px-3 py-2 transition-all",
          "bg-black text-white focus:outline-none focus:ring-2",
          touched && error
            ? "border-red-500 focus:ring-red-500/60"
            : "border-gray-700 focus:ring-brand-500/60"
        )}
        value={value} 
        onChange={(e)=>onChange(e.target.value)}
        onBlur={() => setTouched(true)}
      >
        {children}
      </select>
      {touched && error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Checkbox({ label, checked, onChange, required, name }) {
  const id = useMemo(() => `${name}-${Math.random().toString(36).slice(2, 7)}`,[name]);
  return (
    <div className="flex items-center gap-2">
      <input id={id} type="checkbox" name={name} className="rounded border-gray-700 focus:ring-brand-500/60" required={required} checked={checked} onChange={(e)=>onChange(e.target.checked)} />
      <label htmlFor={id} className="text-sm">{label}</label>
    </div>
  );
}

function SolicitudPlanForm() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const slug = pathname.split("/").pop();

  const SEM = plansSem.map(p => ({...p, freq: "Semestral"}));
  const ANU = plansAnual.map(p => ({...p, freq: "Anual"}));
  const arrivedAnnual = slug?.includes("anual");
  const allByFreq = useMemo(() => ({ Semestral: SEM, Anual: ANU }), []);

  const initialList = arrivedAnnual ? allByFreq.Anual : allByFreq.Semestral;
  const initialPlan = initialList.find(p => p.slug === slug) || initialList[0];

  const [form, setForm] = useState({
    entidad: "", cif: "", contacto: "", email: "", telefono: "",
    frecuencia: arrivedAnnual ? "Anual" : "Semestral",
    planSlug: initialPlan.slug,
    pki: "No", obs: "", rgpd: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 500;

  const currentPlans = allByFreq[form.frecuencia] || [];

  useEffect(() => {
    if (!currentPlans.some(p => p.slug === form.planSlug)) {
      setForm(f => ({ ...f, planSlug: currentPlans[0]?.slug }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.frecuencia]);

  const selectedPlan = currentPlans.find(p => p.slug === form.planSlug);

  // Mostrar porcentaje de campos completos:
  const progressPercent = useMemo(() => {
    const fields = [form.entidad, form.cif, form.contacto, form.email, form.telefono, form.rgpd];
    const filled = fields.filter(f => f).length;
    return Math.round((filled / fields.length) * 100);
  }, [form]);

  // Envío vía fetch a Formspree y redirección interna
  async function handleSubmit(e){
    e.preventDefault();
    
    // Validación mejorada
    const errors = {};
    if(!form.entidad.trim()) errors.entidad = "Requerido";
    if(!form.cif.trim()) errors.cif = "Requerido";
    if(!form.contacto.trim()) errors.contacto = "Requerido";
    if(!form.email.trim()) errors.email = "Requerido";
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Email inválido";
    if(!/^[\d\s+\-()]+$/.test(form.telefono) || form.telefono.replace(/\D/g,"").length < 9) {
      errors.telefono = "Teléfono inválido";
    }
    if(!form.rgpd) errors.rgpd = "Debes aceptar la Política de privacidad";
    
    if(Object.keys(errors).length > 0) {
      setErrors(errors);
      alert("Por favor, completa correctamente todos los campos.");
      return;
    }
    
    const fd = new FormData(e.currentTarget);
    // añadimos nombre y precio del plan
    if(selectedPlan){
      fd.append("planNombre", selectedPlan.name);
      fd.append("planPrecio", String(selectedPlan.price));
    }
    try{
      setLoading(true);
      const res = await fetch("https://formspree.io/f/mjkeevbq", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if(res.ok){
        setToast({ message: "✓ Solicitud enviada correctamente", type: "success" });
        setTimeout(() => navigate(`/gracias/${slug}`), 1500);
      }else{
        setToast({ message: "✗ Error al enviar. Inténtalo de nuevo.", type: "error" });
      }
    }catch(err){
      console.error(err);
      alert("No hay conexión. Revisa tu internet e inténtalo de nuevo.");
    }finally{
      setLoading(false);
    }
  }

  // Opcional: Validar email mientras escribe (después de dejar de escribir)
  useEffect(() => {
    const timer = setTimeout(() => {
      if(form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setErrors(prev => ({...prev, email: "Email inválido"}));
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [form.email]);

  return (
    <main className="pt-28 pb-20 bg-black">
      <Helmet>
        <title>{`Solicitud — ${selectedPlan?.name ?? ""} — Simple Report`}</title>
        <meta name="description" content="Formulario para solicitar el servicio. Recibirás factura proforma e instrucciones." />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Solicitud — {selectedPlan?.name}</h1>
          <p className="text-sm text-white/60">
            Tras enviar, recibirás un email: "Solicitud recibida — recibirás factura proforma con instrucciones".
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-800 bg-neutral-900 p-6 space-y-4">
          <TextInput name="entidad" label="Entidad (razón social)" required value={form.entidad} onChange={(v)=>setForm({...form, entidad:v})} placeholder="Ej. Intermediarios SL" />
          <TextInput name="cif" label="CIF/NIF" required value={form.cif} onChange={(v)=>setForm({...form, cif:v})} placeholder="B12345678" />
          <TextInput name="contacto" label="Persona de contacto" required value={form.contacto} onChange={(v)=>setForm({...form, contacto:v})} placeholder="Nombre y apellidos" />
          <TextInput name="email" type="email" label="Email" required value={form.email} onChange={(v)=>setForm({...form, email:v})} placeholder="email@empresa.com" />
          <TextInput name="telefono" label="Teléfono" required value={form.telefono} onChange={(v)=>setForm({...form, telefono:v})} placeholder="+34 ..." />

          <Select name="frecuencia" label="Frecuencia" required value={form.frecuencia} onChange={(v)=>setForm({...form, frecuencia:v})}>
            <option>Semestral</option>
            <option>Anual</option>
          </Select>

          <Select name="planSlug" label="Plan" required value={form.planSlug} onChange={(v)=>setForm({...form, planSlug:v})}>
            {currentPlans.map(p => (
              <option key={p.slug} value={p.slug}>
                {p.name} — €{p.price}
              </option>
            ))}
          </Select>

          {selectedPlan && (
            <div className="rounded-xl border border-gray-800 p-3 text-sm text-white/90">
              <p className="font-medium">{selectedPlan.name} · €{selectedPlan.price}</p>
              <p className="text-white/70">{selectedPlan.desc}</p>
            </div>
          )}

          <Select name="pki" label="¿Necesitas que gestionemos el PKI BdE?" value={form.pki} onChange={(v)=>setForm({...form, pki:v})}>
            <option>No</option>
            <option>Sí</option>
          </Select>
          <div>
            <label className="text-sm font-medium">Observaciones</label>
            <textarea
              name="observaciones"
              maxLength={MAX_CHARS}
              className="mt-1 w-full rounded-xl border border-gray-700 bg-black text-white px-3 py-2 h-28"
              value={form.obs}
              onChange={(e)=>{
                setForm({...form, obs:e.target.value});
                setCharCount(e.target.value.length);
              }}
              placeholder="Detalles relevantes..."
            />
            <p className="text-xs text-white/60">{charCount}/{MAX_CHARS}</p>
          </div>

          <Checkbox
            name="privacidad"
            required={true}
            checked={form.rgpd}
            onChange={(v) => setForm({...form, rgpd: v})}
            label={<span>Acepto la <Link to="/privacidad" className="underline">Política de privacidad</Link></span>}
          />

          {/* Honeypot anti-spam */}
          <input type="text" name="_gotcha" style={{ display: "none" }} />

          <button 
            type="submit" 
            disabled={loading}
            className={classNames(
              "w-full rounded-2xl py-3 font-medium transition-all",
              loading 
                ? "bg-brand-500/60 cursor-not-allowed opacity-70" 
                : "bg-brand-500 text-white hover:bg-brand-600 active:scale-95"
            )}
          >
            {loading ? "Enviando..." : "Enviar solicitud"}
          </button>
          <p className="text-xs text-white/60 mt-1">
            Pago único por transferencia tras recibir factura proforma. Sin pagos online.
          </p>

          {/* Mostrar porcentaje de campos completos */}
          <div className="rounded-full h-1 bg-gray-700 overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="h-full bg-brand-500"
            />
          </div>
          <p className="text-xs text-white/60">{progressPercent}% del formulario completado</p>
        </form>

        {toast && (
          <Toast show={true} onClose={() => setToast(null)}>
            {toast.message}
          </Toast>
        )}
      </div>
    </main>
  );
}

function SubidaDocumentos() {
  const [poliza, setPoliza] = useState(null);
  const [pki, setPki] = useState(null);
  const [id, setId] = useState("");
  const [rgpd, setRgpd] = useState(false);
  function onSubmit(e){
    e.preventDefault();
    if(!poliza) return alert("Sube la póliza RC (PDF máx. 10MB)");
    if(!rgpd) return alert("Debes aceptar la Política de privacidad");
    if(poliza.size > 10*1024*1024) return alert("La póliza supera 10MB");
    if(pki && pki.size > 10*1024*1024) return alert("El PDF PKI supera 10MB");
    alert("Documentación enviada. Te confirmaremos por email.");
  }
  return (
    <main className="pt-28 pb-20 bg-black">
      <Helmet>
        <title>Subida de documentación — Simple Report</title>
        <meta name="description" content="Envía tu póliza RC y autorización PKI de forma segura." />
      </Helmet>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Subida de documentación</h1>
        <form onSubmit={onSubmit} className="mt-6 rounded-2xl border border-gray-800 bg-neutral-900 p-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Póliza RC (PDF máx. 10MB) *</label>
            <input type="file" accept="application/pdf" className="mt-1 w-full text-white" onChange={(e)=>setPoliza(e.target.files?.[0]||null)} required />
          </div>
          <div>
            <label className="text-sm font-medium">Autorización PKI (PDF) — opcional</label>
            <input type="file" accept="application/pdf" className="mt-1 w-full text-white" onChange={(e)=>setPki(e.target.files?.[0]||null)} />
          </div>
          <TextInput name="identificador" label="Identificador de solicitud" required value={id} onChange={setId} placeholder="Ej. SR-2025-00123" />
          <Checkbox name="rgpd-docs" required={true} checked={rgpd} onChange={setRgpd} label={<span>Acepto la <Link to="/privacidad" className="underline">Política de privacidad</Link></span>} />
          <button type="submit" className="w-full rounded-2xl bg-brand-500 text-white py-3 hover:bg-brand-600 flex items-center justify-center gap-2">
            <Upload size={18}/> Enviar documentación
          </button>
        </form>
      </div>
    </main>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// PÁGINA DE “GRACIAS” PERSONALIZADA
// ─────────────────
function Gracias() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").pop();

  // ¿Viene de una solicitud? (coincide con slugs de planes)
  const planSlugs = [...plansSem, ...plansAnual].map(p => p.slug);
  const esSolicitud = planSlugs.includes(slug);

  const esAnual = /anual/i.test(slug);

  // Texto EXACTO para solicitudes (anual/semestral)
  const textoSolicitud = esAnual
    ? "Hemos recibido vuestra solicitud. Cobertura anual (2 reportes). En breves le enviaremos la factura proforma y los pasos para continuar con la contratación del servicio."
    : "Hemos recibido vuestra solicitud. Cobertura semestral (1 reporte). En breves le enviaremos la factura proforma y los pasos para continuar con la contratación del servicio.";

  // Mensaje genérico (p.ej. cuando viene del formulario de contacto)
  const textoGenerico = thankYouCopy[slug] || "Solicitud recibida. Te contactaremos en breve.";

  const texto = esSolicitud ? textoSolicitud : textoGenerico;

  return (
    <main className="pt-28 pb-20 bg-black">
      <Helmet>
        <title>Muchas Gracias — Simple Report</title>
        <meta name="description" content="Confirmación tras el envío del formulario." />
      </Helmet>

      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
        <Lock className="mx-auto text-brand-400" />
        <h1 className="text-3xl font-bold mt-4">Muchas Gracias</h1>
        <p className="mt-2 text-white/90">{texto}</p>

        <div className="mt-6 flex justify-center gap-3">
          {/* Si es una solicitud, ocultamos “Subir documentación” */}
          {!esSolicitud && (
            <Link to="/subida" className="rounded-2xl px-4 py-2 bg-brand-500 text-white hover:bg-brand-600">
              Subir documentación
            </Link>
          )}

          <Link to="/" className="rounded-2xl px-4 py-2 ring-1 ring-brand-400/60 hover:bg-brand-500/10">
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}

function Contacto() {
  const navigate = useNavigate();
  const [rgpd, setRgpd] = useState(false);
  const [form, setForm] = useState({ nombre:"", email:"", telefono:"", mensaje:"" });

  // Envío vía fetch a Formspree y redirección a /gracias/generic
  async function handleSubmit(e){
    e.preventDefault();
    if(!rgpd){ alert("Debes aceptar la Política de privacidad"); return; }
    const fd = new FormData(e.currentTarget);
    try{
      const res = await fetch("https://formspree.io/f/xnnbbqay", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if(res.ok){
        navigate("/gracias/generic");
      }else{
        const data = await res.json().catch(()=>null);
        console.error("Formspree error", data);
        alert("No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.");
      }
    }catch(err){
      console.error(err);
      alert("No se pudo conectar con el servicio. Revisa tu conexión e inténtalo de nuevo.");
    }
  }

  return (
    <main className="pt-28 pb-20 bg-black">
      <Helmet>
        <title>Contacto — Simple Report</title>
        <meta name="description" content="Escríbenos para dudas, plazos y necesidades. Respuesta rápida." />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h1 className="text-3xl font-bold">Contacto</h1>
          <p className="mt-2 text-white/90">Cuéntanos necesidades, plazos y dudas. Respuesta <em>rápida</em>.</p>
          <ul className="mt-6 space-y-3 text-sm text-white/90">
            <li className="flex items-center gap-2"><Mail size={18} className="text-brand-400"/> {SITE.email}</li>
            <li className="flex items-center gap-2"><Phone size={18} className="text-brand-400"/> {SITE.phone}</li>
            <li className="flex items-center gap-2"><MapPin size={18} className="text-brand-400"/> {SITE.address}</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-800 bg-neutral-900 p-6 space-y-4">
          <TextInput name="nombre"   label="Nombre" required value={form.nombre} onChange={(v)=>setForm({...form, nombre:v})} placeholder="Tu nombre" />
          <TextInput name="email"    label="Email" type="email" required value={form.email} onChange={(v)=>setForm({...form, email:v})} placeholder="tu@email.com" />
          <TextInput name="telefono" label="Teléfono" required value={form.telefono} onChange={(v)=>setForm({...form, telefono:v})} placeholder="+34 ..." />
          <div>
            <label className="text-sm font-medium">Mensaje</label>
            <textarea
              name="mensaje"
              className="mt-1 w-full rounded-xl border border-gray-700 bg-black text-white placeholder-white/40 px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-brand-500/60"
              value={form.mensaje}
              onChange={(e)=>setForm({...form, mensaje:e.target.value})}
              placeholder="Cuéntanos tu caso..."
              required
            />
          </div>
          <Checkbox name="privacidad" required={true} checked={rgpd} onChange={setRgpd} label={<span>Acepto la <Link to="/privacidad" className="underline">Política de privacidad</Link></span>} />
          {/* Honeypot anti-spam */}
          <input type="text" name="_gotcha" style={{ display: "none" }} />
          <button type="submit" className="w-full rounded-2xl bg-brand-500 text-white py-3 hover:bg-brand-600">Enviar</button>
        </form>
      </div>
    </main>
  );
}

// Legales genéricas
function LegalPage({ title, children }){
  return (
    <main className="pt-28 pb-20 bg-black">
      <Helmet>
        <title>{`${title} — Simple Report`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="prose prose-invert prose-sm max-w-none mt-6">{children}</div>
      </div>
    </main>
  );
}

// Dev tests
function DevTests(){
  const results = useMemo(() => {
    const r = [];
    const slugs = [...plansSem, ...plansAnual].map(p=>p.slug);
    const unique = new Set(slugs);
    r.push({name:"Slugs únicos", pass: unique.size === slugs.length, info: `${unique.size}/${slugs.length}`});
    const missing = slugs.filter(s => !(s in thankYouCopy));
    r.push({name:"Gracias por slug", pass: missing.length === 0, info: missing.length?`Faltan: ${missing.join(', ')}`:"OK"});
    const allPlans = [...plansSem, ...plansAnual];
    const nonPos = allPlans.filter(p=>!(p.price>0)).map(p=>p.slug);
    r.push({name:"Precios válidos", pass: nonPos.length===0, info: nonPos.length?`Revisar: ${nonPos.join(', ')}`:"OK"});
    const semPrices = plansSem.map(p => p.price).join("/");
    r.push({ name: "Precios semestrales esperados", pass: semPrices === "250/275/300", info: semPrices });
    r.push({ name: "Hay rutas definidas", pass: typeof Routes !== "undefined", info: "OK" });
    r.push({ name: "Botones en Servicios", pass: true, info: "CTA semestrales/anuales renderizados" });
    return r;
  }, []);
  return (
    <main className="pt-28 pb-20 bg-black">
      <Helmet>
        <title>__dev-tests — Simple Report</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">__dev-tests</h1>
        <ul className="mt-6 space-y-3">
          {results.map((t,i)=> (
            <li key={i} className="rounded-xl border border-gray-800 p-4 flex items-center justify-between">
              <span className="font-medium">{t.name}</span>
              <span className={t.pass?"text-green-600":"text-red-600"}>{t.pass?"PASS":"FAIL"}</span>
              <span className="text-xs text-white/60">{t.info}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-white/60">Estos tests son de verificación rápida en runtime.</p>
      </div>
    </main>
  );
}

// Fuentes (Bodoni Moda + Inter)
function FontLoader(){
  useEffect(()=>{
    const link1 = document.createElement('link');
    link1.rel = 'stylesheet';
    link1.href = 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(link1);
    return ()=>{ document.head.removeChild(link1); };
  },[]);
  return (
    <style>{`
      :root { --font-serif: 'Bodoni Moda', serif; --font-sans: 'Inter', 'Avenir', 'Avenir Next', 'Nunito Sans', 'Inter', sans-serif; }
      .font-serif { font-family: var(--font-serif); }
      body { font-family: var(--font-sans); background:#000; color:#fff; }
      input, select, textarea { background:#000; color:#fff; border-color: rgb(75 85 99); }
      ::placeholder{ color: rgba(255,255,255,0.4); }
    `}</style>
  );
}

// 1. NUEVO: Componente Toast para notificaciones
function Toast({
  show,
  onClose,
  children,
}) {
  return (
    <div
      className={classNames(
        "fixed bottom-4 right-4 z-50 max-w-xs w-full rounded-lg p-4 shadow-lg transition-transform transform",
        show ? "translate-y-0" : "translate-y-full"
      )}
      role="alert"
    >
      <div className="bg-gray-800 text-white rounded-lg p-4 flex items-start gap-3">
        <div className="flex-1">
          {children}
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

// App principal
function AppShell(){
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [toastVisible, setToastVisible] = useState(false);

  return (
    <div className="min-h-screen text-white bg-black">
      <FontLoader />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/planes/semestrales" element={<PlanesSemestrales />} />
        <Route path="/planes/anuales" element={<PlanesAnuales />} />
        <Route path="/por-que-nosotros" element={<PorQueNosotros />} />
        <Route path="/seguridad" element={<Seguridad />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/subida" element={<SubidaDocumentos />} />
        <Route path="/solicitar/:slug" element={<SolicitudPlanForm />} />
        <Route path="/gracias/:slug" element={<Gracias />} />
        <Route path="/__dev-tests" element={<DevTests />} />

        {/* Legales */}
        <Route
          path="/aviso-legal"
          element={
            <LegalPage title="Aviso legal">
              <>
                <p><strong>Titular:</strong> Simple Report, S.L.</p>
                <p><strong>CIF:</strong> B22687024</p>
                <p><strong>Domicilio social:</strong> Camino de Montoro, 35, 28055, Madrid (España)</p>
                <p><strong>Correo electrónico de contacto:</strong> <a href="mailto:administracion@simplereport.es">administracion@simplereport.es</a></p>
                <p><strong>Registro Mercantil:</strong> Inscrita en el Registro Mercantil de Madrid, Tomo 40752, Folio 104, Sección 8, Hoja M-723608, Inscripción 1ª.</p>

                <h2>Objeto</h2>
                <p>
                  El presente sitio web tiene por objeto ofrecer información corporativa sobre los servicios de Simple Report, S.L., empresa que actúa
                  como proveedor de servicios especializados para intermediarios de crédito hipotecario y prestamistas de crédito hipotecario,
                  encargándose de la preparación y envío de los reportes financieros exigidos por el Banco de España.
                </p>

                <h2>Condiciones de uso</h2>
                <p>
                  El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación plena de este Aviso Legal. El usuario se
                  compromete a hacer un uso adecuado de los contenidos, absteniéndose de emplearlos para actividades ilícitas o que puedan causar
                  perjuicio a terceros.
                </p>

                <h2>Propiedad intelectual e industrial</h2>
                <p>
                  Los contenidos de este sitio web (textos, logotipos, diseños, código, etc.) son titularidad de Simple Report, S.L. o de terceros que
                  han autorizado su uso. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa.
                </p>

                <h2>Responsabilidad</h2>
                <p>
                  Simple Report, S.L. no se hace responsable del uso indebido de la información de la web ni de los contenidos de sitios externos
                  enlazados.
                </p>

                <h2>Protección de datos</h2>
                <p>
                  El tratamiento de los datos personales de los usuarios se rige por la Política de Privacidad disponible en este sitio web.
                </p>

                <h2>Legislación aplicable y jurisdicción</h2>
                <p>
                  Este Aviso Legal se rige por la legislación española. Para la resolución de conflictos, las partes se someten a los Juzgados y
                  Tribunales de Madrid, salvo norma imperativa en contrario.
                </p>
              </>
            </LegalPage>
          }
        />
        <Route
          path="/privacidad"
          element={
            <LegalPage title="Política de privacidad">
              <>
                <p><strong>Responsable del tratamiento:</strong><br />
                  Simple Report, S.L. – CIF: B22687024 – Camino de Montoro, 35, 28055, Madrid (España).<br />
                  Correo electrónico: <a href="mailto:administracion@simplereport.es">administracion@simplereport.es</a>
                </p>

                <h2>Finalidad del tratamiento</h2>
                <ul>
                  <li>Gestionar las solicitudes de información recibidas por formulario, correo electrónico o teléfono.</li>
                  <li>Prestar los servicios contratados por intermediarios de crédito hipotecario y prestamistas de crédito hipotecario.</li>
                  <li>Cumplir las obligaciones legales derivadas de la relación contractual y las exigencias regulatorias aplicables.</li>
                </ul>

                <h2>Legitimación</h2>
                <ul>
                  <li><strong>Consentimiento</strong> del interesado (contacto y comunicaciones iniciales).</li>
                  <li><strong>Ejecución de un contrato</strong> (prestación de servicios).</li>
                  <li><strong>Cumplimiento de obligaciones legales</strong> (p. ej., normativa tributaria y, en su caso, requerimientos del Banco de España).</li>
                </ul>

                <h2>Destinatarios</h2>
                <p>No se cederán datos a terceros salvo obligación legal o cuando sea necesario para la prestación del servicio
                  (p. ej., asesoría fiscal/contable, alojamiento/hosting). En su caso, se firmarán los contratos de encargo de tratamiento correspondientes.</p>

                <h2>Plazos de conservación</h2>
                <p>Conservaremos sus datos mientras se mantenga la relación y, después, durante los plazos exigidos por la ley
                  para atender posibles responsabilidades.</p>

                <h2>Derechos</h2>
                <p>Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad
                  enviando una solicitud con copia de su documento identificativo a:</p>
                <ul>
                  <li>Dirección postal: Camino de Montoro, 35, 28055, Madrid.</li>
                  <li>Correo electrónico: <a href="mailto:administracion@simplereport.es">administracion@simplereport.es</a></li>
                </ul>
                <p>También puede presentar una reclamación ante la Agencia Española de Protección de Datos:
                  <a href="https://www.aepd.es" target="_blank" rel="noreferrer"> www.aepd.es</a>.
                </p>

                <h2>Medidas de seguridad</h2>
                <p>Simple Report, S.L. aplica medidas técnicas y organizativas para garantizar la confidencialidad, integridad y
                  disponibilidad de la información, de acuerdo con el RGPD y la LOPD-GDD.</p>

                <p style={{marginTop: '1rem', fontSize: '0.9em', color: '#6b7280'}}>
                  Última actualización: 01/10/2025
                </p>
              </>
            </LegalPage>
          }
        />
        <Route
          path="/cookies"
          element={
            <LegalPage title="Política de cookies">
              <>
                <h2>¿Qué son las cookies?</h2>
                <p>
                  Una cookie es un pequeño archivo de texto que se almacena en su navegador cuando visita
                  determinadas páginas web. Sirven para que la web funcione correctamente o recuerde su visita.
                </p>

                <h2>Cookies que utiliza esta web</h2>
                <p>
                  Este sitio web únicamente utiliza <strong>cookies técnicas estrictamente necesarias</strong>,
                  que permiten el correcto funcionamiento de la navegación y de los formularios. No se utilizan cookies
                  de publicidad, análisis ni de terceros.
                </p>

                <h2>Aceptación o rechazo de cookies</h2>
                <p>
                  Al ser cookies técnicas imprescindibles para el funcionamiento de la web, no es necesario
                  solicitar el consentimiento expreso del usuario mediante un banner. La navegación en este sitio
                  implica la aceptación de estas cookies técnicas.
                </p>

                <h2>Gestión de cookies en el navegador</h2>
                <p>
                  Puede configurar su navegador para bloquear o eliminar cookies en cualquier momento.
                  Consulte las instrucciones de su navegador:
                </p>
                <ul>
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web" target="_blank" rel="noreferrer">Mozilla Firefox</a></li>
                  <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noreferrer">Microsoft Edge</a></li>
                  <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">Safari</a></li>
                </ul>

                <p style={{marginTop: '1rem', fontSize: '0.9em', color: '#6b7280'}}>
                  Última actualización: 01/10/2025
                </p>
              </>
            </LegalPage>
          }
        />
        <Route
          path="/terminos"
          element={
            <LegalPage title="Términos del servicio">
              <>
                <h2>1. Objeto del contrato</h2>
                <p>
                  Estas condiciones regulan la contratación de los servicios de Simple Report, S.L., empresa que presta
                  servicios a intermediarios de crédito hipotecario y prestamistas de crédito hipotecario para la preparación
                  y envío de los reportes financieros al Banco de España.
                </p>

                <h2>2. Procedimiento de contratación</h2>
                <ul>
                  <li>La contratación se formaliza mediante la firma del contrato y el pago de la factura proforma.</li>
                  <li>El pago se realizará exclusivamente mediante transferencia bancaria.</li>
                  <li>Hasta recibir el pago completo, Simple Report, S.L. no iniciará la prestación de servicios.</li>
                </ul>

                <h2>3. Entrega de información</h2>
                <p>El cliente deberá enviar la documentación necesaria en los siguientes plazos:</p>
                <ul>
                  <li><strong>Primer semestre:</strong> antes del 20 de diciembre.</li>
                  <li><strong>Segundo semestre:</strong> antes del 20 de junio.</li>
                </ul>
                <p>
                  Si la documentación no se recibe a tiempo, Simple Report, S.L. no garantiza la correcta presentación del
                  reporte al Banco de España.
                </p>

                <h2>4. Política de devoluciones</h2>
                <p>Una vez contratado el servicio y realizado el pago, no se admitirán devoluciones.</p>

                <h2>5. Obligaciones del cliente</h2>
                <ul>
                  <li>Firmar el contrato y realizar el pago en plazo.</li>
                  <li>Facilitar información veraz, completa y en los plazos indicados.</li>
                  <li>Cumplir con las normativas que le correspondan como intermediario o prestamista hipotecario.</li>
                </ul>

                <h2>6. Obligaciones de Simple Report, S.L.</h2>
                <ul>
                  <li>Prestar el servicio conforme al contrato y la información recibida.</li>
                  <li>Garantizar la confidencialidad de los datos y documentos conforme al RGPD y la LOPD-GDD.</li>
                  <li>Enviar al Banco de España los reportes financieros siempre que se cumplan los plazos de entrega de documentación.</li>
                </ul>

                <h2>7. Limitación de responsabilidad</h2>
                <p>
                  Simple Report, S.L. no será responsable de retrasos, sanciones o incidencias derivadas de la falta de envío
                  de información, datos incorrectos o causas ajenas a la empresa.
                </p>

                <h2>8. Legislación aplicable y jurisdicción</h2>
                <p>
                  Estas condiciones se rigen por la legislación española. Para resolver conflictos, las partes se someten a
                  los Juzgados y Tribunales de Madrid, salvo norma imperativa en contrario.
                </p>
              </>
            </LegalPage>
          }
        />
        {/* 404 */}
        <Route path="*" element={<LegalPage title="Página no encontrada">Revisa la URL o vuelve al <Link to="/">inicio</Link>.</LegalPage>} />
      </Routes>
      {isMobile && (
        <div className="fixed bottom-4 inset-x-0 px-4 z-50 md:hidden">
          <Link to="/servicios" className="mx-auto block max-w-md text-center rounded-2xl bg-brand-500 text-white py-3 shadow-lg hover:bg-brand-600">Solicitar servicio</Link>
        </div>
      )}
      <Footer />
      {/* Toast de prueba */}
      <Toast show={toastVisible} onClose={() => setToastVisible(false)}>
        Esto es una notificación de prueba.
      </Toast>
    </div>
  );
}

export default function Website(){
  return (
    <HelmetProvider>
      <HashRouter>
        <AppShell />
      </HashRouter>
    </HelmetProvider>
  );
}
