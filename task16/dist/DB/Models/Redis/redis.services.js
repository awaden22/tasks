import { client } from "./redis.coonection.js";
class RedisService {
    constructor() { }
    async set(key, value, expire) {
        const options = expire && expire > 0 ? { EX: Math.floor(expire) } : {};
        if (typeof value === "object" && value !== null) {
            value = JSON.stringify(value);
        }
        return await client.set(key.toString(), value.toString(), options);
    }
    async get(key) {
        return await client.get(key);
    }
    async del(key) {
        return await client.del(key);
    }
    async exists(key) {
        return await client.exists(key);
    }
    async expire(key, expire) {
        return await client.expire(key, expire);
    }
    async ttl(key) {
        return await client.ttl(key);
    }
    async persist(key) {
        return await client.persist(key);
    }
    async update(key, value) {
        if (!(await this.exists(key))) {
            return false;
        }
        await this.set(key, value);
        return true;
    }
    async inc(key) {
        return await client.incr(key);
    }
    async decr(key) {
        return await client.decr(key);
    }
    blockListTokenId(userId, tokenId) {
        return `blackList::${userId}::${tokenId}`;
    }
    getOTPkey(email, type) {
        return `otp::${email}::${type}`;
    }
    getOTPReqNOkey(email, type) {
        return `otp::${email}::${type}::NO`;
    }
    getOTPReqBlockkey(email, type) {
        return `otp::${email}::${type}::blocked`;
    }
    get2FALoginKey(email, type) {
        return `otp::${email}::${type}`;
    }
    get2FaOtpKey(email) {
        return `2fa::${email}`;
    }
    confirmEmailKey(email) {
        return `confirmEmail::${email}`;
    }
}
export default new RedisService();
