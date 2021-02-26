json.extract! crime, :id, :category, :title, :description, :happened_at, :address, :address_reference, :reporter_ip, :reporter_user_agent, :reporter_id, :reporter, :reporter_victim_relationship_category, :created_at, :updated_at
json.url crime_url(crime, format: :json)
