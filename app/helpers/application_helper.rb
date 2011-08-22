module ApplicationHelper
  def show_blogs
    @blog_types = Blog.all
    render :partial => "shared/blog_nav_bar"
  end
end
