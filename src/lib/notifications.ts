import { useEffect, useRef, useState } from "react";
import { Button, Platform, Text, View } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { supabase } from "./supabase";
import { Tables } from "../types";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(
  expoPushToken: Notifications.ExpoPushToken,
  title: string,
  body: string,
) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications
      .getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

const getUserToken = async (userId) => {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data?.expo_push_token;
};

export const notifyUserAboutOrderUpdate = async (order: Tables<"orders">) => {
  const token = await getUserToken(order.user_id);
  const title = `Your Order is ${order.status}`;
  let body = "";
  if (order.status === "Cooking") {
    body = "Delicious pizzas are being prepared.";
  } else if (order.status === "Delivering") {
    body = "Will be delivered in 15 mins.";
  } else if (order.status === "Delivered") {
    body = "Your order has been delivered. Enjoy the Lazeez Meal.";
  } else if (order.status === "New") {
    body = "Order Placed Successfully.";
  }

  sendPushNotification(
    token,
    title,
    body,
  );
};
