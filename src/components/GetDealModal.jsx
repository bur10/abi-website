import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check, MapPin, Loader2 } from 'lucide-react';
import { SERVICE_AREAS, SERVICE_CATEGORIES, COMPANY_INFO } from '../constants';
import { FORM_ENDPOINT, DEV_MODE, FORM_CONFIG, VALIDATION_CONFIG, ERROR_MESSAGES } from '../config/form-config';

const GetDealModal = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1 - Service Selection
        serviceArea: '',
        district: '',
        service: '',

        // Step 2 - Personal Information
        firstName: '',
        lastName: '',
        phone: '',
        email: '',

        // Step 3 - Details
        description: '',
        location: ''
    });

    const [errors, setErrors] = useState({});
    const [availableDistricts, setAvailableDistricts] = useState([]);
    const [availableServices, setAvailableServices] = useState([]);

    // Submission states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(1);
            setFormData({
                serviceArea: '',
                district: '',
                service: '',
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                description: '',
                location: ''
            });
            setErrors({});
            setAvailableDistricts([]);
            setAvailableServices([]);
            setIsSubmitting(false);
            setSubmitSuccess(false);
            setSubmitError('');
        }
    }, [isOpen]);

    // Update districts when service area changes
    useEffect(() => {
        if (formData.serviceArea) {
            const selectedArea = SERVICE_AREAS.find(area => area.id.toString() === formData.serviceArea);
            const newDistricts = selectedArea?.districts || [];
            setAvailableDistricts(newDistricts);

            // Only clear district and service if current district is not valid for the new service area
            if (formData.district && !newDistricts.includes(formData.district)) {
                setFormData(prev => ({ ...prev, district: '', service: '' }));
                setAvailableServices([]);
            } else if (!formData.district) {
                // If no district selected, clear service
                setFormData(prev => ({ ...prev, service: '' }));
                setAvailableServices([]);
            } else {
                // District is still valid, update available services
                const newServices = selectedArea?.services || [];
                setAvailableServices(newServices);

                // Only clear service if current service is not valid for the new service area
                if (formData.service && !newServices.includes(formData.service)) {
                    setFormData(prev => ({ ...prev, service: '' }));
                }
            }
        } else {
            setAvailableDistricts([]);
            setAvailableServices([]);
        }
    }, [formData.serviceArea]);

    // Update services when district changes (but only when district actually changes)
    useEffect(() => {
        if (formData.serviceArea && formData.district) {
            const selectedArea = SERVICE_AREAS.find(area => area.id.toString() === formData.serviceArea);
            const newServices = selectedArea?.services || [];
            setAvailableServices(newServices);

            // Only clear service if current service is not valid for this service area
            if (formData.service && !newServices.includes(formData.service)) {
                setFormData(prev => ({ ...prev, service: '' }));
            }
        } else if (!formData.district) {
            setAvailableServices([]);
            if (formData.service) {
                setFormData(prev => ({ ...prev, service: '' }));
            }
        }
    }, [formData.district]);

    // Validation functions
    const validateStep1 = () => {
        const stepErrors = {};
        if (!formData.serviceArea) stepErrors.serviceArea = 'Hizmet alanı seçimi zorunludur';

        if (!formData.district) {
            const selectedArea = SERVICE_AREAS.find(area => area.id.toString() === formData.serviceArea);
            const isEgeRegion = selectedArea?.name === "Ege Bölgesi";
            stepErrors.district = isEgeRegion ? 'İl seçimi zorunludur' : 'İlçe seçimi zorunludur';
        }

        if (!formData.service) stepErrors.service = 'Hizmet seçimi zorunludur';
        return stepErrors;
    };

    const validateStep2 = () => {
        const stepErrors = {};
        if (!formData.firstName.trim()) stepErrors.firstName = 'Ad zorunludur';
        if (!formData.lastName.trim()) stepErrors.lastName = 'Soyad zorunludur';

        if (!formData.phone.trim()) {
            stepErrors.phone = 'Telefon numarası zorunludur';
        } else if (!VALIDATION_CONFIG.phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            stepErrors.phone = 'Geçerli bir telefon numarası giriniz';
        }

        if (!formData.email.trim()) {
            stepErrors.email = 'E-posta adresi zorunludur';
        } else if (!VALIDATION_CONFIG.emailRegex.test(formData.email)) {
            stepErrors.email = 'Geçerli bir e-posta adresi giriniz';
        }

        return stepErrors;
    };

    const validateStep3 = () => {
        const stepErrors = {};
        if (!formData.description.trim()) stepErrors.description = 'Açıklama zorunludur';
        if (!formData.location.trim()) stepErrors.location = 'Konum bilgisi zorunludur';
        return stepErrors;
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleNextStep = () => {
        let stepErrors = {};

        if (currentStep === 1) {
            stepErrors = validateStep1();
        } else if (currentStep === 2) {
            stepErrors = validateStep2();
        }

        if (Object.keys(stepErrors).length === 0) {
            setCurrentStep(prev => prev + 1);
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
        console.log('Attempting backend submission...');
        console.log('Request data:', JSON.stringify(formDataToSubmit, null, 2));

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

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response error text:', errorText);
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            console.log('Backend submission successful:', result);

            if (!result.success) {
                throw new Error(result.error || 'Server returned error');
            }

            return result;

        } catch (error) {
            console.error('Backend submission failed:', error);

            if (error.name === 'AbortError') {
                throw new Error('Request timed out. Please try again.');
            }

            throw error;
        }
    };

    const handleSubmit = async () => {
        const stepErrors = validateStep3();

        if (Object.keys(stepErrors).length === 0) {
            setIsSubmitting(true);
            setSubmitError('');

            try {
                // Prepare submission data
                const selectedArea = SERVICE_AREAS.find(area => area.id.toString() === formData.serviceArea);
                const submissionData = {
                    ...formData,
                    serviceAreaName: selectedArea?.name,
                    timestamp: new Date().toISOString()
                };

                // Submit to Google Apps Script (if endpoint is configured)
                if (!DEV_MODE && FORM_CONFIG.enableSheetsIntegration) {

                    const result = await submitToBackend(submissionData);
                    console.log('Backend response:', result);

                    setSubmitSuccess(true);
                } else {
                    // Development mode: just log and show success
                    console.log('Form data (development mode):', submissionData);
                    console.log('DEV_MODE:', DEV_MODE);
                    console.log('FORM_ENDPOINT:', FORM_ENDPOINT);
                    console.log('To enable backend integration, follow the setup guide in /google-apps-script/SETUP_GUIDE.md');

                    setSubmitSuccess(true);
                }

                // Don't auto-close modal - let user close it manually or via WhatsApp button

            } catch (error) {
                console.error('Submission error:', error);
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
        { number: 1, title: 'Hizmet Seçimi', completed: currentStep > 1 },
        { number: 2, title: 'Kişisel Bilgiler', completed: currentStep > 2 },
        { number: 3, title: 'Detaylar', completed: submitSuccess }
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
                            Teklif Al
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
                                    Hizmet Seçimi
                                </h4>

                                {/* Service Area */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Hizmet Alanı *
                                    </label>
                                    <select
                                        value={formData.serviceArea}
                                        onChange={(e) => handleInputChange('serviceArea', e.target.value)}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.serviceArea ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Hizmet alanı seçiniz</option>
                                        {SERVICE_AREAS.map(area => (
                                            <option key={area.id} value={area.id}>
                                                {area.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.serviceArea && (
                                        <p className="mt-1 text-sm text-red-600">{errors.serviceArea}</p>
                                    )}
                                </div>

                                {/* District */}
                                <div>
                                    {(() => {
                                        const selectedArea = SERVICE_AREAS.find(area => area.id.toString() === formData.serviceArea);
                                        const isEgeRegion = selectedArea?.name === "Ege Bölgesi";
                                        const labelText = isEgeRegion ? "İl" : "İlçe";
                                        const placeholderText = isEgeRegion ? "İl seçiniz" : "İlçe seçiniz";

                                        return (
                                            <>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {labelText} *
                                                </label>
                                                <select
                                                    value={formData.district}
                                                    onChange={(e) => handleInputChange('district', e.target.value)}
                                                    disabled={!formData.serviceArea}
                                                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.district ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                >
                                                    <option value="">{placeholderText}</option>
                                                    {availableDistricts.map(district => (
                                                        <option key={district} value={district}>
                                                            {district}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.district && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.district}</p>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>

                                {/* Service */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Hizmet *
                                    </label>
                                    <select
                                        value={formData.service}
                                        onChange={(e) => handleInputChange('service', e.target.value)}
                                        disabled={!formData.district}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.service ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Hizmet seçiniz</option>
                                        {availableServices.map(service => (
                                            <option key={service} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.service && (
                                        <p className="mt-1 text-sm text-red-600">{errors.service}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">
                                    Kişisel Bilgiler
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
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-gray-300'
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
                                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.lastName ? 'border-red-500' : 'border-gray-300'
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
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="0532 459 00 96"
                                    />
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
                                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="ornek@email.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium text-gray-900 mb-4">
                                    Detaylar ve Gönderim
                                </h4>

                                {/* Success Message */}
                                {submitSuccess && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                                        <div className="flex items-start mb-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                    <Check className="h-5 w-5 text-white" />
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <h5 className="text-green-800 font-semibold text-lg">Talebiniz Başarıyla Gönderildi!</h5>
                                                <div className="mt-3 text-green-700 text-sm space-y-2">
                                                    <p className="flex items-center">
                                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                        Talebiniz sistemimize kaydedildi ve takip numarası oluşturuldu
                                                    </p>
                                                    <p className="flex items-center">
                                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                        İlgili departmanımıza e-posta bildirimi gönderildi
                                                    </p>
                                                    <p className="flex items-center">
                                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                        Ekibimiz en kısa sürede (24 saat içinde) size dönüş yapacak
                                                    </p>
                                                </div>
                                                <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                                                    <p className="text-green-800 font-medium text-sm mb-1">💬 İletişime geçmek isterseniz:</p>
                                                    <p className="text-green-700 text-sm">
                                                        Telefon: <span className="font-medium">{COMPANY_INFO.phone}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Error Message */}
                                {submitError && (
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

                                {!submitSuccess && (
                                    <>
                                        {/* Description */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                İhtiyacınızın Kısa Açıklaması *
                                            </label>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => handleInputChange('description', e.target.value)}
                                                rows={4}
                                                disabled={isSubmitting}
                                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.description ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Hangi hizmete ihtiyacınız var? Detayları belirtiniz..."
                                            />
                                            {errors.description && (
                                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                            )}
                                        </div>

                                        {/* Location */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <MapPin className="inline h-4 w-4 mr-1" />
                                                Konum Bilgisi *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => handleInputChange('location', e.target.value)}
                                                disabled={isSubmitting}
                                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.location ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Tam adres veya yakın konum belirtiniz"
                                            />
                                            {errors.location && (
                                                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                                            )}
                                        </div>

                                        {/* Summary */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h5 className="font-medium text-gray-900 mb-2">Talep Özeti:</h5>
                                            <div className="text-sm text-gray-600 space-y-1">
                                                <p><strong>Hizmet:</strong> {formData.service}</p>
                                                <p><strong>Bölge:</strong> {SERVICE_AREAS.find(area => area.id.toString() === formData.serviceArea)?.name} - {formData.district}</p>
                                                <p><strong>İletişim:</strong> {formData.firstName} {formData.lastName} - {formData.phone}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between p-6 border-t border-gray-200">
                        {!submitSuccess && (
                            <button
                                onClick={handlePrevStep}
                                disabled={currentStep === 1 || isSubmitting}
                                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Geri
                            </button>
                        )}
                        {submitSuccess && <div></div>}

                        {currentStep < 3 ? (
                            <button
                                onClick={handleNextStep}
                                disabled={isSubmitting}
                                className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                İleri
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        ) : submitSuccess ? (
                            <button
                                onClick={onClose}
                                className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                <Check className="h-4 w-4 mr-2" />
                                Tamam
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane mr-2"></i>
                                        Talebi Gönder
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetDealModal;
