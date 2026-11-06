import { FullQuestionPaper } from '../types/fullPaper';

// =========================================================================
// 1. 2024 NOVEMBER NSC - GEOGRAPHY PAPER 1 (150 MARKS, 3 HOURS)
// =========================================================================
export const GEOGRAPHY_2024_P1: FullQuestionPaper = {
  id: 'dbe_nsc_2024_geog_p1',
  subjectId: 'fet_geography',
  subjectName: 'Geography Paper 1 (Climate, Weather, Geomorphology, Settlement & Economic Geography)',
  grade: 12,
  year: 2024,
  session: 'November NSC',
  paperNumber: 1,
  totalMarks: 150,
  timeAllowedMinutes: 180,
  officialCode: 'DBE/November 2024 NSC — Geography P1',
  instructions: [
    'This question paper consists of FOUR questions.',
    'Answer ALL FOUR questions.',
    'All diagrams and source materials are included within each question section.',
    'Number the answers correctly according to the numbering system used in this question paper.',
    'Where applicable, clearly show ALL calculations with units (e.g. km, m, 1:50 000).',
    'You may use a non-programmable scientific calculator and a magnifying glass.',
    'Write neatly and legibly.',
  ],
  formulaSheetCategory: 'geography',
  questions: [
    // -----------------------------------------------------------------------
    // QUESTION 1: CLIMATE AND WEATHER (45 MARKS)
    // -----------------------------------------------------------------------
    {
      questionNumber: 1,
      title: 'QUESTION 1: CLIMATE AND WEATHER',
      topicTag: 'Climate & Weather',
      totalMarks: 45,
      contextPreamble:
        'Refer to mid-latitude cyclones, tropical cyclones, South African weather patterns, and valley microclimates.',
      subQuestions: [
        {
          subNumber: '1.1.1',
          prompt:
            'Mid-latitude cyclones in the Southern Hemisphere travel from ... to ... due to the prevailing Westerlies.',
          marks: 1,
          type: 'mcq',
          options: ['East to West', 'West to East', 'North to South', 'South to North'],
          expectedShortAnswer: 'West to East',
          markingGuidelines: [
            '✓ West to East (steered by mid-latitude westerly winds in the Southern Hemisphere)',
          ],
          fullWorkedSolution:
            'Mid-latitude cyclones develop in the sub-polar low pressure belt (40°–60°S) and are driven from West to East across the Southern Ocean by the prevailing westerly wind belt.',
          cognitiveLevel: 'Knowledge',
          examinerTip:
            'Always remember: Tropical cyclones move East to West; Mid-latitude cyclones move West to East.',
        },
        {
          subNumber: '1.1.2',
          prompt:
            'Name the warm ocean current off the east coast of South Africa that provides moisture and latent heat to tropical air masses.',
          marks: 1,
          type: 'step-by-step',
          expectedShortAnswer: 'Agulhas Current (or Mozambique Current)',
          markingGuidelines: [
            '✓ Agulhas Current (also accept Mozambique Current)',
          ],
          fullWorkedSolution:
            'The warm Agulhas Current flows southwards along South Africa’s eastern coastline, bringing warm, moist maritime tropical air masses that fuel convection and rainfall over KwaZulu-Natal, Mpumalanga, and the interior.',
          cognitiveLevel: 'Knowledge',
          examinerTip:
            'East coast = Warm Agulhas Current (rain/moisture); West coast = Cold Benguela Current (arid/fog/stability).',
        },
        {
          subNumber: '1.1.3',
          prompt:
            'Identify the front that brings sudden temperature drops, backing winds, and cumulonimbus clouds with heavy showers to the Western Cape.',
          marks: 1,
          type: 'step-by-step',
          expectedShortAnswer: 'Cold front',
          markingGuidelines: [
            '✓ Cold front',
          ],
          fullWorkedSolution:
            'The cold front consists of cold, dense polar maritime air wedging beneath the warm subtropical air, forcing rapid uplift, steep pressure rise, temperature plunge, and cumulonimbus storm clouds.',
          cognitiveLevel: 'Knowledge',
          examinerTip:
            'In South Africa, cold fronts originate in the south-west and sweep north-eastwards across the subcontinent during winter.',
        },
        {
          subNumber: '1.1.4',
          prompt:
            'State TWO weather conditions associated with the passage of a cold front over Cape Town.',
          marks: 2,
          type: 'step-by-step',
          expectedShortAnswer: 'Drop in temperature and heavy rainfall (or backing winds/pressure rise)',
          markingGuidelines: [
            '✓ Significant drop in atmospheric temperature',
            '✓ Heavy showers / thunderstorm rainfall from cumulonimbus clouds (also accept backing wind from NW to SW, or rising air pressure)',
          ],
          fullWorkedSolution:
            '1. Sharp drop in surface temperature as polar air replaces warm maritime air.\n2. Overcast skies with heavy showers/rain followed by clearing showers.\n3. Wind backs from North-West to South-West.\n4. Atmospheric pressure increases rapidly.',
          cognitiveLevel: 'Routine Procedures',
          examinerTip:
            'Make sure you specify the change (e.g. "temperature drops", not just "temperature").',
        },
        {
          subNumber: '1.1.5',
          prompt:
            'Explain why the warm front of a mid-latitude cyclone rarely has a direct weather impact over mainland South Africa.',
          marks: 3,
          type: 'step-by-step',
          expectedShortAnswer: 'The cyclone is deflected southwards so only the northern cold front sweeps across the continent.',
          markingGuidelines: [
            '✓ South African landmass lies too far north (subtropical latitude 22°–35°S)',
            '✓ The low-pressure center is steered south of the subcontinent into the Southern Ocean',
            '✓ Only the trailing cold front sweeps across the southern tip of Africa',
          ],
          fullWorkedSolution:
            'South Africa is situated in the subtropics (22°S to 35°S). The core and warm front of mid-latitude cyclones are situated further south in the sub-polar low-pressure belt (40°–60°S). Consequently, the warm front remains far out to sea in the Southern Ocean, while only the extended cold front reaches the southern coastline of South Africa.',
          cognitiveLevel: 'Complex Procedures',
          examinerTip:
            'Draw a mental map: South Africa’s southernmost tip (Cape Agulhas) is 34.8°S; polar low centers pass around 45°–55°S.',
        },
        {
          subNumber: '1.2.1',
          prompt:
            'Tropical cyclones require sea surface temperatures of at least ... °C to form in the South-West Indian Ocean.',
          marks: 1,
          type: 'numeric',
          expectedShortAnswer: '26.5°C (or 27°C)',
          markingGuidelines: [
            '✓ 26.5°C or 27°C (accept 26°C to 28°C)',
          ],
          fullWorkedSolution:
            'Tropical cyclones require warm tropical ocean waters with a surface temperature of 26.5°C or higher to depths of at least 50 metres to supply sufficient moisture and latent heat of condensation.',
          cognitiveLevel: 'Knowledge',
          examinerTip: '26.5°C is the strict international meteorological threshold tested in CAPS.',
        },
        {
          subNumber: '1.2.2',
          prompt:
            'Explain the role of the Coriolis force in the development of a tropical cyclone, and explain why they never form between 0° and 5° latitude.',
          marks: 4,
          type: 'step-by-step',
          expectedShortAnswer: 'Coriolis force provides the rotational spin needed to deflect winds into a vortex; it is zero at the equator.',
          markingGuidelines: [
            '✓ Coriolis force deflects inflowing winds, creating the circular spiralling vortex around the low pressure',
            '✓ In the Southern Hemisphere, winds are deflected to the left, causing clockwise rotation',
            '✓ At the equator (0°–5°), Coriolis force is zero / negligible',
            '✓ Without Coriolis force, air flows directly into the low without spinning into a cyclone vortex',
          ],
          fullWorkedSolution:
            'The Coriolis force, caused by Earth’s rotation, causes moving air to deflect to the left in the Southern Hemisphere. This deflection forces inflowing air to spiral cyclonically around the central low-pressure eye. Between 0° and 5° latitude, the Coriolis force is zero (or near-zero), meaning air flows straight into the low pressure to equalize it rather than spinning, preventing vortex development.',
          cognitiveLevel: 'Complex Procedures',
          examinerTip:
            'Remember: Southern Hemisphere cyclones rotate CLOCKWISE; Northern Hemisphere rotate COUNTER-CLOCKWISE.',
        },
        {
          subNumber: '1.2.3',
          prompt:
            'Describe the atmospheric conditions found inside the EYE of a mature tropical cyclone.',
          marks: 3,
          type: 'step-by-step',
          expectedShortAnswer: 'Calm winds, clear skies, and sinking dry air.',
          markingGuidelines: [
            '✓ Calm winds / light breezes (no gale-force winds)',
            '✓ Cloudless / clear or partly clear skies with no rain',
            '✓ Descending (subsiding) warm, dry air',
          ],
          fullWorkedSolution:
            'The eye is a central circular area (20–50 km diameter) characterised by:\n1. Calm or very light winds.\n2. Clear or partly clear skies with little or no rainfall.\n3. Subsiding (sinking) air that warms adiabatically, suppressing cloud formation.',
          cognitiveLevel: 'Routine Procedures',
          examinerTip:
            'Contrast the EYE (calm, sinking air) with the EYE WALL (fiercest winds, torrential rain, cumulonimbus).',
        },
        {
          subNumber: '1.2.4',
          prompt:
            'Discuss TWO economic and TWO environmental impacts of a tropical cyclone making landfall on the coast of Mozambique and north-eastern South Africa (Limpopo/Mpumalanga).',
          marks: 4,
          type: 'step-by-step',
          expectedShortAnswer: 'Economic: infrastructure destruction and crop loss; Environmental: flooding and soil erosion.',
          markingGuidelines: [
            '✓ Economic 1: Destruction of transport infrastructure (roads, bridges, rail, power lines) halting commerce',
            '✓ Economic 2: Agricultural devastation (submerged crop fields, livestock drowning, food price inflation)',
            '✓ Environmental 1: Severe flash flooding, siltation of river channels, and destruction of riverine habitats',
            '✓ Environmental 2: Massive topsoil erosion, landslides on steep escarpment slopes, and saltwater contamination of freshwater aquifers',
          ],
          fullWorkedSolution:
            'Economic Impacts:\n1. Infrastructure damage: Destruction of bridges, roads, electricity pylons, and communication towers costs billions to repair and paralyses trade.\n2. Agricultural loss: Submerged maize, sugarcane, and citrus plantations destroy export revenue and trigger domestic food insecurity.\n\nEnvironmental Impacts:\n1. Topsoil loss & siltation: Torrential runoff strips fertile agricultural soils and silts up major dams like Loskop and Massingir.\n2. Habitat destruction: Mangrove estuaries and coastal wetlands are destroyed by violent storm surges and debris.',
          cognitiveLevel: 'Problem Solving',
          examinerTip: 'Categorize clearly under "Economic" and "Environmental" subheadings to secure full marks.',
        },
        {
          subNumber: '1.3.1',
          prompt:
            'During winter nights in South African valleys, cold dense air sinks down mountain slopes under gravity. Name this downslope wind.',
          marks: 1,
          type: 'step-by-step',
          expectedShortAnswer: 'Katabatic wind (or mountain breeze)',
          markingGuidelines: [
            '✓ Katabatic wind (or mountain breeze / gravity drainage wind)',
          ],
          fullWorkedSolution:
            'Katabatic winds occur at night when mountain slopes lose heat through terrestrial radiation. The air in contact with the slopes cools, becomes dense and heavy, and drains down into the valley floor under gravity.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Night = Katabatic (downslope); Day = Anabatic (upslope).',
        },
        {
          subNumber: '1.3.2',
          prompt:
            'Explain how a temperature inversion (thermal belt) develops in a deep valley at night.',
          marks: 4,
          type: 'step-by-step',
          expectedShortAnswer: 'Cold air sinks to the valley floor, forcing lighter warm air upwards to mid-slopes.',
          markingGuidelines: [
            '✓ Rapid nocturnal terrestrial radiation cools the high mountain slopes',
            '✓ Cold, dense air drains downslope (katabatic wind) and accumulates on the valley floor',
            '✓ The displaced warmer, lighter air is forced upwards to the middle slopes',
            '✓ Temperature now increases with height on the mid-slope, forming a thermal belt / temperature inversion',
          ],
          fullWorkedSolution:
            '1. On clear, calm winter nights, rapid terrestrial radiation cools the upper mountain slopes.\n2. The cold, dense air flows down the valley walls (katabatic flow) and collects at the valley bottom.\n3. The warmer, less dense air originally in the valley is pushed upwards.\n4. This creates a situation where temperature increases with altitude along the middle slopes (thermal belt) instead of decreasing with height, establishing a temperature inversion.',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'In normal atmosphere, temperature drops with height (lapse rate); in inversion, temperature RISES.',
        },
        {
          subNumber: '1.3.3',
          prompt:
            'Why do South African deciduous fruit farmers (e.g. in Ceres and Grabouw) plant frost-sensitive fruit orchards on the middle slopes of valleys rather than on the valley floor?',
          marks: 3,
          type: 'step-by-step',
          expectedShortAnswer: 'The valley floor experiences frost pockets, while the middle slope lies in the warm thermal belt.',
          markingGuidelines: [
            '✓ Valley floor is prone to sub-zero temperatures and frost pockets due to cold air accumulation',
            '✓ Frost freezes buds, blights blossoms, and destroys fruit crops',
            '✓ The middle slope is situated in the warmer thermal belt where temperatures remain above freezing',
          ],
          fullWorkedSolution:
            'The valley floor accumulates cold air below freezing point, forming a "frost pocket" that damages delicate blossoms and freezing fruit cells. The middle slopes lie within the thermal belt where temperatures remain significantly warmer throughout the night, protecting frost-sensitive orchards like apples, pears, and grapes from frost damage.',
          cognitiveLevel: 'Problem Solving',
          examinerTip:
            'Fruit on middle slopes (warm thermal belt); frost-resistant crops (e.g. fodder/potatoes) or pastures on the valley floor.',
        },
        {
          subNumber: '1.4.1',
          prompt:
            'Define an URBAN HEAT ISLAND (UHI).',
          marks: 2,
          type: 'step-by-step',
          expectedShortAnswer: 'An urban area that is significantly warmer than its surrounding rural surroundings.',
          markingGuidelines: [
            '✓ A metropolitan or built-up urban area that has significantly higher temperatures',
            '✓ Compared to the surrounding rural or peri-urban environment',
          ],
          fullWorkedSolution:
            'An urban heat island is a microclimatic phenomenon where an urban or metropolitan area experiences significantly higher surface and air temperatures than its surrounding rural hinterland, particularly during late afternoon and night.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Ensure you contrast the urban core temperature with the rural baseline.',
        },
        {
          subNumber: '1.4.2',
          prompt:
            'Explain THREE structural or human factors that contribute to higher temperatures in the Johannesburg or Durban CBD compared to rural areas.',
          marks: 6,
          type: 'step-by-step',
          expectedShortAnswer: 'Dark surfaces with low albedo, tall buildings trapping heat, and anthropogenic heat from vehicles and air-conditioners.',
          markingGuidelines: [
            '✓ Low albedo surfaces: Dark building materials (asphalt roads, tar, concrete, dark roofs) absorb high amounts of solar radiation during the day and release it as heat at night',
            '✓ Urban canyons / tall geometric architecture: High-rise skyscrapers create multiple reflective surfaces and trap longwave radiation, while reducing cooling wind flow',
            '✓ Anthropogenic heat generation: Exhaust fumes from vehicles, industrial machinery, air conditioning units, and power grids release artificial heat',
            '✓ Reduced evapotranspiration: Lack of vegetation and rapid stormwater drainage away from the city leaves less moisture for cooling latent heat evaporation',
          ],
          fullWorkedSolution:
            '1. Low Albedo & High Heat Capacity: Dense building materials like concrete, glass, tar, and asphalt have low reflectivity (albedo) and high heat capacity, absorbing solar energy during daylight and radiating it back at night.\n2. Multiple Reflection & Street Canyons: Tall vertical buildings reflect heat back and forth between surfaces and obstruct wind corridors, preventing natural convective cooling.\n3. Anthropogenic Heat Emissions: Massive density of vehicle engines, factories, commercial refrigeration, and air-conditioning units pump heat directly into the ambient canopy layer.\n4. Sparse Vegetation: Fewer trees and parks mean less evaporative cooling (evapotranspiration); rainfall is quickly removed via underground stormwater drains rather than moistening the soil.',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'Give distinct points: material properties, geometry, human heat, and lack of vegetation.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // QUESTION 2: GEOMORPHOLOGY & DRAINAGE BASINS (45 MARKS)
    // -----------------------------------------------------------------------
    {
      questionNumber: 2,
      title: 'QUESTION 2: GEOMORPHOLOGY',
      topicTag: 'Fluvial Geomorphology',
      totalMarks: 45,
      contextPreamble:
        'Refer to drainage basins, stream order, fluvial profiles, river rejuvenation, and river capture.',
      subQuestions: [
        {
          subNumber: '2.1.1',
          prompt:
            'Define a DRAINAGE BASIN.',
          marks: 2,
          type: 'step-by-step',
          expectedShortAnswer: 'The entire land area drained by a river system and its tributaries.',
          markingGuidelines: [
            '✓ The total catchment area of land',
            '✓ Drained by a main river and all its associated tributaries',
          ],
          fullWorkedSolution:
            'A drainage basin (or river catchment) is the total geographical land area drained by a river system comprising a main stream and all its tributaries, bounded by a watershed.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Watershed = boundary ridge; Drainage basin = the enclosed area drained.',
        },
        {
          subNumber: '2.1.2',
          prompt:
            'Name the high-lying ridge that separates two adjacent drainage basins.',
          marks: 1,
          type: 'step-by-step',
          expectedShortAnswer: 'Watershed (or drainage divide)',
          markingGuidelines: [
            '✓ Watershed (or drainage divide / interfluve ridge)',
          ],
          fullWorkedSolution:
            'A watershed (or drainage divide) is an elevated ridge of high ground that demarcates the boundary between two adjacent river drainage basins, determining which way precipitation flows.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Do not confuse watershed (between basins) with interfluve (between valleys in the same basin).',
        },
        {
          subNumber: '2.1.3',
          prompt:
            'In the Strahler stream ordering system, what order is formed when two 2nd-order streams join?',
          marks: 1,
          type: 'numeric',
          expectedShortAnswer: '3rd order (Order 3)',
          markingGuidelines: [
            '✓ 3rd order (or Order 3)',
          ],
          fullWorkedSolution:
            'Under the Strahler ordering system, when two streams of the SAME order join, the resulting downstream channel increases by one order. Therefore, 2 + 2 produces a 3rd-order stream.',
          cognitiveLevel: 'Routine Procedures',
          examinerTip:
            'Rule: 1 + 1 = 2; 2 + 2 = 3; 3 + 3 = 4. But 1 + 2 = 2 (the order does NOT increase if orders are unequal).',
        },
        {
          subNumber: '2.2.1',
          prompt:
            'Explain the difference between a DENDRITIC drainage pattern and a TRELLIS drainage pattern, citing the underlying rock structure of each.',
          marks: 4,
          type: 'step-by-step',
          expectedShortAnswer: 'Dendritic resembles tree branches on uniform rock; Trellis has parallel streams with right-angled joins on folded rock.',
          markingGuidelines: [
            '✓ Dendritic: Branches like tree veins; forms on rocks of uniform resistance (homogeneous igneous or flat sedimentary rock)',
            '✓ Trellis: Main streams flow parallel in synclines/strike valleys, tributaries join at 90° right angles',
            '✓ Trellis underlying rock: Alternating bands of hard and soft folded rock (anticlines and synclines)',
          ],
          fullWorkedSolution:
            '1. Dendritic Pattern: Resembles the branches of an oak tree or veins of a leaf. Develops on rocks of uniform resistance to erosion (homogeneous granite, flat-lying sedimentary beds) where tributaries join at acute angles.\n2. Trellis Pattern: Features main streams flowing parallel to one another in softer rock valleys, with short secondary tributaries joining perpendicularly at nearly 90° angles. Develops on folded, tilted strata with alternating bands of hard and soft sedimentary rock (e.g. Cape Fold Mountains).',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'Mention both the visual shape and the underlying geological structure for both.',
        },
        {
          subNumber: '2.2.2',
          prompt:
            'A river basin has a total stream length of 180 km and a total catchment surface area of 60 km². Calculate the DRAINAGE DENSITY of this basin, stating the correct units.',
          marks: 3,
          type: 'numeric',
          expectedShortAnswer: '3 km/km² (or 3 km·km⁻²)',
          markingGuidelines: [
            '✓ Formula: Drainage Density = Total Stream Length / Basin Area',
            '✓ Calculation: 180 km / 60 km² = 3',
            '✓ Correct unit: km/km² (or km·km⁻²)',
          ],
          fullWorkedSolution:
            'Drainage Density (D_d) = Total Stream Length (L) / Basin Area (A)\nD_d = 180 km / 60 km²\nD_d = 3 km/km² (or 3 km per square kilometre)',
          cognitiveLevel: 'Routine Procedures',
          examinerTip: 'Never omit units in geomorphology calculations: km/km².',
          formulaUsed: 'D_d = L / A',
        },
        {
          subNumber: '2.2.3',
          prompt:
            'State THREE environmental or soil factors that lead to HIGH drainage density in a river catchment.',
          marks: 3,
          type: 'step-by-step',
          expectedShortAnswer: 'Impermeable clay soils, sparse vegetation, and steep mountain gradients.',
          markingGuidelines: [
            '✓ Impermeable rock / dense clay soils (restricts infiltration, promotes high surface runoff)',
            '✓ Sparse or no vegetation cover (reduces interception and soil water absorption)',
            '✓ Steep topography / mountain slopes (gravity accelerates runoff, leaving no time to infiltrate)',
          ],
          fullWorkedSolution:
            'Factors producing high drainage density (many surface streams):\n1. Low permeability: Compact clay soil or solid crystalline bedrock prevents water soaking in.\n2. Sparse vegetation: Lack of plant roots and leaf canopy allows immediate sheetwash and gully formation.\n3. Steep gradient: Water rushes down steep slopes rapidly before infiltration can occur.\n4. High rainfall intensity: Torrential downpours exceed soil infiltration capacity.',
          cognitiveLevel: 'Routine Procedures',
          examinerTip:
            'High drainage density = High runoff + Low infiltration.',
        },
        {
          subNumber: '2.3.1',
          prompt:
            'Distinguish between a RIVER LONGITUDINAL PROFILE and a RIVER CROSS PROFILE.',
          marks: 2,
          type: 'step-by-step',
          expectedShortAnswer: 'Longitudinal is side view from source to mouth; Cross profile is cross-section view across the valley.',
          markingGuidelines: [
            '✓ Longitudinal profile: Side profile view showing river gradient from its source in mountains down to its mouth at sea level',
            '✓ Cross profile: Transverse cross-section cut across the river valley from bank to bank showing valley shape (V-shape vs open flood plain)',
          ],
          fullWorkedSolution:
            'A longitudinal profile is a side elevation view of a river channel tracing its slope from source to sea (upper, middle, lower course). A cross profile is a horizontal cross-sectional slice across the valley showing the width, depth, and valley wall gradient.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Longitudinal = Source to Mouth; Cross = Bank to Bank.',
        },
        {
          subNumber: '2.3.2',
          prompt:
            'Define RIVER REJUVENATION.',
          marks: 2,
          type: 'step-by-step',
          expectedShortAnswer: 'A process where a river gains renewed erosive energy, accelerating vertical downward cutting.',
          markingGuidelines: [
            '✓ River gains renewed energy / capacity to erode',
            '✓ Resumes active downward (vertical) erosion',
          ],
          fullWorkedSolution:
            'River rejuvenation is the process whereby a river system experiences a renewal of its erosive energy—usually due to isostatic crustal uplift or a drop in base sea level—causing it to actively cut downwards (vertical incision) into its existing floodplain.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Keywords: "renewed energy" and "vertical/downward erosion".',
        },
        {
          subNumber: '2.3.3',
          prompt:
            'Describe TWO landforms that provide evidence of river rejuvenation in the landscape.',
          marks: 4,
          type: 'step-by-step',
          expectedShortAnswer: 'Knickpoints (waterfalls), incised meanders, and paired river terraces.',
          markingGuidelines: [
            '✓ Knickpoint (waterfall/rapid): A sharp change in gradient marking where the new rejuvenation profile meets the old river bed',
            '✓ Paired river terraces: Step-like bench remnants of the old valley floor left high above the newly incised channel',
            '✓ Incised / entrenched meanders: Deeply carved meandering gorges cut into bedrock where vertical erosion dominates an existing meandering river',
          ],
          fullWorkedSolution:
            '1. River Terraces (paired terraces): Step-like elevated benches on either side of the valley representing the remnants of the former floodplain before the river carved downwards.\n2. Knickpoints (Waterfalls & Rapids): A sharp break in the river slope where the new erosion cycle is migrating upstream.\n3. Incised / Entrenched Meanders: Meandering loops cut deeply into hard solid bedrock (e.g. Blyde River Canyon).',
          cognitiveLevel: 'Routine Procedures',
          examinerTip: 'Learn the definitions for knickpoints, river terraces, and incised meanders.',
        },
        {
          subNumber: '2.4.1',
          prompt:
            'In a river capture (piracy) event, define the CAPTOR STREAM and the CAPTURED STREAM.',
          marks: 2,
          type: 'step-by-step',
          expectedShortAnswer: 'Captor stream has more energy and steals water; captured stream loses its headwaters.',
          markingGuidelines: [
            '✓ Captor stream: Energetic stream with a steeper gradient that erodes backwards (headward erosion) and intercepts another stream',
            '✓ Captured stream: The stream whose upper waters are pirated and diverted into the captor stream',
          ],
          fullWorkedSolution:
            'The captor stream is the more vigorously eroding stream with a steeper gradient and lower base level that erodes headwards until it intercepts and intercepts the headwaters of an adjacent river. The captured stream is the stream whose upper headwaters are diverted away.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Captor = Thief; Captured = Victim.',
        },
        {
          subNumber: '2.4.2',
          prompt:
            'Identify and describe the following THREE features of river capture:\n(a) Elbow of capture\n(b) Wind gap\n(c) Misfit stream',
          marks: 6,
          type: 'step-by-step',
          expectedShortAnswer: 'Elbow of capture: sharp 90° bend; Wind gap: dry abandoned river bed with gravels; Misfit stream: tiny river in giant valley.',
          markingGuidelines: [
            '✓ (a) Elbow of capture: The sharp right-angled bend at the point of piracy where water abruptly changes direction into the captor',
            '✓ (b) Wind gap: The dry, abandoned river valley containing river gravels between the elbow and the remaining stream',
            '✓ (c) Misfit stream: The shrunken remnant of the captured stream that is too small for the oversized valley it now occupies',
          ],
          fullWorkedSolution:
            '(a) Elbow of capture: The sharp, abrupt right-angled (90°) bend in the river channel where the diverted water turns into the captor stream.\n(b) Wind gap: The dry valley section between the elbow of capture and the misfit stream where water no longer flows, often containing alluvial river gravels.\n(c) Misfit (beheaded) stream: The downstream portion of the captured river which has lost its upper catchment water and now appears far too small to have carved the spacious valley it flows through.',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'These 3 landforms appear repeatedly in NSC final exams. Master the definitions and diagrams.',
        },
        {
          subNumber: '2.4.3',
          prompt:
            'Explain TWO negative consequences for farmers situated along the MISFIT STREAM after river capture has occurred.',
          marks: 3,
          type: 'step-by-step',
          expectedShortAnswer: 'Reduced water volume for irrigation and drop in silt deposition for soil fertility.',
          markingGuidelines: [
            '✓ Drastic reduction in river discharge / water volume for crop irrigation and livestock watering',
            '✓ Lower deposition of fertile alluvial silt during seasonal floods, reducing agricultural soil fertility',
            '✓ Falling water table in the valley floor drying out shallow boreholes',
          ],
          fullWorkedSolution:
            '1. Severe water shortages: Because the headwaters have been captured, stream discharge drops drastically, leaving insufficient water for crop irrigation, livestock, and domestic farm use.\n2. Loss of fertile alluvium: Reduced flow prevents seasonal overbank flooding, halting the deposition of mineral-rich silt needed for fertile agricultural topsoils.',
          cognitiveLevel: 'Problem Solving',
          examinerTip: 'Link the geomorphological change (loss of water) directly to farming operations.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // QUESTION 3: RURAL & URBAN SETTLEMENT (30 MARKS)
    // -----------------------------------------------------------------------
    {
      questionNumber: 3,
      title: 'QUESTION 3: RURAL AND URBAN SETTLEMENT',
      topicTag: 'Settlement Geography',
      totalMarks: 30,
      contextPreamble:
        'Refer to rural settlement patterns, South African land reform, urban land-use zones, and urban decline.',
      subQuestions: [
        {
          subNumber: '3.1.1',
          prompt:
            'Distinguish between a NUCLEATED rural settlement and a DISPERSED rural settlement.',
          marks: 2,
          type: 'step-by-step',
          expectedShortAnswer: 'Nucleated has buildings clustered together; Dispersed has isolated farmsteads separated by large distances.',
          markingGuidelines: [
            '✓ Nucleated: Farmhouses and buildings are clustered closely together around a central focal point (church, crossroads, water)',
            '✓ Dispersed: Individual farmsteads are scattered and isolated far apart across the landscape',
          ],
          fullWorkedSolution:
            'A nucleated rural settlement consists of dwellings grouped closely together in a village or hamlet. A dispersed settlement consists of isolated, individual homesteads separated by vast farmland.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Nucleated = Clustered; Dispersed = Isolated / Scattered.',
        },
        {
          subNumber: '3.1.2',
          prompt:
            'State ONE social advantage and ONE economic disadvantage of living in a nucleated rural village.',
          marks: 2,
          type: 'step-by-step',
          expectedShortAnswer: 'Advantage: social interaction and shared services; Disadvantage: fragmented farming plots and travel time to fields.',
          markingGuidelines: [
            '✓ Social Advantage: Greater social interaction, community security, and shared communal services (schools, clinics, church)',
            '✓ Economic Disadvantage: Farmland is located far from homesteads, causing wasted travel time and fragmented small plots',
          ],
          fullWorkedSolution:
            'Social Advantage: Residents have close social interaction, cooperative farm work, better communal safety, and easier access to shared schools and clinics.\nEconomic Disadvantage: Farmers do not live on their land; they waste daily travel time walking to distant fragmented plots, and individual decision-making is constrained.',
          cognitiveLevel: 'Routine Procedures',
          examinerTip: 'Ensure one point is SOCIAL and the other is ECONOMIC.',
        },
        {
          subNumber: '3.2.1',
          prompt:
            'Explain the THREE pillars of South Africa’s Land Reform Programme:\n(a) Land Restitution\n(b) Land Redistribution\n(c) Land Tenure Reform',
          marks: 6,
          type: 'step-by-step',
          expectedShortAnswer: 'Restitution: restoring land to victims of 1913 Act; Redistribution: providing land to disadvantaged; Tenure: securing rights of farm dwellers.',
          markingGuidelines: [
            '✓ (a) Land Restitution: Restoring land or paying financial compensation to individuals/communities dispossessed of property under racially discriminatory laws after 19 June 1913',
            '✓ (b) Land Redistribution: Government purchasing agricultural land to provide residential and farming access to disadvantaged and poor South Africans',
            '✓ (c) Land Tenure Reform: Providing legal security of land tenure and protecting the housing rights of labour tenants, farm workers, and communal land residents',
          ],
          fullWorkedSolution:
            '(a) Land Restitution: Aims to restore land rights or provide equitable monetary compensation to individuals and communities who were forcibly removed from their land after 19 June 1913 under racially discriminatory legislation like the Native Land Act.\n(b) Land Redistribution: Focuses on government acquiring commercial farmland on a "willing buyer, willing seller" basis to transfer to previously disadvantaged individuals to reduce racial inequalities in land ownership.\n(c) Land Tenure Reform: Seeks to formalise and protect the legal tenure rights of vulnerable farm dwellers, labour tenants, and people residing on communal land under traditional authorities.',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'Do not confuse Restitution (1913 historical claims) with Redistribution (broad socio-economic transfer).',
        },
        {
          subNumber: '3.3.1',
          prompt:
            'Define URBAN DECAY (blight) and identify the urban zone where it is most severe in South African cities.',
          marks: 3,
          type: 'step-by-step',
          expectedShortAnswer: 'Deterioration of buildings in the transition zone (zone of decay) adjacent to the CBD.',
          markingGuidelines: [
            '✓ Urban decay: The physical deterioration, dilapidation, and neglect of buildings and infrastructure over time',
            '✓ Most severe zone: Transition Zone (Zone of Decay / Twilight Zone / Inner City fringe) directly surrounding the CBD',
          ],
          fullWorkedSolution:
            'Urban decay is the process whereby previously functioning urban buildings and public infrastructure fall into disrepair, abandonment, and structural dilapidation.\nIn South African cities (e.g. Hillbrow and inner-city Johannesburg, Point area in Durban), it is most severe in the Transition Zone (Zone of Decay) bordering the Central Business District.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Transition zone has landlords expecting commercial rezoning, leading to speculative neglect.',
        },
        {
          subNumber: '3.3.2',
          prompt:
            'Explain THREE pull factors that have driven commercial decentralisation of retail and financial headquarters from traditional city CBDs to suburban nodes like Sandton (Johannesburg) or Umhlanga (Durban).',
          marks: 6,
          type: 'step-by-step',
          expectedShortAnswer: 'Safe secure modern office parks, ample parking, proximity to high-income workforce, and avoidance of traffic congestion.',
          markingGuidelines: [
            '✓ Modern secure office parks: Access to high-tech, gated office complexes with private security and landscaped environments',
            '✓ Traffic congestion and parking: Suburbs offer wide road networks and abundant, secure customer/employee parking compared to cramped CBDs',
            '✓ Proximity to high-income residential suburbs: Closer to affluent managerial talent and high-spending consumers (e.g. northern suburbs of Johannesburg)',
            '✓ Lower crime perceptions and clean environments: Cleaner streets and reduced perceptions of inner-city crime and overcrowding',
          ],
          fullWorkedSolution:
            '1. Modern Infrastructure & Security: Edge-city developments (like Sandton City and Gateway Umhlanga) offer 24-hour private precinct security, uninterrupted backup solar/generator grids, and state-of-the-art office architecture.\n2. Accessibility & Parking: Suburban nodes provide expansive multi-level parking garages and direct freeway interchanges (e.g. N1/M1), avoiding the severe gridlock and expensive parking of the old CBD.\n3. Closeness to Affluent Consumers: Positioning headquarters close to high-income residential zones cuts commute times for executive staff and places luxury retail outlets on consumers’ doorsteps.',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'Differentiate PULL factors of suburbs from PUSH factors of the old CBD.',
        },
        {
          subNumber: '3.3.3',
          prompt:
            'Propose THREE sustainable strategies local South African municipalities can implement to upgrade INFORMAL SETTLEMENTS without displacing residents.',
          marks: 6,
          type: 'step-by-step',
          expectedShortAnswer: 'In-situ upgrading with formal electricity/piped water, gravel road paving for emergency access, and tenure formalisation.',
          markingGuidelines: [
            '✓ In-situ service provision: Installing communal water standpipes, flush/chemical sanitation, and municipal electricity meters',
            '✓ Access roads and firebreaks: Re-blocking shacks to create wide gravel roads for emergency fire trucks and ambulances',
            '✓ Secure tenure and title deeds: Issuing municipal addresses and site occupation permits so residents can safely invest in their homes',
            '✓ Solid waste collection: Establishing skip containers and weekly rubbish collection to prevent illegal dumping and rodent infestations',
          ],
          fullWorkedSolution:
            '1. In-Situ Upgrading of Basic Municipal Services: Supplying prepaid electrical lines (reducing shack fire risks from candles/paraffin), clean potable piped water points, and ventilated improved pit (VIP) or waterborne sewerage systems.\n2. Re-Blocking for Spatial Planning & Firebreaks: Rearranging shacks into orderly surveyed clusters with wide demarcated access lanes to prevent runaway shack fires and ensure ambulances and waste trucks can enter.\n3. Security of Tenure & Certificate of Occupation: Granting registered title deeds or long-term occupation certificates, which empowers families to upgrade shacks into permanent brick dwellings without fear of eviction.',
          cognitiveLevel: 'Problem Solving',
          examinerTip: 'Always focus on "in-situ" (upgrading on-site) rather than mass evictions.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // QUESTION 4: ECONOMIC GEOGRAPHY OF SOUTH AFRICA (30 MARKS)
    // -----------------------------------------------------------------------
    {
      questionNumber: 4,
      title: 'QUESTION 4: ECONOMIC GEOGRAPHY OF SOUTH AFRICA',
      topicTag: 'Economic Geography & Map Skills',
      totalMarks: 30,
      contextPreamble:
        'Refer to economic sectors, mining, core industrial regions, and 1:50 000 topographic map skills.',
      subQuestions: [
        {
          subNumber: '4.1.1',
          prompt:
            'Classify the following economic activities into PRIMARY, SECONDARY, or TERTIARY sectors:\n(a) Maize farming in the Free State\n(b) Motor vehicle manufacturing in Port Elizabeth / Gqeberha\n(c) Tourism and banking in Cape Town',
          marks: 3,
          type: 'step-by-step',
          expectedShortAnswer: '(a) Primary, (b) Secondary, (c) Tertiary',
          markingGuidelines: [
            '✓ (a) Primary sector (raw material extraction / agriculture)',
            '✓ (b) Secondary sector (manufacturing / processing)',
            '✓ (c) Tertiary sector (services / trade / finance)',
          ],
          fullWorkedSolution:
            '(a) Maize farming = Primary economic sector (direct extraction of natural food resources).\n(b) Motor vehicle assembly = Secondary economic sector (processing and fabricating raw materials into manufactured goods).\n(c) Tourism and banking = Tertiary economic sector (provision of services and hospitality).',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Primary = Extraction; Secondary = Manufacturing; Tertiary = Services.',
        },
        {
          subNumber: '4.1.2',
          prompt:
            'State TWO physical factors that favour agriculture in South Africa and TWO physical factors that hinder agriculture.',
          marks: 4,
          type: 'step-by-step',
          expectedShortAnswer: 'Favour: diverse climate and long sunshine hours; Hinder: low average rainfall and soil erosion.',
          markingGuidelines: [
            '✓ Favour 1: Long sunshine hours / warm temperatures throughout the year',
            '✓ Favour 2: Diverse climatic zones allowing varied crop cultivation (subtropical fruits, Mediterranean grapes/wheat, summer grain)',
            '✓ Hinder 1: Low average rainfall (80% of SA receives under 500 mm/year, making it a water-scarce country)',
            '✓ Hinder 2: High evaporation rates, frequent droughts, and poor shallow soil fertility',
          ],
          fullWorkedSolution:
            'Physical Factors Favouring Agriculture:\n1. High sunshine duration: Ample solar radiation promotes rapid photosynthesis and ripening of grains and fruits.\n2. Climatic diversity: Ranging from winter rainfall in the SW Cape (ideal for vineyards and wheat) to subtropical coastlines (ideal for bananas, sugarcane, and avocados).\n\nPhysical Factors Hindering Agriculture:\n1. Semi-arid climate & water scarcity: Average rainfall is barely 460 mm/year (far below the global average of 860 mm).\n2. Unreliable rainfall & severe El Niño droughts: Periodic prolonged droughts coupled with thin, infertile topsoils susceptible to severe soil erosion.',
          cognitiveLevel: 'Routine Procedures',
          examinerTip: 'Ensure points are PHYSICAL (climate/soil), not human/economic factors.',
        },
        {
          subNumber: '4.2.1',
          prompt:
            'Name South Africa’s largest core industrial region that accounts for over 40% of national manufacturing output.',
          marks: 1,
          type: 'step-by-step',
          expectedShortAnswer: 'PWV (Pretoria-Witwatersrand-Vereeniging) / Gauteng region',
          markingGuidelines: [
            '✓ PWV (Pretoria-Witwatersrand-Vereeniging) or Gauteng industrial region',
          ],
          fullWorkedSolution:
            'The PWV (Pretoria-Witwatersrand-Vereeniging) complex in Gauteng is the industrial heartland and economic engine of South Africa and Southern Africa.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Remember the 4 core regions: PWV, Durban-Pinetown, Southwestern Cape, Port Elizabeth-Uitenhage.',
        },
        {
          subNumber: '4.2.2',
          prompt:
            'Discuss THREE locational advantages that enabled the PWV / Gauteng industrial complex to become the dominant industrial powerhouse, despite having no ocean seaport.',
          marks: 6,
          type: 'step-by-step',
          expectedShortAnswer: 'Abundant mineral wealth (gold/coal), massive consumer market, and dense rail and road transport hub.',
          markingGuidelines: [
            '✓ Proximity to rich mineral deposits: Initial discovery of the Witwatersrand gold reef and close proximity to vast Mpumalanga coal deposits for cheap electricity',
            '✓ Massive consumer purchasing market: Densest population concentration in South Africa, providing huge local market demand for manufactured products',
            '✓ Converging transport infrastructure: Dense hub of radial railway networks, national highways (N1, N3, N4, N12), and OR Tambo International Airport',
            '✓ Skilled & unskilled labour pool: Attracted millions of skilled engineers, managers, and migrant labourers from across Africa',
          ],
          fullWorkedSolution:
            '1. Raw Materials & Energy Base: Built upon the world’s richest gold reserves and situated adjacent to the Mpumalanga coalfields, enabling Eskom’s coal power stations to supply heavy industry with abundant electricity.\n2. Concentrated Market & Labour Force: Gauteng houses over 15 million consumers, generating tremendous domestic purchasing power, and boasts a concentration of universities, technical colleges, and skilled technicians.\n3. Transportation Hub: Extensive rail marshalling yards (City Deep dry port) and major highway arteries link the PWV seamlessly to all regional Southern African markets and coastal ports (Durban harbor via N3 corridor).',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'Highlight raw materials, transport convergence, and market density.',
        },
        {
          subNumber: '4.3.1',
          prompt:
            'On a 1:50 000 topographic map, the distance measured between two trigonometrical beacons is 8.4 cm. Calculate the ACTUAL GROUND DISTANCE in kilometres.',
          marks: 3,
          type: 'numeric',
          expectedShortAnswer: '4.2 km',
          markingGuidelines: [
            '✓ Formula: Actual Distance = Map Distance (cm) × 0.5 km (for 1:50 000)',
            '✓ Calculation: 8.4 cm × 0.5 = 4.2',
            '✓ Correct unit: 4.2 km',
          ],
          fullWorkedSolution:
            'Map scale 1:50 000 means 1 cm on map = 50 000 cm on ground.\n50 000 cm = 500 m = 0.5 km.\nActual Distance = 8.4 cm × 0.5 km = 4.2 km.',
          cognitiveLevel: 'Routine Procedures',
          examinerTip: 'Shortcut for 1:50 000 maps: Distance in km = Distance in cm divided by 2.',
          formulaUsed: 'Actual Distance = Map Distance (cm) × 0.5 km',
        },
        {
          subNumber: '4.3.2',
          prompt:
            'Trigonometrical beacon A has an altitude of 1 450 m and spot height B has an altitude of 1 250 m. The horizontal distance between them is 4 000 m. Calculate the AVERAGE GRADIENT between A and B, expressing your answer as a ratio 1 : ...',
          marks: 4,
          type: 'numeric',
          expectedShortAnswer: '1 : 20',
          markingGuidelines: [
            '✓ Vertical Interval (VI) = 1 450 m - 1 250 m = 200 m',
            '✓ Horizontal Equivalent (HE) = 4 000 m',
            '✓ Gradient = VI / HE = 200 m / 4 000 m',
            '✓ Simplify ratio: 200/200 : 4 000/200 = 1 : 20',
          ],
          fullWorkedSolution:
            'Gradient = Vertical Interval (VI) / Horizontal Equivalent (HE)\nVI = 1 450 m - 1 250 m = 200 m\nHE = 4 000 m\nGradient = 200 / 4 000 = 1 / 20\nAverage gradient = 1 : 20\n(Meaning for every 20 metres travelled horizontally, the land rises or drops by 1 vertical metre).',
          cognitiveLevel: 'Routine Procedures',
          examinerTip: 'Ensure both VI and HE are in METRES before dividing. Always express final answer as 1 : X.',
          formulaUsed: 'Gradient = VI / HE',
        },
        {
          subNumber: '4.3.3',
          prompt:
            'Explain how Geographic Information Systems (GIS) satellite remote sensing can assist the Department of Water and Sanitation in monitoring drought and dam capacity across South Africa.',
          marks: 3,
          type: 'step-by-step',
          expectedShortAnswer: 'Satellite imagery monitors surface water levels of dams, detects vegetation stress, and models rainfall shortages.',
          markingGuidelines: [
            '✓ Multi-spectral satellite sensors detect surface area shrinkage of major reservoirs and dams in real time',
            '✓ Normalised Difference Vegetation Index (NDVI) detects plant chlorophyll loss and soil moisture depletion',
            '✓ Layering spatial data (buffers, rainfall stations, population demands) allows early drought disaster relief planning',
          ],
          fullWorkedSolution:
            '1. Surface Water Surface Extent: Satellites (e.g. Sentinel, Landsat) capture frequent infrared imagery showing the exact surface shrinkage of dams like Vaal and Gariep.\n2. Vegetation Indexing (NDVI): Multi-spectral sensors measure crop stress and biomass vigor across farming zones, detecting drought weeks before visible wilting.\n3. Data Overlay & Spatial Modeling: GIS maps overlay dam storage layers with human population demands and pipeline networks to optimize water restrictions and emergency water truck dispatch.',
          cognitiveLevel: 'Problem Solving',
          examinerTip: 'Mention specific GIS functions: satellite sensors, layer overlay, and spatial decision-making.',
        },
      ],
    },
  ],
};

// =========================================================================
// 2. 2024 NOVEMBER NSC - LIFE SCIENCES (150 MARKS, 2.5 HOURS)
// =========================================================================
export const LIFE_SCIENCES_2024_P1: FullQuestionPaper = {
  id: 'dbe_nsc_2024_life_p1',
  subjectId: 'fet_life_sci',
  subjectName: 'Life Sciences Paper 1 & 2 (DNA, Meiosis, Genetics, Endocrine, Homeostasis & Evolution)',
  grade: 12,
  year: 2024,
  session: 'November NSC',
  paperNumber: 1,
  totalMarks: 150,
  timeAllowedMinutes: 150,
  officialCode: 'DBE/November 2024 NSC — Life Sciences',
  instructions: [
    'Answer ALL the questions.',
    'Write ALL the answers in the answer book provided.',
    'Start the answers to EACH question at the top of a NEW page.',
    'Number the answers correctly according to the numbering system used in this question paper.',
    'Present your answers according to the regulations of each question.',
    'Do ALL drawings in pencil and label them in blue or black ink.',
    'Draw diagrams, tables or flow charts ONLY when asked to do so.',
    'The use of approved non-programmable calculators is permissible.',
    'Write neatly and legibly.',
  ],
  formulaSheetCategory: 'lifesciences',
  questions: [
    // -----------------------------------------------------------------------
    // SECTION A: QUESTION 1 (50 MARKS)
    // -----------------------------------------------------------------------
    {
      questionNumber: 1,
      title: 'SECTION A: QUESTION 1 (SHORT QUESTIONS & TERMINOLOGY)',
      topicTag: 'Comprehensive CAPS Life Sciences',
      totalMarks: 50,
      contextPreamble:
        'Section A consists of objective multiple-choice questions, biological terminology, column matching, and diagram interpretation.',
      subQuestions: [
        {
          subNumber: '1.1.1',
          prompt:
            'Which of the following nitrogenous bases is found in RNA but NOT in DNA?',
          marks: 2,
          type: 'mcq',
          options: ['Thymine', 'Uracil', 'Cytosine', 'Guanine'],
          expectedShortAnswer: 'Uracil',
          markingGuidelines: [
            '✓ Uracil (DNA has A, T, C, G; RNA has A, U, C, G)',
          ],
          fullWorkedSolution:
            'In RNA, Uracil replaces Thymine as the pyrimidine base complementary to Adenine.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Uracil = RNA; Thymine = DNA.',
        },
        {
          subNumber: '1.1.2',
          prompt:
            'During which phase of meiosis does crossing over occur?',
          marks: 2,
          type: 'mcq',
          options: ['Metaphase I', 'Prophase I', 'Anaphase II', 'Telophase I'],
          expectedShortAnswer: 'Prophase I',
          markingGuidelines: [
            '✓ Prophase I',
          ],
          fullWorkedSolution:
            'Crossing over occurs during Prophase I of meiosis when non-sister chromatids of homologous chromosome pairs touch at chiasmata and exchange genetic segments.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Prophase I = Crossing over; Metaphase I = Random arrangement at equator.',
        },
        {
          subNumber: '1.1.3',
          prompt:
            'The hormone responsible for increasing water reabsorption in the collecting ducts of the human kidney is ...',
          marks: 2,
          type: 'mcq',
          options: ['Aldosterone', 'Antidiuretic hormone (ADH)', 'Insulin', 'Glucagon'],
          expectedShortAnswer: 'Antidiuretic hormone (ADH)',
          markingGuidelines: [
            '✓ Antidiuretic hormone (ADH)',
          ],
          fullWorkedSolution:
            'ADH (vasopressin), secreted by the posterior pituitary gland, increases the permeability of the distal convoluted tubules and collecting ducts to water, increasing water reabsorption into blood.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'ADH controls water balance (osmoregulation); Aldosterone controls sodium/salt balance.',
        },
        {
          subNumber: '1.1.4',
          prompt:
            'A human male with red-green colour blindness (XᵇY) has children with a homozygous normal vision female (XᴮXᴮ). What percentage of their daughters will be carriers?',
          marks: 2,
          type: 'mcq',
          options: ['0%', '25%', '50%', '100%'],
          expectedShortAnswer: '100%',
          markingGuidelines: [
            '✓ 100% of daughters will be carriers (XᴮXᵇ)',
          ],
          fullWorkedSolution:
            'Father passes his only X chromosome (Xᵇ) to all daughters. Mother passes a dominant normal X chromosome (Xᴮ) to all daughters. All daughters inherit Xᴮ from mother and Xᵇ from father = genotype XᴮXᵇ (100% carriers with normal vision).',
          cognitiveLevel: 'Routine Procedures',
          examinerTip: 'Daughters receive the father’s affected X chromosome without fail.',
        },
        {
          subNumber: '1.1.5',
          prompt:
            'The scientific hypothesis proposing that modern humans evolved in Africa and later migrated to colonise the rest of the world is known as the ...',
          marks: 2,
          type: 'mcq',
          options: ['Multiregional hypothesis', 'Out-of-Africa hypothesis', 'Lamarckian hypothesis', 'Punctuated equilibrium hypothesis'],
          expectedShortAnswer: 'Out-of-Africa hypothesis',
          markingGuidelines: [
            '✓ Out-of-Africa hypothesis',
          ],
          fullWorkedSolution:
            'The "Out-of-Africa" hypothesis states that modern Homo sapiens evolved exclusively in Africa approximately 200 000 years ago and subsequently migrated out to populate other continents, supported by mitochondrial DNA (mtDNA) and rich African hominid fossils.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Supported by mtDNA (Mitochondrial Eve) and fossil hominid discoveries in the Cradle of Humankind.',
        },
        {
          subNumber: '1.2.1',
          prompt:
            'Give the correct biological term for: The process by which mRNA is synthesized from a DNA template strand in the nucleus.',
          marks: 1,
          type: 'step-by-step',
          expectedShortAnswer: 'Transcription',
          markingGuidelines: [
            '✓ Transcription',
          ],
          fullWorkedSolution:
            'Transcription is the process where a specific section of DNA unwinds and unzips, and complementary RNA nucleotides line up to synthesize a single-stranded mRNA molecule.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'In nucleus = Transcription; At ribosome = Translation.',
        },
        {
          subNumber: '1.2.2',
          prompt:
            'Give the correct biological term for: The failure of homologous chromosomes or sister chromatids to separate during Anaphase I or II of meiosis.',
          marks: 1,
          type: 'step-by-step',
          expectedShortAnswer: 'Non-disjunction',
          markingGuidelines: [
            '✓ Non-disjunction',
          ],
          fullWorkedSolution:
            'Non-disjunction is the abnormal distribution of chromosomes resulting from failure to separate cleanly during anaphase, leading to gametes with n+1 or n-1 chromosomes (e.g. Down syndrome).',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Spelling must be exact in DBE marking: non-disjunction.',
        },
        {
          subNumber: '1.2.3',
          prompt:
            'Give the correct biological term for: Alternative forms of the same gene situated at the same locus on homologous chromosomes.',
          marks: 1,
          type: 'step-by-step',
          expectedShortAnswer: 'Alleles',
          markingGuidelines: [
            '✓ Allele / Alleles',
          ],
          fullWorkedSolution:
            'Alleles are variant nucleotide sequences of a given gene residing at identical gene loci on a pair of homologous chromosomes (e.g. B for brown eyes and b for blue eyes).',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Gene = characteristic (eye colour); Allele = variation (brown vs blue).',
        },
        {
          subNumber: '1.2.4',
          prompt:
            'Give the correct biological term for: The maintenance of a constant internal environment within physiological limits in the human body.',
          marks: 1,
          type: 'step-by-step',
          expectedShortAnswer: 'Homeostasis',
          markingGuidelines: [
            '✓ Homeostasis',
          ],
          fullWorkedSolution:
            'Homeostasis is the dynamic equilibrium mechanism maintaining a stable internal physical and chemical milieu (body temperature, blood glucose, water, pH) despite external changes.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Homeo = same; stasis = state.',
        },
        {
          subNumber: '1.2.5',
          prompt:
            'Give the correct biological term for: The speciation process that occurs when a parent population is divided by a physical geographic barrier.',
          marks: 1,
          type: 'step-by-step',
          expectedShortAnswer: 'Allopatric speciation',
          markingGuidelines: [
            '✓ Allopatric speciation',
          ],
          fullWorkedSolution:
            'Allopatric speciation occurs when a single biological population is split into two geographically isolated groups (by a mountain, river, or desert), preventing gene flow and allowing divergent natural selection.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Allo = other; patric = homeland. Geographical barrier = Allopatric.',
        },
        {
          subNumber: '1.2.6',
          prompt:
            'Give the correct biological term for: The three consecutive nitrogenous bases on an mRNA molecule that code for a specific amino acid.',
          marks: 1,
          type: 'step-by-step',
          expectedShortAnswer: 'Codon',
          markingGuidelines: [
            '✓ Codon (on mRNA; anticodon is on tRNA)',
          ],
          fullWorkedSolution:
            'A codon is a triplet sequence of three mRNA nucleotides corresponding to a specific amino acid or stop signal in genetic translation.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Codon is on mRNA; Anticodon is on tRNA.',
        },
        {
          subNumber: '1.2.7',
          prompt:
            'Give the correct biological term for: The master endocrine gland situated at the base of the brain attached to the hypothalamus.',
          marks: 1,
          type: 'step-by-step',
          expectedShortAnswer: 'Pituitary gland (or hypophysis)',
          markingGuidelines: [
            '✓ Pituitary gland (or hypophysis)',
          ],
          fullWorkedSolution:
            'The pituitary gland (hypophysis) secretes tropic hormones (TSH, FSH, LH, ACTH, GH, ADH, oxytocin) coordinating other endocrine organs.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Also accept hypophysis.',
        },
        {
          subNumber: '1.2.8',
          prompt:
            'Give the correct biological term for: The bond that links adjacent amino acids together in a polypeptide chain.',
          marks: 1,
          type: 'step-by-step',
          expectedShortAnswer: 'Peptide bond',
          markingGuidelines: [
            '✓ Peptide bond',
          ],
          fullWorkedSolution:
            'A peptide bond is a covalent chemical bond formed between the carboxyl group of one amino acid and the amino group of another via condensation.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Peptide bond links amino acids; Hydrogen bond links nitrogenous bases.',
        },
        {
          subNumber: '1.3.1',
          prompt:
            'Match Column I with Column II: Insulin\nA: Produced by alpha cells of pancreas\nB: Lower blood glucose levels by converting glucose into glycogen\nIndicate: A only, B only, Both A and B, or None.',
          marks: 2,
          type: 'choice',
          expectedShortAnswer: 'B only',
          markingGuidelines: [
            '✓ B only (Insulin is produced by BETA cells, not alpha cells)',
          ],
          fullWorkedSolution:
            'Insulin is produced by the beta cells of the Islets of Langerhans (not alpha cells). Its function is to lower elevated blood glucose by promoting cellular absorption and converting glucose into glycogen in liver and muscle cells. Therefore, statement B only is correct.',
          cognitiveLevel: 'Routine Procedures',
          examinerTip: 'Beta cells = Insulin; Alpha cells = Glucagon.',
        },
        {
          subNumber: '1.3.2',
          prompt:
            'Match Column I with Column II: Down syndrome\nA: Trisomy 21\nB: Caused by non-disjunction of chromosome pair 21\nIndicate: A only, B only, Both A and B, or None.',
          marks: 2,
          type: 'choice',
          expectedShortAnswer: 'Both A and B',
          markingGuidelines: [
            '✓ Both A and B',
          ],
          fullWorkedSolution:
            'Down syndrome is characterized by an extra copy of chromosome 21 (Trisomy 21), resulting from non-disjunction during meiosis when chromosome pair 21 fails to segregate.',
          cognitiveLevel: 'Routine Procedures',
          examinerTip: 'Both statements are scientifically accurate.',
        },
        {
          subNumber: '1.3.3',
          prompt:
            'Match Column I with Column II: Lamarck’s evolutionary theory\nA: Inheritance of acquired characteristics\nB: Survival of the fittest\nIndicate: A only, B only, Both A and B, or None.',
          marks: 2,
          type: 'choice',
          expectedShortAnswer: 'A only',
          markingGuidelines: [
            '✓ A only ("Survival of the fittest" belongs to Charles Darwin / Herbert Spencer)',
          ],
          fullWorkedSolution:
            'Jean-Baptiste Lamarck postulated the "Law of Use and Disuse" and the "Inheritance of Acquired Characteristics". "Survival of the fittest" is a core tenet of Darwinian natural selection. Thus, A only applies to Lamarck.',
          cognitiveLevel: 'Routine Procedures',
          examinerTip: 'Lamarck = Acquired characteristics; Darwin = Natural selection / Survival of the fittest.',
        },
        {
          subNumber: '1.4.1',
          prompt:
            'A DNA segment has the following base sequence on the coding strand: T - A - C - C - G - A - A - T - T\n(a) Write down the complementary mRNA codon sequence.\n(b) How many amino acids will this sequence code for?\n(c) Name the organelle where translation occurs.',
          marks: 5,
          type: 'step-by-step',
          expectedShortAnswer: '(a) A - U - G - G - C - U - U - A - A; (b) 3 amino acids; (c) Ribosome',
          markingGuidelines: [
            '✓ (a) mRNA sequence: A - U - G - G - C - U - U - A - A (3 marks: 1 for each codon)',
            '✓ (b) 3 amino acids (9 bases / 3 bases per codon = 3 amino acids)',
            '✓ (c) Ribosome (in cytoplasm / rough endoplasmic reticulum)',
          ],
          fullWorkedSolution:
            '(a) DNA: T - A - C | C - G - A | A - T - T\nComplementary mRNA:\nT → A, A → U, C → G (Codon 1: A-U-G)\nC → G, G → C, A → U (Codon 2: G-C-U)\nA → U, T → A, T → A (Codon 3: U-A-A)\nResult: AUG - GCU - UAA\n(b) Each codon (triplet of 3 bases) codes for 1 amino acid. 9 nitrogenous bases ÷ 3 = 3 amino acids.\n(c) Translation takes place at the Ribosome in the cytoplasm.',
          cognitiveLevel: 'Routine Procedures',
          examinerTip: 'Remember: In RNA, Adenine (A) in DNA pairs with Uracil (U) in RNA.',
        },
        {
          subNumber: '1.4.2',
          prompt:
            'Describe the step-by-step process of DNA replication during interphase of the cell cycle.',
          marks: 5,
          type: 'step-by-step',
          expectedShortAnswer: 'DNA unwinds, unzips by breaking hydrogen bonds, free nucleotides pair with templates, forming two identical DNA molecules.',
          markingGuidelines: [
            '✓ The double helix DNA molecule unwinds and unzips',
            '✓ Weak hydrogen bonds between complementary nitrogenous bases break (controlled by DNA helicase)',
            '✓ Both original strands serve as templates',
            '✓ Free DNA nucleotides in the nucleoplasm attach to matching bases (A with T, C with G)',
            '✓ Two genetically identical DNA molecules are formed, each containing one original and one new strand (semi-conservative replication)',
          ],
          fullWorkedSolution:
            '1. Unwinding: The DNA double helix unwinds from its twisted structure.\n2. Unzipping: Enzyme helicase breaks the weak hydrogen bonds between complementary base pairs, exposing two single template strands.\n3. Complementary Base Pairing: Free DNA nucleotides present in the nucleoplasm bind to complementary exposed bases on both strands (Adenine with Thymine, Cytosine with Guanine).\n4. Polymerization & Proofreading: Sugar-phosphate backbones are linked by DNA polymerase.\n5. Result: Two identical DNA molecules are synthesized, each consisting of one conserved parental strand and one newly formed strand (semi-conservative).',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'Learn this verbatim: unwinds, unzips, templates, complementary pairing, two identical molecules.',
        },
        {
          subNumber: '1.5.1',
          prompt:
            'State TWO ways in which MEIOSIS introduces genetic variation in sexually reproducing organisms.',
          marks: 4,
          type: 'step-by-step',
          expectedShortAnswer: 'Crossing over in Prophase I and random assortment of chromosomes in Metaphase I.',
          markingGuidelines: [
            '✓ 1. Crossing over during Prophase I where genetic material is exchanged between non-sister chromatids of homologous pairs',
            '✓ 2. Random / Independent arrangement of homologous chromosomes along the equator during Metaphase I and Metaphase II',
          ],
          fullWorkedSolution:
            '1. Crossing Over in Prophase I: Homologous chromosomes pair up as bivalents. Non-sister chromatids intertwine at chiasmata and break, swapping maternal and paternal genetic segments to form recombinant chromatids.\n2. Random / Independent Assortment at Metaphase I & II: Homologous chromosome pairs align randomly on either side of the equatorial plate, leading to 2²³ (over 8 million) possible maternal/paternal chromosome combinations in human gametes.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Always name the specific stage: Crossing over = Prophase I; Random alignment = Metaphase I.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // SECTION B: QUESTION 2 — GENETICS, INHERITANCE & MEIOSIS (50 MARKS)
    // -----------------------------------------------------------------------
    {
      questionNumber: 2,
      title: 'SECTION B: QUESTION 2 (GENETICS, INHERITANCE AND MEIOSIS)',
      topicTag: 'Genetics & Inheritance',
      totalMarks: 50,
      contextPreamble:
        'Refer to monohybrid inheritance, blood grouping, sex-linked pedigree analysis, and chromosomal mutations.',
      subQuestions: [
        {
          subNumber: '2.1.1',
          prompt:
            'In rabbits, black fur (B) is dominant over white fur (b). A heterozygous black male mates with a white female.\nRepresent a full genetic cross showing P1 phenotype, P1 genotype, gametes, fertilisation, F1 genotypes, and F1 phenotypic ratio according to DBE guidelines.',
          marks: 6,
          type: 'step-by-step',
          expectedShortAnswer: 'F1 Phenotypic ratio: 1 Black : 1 White (50% Black, 50% White)',
          markingGuidelines: [
            '✓ P1: Black male × White female',
            '✓ P1 genotypes: Bb × bb',
            '✓ Meiosis: Gametes B, b and b, b',
            '✓ Fertilisation (Punnett square or lines): Bb, Bb, bb, bb',
            '✓ F1 genotypes: 2 Bb : 2 bb (or 1 Bb : 1 bb)',
            '✓ F1 phenotype ratio: 1 Black fur : 1 White fur (or 50% Black, 50% White)',
          ],
          fullWorkedSolution:
            'P₁ Phenotype: Black male  ×  White female\nP₁ Genotype: Bb  ×  bb\nMeiosis\nGametes: B, b  ×  b, b\nFertilisation (Punnett Square):\n      |  b   |  b\n  B   |  Bb  |  Bb\n  b   |  bb  |  bb\n\nF₁ Genotypes: 2 Bb : 2 bb  (or 50% Bb, 50% bb)\nF₁ Phenotypes: 1 Black rabbit : 1 White rabbit (or 50% Black : 50% White)',
          cognitiveLevel: 'Routine Procedures',
          examinerTip:
            'Follow the DBE CAPS 6-mark genetic rubric strictly: P1, Gametes, Meiosis, Fertilisation, F1 Genotypes, F1 Phenotypes.',
        },
        {
          subNumber: '2.2.1',
          prompt:
            'Explain why the human ABO blood group system is an example of both MULTIPLE ALLELES and CO-DOMINANCE.',
          marks: 4,
          type: 'step-by-step',
          expectedShortAnswer: 'Multiple alleles because 3 alleles exist (Iᴬ, Iᴮ, i); Co-dominance because Iᴬ and Iᴮ are both expressed in AB.',
          markingGuidelines: [
            '✓ Multiple Alleles: There are three different alleles in the population controlling blood group (Iᴬ, Iᴮ, and i) instead of just two',
            '✓ Co-dominance: Alleles Iᴬ and Iᴮ are equally dominant over each other; when both are present together (genotype IᴬIᴮ), both antigens A and B are expressed simultaneously on red blood cells without blending',
          ],
          fullWorkedSolution:
            '1. Multiple Alleles: Although an individual only inherits two alleles, the human population has three distinct alleles for the ABO blood gene: Iᴬ, Iᴮ, and the recessive allele i.\n2. Co-dominance: Allele Iᴬ and allele Iᴮ are co-dominant. When an individual has genotype IᴬIᴮ, neither allele masks the other; both antigen A and antigen B are fully expressed on the surface of erythrocytes, resulting in blood type AB.',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'Define each term separately in your answer to get all 4 marks.',
        },
        {
          subNumber: '2.2.2',
          prompt:
            'A mother with blood type A has a child with blood type O. The father has blood type B.\nDetermine the EXACT genotypes of:\n(a) The mother\n(b) The father\n(c) State the probability of their next child having blood type AB.',
          marks: 4,
          type: 'step-by-step',
          expectedShortAnswer: '(a) Iᴬi; (b) Iᴮi; (c) 25% (1 in 4)',
          markingGuidelines: [
            '✓ (a) Mother genotype: Iᴬi (must carry recessive allele i for child to be ii)',
            '✓ (b) Father genotype: Iᴮi (must carry recessive allele i for child to be ii)',
            '✓ (c) Probability of blood type AB: 25% (or 1/4 or 0.25)',
          ],
          fullWorkedSolution:
            '(a) The child has blood type O (genotype ii). One recessive allele i came from the mother, so the mother must be heterozygous: Iᴬi.\n(b) The second recessive allele i came from the father, so the father must be heterozygous: Iᴮi.\n(c) Cross: Iᴬi × Iᴮi produces genotypes:\n- IᴬIᴮ (Type AB) = 25%\n- Iᴬi (Type A) = 25%\n- Iᴮi (Type B) = 25%\n- ii (Type O) = 25%\nProbability of blood type AB = 25% (1 in 4).',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'A child with homozygous recessive (ii) always proves both parents carry the recessive allele.',
        },
        {
          subNumber: '2.3.1',
          prompt:
            'In a pedigree chart tracking HAEMOPHILIA (a sex-linked recessive blood-clotting disorder):\nIndividual 1 is a normal male (XᴴY) and Individual 2 is a carrier female (XᴴXʰ).\n(a) Explain why males have a much higher risk of suffering from haemophilia than females.\n(b) What percentage of their SONS will have haemophilia?',
          marks: 4,
          type: 'step-by-step',
          expectedShortAnswer: '(a) Males have only one X chromosome so a single recessive allele causes the disease; (b) 50% of sons.',
          markingGuidelines: [
            '✓ (a) Males possess only ONE X chromosome (XY), while the Y chromosome carries no corresponding allele for blood clotting',
            '✓ If a male inherits a single recessive allele (Xʰ), he will suffer from haemophilia as there is no dominant allele to mask it',
            '✓ (b) Sons inherit Y from father and have a 50% chance of inheriting Xʰ from mother = 50% probability',
          ],
          fullWorkedSolution:
            '(a) The gene for blood clotting is located on the non-homologous segment of the X chromosome. Males have only one X chromosome (XY) and lack a homologous counter-allele on the smaller Y chromosome. Therefore, inheriting a single recessive allele (Xʰ) guarantees that a male expresses the disorder. In contrast, females have two X chromosomes and require two recessive alleles (XʰXʰ) to suffer from haemophilia.\n(b) The mother passes either Xᴴ or Xʰ to her sons. The sons receive Y from father. 50% will be XᴴY (normal) and 50% will be XʰY (haemophiliac).',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'Females need TWO copies to express a sex-linked recessive trait; males need only ONE.',
        },
        {
          subNumber: '2.4.1',
          prompt:
            'A genetic counsellor analyzes a patient’s karyotype and observes 47 chromosomes, with three copies of chromosome 21.\n(a) Identify the genetic disorder.\n(b) Explain how this genetic abnormality arose during gametogenesis in one of the parents.',
          marks: 6,
          type: 'step-by-step',
          expectedShortAnswer: '(a) Down syndrome (Trisomy 21); (b) Non-disjunction in Anaphase I/II produced a gamete with 24 chromosomes which was fertilised by a normal 23-chromosome gamete.',
          markingGuidelines: [
            '✓ (a) Down syndrome (Trisomy 21)',
            '✓ (b) Non-disjunction occurred during meiosis (Anaphase I or Anaphase II)',
            '✓ Chromosome pair 21 (or sister chromatids of 21) failed to separate and moved to the same pole',
            '✓ Resulting in an abnormal gamete containing 24 chromosomes (two copies of chromosome 21)',
            '✓ When this gamete was fertilised by a normal gamete containing 23 chromosomes (one copy of 21)',
            '✓ The resulting zygote inherited THREE copies of chromosome 21 (2n = 47), producing Trisomy 21',
          ],
          fullWorkedSolution:
            '(a) Down syndrome (Trisomy 21).\n(b) Biological Cause:\n1. Non-disjunction occurred during meiosis in one of the parents (usually during oogenesis in the mother).\n2. Homologous chromosome pair 21 failed to separate at Anaphase I (or sister chromatids failed to separate at Anaphase II).\n3. Both chromosomes 21 migrated into the same daughter cell, producing an ovum (or sperm) with 24 chromosomes (n+1) carrying two copies of chromosome 21.\n4. When fertilised by a normal haploid gamete with 23 chromosomes (n), the resulting zygote had 47 chromosomes (2n+1) with three number-21 chromosomes.',
          cognitiveLevel: 'Complex Procedures',
          examinerTip:
            'Mention both the failure to separate at Anaphase and the union of (n+1) + (n) = (2n+1 = 47).',
        },
        {
          subNumber: '2.4.2',
          prompt:
            'Name TWO medical technologies used by doctors to obtain fetal cells for prenatal genetic karyotyping.',
          marks: 2,
          type: 'step-by-step',
          expectedShortAnswer: 'Amniocentesis and Chorionic Villus Sampling (CVS)',
          markingGuidelines: [
            '✓ Amniocentesis (sampling amniotic fluid containing fetal cells)',
            '✓ Chorionic Villus Sampling / CVS (sampling placental tissue)',
          ],
          fullWorkedSolution:
            '1. Amniocentesis: A needle is inserted through the mother’s abdominal wall into the amniotic sac to withdraw amniotic fluid containing sloughed fetal cells.\n2. Chorionic Villus Sampling (CVS): A catheter or needle removes a small biopsy of placental chorionic villi for chromosomal analysis.',
          cognitiveLevel: 'Knowledge',
          examinerTip: 'Amniocentesis and Chorionic Villus Sampling are the two CAPS-specified techniques.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // SECTION B: QUESTION 3 — HOMEOSTASIS, ENDOCRINE SYSTEM & EVOLUTION (50 MARKS)
    // -----------------------------------------------------------------------
    {
      questionNumber: 3,
      title: 'SECTION B: QUESTION 3 (HOMEOSTASIS, ENDOCRINE AND EVOLUTION)',
      topicTag: 'Homeostasis & Evolution',
      totalMarks: 50,
      contextPreamble:
        'Refer to negative feedback mechanisms for blood glucose and osmoregulation, Darwinian natural selection, and human evolution.',
      subQuestions: [
        {
          subNumber: '3.1.1',
          prompt:
            'A learner drinks a sugary energy drink containing 60 g of glucose. Describe the NEGATIVE FEEDBACK MECHANISM that restores normal blood glucose levels in a healthy body.',
          marks: 7,
          type: 'step-by-step',
          expectedShortAnswer: 'Beta cells detect high glucose, secrete insulin, liver converts glucose to glycogen, restoring normal blood sugar.',
          markingGuidelines: [
            '✓ Blood glucose levels rise above the normal set point (above ~5 mmol/L)',
            '✓ Detected by the Islets of Langerhans in the pancreas',
            '✓ Beta cells secrete the hormone INSULIN into the bloodstream',
            '✓ Insulin stimulates liver and skeletal muscle cells to absorb glucose from blood',
            '✓ Insulin stimulates the liver to convert excess glucose into insoluble GLYCOGEN (glycogenesis)',
            '✓ Accelerates cellular respiration to consume glucose',
            '✓ Blood glucose levels decrease back to the normal physiological set point (negative feedback completed)',
          ],
          fullWorkedSolution:
            '1. Stimulus: High blood glucose levels (>5.5 mmol/L) occur following digestion and absorption of the energy drink.\n2. Detection: The Islets of Langerhans in the pancreas detect the increase.\n3. Secretion: Beta cells secrete INSULIN directly into the blood.\n4. Target Organs: Insulin travels to the liver and skeletal muscle cells.\n5. Cellular Action: Insulin increases cell membrane permeability to glucose, stimulating rapid glucose uptake, and activates enzymes converting dissolved glucose into stored GLYCOGEN.\n6. Result: Glucose is removed from plasma, bringing blood sugar back down to the normal homeostatic set point.',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'Key terms: Beta cells, Insulin, Liver/Muscle, Glycogen, Negative feedback restoration.',
        },
        {
          subNumber: '3.1.2',
          prompt:
            'Distinguish between TYPE 1 and TYPE 2 Diabetes Mellitus in terms of cause and common management.',
          marks: 4,
          type: 'step-by-step',
          expectedShortAnswer: 'Type 1 is autoimmune destruction of beta cells (requires insulin injections); Type 2 is insulin resistance (managed by diet/exercise/metformin).',
          markingGuidelines: [
            '✓ Type 1 Cause: Autoimmune destruction of pancreatic beta cells, resulting in zero or negligible insulin production (juvenile onset)',
            '✓ Type 1 Treatment: Daily insulin injections / insulin pump therapy and strict carbohydrate counting',
            '✓ Type 2 Cause: Target cells become resistant / insensitive to insulin despite normal or high insulin secretion (lifestyle/age-related)',
            '✓ Type 2 Treatment: Controlled low-glycaemic diet, regular cardiovascular exercise, oral medication (e.g. metformin), and weight loss',
          ],
          fullWorkedSolution:
            'Type 1 Diabetes: An autoimmune disorder where the immune system destroys insulin-secreting beta cells, leaving the body unable to manufacture insulin. Managed primarily with lifelong daily subcutaneous insulin injections.\nType 2 Diabetes: The pancreas produces insulin, but peripheral body cells develop insulin resistance and fail to respond effectively. Often associated with obesity, sedentariness, and genetics. Managed by a balanced low-sugar diet, exercise, weight reduction, and oral hypoglycaemic drugs.',
          cognitiveLevel: 'Routine Procedures',
          examinerTip: 'Type 1 = Lack of insulin; Type 2 = Insulin resistance.',
        },
        {
          subNumber: '3.2.1',
          prompt:
            'A runner loses large amounts of water through perspiration on a hot South African afternoon. Describe how the body maintains OSMOREGULATION through the action of ADH.',
          marks: 6,
          type: 'step-by-step',
          expectedShortAnswer: 'Osmoreceptors detect concentrated blood, pituitary secretes more ADH, kidney tubules become more permeable, reabsorbing water into blood.',
          markingGuidelines: [
            '✓ Heavy sweating decreases blood water volume, causing blood osmolarity to rise (concentrated blood / low water potential)',
            '✓ Osmoreceptors in the hypothalamus detect the low water content',
            '✓ Hypothalamus stimulates the posterior pituitary gland to secrete MORE ADH (Antidiuretic Hormone) into the bloodstream',
            '✓ ADH increases the permeability of the distal convoluted tubules and collecting ducts of the nephron to water',
            '✓ More water is reabsorbed from the filtrate back into the surrounding renal capillaries via osmosis',
            '✓ The blood water levels rise back to normal, and small volumes of concentrated dark urine are excreted',
          ],
          fullWorkedSolution:
            '1. Stimulus: Perspiration causes loss of water, lowering blood water volume and increasing blood osmotic pressure (solute concentration).\n2. Receptor: Osmoreceptors in the hypothalamus register the hypertonic state of blood.\n3. Endocrine response: The posterior lobe of the pituitary gland releases MORE ADH into circulation.\n4. Effector: ADH binds to the cells of the distal convoluted tubules and collecting ducts in the kidneys, making them far more permeable to water.\n5. Reabsorption: More water is reabsorbed by osmosis into the medullary capillaries.\n6. Negative Feedback Result: Blood water levels return to the homeostatic set point, and small volumes of concentrated, dark-yellow urine are produced.',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'More ADH = More water reabsorbed = Less urine excreted.',
        },
        {
          subNumber: '3.3.1',
          prompt:
            'Use DARWIN’S THEORY OF NATURAL SELECTION to explain how a population of bacteria develops resistance to a newly introduced antibiotic.',
          marks: 6,
          type: 'step-by-step',
          expectedShortAnswer: 'Variation exists, antibiotic kills non-resistant bacteria, resistant survive and reproduce, passing resistant genes to offspring.',
          markingGuidelines: [
            '✓ There is genetic variation in the original bacterial population (some possess random gene mutations conferring antibiotic resistance, while most are non-resistant)',
            '✓ When the antibiotic is administered, it acts as a selective pressure (environmental challenge)',
            '✓ Bacteria without the resistant mutation are killed by the antibiotic',
            '✓ Bacteria carrying the resistance mutation have a survival advantage ("survival of the fittest") and survive the treatment',
            '✓ Surviving resistant bacteria reproduce rapidly by binary fission, passing the resistance allele to their offspring',
            '✓ Over successive generations, the proportion of resistant bacteria increases until the entire population is resistant',
          ],
          fullWorkedSolution:
            '1. Genetic Variation: Within the original bacterial colony, natural random gene mutations exist. Some bacteria possess an allele for antibiotic resistance, while others are susceptible.\n2. Selective Pressure: Introduction of the antibiotic changes the environment, exerting strong selection pressure.\n3. Differential Survival: Non-resistant bacteria are destroyed, whereas bacteria with the mutation survive ("survival of the fittest").\n4. Reproduction & Inheritance: The surviving resistant bacteria reproduce asexually, transmitting the advantageous resistance allele to their offspring.\n5. Population Shift: Over time, the frequency of the resistance gene increases until the strain becomes multidrug-resistant (superbug).',
          cognitiveLevel: 'Problem Solving',
          examinerTip: 'Structure Darwin’s answer in 5 steps: Variation, Environmental change, Survival of fittest, Reproduction, Allele frequency increase.',
        },
        {
          subNumber: '3.3.2',
          prompt:
            'Explain TWO fundamental differences between Jean-Baptiste Lamarck’s theory of evolution and Charles Darwin’s theory.',
          marks: 4,
          type: 'step-by-step',
          expectedShortAnswer: 'Lamarck believed acquired traits are passed on; Darwin proved inherited genetic variations are selected by the environment.',
          markingGuidelines: [
            '✓ Difference 1: Lamarck believed individuals modify their characteristics during their own lifetime through "use and disuse", whereas Darwin showed that variations exist prior to environmental changes',
            '✓ Difference 2: Lamarck believed acquired physical traits could be inherited by offspring, whereas Darwin’s theory is based on genetic inheritance of pre-existing traits',
          ],
          fullWorkedSolution:
            '1. Origin of Variation: Lamarck proposed that organisms change intentionally in response to their environment through use or disuse of organs (e.g. giraffes stretching necks to reach tall leaves). Darwin proposed that genetic variation arises randomly through mutation and meiosis BEFORE environmental changes occur.\n2. Mechanism of Inheritance: Lamarck claimed acquired somatic changes are passed directly to offspring (which has been disproven because somatic adaptations do not alter gamete DNA). Darwin demonstrated that only individuals with genetically advantageous traits survive to reproduce.',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'Lamarck = Acquired traits; Darwin = Natural selection on pre-existing genetic variation.',
        },
        {
          subNumber: '3.4.1',
          prompt:
            'Describe how ALLOPATRIC SPECIATION occurs, referring to a continental ancestral species that becomes separated by a geographical barrier.',
          marks: 6,
          type: 'step-by-step',
          expectedShortAnswer: 'Population split by barrier, no gene flow, independent mutations and natural selection, populations become genetically distinct and cannot interbreed.',
          markingGuidelines: [
            '✓ A single interbreeding ancestral population is split into two geographically isolated groups by a physical barrier (e.g. continental drift, mountain range, river, desert)',
            '✓ No gene flow occurs between the two separated populations',
            '✓ Environmental conditions on either side of the barrier are different',
            '✓ Natural selection occurs independently in each population, favouring different mutations and traits suited to their local habitats',
            '✓ Over many generations, the two populations become genotypically and phenotypically so distinct',
            '✓ Even if the barrier is removed, individuals can no longer interbreed to produce fertile offspring, constituting two separate species',
          ],
          fullWorkedSolution:
            '1. Geographic Isolation: A single continuous population is divided into two or more subpopulations by a geographical barrier (e.g. rising sea levels creating an island).\n2. Prevention of Gene Flow: Physical isolation prevents genetic exchange between the populations.\n3. Independent Natural Selection: Each population experiences different environmental conditions, food sources, and selective pressures. Different mutations arise randomly in each group.\n4. Accumulation of Differences: Natural selection favours different adaptive traits in each population. Over thousands of generations, their gene pools diverge significantly.\n5. Reproductive Isolation: When the populations are brought back into contact, they are biologically unable to mate or produce fertile offspring. Speciation has occurred.',
          cognitiveLevel: 'Complex Procedures',
          examinerTip: 'Memorize the 6 steps of allopatric speciation as it is a frequent 6-mark essay/long question in CAPS exams.',
        },
        {
          subNumber: '3.4.2',
          prompt:
            'List THREE lines of scientific evidence that support the OUT-OF-AFRICA hypothesis of human evolution.',
          marks: 3,
          type: 'step-by-step',
          expectedShortAnswer: 'Fossil record in East and South Africa, mitochondrial DNA (mtDNA) diversity, and archaeological stone tools.',
          markingGuidelines: [
            '✓ Fossil Evidence: The oldest transitional hominid fossils (Ardipithecus, Australopithecus, Homo habilis) and earliest anatomically modern Homo sapiens fossils are found exclusively in Africa (e.g. Florisbad, Omo, Klasies River Caves)',
            '✓ Genetic Evidence (Mitochondrial DNA / Y-chromosome): Genetic diversity is highest among modern indigenous African populations, proving modern humans have existed in Africa the longest',
            '✓ Archaeological Evidence: The oldest complex stone tool cultures (Oldowan, Acheulean, Middle Stone Age bladelets) originated in Africa',
          ],
          fullWorkedSolution:
            '1. Fossil Record: The most primitive hominid fossils (Ardipithecus, Australopithecus afarensis, Australopithecus africanus) and the earliest modern Homo sapiens skeletons (e.g. 300 000-year-old Jebel Irhoud, 195 000-year-old Omo, and Klasies River Caves in Eastern Cape) are all found in Africa.\n2. Mitochondrial DNA (mtDNA): Because mtDNA mutates at a steady rate and is inherited exclusively from mothers, molecular analysis reveals that African populations exhibit the greatest genetic diversity, demonstrating they are the most ancient human lineage.\n3. Archaeological Tools & Cultural Artifacts: The earliest advanced stone tool industries and engraved ochre artifacts (such as Blombos Cave in Western Cape) originated in Africa before appearing in Europe or Asia.',
          cognitiveLevel: 'Routine Procedures',
          examinerTip: 'Name the three pillars: Fossils, Genetic (mtDNA), and Archaeological artifacts.',
        },
      ],
    },
  ],
};
