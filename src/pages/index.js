import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { info } from '../../info';
import { content } from '../../content';

import OptInForm from '../components/form/opt-in-form';
import Link from 'next/link';
import Blockbuster from '../components/blockbuster';
import Faqs from '../components/faqs';
import scrollDepth from '../utils/scrollDepth';
import { gtagSendEvent } from '../services/fbEvents';
import { Select } from '../components/form/formAtoms';

export default function Index({lead, utm}) {
  const [lastClick, setLastClick] = useState('');
  const [catalogoItem, setCatalogoItem] = useState('ATV');
  console.log('ITEM', catalogoItem);

  useEffect(() => {
    scrollDepth({
      values: [25, 50, 75, 100],
      callback: (value) => fbq('trackCustom', `Scroll Depth: ${value}`),
    });
  });

  const goToContact = (origin) => {
    setLastClick(origin);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  const {hero, beneficios, alianzas, niveles, atributos, catalogo, garantias, testimonios, faqs, cta} = content;

  const CtaButton = (origin) => (
    <div className="reading-container">
      <div>
        <Link href="#contact">
          <a onClick={() => goToContact(origin)} className="button !w-full">{hero.cta.main}</a>
        </Link>
        <p className="-ft-1 text-center mt-6" dangerouslySetInnerHTML={{__html: hero.cta.secondary}}/>
      </div>
    </div>
  );

  return (
    <>
      {/* HERO */}
      <section
        className="relative lg:aspect-[12/5] w-full flex flex-col md:justify-end items-center bg-brand-1 overflow-hidden border-b">
        <div className="relative aspect-[3/2] lg:aspect-[12/5] w-full md:absolute top-0 inset-x-0 lg:bottom-0">
          <div
            className="hidden md:block w-full h-[12rem] pt-[80%] bottom-0 absolute bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"/>
          <div
            className="hidden md:block w-full h-[12rem] pt-[80%] bottom-0 left-0 absolute bg-gradient-to-r from-black/60 to-transparent z-10"/>

          <Image src="/landing/rip-texture-yellow.avif" layout="fill"
                 className="bottom-0 object-contain object-bottom z-20 md:z-0"/>
          <Image src="/landing/hero.avif" layout="fill" className="object-cover object-center"/>
        </div>

        <div className="container md:text-white mx-auto z-20 mt-12">
          <h1
            className="lg:w-2/3 mx-auto relative ft-10 leading-none text-center md:[text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)]"
            dangerouslySetInnerHTML={{__html: hero.banner.title}}
          />
          <p
            className="ft-4 lg:w-2/3 mx-auto relative text-center mt-8 md:[text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)]"
            dangerouslySetInnerHTML={{__html: hero.banner.description}}
          />
        </div>

        <CtaButton origin="hero"/>

      </section>


      {catalogo != null &&
        <>
          <section id="catalogo" className="mt-20">
            <h2 className="ft-10 text-center mb-8">{catalogo.banner.title}</h2>
            <div className="px-16">
              <div
                className="flex gap-4 justify-center bg-brand-1 rounded-3xl p-4 overflow-x-scroll">
                {catalogo.content.items.map((i) =>
                  <div
                    onClick={() => setCatalogoItem(i.title)}
                    className="relative flex-grow cursor-pointer"
                  >
                    <div
                      className={`${i.title !== catalogoItem && 'hidden'} absolute inset-0 bg-white/30 rounded-2xl shadow-md`}/>
                    <p className="font-bold text-center tracking-wide px-8 py-4">{i.title}</p>
                  </div>,
                )}
              </div>

              <div className="mt-8 mx-8 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8 items-stretch">
                {catalogo.content.items.find((i) => i.title === catalogoItem)
                  .items.map(item =>
                    <div className="relative flex flex-col w-full gap-4">
                      <div>
                        <div className="relative w-full aspect-square overflow-hidden">
                          <Image src={`/landing/catalogo/${item.img}`} layout="fill" objectFit="contain"/>
                        </div>
                        <h3 className="ft-9 text-center mt-4">{item.title}</h3>
                      </div>
                    </div>,
                  )}
              </div>
            </div>

            <CtaButton origin="catalogo"/>
          </section>
        </>
      }

      {/* BENEFICIOS */}
      <section id="beneficios">
        <Blockbuster
          overhead="Beneficios"
          background={`bg-[url('/landing/beneficios.JPG')]`}
          title={beneficios.banner.title}
          description={beneficios.banner.description}
        />
        <div className="px-16 mb-20">
          <p className="reading-container ft-2" dangerouslySetInnerHTML={{__html: beneficios.content?.paragraph}}/>
          <div className="container grid md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
            {beneficios.content.items.map((i, idx) =>
              <div
                id={`beneficio-${idx}`}
                className="relative flex flex-col gap-8 w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-100">

                <div className="p-20">
                  <h3 className="ft-6 font-semibold flex-grow">{i.title}</h3>
                  <p className="ft-1 mt-8" dangerouslySetInnerHTML={{__html: i.description}}/>
                </div>

              </div>,
            )}
          </div>
        </div>

        <CtaButton origin="beneficios"/>
      </section>


      {alianzas &&
        <>
          <Blockbuster
            overhead="Alianzas"
            background={`bg-[url('/landing/garantias.jpg')]`}
            title={garantias.banner.title}
            description={garantias.banner.description}
          />
          <section className="container py-20">
            <h3 className="my-12 text-center">Algunos de nuestros clientes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
              {alianzas.clientes.map(({img, label}) =>
                <div className="w-full">
                  <div className="relative aspect-[2/1]">
                    <Image src={`/landing/logos/${img}.png`} layout="fill" objectFit="contain"/>
                  </div>
                </div>,
              )}
            </div>
            <hr/>
            <h3 className="my-12 text-center">Algunos de nuestros proveedores</h3>
            <div className="grid md:grid-cols-5">
              <div className="md:col-start-2 md:col-span-3 grid grid-cols-3 gap-20">
                {alianzas.proveedores.map(({img, label}, i) =>
                  <div className="w-full">
                    <div className="relative aspect-[2/1]">
                      <Image src={`/landing/logos/${img}.png`} layout="fill" objectFit="contain"/>
                    </div>
                  </div>,
                )}
              </div>
            </div>

            <CtaButton origin="alianzas"/>
          </section>
        </>
      }

      {/* ATRIBUTOS */}
      <section id="atributos">
        <Blockbuster
          overhead="Atributos"
          background={`bg-[url('/landing/atributos.JPG')]`}
          title={atributos.banner.title}
          description={atributos.banner.description}
        />
        <div className="my-20">
          <div className="container flex flex-col gap-16 items-stretch">
            {atributos.content.items.map((i, idx) =>
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-brand-2">
                <div className="flex flex-col justify-center lg:p-20">
                  <h3 className="ft-8 font-semibold max-w-[20ch] !mb-0">{i.title}</h3>
                  <p className="ft-2 !mt-0">{i.description}</p>
                </div>
                <div className="relative aspect-video">
                  <div className="absolute inset-0 aspect-video overflow-hidden z-10">
                    <Image src={`/landing/${i.img}`} layout="fill" objectFit="cover"/>
                  </div>
                </div>
              </div>,
            )}
          </div>
        </div>

        <CtaButton origin="atributos"/>
      </section>

      {/* TESTIMONIOS */}
      {/*<section id="testimonios">*/}
      {/*  <Blockbuster*/}
      {/*    overhead="Testimonios"*/}
      {/*    background={`bg-[url('/landing/testimonios.JPG')]`}*/}
      {/*    title={testimonios.banner.title}*/}
      {/*    description={testimonios.banner.description}*/}
      {/*  />*/}
      {/*  <div className="container my-20">*/}
      {/*    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">*/}
      {/*      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) =>*/}
      {/*        <div className="relative flex aspect-[3/4]">*/}
      {/*          <Image src={`/landing/testimonios/testimonio0` + i + `.png`} layout="fill"/>*/}
      {/*        </div>,*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  <CtaButton origin="testimonios"/>*/}
      {/*</section>*/}

      {/* FAQS */}
      <section id="faqs">
        <Blockbuster
          overhead="FAQs"
          background={`bg-[url('/landing/faqs.JPG')]`}
          title={faqs.banner.title}
          description={faqs.banner.description}
        />
        <div className="container mt-20">
          <Faqs questions={faqs.content.items}/>
        </div>

        <div className="reading-container">
          <h3 className="text-center">{faqs.cta.main}</h3>
        </div>
      </section>

      <div
        className="sticky inset-x-0 bottom-4 mb-12 px-8 z-[99]">
        <div className="flex justify-center">
          <a
            onClick={() => goToContact('float')}
            target="_blank"
            className="ft-3 button cursor-pointer hover:bg-brand-5 !mt-0 !py-6 !px-16 !rounded-full shadow-lg !tracking-normal"
          >
            <span className="filter invert mr-4"><Image src="/whatsapp.svg" width={24} height={24}/></span>
            Habla con nosotros
          </a>
        </div>
      </div>

      {/* GARANTIAS */}
      {garantias != null &&
        <Blockbuster
          overhead="Garantías"
          background={`bg-[url('/landing/garantias.jpg')] bg-bottom`}
          title={garantias.banner.title}
          description={garantias.banner.description}
        />
        // <section id="garantias">
        //   <div className="container my-20">
        //     <div className="grid md:grid-cols-3 gap-12 items-stretch">
        //       {garantias.content.items.map((i, idx) =>
        //         <div
        //           className="relative text-center w-full flex flex-col flex-grow p-12 border-2 rounded-lg shadow-md">
        //           <h3>{i?.title}</h3>
        //           <p>{i?.description}</p>
        //         </div>,
        //       )}
        //     </div>
        //   </div>
        //   <div className="reading-container mt-20">
        //     <h3 className="text-center">{garantias.cta.main}</h3>
        //     <Link href="#contact">
        //       <a onClick={() => goToContact('garantias')} className="button !w-full mb-4">Mándanos un Whatsapp</a>
        //     </Link>
        //     <p className="-ft-1">{hero.cta.second}</p>
        //   </div>
        // </section>
      }

      {/* CONTACT */}
      <section
        id="contact"
        className="border-t-2 border-brand-1 bg-white bg-center bg-cover py-20 z-[99999]"
      >
        <div className="container">
          <div className="w-full md:w-1/2 mx-auto">
            <h2 className="!font-bold text-neutral-900">
              {cta.banner.title}
            </h2>
            <div className="my-12">
              <p className="ft-1 text-neutral-900" dangerouslySetInnerHTML={{__html: cta.banner.description}}/>
            </div>
            <OptInForm
              lastClick={lastClick}
              utm={utm}
            />
          </div>
        </div>
      </section>
    </>
  );

}

export async function getServerSideProps(ctx) {
  const {req, query} = ctx;
  const cookiesHeader = req.headers.cookie || '';

  const keys = ['utm', '_fbc', '_fbp', 'lead'];
  const cookies = {};

  for (const key of keys) {
    const raw = cookiesHeader
      .split('; ')
      .find(c => c.startsWith(`${key}=`))
      ?.split('=')[1];

    if (!raw) continue;

    try {
      const clean = raw.startsWith('j%3A') ? raw.slice(4) : raw;
      cookies[key] = JSON.parse(decodeURIComponent(clean));
    } catch {
      cookies[key] = decodeURIComponent(raw);
    }
  }

  // --- Revisar params UTM del query ---
  const utmFromQuery = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    if (query[param]) utmFromQuery[param] = query[param];
  });

  // Si hay params en la URL, se usan; si no, cae en cookie
  const utm =
    Object.keys(utmFromQuery).length > 0
      ? utmFromQuery
      : cookies.utm ?? null;

  const {lead} = cookies;

  return {
    props: {
      lead: {
        fullName: lead?.fullName ?? '',
        phone: lead?.phone ?? '',
        whatsapp: lead?.whatsapp ?? '',
        sheetRow: lead?.sheetRow ?? '',
      },
      utm,
    },
  };
}