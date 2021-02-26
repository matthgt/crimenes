class Crime < ApplicationRecord
    geocoded_by :address
    reverse_geocoded_by :lat, :long
end
