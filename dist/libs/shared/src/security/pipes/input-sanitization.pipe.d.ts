import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { SecurityService } from '../security.service';
export declare class InputSanitizationPipe implements PipeTransform {
    private readonly securityService;
    constructor(securityService: SecurityService);
    transform(value: any, metadata: ArgumentMetadata): any;
    private sanitizeObject;
    private sanitizeValue;
    private isEmailField;
}
