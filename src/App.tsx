import { useState, type FormEvent, type ReactNode } from 'react'

const phone = '7378301966'
const whatsappNumber = '917378301966'
const email = 'dhanashrichandramohan@gmail.com'
const addressPlaceholder = '[CURRENT BUSINESS ADDRESS TO BE CONFIRMED]'

const imageUrls = {
  hero: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85',
  table: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85',
  food: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85',
  gathering: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85',
  serving: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=85',
  dessert: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=85',
}

const services = [
  ['Wedding Catering', 'Thoughtful food service for your wedding day, planned around your celebration and guests.'],
  ['Reception Catering', 'A considered menu and service for welcoming family and friends at your reception.'],
  ['Engagement Catering', 'Catering arrangements for intimate engagements and joyful family gatherings.'],
  ['Birthday Catering', 'Flexible catering for birthdays and celebrations of every size.'],
  ['Corporate Catering', 'Catering for workplace gatherings, meetings and corporate occasions.'],
  ['Private Functions', 'Food and service for family functions, get-togethers and special moments.'],
  ['Traditional / Maharashtrian Catering', 'Traditional catering preferences can be discussed and tailored to your event.'],
  ['Custom Event Catering', 'Share your event details and requirements to discuss a suitable catering plan.'],
]

const menuCategories = [
  'Breakfast',
  'Starters & Snacks',
  'Main Course',
  'Rice & Biryani',
  'Maharashtrian Specialities',
  'Desserts',
  'Beverages',
]

const policies = {
  '/terms': {
    title: 'Terms & Conditions',
    intro: 'Please review these terms before confirming a catering service with New Dhanashri Catering & Events.',
    sections: [
      ['Enquiries and quotations', 'Event details, menu, guest count, service scope and quotation are confirmed directly with the business. A discussion or enquiry does not by itself confirm a booking.'],
      ['Booking and payment', 'A booking is confirmed only after the business and customer agree to the quotation and booking requirements. Payment instructions, including any Razorpay payment link, are shared by the business after confirmation. Do not send card details by email or WhatsApp.'],
      ['Event changes', 'Please contact the business directly to discuss any changes to event details or requirements. The agreed arrangements should be confirmed in writing.'],
      ['Business details to confirm', 'Add any additional booking terms, applicable taxes, advance requirements and other conditions here after owner confirmation.'],
    ],
  },
  '/privacy': {
    title: 'Privacy Policy',
    intro: 'This policy explains how enquiry information is handled when you contact New Dhanashri Catering & Events.',
    sections: [
      ['Information you provide', 'If you submit an enquiry, the details you enter are prepared in a WhatsApp message and sent only when you choose to continue in WhatsApp. You may also contact the business by phone or email.'],
      ['How information is used', 'Information shared with the business is used to respond to your enquiry, discuss event requirements and provide a quotation or service information.'],
      ['Payments', 'Payments are handled through a payment option provided by the business. This website does not collect or store card or payment credentials.'],
      ['Retention and contact', 'The business should confirm how long enquiry information is retained and how privacy requests can be made. Contact dhanashrichandramohan@gmail.com for privacy-related questions.'],
    ],
  },
  '/refund-cancellation': {
    title: 'Refund & Cancellation Policy',
    intro: 'Cancellation and refund terms must be agreed with the business for each confirmed event.',
    sections: [
      ['Before confirming', 'Please ask the business to confirm the applicable cancellation and refund terms before making a payment.'],
      ['Requesting a cancellation', 'Contact New Dhanashri Catering & Events directly using the phone number or email on this website and include your event details and payment reference.'],
      ['Owner confirmation required', 'The applicable cancellation notice period, refund eligibility, deductions (if any), processing time and contact procedure must be confirmed by the business before publication. No specific refund amount or timeline is promised on this page.'],
    ],
  },
  '/service-delivery': {
    title: 'Service Delivery Policy',
    intro: 'Catering is provided for the event as agreed between the customer and New Dhanashri Catering & Events.',
    sections: [
      ['Event arrangements', 'The event date, venue, guest count, menu, service timing and scope are discussed and confirmed directly with the business before the booking.'],
      ['Location', 'Service availability and event logistics depend on the venue and arrangements agreed with the business. Contact us to confirm service availability for your event location.'],
      ['Owner confirmation required', 'The business should confirm any delivery or setup scope, service hours, travel charges and other applicable operational terms in the event quotation.'],
    ],
  },
} as const

