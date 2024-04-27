"use client";
import formatPrice from "@/components/(formatPrice)/page";
import Heading from "@/components/Heading";
import ActionButton from "@/components/actionbtn";
import Status from "@/components/status";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order, User } from "@prisma/client";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
interface ManageOrderClientProps {
  orders: ExtendedOrder[];
}
type ExtendedOrder = Order & {
  user: User;
};
const ManageOrderClient: React.FC<ManageOrderClientProps> = ({ orders }) => {
  let rows: any = [];
  const route = useRouter();
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
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
      field: "customer",
      headerName: "Customer Name",
      width: 220,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-green-200"
                color="text-green-200"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status
                text="completed"
                icon={MdDeliveryDining}
                bg="bg-rose-900"
                color="text-rose-900"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="pending"
                icon={MdAccessTimeFilled}
                bg="bg-green-200"
                color="text-green-200"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="out of stock"
                icon={MdDeliveryDining}
                bg="bg-rose-900"
                color="text-rose-900"
              />
            ) : params.row.deliveryStatus === "delivery" ? (
              <Status
                text="out of stock"
                icon={MdDeliveryDining}
                bg="bg-blue-400"
                color="text-blue-400"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 100,
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
                handleDispatch(params.row.id);
              }}
              icon={MdDeliveryDining}
            />
            <ActionButton
              onClick={() => {
                handleDeliever(params.row.id);
              }}
              icon={MdDone}
            />
            <ActionButton
              onClick={() => {
                route.push(`order/${params.row.id}`);
              }}
              icon={MdRemoveRedEye}
            />
          </div>
        );
      },
    },
  ];
  const handleDeliever = useCallback((id: string) => {
    axios
      .put("/api/oder", {
        id,
        deliveryStatus: "delivered",
      })
      .then((res) => {
        toast.success("Order Delivered");
        route.refresh();
      })
      .catch((err) => {
        toast.error("Something is wrong");
        console.log(err);
      });
  }, []);
  const handleDispatch = useCallback((id: string) => {
    axios
      .put("/api/oder", {
        id,
        deliveryStatus: "dispatched",
      })
      .then((res) => {
        toast.success("Order Dispatched");
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
        <Heading title="Manage Orders"></Heading>
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

export default ManageOrderClient;
