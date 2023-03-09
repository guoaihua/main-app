export const AddNewBlog = async (params)=>{
  return await fetch('http://localhost:8000/api/addBlog', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(params)
  }).then(response => response.json())
}


export const GetBlogList = async ()=>{
    return await fetch('http://localhost:8000/api/queryBlogs').then(response => response.json())
  }