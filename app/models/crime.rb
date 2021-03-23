class Crime < ApplicationRecord
  geocoded_by :address
  reverse_geocoded_by :lat, :long

  CRIME_CATEGORIES = {
    carro_robado: 'Carro robado',
    carro_robado_con_fuerza: 'Carro robado con fuerza',
    robo_a_carro: 'Robo a objetos en carro',
    asalto: 'Asalto',
    robo_con_fuerza: 'Robo forzado',
    hurto: 'Robo sin violencia',
    asalto_a_casa: 'Asalto a casa',
    robo_a_casa: 'Robo a casa'
    extorsion: 'Extorsión',
    asesinato: 'Asesinato',
    violacion: 'Violación',
    acoso: 'Acoso',
    acoso_sexual: 'Acoso sexual',
    secuestro: 'Secuestro',
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
