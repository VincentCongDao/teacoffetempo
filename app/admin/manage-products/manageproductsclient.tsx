"use client";
import formatPrice from "@/components/(formatPrice)/page";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
interface ManageProductsClientProps {
  products: Product[];
}
const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  let rows: any = [];

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
      };
    });
  }
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "name",
      headerName: "Name",
      width: 220,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
    },
    {
      field: "inStock",
      headerName: "InStock",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">
            {params.row.inStock === true ? "in stock" : "out of stock"}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return <div>Action</div>;
      },
    },
  ];
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </>
  );
};

export default ManageProductsClient;
