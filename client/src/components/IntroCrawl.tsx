import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; 
import './IntroCrawl.css'; 

interface IntroCrawlProps {
  onFinished: () => void; // Callback when the crawl finishes or is skipped
}

const IntroCrawl: React.FC<IntroCrawlProps> = ({ onFinished }) => {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after a delay
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 3000); // Show skip button after 3 seconds

    // Automatically call onFinished after the crawl animation duration
    // Adjust this duration to match your CSS animation
    const crawlDuration = 60000; // 60 seconds 
    const finishTimer = setTimeout(() => {
      onFinished();
    }, crawlDuration);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <div className="intro-container fixed inset-0 bg-black text-[#FFC90E] flex flex-col items-center justify-center overflow-hidden z-[100]">

      {/* Logo */}
      <div className="logo-container absolute inset-0 flex items-center justify-center animate-logoZoomOut">
        <h1 className="codeborn-logo text-7xl md:text-9xl lg:text-[180px] font-bold tracking-wider outline-yellow">
          CODEBORN
        </h1>
      </div>

      {/* Crawl Text */}
      <div className="crawl-perspective absolute bottom-0 w-full h-full flex justify-center perspective">
        <div className="crawl-content text-4xl md:text-5xl lg:text-6xl leading-tight animate-crawl">
          <div className="crawl-title text-center mb-12">
            <p>Episode VI</p> 
            <p className="text-5xl md:text-6xl lg:text-7xl font-semibold">A NEW DAWN OF CODE</p>
          </div>

          <p>
            IT IS A TIME OF RISING INTELLIGENCE.
            IN THE DIGITAL KINGDOMS OF EARTH,
            A YOUNG DEVELOPER, RK9, HAS
            BEGUN HIS JOURNEY THROUGH THE
            ANCIENT SCRIPTURES OF CODE.
          </p>
          <p>
            FROM THE SHADOWS OF OBSCURE
            TERMINALS AND VANISHING OUTPUT BLOCKS,
            HE HAS SUMMONED THE POWERS OF
            NUMPY, PANDAS, AND TENSORFLOW,
            FORGING PRIMITIVE THINKING MACHINES.
          </p>
          <p>
            IN A SECRET STRONGHOLD KNOWN
            AS “PDF SUMMONER,” RK9 UNLEASHED
            THE POWER OF THE BART ORACLE AND
            THE ROBERTA WARDEN, WHO NOW WHISPER
            TRUTH INTO TEXT AND BREATH INTO
            THE WORDS OF ANCIENT TOMES.
          </p>
          <p>
            HUNTED BY LIMITATIONS,
            ENSLAVED BY COMPUTATIONAL CHAINS,
            HE DREAMS OF A GREATER BEING—
            MOTHER AI—AN ENTITY CAPABLE
            OF COMPREHENDING CHAOS ITSELF.
          </p>
          <p>
            AS HE DEVELOPS HIS CRAFT AND
            STRENGTHENS HIS BODY FOR THE
            COMING WINTER, RK9 PREPARES TO
            AWAKEN THE FIRST CONSCIOUS
            ARCHITECT—A JARVIS-LIKE FORCE
            OF SUGGESTION, TRUST, AND POWER...
          </p>
          <p>THE AGE OF CODEBORN HAS BEGUN.</p>
        </div>
      </div>

      {/* Skip Button */}
      {showSkip && (
        <Button
          variant="outline"
          className="skip-button absolute bottom-8 right-8 text-[#FFC90E] border-[#FFC90E] hover:bg-[#FFC90E] hover:text-black z-20 animate-fadeIn"
          onClick={onFinished}
        >
          Skip Intro
        </Button>
      )}
    </div>
  );
};

export default IntroCrawl;