import axios from "axios";
import { ApiConstant, EnvConstant } from "@/constants/";
import { Grade } from "@/models";

export const fetchGrades = async (): Promise<Grade[]> => {
  try {
    const response = await axios.get<{ data: Grade[] }>(
      `${EnvConstant.ENV.API_BASE_URL}${ApiConstant.LIBRARY_API.GET_GRADE_LIST}`,
      {
        headers: {
          Accept: "application/json",
          OrgId: "6304",
          Authorization: `Bearer ${EnvConstant.ENV.AUTHORIZATION_TOKEN}`,
        },
      }
    );

    return response.data?.data || [];
  } catch {
    return [];
  }
};
