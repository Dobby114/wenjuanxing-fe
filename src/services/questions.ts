import axios, { dataType } from './ajax';
interface searchParams {
  keywords: string;
  isStar: boolean;
  isDeleted: boolean;
  pageSize: number;
  pageNo: number;
}
// 获取单个问卷信息
export async function getSingleQuestion(id: string): Promise<dataType> {
  const url = `/api/question/${id}`;
  const data: dataType = await axios.get(url);
  return data;
}
// 创建问卷
export async function postQuestion(questionData:dataType): Promise<dataType> {
  const url = `/api/question`;
  const data: dataType = await axios.post(url,{...questionData});
  return data;
}
// 获取（查询）问卷列表
// 上面写了占位id，这里用第二个位置是任何字符串都命中上面那个地址！！！
export async function getQuestionList(params: Partial<searchParams>): Promise<dataType> {
  const url = `/api/question`;
  const data: dataType = await axios.get(url, { params });
  return data;
}
// 更新单个问卷信息
export async function updateSingleQuestion(id: string, opt: dataType): Promise<dataType> {
  const url = `/api/question/${id}`;
  const data: dataType = await axios.patch(url, opt);
  return data;
}
// 复制问卷
export async function duplicateQuestion(id: string): Promise<dataType> {
  const url = `/api/question/duplicate/${id}`;
  const data: dataType = await axios.post(url);
  return data;
}
// 彻底删除问卷
export async function deleteQuestion(idList: string[]): Promise<dataType> {
  const url = `/api/question`;
  const data: dataType = await axios.delete(url, { data: { idList } });
  return data;
}
