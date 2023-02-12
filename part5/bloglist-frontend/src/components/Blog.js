const Blog = ({ blog }) => (
  <div>
    ------------------------------<br/> 
    <span>Title: </span> {blog.title} <br/> 
    <span>Author: </span> {blog.author}  <br/> 
    <span>Url: </span> {blog.url} <br/> 
    <span>Likes: </span> {blog.likes} <br/>
    ------------------------------
  </div>
);

export default Blog;
