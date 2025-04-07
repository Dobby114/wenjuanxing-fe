import axios, { dataType } from './ajax';

interface answerPagePropsType {
  pageSize: number;
  pageNo: number;
}
export async function getAnswerPage(id: string, params: answerPagePropsType): Promise<dataType> {
  const url = `/api/stat/${id}`;
  const data: dataType = await axios.get(url, { params });
  return data;
}
