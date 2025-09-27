import React from "react";

const notices = [
  {
    id: 1,
    title: "축제 시간 변경 안내",
    date: "2025-10-01",
    content: "지드래곤 방문이 21:00에서 21:30분으로 변경되었습니다.",
  },
  {
    id: 2,
    title: "푸드트럭 운영 시간 공지",
    date: "2025-10-01",
    content: "푸드트럭은 16시부터 23시까지 운영됩니다.",
  },
  {
    id: 3,
    title: "이용화장실 개방 안내",
    date: "2025-10-01",
    content: "화장실 이용 후 깨끗히 사용바랍니다."
  }
];

function NoticePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">공지사항</h1>
      <ul className="space-y-4">
        {notices.map((notice) => (
          <li key={notice.id} className="p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-semibold">{notice.title}</h2>
            <p className="text-gray-600 text-sm">{notice.date}</p>
            <p className="text-gray-800 mt-2">{notice.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoticePage;
