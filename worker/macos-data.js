// =====================================================================================
// Danloud Labs website: the macOS apps (content). Pages: worker/macos.js.
// Facts come from each app's source and README (CutOutStudio, AlphaCut, yt-converter).
// `download: ''` shows "Coming soon"; set it to the .dmg / store URL when the app is out.
// Art (assets/apps/): <slug>-icon.webp (1024 square), <slug>-banner.webp (16:9) and the
// screenshots apps/<slug>/<shot>.webp (Mac window, 16:10). `videos` maps a shot to a short .mp4 loop
// in the same folder, served through /media/… by macos.js (the .webp is its poster). List a screenshot in `ready` once its
// file is in assets/apps/<slug>/: only ready screenshots are shown, and the page adapts until then
// (banner in the hero window, text-only feature cards, no gallery).
// =====================================================================================

import { asset } from './site-data.js';

// While true, the pages carry <meta name="robots" content="noindex"> and nothing links to them.
export const MAC_DRAFT = true;

const A = (o) => ({
    ...o,
    href: `/macos/${o.slug}`,
    icon: asset(`apps/${o.slug}-icon.webp`),
    banner: asset(`apps/${o.slug}-banner.webp`),
    platforms: o.platforms || 'macOS',
});

export const MAC_APPS = [
    A({
        slug: 'cutout-studio', name: 'CutOut Studio', color: '#a855f7', c2: '#22d3ee', glow: 'rgba(168, 85, 247, 0.38)',
        subtitle: 'Offline background remover',
        short: 'AI background removal for single images or whole folders, 100% on your Mac. PNG or WebP.',
        platforms: 'macOS 14+ · Apple Silicon',
        download: '',
        ready: ['main', 'quality', 'editor', 'batch', 'edges', 'settings'],
        title: 'Remove any background.', hot: 'Keep every hair.',
        lead: 'CutOut Studio removes the background of your images right on your Mac: one at a time with brush touch-ups, or a whole folder in one click. No uploads, no accounts, no internet.',
        badges: ['100% offline', 'Apple Silicon', 'Batch folders', 'PNG & WebP'],
        stats: [['2', 'AI engines'], ['1 click', 'whole folders'], ['0', 'uploads'], ['PNG · WebP', 'with transparency'], ['P3', 'color kept']],
        hero: 'main',
        blocks: [
            {
                shot: 'quality', eyebrow: 'High Quality engine', title: 'Hair, fur and fine edges, done right.',
                text: 'The default engine is BiRefNet, one of the most accurate open background-removal models, running on your Mac. For quick jobs, switch to the Fast engine powered by Apple Vision.',
                list: ['High Quality: BiRefNet, for hair, fur and thin details', 'Fast: Apple Vision subject detection', 'Optional GPU and Neural Engine acceleration'],
            },
            {
                shot: 'editor', eyebrow: 'Single Image', title: 'Touch up any edge with a brush.',
                text: 'Open or drop an image and the background is gone. If the AI missed a spot, paint it away with Erase or bring it back with Restore, then export.',
                list: ['Erase and Restore brush with adjustable size', 'Undo (⌘Z) and reset to the automatic result', 'Preview over grid, white or black, zoom up to 400%', 'Compare with the original in one click'],
                flip: true,
            },
            {
                shot: 'batch', eyebrow: 'Batch Folder', title: 'A whole folder, in one click.',
                text: 'Drop a folder and every image in it gets its background removed. Each cut-out is saved in the same folder with the same name, and the originals move into an Originals folder, safe and untouched.',
                list: ['Live progress, with each thumbnail turning into its cut-out', 'Images that are already transparent can be skipped', 'Stop at any time and pick up where you left off', 'Show in Finder when it’s done'],
            },
            {
                shot: 'edges', eyebrow: 'Clean edges', title: 'No halo from the old background.',
                text: 'Along the edges, the old background’s color bleeds into the subject: the white fringe you see on dark backgrounds. CutOut Studio estimates that color and takes it back out, so the cut-out looks clean anywhere.',
                list: ['Edge color decontamination, on by default', 'Works with both engines', 'Keeps the photo’s own color space (Display P3, sRGB)'],
                flip: true,
            },
        ],
        features: [
            ['photo', 'Any image in', 'JPG, PNG, WebP, HEIC, TIFF and BMP, with their orientation fixed automatically.'],
            ['doc', 'PNG or WebP out', 'PNG with transparency, or WebP with adjustable quality or lossless.'],
            ['offline', 'Fully offline', 'Every image is processed on your Mac. Nothing is uploaded, ever.'],
            ['copy', 'Drag and drop', 'Drop an image on the editor or a folder on Batch to start.'],
            ['device', 'Native Mac app', 'Built in Swift and SwiftUI for Apple Silicon.'],
            ['wrench', 'Your settings', 'Engine, output format, originals folder name and more.'],
        ],
        shots: [['main', 'Single Image editor'], ['batch', 'Batch Folder'], ['quality', 'High Quality result'], ['settings', 'Settings']],
        requirements: ['macOS 14 Sonoma or later', 'Mac with Apple Silicon', 'About 1 GB of space (the AI model is inside the app)'],
        privacy: 'Your images never leave your Mac. CutOut Studio has no accounts, no analytics and needs no internet connection to work.',
    }),
    A({
        slug: 'alphacut', name: 'AlphaCut', color: '#22c55e', c2: '#38bdf8', glow: 'rgba(34, 197, 94, 0.35)',
        subtitle: 'Video background remover',
        short: 'Remove the background from videos and export real transparency: APNG, spritesheets, ProRes 4444, HEVC.',
        platforms: 'macOS 14+',
        download: '',
        ready: ['main', 'methods', 'methods-menu', 'edges', 'export', 'color', 'mask'],
        // Shots that play a short silent loop (assets/apps/alphacut/<file>.mp4); their .webp is the poster.
        videos: { main: 'main', methods: 'removal' },
        title: 'Cut the background', hot: 'out of any video.',
        lead: 'AlphaCut removes the background from your videos and exports them with real transparency: animated PNG, PNG sequences, game-ready spritesheets, ProRes 4444 and HEVC with alpha. Color grading and audio extraction included, all on your Mac.',
        badges: ['Real alpha', 'ProRes 4444', 'Spritesheets for Godot', 'Offline'],
        stats: [['4', 'removal methods'], ['6', 'export formats'], ['8', 'filter collections'], ['60 fps', 'animated PNG'], ['0', 'uploads']],
        hero: 'main',
        blocks: [
            {
                shot: 'methods', eyebrow: 'Four ways to remove a background', title: 'From green screen to no screen at all.',
                text: 'Key out a solid color, let AI find the subject or the person, or combine both: the AI protects the inside of your subject while the chroma key draws the fine edge.',
                list: ['Chroma key: red, green, blue or any color', 'AI subject detection, no colored background needed', 'AI person segmentation, hair included', 'Hybrid AI + chroma for the hardest shots'],
            },
            {
                shot: 'edges', eyebrow: 'Edge cleanup', title: 'No colored fringe around your subject.',
                text: 'AlphaCut attacks the three causes of a colored edge: mixed edge pixels, color spill on the subject and the hidden color under transparent pixels that game engines blend into a line.',
                list: ['Edge decontamination', 'Despill, optionally on the edge only', 'Fill the color under transparency', 'One-click preset, mask view and shrink edge'],
                flip: true,
            },
            {
                shot: 'export', eyebrow: 'Exports', title: 'Every format you need, in one pass.',
                text: 'Tick as many outputs as you want and AlphaCut renders them together, with scale, trim and frame-rate controls.',
                list: ['Animated PNG at exactly 60 fps, with optional metadata JSON', 'PNG sequence, and spritesheet + JSON for Godot', 'ProRes 4444 and HEVC with alpha (.mov)', 'WAV audio: 16, 24 or 32-bit float, 44.1 or 48 kHz'],
            },
            {
                shot: 'color', eyebrow: 'Filters and color', title: 'Grade the subject, keep the transparency.',
                text: 'Presets in eight collections, from modern and classic films to night and black and white, each previewed with your own frame. Filters apply to the cut-out subject in the preview, while playing and in every export.',
                list: ['Exposure, highlights, shadows, contrast, white balance', 'Saturation, vibrance, clarity, texture, film grain', 'Auto enhance, compare, and your own saved presets'],
                flip: true,
            },
        ],
        features: [
            ['eye', 'Smart background detection', 'One click reads the frame edges, picks the background color and sets the tolerance.'],
            ['camera', 'Pro playback', 'J, K, L shuttle, frame-by-frame, slow motion, 0.1× to 4× speed, loop and in/out.'],
            ['search', 'Pixel-level zoom', 'Pinch, ⌘ + scroll or the keyboard; sharp pixels from 200% to check every edge.'],
            ['wave', 'Audio extraction', 'Save the soundtrack as WAV, stereo or mono, at the original or a standard rate.'],
            ['offline', 'Fully offline', 'Chroma on all CPU cores, AI on the Neural Engine. Nothing is uploaded.'],
            ['device', 'Native Mac app', 'Built in Swift and SwiftUI.'],
        ],
        shots: [['main', 'Chroma key'], ['methods-menu', 'Four removal methods'], ['methods', 'Hybrid AI + chroma'], ['mask', 'Mask view'], ['color', 'Filters and color'], ['export', 'Exports'], ['edges', 'Edge cleanup']],
        requirements: ['macOS 14 Sonoma or later', 'Apple Silicon recommended for the AI modes'],
        privacy: 'Your videos are processed entirely on your Mac. AlphaCut has no accounts and sends nothing anywhere.',
    }),
    A({
        slug: 'yt-converter', name: 'YT Converter', color: '#ef4444', c2: '#f59e0b', glow: 'rgba(239, 68, 68, 0.35)',
        subtitle: 'Video to MP4, MP3 and MIDI',
        short: 'Paste a link and save it as MP4 video, MP3 audio, or MIDI transcribed by AI, instrument by instrument.',
        platforms: 'macOS',
        download: '',
        ready: [],
        title: 'From a link to', hot: 'MP4, MP3 or MIDI.',
        lead: 'Paste a video link and YT Converter saves it as an MP4 video, an MP3 audio file, or turns the music into MIDI you can open in your DAW. Everything is processed on your Mac and lands in your Downloads folder.',
        badges: ['MP4 · MP3 · MIDI', 'AI transcription', 'Saves to Downloads', 'ffmpeg included'],
        stats: [['3', 'formats'], ['3', 'instrument tracks'], ['1', 'combined MIDI'], ['192 kbps', 'MP3'], ['0', 'setup']],
        hero: 'main',
        blocks: [
            {
                shot: 'convert', eyebrow: 'MP4 and MP3', title: 'Paste, pick a format, done.',
                text: 'Choose MP4 for the video with its audio, or MP3 for the audio alone. YT Converter shows the progress and saves the file in your Downloads folder, ready to open.',
                list: ['MP4 video in the best available quality', 'MP3 audio at 192 kbps', 'Reveal the file in Finder when it’s ready'],
            },
            {
                shot: 'midi', eyebrow: 'MIDI', title: 'Turn a song into notes.',
                text: 'Without separation you get one MIDI file with every note it hears, perfect for a solo instrument. With instrument separation, the song is first split by AI into vocals, bass and the rest, and each part is transcribed on its own.',
                list: ['Vocals, bass and other instruments as separate MIDI files', 'All three tracks together in one file for your DAW', 'Separation by Demucs, transcription by Basic Pitch', 'A 4-minute song takes about 2 to 5 minutes'],
                flip: true,
            },
        ],
        features: [
            ['doc', 'Organized output', 'Separated MIDI goes into its own folder, named after the video.'],
            ['offline', 'Processed on your Mac', 'The AI separation and transcription run locally.'],
            ['wave', 'A starting point', 'Drums are not transcribed, and dense mixes may need some cleanup.'],
        ],
        shots: [['main', 'YT Converter'], ['midi', 'MIDI options']],
        requirements: ['macOS (Apple Silicon or Intel)', 'About 1 GB of space (AI models included)', 'An internet connection to fetch the video'],
        privacy: 'YT Converter has no accounts. The only connection it makes is to fetch the link you paste.',
        notice: 'Use YT Converter only with your own content, public-domain content, or content whose license allows downloading. Respect the terms of the sites you use it with.',
    }),
];

export const findMacApp = (slug) => MAC_APPS.find((a) => a.slug === slug);
