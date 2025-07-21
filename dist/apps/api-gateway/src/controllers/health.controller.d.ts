import { Response } from 'express';
export declare class HealthController {
    private readonly logger;
    check(res: Response): Promise<any>;
}
