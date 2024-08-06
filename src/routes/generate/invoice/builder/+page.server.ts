import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types.js';
import puppeteer from 'puppeteer-core';
import BlackWhiteMinimalistBuilder from '$lib/templates/builder/BlackWhiteMinimalistBuilder.svelte';

export const actions = {
    saveAndDownloadInvoice: async ({ request, locals: { supabase } }: RequestEvent) => {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        const user_id = (await supabase.auth.getUser()).data.user?.id;

        if (sessionError || !session || !user_id) {
            return error(401, {
                message: "Unauthorized request, please login"
            })
        }

        const { invoiceData } = await request.json()

        if (!invoiceData) {
            return error(400, {
                message: "Invalid invoice data"
            })
        }

        try {
            // Launch Puppeteer and capture the image
            const browser = await puppeteer.launch()
            const page = await browser.newPage()

            // Create a complete HTML document with styles
            const fullHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        /* Add your global styles here */
                        body {
                            font-family: 'Open Sans', sans-serif; /* Ensure the font is loaded */
                            margin: 0;
                            padding: 0;
                            background-color: #fff;
                        }
                        /* Include any other styles needed for your invoice */
                    </style>
                </head>
                <body>
                    <div id="invoice">
                        ${BlackWhiteMinimalistBuilder}
                    </div>
                </body>
                </html>
            `;

            await page.setContent(fullHtml, { waitUntil: 'networkidle0' })
            const pngImg = `data:image/png;base64,${await page.screenshot({ encoding: 'base64' })}`;
            await browser.close()

            // Save the invoice data to the database
            const { error: postGresError } = await supabase
                .from('user_invoices')
                .insert([
                    {
                        user_id,
                        invoice_data: invoiceData,
                        pngImg,
                        is_draft: false
                    }
                ])

            if (postGresError) {
                throw new Error(postGresError.message)
            }

            return { success: true, pngImg }
        } catch (err: any) {
            return error(500, {
                message: err.message || "An error occurred while generating the invoice"
            })
        }
    }
}