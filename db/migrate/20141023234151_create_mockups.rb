class CreateMockups < ActiveRecord::Migration
  def change
    create_table :templates do |t|
      t.string :name
      t.string :device
      t.integer :user_id
    end
  end
end
