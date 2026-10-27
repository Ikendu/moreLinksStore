import api from "./api";

export async function getProducts() {
  try {
    const response = await api.get("/products.php");

    if (!response.data.success) {
      throw new Error(response.data.message || "Unable to retrieve products");
    }

    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          "The server could not retrieve products.",
      );
    }

    if (error.request) {
      throw new Error(
        "Could not connect to the PHP API. Check that Apache is running.",
      );
    }

    throw error;
  }
}
