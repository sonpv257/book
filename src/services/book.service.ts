import axios from "axios";
import { ApiConstant, EnvConstant } from "@/constants/";
import { Book } from "@/models";

export const fetchBooks = async (searchKey: string = ""): Promise<Book[]> => {
  try {
    const response = await axios.get<{ data: { data: Book[] } }>(
      `${EnvConstant.ENV.API_BASE_URL}${ApiConstant.LIBRARY_API.GET_DOCUMENTS_SHARED}`,
      {
        headers: {
          Accept: "application/json",
          OrgId: "6304",
          Authorization: `Bearer ${EnvConstant.ENV.AUTHORIZATION_TOKEN}`,
        },
        params: {
          //SchoolCategoryCode: "L1.4",
          SearchKey: searchKey, 
        },
      }
    );

    return response.data?.data?.data || [];
  } catch {
    return [];
  }
};
