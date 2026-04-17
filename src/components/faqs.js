import { useState } from 'react';

export default function Faqs({questions}) {
  const [faqOpen, setFaqOpen] = useState(0);

  return (
    <section className='py-12'>
      <div className='container'>
        {questions.map((q, i) =>
          <div key={`faq-${i}`} className="w-full shadow-sm mb-2">
            <p
              id={i}
              className={`ft-2 w-full p-4 font-bold bg-neutral-100 mb-0 cursor-pointer rounded-lg border border-gray-200`}
              onClick={(e) => setFaqOpen(e.target.id)}
            >
              <span className="font-bold mr-4 text-brand-1">›</span>{q.q}
            </p>
            <p className={`ft-1 ${faqOpen == i ? 'flex' : 'hidden'} bg-brand-1/20 text-neutral-100 mt-2 rounded-lg p-12`}>
              {q.a}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}