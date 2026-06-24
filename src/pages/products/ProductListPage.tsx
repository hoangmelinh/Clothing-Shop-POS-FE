// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/Button';
// import { Badge } from '@/components/ui/Badge';
// import { Pagination } from '@/components/ui/Pagination';

// export default function ProductListPage() {
//   const products = [
//     { id: 1, name: 'Áo khoác Trench len', price: '$2,450', sku: 'FW24-001', status: 'CÒN HÀNG', statusClass: 'success', desc: 'Xanh lá đậm • Size M' },
//     { id: 2, name: 'Áo Blouse lụa xếp ly', price: '$890', sku: 'FW24-042', status: 'SẮP HẾT: 2', statusClass: 'warning', desc: 'Kem • Size S' },
//     { id: 3, name: 'Quần tây ống rộng', price: '$1,150', sku: 'FW24-018', status: 'HẾT HÀNG', statusClass: 'danger', desc: 'Đen tuyền • Size L', dimmed: true },
//     { id: 4, name: 'Áo len đan Cashmere rộng', price: '$1,800', sku: 'FW24-055', status: 'CÒN HÀNG', statusClass: 'success', desc: 'Xám nâu • Size M' },
//     { id: 5, name: 'Túi Tote da', price: '$3,200', sku: 'ACC-009', status: 'CÒN HÀNG', statusClass: 'success', desc: 'Đen mun • Freesize' },
//   ];

//   return (
//     <div className="flex flex-col lg:flex-row gap-8">
//       {/* Filters Sidebar */}
//       <aside className="w-full lg:w-64 flex-shrink-0 mb-lg lg:mb-0">
//         <div className="space-y-4 sticky top-28">
//           <div className="bg-primary-container text-on-primary-container p-md rounded-lg shadow-sm">
//             <div className="flex items-center justify-between mb-md border-b border-on-primary-container/20 pb-sm">
//               <h2 className="font-headline-md text-headline-md text-on-primary">Bộ lọc</h2>
//               <span className="material-symbols-outlined text-on-primary">tune</span>
//             </div>
//             <div className="space-y-md">
//               <div>
//                 <h3 className="font-label-caps text-label-caps text-on-primary-container/80 mb-sm uppercase">Danh mục</h3>
//                 <div className="space-y-2">
//                   {['Tất cả', 'Đồ may sẵn', 'Đồ da', 'Phụ kiện'].map((cat, i) => (
//                     <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
//                       <input defaultChecked={i === 0} className="form-checkbox h-4 w-4 rounded-sm text-primary" type="checkbox" />
//                       <span className="font-body-sm text-body-sm text-on-primary">{cat}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-label-caps text-label-caps text-on-primary-container/80 mb-sm uppercase pt-sm border-t border-on-primary-container/20">Trạng thái</h3>
//                 <div className="space-y-2">
//                   {['Còn hàng', 'Sắp hết', 'Hết hàng'].map((s, i) => (
//                     <label key={s} className="flex items-center space-x-2 cursor-pointer group">
//                       <input defaultChecked={i === 0} name="status" className="form-radio h-4 w-4 text-primary" type="radio" />
//                       <span className="font-body-sm text-body-sm text-on-primary">{s}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <Button variant="outline" className="w-full mt-md bg-white text-primary border-none hover:bg-white/90 hover:text-primary transition-all duration-300 font-semibold shadow-sm">
//               Áp dụng lọc
//             </Button>
//           </div>

//           <Link to="/products/new" className="block w-full">
//             <Button variant="primary" className="w-full justify-center" leftIcon={<span className="material-symbols-outlined text-[18px]">add</span>}>
//               Thêm sản phẩm
//             </Button>
//           </Link>
//         </div>
//       </aside>

//       {/* Catalog Grid */}
//       <div className="flex-1">
//         <div className="flex justify-between items-end mb-lg">
//           <div>
//             <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Bộ sưu tập mùa thu</h1>
//             <p className="font-body-md text-body-md text-on-surface-variant mt-2">Hiển thị 24 sản phẩm trong Đồ may sẵn</p>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-gutter">
//           {products.map((p) => (
//             <div key={p.sku} className={`border border-outline/20 rounded-lg bg-surface-container-lowest overflow-hidden group hover:border-primary/50 transition-colors duration-300 flex flex-col ${p.dimmed ? 'opacity-75' : ''}`}>
//               <Link to={`/products/${p.id}`} className="relative aspect-[3/4] bg-surface-container overflow-hidden block">
//                 <div className="w-full h-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
//                   <span className="material-symbols-outlined text-5xl">checkroom</span>
//                 </div>
//                 <div className="absolute top-sm right-sm">
//                   <Badge variant={p.statusClass as any}>{p.status}</Badge>
//                 </div>
//               </Link>
//               <div className="p-md flex-1 flex flex-col">
//                 <div className="flex justify-between items-start mb-2">
//                   <Link to={`/products/${p.id}`}>
//                     <h3 className="font-title-sm text-title-sm text-on-surface hover:text-primary transition-colors">{p.name}</h3>
//                   </Link>
//                   <span className="font-title-sm text-title-sm text-on-surface">{p.price}</span>
//                 </div>
//                 <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">{p.desc}</p>
//                 <div className="mt-auto flex items-center justify-between">
//                   <span className="text-xs font-label-caps text-on-surface-variant uppercase tracking-wider">Mã SP: {p.sku}</span>
//                   <Link to={`/products/${p.id}/edit`} className="text-primary hover:text-primary-container transition-colors">
//                     <span className="material-symbols-outlined">edit</span>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-xl">
//           <Pagination
//             totalPages={3}
//             currentPage={0}
//             onPageChange={(page) => console.log('Page:', page)}
//             className="bg-transparent border-t border-on-surface/10 px-0"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
// --------------------------------------------

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { useGetProductsQuery } from '@/redux/api/productApi';
import { useState } from 'react';
import { ProductVariant } from '@/types/product.types';
import { useGetCategoriesQuery } from '@/redux/api/categoryApi';
import ProductTable from './ProductTable';
import ProductFilterSidebar from './ProductFilterSidebar';

