class Post < ActiveRecord::Base
  attr_accessible :title, :content, :blog_id
  belongs_to :blog
  validates_presence_of :title, :content, :blog_id
end
