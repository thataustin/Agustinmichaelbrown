class CreatePosts < ActiveRecord::Migration
  def self.up
    drop_table :posts

    create_table :posts do |t|
      t.text :content
      t.string :title
      t.references :blog

      t.timestamps
    end
  end

  def self.down
    drop_table :posts
  end
end
