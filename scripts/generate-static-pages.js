import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import your data
import { SERVICE_AREAS } from '../src/constants/index.js';
import { BLOG_POSTS } from '../src/data/blogPosts.js';
import { createServiceAreaSlug, createServiceSlug } from '../src/utils/index.js';

// Base HTML template
const getBaseHTML = (title, description, canonical) => `<!DOCTYPE html>
<html lang="tr">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-N7NGR6L6MP"></script>
  <script>
    if (window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1' &&
      !window.location.hostname.includes('dev') &&
      window.location.protocol !== 'file:') {
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-N7NGR6L6MP');
    }
  </script>

  <!-- Microsoft Clarity -->
  <script type="text/javascript">
    if (window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1' &&
      !window.location.hostname.includes('dev') &&
      window.location.protocol !== 'file:') {
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", "t76eakwymz");
    }
  </script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <script type="module" crossorigin src="/assets/index-bc23db22.js"></script>
  <link rel="stylesheet" href="/assets/index-eb1cb09b.css">
</head>
<body>
  <div id="root"></div>
</body>
</html>`;

// Generate service areas list page
const generateServiceAreasListPage = () => {
    const title = "Hizmet Bölgeleri | Aden Grup";
    const description = "Ege bölgesinde hizmet verdiğimiz bölgelerin listesi. Torbalı, İzmir merkez ve diğer bölgelerde sunduğumuz hizmetleri keşfedin.";
    const canonical = "https://www.adenmanagement.com/hizmet-bolgeleri";

    const html = getBaseHTML(title, description, canonical);

    const dir = path.join(__dirname, '../dist/hizmet-bolgeleri');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log('Generated: /hizmet-bolgeleri/index.html');
};

// Generate individual service area pages
const generateServiceAreaPages = () => {
    SERVICE_AREAS.forEach(area => {
        const slug = createServiceAreaSlug(area.name);
        const title = `${area.name} Hizmetleri | Aden Grup`;
        const description = `${area.name} bölgesinde site yönetimi, temizlik ve personel temini gibi hizmetler. Hızlı dönüş ve profesyonel ekip.`;
        const canonical = `https://www.adenmanagement.com/hizmet-bolgeleri/${slug}`;

        const html = getBaseHTML(title, description, canonical);

        const dir = path.join(__dirname, `../dist/hizmet-bolgeleri/${slug}`);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(path.join(dir, 'index.html'), html);
        console.log(`Generated: /hizmet-bolgeleri/${slug}/index.html`);

        // Generate service pages for each area
        area.services.forEach(service => {
            const serviceSlug = createServiceSlug(area.name, service);
            const serviceTitle = `${area.name} - ${service} | Aden Grup`;
            const serviceDescription = `${area.name} bölgesinde ${service.toLowerCase()} sunuyoruz. Uygun fiyat, profesyonel ekip.`;
            const serviceCanonical = `https://www.adenmanagement.com/hizmet-bolgeleri/${serviceSlug}`;

            const serviceHtml = getBaseHTML(serviceTitle, serviceDescription, serviceCanonical);

            const serviceDir = path.join(__dirname, `../dist/hizmet-bolgeleri/${serviceSlug}`);
            if (!fs.existsSync(serviceDir)) {
                fs.mkdirSync(serviceDir, { recursive: true });
            }

            fs.writeFileSync(path.join(serviceDir, 'index.html'), serviceHtml);
            console.log(`Generated: /hizmet-bolgeleri/${serviceSlug}/index.html`);
        });
    });
};

// Generate blog list page
const generateBlogPage = () => {
    const title = "Blog - Temizlik ve Yönetim Hizmetleri | Aden Grup";
    const description = "İzmir ve Torbalı'da temizlik hizmetleri, site yönetimi ve personel temini hakkında güncel bilgiler, ipuçları ve uzman görüşleri.";
    const canonical = "https://www.adenmanagement.com/blog";

    const html = getBaseHTML(title, description, canonical);

    const dir = path.join(__dirname, '../dist/blog');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log('Generated: /blog/index.html');
};

// Generate individual blog post pages
const generateBlogPostPages = () => {
    BLOG_POSTS.forEach(post => {
        const title = post.seoTitle || post.title;
        const description = post.seoDescription || post.excerpt;
        const canonical = `https://www.adenmanagement.com/blog/${post.slug}`;

        const html = getBaseHTML(title, description, canonical);

        const dir = path.join(__dirname, `../dist/blog/${post.slug}`);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(path.join(dir, 'index.html'), html);
        console.log(`Generated: /blog/${post.slug}/index.html`);
    });
};

// Main execution
const generateStaticPages = () => {
    console.log('Generating static pages for SEO...');

    generateServiceAreasListPage();
    generateServiceAreaPages();
    generateBlogPage();
    generateBlogPostPages();

    console.log('Static page generation completed!');
};

generateStaticPages();
