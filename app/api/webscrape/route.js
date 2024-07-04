// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import axios from "axios";
// import cheerio from "cheerio"; // Import cheerio directly without braces

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// const webScraping = async (url) => {
//   try {
//     // Fetch the HTML content of the provided URL
//     const { data } = await axios.get(url);

//     // Load the HTML into cheerio
//     const $ = cheerio.load(data);

//     // Extract the article content
//     let content = "";
//     $("article")
//       .find("p")
//       .each((i, el) => {
//         content += $(el).text() + " ";
//       });

//     return content; // Return the scraped content
//   } catch (error) {
//     console.error("Error fetching the article:", error);
//     return null;
//   }
// };

// export const POST = async (req) => {
//   try {
//     const { url } = await req.json();
//     const content = await webScraping(url); // Await the webScraping function

//     if (!content) {
//       return NextResponse.json(
//         { error: "Failed to scrape the content" },
//         { status: 500 }
//       );
//     }

//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//       generationConfig: { responseMimeType: "application/json" },
//     });
//     console.log(content);
//     const prompt = `
//       Generate 10 quiz questions with multiple-choice with single word choices on ${content} . The questions should follow this JSON schema:
//       [
//         {
//           "question": "String",
//           "choices": ["String", "String", "String", "String"],
//           "type": "MCQs",
//           "correctAnswer": "String"
//         }
//       ]
//       Each "question" field should contain the quiz question as a string. The "choices" field should be an array of four strings, each representing a possible answer. The "type" field should always be "MCQs". The "correctAnswer" field should contain the correct answer as a string.
//     `;

//     const result = await model.generateContent(prompt);

//     return NextResponse.json(
//       result.response.candidates[0].content.parts[0].text
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to generate content" },
//       { status: 500 }
//     );
//   }
// };

//2nd
// import { NextResponse } from "next/server";
// import axios from "axios";
// import cheerio from "cheerio";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// const webScraping = async (url) => {
//   try {
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);

//     let content = "";
//     $("article")
//       .find("p")
//       .each((i, el) => {
//         content += $(el).text() + " ";
//       });

//     return content.trim();
//   } catch (error) {
//     console.error("Error fetching the article:", error);
//     return null;
//   }
// };

// export const POST = async (req) => {
//   try {
//     const { url } = await req.json();
//     const content = await webScraping(url);

//     if (!content) {
//       return NextResponse.json(
//         { error: "Failed to scrape the content" },
//         { status: 500 }
//       );
//     }

//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//       generationConfig: { responseMimeType: "application/json" },
//     });

//     const prompt = `
//       Generate 10 quiz questions with multiple-choice with single word choices on ${content}. The questions should follow this JSON schema:
//       [
//         {
//           "question": "String",
//           "choices": ["String", "String", "String", "String"],
//           "type": "MCQs",
//           "correctAnswer": "String"
//         }
//       ]
//     `;

//     const result = await model.generateContent(prompt);

//     return NextResponse.json(
//       result.response.candidates[0].content.parts[0].text
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to generate content" },
//       { status: 500 }
//     );
//   }
// };

//3rd

// import { NextResponse } from "next/server";
// import axios from "axios";
// import cheerio from "cheerio";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// const webScraping = async (url) => {
//   try {
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);

//     // Attempt to extract the main content in a more flexible way
//     let content = "";
//     $("p").each((i, el) => {
//       content += $(el).text() + " ";
//     });

//     if (!content) {
//       $("div").each((i, el) => {
//         if ($(el).text().length > 100) {
//           content += $(el).text() + " ";
//         }
//       });
//     }

//     return content.trim() || "No relevant content found.";
//   } catch (error) {
//     console.error("Error fetching the article:", error);
//     return "Error fetching the article.";
//   }
// };

// export const POST = async (req) => {
//   try {
//     const { url } = await req.json();
//     const content = await webScraping(url);

//     if (!content) {
//       return NextResponse.json(
//         { error: "Failed to scrape the content" },
//         { status: 500 }
//       );
//     }

//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//       generationConfig: { responseMimeType: "application/json" },
//     });

//     const prompt = `
//       Generate 10 quiz questions with multiple-choice with single word choices on ${content}. The questions should follow this JSON schema:
//       [
//         {
//           "question": "String",
//           "choices": ["String", "String", "String", "String"],
//           "type": "MCQs",
//           "correctAnswer": "String"
//         }
//       ]
//     `;

//     const result = await model.generateContent(prompt);

//     return NextResponse.json(
//       result.response.candidates[0].content.parts[0].text
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to generate content" },
//       { status: 500 }
//     );
//   }
// };

//4th code
"use server";
import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const webScraping = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Remove common header and footer tags
    $("header, footer, nav").remove();

    // Attempt to extract the main content in a more flexible way
    let content = "";
    $("p").each((i, el) => {
      content += $(el).text() + " ";
    });

    if (!content) {
      $("div").each((i, el) => {
        if ($(el).text().length > 100) {
          content += $(el).text() + " ";
        }
      });
    }

    // Remove all whitespace characters
    content = content.replace(/\s+/g, " ");

    return content.trim() || "No relevant content found.";
  } catch (error) {
    console.error("Error fetching the article:", error);
    return "Error fetching the article.";
  }
};

export const POST = async (req) => {
  try {
    const { url } = await req.json();
    const content = await webScraping(url);
    console.log(content);

    if (!content) {
      return NextResponse.json(
        { error: "Failed to scrape the content" },
        { status: 500 }
      );
    }

    console.log("Trimmed Content: ", content);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = `
      Generate 5 quiz questions with multiple-choice with single word as choices based on ${content}. The questions should follow this JSON schema:
      [
        {
          "question": "String",
          "choices": ["String", "String", "String", "String"],
          "type": "MCQs",
          "correctAnswer": "String"
        }
      ]
    `;

    const result = await model.generateContent(prompt);

    return NextResponse.json(
      result.response.candidates[0].content.parts[0].text
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
};
