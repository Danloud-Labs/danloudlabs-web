// ==========================================
// IMPORTACIONES MODULARES - DANLOUD LABS LLC
// Entry file of the Cloudflare Worker (named worker.js in the dashboard).
// ==========================================
import { htmlPrincipal } from './home.js';
import { htmlMyncha } from './myncha.js';
import { handleAmaphest } from './amaphest.js';          // Amaphest: principal, personajes y galería
import { handleMMX9 } from './mmx9.js';                  // Mega Man X9: principal, story, personajes, bosses, universe
import { htmlDarkWithinMe } from './darkwithinme.js';
import { htmlIOS } from './ios.js';
import { htmlAndroid } from './android.js';
import { htmlSoftware } from './software.js';

// Apps iOS, Utilidades y Gaming
import { htmlFedLog } from './fedlog.js';
import { handleAuraCalendar } from './aura-routes.js';   // AURA Calendar: página principal + 7 páginas de temas
import { htmlWarDecks } from './wardecks.js';
import { htmlHazMat } from './hazmat.js';

// Soporte, Privacidad y Herramientas Pro
import { htmlSupport } from './support.js';
import { htmlPrivacy } from './privacy.js';       // <-- REQUERIDO
import { htmlFFTII } from './fftii.js';
import { htmlLeaveTracker } from './leave-tracker.js';

export default {
async fetch(request) {
const url = new URL(request.url);
const path = url.pathname;
// Encabezado estándar para renderizado HTML en Cloudflare Workers
const headers = { 'content-type': 'text/html;charset=UTF-8' };

// ==========================================
// AURA CALENDAR (/ios/aura-calendar, /ios/aura-calendar/themes/<tipo>, /aura-calendar, /aura)
// ==========================================
const aura = await handleAuraCalendar(request);
if (aura) return aura;

// ==========================================
// AMAPHEST (/amaphest-amalion-progenitor, /characters, /characters/<personaje>, /gallery, /amaphest)
// ==========================================
const ama = await handleAmaphest(request);
if (ama) return ama;

// ==========================================
// MEGA MAN X9 (/mmx9-beastwars-fm, /story, /characters, /characters/<personaje>, /mavericks, /weapons, /universe, /mmx9)
// ==========================================
const mmx = await handleMMX9(request);
if (mmx) return mmx;

// ==========================================
// ENRUTADORES
// ==========================================
// Proyectos Creativos, Videojuegos y Trailers
if (path === '/dark-within-me-la-sua-origine') return new Response(htmlDarkWithinMe, { headers });
if (path === '/myncha-vampires-of-exius') return new Response(htmlMyncha, { headers });
if (path === '/fftii') return new Response(htmlFFTII, { headers }); 
// Categorías Principales
if (path === '/ios-apps' || path === '/ios') return new Response(htmlIOS, { headers });
if (path === '/android-apps' || path === '/android') return new Response(htmlAndroid, { headers });
if (path === '/software-tools' || path === '/software') return new Response(htmlSoftware, { headers });

// Sub-páginas de iOS / Apps Dedicadas
if (path === '/ios/fedlog' || path === '/fedlog') return new Response(htmlFedLog, { headers });
if (path === '/ios/wardecks' || path === '/wardecks') return new Response(htmlWarDecks, { headers });
if (path === '/ios/hazmat-scanner' || path === '/hazmat' || path === '/hazmat-scanner') return new Response(htmlHazMat, { headers });

// Soporte, Privacidad y Herramientas
if (path === '/privacy' || path === '/privacy-policy' || path === '/privacy/hazmat') return new Response(htmlPrivacy, { headers }); // <-- REQUERIDO
if (path === '/support') return new Response(htmlSupport, { headers });
if (path === '/leavetracker' || path === '/leave-tracker') return new Response(htmlLeaveTracker, { headers });

// ==========================================
// PÁGINA DE INICIO (Por defecto)
// ==========================================
return new Response(htmlPrincipal, { headers });
}
};
