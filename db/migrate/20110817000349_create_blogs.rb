class CreateBlogs < ActiveRecord::Migration
  def self.up
    create_table :blogs do |t|
      t.text :description, :null => false
      t.string :title, :null => false

      t.timestamps
    end

    change_table :posts do |t|
      t.references :blog
    end
  end

  def self.down
    drop_table :blogs
  end
end
