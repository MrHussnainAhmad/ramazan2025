import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./SignForYou.css";
const SignForYou = () => {
  const [data, setData] = useState(null);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [currentVideoLink, setCurrentVideoLink] = useState("");

  // Load Data.json asynchronously
  useEffect(() => {
    import("./Data.json").then((module) => setData(module.default));
  }, []);

  // Memoize function to get a random entry
  const getRandomEntry = useCallback(() => {
    if (!data || !data.content?.length) return null;
    const randomIndex = Math.floor(Math.random() * data.content.length);
    return data.content[randomIndex];
  }, [data]);

  // Update the content (without unnecessary re-renders)
  const updateContent = useCallback(() => {
    const newEntry = getRandomEntry();
    if (!newEntry) return;

    const videos = newEntry[3] || [];
    setCurrentEntry(newEntry);
    setCurrentVideoLink(videos.length ? videos[Math.floor(Math.random() * videos.length)] : "");
  }, [getRandomEntry]);

  // Load initial content once data is available
  useEffect(() => {
    if (data) updateContent();
  }, [data, updateContent]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="container">
      <div>Ramazan Mubarak!</div>
      <header className="header">
        <h1 className="heading">A Sign For You</h1>
      </header>

      <div className="palestineBanner">
        <div className="redBanner">🕊️ Pray for Palestine 🕊️</div>
        <div className="blackBanner">✊ Your Boycott Matters ✊</div>
      </div>

      <div className="daroodContainer">
        <p className="arabicText">﷽</p>
        <p className="daroodText">
          صَلَّى اللَّهُ عَلَى مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ
        </p>
      </div>

      {currentEntry && (
        <div className="contentBox">
          <div className="typeBadge">
            {currentEntry[0] === "ayah" ? "📖 Quran Ayah" : "📚 Hadith"}
          </div>
          <h2 className="reference">{currentEntry[1]}</h2>
          <p className="text">{currentEntry[2]}</p>

          {currentVideoLink && (
            <div className="videoSection">
              <p>Feeling more Islamic? Watch This Video Sign</p>
              <button className="watchButton" onClick={() => window.open(currentVideoLink, "_blank", "noopener,noreferrer")}>
                Watch Me Now
              </button>
            </div>
          )}
        </div>
      )}

      <button className="refreshButton" onClick={updateContent}>
        🌙 More Blessing? 🌙
      </button>

      <footer className="footer">
        <div>Credit : Allah (SWT)</div>
      </footer>
    </div>
  );
};

export default SignForYou;
