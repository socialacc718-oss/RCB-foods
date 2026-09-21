import { motion } from 'motion/react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const GoogleMapsLocation = () => {
  const MAPS_URL = 'https://maps.app.goo.gl/38RQk5hn9TQazAPf9';
  const EMBED_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.7177727142013!2d73.13689!3d33.56068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfebbe0509a203%3A0xb30ee68dbdeca5ef!2sPWD%20Main%20Rd%2C%20Islamabad!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s';

  const DELIVERY_AREAS = [
    'PWD Housing Society (Block A, B, C)',
    'Police Foundation (Sector O-9)',
    'Media Town, Islamabad',
    'Pakistan Town (Phase 1 & 2)',
    'Soan Gardens & River Garden',
    'CBR Town, Islamabad',
    'Bahria Town Phase 1, 2, 3, 4',
    'Doctor Town & Korang Town',
  ];

  return (
    <section id="location-section" className="py-16 sm:py-24 bg-stone-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Visit Us or Order Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            Find RCB FOODS in Islamabad
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-2">
            Located conveniently at Malik Usman Plaza on Main PWD Road, Islamabad. Savor live barbecue, hot broast, and fresh juices till 3 AM.
          </p>
        </div>

        {/* 2-Column Content: Info Left, Map Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Card Left */}
          <div className="lg:col-span-5 bg-stone-800/90 rounded-3xl border border-stone-700/80 p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-sm">
            <div className="space-y-6">
              {/* Address Block */}
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Official Branch Address
                </span>
                <div className="flex items-start gap-3 mt-1.5">
                  <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0 text-red-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      Shop # 3, Malik Usman Plaza
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm mt-0.5">
                      Near Bank of Punjab, Block-A, Main PWD Road, Islamabad, Pakistan
                    </p>
                  </div>
                </div>
              </div>

              {/* Owner / Hotline Numbers */}
              <div className="pt-4 border-t border-stone-700/60">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Direct Owner & Order Hotline
                </span>
                <div className="space-y-2 mt-2">
                  <a
                    href="tel:03021959609"
                    className="flex items-center gap-3 p-3 rounded-xl bg-stone-700/50 hover:bg-stone-700 text-stone-100 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-stone-400">Primary Phone & WhatsApp</div>
                      <div className="text-base font-black text-white font-mono">0302-1959609</div>
                    </div>
                  </a>

                  <a
                    href="tel:03156987822"
                    className="flex items-center gap-3 p-3 rounded-xl bg-stone-700/50 hover:bg-stone-700 text-stone-100 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-stone-400">Secondary Hotline</div>
                      <div className="text-base font-black text-white font-mono">0315-6987822</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="pt-4 border-t border-stone-700/60 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-stone-400">Hours of Operation</div>
                  <div className="text-sm font-bold text-white">
                    12:00 PM – 03:00 AM <span className="text-emerald-400 text-xs font-semibold">(Open 7 Days a Week)</span>
                  </div>
                </div>
              </div>

              {/* Delivery Coverage Badges */}
              <div className="pt-4 border-t border-stone-700/60">
                <div className="text-xs font-bold text-stone-300 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Prompt Home Delivery Coverage:</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-stone-300">
                  {DELIVERY_AREAS.map((area) => (
                    <div key={area} className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Google Maps Action Buttons */}
            <div className="mt-8 pt-4 border-t border-stone-700/60 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href="https://wa.me/923021959609?text=Assalam%20o%20Alaikum!%20Please%20share%20your%20exact%20live%20location%20pin."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Get WhatsApp Pin</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Right */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-stone-700/80 shadow-2xl relative min-h-[380px] bg-stone-800">
            {/* Embed iframe */}
            <iframe
              title="RCB FOODS Main PWD Road Islamabad Location"
              src={EMBED_SRC}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-105"
            />

            {/* Overlay link card on map */}
            <div className="absolute top-4 right-4 bg-stone-900/90 backdrop-blur-md border border-stone-700 p-3 rounded-2xl shadow-xl max-w-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <span>RCB FOODS Islamabad</span>
              </div>
              <p className="text-[11px] text-stone-300 mb-2">
                Malik Usman Plaza, Block-A Main PWD Road. Click below to launch navigation.
              </p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Navigate via Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
