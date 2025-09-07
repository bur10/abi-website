// Slug utility functions for Turkish text
export const createSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

// Clean service name for use in sentences (removes "Hizmetleri" suffix to avoid redundancy)
export const cleanServiceNameForSentence = (serviceName) => {
    return serviceName.replace(/\s+hizmetleri$/i, '').toLowerCase();
};

// Clean service name for use at the beginning of sentences (removes "Hizmetleri" and capitalizes first letter)
export const cleanServiceNameForSentenceStart = (serviceName) => {
    const cleaned = serviceName.replace(/\s+hizmetleri$/i, '');
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
};

// Generate service area slug (e.g., "Torbalı ve Çevreleri" -> "torbali-ve-cevreleri-hizmetler")
export const createServiceAreaSlug = (areaName) => {
    const baseSlug = createSlug(areaName);
    return `${baseSlug}-hizmetler`;
};

// Generate service slug within an area (e.g., "Temizlik Hizmetleri" -> "torbali-ve-cevreleri-temizlik-hizmetleri")
export const createServiceSlug = (areaName, serviceName) => {
    const areaSlug = createSlug(areaName);
    const serviceSlug = createSlug(serviceName);
    return `${areaSlug}-${serviceSlug}`;
};

// Generate breadcrumb data
export const generateBreadcrumbs = (areaName, serviceName = null) => {
    const breadcrumbs = [
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Hizmet Bölgeleri', path: '/hizmet-bolgeleri' }
    ];

    if (areaName) {
        breadcrumbs.push({
            name: areaName,
            path: `/hizmet-bolgeleri/${createServiceAreaSlug(areaName)}`
        });
    }

    if (serviceName) {
        breadcrumbs.push({
            name: serviceName,
            path: `/hizmet-bolgeleri/${createServiceSlug(areaName, serviceName)}`
        });
    }

    return breadcrumbs;
};

// Get service area data by slug
export const getServiceAreaBySlug = (slug, serviceAreas) => {
    return serviceAreas.find(area => createServiceAreaSlug(area.name) === slug);
};

// Get service data by slug
export const getServiceBySlug = (slug, serviceAreas) => {
    for (const area of serviceAreas) {
        for (const service of area.services) {
            if (createServiceSlug(area.name, service) === slug) {
                return { area, service };
            }
        }
    }
    return null;
};

// Check if slug is a service area slug
export const isServiceAreaSlug = (slug, serviceAreas) => {
    return serviceAreas.some(area => createServiceAreaSlug(area.name) === slug);
};

// Check if slug is a service slug
export const isServiceSlug = (slug, serviceAreas) => {
    return getServiceBySlug(slug, serviceAreas) !== null;
};

// Environment detection utilities
export const isDevelopment = () => {
    return import.meta.env.DEV ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.includes('dev') ||
        window.location.protocol === 'file:';
};

export const isProduction = () => {
    return !isDevelopment();
};

// Check if analytics should be loaded
export const shouldLoadAnalytics = () => {
    return isProduction();
}; 