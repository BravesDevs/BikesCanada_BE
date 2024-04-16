import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GeneratePDF } from './generatePDF';
@Injectable()
export class BillingService {
    constructor(private readonly prisma: PrismaService) { }

    async getBillingInfo(bookingId) {
        try {
            const res = await this.prisma.billing.findMany({
                where: {
                    booking_id: parseInt(bookingId)
                },
                include: {
                    booking: {
                        include: {
                            customer_booking_customerTocustomer: {
                                select: {
                                    first_name: true,
                                    last_name: true,
                                }
                            },
                            location_booking_pick_upTolocation: {
                                select: {
                                    street: true,
                                    city: true
                                }
                            },
                            location_booking_drop_offTolocation: {
                                select: {
                                    street: true,
                                    city: true
                                }
                            },
                            bikes: {
                                include: {
                                    bike_type_bikes_bike_typeTobike_type: {
                                        select: {
                                            pph: true
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            });

            // Generate PDF for the billing info.
            const pdfBuffer = await GeneratePDF.generatePDF(res[0]);

            return pdfBuffer;

        } catch (e) {
            console.log(e);
            throw new Error("Error while fetching billing info");
        }
    }

}
