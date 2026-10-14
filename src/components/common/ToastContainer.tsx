import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#1A1A1A] text-[#FAF8F5] border border-[#333] shadow-xl p-3.5 flex items-center justify-between gap-3 text-xs tracking-wider animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'info' ? (
              <Info className="w-4 h-4 text-[#C5A880] shrink-0" />
            ) : (
              <Check className="w-4 h-4 text-[#C5A880] shrink-0" />
            )}
            <span className="font-medium text-[#FAF8F5]">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-[#9E9A91] hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
