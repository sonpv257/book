import axios from "axios";
import { ApiConstant, EnvConstant } from "@/constants/";
import { BookType } from "@/models";

export const fetchBookTypes = async (): Promise<BookType[]> => {
  try {
    const response = await axios.get<{ data:{data: BookType[]} }>(
      `${EnvConstant.ENV.API_BASE_URL}${ApiConstant.LIBRARY_API.GET_BOOK_TYPE}`,
      {
        headers: {
          Accept: "application/json",
          OrgId: "6304",
          Authorization: `Bearer ${EnvConstant.ENV.AUTHORIZATION_TOKEN}`,
        },
      }
    );

    return response.data?.data?.data || [];
  } catch {
    return [];
  }
};
