import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCustomerByIdQuery } from "@/redux/api/customerApi";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, Column } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";

export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State quản lý việc chuyển đổi giữa 2 tab (Đơn hàng và Chăm sóc)
  const [activeTab, setActiveTab] = useState<"orders" | "care">("orders");

  // Mock data cho Bảng Đơn Hàng
  const mockOrders = [
    { id: "HD-20260620-010", date: "20/06/2026 14:30", total: 450000, status: "COMPLETED", items: "Áo Polo Nam x1, Quần Jean x1" },
    { id: "HD-20260515-002", date: "15/05/2026 09:15", total: 1200000, status: "COMPLETED", items: "Giày Sneaker x1, Túi xách x1" },
  ];

  const orderColumns: Column<typeof mockOrders[0]>[] = [
    { key: "id", header: "Mã Đơn", render: (row) => <span className="font-mono font-bold text-gray-900">{row.id}</span> },
    { key: "date", header: "Ngày Mua", className: "text-gray-500 text-xs" },
    { key: "items", header: "Sản Phẩm", render: (row) => <span className="text-gray-700 truncate max-w-[200px] block">{row.items}</span> },
    { key: "total", header: "Tổng Tiền", render: (row) => <span className="font-semibold text-emerald-600">{row.total.toLocaleString()}đ</span> },
    { key: "status", header: "Trạng Thái", render: (row) => <Badge variant="success">{row.status}</Badge> }
  ];

  // Gọi API lấy dữ liệu chi tiết
  const { data: responseData, isLoading, error } = useGetCustomerByIdQuery(
    id as string,
    {
      skip: !id,
    },
  );

  console.log("ID từ thanh URL là:", id);
  console.log("Kết quả API trả về:", responseData);
  console.log("Lỗi API (nếu có):", error);

  const customer = responseData?.data;

  // Hiệu ứng tải dữ liệu
  if (isLoading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center min-h-[500px]">
        <i className="fa-solid fa-spinner fa-spin text-blue-600 text-3xl"></i>
      </div>
    );
  }

  // Xử lý lỗi không tìm thấy
  if (!customer) {
    return (
      <div className="flex-1 p-6 flex flex-col items-center justify-center min-h-[500px] text-gray-500">
        <i className="fa-solid fa-user-xmark text-4xl mb-4 text-gray-300"></i>
        <h2 className="text-xl font-bold">Không tìm thấy khách hàng!</h2>
        <p className="mt-2 text-sm text-red-500">ID đang cố gắng lấy: <b>{id}</b></p>
        <Button
          variant="ghost"
          onClick={() => navigate("/customers")}
          className="mt-4"
          leftIcon={<i className="fa-solid fa-arrow-left"></i>}
        >
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  // Xử lý logic màu sắc Hạng thẻ
  const rankCode = customer.customerGroup?.code || "BRONZE";
  const rankVariant =
    rankCode === "GOLD"
      ? "warning"
      : rankCode === "SILVER"
        ? "default"
        : "info";

  return (
    <div className="flex-1 p-6 max-w-[1600px] mx-auto w-full">
      {/* HEADER */}
      <header className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-1">
            <button
              onClick={() => navigate("/customers")}
              className="hover:text-blue-600 transition"
            >
              Quản lý khách hàng
            </button>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span className="text-gray-900 font-semibold">Hồ sơ chi tiết</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <i className="fa-solid fa-user-check text-blue-600"></i> Hồ sơ khách
            hàng: {customer.fullName}
          </h1>
        </div>
      </header>

      {/* NỘI DUNG CHÍNH */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* CỘT TRÁI: THÔNG TIN CÁ NHÂN TỪ API */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 space-y-5 lg:col-span-1">
          <div className="flex flex-col items-center text-center pb-4 border-b border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-md uppercase">
              {customer.fullName.substring(0, 2)}
            </div>
            <h2 className="font-bold text-gray-900 text-base">
              {customer.fullName}
            </h2>
            <span className="text-[10px] text-gray-400 font-mono mt-0.5">
              Mã KH: #{customer.id}
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">
                Số điện thoại
              </label>
              <div className="font-mono text-sm font-bold text-gray-900">
                {customer.phone}
              </div>
            </div>
            <div>
              <label className="block text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">
                Ngày sinh / Giới tính
              </label>
              <div className="font-semibold text-gray-800 flex items-center gap-2 mt-1">
                {customer.dateOfBirth || "Chưa cập nhật"} —
                <Badge variant={customer.gender === "MALE" ? "info" : "danger"}>
                  {customer.gender}
                </Badge>
              </div>
            </div>
            <div>
              <label className="block text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">
                Địa chỉ
              </label>
              <div className="font-medium text-gray-800 leading-relaxed">
                {customer.address || "Chưa cập nhật"}
              </div>
            </div>
            <div>
              <label className="block text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">
                Hạng thẻ
              </label>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant={rankVariant as any}>{rankCode}</Badge>
                <span className="text-[11px] text-slate-600 font-bold tracking-wide">
                  · {customer.customerGroup?.name || "Khách thường"}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">
                Trạng thái hệ thống
              </label>
              <div className="mt-1">
                <Badge
                  variant={customer.status === "ACTIVE" ? "success" : "danger"}
                >
                  {customer.status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="block text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-0.5">
                Ngày tạo hồ sơ
              </label>
              <div className="font-mono text-gray-700 font-semibold">
                {new Date(customer.createdAt).toLocaleDateString("vi-VN")}
              </div>
            </div>

            {customer.note && (
              <div className="pt-3 border-t border-gray-100">
                <label className="block text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-1">
                  Ghi chú (note)
                </label>
                <div className="bg-amber-50/60 border border-amber-100/80 rounded-xl p-3 text-amber-800 italic font-medium leading-relaxed shadow-sm">
                  "{customer.note}"
                </div>
              </div>
            )}

            {/* VOUCHER TỪ API */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <label className="block text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-1">
                Kho Voucher của khách ({customer.vouchers?.length || 0})
              </label>

              {customer.vouchers?.map((voucher) => (
                <div
                  key={voucher.id}
                  className="relative bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/80 rounded-xl p-3 flex items-center justify-between shadow-sm overflow-hidden mb-2"
                >
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-4 bg-white border border-red-200 rounded-full"></div>
                  <div className="pl-2 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                        {voucher.voucherCode}
                      </span>
                      <Badge
                        variant={
                          voucher.status === "UNUSED" ? "success" : "default"
                        }
                      >
                        {voucher.status}
                      </Badge>
                    </div>
                    <div className="text-[12px] font-bold text-gray-900">
                      {voucher.voucherName}
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium">
                      HĐ từ {voucher.minOrderValue.toLocaleString()}đ
                    </div>
                  </div>
                  <div className="text-red-500/20 text-2xl pr-1">
                    <i className="fa-solid fa-ticket-simple"></i>
                  </div>
                </div>
              ))}

              {!customer.vouchers?.length && (
                <div className="text-center text-gray-400 italic text-[11px] py-4 bg-gray-50 rounded-lg border border-gray-100">
                  Không có voucher nào.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: TABS LỊCH SỬ ĐƠN HÀNG VÀ CHĂM SÓC */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden lg:col-span-3">
          {/* THANH TABS BẰNG STATE CỦA REACT */}
          <div className="border-b border-gray-200 bg-gray-50/60 flex text-sm font-semibold">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-3.5 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "orders"
                  ? "border-blue-600 text-blue-600 bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
              }`}
            >
              <i className="fa-solid fa-bag-shopping"></i> Lịch sử đơn hàng
              <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                2
              </span>
            </button>
            <button
              onClick={() => setActiveTab("care")}
              className={`px-6 py-3.5 border-b-2 transition-all flex items-center gap-2 ${
                activeTab === "care"
                  ? "border-blue-600 text-blue-600 bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
              }`}
            >
              <i className="fa-solid fa-heart-pulse"></i> Lịch sử chăm sóc
              (Timeline)
              <span className="bg-gray-200 text-gray-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                1
              </span>
            </button>
          </div>

          <div className="p-6">
            {/* CONTENT TAB: ĐƠN HÀNG SỬ DỤNG COMPONENT TABLE & PAGINATION */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <div className="mb-2 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Danh sách đơn hàng đã mua</h3>
                  <Button variant="outline" size="sm" leftIcon={<i className="fa-solid fa-plus"></i>}>
                    Tạo đơn mới
                  </Button>
                </div>
                
                <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <Table columns={orderColumns} data={mockOrders} />
                </div>
                
                <div className="flex justify-end pt-2">
                  <Pagination 
                    currentPage={0} 
                    totalPages={1} 
                    onPageChange={() => {}} 
                  />
                </div>
              </div>
            )}

            {/* CONTENT TAB: CHĂM SÓC (Hardcode HTML của bạn) */}
            {activeTab === "care" && (
              <div>
                {/* --- GIỮ NGUYÊN KHÚC HTML TIMELINE CHĂM SÓC Ở ĐÂY --- */}
                <div className="mb-5 text-[11px] text-gray-500 font-mono italic bg-gray-100/80 inline-block px-3 py-1 rounded-md border border-gray-200/60 shadow-sm">
                  <i className="fa-solid fa-code text-blue-500 mr-1"></i> Data
                  Binding: Page&lt;CareLogResponse&gt; (totalElements: 1)
                </div>

                <div className="relative border-l-[3px] border-slate-200 pl-6 ml-3 space-y-6">
                  <div className="relative group">
                    <span className="absolute -left-[33px] top-1.5 bg-emerald-500 w-[18px] h-[18px] rounded-full border-[3px] border-white ring-4 ring-emerald-50 transition-all duration-300 group-hover:ring-emerald-100 group-hover:scale-110 z-10"></span>
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-md hover:border-gray-300/80 transition-all duration-300">
                      <p className="font-medium text-gray-800 text-sm">
                        "Khách hài lòng với sản phẩm"
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Nhân viên: sale01 - Trạng thái: ANSWERED
                      </p>
                    </div>
                  </div>
                </div>
                {/* --- KẾT THÚC KHÚC HTML TIMELINE --- */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
