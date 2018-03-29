require('dotenv').config();
const GoogleAuth = require('google-auth-library');

let SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function authorize() {
    return new Promise(resolve => {
        const authFactory = new GoogleAuth();
        const jwtClient = new authFactory.JWT(
            process.env.CLIENT_EMAIL,
            null,
            process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), 
            SCOPES
        );

        jwtClient.authorize(() => resolve(jwtClient));
    });
}

module.exports = {
    authorize,
}
