# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141031183003) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "apps", force: true do |t|
    t.string  "name"
    t.string  "genre"
    t.string  "image_url"
    t.boolean "free"
    t.string  "color1"
    t.string  "hex1"
    t.string  "color2"
    t.string  "hex2"
    t.string  "app_url"
    t.integer "hex1_percent"
    t.integer "hex2_percent"
  end

  create_table "templates", force: true do |t|
    t.string  "name"
    t.string  "device"
    t.integer "user_id"
    t.text    "screenHTML"
  end

  create_table "users", force: true do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "image_url"
  end

end
