// Company Information
export const COMPANY_INFO = {
    name: "Aden Yönetim ve Temizlik Hizmetleri",
    shortName: "Aden Grup",
    phone: "+90 (532) 459 00 96",
    whatsapp: "905324590096",
    email: "info@adengruptr.com",
    address: "Cumhuriyet Mahallesi 2005 Sokak No: 1/2 İç Kapı No: 25 Torbalı/ İzmir",
    instagram: "https://www.instagram.com/adengruptr/",
    instagramUsername: "adengruptr",
    foundedYear: 2021,
    city: "İzmir"
};

// Animation Durations
export const ANIMATIONS = {
    fast: "200ms",
    medium: "300ms",
    slow: "500ms"
};

// Breakpoints (aligned with Tailwind CSS)
export const BREAKPOINTS = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
};

// Colors (aligned with Tailwind CSS)
export const COLORS = {
    primary: {
        50: "#eff6ff",
        100: "#dbeafe",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a"
    },
    gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827"
    },
    green: {
        500: "#10b981",
        600: "#059669",
        700: "#047857"
    }
};

// Service Categories
export const SERVICE_CATEGORIES = [
    {
        id: 1,
        image: "./images/personel-temin-hizmeti.png",
        title: "Personel Temin Hizmeti",
        description: "Kalifiye ve deneyimli personel temin hizmetleri",
        services: [
            {
                title: "Danışma Personeli",
                description: "Danışma personeli temin hizmetimizle, ziyaretçilerin karşılanması, yönlendirilmesi ve bilgilendirilmesini profesyonelce sağlıyoruz. Güler yüzlü ve deneyimli personelimizle 7/24 hizmet sunuyoruz."
            },
            {
                title: "Temizlik Personeli",
                description: "Deneyimli ve eğitimli temizlik personeli ile hijyen standartlarınızı koruyoruz. Günlük, haftalık ve aylık temizlik personeli temini."
            },
            {
                title: "Resepsiyon Görevlisi",
                description: "Resepsiyon görevlisi temin hizmetimizle, misafir karşılama, telefon yanıtlama ve yönlendirme işlemlerini profesyonel şekilde yürütüyoruz. Deneyimli ve güler yüzlü personelimizle kurumsal imajınızı en iyi şekilde yansıtıyoruz."
            },
            {
                title: "Şoför Temini",
                description: "Şoför temin hizmetimizle, personel ve misafir taşıma ihtiyaçlarınızı güvenli ve konforlu şekilde karşılıyoruz. Deneyimli ve profesyonel şoförlerimizle zamanında ve sorunsuz ulaşım sağlıyoruz."
            }
        ]
    },
    {
        id: 2,
        image: "./images/site-apartman-hizmetleri.jpg",
        title: "Yönetim Hizmetleri",
        description: "Kapsamlı tesis ve site yönetimi çözümleri",
        services: [
            {
                title: "Site Yönetimi",
                description: "Site ve apartman yönetiminde mali, idari ve teknik süreçlerin profesyonel yönetimi. Kapsamlı yönetim hizmetleri ile yaşam kalitenizi artırıyoruz."
            },
            {
                title: "Tesis Yönetimi",
                description: "Tesislerinizin temizlik, bakım, güvenlik ve teknik işletim süreçlerini profesyonelce yönetiyoruz. Verimli ve sürdürülebilir çözümlerle tesislerinizi en iyi şekilde işletiyoruz."
            }
        ]
    },
    {
        id: 3,
        image: "./images/temizlik-hizmetleri.jpg",
        title: "Temizlik Hizmetleri",
        description: "Hijyen standartlarına uygun temizlik çözümleri",
        services: [
            {
                title: "İnşaat Sonrası Temizlik",
                description: "İnşaat ve tadilat sonrası oluşan kaba ve ince temizlik ihtiyaçlarınızı titizlikle karşılıyoruz. Yaşam ve çalışma alanlarınızı hızlıca kullanıma hazır hale getiriyoruz."
            },
            {
                title: "Fabrika Temizliği",
                description: "Fabrika ve üretim alanlarınızda hijyen, güvenlik ve verimlilik odaklı profesyonel temizlik hizmeti sunuyoruz. Ağır kir ve endüstriyel atıklara özel çözümlerle çalışıyoruz."
            },
            {
                title: "Koltuk Temizliği",
                description: "Ev, ofis ve ortak alanlardaki koltuklarınızı hijyenik ve özenli bir şekilde temizliyoruz. Leke ve kötü kokulara karşı etkili, kumaş dostu temizlik çözümleri sunuyoruz."
            }
        ]
    }
];

