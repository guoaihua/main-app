
const domain = import.meta.env?.VITE_API_DOMAIN || ''

export const AddNewBlog = async (params)=>{
  return await fetch(domain + '/api/addBlog', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(params)
  }).then(response => response.json())
}

export const DeleteBlog = async (params) =>{
  return await fetch(domain + '/api/deleteBlog?' + new URLSearchParams(params)).then(response => response.json())
}

export const GetBlogList = async (params)=>{
    return await fetch(domain+'/api/queryBlogs?'+ new URLSearchParams(params)).then(response => response.json())
  }