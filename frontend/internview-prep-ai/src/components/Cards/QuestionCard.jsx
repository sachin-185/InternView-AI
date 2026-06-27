import React, { useRef, useState, useEffect } from "react";
import { LuChevronDown, LuSparkles, LuPin } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-[#111111]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 group">
      {/* Header */}
      <div 
        className="px-6 py-4 flex justify-between items-center cursor-pointer select-none group-hover:bg-white/[0.01] transition-colors"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-indigo-400 font-black text-sm shadow-inner ${isPinned ? 'bg-indigo-500/20' : 'bg-indigo-500/10'}`}>
            Q
          </div>
          <h3 className="font-bold text-white text-sm leading-relaxed max-w-xl">
            {question}
          </h3>
        </div>

        <div className="flex items-center gap-3">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setIsPinned(!isPinned);
                }}
                className={`p-2 rounded-lg transition-all ${isPinned ? 'text-indigo-400 bg-indigo-500/10' : 'text-gray-600 hover:text-indigo-400 hover:bg-indigo-500/10'}`}
                title={isPinned ? "Unpin Question" : "Pin Question"}
            >
                <LuPin size={16} className={isPinned ? "fill-indigo-400" : ""} />
            </button>

            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onLearnMore();
                }}
                className="px-4 py-1.5 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg transition-all hover:scale-105 flex items-center gap-2 font-bold text-[10px]"
            >
                <LuSparkles size={14} className="fill-cyan-400" />
                Explain
            </button>

            <div className={`p-1.5 rounded-lg bg-white/5 text-gray-500 transition-transform duration-300 ${isExpanded ? "rotate-180 text-indigo-400" : ""}`}>
                <LuChevronDown size={16} />
            </div>
        </div>
      </div>


      {/* Expandable Answer Section */}
      <div
        className="transition-all duration-500 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="px-6 pb-6 pt-1 text-gray-400 border-t border-white/5"
        >
          <div className="bg-white/[0.02] rounded-xl p-5 border border-white/5 shadow-inner text-sm leading-relaxed">
            <AIResponsePreview content={answer} />
          </div>
        </div>
      </div>
    </div>
  );


};

export default QuestionCard;
