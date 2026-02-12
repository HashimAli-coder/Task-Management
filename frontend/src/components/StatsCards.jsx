import React from "react";

const StatsCards = ({ stats }) => {
  const { total, completed, pending, overdue } = stats;

  const cardData = [
    { title: "Total Tasks", value: total, color: "bg-blue-500" },
    { title: "Completed", value: completed, color: "bg-green-500" },
    { title: "Pending", value: pending, color: "bg-yellow-500" },
    { title: "Overdue", value: overdue, color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cardData.map((card) => (
        <div
          key={card.title}
          className={`${card.color} text-white p-4 rounded shadow-md flex flex-col items-center`}
        >
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="text-2xl font-bold">{card.value ?? 0}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
