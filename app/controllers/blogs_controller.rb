class BlogsController < ApplicationController

  def show
    @posts = Post.where("blog_id = " + params[:id])
  end

end
