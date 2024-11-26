const express = require('express');
const htmlPdf = require('html-pdf-node');
const app = express();

app.get('/generate-invoice', async (req, res) => {
    // Static HTML content for the PDF
    const htmlContent = `
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; text-align: center; }
                </style>
            </head>
            <body>
                <h1>Hello, if you see this, it means PDF generator works</h1>
            </body>
        </html>
    `;

    // Options for html-pdf-node
    const options = { format: 'A4' };

    try {
        // Generate PDF
        const file = { content: htmlContent };
        const pdfBuffer = await htmlPdf.generatePdf(file, options);

        // Set headers to trigger a file download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Failed to generate PDF');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
