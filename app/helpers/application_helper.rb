module ApplicationHelper
  def render_ip_reverse_geocode
    lat = if_not_zero(request.location.latitude, otherwise: '14.592890948')
    long = if_not_zero(request.location.longitude, otherwise: '-90.49528645')
    hidden_field_tag("ip_reverse_geocode_lat", lat) + 
      hidden_field_tag("ip_reverse_geocode_long", long)
  end

  def if_not_zero(value, otherwise:)
    return value unless value.zero?
    otherwise
  end
end
