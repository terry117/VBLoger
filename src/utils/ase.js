import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = "terry117"
export default {
    // 加密函数
    encryptToken(token) {
        return CryptoJS.AES.encrypt(token, ENCRYPTION_KEY).toString();
    },

    // 解密函数
    decryptToken(encryptedToken) {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8)
    },

    //调试
    test(key) {
        let encryptResult = this.encryptToken(key)
        console.log('encrypt: ' + encryptResult)
        let decryptResult = this.decryptToken(encryptResult)
        console.log('decrypt: ' + decryptResult)
    }
}
