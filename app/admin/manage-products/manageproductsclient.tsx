"use client";
import formatPrice from "@/components/(formatPrice)/page";
import Heading from "@/components/Heading";
import ActionButton from "@/components/actionbtn";
import Status from "@/components/status";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { MdCached, MdClose, MdDelete, MdDone, MdRemove } from "react-icons/md";
interface ManageProductsClientProps {
  products: Product[];
}
const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  let rows: any = [];
  const route = useRouter();
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
            {params.row.inStock === true ? (
              <Status
                text="in stock"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-200"
              />
            ) : (
              <Status
                text="out of stock"
                icon={MdClose}
                bg="bg-rose-900"
                color="text-rose-900"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionButton
              onClick={() => {
                handleToggleStock(params.row.id, params.row.inStock);
              }}
              icon={MdCached}
            />
            <ActionButton
              onClick={() => {
                handleStockDelete(params.row.id);
              }}
              icon={MdDelete}
            />
            <ActionButton onClick={() => {}} icon={MdRemove} />
          </div>
        );
      },
    },
  ];
  const handleStockDelete = useCallback((id: string) => {
    toast("Deleting the product, please wait...");

    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Product status changed");
        route.refresh();
      })
      .catch((err) => {
        toast.error("Something is wrong");
        console.log(err);
      });
  }, []);
  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then((res) => {
        toast.success("Product status changed");
        route.refresh();
      })
      .catch((err) => {
        toast.error("Something is wrong");
        console.log(err);
      });
  }, []);
  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Products"></Heading>
      </div>
      <div style={{ height: 600, width: "100%" }}>
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
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageProductsClient;
