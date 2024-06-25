const HeartRate = require("../models/heartRateModel");
const dataProcessor = require("../services/processor");

exports.processHeartRate = async (req, res) => {
  try {
    const payload = req.body;
    const processedData = dataProcessor.processHeartRateData(payload);

    await HeartRate.bulkCreate(processedData);

    res.status(200).json({
      message: "Heart rate processed successfully",
      data: {
        ...payload,
        clinical_data: {
          ...payload.clinical_data,
          HEART_RATE: {
            ...payload.clinical_data.HEART_RATE,
            processedData,
          },
        },
      },
    });

  } catch (error) {
    console.error("Error processing heart rate data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
