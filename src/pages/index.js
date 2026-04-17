"use client";

import { useState, useEffect, useRef } from "react";
import OptInForm from '../components/form/opt-in-form';
import Faqs from '../components/faqs';
import Image from 'next/image';
import { info } from '../../info';
import fbEvent from '../services/fbEvents';

// Hook para scroll reveal
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.unobserve(el); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const CtaButton = ({origin}) => (
  <div className="reading-container my-12 z-20">
    <div>

      <a
        href={`https://wa.me/${info.whatsapp.value}?text=${info.whatsapp.message}`}
        className="button !w-full"
        target="_blank"
        onClick={() => fbEvent('Contact')}
      >
        Solicita precio de distribuidor
      </a>
      <p className="ft-1 mt-4 text-center text-neutral-400">
        ¿Tienes una refaccionaria o tour de ATV? Solicita precios de distribuidor {' '}
        <a href="/#contact" className="link">da click aquí</a>
      </p>
    </div>
  </div>
);

// SVG check reutilizable
const Check = () => (
  <svg className="w-8 h-8 fill-brand-1 flex-shrink-0 mt-0.5" viewBox="0 0 20 20">
    <path d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.59l7.3-7.3a1 1 0 011.4 0z" />
  </svg>
);

export function Hero() {
  return (
    <section className="bg-brand-black py-40 relative overflow-hidden">
      {/* glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 120% at 50% 0%, rgba(245, 196, 0, .25) 0%, transparent 100%)",
        }}
      />

      <div className="container relative text-center">

        <div className="inline-block font-display font-semibold uppercase tracking-widest -ft-1 text-brand-1 bg-brand-1/10 border border-brand-1/30 px-8 py-3 rounded mb-8">
          Programa de distribuidores B2B
        </div>

        <h1 className="font-display font-black uppercase text-neutral-50 ft-10 max-w-4xl mx-auto mb-6 leading-[0.8]">
          El proveedor de llantas ATV y UTV que
          {' '}
          <span className="text-brand-1">no te deja parado</span>
        </h1>

        <p className="ft-1 text-neutral-200 mx-auto mb-10 leading-relaxed">
          Precio fijo de distribuidor desde la primera pieza.<br />
          Respuesta garantizada en menos de 24 horas.<br />
          Para tours de ATV y refaccionarias que no pueden darse el lujo de esperar.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <a
            href="#contacto"
            className="font-display font-bold uppercase tracking-wide ft-0 bg-brand-1 text-neutral-black px-8 py-4 rounded hover:bg-brand-1-dark transition-colors"
          >
            Solicitar precio de distribuidor
          </a>
          <a
            href="#oferta"
            className="font-display font-semibold uppercase tracking-wide ft-0 border border-brand-500 text-neutral-100 px-8 py-4 rounded hover:border-brand-200 transition-colors"
          >
            Beneficios
          </a>
        </div>

        <p className="-ft1 text-neutral-400">
          Sin volumen mínimo · Sin contrato · Sin rodeos
        </p>

      </div>
    </section>
  );
}

export function ProofStrip() {
  return (
    <div className="bg-brand-2 border-y-2 border-neutral-100">
      <div className="container py-8">
        <div className="flex flex-wrap gap-x-10 gap-y-4 justify-center items-center">

          <div className="flex items-center gap-2.5">
            <svg className="w-8 h-8 fill-brand-1 flex-shrink-0" viewBox="0 0 20 20">
              <path d="M10 1l2.5 5 5.5.8-4 3.9.9 5.5L10 13.5l-4.9 2.7.9-5.5-4-3.9 5.5-.8z" />
            </svg>
            <span className="-ft-2 text-neutral-200">Importador directo, sin intermediarios</span>
          </div>

          <div className="flex items-center gap-2.5">
            <svg className="w-8 h-8 fill-brand-1 flex-shrink-0" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm.75 8.75H6.5a.75.75 0 010-1.5h3.5V5.75a.75.75 0 011.5 0v4.25a.75.75 0 01-.75.75z" />
            </svg>
            <span className="-ft-2 text-neutral-200">
              Respuesta <strong className="text-neutral-50 font-semibold">&lt;24h</strong> garantizada
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <svg className="w-8 h-8 fill-brand-1 flex-shrink-0" viewBox="0 0 20 20">
              <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.54 5.46l-4.25 4.25-2.83-2.83 1.06-1.06 1.77 1.77 3.19-3.19 1.06 1.06z" />
            </svg>
            <span className="-ft-2 text-neutral-200">
              Precio fijo <strong className="text-neutral-50 font-semibold">sin mínimo</strong> de piezas
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <svg className="w-8 h-8 flex-shrink-0 text-brand-1" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
            <span className="-ft-2 text-neutral-200">
              Cobertura <strong className="text-neutral-50 font-semibold">nacional</strong>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export function Problema() {
  const headerRef = useReveal();
  const gridRef = useReveal();

  const cards = [
    {
      icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />,
      title: "Sin stock cuando urge",
      body: "El proveedor confirma disponibilidad y a los 3 días te dice que no tiene. Tu operación se para.",
    },
    {
      icon: <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z" />,
      title: "Precios que cambian",
      body: "Cotizas una semana y cuando vas a pagar el precio ya subió. Sin previo aviso, sin explicación.",
    },
    {
      icon: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" />,
      title: "Volúmenes imposibles",
      body: "Te piden mínimo de 10, 20 o 50 piezas para darte precio. Tu flujo de caja no funciona así.",
    },
    {
      icon: <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />,
      title: "Atención que desaparece",
      body: "Después de pagar, nadie contesta. No sabes dónde está tu pedido ni cuándo llega.",
    },
  ];

  return (
    <section className="py-24 border-b border-neutral-700">
      <div className="container">

        <div ref={headerRef} className="reveal max-w-3xl">
          <p className="font-display font-semibold uppercase tracking-widest -ft-2 text-brand-1 mb-4">
            El problema que ya conoces
          </p>
          <h2 className="font-display font-black uppercase text-neutral-50 ft-7 mb-5 leading-none">
            Proveedores que fallan cuando más los necesitas
          </h2>
          <p className="ft-1 text-neutral-200 leading-relaxed mb-16">
            Si tienes un tour de ATV o una refaccionaria, sabes que el proveedor equivocado te cuesta clientes, tiempo y dinero.
          </p>
        </div>

        <div ref={gridRef} className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ icon, title, body }) => (
            <div key={title} className="bg-brand-800 border border-brand-600 rounded-lg p-7">
              <svg className="w-16 h-16 fill-brand-1 mb-5" viewBox="0 0 24 24">{icon}</svg>
              <h3 className="font-display font-bold uppercase text-neutral-50 ft-2 mb-2">{title}</h3>
              <p className="text-neutral-200 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function Catalogo() {
  const [catalogoItem, setCatalogoItem] = useState('UTV');

  const catalogo = {
    banner: {
      title: 'Nuestros Top Sellers',
      description: null,
    },
    content: {
      paragraph:
        'Llantas diseñadas para la topografía real de México. Funcionan en rutas recreativas, uso intensivo y competencias profesionales.',
      items: [
        {
          title: 'UTV',
          items: [
            {
              title: 'Speed RS',
              img: '1-3.avif',
              description: `8 capas<br/>Profundidad de banda: 15mm`,
            },
            {
              title: 'Speed PRO',
              img: '1-1.avif',
              description: `8 capas<br/>Profundidad de banda: 15mm`,
            },
            {
              title: 'Speed Master',
              img: '1-2.avif',
              description: `10 capas<br/>Profundidad de banda: 15mm`,
            },
            {
              title: 'Banda',
              img: '1-4.png ',
              description: `XTreme Performance<br/>Banda para UTV`,
            },
          ],
        },
        {
          title: 'ATV',
          items: [
            {
              title: 'Total XT',
              img: '0-2.avif',
              description: `6 capas<br/>Profundidad de banda: 15mm`,
            },
            {
              title: 'Master XR',
              img: '0-1.avif',
              description: `6 capas<br/>Profundidad de banda: 20mm`,
            },
          ],
        },
      ],
    },
    cta: {
      main: 'Solicita tu precio de distribuidor',
      secondary:
        'Importador directo en México. Cotización personalizada según medida. Envíos nacionales.',
    },
  }

  return (
    <section id="catalogo" className="py-20 border-y">
      <h2 className="ft-10 text-center text-neutral-100 mb-8">{catalogo.banner.title}</h2>
      <div className="px-16 my-20">
        <div
          className="flex gap-4 justify-center bg-brand-1 rounded-3xl p-4 overflow-x-scroll">
          {catalogo.content.items.map((i) =>
            <div
              onClick={() => setCatalogoItem(i.title)}
              className="relative h-[6rem] flex-grow items-center justify-center cursor-pointer"
            >
              <p
                className="absolute top-[1.5rem] inset-x-0 text-center ft-8 serif font-bold tracking-wide z-40">{i.title}</p>
              <div
                className={`${i.title !== catalogoItem && 'hidden'} absolute inset-0 bg-white/30 rounded-2xl shadow-md`}/>
            </div>,
          )}
        </div>

        <div className="mt-8 mx-8 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8 items-stretch">
          {catalogo.content.items.find((i) => i.title === catalogoItem)
            .items.map(item =>
              <div className="relative flex flex-col w-full">

                <div className="relative w-full aspect-square overflow-hidden">
                  <Image src={`/landing/catalogo/${item.img}`} layout="fill" objectFit="contain"/>
                </div>

                <div className="relative flex flex-col">
                  <h3 className="ft-9 text-neutral-100 text-center">{item.title}</h3>
                  <p className="ft-2 text-neutral-100 text-center" dangerouslySetInnerHTML={{__html: item.description}}/>
                </div>

              </div>,
            )}
        </div>
      </div>

      <CtaButton origin="catalogo"/>
    </section>
  )
}

const checkItems = {
  tours: [
    "Precio fijo de distribuidor desde 1 pieza",
    "Respuesta garantizada en menos de 24 horas",
    "Envío el mismo día si cierras antes del mediodía",
    "Seguimiento de pedido en tiempo real",
    "Asesor de cuenta asignado — no un bot, una persona",
    "Llantas ATV/UTV diseñadas para topografía mexicana",
  ],
  refaccionarias: [
    "Precio de importador directo — sin markups de intermediario",
    "Compra bajo demanda, sin sobreinventario",
    "Respuesta garantizada en menos de 24 horas",
    "Cotización clara sin cargos ocultos ni sorpresas",
    "Relación de largo plazo — el mismo trato desde el primer pedido",
    "Envío nacional, catálogo ATV y UTV disponible",
  ],
};

export function Oferta() {
  const headerRef = useReveal();
  const cardsRef = useReveal();

  return (
    <section id="oferta" className="py-24 border-b border-brand-700">
      <div className="container">

        <div ref={headerRef} className="reveal max-w-3xl">
          <p className="font-display font-semibold uppercase tracking-widest -ft-2 text-brand-1 mb-4">
            Lo que ofrecemos
          </p>
          <h2 className="font-display font-black uppercase text-neutral-50 ft-7 mb-5 leading-none">
            Un programa pensado para que tu negocio no pare
          </h2>
          <p className="ft-1 text-neutral-200 leading-relaxed mb-16">
            Dos perfiles, una sola promesa: certeza en abasto, precio y entrega.
          </p>
        </div>

        <div ref={cardsRef} className="reveal grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Tours */}
          <div className="bg-brand-800 border-2 border-brand-1 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-8 bg-brand-1/20 border-b border-brand-1">
              <h3 className="font-display font-black uppercase text-neutral-50 ft-4">Tours &amp; Operadores</h3>
              <span className="font-display font-bold uppercase -ft-4 bg-brand-1 text-neutral-black px-3 py-1 rounded">
                Más solicitado
              </span>
            </div>
            <div className="px-7 py-7">
              <p className="ft-1 text-neutral-200 leading-relaxed mb-6">
                Para negocios que necesitan llantas disponibles antes de que sus vehículos fallen, no después.
              </p>
              <ul className="space-y-3.5">
                {checkItems.tours.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check />
                    <span className="text-neutral-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Refaccionarias */}
          <div className="bg-brand-800 border border-brand-600 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-8 border-b border-brand-600">
              <h3 className="font-display font-black uppercase text-neutral-50 ft-2">Refaccionarias</h3>
              <span className="font-display font-bold uppercase -ft-4 border border-brand-500 text-neutral-200 px-3 py-1 rounded">
                Ideal para reventa
              </span>
            </div>
            <div className="px-7 py-7">
              <p className="ft-1 text-neutral-200 leading-relaxed mb-6">
                Para comercios que necesitan margen real, reposición rápida y un proveedor que no les genere problemas.
              </p>
              <ul className="space-y-3.5">
                {checkItems.refaccionarias.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check />
                    <span className="text-neutral-100">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
      <CtaButton origin="oferta"/>
    </section>
  );
}

const steps = [
  {
    n: "1",
    title: "Llenas el formulario",
    body: "Nos dices qué tipo de negocio tienes, en qué estado estás y qué medidas necesitas normalmente. No te pedimos más de lo necesario.",
  },
  {
    n: "2",
    title: "Te contactamos en menos de 24h",
    body: "Un asesor real te escribe por WhatsApp con tu precio de distribuidor personalizado. Sin esperas, sin bots.",
  },
  {
    n: "3",
    title: "Haces tu primer pedido",
    body: "Desde una pieza. Sin presión de volumen. Prueba el proceso con un pedido chico y compruébalo tú mismo.",
  },
  {
    n: "4",
    title: "Recibes y reordenas cuando necesitas",
    body: "Tu negocio sigue operando. Nos aseguramos de que el producto esté cuando tú lo necesites, no cuando a nosotros nos convenga.",
  },
];

export function Proceso() {
  const headerRef = useReveal();
  const stepsRef = useReveal();

  return (
    <section className="py-24 border-b border-brand-700">
      <div className="container">

        <div ref={headerRef} className="reveal max-w-3xl">
          <p className="font-display font-semibold uppercase tracking-widest -ft-2 text-brand-1 mb-4">
            Cómo funciona
          </p>
          <h2 className="font-display font-black uppercase text-neutral-50 ft-7 mb-5 leading-none">
            De la solicitud a la llanta en tu negocio
          </h2>
          <p className="ft-1 text-neutral-200 leading-relaxed mb-16">
            Sin formularios complicados, sin esperar días.
          </p>
        </div>

        <div ref={stepsRef} className="reveal relative">
          <div className="absolute left-10 top-10 bottom-10 w-px bg-neutral-700 hidden sm:block" />
          <div>
            {steps.map(({ n, title, body }, i) => (
              <div
                key={n}
                className={`flex gap-8 py-8 border-t border-neutral-700 ${i === steps.length - 1 ? " border-b" : ""}`}
              >
                <div className="w-20 h-20 rounded-full bg-brand-1 border border-brand-500 flex items-center justify-center flex-shrink-0 z-10">
                  <span className="font-display font-black text-brand-2 ft-1">{n}</span>
                </div>
                <div className="pt-4 max-w-2xl">
                  <h3 className="font-display font-bold uppercase text-neutral-50 ft-4 mb-1.5">{title}</h3>
                  <p className="text-neutral-200 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <CtaButton origin="proceso"/>
    </section>
  );
}

const targets = [
  {
    icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />,
    title: "Tours & Operadores ATV/UTV",
    body: "Tienes vehículos en operación continua y no puedes parar por falta de un insumo tan básico como las llantas. Cada día sin operar es dinero perdido.",
    items: [
      "Tus llantas se desgastan rápido por uso intensivo",
      "Necesitas un proveedor que resuelva rápido, no que prometa",
      "No tienes tiempo de andar comparando precios cada vez",
      "Quieres un solo número al que llamar cuando urge",
    ],
  },
  {
    icon: <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />,
    title: "Refaccionarias y Comercios",
    body: "Vendes o cambias llantas ATV/UTV y necesitas un proveedor confiable con precio que te deje margen real sin obligarte a comprar en grandes volúmenes.",
    items: [
      "Tu proveedor actual es inconsistente en tiempos o precios",
      "Te piden mínimos que no van con tu flujo de caja",
      "Quieres producto de calidad que no te genere devoluciones",
      "Buscas una relación estable, no solo una cotización de emergencia",
    ],
  },
];

export function Target() {
  const headerRef = useReveal();
  const cardsRef = useReveal();

  return (
    <section className="py-24 border-b border-brand-700">
      <div className="container">

        <div ref={headerRef} className="reveal max-w-3xl mb-16">
          <p className="font-display font-semibold uppercase tracking-widest -ft-2 text-brand-1 mb-4">
            ¿Es para ti?
          </p>
          <h2 className="font-display font-black uppercase text-neutral-50 ft-7 mb-5 leading-none">
            Diseñado para negocios que no pueden fallar
          </h2>
        </div>

        <div ref={cardsRef} className="reveal grid grid-cols-1 md:grid-cols-2 gap-5">
          {targets.map(({ icon, title, body, items }) => (
            <div key={title} className="bg-brand-1/20 border border-brand-600 rounded-lg p-8">
              <svg className="w-16 h-16 fill-brand-1 mb-6" viewBox="0 0 24 24">{icon}</svg>
              <h3 className="font-display font-bold uppercase text-neutral-50 ft-4 mb-3">{title}</h3>
              <p className="ft-1 text-neutral-200 leading-relaxed mb-6">{body}</p>
              <ul className="space-y-3 border-t border-neutral-500 py-8">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-brand-1 flex-shrink-0 mt-4" />
                    <span className="ft-1 text-neutral-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
      <CtaButton origin="target"/>
    </section>
  );
}

const faqs = [
  {
    q: "¿De verdad no hay mínimo de piezas?",
    a: "Así es. Puedes hacer tu primer pedido desde una sola llanta y recibir precio de distribuidor. El precio mejora si compras más, pero no te penalizamos por comprar menos.",
  },
  {
    q: "¿Cómo garantizan la respuesta en menos de 24 horas?",
    a: "Cada solicitud entra directamente a nuestro equipo. Un asesor específico queda asignado a tu cuenta desde el primer contacto y es el responsable de responderte. No es un chatbot, es una persona.",
  },
  {
    q: "¿Hacen envíos a todo México?",
    a: "Sí, a cualquier estado. El costo de envío se calcula según tu ubicación y cantidad, y se incluye en la cotización desde el inicio. Si cierras antes del mediodía, el pedido sale ese mismo día.",
  },
  {
    q: "¿Por qué el precio es más bajo que otras marcas?",
    a: "Somos importadores directos. No hay intermediarios que marquen precio en el camino. Pagas por la llanta, no por el logo ni por campañas de publicidad masiva.",
  },
  {
    q: "No conozco la marca, ¿cómo sé que la calidad es buena?",
    a: "Nuestros patrones se desarrollaron a partir de estudios en diferentes regiones de México, no son llantas genéricas de catálogo internacional. Si tienes dudas, haz un primer pedido pequeño y pruébalo antes de comprometer más volumen.",
  },
  {
    q: "¿Necesito firmar un contrato de distribución?",
    a: "No. Sin contratos ni compromisos de volumen. La relación se construye pedido a pedido, basada en que nosotros cumplamos y tú quieras seguir comprando.",
  },
];

export function Faq() {
  const headerRef = useReveal();
  const listRef = useReveal();

  return (
    <section className="py-24 border-b border-neutral-700">
      <div className="container">

        <div ref={headerRef} className="reveal max-w-2xl">
          <p className="font-display font-semibold uppercase tracking-widest -ft-1 text-brand-1 mb-3">
            Preguntas frecuentes
          </p>
          <h2 className="font-display font-black uppercase text-neutral-50 ft-8 mb-16 leading-none">
            Lo que siempre nos preguntan
          </h2>
        </div>

        <div ref={listRef} className="reveal">
          <Faqs questions={faqs} />
        </div>

      </div>
    </section>
  );
}

const estados = [
  "Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas","Chihuahua",
  "Ciudad de México","Coahuila","Colima","Durango","Guanajuato","Guerrero","Hidalgo","Jalisco",
  "Estado de México","Michoacán","Morelos","Nayarit","Nuevo León","Oaxaca","Puebla","Querétaro",
  "Quintana Roo","San Luis Potosí","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala",
  "Veracruz","Yucatán","Zacatecas",
];

const inputClass =
  "bg-brand-black border border-brand-600 rounded text-neutral-50 -ft-2 px-4 py-3 w-full outline-none focus:border-brand-1 transition-colors placeholder:text-neutral-500";
const labelClass =
  "font-display font-semibold uppercase tracking-widest -ft-4 text-neutral-300";

export function Contacto() {
  const pitchRef = useReveal();
  const formRef = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields] = useState({ nombre: "", negocio: "", tipo: "", estado: "", whatsapp: "", notas: "" });
  const [errors, setErrors] = useState({});

  const required = ["nombre", "negocio", "tipo", "estado", "whatsapp"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    required.forEach((k) => { if (!fields[k].trim()) newErrors[k] = true; });
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setSubmitted(true);
  };

  const field = (k) => ({
    value: fields[k],
    onChange: (e) => { setFields((p) => ({ ...p, [k]: e.target.value })); setErrors((p) => ({ ...p, [k]: false })); },
    className: `${inputClass}${errors[k] ? " !border-red-500" : ""}`,
  });

  return (
    <section id="contacto" className="py-24 bg-brand-900 border-b border-brand-700">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Pitch */}
          <div ref={pitchRef} className="reveal">
            <p className="font-display font-semibold uppercase tracking-widest -ft-1 text-brand-1 mb-3">
              Solicitud de distribución
            </p>
            <h2 className="font-display font-black uppercase text-neutral-50 ft-8 leading-none mb-6">
              Empieza con un pedido
            </h2>
            <p className="ft-1 text-neutral-200 leading-relaxed mb-8">
              Llena el formulario, recibe tu precio de distribuidor en menos de 24 horas y haz tu primer pedido desde una pieza.
            </p>
            <ul className="space-y-4">
              {[
                "Precio fijo de distribuidor desde el primer pedido",
                "Respuesta garantizada en menos de 24 horas",
                "Sin volumen mínimo · Sin contrato",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check />
                  <span className="ft-0 text-neutral-100">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form card */}
          <div ref={formRef} className="reveal bg-brand-800 border border-brand-600 rounded-xl p-8">
            <h3 className="font-display font-black uppercase text-neutral-50 ft-2 mb-7">
              Solicita tu precio de distribuidor
            </h3>

            <OptInForm />
          </div>

        </div>
      </div>
    </section>
  );
}

export default function Distribuidor() {
  return (
    <div className="bg-brand-4">
      <Hero />
      <ProofStrip />
      <Problema />
      <Catalogo />
      <Oferta />
      <Proceso />
      <Target />
      <Faq />
      <Contacto />
    </div>
  );
}