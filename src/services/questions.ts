import axios, { dataType } from './ajax';
// 获取单个问卷信息
export async function getSingleQuestion(id: string): Promise<dataType> {
  const url = `/api/question/${id}`;
  const data: dataType = await axios.get(url);
  return data;
}
// 创建问卷
export async function postQuestion(): Promise<dataType> {
  const url = `/api/question`;
  const data: dataType = await axios.post(url);
  return data;
}
// 获取（查询）问卷列表
// 上面写了占位id，这里用第二个位置是任何字符串都命中上面那个地址！！！
export async function getQuestionList(): Promise<dataType> {
  const url = `/api/question`;
  const data: dataType = await axios.get(url);
  return data;
}
