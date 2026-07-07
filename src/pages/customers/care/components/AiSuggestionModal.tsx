import React, { useState, useRef, useEffect } from 'react';
import type { AiSuggestionResponseDto } from '@/types/customer.types';

interface AiSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  aiData?: AiSuggestionResponseDto;
  error?: any;
}

export default function AiSuggestionModal({ isOpen, onClose, isLoading, aiData, error }: AiSuggestionModalProps) {
  const [activeTab, setActiveTab] = useState<'call' | 'sms' | 'objection'>('call');

  // Dragging logic
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      // Đặt vị trí mặc định ở góc phải trên
      setPosition({
        x: Math.max(20, window.innerWidth - 480),
        y: 80
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      // Ngăn bôi đen chữ khi kéo
      e.preventDefault();
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const formatAiText = (text?: string) => {
    if (!text) return null;

    // Xử lý các ký tự \n dạng chuỗi literal từ backend thành ký tự xuống dòng thật
    const unescaped = text.replace(/\\n/g, '\n');

    // Tách thành các đoạn văn bằng cách dùng 2 dấu xuống dòng liên tiếp
    const paragraphs = unescaped.split(/\n\s*\n/);

    return (
      <div className="space-y-4">
        {paragraphs.map((p, i) => {
          if (!p.trim()) return null;
          // Tách các dòng trong một đoạn
          const lines = p.split('\n');
          return (
            <div key={i} className="bg-white p-4 rounded-xl border border-indigo-50/60 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)] leading-relaxed text-[13.5px]">
              {lines.map((line, j) => {
                if (!line.trim()) return null;
                
                // Loại bỏ emoji để kiểm tra chữ
                const cleanLine = line.replace(/[\u1000-\uFFFF]/g, '').trim();
                // Kiểm tra xem dòng có chứa chữ cái (bao gồm tiếng Việt) hay không
                const hasLetters = /[a-zA-ZÀ-ỹ]/.test(cleanLine);
                
                // Một dòng được coi là header nếu: có chữ cái, ngắn hơn 70 ký tự, và viết hoa toàn bộ
                const isHeader = hasLetters && cleanLine.length < 70 && cleanLine === cleanLine.toUpperCase();

                return (
                  <div key={j} className={`${j > 0 ? 'mt-2' : ''} ${isHeader ? 'font-bold text-indigo-700 text-[14.5px] flex items-center gap-1.5 pb-1 border-b border-indigo-50/50 mb-2.5' : 'text-gray-700'}`}>
                    {line}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  if (!isOpen) return null;

  const handleCopySms = () => {
    if (aiData?.smsTemplate) {
      navigator.clipboard.writeText(aiData.smsTemplate);
      alert('Đã copy mẫu tin nhắn!');
    }
  };

  return (
    <div
      className="fixed z-50 bg-white w-full max-w-[550px] rounded-2xl border border-indigo-200 shadow-2xl overflow-hidden flex flex-col h-fit max-h-[85vh] transition-opacity duration-300"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {/* Header (Khu vực có thể kéo) */}
      <div
        className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-purple-100 to-indigo-100 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <h2 className="text-sm font-bold text-indigo-900 flex items-center gap-2 pointer-events-none">
          <i className="fa-solid fa-robot text-indigo-600"></i>
          AI Gợi ý kịch bản (Kéo thả)
        </h2>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="text-gray-500 hover:text-red-500 transition-colors bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm cursor-pointer"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          type="button"
          className={`flex-1 py-3 font-medium text-sm transition-colors ${activeTab === 'call' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('call')}
        >
          Kịch bản gọi điện
        </button>
        <button
          type="button"
          className={`flex-1 py-3 font-medium text-sm transition-colors ${activeTab === 'sms' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('sms')}
        >
          Tin nhắn
        </button>
        <button
          type="button"
          className={`flex-1 py-3 font-medium text-sm transition-colors ${activeTab === 'objection' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('objection')}
        >
          Xử lý từ chối
        </button>
      </div>

      {/* Content */}
      <div className="p-5 bg-gray-50 flex-1 overflow-y-auto min-h-[250px]">
        {isLoading ? (
          <div className="animate-pulse flex flex-col gap-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-4"></div>
            <div className="text-sm text-gray-400 mt-4 italic text-center">AI đang soạn kịch bản, vui lòng chờ trong giây lát...</div>
          </div>
        ) : error ? (
          <div className="text-rose-500 font-medium text-sm bg-rose-50 p-4 rounded-xl border border-rose-100">
            Đã xảy ra lỗi khi gọi AI. Có thể API backend chưa sẵn sàng hoặc lỗi cấu hình.
            <br />
            <span className="text-xs text-rose-400 mt-2 block">
              {typeof error === 'string'
                ? error
                : String((error as any)?.data?.message || (error as any)?.error || (error as any)?.message || "Lỗi không xác định")}
            </span>
          </div>
        ) : (
          <div className="text-gray-700 leading-relaxed text-sm">
            {activeTab === 'call' && (aiData?.callScript ? formatAiText(aiData.callScript) : 'Chưa có gợi ý kịch bản.')}

            {activeTab === 'sms' && (
              <div className="relative">
                {aiData?.smsTemplate ? formatAiText(aiData.smsTemplate) : <div className="bg-white p-4 border border-indigo-100/50 rounded-lg shadow-sm text-sm">Chưa có mẫu tin nhắn.</div>}

                {aiData?.smsTemplate && (
                  <button
                    type="button"
                    onClick={handleCopySms}
                    className="mt-4 w-full justify-center bg-blue-50 text-blue-600 px-3 py-2.5 rounded-xl hover:bg-blue-100 transition-colors font-bold flex items-center gap-2 border border-blue-200/50"
                  >
                    <i className="fa-regular fa-copy"></i> Copy tin nhắn
                  </button>
                )}
              </div>
            )}

            {activeTab === 'objection' && (aiData?.objectionHandling ? formatAiText(aiData.objectionHandling) : 'Chưa có thông tin xử lý từ chối.')}
          </div>
        )}
      </div>
    </div>
  );
}
