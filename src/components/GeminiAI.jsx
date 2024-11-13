import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDUPBwoAiolIy1gkexRScIy69HdO6kqvjI";
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
        // Construct the prompt using the input data
        const prompt = `Kamu adalah seorang asisten untuk menentukan UV Index. Berikan penjelasan singkat berdasarkan data yang diberikan: ${Data}. Berdasarkan waktu yang diberikan kamu bisa menentukan pagi, siang, sore, atau malam. 
        Jangan gunakan kata hari ini jika data nya berupa ramalan.
        Berikan tingkat keamanan serta saran untuk mengurangi risiko yang tidak diinginkan. jawab sesingkat mungkin dan jangan gunakan simbol apapun, gunakan gaya bahasa yang cocok dengan gen Z`;

        // Generate a response from the model
        const chatSession = model.startChat(generationConfig);
        const result = await chatSession.sendMessage(prompt);
        const aiResponse = await result.response.text();
        // Retrieve the AI's response text

        console.log("AI Response:", aiResponse);
        return aiResponse;
    } catch (error) {
        console.error("Error generating AI response:", error);
    }
};