// Service Areas
export const SERVICE_AREAS = [
    {
        id: 1,
        name: "İzmir Merkez",
        description: "İzmir'in merkez ilçelerinde 7/24 hizmet veren ana bölgemiz",
        responseTime: "2 saat içinde",
        coverage: "Tam kapsamlı hizmet",
        services: [
            "Site ve Apartman Yönetimi",
            "Temizlik Hizmetleri",
            "Personel Temini",
            "Peyzaj Hizmetleri",
            "Havuz Bakım ve Temizliği",
            "Güvenlik Hizmetleri"
        ],
        districts: [
            "Bornova", "Bayraklı", "Karşıyaka", "Konak",
            "Balçova", "Narlıdere", "Güzelbahçe", "Gaziemir"
        ]
    },
    {
        id: 2,
        name: "Torbalı ve Çevreleri",
        description: "Ana merkezimizin bulunduğu Torbalı ve çevre ilçelerde özel hizmet",
        responseTime: "1 saat içinde",
        coverage: "Öncelikli hizmet bölgesi",
        services: [
            "Site ve Apartman Yönetimi",
            "Temizlik Hizmetleri",
            "Personel Temini",
            "Peyzaj Hizmetleri",
            "Havuz Bakım ve Temizliği",
            "Acil Müdahale"
        ],
        districts: [
            "Torbalı", "Selçuk", "Menderes", "Tire",
            "Bayındır", "Kiraz", "Beydağ"
        ]
    },
    {
        id: 3,
        name: "Ege Bölgesi",
        description: "Ege bölgesinin diğer illerinde seçili hizmetler",
        responseTime: "4-6 saat içinde",
        coverage: "Seçili hizmetler",
        services: [
            "Site ve Apartman Yönetimi",
            "Temizlik Hizmetleri",
            "Personel Temini",
            "Proje Bazlı Hizmetler"
        ],
        districts: [
            "Manisa", "Aydın", "Muğla", "Denizli",
            "Uşak", "Afyon", "Kütahya"
        ]
    },
    {
        id: 4,
        name: "Tatil Bölgeleri",
        description: "Özel tatil bölgeleri ve turistik alanlar için özel hizmetler",
        responseTime: "Sezona göre",
        coverage: "Mevsimlik hizmet",
        services: [
            "Tatil Köyü Yönetimi",
            "Otel Temizlik Hizmetleri",
            "Sezonluk Personel",
            "Peyzaj Bakımı"
        ],
        districts: [
            "Çeşme", "Alaçatı", "Urla", "Seferihisar",
            "Kuşadası", "Didim", "Bodrum", "Marmaris"
        ]
    }
];

// References
export const REFERENCES = [
    { id: 1, image: "./images/references/galetos.png", title: "Galetos" },
    { id: 2, image: "./images/references/oasis-marina.jpg", title: "OASİS Marina" },
    { id: 3, image: "./images/references/bakan_insaat.jpg", title: "Bakan Gayrimenkul" },
    { id: 4, image: "./images/references/omeroglu-baharat.png", title: "Ömeroğlu Baharat" },
    { id: 5, image: "./images/references/mia-koru.png", title: "Mia Koru" },
    { id: 6, image: "./images/references/viven.jpg", title: "Viven İnşaat" },
    { id: 7, image: "./images/references/last_point_city.jpg", title: "Last Point City" },
    { id: 8, image: "./images/references/alacati_muhallebicisi.jpeg", title: "Alaçatı Muhallebicisi" },
    { id: 9, image: "./images/references/krv_insaat.png", title: "KRV İnşaat" },
    { id: 10, image: "./images/references/ertok_insaat.png", title: "Ertok İnşaat" },
    { id: 11, image: "./images/references/mimkent_vista.png", title: "Mimkent Vista" },
    { id: 12, image: "./images/references/ozkon_insaat.png", title: "Özkon İnşaat" },
    { id: 13, image: "./images/references/dasif_insaat.jpg", title: "Dasif İnşaat" },
    { id: 14, image: "./images/references/pizza_locale.jpg", title: "Pizza Locale" },
];

// Utility Functions
export const createWhatsAppLink = (message) => {
    return `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
};

export const createEmailLink = (subject = "", body = "") => {
    const params = new URLSearchParams();
    if (subject) params.append('subject', subject);
    if (body) params.append('body', body);
    return `mailto:${COMPANY_INFO.email}${params.toString() ? '?' + params.toString() : ''}`;
};

// SEO Meta Tags
export const SEO_META = {
    title: "Aden Grup - Site Yönetimi ve Temizlik Hizmetleri | İzmir",
    description: "İzmir'de site yönetimi, temizlik hizmetleri, personel temini ve peyzaj hizmetleri. Profesyonel ekibimizle 2021'den beri hizmet veriyoruz.",
    keywords: "site yönetimi, temizlik hizmetleri, personel temini, peyzaj hizmetleri, İzmir, Torbalı, apartman yönetimi, havuz bakımı",
    author: "Aden Grup",
    viewport: "width=device-width, initial-scale=1.0",
    language: "tr-TR",
    robots: "index, follow"
}; 