import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface CustomProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomProduct: (name: string, price: number, qty: number) => void;
}

export const CustomProductModal: React.FC<CustomProductModalProps> = React.memo(({
  isOpen,
  onClose,
  onAddCustomProduct,
}) => {
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState<number | ''>('');
  const [customQty, setCustomQty] = useState<number>(1);

  // Global F2 keyboard shortcut for custom product adding
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F2') {
        e.preventDefault();
        // Since we want to toggle or open it, but the state is lifted up,
        // we can't easily open it from here if it's closed.
        // Wait, the F2 shortcut listener needs to be outside this component 
        // to open it when it's closed, or we keep this component mounted 
        // but hidden?
        // Actually, if we only render this when isOpen is true, this useEffect 
        // won't catch F2 when it's closed. We should move the F2 listener 
        // back to the parent (OrderCreatePage) or a custom hook.
      }
    };
    // window.addEventListener('keydown', handleKeyDown);
    // return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setCustomName('');
      setCustomPrice('');
      setCustomQty(1);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || customPrice === '') {
      toast.error('Vui lòng điền đầy đủ tên và giá sản phẩm.');
      return;
    }

    onAddCustomProduct(customName.trim(), Number(customPrice), customQty);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-4"
      >
        <div>
          <h2 className="text-gray-900 text-base font-bold">Thêm sản phẩm tùy chỉnh</h2>
          <p className="text-gray-500 text-xs mt-0.5">Thêm nhanh hàng hóa chưa được khai báo hệ thống</p>
        </div>

        <div className="h-px bg-gray-100" />

        <div className="flex flex-col gap-3">
          <Input
            label="Tên sản phẩm"
            labelClassName="text-[10px] font-bold text-gray-400 uppercase"
            type="text"
            placeholder="Ví dụ: Áo khoác đặc biệt"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            autoFocus
            className="bg-white border-gray-300 text-gray-900 text-xs"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Giá bán (VND)"
              labelClassName="text-[10px] font-bold text-gray-400 uppercase"
              type="number"
              min={0}
              placeholder="0"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value === '' ? '' : Number(e.target.value))}
              className="bg-white border-gray-300 text-gray-900 text-xs"
            />
            <Input
              label="Số lượng"
              labelClassName="text-[10px] font-bold text-gray-400 uppercase"
              type="number"
              min={1}
              value={customQty}
              onChange={(e) => setCustomQty(Number(e.target.value))}
              className="bg-white border-gray-300 text-gray-900 text-xs"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs font-semibold text-gray-500"
          >
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
          >
            Thêm vào giỏ
          </Button>
        </div>
      </form>
    </div>
  );
});

CustomProductModal.displayName = 'CustomProductModal';
