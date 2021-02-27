json.type 'Feature'
json.id crime.id
json.geometry do
    json.type 'Point'
    json.coordinates [crime.long, crime.lat] 
end
json.properties do
    json.extract! crime, :id, :title 
end
