const concelhos = [
  { name: 'Abrantes', alternateNames: [] },
  { name: 'Águeda', alternateNames: [] },
  { name: 'Albergaria-a-Velha', alternateNames: [] },
  { name: 'Albufeira', alternateNames: [] },
  { name: 'Alcácer do Sal', alternateNames: [] },
  { name: 'Alcanena', alternateNames: [] },
  { name: 'Alcobaça', alternateNames: [] },
  { name: 'Alcochete', alternateNames: [] },
  { name: 'Alenquer', alternateNames: [] },
  { name: 'Alfândega da Fé', alternateNames: [] },
  { name: 'Alijó', alternateNames: [] },
  { name: 'Almada', alternateNames: [] },
  { name: 'Almeida', alternateNames: [] },
  { name: 'Almeirim', alternateNames: [] },
  { name: 'Almodôvar', alternateNames: [] },
  { name: 'Alpiarça', alternateNames: [] },
  { name: 'Alvaiázere', alternateNames: [] },
  { name: 'Amadora', alternateNames: [] },
  { name: 'Amarante', alternateNames: [] },
  { name: 'Amares', alternateNames: [] },
  { name: 'Anadia', alternateNames: [] },
  { name: 'Angra do Heroísmo', alternateNames: ['Ilha Terceira'] },
  { name: 'Ansião', alternateNames: [] },
  { name: 'Arcos de Valdevez', alternateNames: [] },
  { name: 'Arganil', alternateNames: [] },
  { name: 'Arouca', alternateNames: [] },
  { name: 'Arruda dos Vinhos', alternateNames: [] },
  { name: 'Aveiro', alternateNames: [] },
  { name: 'Azambuja', alternateNames: [] },
  { name: 'Baião', alternateNames: [] },
  { name: 'Barcelos', alternateNames: [] },
  { name: 'Barreiro', alternateNames: [] },
  { name: 'Batalha', alternateNames: [] },
  { name: 'Beja', alternateNames: [] },
  { name: 'Benavente', alternateNames: [] },
  { name: 'Bombarral', alternateNames: [] },
  { name: 'Braga', alternateNames: [] },
  { name: 'Bragança', alternateNames: [] },
  { name: 'Cabeceiras de Basto', alternateNames: [] },
  { name: 'Cadaval', alternateNames: [] },
  { name: 'Caldas da Rainha', alternateNames: [] },
  { name: 'Calheta (Madeira)', alternateNames: [] },
  { name: 'Câmara de Lobos', alternateNames: [] },
  { name: 'Caminha', alternateNames: [] },
  { name: 'Cantanhede', alternateNames: [] },
  {
    name: 'Carrazeda de Ansiães',
    alternateNames: ['Carrazeda Ansiães', 'Carraz. de Ansiães'],
  },
  { name: 'Carregal do Sal', alternateNames: [] },
  { name: 'Cartaxo', alternateNames: [] },
  { name: 'Cascais', alternateNames: [] },
  { name: 'Castelo Branco', alternateNames: [] },
  { name: 'Castelo de Paiva', alternateNames: [] },
  { name: 'Castro Daire', alternateNames: [] },
  { name: 'Castro Marim', alternateNames: [] },
  { name: 'Celorico da Beira', alternateNames: [] },
  { name: 'Celorico de Basto', alternateNames: [] },
  { name: 'Chamusca', alternateNames: [] },
  { name: 'Chaves', alternateNames: [] },
  { name: 'Cinfães', alternateNames: [] },
  { name: 'Coimbra', alternateNames: [] },
  { name: 'Condeixa-a-Nova', alternateNames: [] },
  { name: 'Coruche', alternateNames: [] },
  { name: 'Covilhã', alternateNames: [] },
  { name: 'Cuba', alternateNames: [] },
  { name: 'Elvas', alternateNames: [] },
  { name: 'Entroncamento', alternateNames: [] },
  { name: 'Espinho', alternateNames: [] },
  { name: 'Esposende', alternateNames: [] },
  { name: 'Estarreja', alternateNames: [] },
  { name: 'Évora', alternateNames: [] },
  { name: 'Fafe', alternateNames: [] },
  { name: 'Faro', alternateNames: [] },
  { name: 'Felgueiras', alternateNames: [] },
  { name: 'Figueira da Foz', alternateNames: [] },
  {
    name: 'Figueira de Castelo Rodrigo',
    alternateNames: ['Fig. de Castelo Rodrigo', 'Fig. de Cast. Rodrigo'],
  },
  { name: 'Figueiró dos Vinhos', alternateNames: [] },
  { name: 'Fornos de Algodres', alternateNames: [] },
  { name: 'Funchal', alternateNames: ['Ilha da Madeira'] },
  { name: 'Fundão', alternateNames: [] },
  { name: 'Góis', alternateNames: [] },
  { name: 'Gondomar', alternateNames: [] },
  { name: 'Gouveia', alternateNames: [] },
  { name: 'Grândola', alternateNames: [] },
  { name: 'Guarda', alternateNames: [] },
  { name: 'Guimarães', alternateNames: [] },
  { name: 'Horta', alternateNames: ['Ilha do Faial'] },
  { name: 'Calheta', alternateNames: ['Ilha S. Jorge', 'Calheta (Açores)'] },
  { name: 'Ílhavo', alternateNames: [] },
  { name: 'Lagoa', alternateNames: ['Lagoa (Faro)'] },
  { name: 'Lagos', alternateNames: [] },
  { name: 'Lamego', alternateNames: [] },
  { name: 'Leiria', alternateNames: [] },
  { name: 'Lisboa', alternateNames: [] },
  { name: 'Loulé', alternateNames: [] },
  { name: 'Loures', alternateNames: [] },
  { name: 'Lourinhã', alternateNames: [] },
  { name: 'Lousã', alternateNames: [] },
  { name: 'Lousada', alternateNames: [] },
  { name: 'Macedo de Cavaleiros', alternateNames: ['Mac. de Cavaleiros'] },
  { name: 'Madalena', alternateNames: [] },
  { name: 'Mafra', alternateNames: [] },
  { name: 'Maia', alternateNames: [] },
  { name: 'Mangualde', alternateNames: [] },
  { name: 'Manteigas', alternateNames: [] },
  { name: 'Marco de Canaveses', alternateNames: ['Marco de Canavezes'] },
  { name: 'Marinha Grande', alternateNames: [] },
  { name: 'Matosinhos', alternateNames: [] },
  { name: 'Mealhada', alternateNames: [] },
  { name: 'Melgaço', alternateNames: [] },
  { name: 'Mira', alternateNames: [] },
  { name: 'Miranda do Corvo', alternateNames: [] },
  { name: 'Miranda do Douro', alternateNames: [] },
  { name: 'Mirandela', alternateNames: [] },
  { name: 'Mogadouro', alternateNames: [] },
  { name: 'Moimenta da Beira', alternateNames: [] },
  { name: 'Moita', alternateNames: [] },
  { name: 'Monção', alternateNames: [] },
  { name: 'Monchique', alternateNames: [] },
  { name: 'Montalegre', alternateNames: [] },
  { name: 'Montemor-o-Novo', alternateNames: [] },
  { name: 'Montemor-o-Velho', alternateNames: ['Montemor-oVelho'] },
  { name: 'Montijo', alternateNames: [] },
  { name: 'Mortágua', alternateNames: [] },
  { name: 'Moura', alternateNames: [] },
  { name: 'Murça', alternateNames: [] },
  { name: 'Murtosa', alternateNames: [] },
  { name: 'Nelas', alternateNames: [] },
  { name: 'Nordeste', alternateNames: [] },
  { name: 'Óbidos', alternateNames: [] },
  { name: 'Odemira', alternateNames: [] },
  { name: 'Odivelas', alternateNames: [] },
  { name: 'Oeiras', alternateNames: [] },
  { name: 'Olhão', alternateNames: [] },
  { name: 'Oliveira de Azeméis', alternateNames: [] },
  { name: 'Oliveira de Frades', alternateNames: [] },
  { name: 'Oliveira do Bairro', alternateNames: [] },
  { name: 'Oliveira do Hospital', alternateNames: [] },
  { name: 'Ourém', alternateNames: [] },
  { name: 'Ovar', alternateNames: [] },
  { name: 'Paços de Ferreira', alternateNames: [] },
  { name: 'Palmela', alternateNames: [] },
  { name: 'Paredes', alternateNames: [] },
  { name: 'Paredes de Coura', alternateNames: [] },
  { name: 'Pedrógão Grande', alternateNames: ['Pedrógão'] },
  { name: 'Penacova', alternateNames: [] },
  { name: 'Penafiel', alternateNames: [] },
  { name: 'Penela', alternateNames: [] },
  { name: 'Peniche', alternateNames: [] },
  { name: 'Peso da Régua', alternateNames: [] },
  { name: 'Pinhel', alternateNames: [] },
  { name: 'Pombal', alternateNames: [] },
  { name: 'Ponta Delgada', alternateNames: ['Ilha de S. Miguel'] },
  { name: 'Ponta do Sol', alternateNames: [] },
  { name: 'Ponte da Barca', alternateNames: [] },
  { name: 'Ponte de Lima', alternateNames: [] },
  { name: 'Ponte de Sôr', alternateNames: ['Ponte de Sor'] },
  { name: 'Portalegre', alternateNames: [] },
  { name: 'Portel', alternateNames: [] },
  { name: 'Portimão', alternateNames: [] },
  { name: 'Porto', alternateNames: [] },
  { name: 'Porto de Mós', alternateNames: [] },
  { name: 'Porto Santo', alternateNames: [] },
  { name: 'Póvoa de Lanhoso', alternateNames: [] },
  { name: 'Póvoa de Varzim', alternateNames: [] },
  { name: 'Reguengos de Monsaraz', alternateNames: ['Reguengos Monsaraz', 'Reg. de Monsaraz'] },
  { name: 'Resende', alternateNames: [] },
  { name: 'Ribeira de Pena', alternateNames: [] },
  { name: 'Rio Maior', alternateNames: [] },
  { name: 'Sabrosa', alternateNames: [] },
  { name: 'Salvaterra de Magos', alternateNames: ['Salvaterra Magos'] },
  { name: 'Santa Comba Dão', alternateNames: [] },
  { name: 'Santa Cruz', alternateNames: [] },
  { name: 'Santa Maria da Feira', alternateNames: ['Santa Maria Feira'] },
  { name: 'Santa Marta de Penaguião', alternateNames: ['St Marta Penaguião', 'Sta. Marta Penaguião'] },
  { name: 'Santarém', alternateNames: [] },
  { name: 'Santiago do Cacém', alternateNames: [] },
  { name: 'Santo Tirso', alternateNames: [] },
  { name: 'São Brás de Alportel', alternateNames: [] },
  { name: 'São João da Madeira', alternateNames: [] },
  { name: 'São Pedro do Sul', alternateNames: [] },
  { name: 'São Roque do Pico', alternateNames: ['Ilha do Pico'] },
  { name: 'Sátão', alternateNames: [] },
  { name: 'Seia', alternateNames: [] },
  { name: 'Seixal', alternateNames: [] },
  { name: 'Sernancelhe', alternateNames: [] },
  { name: 'Serpa', alternateNames: [] },
  { name: 'Sertã', alternateNames: [] },
  { name: 'Sesimbra', alternateNames: [] },
  { name: 'Setúbal', alternateNames: [] },
  { name: 'Sever do Vouga', alternateNames: [] },
  { name: 'Silves', alternateNames: [] },
  { name: 'Sines', alternateNames: [] },
  { name: 'Sintra', alternateNames: [] },
  { name: 'Sobral de Monte Agraço', alternateNames: [] },
  { name: 'Soure', alternateNames: [] },
  { name: 'Tábua', alternateNames: [] },
  { name: 'Tavira', alternateNames: [] },
  { name: 'Terras de Bouro', alternateNames: [] },
  { name: 'Tomar', alternateNames: [] },
  { name: 'Tondela', alternateNames: [] },
  { name: 'Torre de Moncorvo', alternateNames: [] },
  { name: 'Torres Novas', alternateNames: [] },
  { name: 'Torres Vedras', alternateNames: [] },
  { name: 'Trancoso', alternateNames: [] },
  { name: 'Trofa', alternateNames: [] },
  { name: 'Vagos', alternateNames: [] },
  { name: 'Vale de Cambra', alternateNames: [] },
  { name: 'Valença', alternateNames: [] },
  { name: 'Valongo', alternateNames: [] },
  { name: 'Valpaços', alternateNames: [] },
  { name: 'Velas', alternateNames: [] },
  { name: 'Vendas Novas', alternateNames: [] },
  { name: 'Viana do Castelo', alternateNames: [] },
  { name: 'Vieira do Minho', alternateNames: [] },
  { name: 'Praia da Vitória', alternateNames: ['Vila da Praia da Vitória', 'Vila Praia da Vitória'] },
  { name: 'Vila do Conde', alternateNames: [] },
  { name: 'Vila Flor', alternateNames: [] },
  { name: 'Vila Franca de Xira', alternateNames: [] },
  {
    name: 'Vila Nova da Barquinha',
    alternateNames: ['Vila N. Barquinha', 'Vila N. da Barquinha'],
  },
  {
    name: 'Vila Nova de Cerveira',
    alternateNames: ['Vila N. Cerveira', 'Vila N. de Cerveira'],
  },
  {
    name: 'Vila Nova de Famalicão',
    alternateNames: ['Vila N. de Famalicão', 'Vila N. Famalicão'],
  },
  { name: 'Vila Nova de Foz Côa', alternateNames: [] },
  { name: 'Vila Nova de Gaia', alternateNames: [] },
  { name: 'Vila Nova de Poiares', alternateNames: [] },
  { name: 'Vila Pouca de Aguiar', alternateNames: [] },
  {
    name: 'Vila Real',
    alternateNames: [],
    neighbours: [
      'Ribeira de Pena', 'Vila Pouca de Aguiar', 'Alijó', 'Sabrosa', 'Peso da Régua',
      'Santa Marta de Penaguião', 'Baião', 'Amarante', 'Mondim de Basto',
    ],
  },
  {
    name: 'Vila Real de Santo António',
    alternateNames: [
      'Vila Real Santo António', 'Vila Real S. António', 'V. R. de Santo António',
      'V. R. S. António', 'V. R. Santo António',
    ],
  },
  { name: 'Vila Verde', alternateNames: [] },
  { name: 'Vimioso', alternateNames: [] },
  { name: 'Vinhais', alternateNames: [] },
  { name: 'Viseu', alternateNames: [] },
  { name: 'Vizela', alternateNames: [] },
  { name: 'Vouzela', alternateNames: [] },
  { name: 'Nazaré', alternateNames: [] },
  { name: 'Santa Cruz da Graciosa', alternateNames: [] },
];

const getConcelhoByName = (name) => concelhos.find((concelho) => {
  if (concelho.name === name) {
    return concelho;
  }

  if (concelho.alternateNames.find((alternateName) => alternateName === name)) {
    return concelho;
  }

  return null;
});

export default getConcelhoByName;
