import { useRouter } from 'next/router'
import React from 'react'

const BlogDetailsPage = () => {
    const router = useRouter()

  return (
    <div>{router.query.slug}</div>
  )
}

export default BlogDetailsPage