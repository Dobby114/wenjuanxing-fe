
// export async function GET(request, segmentData) {
//     const params = await segmentData.params
//     const slug = params.slug
//   }
export async function GET() {
    return Response.json({ message: "Hello World" });
  }
   