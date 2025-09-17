import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of routes to pre-render
const routes = [
    '/',
    '/hizmet-bolgeleri',
    '/blog'
];

// Add service area routes
import { SERVICE_AREAS } from '../src/constants/index.js';
import { BLOG_POSTS } from '../src/data/blogPosts.js';
import { createServiceAreaSlug, createServiceSlug } from '../src/utils/index.js';

SERVICE_AREAS.forEach(area => {
    routes.push(`/hizmet-bolgeleri/${createServiceAreaSlug(area.name)}`);

    area.services.forEach(service => {
        routes.push(`/hizmet-bolgeleri/${createServiceSlug(area.name, service)}`);
    });
});

// Add blog post routes
BLOG_POSTS.forEach(post => {
    routes.push(`/blog/${post.slug}`);
});

console.log('Pre-rendering routes for SEO...');
console.log('Routes to pre-render:', routes.length);

// Get actual asset file names from dist directory
const getAssetFiles = () => {
    const assetsDir = path.join(__dirname, '../dist/assets');
    const files = fs.readdirSync(assetsDir);

    const jsFile = files.find(file => file.endsWith('.js') && file.startsWith('index-'));
    const cssFile = files.find(file => file.endsWith('.css') && file.startsWith('index-'));

    return {
        js: jsFile ? `/assets/${jsFile}` : '/assets/index.js',
        css: cssFile ? `/assets/${cssFile}` : '/assets/index.css'
    };
};

const assets = getAssetFiles();

// Create a simple HTML file for each route
const createPrerenderedHTML = (route, title, description) => {
    const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.adenmanagement.com${route}">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <script type="module" crossorigin src="${assets.js}"></script>
  <link rel="stylesheet" href="${assets.css}">
  
  <!-- Preload critical resources -->
  <link rel="preload" href="${assets.js}" as="script">
  <link rel="preload" href="${assets.css}" as="style">
  
  <!-- Add structured data for better SEO -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${title}",
    "description": "${description}",
    "url": "https://www.adenmanagement.com${route}",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Aden Grup",
      "url": "https://www.adenmanagement.com"
    }
  }
  </script>
</head>
<body>
  <div id="root">
    <!-- Fallback content for search engines -->
    <div style="padding: 20px; text-align: center;">
      <h1>${title}</h1>
      <p>${description}</p>
      <p>Sayfa yükleniyor...</p>
    </div>
  </div>
  
  <!-- Fallback script for when JS fails -->
  <script>
    // If JS doesn't load, show a message
    setTimeout(() => {
      const root = document.getElementById('root');
      if (root && root.children.length === 1) {
        root.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>JavaScript gerekli</h1><p>Bu sayfa JavaScript gerektirir. Lütfen JavaScript\'i etkinleştirin.</p></div>';
      }
    }, 3000);
  </script>
</body>
</html>`;

    return html;
};

// Generate HTML files for each route
const generatePrerenderedFiles = () => {
    routes.forEach(route => {
        let title = 'Aden Grup - Site Yönetimi ve Temizlik Hizmetleri';
        let description = 'İzmir\'de site yönetimi, temizlik hizmetleri, personel temini ve peyzaj hizmetleri. Profesyonel ekibimizle 2021\'den beri hizmet veriyoruz.';

        // Customize title and description based on route
        if (route === '/hizmet-bolgeleri') {
            title = 'Hizmet Bölgeleri | Aden Grup';
            description = 'Ege bölgesinde hizmet verdiğimiz bölgelerin listesi. Torbalı, İzmir merkez ve diğer bölgelerde sunduğumuz hizmetleri keşfedin.';
        } else if (route === '/blog') {
            title = 'Blog - Temizlik ve Yönetim Hizmetleri | Aden Grup';
            description = 'İzmir ve Torbalı\'da temizlik hizmetleri, site yönetimi ve personel temini hakkında güncel bilgiler, ipuçları ve uzman görüşleri.';
        } else if (route.startsWith('/hizmet-bolgeleri/')) {
            const slug = route.split('/').pop();
            const area = SERVICE_AREAS.find(a => createServiceAreaSlug(a.name) === slug);
            if (area) {
                title = `${area.name} Hizmetleri | Aden Grup`;
                description = `${area.name} bölgesinde site yönetimi, temizlik ve personel temini gibi hizmetler. Hızlı dönüş ve profesyonel ekip.`;
            }
        } else if (route.startsWith('/blog/')) {
            const slug = route.split('/').pop();
            const post = BLOG_POSTS.find(p => p.slug === slug);
            if (post) {
                title = post.seoTitle || post.title;
                description = post.seoDescription || post.excerpt;
            }
        }

        const html = createPrerenderedHTML(route, title, description);

        // Create directory if it doesn't exist
        const filePath = path.join(__dirname, '../dist', route);
        const dir = path.dirname(filePath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Write the HTML file
        fs.writeFileSync(filePath + '.html', html);
        console.log(`Generated: ${route}.html`);
    });
};

// Run the pre-rendering
generatePrerenderedFiles();
console.log('Pre-rendering completed!');