function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}

function Icon({ name, size = 18 }: { name: 'arrow' | 'phone' | 'whatsapp' | 'mail' | 'pin' | 'menu' | 'close'; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const }
  if (name === 'arrow') return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  if (name === 'phone') return <svg {...common}><path d="M21 16.4v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.7 2 2 0 0 1 3.1 1.5h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L7 9.5a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" /></svg>
  if (name === 'whatsapp') return <svg {...common}><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z" /><path d="M8.8 8.1c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.5.6c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.3.7-.2l1.6.8c.3.1.4.3.4.5 0 .4-.2 1.1-.7 1.5-.5.5-1.2.7-1.9.6-1.1-.2-2.4-.8-3.7-2-1.1-1-2-2.4-2.2-3.5-.2-.8 0-1.6.7-2.4Z" /></svg>
  if (name === 'mail') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
  if (name === 'pin') return <svg {...common}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
  if (name === 'close') return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>
  return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
}

function ButtonLink({ href, children, secondary = false, external = false }: { href: string; children: ReactNode; secondary?: boolean; external?: boolean }) {
  return <a className={`button ${secondary ? 'button-outline' : 'button-primary'}`} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>{children}</a>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [['About', '/#about'], ['Services', '/#services'], ['Menu', '/#menu'], ['Gallery', '/#gallery'], ['Contact', '/#contact']]
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/" className="brand" aria-label="New Dhanashri Catering & Events home">
          <span className="brand-mark">N<span>D</span></span>
          <span className="brand-name">New Dhanashri<small>Catering & Events</small></span>
        </a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
        </button>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {links.map(([label, href]) => <a key={label} onClick={() => setMenuOpen(false)} href={href}>{label}</a>)}
          <a className="nav-cta" onClick={() => setMenuOpen(false)} href="/#quote">Get a Quote <Icon name="arrow" size={16} /></a>
        </nav>
      </div>
    </header>
  )
}

