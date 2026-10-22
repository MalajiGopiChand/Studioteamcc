# Studioteamcc

React + Vite portfolio. Run `npm install`, then `npm run dev`. `npm run build` creates dist. Import into Vercel as a Vite project; vercel.json handles SPA routes.

## Content
Edit src/data/content.js for portfolio collections, service copy, contact links, and films. All 36 supplied photographs are in public/images as optimized WebP files. Original supplied photographs remain in imgs. Both original logos are preserved in public/images.

The descriptive story titles are editorial collection labels, not verified couple identities. Add approved names, dates, locations, team biographies and reviews when supplied. No reviews or team identities have been invented. Service images illustrate the studio aesthetic and are not proof of every service category.

## Films
The Films page uses native HTML video players only. It does not embed Instagram, show social cards, or present photographs as playable films. Entries without an actual source stay hidden; until video files are supplied, an availability message is shown.

Add authorized MP4/WebM/M4V files to public/videos. Name each file after its reel ID (for example DUa78s1jIjX.mp4) to match exactly. Other filenames are assigned to remaining entries in sorted order; confirm this mapping before publication. npm run dev and npm run build automatically regenerate src/data/local-films.json. You can alternatively set each film src in src/data/content.js to a stable authorized direct video URL. Set orientation to landscape for horizontal films; optional poster and captions fields are supported.

Players autoplay muted while visible, pause offscreen or when the tab is hidden, provide native playback/fullscreen controls, respect manual pause and reduced motion, and show a dark error message on failed media. Real-film playback cannot be verified until original files are provided. Instagram URLs remain content references only.

## SEO
Page titles and descriptions update on navigation. Add your final public domain to sitemap.xml, Open Graph URLs and canonical tags before custom-domain launch. The supplied deployment is private by default. Contact enquiries open WhatsApp with URL-encoded form values; users send the message from WhatsApp.
