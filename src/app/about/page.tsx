

// import getString from '../api/hello/route'
interface propsType {
  info: string
}

export default async function About({
  searchParams,
}: {
  searchParams: Promise<propsType>
}) {
  const {info} =  await searchParams // 获取查询参数 info
  const data:propsType = await getStaticProps111(info);
  return (
    <div>
      About1111
      <p>{data.info}</p>
    </div>
  );
}

async function getStaticProps111(searchParams: string) {
  console.log("只在构建的时候执行吗？", searchParams)
  return ({
      info: `测试一下在页面上获取数据,${searchParams}`

  })
}