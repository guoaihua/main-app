
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


export const GetBlogList = async ()=>{
    return await fetch(domain+'/api/queryBlogs').then(response => response.json())
  }