class AddColor1ToApps < ActiveRecord::Migration
  def change
    add_column :apps, :color1, :string
    add_column :apps, :hex1, :string
    add_column :apps, :color2, :string
    add_column :apps, :hex2, :string
    add_column :apps, :app_url, :string

    rename_column :apps, :url, :image_url
    
    remove_column :apps, :r
    remove_column :apps, :g
    remove_column :apps, :b
    remove_column :apps, :color

  end
end
