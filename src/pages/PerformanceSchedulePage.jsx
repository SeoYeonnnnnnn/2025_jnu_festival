import React, { useState } from "react";
import { stageSchedule } from "../data/stageSchedule";

function PerformanceSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(stageSchedule[0].date);

  const current = stageSchedule.find((day) => day.date === selectedDate);

  // 시간 순 정렬
  const sortedEvents = [...current.events].sort((a, b) => 
    a.time.localeCompare(b.time)
  );

  // 시간대별 그룹핑
  const groupedEvents = sortedEvents.reduce((acc, event) => {
    if (!acc[event.time]) {
      acc[event.time] = [];
    }
    acc[event.time].push(event);
    return acc;
  }, {});

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">무대 스케줄</h1>

      {/* 날짜 선택 */}
      <div className="flex gap-4 mb-8">
        {stageSchedule.map((day) => (
          <button
            key={day.date}
            onClick={() => setSelectedDate(day.date)}
            className={`px-4 py-2 rounded ${
              day.date === selectedDate
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {day.date}
          </button>
        ))}
      </div>

      {/* 시간대별 출력 */}
      {Object.keys(groupedEvents).map((time) => (
        <div key={time} className="mb-8">
          <h2 className="text-xl font-bold text-blue-600 mb-4">{time}</h2>
          
          {groupedEvents[time].map((event, idx) => (
            event.type === "celebrity" ? (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-4 flex flex-col items-center mb-4"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-bold">{event.name}</h3>
                <p>{event.place}</p>
              </div>
            ) : (
              <div
                key={idx}
                className="bg-gray-100 p-4 rounded flex justify-between mb-2"
              >
                <span>{event.name}</span>
                <span>{event.place}</span>
              </div>
            )
          ))}
        </div>
      ))}
    </div>
  );
}

export default PerformanceSchedulePage;
