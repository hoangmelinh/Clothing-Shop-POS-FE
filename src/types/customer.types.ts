export type GenderEnum = 'MALE' | 'FEMALE' | 'OTHER';

export interface CustomerGroup {
  id: number;
  code: string;
  name: string;
  description: string;
}

export interface CustomerRequest {
  fullName: string;
  phone: string;
  dateOfBirth?: string;
  gender: GenderEnum;
  address?: string;
  note?: string;
  groupId?: number;
}


// Định nghĩa một voucher của khách
export interface CustomerVoucher {
  id: number;
  voucherCode: string;
  voucherName: string;
  discountAmount: number;
  minOrderValue: number;
  status: 'UNUSED' | 'USED' | 'EXPIRED';
  expiredAt: string;
}

// Định nghĩa ông Khách Hàng
export interface Customer {
  id: number;
  fullName: string;
  phone: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  address: string;
  note: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  rewardPoints: number;
  customerGroup: {
    id: number;
    name: string;
    code: string;
  };
  vouchers: CustomerVoucher[];
}

// Định nghĩa tham số tìm kiếm gửi lên Backend
export interface CustomerFilterParams {
  keyword?: string;
  page?: number;
  size?: number;
}


// Bộ tham số dùng cho chức năng Lọc/Tìm kiếm
export interface CustomerFilterParams {
  keyword?: string;
  page?: number;
  size?: number;
}
