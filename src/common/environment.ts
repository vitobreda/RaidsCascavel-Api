export const environment = {
  server: { port: process.env.SERVER_PORT || 3000 },
  db: { url: process.env.DB_URL || "mongodb+srv://vitobreda:raidscascavel@cluster0.pgfsf.mongodb.net/RaidsCascavel?retryWrites=true&w=majority" },
  security: {
    saltRounds: process.env.SALT_ROUND || 10,
    apiSecret: process.env.API_SCRET || "RaidsCascavelSecret",
  },
};
