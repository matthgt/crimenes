json.type 'FeatureCollection'
json.crs do
    json.type 'name'
    json.properties do 
        json.name 'urn:ogc:def:crs:EPSG::4326'
    end 
end
json.features do
    json.array! @crimes, partial: "crimes/crime", as: :crime
end
