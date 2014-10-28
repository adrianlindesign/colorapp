class ChangeColumnScreenHtmlToTextPlease < ActiveRecord::Migration
  def change
    change_column :templates, :screenHTML, :text
  end
end
