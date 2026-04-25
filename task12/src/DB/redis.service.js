import { client } from "./redis.connection.js";

export async function set({ key, value, expire }) {
  const options = expire && expire > 0 ? { EX: Math.floor(expire) } : {};
  return await client.set(key, value, options);
}
export async function get(key) {
  return await client.get(key);
}
export async function mget(keys) {
  return await client.mGet(keys);
}
export async function del(key) {
  return client.del(key);
}
export async function exist(key) {
  return await client.exists(key);
}
export async function expire(key, expire) {
  return await client.expire(key, expire);
}
export async function ttl(key) {
  return await client.ttl(key);
}
export async function persist(key) {
  return await client.persist(key);
}
export async function update(key, value) {
  if (!(await exist(key))) {
    return false;
  }
  await set({ key, value });
  return true;
}
export function blockListTokenId(userId, TokenId) {
  return `blackList::${userId}::${TokenId}`;
}
