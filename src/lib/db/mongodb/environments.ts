export const mongodb_uris = {
  admin: `mongodb://${process.env.MONGODB_ADMIN_ID}:${process.env.MONGODB_ADMIN_PW}@${process.env.MONGODB_URI}`,
  ishgard: `mongodb://${process.env.MONGODB_ID}:${process.env.MONGODB_PW}@${process.env.MONGODB_URI}`,
  test: `mongodb://${process.env.MONGODB_TEST_ID}:${process.env.MONGODB_TEST_PW}@${process.env.MONGODB_URI}/?authMechanism=DEFAULT&authSource=test`,
};
