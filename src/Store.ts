import axios from "axios";
import Swal from "sweetalert2";
import { create } from "zustand";

type BillStore = {
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

export const useBillStore = create<BillStore>((set) => ({
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
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Invalid Acount Number!",
            showConfirmButton: false,
            timer: 1800
          });
    }
  },
}));
