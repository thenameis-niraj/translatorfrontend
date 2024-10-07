import React, { useState, useEffect } from "react";

const Translator = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en"); // Default to English
  const [targetLang, setTargetLang] = useState("hi"); // Default to Hindi
  const [languages, setLanguages] = useState([]); // For storing available languages

  // Fetch available languages from the backend
  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await fetch("http://localhost:3000/api/languages");
      const data = await response.json();
      const languageList = Object.keys(data.translation).map((key) => ({
        code: key,
        name: data.translation[key].name,
      }));
      setLanguages(languageList);
    };

    fetchLanguages();
  }, []);

  const handleTranslate = async () => {
    const response = await fetch("http://localhost:3000/api/translate", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ text, source: sourceLang, target: targetLang }),
    });

    const data = await response.json();
    setTranslatedText(data.translatedText); // Adjusted based on backend response
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Translator</h1>

      {/* Language selection */}
      <div className="flex mt-4">
        <div className="mr-4">
          <label className="block mb-2">Source Language</label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Target Language</label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Text areas for input and translated text */}
      <div className="flex mt-4 w-full max-w-3xl">
        <textarea
          className="p-2 border border-gray-300 rounded w-1/2 mr-2"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />
        <textarea
          className="p-2 border border-gray-300 rounded w-1/2 ml-2"
          rows="4"
          value={translatedText}
          readOnly
          placeholder="Translated text"
        />
      </div>
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        onClick={handleTranslate}
      >
        Translate
      </button>
    </div>
  );
};

export default Translator;
