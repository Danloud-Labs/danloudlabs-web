// ==========================================
// IMPORTACIONES MODULARES - DANLOUD LABS LLC
// Entry file of the Cloudflare Worker (named worker.js in the dashboard).
// ==========================================
import { htmlPrincipal } from './home.js';
import { handleMyncha } from './myncha.js';
import { handleMacOS } from './macos.js';             // macOS apps (/macos-apps, /macos/<app>)           // Myncha: Vampires of Exius (story, characters, curse, Exius, bestiary…)
import { handleAmaphest } from './amaphest.js';          // Amaphest: principal, personajes y galería
import { handleMMX9 } from './mmx9.js';                  // Mega Man X9: principal, story, personajes, bosses, universe
import { handleDarkWithinMe } from './dwm.js';           // Dark Within Me: principal y story (4 libros)
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
import { handleFFT2 } from './fft2.js';                  // Final Fantasy Tactics II (fan-made)
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
// DARK WITHIN ME (/dark-within-me-la-sua-origine, /story, /dark-within-me, /dwm)
// ==========================================
const dwm = await handleDarkWithinMe(request);
if (dwm) return dwm;

// ==========================================
// FINAL FANTASY TACTICS II (/fftii, /story, /characters, /world, /relics, /jobs, /locations, /soundtrack, /fft2)
// ==========================================
const fft = await handleFFT2(request);
if (fft) return fft;

// ==========================================
// MYNCHA: VAMPIRES OF EXIUS (/myncha-vampires-of-exius, /story, /characters, /curse, /exius, /bestiary, /locations, /soundtrack)
// ==========================================
const myncha = await handleMyncha(request);
if (myncha) return myncha;

// ==========================================
// MACOS APPS (/macos-apps, /macos/cutout-studio, /macos/upres-studio, /macos/wavesmith-studio, /macos/alphacut, /macos/yt-converter)
// ==========================================
const macos = await handleMacOS(request);
if (macos) return macos;

// ==========================================
// ENRUTADORES
// ==========================================
// Proyectos Creativos, Videojuegos y Trailers
// Categorías Principales
if (path === '/ios-apps' || path === '/ios') return new Response(htmlIOS, { headers });
if (path === '/android-apps' || path === '/android') return new Response(htmlAndroid, { headers });
if (path === '/software-tools' || path === '/software') return Response.redirect(`${url.origin}/macos-apps`, 301); // Software & Tools are the macOS apps now

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