export default function ProductListPage() {
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [search, setSearch] = useState('');
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [categoryID, setCategoryID] = useState<number | undefined>(undefined);
  const [isDeleted, setIsDeleted] = useState<boolean | undefined>(false);
  const [tempSearch, setTempSearch] = useState('');
  const [tempProductName, setTempProductName] = useState('');
  const [tempSku, setTempSku] = useState('');
  const [tempCategoryID, setTempCategoryID] = useState<number | undefined>(undefined);
  const [tempStatus, setTempStatus] = useState('Còn hàng');

  const productFilterParams = { page, size, search: search || undefined, productName: productName || undefined, sku: sku || undefined, categoryID: categoryID || undefined, isDeleted: isDeleted !== undefined ? isDeleted : undefined };
  const { data: responseData, isLoading } = useGetProductsQuery(productFilterParams);
  const { data: categoriesData } = useGetCategoriesQuery();

  const products = responseData?.data?.content || [];
  const pagination = responseData?.data;
  const categories = categoriesData || [];

  const getStatus = (variants: ProductVariant[]): { text: string; class: 'success' | 'warning' | 'danger' | 'default' } => {
    const totalQty = variants?.reduce((sum, v) => sum + (v.quantity || 0), 0) || 0;
    if (totalQty === 0) return { text: 'HẾT HÀNG', class: 'danger' };
    if (totalQty <= 5) return { text: `SẮP HẾT (${totalQty})`, class: 'warning' };
    return { text: 'CÒN HÀNG', class: 'success' };
  };

  const getVariantStatus = (quantity: number, threshold: number = 10) => {
    if (quantity === 0) return { label: 'Hết hàng', class: 'out-of-stock', dotColor: 'gray' };
    if (quantity <= 3) return { label: 'Cực kỳ thấp', class: 'critical', dotColor: 'red' };
    if (quantity <= threshold) return { label: 'Sắp hết', class: 'low', dotColor: 'orange' };
    return { label: 'Còn hàng', class: 'ok', dotColor: 'green' };
  };

  const handleApplyFilter = () => {
    setSearch(tempSearch);
    setProductName(tempProductName);
    setSku(tempSku);
    setCategoryID(tempCategoryID);
    setIsDeleted(tempStatus === 'Đã xóa' ? true : false);
    setPage(0);
  };

  const handleClearFilters = () => {
    setTempSearch('');
    setTempProductName('');
    setTempSku('');
    setTempCategoryID(undefined);
    setTempStatus('Còn hàng');
    setSearch('');
    setProductName('');
    setSku('');
    setCategoryID(undefined);
    setIsDeleted(false);
    setPage(0);
  };

  const handleQuickSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(tempSearch);
      setPage(0);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <ProductFilterSidebar
        tempProductName={tempProductName}
        setTempProductName={setTempProductName}
        tempSku={tempSku}
        setTempSku={setTempSku}
        tempCategoryID={tempCategoryID}
        setTempCategoryID={setTempCategoryID}
        tempStatus={tempStatus}
        setTempStatus={setTempStatus}
        categories={categories}
        handleApplyFilter={handleApplyFilter}
        handleClearFilters={handleClearFilters}
      />

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap justify-between items-end mb-lg gap-4">
          <div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Quản lý sản phẩm</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Hiển thị {pagination?.totalElements || 0} sản phẩm
              {categoryID && categories.find(c => c.id === categoryID) && (
                <span className="ml-2 text-primary">· {categories.find(c => c.id === categoryID)?.name}</span>
              )}
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Tìm nhanh..."
                value={tempSearch}
                onChange={(e) => setTempSearch(e.target.value)}
                onKeyDown={handleQuickSearch}
                className="w-full sm:w-64 px-4 py-2 pr-10 border border-outline/30 rounded-lg bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-sm">search</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-on-surface-variant">Đang tải danh sách...</div>
        ) : (
          <>
            <ProductTable products={products} getStatus={getStatus} getVariantStatus={getVariantStatus} />
            <div className="mt-xl">
              <Pagination
                totalPages={pagination?.totalPages || 0}
                currentPage={page}
                onPageChange={setPage}
                className="bg-transparent border-t border-on-surface/10 px-0"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}