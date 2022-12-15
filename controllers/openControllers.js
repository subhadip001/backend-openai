import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv"

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {

    const { prompt, size } = req.body;

    const imageSize = size === 'large' ? '1024x1024' : size === "small" ? "256x256" : "512x512"

    try {

        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: imageSize,
        });
        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            succes: true,
            url: imageUrl
        })



    } catch (error) {

        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        res.status(400).json({
            succes: false,
            error: "The image could not be generated"
        })
    }
}

export default generateImage