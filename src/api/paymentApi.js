import { apiClient } from "./axiosClient";

export async function createTransaction(payload) {
  const response = await apiClient.post("/payment/create", payload);
  return response.data;
}

export async function confirmTransaction(paymentIntentId) {
  const response = await apiClient.post("/payment/confirm", { paymentIntentId });
  return response.data;
}

export async function getTransactions() {
  const response = await apiClient.get("/payment/me");
  return response.data;
}

export async function getAllTransactionsAdmin() {
  const response = await apiClient.get("/payment/admin/transactions");
  return response.data;
}

export async function updateTransactionStatusAdmin(transactionId, paymentStatus) {
  const response = await apiClient.put(`/payment/${transactionId}`, {
    paymentStatus,
  });
  return response.data;
}
