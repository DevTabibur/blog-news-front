import { useRouter } from "next/router";


const BlogDetailsPage = () => {
  const router = useRouter();
  const { category, slug } = router.query;
  return (
   <>
    
   </>
  )
}

export default BlogDetailsPage