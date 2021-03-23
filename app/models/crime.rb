class Crime < ApplicationRecord
  geocoded_by :address
  reverse_geocoded_by :lat, :long

  CRIME_CATEGORIES = {
    carro_robado: 'Carro robado',
    robo_a_carro: 'Robo a objetos en carro',
    asesinato: 'Asesinato',
    acoso: 'Acoso',
    secuestro: 'Secuestro',
    hurto: 'Robo sin violencia',
    asalto: 'Asalto',
    asalto_a_carro: 'Asalto a carro',
    robo_con_fuerza: 'Robo forzado',
    extorsion: 'Extorsión',
    violacion: 'Violación',
    acoso_sexual: 'Acoso sexual',
  }.freeze

  REPORTER_VICTIM_RELATIOnSHIP_CATEGORIES = {
    self: 'Yo mismo',
    immediate_family: 'Familiar inmediato',
    extended_family: 'Familiar extendido',
    friend: 'Amigo o conocido inmediato',
    other: 'Otro'
  }.freeze
  
  validates :category, inclusion: { in: CRIME_CATEGORIES.keys.map(&:to_s) }
  validates :reporter_victim_relationship_category, inclusion: { in: REPORTER_VICTIM_RELATIOnSHIP_CATEGORIES.keys.map(&:to_s) }
  validates :title, presence: true
  validates :happened_at, presence: true
  validates :address, presence: true
  validates :lat, presence: true
  validates :long, presence: true

  def category_human_readable
    CRIME_CATEGORIES[category.to_sym] || 'Otro'
  end
end
