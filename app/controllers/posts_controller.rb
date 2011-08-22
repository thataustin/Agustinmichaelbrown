class PostsController < ApplicationController
  
  before_filter :load

  def load 
    @posts = Post.all
    @post = Post.new
  end 

  def index
  end

end
