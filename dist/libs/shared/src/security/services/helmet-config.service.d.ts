export declare class HelmetConfigService {
    getHelmetConfig(): {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: string[];
                styleSrc: string[];
                fontSrc: string[];
                imgSrc: string[];
                scriptSrc: string[];
                objectSrc: string[];
                upgradeInsecureRequests: any[];
            };
        };
        crossOriginEmbedderPolicy: boolean;
        hsts: {
            maxAge: number;
            includeSubDomains: boolean;
            preload: boolean;
        };
        noSniff: boolean;
        frameguard: {
            action: string;
        };
        xssFilter: boolean;
        referrerPolicy: {
            policy: string;
        };
        permissionsPolicy: {
            features: {
                geolocation: any[];
                microphone: any[];
                camera: any[];
                payment: any[];
                usb: any[];
            };
        };
    };
}
