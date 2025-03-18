module.exports = {
    // Configuration constants
    REGION: "asia-south1",
    MONGO_URI: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@oceanacademy.atrtb.mongodb.net/?retryWrites=true&w=majority&appName=OceanAcademy`,
    MONGO_OPTIONS: { maxPoolSize: 20 }, // Connection Pooling
};
