import { axiosInstance } from ".";

export const getAllTransactions = async (page) => {
  try {
    const response = await axiosInstance.get(
      `/api/transaction/get-all-transactions?page=${page}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);

      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};

// get search result
export const getSearchQuery = async (searchValue, selectedMonth) => {
  try {
    const resposne = await axiosInstance.get(
      "/api/transaction/get-search-query",
      {
        params: { value: searchValue, month: selectedMonth },
      }
    );
    return resposne.data;
  } catch (error) {
    if (error.response) {
      console.log(error);

      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};
