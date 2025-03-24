import axios from "axios";
import { ApiConstant, EnvConstant } from "@/constants/";
import { Category } from "@/models";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<{ data: { data: Category[] } }>(
      `${EnvConstant.ENV.API_BASE_URL}${ApiConstant.LIBRARY_API.GET_CATEGORY_COMBO}`,
      {
        headers: {
          Accept: "application/json",
          OrgId: "6304",
          Authorization: `Bearer ${EnvConstant.ENV.AUTHORIZATION_TOKEN}`,
        },
        params: {
          CategoryTypeId: 2,
        },
      }
    );

    return response.data?.data?.data || [];
  } catch {
    return [];
  }
};
