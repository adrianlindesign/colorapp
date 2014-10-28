class CreateMockupsApps < ActiveRecord::Migration
  def change
    create_table :templates_apps do |t|
      t.integer :template_id
      t.integer :app_id
    end
  end
end
