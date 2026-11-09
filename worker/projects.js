// =====================================================================================
// Danloud Labs website: every creative project  ->  /projects  (also /creative-projects)
// The main page shows only the first few; new projects go at the end of SITE_PROJECTS.
// =====================================================================================

import { SITE_PROJECTS } from './site-data.js';
import { projectCard, sitePage } from './site-layout.js';

// Five projects keep the main page's 3 + 2 layout; any other count goes three per row.
const layout = SITE_PROJECTS.length === 5 ? '' : `
<style>
.projects.all .project, .projects.all .project:nth-child(4), .projects.all .project:nth-child(5) { grid-column: span 2; }
@media (max-width: 980px) { .projects.all .project, .projects.all .project:nth-child(4), .projects.all .project:nth-child(5) { grid-column: span 3; } }
@media (max-width: 640px) { .projects.all .project, .projects.all .project:nth-child(4), .projects.all .project:nth-child(5) { grid-column: 1 / -1; } }
</style>`;

const body = `
<main>
<section class="page-head">
    <div class="wrap">
        <span class="eyebrow">Creative Projects</span>
        <h1>Worlds we are building</h1>
        <p class="lead">Games, fan projects and original stories from the Danloud Labs universe.</p>
    </div>
</section>
<section style="padding-top:28px">
    <div class="wrap">
        <div class="projects all">${SITE_PROJECTS.map(projectCard).join('')}</div>
    </div>
</section>
</main>`;

export const htmlProjects = sitePage({
    title: 'Creative Projects · Danloud Labs',
    description: `Games, fan projects and original stories by Danloud Labs LLC: ${SITE_PROJECTS.map((p) => p.name).join(', ')}.`,
    path: '/projects',
    active: 'projects',
    back: { href: '/', label: 'Home' },
    head: layout,
    body,
});
