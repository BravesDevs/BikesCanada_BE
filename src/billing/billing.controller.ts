import { Controller, Get, Param, Res } from '@nestjs/common';
import { BillingService } from './billing.service';
import express, { Request, Response } from "express";
@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @Get(':booking_id')
    async getBilling(@Param('booking_id') bookingId: number, @Res() res: Response): Promise<void> {
        const buffer = await this.billingService.getBillingInfo(bookingId);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=example.pdf',
            'Content-Length': buffer.length,
        })
        res.end(buffer);
    }
}
