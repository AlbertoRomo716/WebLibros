const {google} = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
    "27501488633-c1kl341s7f87qb82f7gbb98s7u7f7gkg.apps.googleusercontent.com",
    "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",
    "urn:ietf:wg:oauth:2.0:oob");

oAuth2Client.setCredentials({
        access_token: "ya29.a0ARrdaM_HofXNd2RbhG502q6N5nNgYdDY8HVlzcpB0tJXLlGRg7mYe3MuLgWZKEtse0PYCMGnBd7CvC4Es4IcWYhdYu9HytNsDBFG6uJKVTaXLDlenR3pRcPGsSY7_OSURUYoKPQdMgY2GntaJTdOTmzH-GaG",
        refresh_token: "1//0fUynGRn8mj5MCgYIARAAGA8SNwF-L9IrmP9J_M2aSINdu_wKxC3tlgDTGnMjInytUT7e6-Uv8cbz8D40imlLbWQTC7T0cjbNHkw",
        scope: "https://www.googleapis.com/auth/spreadsheets",
        token_type: "Bearer",
        expiry_date: 1634877485595
});

const sheets = google.sheets({ version: "v4", auth: oAuth2Client });

async function read() {
        const response = await sheets.spreadsheets.values.get({
                spreadsheetId: "1SntI-1LKGXRagGPRnfYfDO183PWaF7X39qTvEkZDoWE",
                range: "Products!A2:E",
        });

        const rows = response.data.values;
        const products = rows.map((row) => ({
                id: +row[0],
                name: row[1],
                price: +row[2],
                image: row[3],
                stock: +row[4],
        }));

        return products;
}

async function write(products) {
        let values = products.map((p) => [p.id, p.name, p.price, p.image, p.stock]);

        const resource = {
                values,
        };
        const result = await sheets.spreadsheets.values.update({
                spreadsheetId: "1SntI-1LKGXRagGPRnfYfDO183PWaF7X39qTvEkZDoWE",
                range: "Products!A2:E",
                valueInputOption: "RAW",
                resource,
        });

        console.log(result.updatedCells);
}

// async function readAndWrite() {
//   const products = await read();
//   products[0].stock = 20;
//   await write(products);
// }

// readAndWrite();

module.exports = {
        read,
        write,
};