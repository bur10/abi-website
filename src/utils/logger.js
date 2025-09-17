/**
 * Production-safe logging utility
 * Only logs in development environment, silent in production
 */

import { isDevelopment } from './index.js';

class Logger {
    constructor() {
        this.isDev = isDevelopment();
    }

    /**
     * Log info messages (development only)
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments to log
     */
    info(message, ...args) {
        if (this.isDev) {
            console.log(`[INFO] ${message}`, ...args);
        }
    }

    /**
     * Log debug messages (development only)
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments to log
     */
    debug(message, ...args) {
        if (this.isDev) {
            console.log(`[DEBUG] ${message}`, ...args);
        }
    }

    /**
     * Log warning messages (development only)
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments to log
     */
    warn(message, ...args) {
        if (this.isDev) {
            console.warn(`[WARN] ${message}`, ...args);
        }
    }

    /**
     * Log error messages (always logs, even in production for critical errors)
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments to log
     */
    error(message, ...args) {
        // Always log errors, even in production, but without sensitive data
        if (this.isDev) {
            console.error(`[ERROR] ${message}`, ...args);
        } else {
            // In production, only log the error message without sensitive details
            console.error(`[ERROR] ${message}`);
        }
    }

    /**
     * Log form submission data (development only)
     * @param {string} stage - The submission stage
     * @param {Object} data - The data being submitted
     */
    formSubmission(stage, data) {
        if (this.isDev) {
            console.log(`[FORM] ${stage}:`, JSON.stringify(data, null, 2));
        }
    }

    /**
     * Log API responses (development only)
     * @param {string} endpoint - The API endpoint
     * @param {Response} response - The fetch response object
     */
    apiResponse(endpoint, response) {
        if (this.isDev) {
            console.log(`[API] ${endpoint} - Status: ${response.status}, OK: ${response.ok}`);
        }
    }

    /**
     * Log component interactions (development only)
     * @param {string} component - The component name
     * @param {string} action - The action being performed
     * @param {any} data - Optional data to log
     */
    component(component, action, data = null) {
        if (this.isDev) {
            const message = `[COMPONENT] ${component} - ${action}`;
            if (data) {
                console.log(message, data);
            } else {
                console.log(message);
            }
        }
    }

    /**
     * Log configuration information (development only)
     * @param {string} config - The configuration being logged
     * @param {any} value - The configuration value
     */
    config(config, value) {
        if (this.isDev) {
            console.log(`[CONFIG] ${config}:`, value);
        }
    }
}

// Create and export a singleton instance
const logger = new Logger();
export default logger;

// Export named functions for convenience
export const { info, debug, warn, error, formSubmission, apiResponse, component, config } = logger;
