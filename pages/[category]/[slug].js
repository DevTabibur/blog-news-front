import NewsLayout from "@/components/News Pages/NewsLayout";
import { useRouter } from "next/router";


const BlogDetailsPage = () => {
  const router = useRouter();
  const { category, slug } = router.query;
  return (
    <>

      <NewsLayout>
        <h1>Blog Details page is {slug}</h1>
      </NewsLayout>
    </>
  )
}

export default BlogDetailsPage