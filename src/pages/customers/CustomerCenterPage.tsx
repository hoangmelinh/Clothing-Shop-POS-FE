import React from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerCenterPage() {
  const navigate = useNavigate();

  return (
    // Phần div ngoài cùng (Bao bọc tất cả)
    <div className="w-full max-w-7xl mx-auto bg-transparent p-4 md:p-8">
      {/* --- PHẦN HEADER TIÊU ĐỀ --- */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">
          Trung tâm Khách hàng
        </h2>
        <p className="text-xs text-gray-400 mt-1.5 font-medium">
          Lựa chọn phân hệ chức năng CRM để xử lý nghiệp vụ bán hàng tại quầy
        </p>
      </div>

      {/* --- PHẦN DANH SÁCH CÁC THẺ (GRID CARDS) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 1: QUẢN LÝ KHÁCH HÀNG */}
        <div
          onClick={() => navigate("/customers/list")}
          className="group bg-white rounded-2xl border border-gray-200/70 p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-[#0f5a3e] rounded-xl flex items-center justify-center text-xl shadow-sm transition-transform group-hover:scale-105">
              <i className="fa-solid fa-address-book"></i>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-1.5">
                Quản lý Khách hàng
                <i className="fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#0f5a3e]"></i>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                Tra cứu hồ sơ cá nhân, lịch sử đơn hàng, xem chi tiết công nợ và
                quản lý trạng thái tài khoản khách hàng.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] font-mono font-semibold text-gray-400">
            <span>Endpoint: /customers/list</span>
            <span className="text-[#0f5a3e] bg-emerald-50 px-2 py-0.5 rounded font-sans font-bold">
              128 khách
            </span>
          </div>
        </div>

        {/* CARD 2: NHÓM KHÁCH HÀNG */}
        <div
          onClick={() => navigate("/customers/groups")}
          className="group bg-white rounded-2xl border border-gray-200/70 p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shadow-sm transition-transform group-hover:scale-105">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-1.5">
                Nhóm khách hàng
                <i className="fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-600"></i>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                Cấu hình chỉ tiêu phân lớp phân hạng tự động theo luồng tích lũy
                chi tiêu: ĐỒNG, BẠC, VÀNG.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] font-mono font-semibold text-gray-400">
            <span>Endpoint: /customers/groups</span>
            <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-sans font-bold">
              3 Hạng định sẵn
            </span>
          </div>
        </div>

        {/* CARD 3: CHĂM SÓC KHÁCH HÀNG */}
        <div
          onClick={() => navigate("/customers/care")}
          className="group bg-white rounded-2xl border border-gray-200/70 p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm transition-transform group-hover:scale-105">
              <i className="fa-solid fa-headset"></i>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-1.5">
                Chăm sóc Khách hàng
                <i className="fa-solid fa-arrow-right text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-purple-600"></i>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                Xử lý danh sách gọi điện theo phễu chiến dịch: Chăm sóc sau bán
                7 ngày, kích hoạt khách ngủ đông quá 30 ngày.
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] font-mono font-semibold text-gray-400">
            <span>Endpoint: /customers/care</span>
            <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded font-sans font-bold">
              CRM Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
