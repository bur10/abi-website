import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check, MapPin, Loader2 } from 'lucide-react';
import { SERVICE_AREAS, SERVICE_CATEGORIES, COMPANY_INFO } from '../constants';
import { FORM_ENDPOINT, DEV_MODE, FORM_CONFIG, VALIDATION_CONFIG, ERROR_MESSAGES } from '../config/form-config';
import logger from '../utils/logger';

const GetDealModal = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1 - Service and Location Selection
        service: '',
        district: '',

        // Step 2 - Personal Information and Details
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        description: '',
        location: ''
    });

    const [errors, setErrors] = useState({});

    // Fixed values for Torbalı cleaning services
    const TORBALI_DISTRICTS = SERVICE_AREAS.filter(area => area.name === "Torbalı ve Çevreleri").map(area => area.districts).flat();

    const CLEANING_SERVICES = SERVICE_CATEGORIES.find(category => category.id === 3).services.map(service => service.title);

    // Submission states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(1);
            setFormData({
                service: '',
                district: '',
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                description: '',
                location: ''
            });
            setErrors({});
            setIsSubmitting(false);
            setSubmitSuccess(false);
            setSubmitError('');
        }
    }, [isOpen]);

    // No complex useEffects needed since we have fixed service area

    // Validation functions
    const validateStep1 = () => {
        const stepErrors = {};
        if (!formData.service) stepErrors.service = 'Temizlik hizmeti seçimi zorunludur';
        if (!formData.district) stepErrors.district = 'İlçe seçimi zorunludur';
        return stepErrors;
    };

    const validateStep2 = () => {
        const stepErrors = {};
        if (!formData.firstName.trim()) stepErrors.firstName = 'Ad zorunludur';
        if (!formData.lastName.trim()) stepErrors.lastName = 'Soyad zorunludur';

        if (!formData.phone.trim()) {
            stepErrors.phone = 'Telefon numarası zorunludur';
        } else if (!validateTurkishPhone(formData.phone)) {
            stepErrors.phone = 'Geçerli bir Türk telefon numarası giriniz (5XX XXX XXXX)';
        }

        if (!formData.email.trim()) {
            stepErrors.email = 'E-posta adresi zorunludur';
        } else if (!VALIDATION_CONFIG.emailRegex.test(formData.email)) {
            stepErrors.email = 'Geçerli bir e-posta adresi giriniz';
        }

        if (!formData.description.trim()) stepErrors.description = 'Hizmet açıklaması zorunludur';
        if (!formData.location.trim()) stepErrors.location = 'Konum bilgisi zorunludur';
        return stepErrors;
    };

    // Phone formatting that maintains spaces
    const formatPhoneDigits = (value, previousValue = '') => {
        // Extract only digits
        const digits = value.replace(/\D/g, '');

        // If user is trying to delete and we have fewer digits than before, allow it
        const prevDigits = previousValue.replace(/\D/g, '');
        if (digits.length < prevDigits.length) {
            // User is deleting, format the remaining digits
            const limitedDigits = digits.substring(0, 10);

            if (limitedDigits.length === 0) return '';
            if (limitedDigits.length <= 3) {
                return limitedDigits;
            } else if (limitedDigits.length <= 6) {
                return `${limitedDigits.substring(0, 3)} ${limitedDigits.substring(3)}`;
            } else {
                return `${limitedDigits.substring(0, 3)} ${limitedDigits.substring(3, 6)} ${limitedDigits.substring(6)}`;
            }
        }

        // If user has same or more digits, format normally
        const limitedDigits = digits.substring(0, 10);

        if (limitedDigits.length === 0) return '';
        if (limitedDigits.length <= 3) {
            return limitedDigits;
        } else if (limitedDigits.length <= 6) {
            return `${limitedDigits.substring(0, 3)} ${limitedDigits.substring(3)}`;
        } else {
            return `${limitedDigits.substring(0, 3)} ${limitedDigits.substring(3, 6)} ${limitedDigits.substring(6)}`;
        }
    };

    // Phone validation helper - just check if we have 10 digits starting with 5
    const validateTurkishPhone = (phone) => {
        const digits = phone.replace(/\D/g, '');
        // Turkish mobile numbers: 5XX XXXXXXX (10 digits total)
        const turkishMobileRegex = /^5[0-9]{9}$/;
        return turkishMobileRegex.test(digits);
    };

    // Email validation helper
    const validateEmail = (email) => {
        return VALIDATION_CONFIG.emailRegex.test(email);
    };

    // Handle email blur for validation
    const handleEmailBlur = (e) => {
        const email = e.target.value.trim();

        if (email && !validateEmail(email)) {
            setErrors(prev => ({
                ...prev,
                email: 'Geçerli bir e-posta adresi giriniz'
            }));
        } else if (email && validateEmail(email)) {
            // Clear email error if valid
            setErrors(prev => ({ ...prev, email: '' }));
        }
        // If email is empty, don't show error on blur (will be caught by form validation)
    };

    const handleInputChange = (field, value) => {
        let processedValue = value;

        // Special handling for phone field
        if (field === 'phone') {
            logger.component('GetDealModal', 'Phone field changed', { value });
            processedValue = formatPhoneDigits(value, formData.phone);

            // Only validate if there's actually content
            if (processedValue && processedValue.trim() !== '') {
                if (!validateTurkishPhone(processedValue)) {
                    setErrors(prev => ({
                        ...prev,
                        phone: 'Geçerli bir Türk telefon numarası giriniz (5XX XXX XXXX)'
                    }));
                } else {
                    // Clear phone error if valid
                    setErrors(prev => ({ ...prev, phone: '' }));
                }
            } else {
                // Clear phone error if field is empty
                setErrors(prev => ({ ...prev, phone: '' }));
            }
        }

        setFormData(prev => ({ ...prev, [field]: processedValue }));

        // Clear error when user starts typing (except for phone which has immediate validation)
        if (errors[field] && field !== 'phone') {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Handle phone keydown to prevent space deletion
    const handlePhoneKeyDown = (e) => {
        const input = e.target;
        const value = input.value;
        const cursorPos = input.selectionStart;

        // Prevent deletion of spaces
        if (e.key === 'Backspace') {
            // If cursor is right after a space, move cursor back one more position
            if (cursorPos > 0 && value[cursorPos - 1] === ' ') {
                e.preventDefault();
                const newPos = cursorPos - 1;
                input.setSelectionRange(newPos, newPos);
                // Trigger backspace on the digit before the space
                const newValue = value.substring(0, newPos - 1) + value.substring(newPos);
                handleInputChange('phone', newValue);
                return;
            }
        }

        if (e.key === 'Delete') {
            // If cursor is right before a space, move cursor forward one more position
            if (cursorPos < value.length && value[cursorPos] === ' ') {
                e.preventDefault();
                const newPos = cursorPos + 1;
                input.setSelectionRange(newPos, newPos);
                // Trigger delete on the digit after the space
                if (newPos < value.length) {
                    const newValue = value.substring(0, newPos) + value.substring(newPos + 1);
                    handleInputChange('phone', newValue);
                }
                return;
            }
        }

        // Prevent arrow keys from landing on spaces
        if (e.key === 'ArrowLeft' && cursorPos > 0 && value[cursorPos - 1] === ' ') {
            e.preventDefault();
            input.setSelectionRange(cursorPos - 1, cursorPos - 1);
        }

        if (e.key === 'ArrowRight' && cursorPos < value.length && value[cursorPos] === ' ') {
            e.preventDefault();
            input.setSelectionRange(cursorPos + 1, cursorPos + 1);
        }
    };

    const handleNextStep = () => {
        const stepErrors = validateStep1();

        if (Object.keys(stepErrors).length === 0) {
            setCurrentStep(2);
            setErrors({});
        } else {
            setErrors(stepErrors);
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => prev - 1);
        setErrors({});
    };

    // Submit form data to Google Apps Script using fetch
    const submitToBackend = async (formDataToSubmit) => {
        logger.info('Attempting backend submission...');
        logger.formSubmission('Request data', formDataToSubmit);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), FORM_CONFIG.submissionTimeout);

            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(formDataToSubmit),
                mode: 'cors',
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            logger.apiResponse('Form submission', response);

            if (!response.ok) {
                const errorText = await response.text();
                logger.error('Response error', { status: response.status, errorText });
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            logger.info('Backend submission successful', result);

            if (!result.success) {
                throw new Error(result.error || 'Server returned error');
            }

            return result;

        } catch (error) {
            logger.error('Backend submission failed', error.message);

            if (error.name === 'AbortError') {
                throw new Error('Request timed out. Please try again.');
            }

            throw error;
        }
    };

    const handleSubmit = async () => {
        const stepErrors = validateStep2();

        if (Object.keys(stepErrors).length === 0) {
            setIsSubmitting(true);
            setSubmitError('');

            try {
                // Prepare submission data
                const submissionData = {
                    ...formData,
                    phone: `+90 ${formData.phone}`, // Add country code for submission
                    serviceAreaName: "Torbalı ve Çevreleri",
                    serviceArea: "1", // Fixed to Torbalı service area
                    timestamp: new Date().toISOString()
                };

                // Submit to Google Apps Script (if endpoint is configured)
                if (!DEV_MODE && FORM_CONFIG.enableSheetsIntegration) {

                    const result = await submitToBackend(submissionData);
                    logger.info('Backend response received', result);

                    setSubmitSuccess(true);
                    setCurrentStep(3); // Move to success step
                } else {
                    // Development mode: just log and show success
                    logger.formSubmission('Development mode submission', submissionData);
                    logger.config('DEV_MODE', DEV_MODE);
                    logger.config('FORM_ENDPOINT', FORM_ENDPOINT);
                    logger.info('To enable backend integration, follow the setup guide in /google-apps-script/SETUP_GUIDE.md');

                    setSubmitSuccess(true);
                    setCurrentStep(3); // Move to success step
                }

                // Don't auto-close modal - let user close it manually or via WhatsApp button

            } catch (error) {
                logger.error('Submission error', error.message);
                setSubmitError(
                    error.message || ERROR_MESSAGES.generic
                );
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(stepErrors);
        }
    };

    if (!isOpen) return null;

    const steps = [
        { number: 1, title: 'Hizmet ve Konum', completed: currentStep > 1 },
        { number: 2, title: 'İletişim ve Detaylar', completed: currentStep > 2 },
        { number: 3, title: 'Tamamlandı', completed: submitSuccess }
    ];

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto transform transition-all">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Temizlik Hizmeti Talebi
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Progress Steps */}
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => (
                                <React.Fragment key={step.number}>
                                    <div className="flex items-center">
                                        <div className={`
                                            w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                            ${step.completed ? 'bg-green-500 text-white' :
                                                currentStep === step.number ? 'bg-blue-500 text-white' :
                                                    'bg-gray-200 text-gray-600'}
                                        `}>
                                            {step.completed ? <Check className="h-4 w-4" /> : step.number}
                                        </div>
                                        <span className={`
                                            ml-2 text-sm font-medium hidden sm:block
                                            ${step.completed || currentStep === step.number ? 'text-gray-900' : 'text-gray-500'}
                                        `}>
                                            {step.title}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`
                                            flex-1 h-0.5 mx-4
                                            ${step.completed ? 'bg-green-500' : 'bg-gray-200'}
                                        `} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-6">
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">
                                    Temizlik Hizmeti ve Konum Seçimi
                                </h4>

                                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                    <p className="text-blue-800 text-sm">
                                        <i className="fas fa-info-circle mr-2"></i>
                                        Torbalı ve çevresinde profesyonel temizlik hizmetleri sunuyoruz. Hizmet alanınızı ve ihtiyacınızı seçin.
                                    </p>
                                </div>

                                {/* Service */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Temizlik Hizmeti *
                                    </label>
                                    <select
                                        value={formData.service}
                                        onChange={(e) => handleInputChange('service', e.target.value)}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.service ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Temizlik hizmeti seçiniz</option>
                                        {CLEANING_SERVICES.map(service => (
                                            <option key={service} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.service && (
                                        <p className="mt-1 text-sm text-red-600">{errors.service}</p>
                                    )}
                                </div>

                                {/* District */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Hizmet Konumu (İlçe) *
                                    </label>
                                    <select
                                        value={formData.district}
                                        onChange={(e) => handleInputChange('district', e.target.value)}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.district ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">İlçe seçiniz</option>
                                        {TORBALI_DISTRICTS.map(district => (
                                            <option key={district} value={district}>
                                                {district}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.district && (
                                        <p className="mt-1 text-sm text-red-600">{errors.district}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">
                                    İletişim Bilgileri ve Hizmet Detayları
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* First Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ad *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            disabled={isSubmitting}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Adınızı giriniz"
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Soyad *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            disabled={isSubmitting}
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Soyadınızı giriniz"
                                        />
                                        {errors.lastName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Telefon Numarası *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 text-base font-medium">+90</span>
                                        </div>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            onKeyDown={handlePhoneKeyDown}
                                            maxLength={12}
                                            disabled={isSubmitting}
                                            className={`w-full pl-12 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="532 459 0096"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        E-posta Adresi *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        onBlur={handleEmailBlur}
                                        disabled={isSubmitting}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="ornek@email.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Temizlik İhtiyacınızın Açıklaması *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        rows={3}
                                        disabled={isSubmitting}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.description ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Örn: 2+1 90 m2 ev alanının haftalık temizliği gerekiyor. Cam temizliği dahil..."
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="inline h-4 w-4 mr-1" />
                                        Tam Adres/Konum *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        disabled={isSubmitting}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.location ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Örn: Torbalı Merkez, ABC Sitesi A Blok..."
                                    />
                                    {errors.location && (
                                        <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                                    )}
                                </div>

                                {/* Summary */}
                                {!submitSuccess && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h5 className="font-medium text-gray-900 mb-2">Talep Özeti:</h5>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p><strong>Hizmet:</strong> {formData.service || 'Seçilmedi'}</p>
                                            <p><strong>Konum:</strong> {formData.district || 'Seçilmedi'} - Torbalı ve Çevreleri</p>
                                            <p><strong>İletişim:</strong> {formData.firstName} {formData.lastName} {formData.phone && `- ${formData.phone}`}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="text-center py-8">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                                    <div className="flex flex-col items-center mb-6">
                                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                                            <Check className="h-8 w-8 text-white" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-green-800 mb-2">
                                            Talebiniz Başarıyla Gönderildi!
                                        </h4>
                                        <p className="text-green-700 text-lg">
                                            Temizlik hizmeti talebiniz alındı
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-lg p-6 mb-6">
                                        <h5 className="font-semibold text-gray-900 mb-4">📋 Talep Özeti</h5>
                                        <div className="text-left space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Hizmet:</span>
                                                <span className="font-medium">{formData.service}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Konum:</span>
                                                <span className="font-medium">{formData.district}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">İletişim:</span>
                                                <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Telefon:</span>
                                                <span className="font-medium">+90 {formData.phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 text-sm text-green-700">
                                        <div className="flex items-center justify-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                            <span>Talebiniz ekibimize iletildi</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                            <span>Uzman ekibimiz 2 saat içinde size dönecek</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <p className="text-blue-800 font-medium text-sm mb-2">
                                            💬 Herhangi bir sorunuz için hemen arayın:
                                        </p>
                                        <a
                                            href={`tel:${COMPANY_INFO.phone}`}
                                            className="text-blue-700 font-bold text-lg hover:text-blue-900"
                                        >
                                            {COMPANY_INFO.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error Message - shown in step 2 */}
                        {submitError && currentStep === 2 && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                <div className="flex items-center">
                                    <X className="h-5 w-5 text-red-500 mr-2" />
                                    <div>
                                        <h5 className="text-red-800 font-medium">Bir Hata Oluştu</h5>
                                        <p className="text-red-700 text-sm mt-1">{submitError}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between p-6 border-t border-gray-200">
                        {/* Back button - show on step 2 only */}
                        {currentStep === 2 && !submitSuccess && (
                            <button
                                onClick={handlePrevStep}
                                disabled={isSubmitting}
                                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Geri
                            </button>
                        )}
                        {(currentStep === 1 || currentStep === 3) && <div></div>}

                        {/* Forward/Submit/Close buttons */}
                        {currentStep === 1 ? (
                            <button
                                onClick={handleNextStep}
                                className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Devam Et
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        ) : currentStep === 2 && !submitSuccess ? (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-broom mr-2"></i>
                                        Temizlik Talebi Gönder
                                    </>
                                )}
                            </button>
                        ) : currentStep === 3 ? (
                            <button
                                onClick={onClose}
                                className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                <Check className="h-4 w-4 mr-2" />
                                Tamam
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetDealModal;
