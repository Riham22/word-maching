import React, { useEffect, useState } from "react";

const Words = () => {
  const words = [
      { id: 1, word: "الأهرامات", meaning: "إحدى عجائب الدنيا السبع وتقع في الجيزة" },
      { id: 2, word: "النيل", meaning: "أطول نهر في العالم ويمر بمصر" },
      { id: 3, word: "القاهرة", meaning: "عاصمة مصر وأكبر مدنها" },
      { id: 4, word: "الإسكندرية", meaning: "مدينة ساحلية شهيرة وتضم مكتبة الإسكندرية" },
      { id: 5, word: "السد العالي", meaning: "سد مقام على نهر النيل في أسوان لتوليد الكهرباء" },
    ];
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // مؤقت 60 ثانية
  const [gameOver, setGameOver] = useState(false);

  

  // ✅ تشغيل المؤقت عند بدء اللعبة
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setGameOver(true); // ينتهي الجيم عند انتهاء الوقت
    }
  }, [timeLeft]);

  const handleDragStart = (e, word) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(word));
  };

  const handleDrop = (e, meaning) => {
    e.preventDefault();
    if (gameOver) return; // منع التفاعل بعد انتهاء الوقت

    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;

    const draggedWord = JSON.parse(data);

    if (draggedWord.meaning === meaning) {
      setMatchedPairs([...matchedPairs, draggedWord.word]);
      setScore((prev) => prev + 10);
    } else {
      setScore((prev) => (prev > 0 ? prev - 5 : 0));
    }
  };

  return (
    <>
    
      <div className="mx-auto text-center  w-[80%] text-xl font-medium text-gray-700 p-3 m-3 rounded-md border-[2px] border-solid border-gray-200">
      <div className="flex justify-between w-full max-w-md mb-4 text-lg font-bold">
        <span>⏳ الوقت: {timeLeft}s</span>
        <span>⭐ النقاط: {score}</span>
      </div>
        {words.map((word) => (
          <div className="" key={word.id}>
            
            <div className="grid grid-cols-2  ">
            <div className="bg-blue-50 flex flex-col  align-middle justify-center rounded-md m-2">
            <ul className="">
              <li className="my-2 p-2" onDrop={(e) => handleDrop(e, word.meaning)}
              onDragOver={(e) => e.preventDefault()}>
                {word.meaning}
              </li>
            </ul>
            </div>
            <div className="bg-red-50 rounded-md m-2 cursor-grabbing flex flex-col  align-middle justify-center  " draggable onDragStart={(e) => handleDragStart(e, word)}>
            <ul className=" ">
              <li className="my-2 p-2 " >
                {word.word}
              </li>
            </ul>
            </div>
            
            </div>
            
            
          </div>
        ))}
        {gameOver && (
        <div className="mt-4 text-red-500 font-bold text-xl">
          ⏰ انتهى الوقت! نقاطك: {score} ⭐
        </div>
      )}
      </div>
    </>
  );
};

export default Words;
