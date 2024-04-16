import * as PDFDocument from 'pdfkit';

export class GeneratePDF {
    public static async generatePDF(billingData: any): Promise<Buffer> {

        const pdfBuffer: Buffer = await new Promise((resolve, reject) => {
            const doc = new PDFDocument({
                size: 'A4',
                bufferPages: true,
            });

            let pph = billingData.booking.bikes.bike_type_bikes_bike_typeTobike_type.pph;



            doc.image('assets/logo.png', 50, 50, { width: 50 })
                .fillColor('black')
                .fontSize(10)
                .text('Bikes Canada', 50, 110);

            doc.fontSize(16).font('Helvetica-Bold')
                .text(`Billing`, 280, 120);

            doc.fontSize(12).font('Helvetica')

            doc.fontSize(14).font('Helvetica-Bold')
                .text("Customer & Trip Information", 50, 200);

            doc.moveTo(50, 215).lineTo(550, 215).stroke();

            doc.fontSize(11).font('Helvetica')
                .text(`Customer Name: ${billingData.booking.customer_booking_customerTocustomer.first_name} ${billingData.booking.customer_booking_customerTocustomer.last_name}`, 50, 225)

                .text(`From: ${billingData.booking.location_booking_pick_upTolocation.street}, ${billingData.booking.location_booking_pick_upTolocation.city}`, 50, 245)

                .text(`To: ${billingData.booking.location_booking_drop_offTolocation.street}, ${billingData.booking.location_booking_drop_offTolocation.city}`, 50, 265)

                .text(`Pick Up: ${formatDate(billingData.booking.pick_time)}`, 50, 285)
                .text(`Drop Off: ${formatDate(billingData.booking.drop_time)}`, 50, 305);

            doc.moveDown()
                .fontSize(14).font('Helvetica-Bold')
                .text("Billing Details", 400, doc.y)

            doc.moveTo(400, doc.y).lineTo(550, doc.y).stroke();

            doc.fontSize(11).font('Helvetica')
                .text(`Usage: ${billingData.bike_usage} hr(s)`, 400, doc.y + 5)
                .text(`Price Per Hour: ${pph} $`, 400, doc.y + 5)
                .text(`Bike Model: ${billingData.booking.bike_model}`, 400, doc.y + 5)
                .text(`Bike Type: ${billingData.booking.bikes.bike_type}`, 400, doc.y + 5)
                .text(`Total Amount: ${billingData.total_cost} $`, 400, doc.y + 5)
                .text(`Discount: ${billingData.discount}`, 400, doc.y + 5)
                .text(`Final Amount: ${billingData.actual_cost} $`, 400, doc.y + 5);

            doc.save();
            doc.rotate(-45, { origin: [50, doc.page.height - 50] })
                .fontSize(20)
                .fillColor('green')
                .font('Helvetica-Bold')
                .text("OFFICIAL", 50, doc.page.height - 50);
            doc.restore();

            function formatDate(dateString) {
                const date = new Date(dateString);
                return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
            }

            doc.end();

            const buffer: Buffer[] = [];

            doc.on('data', buffer.push.bind(buffer));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(buffer);
                resolve(pdfBuffer);
            });
        });
        return pdfBuffer;
    }
}