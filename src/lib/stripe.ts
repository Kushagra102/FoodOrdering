import { Alert } from "react-native";
import { supabase } from "./supabase";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
  console.log(amount)
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: { amount },
  });

  console.log(data, error);
  if (data) {
    return data;
  }
  Alert.alert(`Error: ${error?.message ?? "no data"}`);
  return {};
};

export const initialisePaymentSheet = async (amount: number) => {
  // setLoading(true);
  const { paymentIntent, publishableKey, customer, ephemeralKey } = await fetchPaymentSheetParams(
    amount,
  );

  if (!publishableKey || !paymentIntent) return;

  await initPaymentSheet({
    merchantDisplayName: "kush",
    // customerId: customer,
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    defaultBillingDetails: {
      name: "Jane Doe",
    },
  });
};

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(`Error code: ${error.code}`, error.message);
    return false;
  } else {
    Alert.alert("Success", "Your order is confirmed!");
    return true;
  }
};
