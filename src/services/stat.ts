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

export async function getStaticRes(questionId: string, componentId: string) {
  const url = `/api/stat/${questionId}/${componentId}`;
  const data: dataType = await axios.get(url);
  return data;
}
