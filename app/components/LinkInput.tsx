// "use client";
// import React, { useState } from "react";

// const LinkInput = () => {
//   const [link, setLink] = useState("");

//   const handleLinkChange = (e: any) => {
//     setLink(e.target.value);
//   };

//   const handleLinkSubmit = async (e: any) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/webscrape", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ url: link }),
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <input
//         onChange={handleLinkChange}
//         type="text"
//         placeholder="Enter a link URL"
//       />
//           <button onSubmit={handleLinkSubmit}>Add Link</button>

//           {/* Display the scraped data here */}
//           <p>{}</p>
//     </div>
//   );
// };

// export default LinkInput;

"use client";
import React, { useState } from "react";

const LinkInput = () => {
  const [link, setLink] = useState("");
  const [scrapedData, setScrapedData] = useState("");

  const handleLinkChange = (e: any) => {
    setLink(e.target.value);
  };

  const handleLinkSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/webscrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: link }),
      });

      const data = await response.json();
      setScrapedData(data); // Adjust based on the structure of returned data
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <input
        className="w-[700px] h-[50px] rounded-xl p-3"
        onChange={handleLinkChange}
        type="text"
        placeholder="Enter a link URL"
      />
      <button
        className="w-[110px] bg-blue-600 text-white p-2 rounded-xl mt-4 hover:bg-blue-800 hover:shadow-xl duration-500"
        onClick={handleLinkSubmit}
      >
        Add Link
      </button>

      {/* Display the scraped data here */}
      <h1 className="text-center font-bold text-2xl mb-2">The Scraped Data</h1>
      <p className="w-[900px] justify-center text-justify mt-4 bg-white p-4 rounded-md">
        {scrapedData}
      </p>
    </div>
  );
};

export default LinkInput;

// "use client";
// import React, { useState } from "react";

// const LinkInput = () => {
//   const [link, setLink] = useState("");
//   const [scrapedData, setScrapedData] = useState("");

//   const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setLink(e.target.value);
//   };

//   const handleLinkSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/webscrape", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ url: link }),
//       });

//       const data = await response.json();
//       if (typeof data === "object") {
//         setScrapedData(JSON.stringify(data, null, 2)); // Convert object to a formatted string
//       } else {
//         setScrapedData(data);
//       }
//     } catch (error) {
//       console.log(error);
//       setScrapedData("An error occurred while scraping the data.");
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center w-full h-screen">
//       <input
//         className="w-[700px] h-[50px] rounded-xl p-3"
//         onChange={handleLinkChange}
//         type="text"
//         placeholder="Enter a link URL"
//       />
//       <button
//         className="w-[110px] bg-blue-600 text-white p-2 rounded-xl mt-4 hover:bg-blue-800 hover:shadow-xl duration-500"
//         onClick={handleLinkSubmit}
//       >
//         Add Link
//       </button>

//       {/* Display the scraped data here */}
//       <h1 className="text-center font-bold text-2xl mb-2">The Scraped Data</h1>
//       <pre className="w-[900px] justify-center text-justify mt-4 bg-white p-4 rounded-md overflow-x-auto">
//         {scrapedData}
//       </pre>
//     </div>
//   );
// };

// export default LinkInput;
