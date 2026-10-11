import Redis from "ioredis";

const redis = new Redis("redis://default:S71E0PGNxIUEnAcGyzvuKp0wsMN9TeUx@mint-daughter-skate-23070.db.redis.io:13121");

export const saveOTP = async (email, otp) => {
  await redis.set(`otp:${email}`, otp, "EX", 300);
};

export const getOTP = async (email) => {
  return await redis.get(`otp:${email}`);
};

export const deleteOTP = async (email) => {
  await redis.del(`otp:${email}`);
};

export default redis;