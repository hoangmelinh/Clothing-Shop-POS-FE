import React from 'react';

interface AIRecommendationsProps {
  recommendations: any[];
  onAddRecommended: (productId: number) => void;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = React.memo(({
  recommendations,
  onAddRecommended,
}) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-3.5 flex flex-col gap-2 flex-shrink-0 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
          <span className="material-symbols-outlined text-[18px] text-indigo-500 animate-pulse">auto_awesome</span>
          <span>AI gợi ý mua kèm</span>
        </div>
        <span className="text-[10px] text-gray-400 font-semibold">Nhấn để thêm nhanh vào đơn</span>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {recommendations.map((recItem: any) => {
          const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(recItem.minPrice);

          return (
            <div
              key={recItem.productId}
              onClick={() => onAddRecommended(recItem.productId)}
              className="flex-shrink-0 w-[240px] bg-gray-50/50 hover:bg-indigo-50/20 border border-gray-100 hover:border-indigo-200 hover:shadow-sm rounded-xl p-2 flex gap-2.5 items-center cursor-pointer transition-all duration-200 relative group"
            >
              {/* Image */}
              <div className="w-10 h-12 bg-white rounded border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                {recItem.imageUrls && recItem.imageUrls.length > 0 ? (
                  <img
                    src={recItem.imageUrls[0]}
                    alt={recItem.productName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-gray-300 text-lg">checkroom</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h5 className="text-[11px] font-bold text-gray-800 truncate group-hover:text-indigo-600 transition-colors" title={recItem.productName}>
                  {recItem.productName}
                </h5>
                <p className="text-[9px] text-gray-400 font-semibold truncate mt-0.5">{recItem.categoryName}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] font-black text-indigo-600">{formattedPrice}</span>
                  {recItem.confidence !== null ? (
                    <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[10px]">insights</span>
                      {Math.round(recItem.confidence * 100)}%
                    </span>
                  ) : (
                    <span className="text-[9px] font-extrabold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[10px]">trending_up</span>
                      Bán chạy
                    </span>
                  )}
                </div>
              </div>

              {/* Hover Quick Add Indicator */}
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md">
                <span className="material-symbols-outlined text-[14px] font-bold">add</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

AIRecommendations.displayName = 'AIRecommendations';
