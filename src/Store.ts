import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

type BillStore = {
  accountNumber: number;
  customerName: string;
  lastDate: string;
  lastValue: number;
  previousDate: string;
  previousValue: number;
  totalUnits: number;
  firstRangeAmount: number;
  secondRangeAmount: number;
  thirdRangeAmount: number;
  totalAmount: number;
  setValues:(accNumber:number)=>void
};

const toastError = (message:string)=>{
  toast.error(`${message}`, {
    position: "top-center",
    theme: "colored"
  });
};

export const useBillStore = create<BillStore>((set) => ({
  accountNumber: 0,
  customerName: "",
  lastDate: "",
  lastValue: 0,
  previousDate: "",
  previousValue: 0,
  totalUnits: 0,
  firstRangeAmount: 0,
  secondRangeAmount: 0,
  thirdRangeAmount: 0,
  totalAmount: 0,
  setValues: async (accNumber) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/get/${accNumber}`);
      const { data } = response;
      set({
        accountNumber: data.number,
        customerName: data.name,
        lastDate: data.lastDate,
        lastValue: data.lastValue,
        previousDate: data.previousDate,
        previousValue: data.previousValue,
        totalUnits: data.totalUnits,
        firstRangeAmount: data.firstRangeAmount,
        secondRangeAmount: data.secondRangeAmount,
        thirdRangeAmount: data.thirdRangeAmount,
        totalAmount: data.totalAmount,
      });
    } catch (error) {
      toastError("Invalid account number");
    }
  },
}));
