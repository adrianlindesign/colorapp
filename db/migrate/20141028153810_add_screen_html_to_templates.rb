class AddScreenHtmlToTemplates < ActiveRecord::Migration
  def change
    add_column :templates, :screenHTML, :string
  end
end