function SectionHeading({ eyebrow, title, copy, centered = false }: { eyebrow: string; title: ReactNode; copy?: string; centered?: boolean }) {
  return <div className={`section-heading ${centered ? 'text-center' : ''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

function HomePage() {
  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const details = [
      'Hello New Dhanashri Catering & Events, I would like to request a quote.',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Email: ${data.get('email') || 'Not provided'}`,
      `Event type: ${data.get('eventType')}`,
      `Event date: ${data.get('eventDate') || 'Not provided'}`,
      `Event location: ${data.get('eventLocation') || 'Not provided'}`,
      `Number of guests: ${data.get('guests') || 'Not provided'}`,
      `Message: ${data.get('message') || 'Not provided'}`,
    ].join('\n')
    window.open(whatsappUrl(details), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <Header />
      <main>
        <section className="hero" id="home">
          <img className="hero-image" src={imageUrls.hero} alt="Warmly lit dining room prepared for a gathering; illustrative imagery" />
          <div className="hero-shade" />
          <div className="hero-content page-width">
            <span className="hero-kicker"><span /> CATERING & EVENTS · KOLHAPUR</span>
            <h1>Memorable Food.<br /><em>Beautiful</em> Celebrations.</h1>
            <p>Professional catering services for weddings, celebrations, corporate events and special occasions in Kolhapur.</p>
            <div className="hero-actions">
              <ButtonLink href="#quote">Get a Quote <Icon name="arrow" /></ButtonLink>
              <ButtonLink href={whatsappUrl('Hello New Dhanashri Catering & Events, I would like to enquire about your catering services.')} secondary external><Icon name="whatsapp" /> WhatsApp Us</ButtonLink>
            </div>
            <span className="hero-note">Thoughtful catering for moments worth gathering for.</span>
          </div>
          <div className="hero-side-label">NEW DHANASHRI · KOLHAPUR</div>
        </section>

        <section className="intro-section section-pad" id="about">
          <div className="page-width intro-grid">
            <div className="intro-image-wrap">
              <img src={imageUrls.table} alt="An elegantly arranged event table; illustrative imagery" loading="lazy" />
              <span className="image-caption">ILLUSTRATIVE EVENT IMAGERY</span>
              <div className="intro-stamp"><span>Made for</span><strong>gathering</strong><i>with care</i></div>
            </div>
            <div className="intro-copy">
              <SectionHeading eyebrow="A little about us" title={<>Good food brings<br /><em>people together.</em></>} />
              <p>New Dhanashri Catering & Events is a Kolhapur-based event catering business, helping hosts plan food service for celebrations and special occasions.</p>
              <p>Our business activity is event catering. We work with you to understand your occasion, guest count and preferences, then discuss a menu and service plan suited to your event.</p>
              <a href="/about" className="text-link">More about New Dhanashri <Icon name="arrow" /></a>
            </div>
          </div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="page-width">
            <SectionHeading eyebrow="What we cater" title={<>For every reason<br /><em>to celebrate.</em></>} copy="From family occasions to professional gatherings, let's plan the right catering for your event." />
            <div className="service-grid">
              {services.map(([title, description], index) => (
                <article className="service-card" key={title}>
                  <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <a href={`#quote`} aria-label={`Get a quote for ${title}`}>Get a Quote <Icon name="arrow" size={16} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="menu-section section-pad" id="menu">
          <div className="page-width menu-grid">
            <div className="menu-copy">
              <SectionHeading eyebrow="From the kitchen" title={<>A menu made<br /><em>for your occasion.</em></>} />
              <p>Our menu is customized according to your event, guest count and requirements. Contact us for the current menu and quotation.</p>
              <a className="button button-primary" href="#quote">Ask about the menu <Icon name="arrow" /></a>
            </div>
            <div className="menu-list">
              {menuCategories.map((category, index) => <div className="menu-row" key={category}><span>0{index + 1}</span><h3>{category}</h3><i>+</i></div>)}
              <small>Menu categories shown for enquiry purposes. Dishes and prices are confirmed directly with the business.</small>
            </div>
          </div>
        </section>

        <section className="gallery-section section-pad" id="gallery">
          <div className="page-width">
            <div className="gallery-top">
              <SectionHeading eyebrow="A sense of the occasion" title={<>Gather around<br /><em>something lovely.</em></>} />
              <p>These photographs are illustrative imagery, not photographs of New Dhanashri events.</p>
            </div>
            <div className="gallery-grid">
              {[imageUrls.food, imageUrls.gathering, imageUrls.serving, imageUrls.dessert].map((image, index) => (
                <figure className={`gallery-item gallery-item-${index + 1}`} key={image}>
                  <img src={image} alt={['A spread of prepared food; illustrative stock imagery', 'A celebration dining setup; illustrative stock imagery', 'Catering service setup; illustrative stock imagery', 'Dessert presentation; illustrative stock imagery'][index]} loading="lazy" />
                  <figcaption>Illustrative imagery</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="why-section section-pad">
          <div className="page-width why-grid">
            <div>
              <SectionHeading eyebrow="The way we work" title={<>Your occasion,<br /><em>thoughtfully planned.</em></>} />
              <p>Every event has its own rhythm. We begin by listening to what matters to you, then discuss a practical catering plan together.</p>
            </div>
            <div className="why-points">
              <article><span>01</span><div><h3>A conversation first</h3><p>Share your date, guest count and event requirements with us.</p></div></article>
              <article><span>02</span><div><h3>Menu to suit your event</h3><p>Discuss your preferences and ask us for the current menu options.</p></div></article>
              <article><span>03</span><div><h3>Clear arrangements</h3><p>Review your quotation and confirm service details with the business.</p></div></article>
            </div>
          </div>
        </section>

        <section className="quote-section section-pad" id="quote">
          <div className="page-width quote-grid">
            <div className="quote-intro">
              <SectionHeading eyebrow="Let's plan together" title={<>Tell us about<br /><em>your event.</em></>} />
              <p>Share a few details and your enquiry will open as a WhatsApp message. You can review it before sending.</p>
              <div className="quote-contact"><span>Prefer a conversation?</span><a href={`tel:${phone}`}><Icon name="phone" /> +91 {phone}</a></div>
            </div>
            <form className="quote-form" onSubmit={submitEnquiry}>
              <div className="form-grid">
                <label>Your name *<input name="name" type="text" autoComplete="name" required maxLength={100} placeholder="Name" /></label>
                <label>Phone number *<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required pattern="[0-9]{7,15}" maxLength={15} placeholder="Digits only, include country code" /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" /></label>
                <label>Event type *<select name="eventType" defaultValue="" required><option value="" disabled>Select an occasion</option>{services.map(([title]) => <option key={title}>{title}</option>)}</select></label>
                <label>Event date<input name="eventDate" type="date" /></label>
                <label>Event location<input name="eventLocation" type="text" maxLength={150} placeholder="Area or venue" /></label>
                <label>Number of guests<input name="guests" type="number" min="1" max="100000" placeholder="Approximate guest count" /></label>
                <label className="full-field">Anything else we should know?<textarea name="message" rows={3} maxLength={1000} placeholder="Tell us a little about your event..." /></label>
              </div>
              <button type="submit" className="button button-primary form-submit">Request a Quote <Icon name="arrow" /></button>
              <small>Your enquiry details will be included in a WhatsApp message. Nothing is saved on this website.</small>
            </form>
          </div>
        </section>

        <section className="payment-section section-pad">
          <div className="page-width payment-card">
            <div className="payment-icon"><span>₹</span></div>
            <div><span className="eyebrow">Simple & secure</span><h2>Booking payment, <em>made clear.</em></h2><p>Contact us to discuss your event. Once your quotation and booking are confirmed, the business will share the available payment option, including a Razorpay payment link where applicable.</p></div>
            <a className="button button-outline" href={whatsappUrl('Hello, my event quotation is confirmed. Please share the available booking advance payment option.')} target="_blank" rel="noreferrer">Pay Booking Advance <Icon name="arrow" /></a>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="page-width contact-grid">
            <div className="contact-main">
              <SectionHeading eyebrow="Get in touch" title={<>Let's make your<br /><em>gathering special.</em></>} />
              <p>Tell us about the occasion, and we'll be glad to discuss your catering requirements.</p>
              <div className="contact-actions">
                <a href={`tel:${phone}`}><Icon name="phone" /> Call us</a>
                <a href={whatsappUrl('Hello New Dhanashri Catering & Events, I would like to enquire about catering.')} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> WhatsApp</a>
                <a href={`mailto:${email}`}><Icon name="mail" /> Email us</a>
              </div>
            </div>
            <div className="contact-details">
              <span className="eyebrow">New Dhanashri Catering & Events</span>
              <a href={`tel:${phone}`}>+91 {phone}</a>
              <a href={`mailto:${email}`}>{email}</a>
              <span><Icon name="pin" /> Kolhapur, Maharashtra, India</span>
              <strong>{addressPlaceholder}</strong>
              <a className="map-link" href="https://maps.google.com/?q=Kolhapur%2C+Maharashtra%2C+India" target="_blank" rel="noreferrer">View Kolhapur on Google Maps <Icon name="arrow" size={16} /></a>
            </div>
          </div>
          <div className="page-width map-wrap">
            <iframe title="Google Maps view of Kolhapur, Maharashtra" src="https://maps.google.com/maps?q=Kolhapur%2C%20Maharashtra%2C%20India&t=&z=12&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <span>Map shows Kolhapur only; current business address to be confirmed.</span>
          </div>
        </section>

        <section className="closing-cta">
          <div className="page-width closing-inner"><span>GOOD FOOD. GOOD COMPANY.</span><h2>Let's bring everyone <em>to the table.</em></h2><a href="#quote">Start an enquiry <Icon name="arrow" /></a></div>
        </section>
      </main>
      <Footer />
      <div className="mobile-bar" aria-label="Quick contact">
        <a href={`tel:${phone}`}><Icon name="phone" size={17} />Call</a>
        <a href={whatsappUrl('Hello New Dhanashri Catering & Events, I would like to enquire.')} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={17} />WhatsApp</a>
        <a href="#quote"><Icon name="arrow" size={17} />Get Quote</a>
      </div>
    </>
  )
}

function AboutPage() {
  return <><Header /><main className="legal-page page-width"><span className="eyebrow">About the business</span><h1>New Dhanashri <em>Catering & Events</em></h1><p>New Dhanashri Catering & Events is an event catering business based in Kolhapur, Maharashtra. The business activity recorded for the enterprise is “Food and beverage service activities – Event catering.”</p><p>The enterprise registration/incorporation date recorded on the Udyam certificate is 12/10/2010.</p><p>We cater for weddings, receptions, engagements, birthdays, corporate events, private functions and other occasions. Event requirements, menu options and service arrangements are discussed with each customer and confirmed directly with the business.</p><ButtonLink href="/#quote">Discuss your event <Icon name="arrow" /></ButtonLink></main><Footer /></>
}

function PolicyPage({ title, intro, sections }: { title: string; intro: string; sections: readonly (readonly [string, string])[] }) {
  return <><Header /><main className="legal-page page-width"><span className="eyebrow">New Dhanashri Catering & Events</span><h1>{title}</h1><p>{intro}</p><div className="policy-content">{sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}</div><p className="policy-contact">Questions? Contact <a href={`mailto:${email}`}>{email}</a> or call <a href={`tel:${phone}`}>+91 {phone}</a>.</p><ButtonLink href="/#contact" secondary>Contact the business</ButtonLink></main><Footer /></>
}

function Footer() {
  const quickLinks = [['Home', '/'], ['About', '/about'], ['Services', '/#services'], ['Menu', '/#menu'], ['Gallery', '/#gallery'], ['Contact', '/#contact']]
  const policyLinks = [['Terms & Conditions', '/terms'], ['Privacy Policy', '/privacy'], ['Refund & Cancellation', '/refund-cancellation'], ['Service Delivery', '/service-delivery']]
  return <footer className="site-footer"><div className="page-width footer-grid">
    <div className="footer-brand"><a href="/" className="brand"><span className="brand-mark">N<span>D</span></span><span className="brand-name">New Dhanashri<small>Catering & Events</small></span></a><p>Professional catering for weddings, celebrations, corporate events and special occasions in Kolhapur.</p></div>
    <div><h3>Quick Links</h3>{quickLinks.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>
    <div><h3>Policies</h3>{policyLinks.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>
    <div className="footer-contact"><h3>Contact</h3><a href={`tel:${phone}`}>+91 {phone}</a><a href={`mailto:${email}`}>{email}</a><span>Kolhapur, Maharashtra</span><small>{addressPlaceholder}</small></div>
  </div><div className="page-width footer-bottom"><span>© 2026 New Dhanashri Catering & Events. All rights reserved.</span><span>Made for moments together.</span></div></footer>
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  if (path === '/about') return <AboutPage />
  const policy = policies[path as keyof typeof policies]
  if (policy) return <PolicyPage {...policy} />
  return <HomePage />
}
