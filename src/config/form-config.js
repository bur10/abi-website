// Form submission configuration
// This file contains settings for the form submission backend

// Environment detection
export const DEV_MODE = import.meta.env.DEV || false;


export const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxIPnEk6GOupP-N44uFJcVTyUqJNBzn1psYAc58JTZbpWisqVXp-hfi4sH7CVtyX4VT0A/exec';

// Form configuration
export const FORM_CONFIG = {
    // Enable/disable Google Sheets integration
    enableSheetsIntegration: true,

    // Enable/disable email notifications
    enableEmailNotifications: true,

    // Enable WhatsApp as fallback option
    enableWhatsAppFallback: true,

    // Timeout for form submission (in milliseconds)
    submissionTimeout: 10000,

    // Retry attempts for failed submissions
    maxRetryAttempts: 2
};

// Validation configuration
export const VALIDATION_CONFIG = {
    phoneRegex: /^(\+90|0)?[0-9]{10}$/,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    minDescriptionLength: 10,
    maxDescriptionLength: 1000
};

// Error messages
export const ERROR_MESSAGES = {
    generic: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    network: 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.',
    timeout: 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.',
    validation: 'Form bilgilerini kontrol edin ve tekrar deneyin.',
    server: 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.'
};

// Success messages
export const SUCCESS_MESSAGES = {
    submission: 'Talebiniz başarıyla gönderildi!',
    email: 'E-posta bildirimi gönderildi.',
    sheets: 'Bilgileriniz kaydedildi.'
};

// Development mode settings
if (DEV_MODE) {
    console.log('Form configuration loaded in development mode');
    console.log('FORM_ENDPOINT:', FORM_ENDPOINT);
    console.log('To enable backend integration, follow the setup guide in /google-apps-script/SETUP_GUIDE.md');
}
