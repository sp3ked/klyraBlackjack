import React from 'react';

const Stats = ({ 
  wins = 0, 
  losses = 0, 
  pushes = 0, 
  blackjacks = 0 
}) => {
  const total = wins + losses + pushes;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
  
  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 text-white">
      <h3 className="text-lg font-bold mb-2">Game Statistics</h3>
      
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <div className="bg-green-800 bg-opacity-50 p-2 rounded">
          <div className="text-xl font-bold">{wins}</div>
          <div className="text-sm">Wins</div>
        </div>
        
        <div className="bg-red-800 bg-opacity-50 p-2 rounded">
          <div className="text-xl font-bold">{losses}</div>
          <div className="text-sm">Losses</div>
        </div>
        
        <div className="bg-yellow-700 bg-opacity-50 p-2 rounded">
          <div className="text-xl font-bold">{pushes}</div>
          <div className="text-sm">Pushes</div>
        </div>
        
        <div className="bg-purple-800 bg-opacity-50 p-2 rounded">
          <div className="text-xl font-bold">{blackjacks}</div>
          <div className="text-sm">Blackjacks</div>
        </div>
      </div>
      
      {total > 0 && (
        <div className="mt-2 text-sm">
          Win Rate: {winRate}% ({wins} of {total} games)
        </div>
      )}
    </div>
  );
};

export default Stats;