import { GoogleGenerativeAI } from "@google/generative-ai";
import API_CONFIG from "../constant/config";


const apiKey = API_CONFIG.geminiAPI;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
  });
// Configuration options for AI processing
const generationConfig = {
    maxOutputTokens: 1000,
    temperature: 1, // Adjust for desired creativity
};

export const getResponse = async (Data) => {
    try {
        const prompt = `Kamu adalah seorang asisten untuk menentukan UV Index. 
        Berikan penjelasan singkat berdasarkan data yang diberikan: ${Data}. 
        Berdasarkan waktu yang diberikan kamu bisa menentukan pagi, siang, sore, atau malam. 
        Jangan gunakan kata hari ini jika data nya berupa ramalan.
        Berikan tingkat keamanan serta saran untuk mengurangi risiko yang tidak diinginkan. 
        jawab sesingkat mungkin dan jangan gunakan simbol apapun. Gunakan bahasa semi formal`;
        const chatSession = model.startChat(generationConfig);
        const result = await chatSession.sendMessage(prompt);
        const aiResponse = result.response.text();
        console.log("AI Response:", aiResponse);
        return aiResponse;
    } catch (error) {
        console.error("Error generating AI response:", error);
    }
};
