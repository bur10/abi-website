import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SERVICE_AREAS } from '../constants';
import { getServiceAreaBySlug, getServiceBySlug, isServiceAreaSlug, isServiceSlug } from '../utils';
import ServiceAreaPageContent from '../components/ServiceAreaPageContent';
import ServicePageContent from '../components/ServicePageContent';

const ServiceAreaPage = () => {
    const { slug } = useParams();
    
    // Check if it's a service area slug
    if (isServiceAreaSlug(slug, SERVICE_AREAS)) {
        const area = getServiceAreaBySlug(slug, SERVICE_AREAS);
        if (!area) {
            return <Navigate to="/hizmet-bolgeleri" replace />;
        }
        return <ServiceAreaPageContent area={area} />;
    }
    
    // Check if it's a service slug
    if (isServiceSlug(slug, SERVICE_AREAS)) {
        const serviceData = getServiceBySlug(slug, SERVICE_AREAS);
        if (!serviceData) {
            return <Navigate to="/hizmet-bolgeleri" replace />;
        }
        return <ServicePageContent area={serviceData.area} service={serviceData.service} />;
    }
    
    // If neither, redirect to service areas list
    return <Navigate to="/hizmet-bolgeleri" replace />;
};

export default ServiceAreaPage; 