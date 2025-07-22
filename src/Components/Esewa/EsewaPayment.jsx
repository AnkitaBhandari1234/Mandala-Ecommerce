import React from "react";
import { toast } from "react-toastify";
import api from "../../Api/axios";

const EsewaPayment = ({ amount, transactionId }) => {
  const handleEsewaPay = async () => {
    try {
      // Call your backend to get the signed payload (with correct eSewa field names)
      const res = await api.post("/payment/init-esewa", {
        amount: amount.toString(),               // amt
        product_service_charge: "0",             // psc
        product_delivery_charge: "0",            // pdc
        total_amount: amount.toString(),         // tAmt
        transaction_uuid: transactionId,         // pid
        product_code: "EPAYTEST",                 // scd (merchant code)
        success_url: "http://localhost:5173/esewa-success",  // su
        failure_url: "http://localhost:5173/esewa-fail",     // fu
      });

      const data = res.data;

      // Create form dynamically with correct fields
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      for (let key in data) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;       // must be: amt, pid, scd, tAmt, psc, pdc, su, fu, signature, signed_field_names (if signature)
        input.value = data[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("Esewa init error:", err);
      toast.error("eSewa payment initiation failed.");
    }
  };

  return (
    <button
      onClick={handleEsewaPay}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Proceed to Pay with eSewa
    </button>
  );
};

export default EsewaPayment;
