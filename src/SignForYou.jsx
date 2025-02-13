import React, { useState, useEffect, useCallback, memo } from "react";
import data from "./Data.json";
import "./SignForYou.css";

const SignForYou = memo(() => {
  const [currentEntry, setCurrentEntry] = useState(null);
  const [currentVideoLink, setCurrentVideoLink] = useState("");

  const getRandomEntry = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * data.content.length);
    return data.content[randomIndex];
  }, []);

  const updateContent = useCallback(() => {
    const newEntry = getRandomEntry();
    const videos = newEntry[3] || [];
    const randomVideo = videos.length > 0 
      ? videos[Math.floor(Math.random() * videos.length)]
      : "";
    
    setCurrentEntry(newEntry);
    setCurrentVideoLink(randomVideo);
  }, [getRandomEntry]);

  useEffect(() => {
    updateContent();
  }, [updateContent]);

  const handleNewEntry = () => {
    updateContent();
  };

  const handleVideoClick = useCallback(() => {
    window.open(currentVideoLink, "_blank", "noopener,noreferrer");
  }, [currentVideoLink]);

  if (!currentEntry) return null;

  return (
    <div className="container">
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

      <div className="contentBox">
        <div className="typeBadge">
          {currentEntry[0] === "ayah" ? "📖 Quran Ayah" : "📚 Hadith"}
        </div>
        <h2 className="reference">{currentEntry[1]}</h2>
        <p className="text">{currentEntry[2]}</p>

        {currentVideoLink && (
          <div className="videoSection">
            <p>Feeling more Islamic? Watch This Video Sign</p>
            <button 
              className="watchButton"
              onClick={handleVideoClick}
            >
              Watch Me Now
            </button>
          </div>
        )}
      </div>

      <button className="refreshButton" onClick={handleNewEntry}>
        🌙 One More Blessing 🌙
      </button>

      <footer className="footer">
        <div>Credit : Allah (SWT)</div>
      </footer>
    </div>
  );
});

export default SignForYou;