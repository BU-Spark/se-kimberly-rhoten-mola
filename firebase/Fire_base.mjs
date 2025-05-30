import { db } from './configfirebase.js';
import { collection, addDoc } from 'firebase/firestore';

// Function to Add Data to Firestore
async function addOrganization() {
  try {
    const organization = [
      {
        Name: 'Calvin Gimpelevich',
        Organization_Name: 'T4T Readings',
        Organization_Description:
          'T4T is a queer open mic and reading series bringing emerging and established transgender authors to Boston.',
        Organization_Website: 't4treadings.com',
        Organization_Address: '7 N Beacon St, Boston, MA',
        Public_Phone_Number: 'n/a',
        Public_Email: 't4t.reading@gmail.com',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Art/Culture',
        Target_Population:
          'LGBTQ+ Adults, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24)',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served: 'Allston',
        Days_Hours_Of_Operation: 'First Thursdays of the month, 7-11 pm',
        Program_Cost_To_Participant: 'Free',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Noah Tobin',
        Organization_Name: 'Stonewall Sports Boston',
        Organization_Description:
          'Stonewall Sports Boston is a local chapter of a national non-profit organization dedicated to building community for LGBTQ+ adults and their allies through recreational sports. Our Boston chapter currently offers leagues for Billiards, Cornhole, Dodgeball, Kickball, Pickleball and Volleyball in addition to our events and service opportunities.',
        Organization_Website: 'stonewallsportsboston.org',
        Public_Email: 'boston@stonewallsports.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Community-Building',
        Target_Population:
          'AAPI, Adults (18+), African-American/Black, Gay Men, Latina/Latine/Latino/Latinx, LGBTQ+ Adults, Parents/Caregivers, QTBIPOC, Sapphic, Transgender/ Gender Non-Confonforming/Nonbinary',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
      },
      {
        Name: 'Nikia Londy',
        Organization_Name: 'Intriguing Hair',
        Organization_Description:
          '**Intriguing Hair** is a luxury hair company founded by Nikia Londy that specializes in high-quality human hair extensions, wigs, and hairpieces. The company serves a diverse clientele, including African American women, women experiencing medical hair loss, trans women, hairstylists, and salon owners. Intriguing Hair offers customizable hair solutions, including medical wigs covered by private insurance, and provides wholesale opportunities for beauty professionals to create their own brands. Known for its commitment to inclusivity and excellence, Intriguing Hair provides a professional and private setting for women, including those from marginalized communities, seeking premium hair augmentation solutions.',
        Organization_Website: 'www.intriguinghair.com',
        Organization_Address: '82 Fairmount Avenue Hyde Park, MA 02136',
        Public_Phone_Number: '617-276-3337 800-817-7414',
        Public_Email: 'Info@intriguinghair.com',
        Preferred_Method_Of_Organizational_Contact: 'Emails, Phone Calls, Walk-In Appointments',
        Type_Of_Service: 'Health and Wellness, Hair extensions and wigs',
        Target_Population:
          'African-American/Black, Transgender/ Gender Non-Confonforming/Nonbinary',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served: 'Hyde Park',
        Days_Hours_Of_Operation: 'Tuesday - Saturday 10-6pm',
        Program_Cost_To_Participant: 'Wigs starting price $250 plus hair extensions $90 and up',
        Health_Insurance_Required: 'It Depends',
      },
      {
        Name: 'Kyla Speizer',
        Organization_Name: 'Mass NOW',
        Organization_Description:
          'Founded in 1968, the Massachusetts Chapter of the National Organization for Women (Mass NOW) is a multi-strategy grassroots feminist organization in the Commonwealth, pursing equity, acting for justice and building intersectional feminism.',
        Organization_Website: 'massnow.org',
        Organization_Address: 'PO Box 301060, Boston, MA 02130',
        Public_Email: 'massnow@massnow.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service:
          'Mass NOW provides trainings on menstruation education as well as menstrual products for organizations to distribute to the populations they serve.',
        Target_Population:
          'Adults (18+), Homeless/Houseless folks, LGBTQ+ Adults, LGBTQ+ Youth, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), people who menstruate, menstruators',
        Days_Hours_Of_Operation: '9am-5pm, 5 days a week',
      },
      {
        Name: 'Ellyn Ruthstrom',
        Organization_Name: 'SpeakOUT Boston',
        Organization_Description:
          'SpeakOUT Boston is a speakers bureau for the LGBTQ+ community that has shared the stories of queer lives since 1972. We visit schools, colleges, businesses, faith communities, public libraries and more to raise awareness and break through the dangerous misconceptions about us.',
        Organization_Website: 'SpeakOUTBoston.org',
        Organization_Address: 'P.O. Box 301223, Boston, MA 02130',
        Public_Phone_Number: '877-223-9390',
        Public_Email: 'info@speakoutboston.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails, Phone Calls',
        Type_Of_Service: 'Education and awareness building',
        Target_Population:
          'LGBTQ+ Adults, LGBTQ+ Youth, QTBIPOC, Transgender/ Gender Non-Confonforming/Nonbinary',
        Days_Hours_Of_Operation:
          'Office hours are Mon-Fri 9-5, we also conduct programs in the evenings and weekends.',
        Program_Cost_To_Participant:
          'Speaker trainings cost $35-75. Scholarships are also available.',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Micha Martin',
        Organization_Name: 'The GenderCare Center at Boston Medical Center',
        Organization_Description:
          ' We provide comprehensive care and support for people across the gender spectrum, from surgery to behavioral health to community resources.',
        Organization_Website: 'https://www.bmc.org/center-transgender-medicine-and-surgery',
        Organization_Address: 'One Boston Medical Center, Boston MA 02118',
        Public_Phone_Number: '617-638-1833',
        Public_Email: 'transgender.center@bmc.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service:
          'Health and Wellness, Therapeutic Support, Trans Health and Social Services',
        Target_Population:
          'Adults (18+), LGBTQ+ Adults, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24)',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Days_Hours_Of_Operation: 'Monday - Friday 9-4:30',
        Health_Insurance_Required:
          'Boston Medical Center is a safety net hospital and accepts most insurances including Medicaid and Medicare.',
      },
      {
        Organization_Name:
          'Child and Adolescent Trans/Gender Center for Health (CATCH) at Boston Medical Center',
        Organization_Description:
          'CATCH is a multidisciplinary clinic providing support and care to children, adolescents, and young adults across the gender spectrum.',
        Organization_Website: 'https://www.bmc.org/transgender-child-adolescent-center',
        Public_Phone_Number: '6174142663',
        Public_Email:
          'catchclinic@bmc.org (new patients must first register with BMC at 617-414-6060)',
        Preferred_Method_Of_Organizational_Contact: 'Emails, Phone Calls',
        Type_Of_Service: 'Health and Wellness',
        Target_Population:
          'Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Days_Hours_Of_Operation: 'Monday-Friday, 8:30am-5pm',
        Program_Cost_To_Participant: 'Insurance and service dependent',
        Health_Insurance_Required: 'Yes',
      },
      {
        Name: 'Joan Ilacqua',
        Organization_Name: 'The History Project',
        Organization_Description:
          "The History Project is Boston's LGBTQ+ community archives. The History Project is an independent non-profit organization founded in 1980 that holds LGBTQ+ historical records and ephemera, supports LGBTQ+ history research, and shares LGBTQ+ history through public exhibits and events. Our founders were archivists, activists, and historians who wanted to find and share LGBTQ+ stories from throughout Massachusetts' history, today we hold over 250 collections in our archives!",
        Organization_Website: 'historyproject.org',
        Organization_Address: '565 Boylston St, Boston, MA 02116',
        Public_Phone_Number: '6175459429',
        Public_Email: 'info@historyproject.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Arts, Culture & Education',
        Target_Population: 'All who are interested in LGBTQ+ history, AAPI',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served: 'Back Bay/Fenway-Kenmore',
        Program_Cost_To_Participant: '0',
        Health_Insurance_Required: 'Not Applicable',
      },
      {
        Name: 'MG Xiong',
        Organization_Name: 'Massachusetts Transgender Political Coalition (MTPC)',
        Organization_Description:
          'MTPC works to ensure the wellbeing, safety, and lived equity of all trans, nonbinary, and gender expansive community members in Massachusetts.',
        Organization_Website: 'www.masstpc.org',
        Organization_Address: 'PO Box 960784, Boston, MA 02196',
        Public_Phone_Number: '617-778-0519',
        Public_Email: 'info@masstpc.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails, Phone Calls',
        Type_Of_Service:
          'Legal Assistance, Trans Health and Social Services, Legal assistance limited to name change assistance',
        Target_Population:
          'LGBTQ+ Adults, LGBTQ+ Youth, QTBIPOC, Transgender/ Gender Non-Confonforming/Nonbinary, No age or geographic restrictions',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Days_Hours_Of_Operation: 'Monday through Thursday; 10:00am-6:00pm',
        Program_Cost_To_Participant: '$0',
        Health_Insurance_Required: 'Not Applicable',
      },
      {
        Name: 'Jack Giunta',
        Organization_Name: 'The Stateless Collective, Inc.',
        Organization_Description:
          'The Stateless Collective is a Boston-based organization committed to ensuring that innovative, globalized educational experiences are inclusive and accessible to all students—regardless of their background, identity, or ability. We firmly believe that everyone, including LGBTQIA+, POC, and underserved students, deserves the opportunity to thrive and make a positive impact on the world. Our core mission is to bridge the critical aspiration gap – the gap in what students from disadvantaged backgrounds believe is possible for their future. We do so by providing career readiness exploration tailored to the needs of those who have been historically marginalized within traditional education systems. Our programs promote social impact through experiential learning and equipping communities with the skills and resources they need to succeed.',
        Organization_Website: 'thestatelesscollective.org',
        Public_Email: 'info@thestatelesscollective.org',
        Preferred_Method_Of_Organizational_Contact:
          'Emails, Contact us via our website for the quickest response!',
        Type_Of_Service: 'Youth Empowerment, Educational Advancement',
        Target_Population:
          'African-American/Black, Latina/Latine/Latino/Latinx, LGBTQ+ Youth, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Program_Cost_To_Participant: '$0 - $200',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Hamel',
        Organization_Name: 'Boston Dyke March',
        Organization_Description:
          'Since 1995, the Boston Dyke March has remained committed to offering an anti-capitalist, non-commercial, intersectional, and fundamentally grassroots alternative to Boston’s Pride celebrations. We strive to elevate voices marginalized in society and even within the lgbtq+ community.The Dyke March tradition began with a 1993 demonstration in Washington, DC by the Lesbian Avengers, and soon after independent Dyke Marches sprung up across the country. We are not merely a celebration, we are speaking up and fighting back to demand a better society.\nOur top priority is to provide a dynamic and welcoming space for participants of all sexualities, genders, races, ages, ethnicities, sizes, economic backgrounds, and physical abilities. We strive to create a place where political and social change can be expressed and inspired.',
        Organization_Website: 'https://bostondykemarch.com/',
        Organization_Address: 'n/a',
        Public_Phone_Number: 'n/a',
        Public_Email: 'dykemarch@gmail.com',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service:
          'We are primarily a Community Event, but our Dyke Patrol arm provides Community Safety training/support across the state',
        Target_Population:
          'LGBTQ+ Adults, LGBTQ+ Youth, QTBIPOC, Sapphic, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Our traditional audience is Queer Women and Trans people of all other gender identies',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served: 'Downtown',
        Days_Hours_Of_Operation:
          'Traditionally: Friday evening before the large Pride. Dyke Patrol (our community safety arm, operates wherever/whenever is needed)',
        Program_Cost_To_Participant: 'n/a',
        Health_Insurance_Required: 'Not Applicable',
      },
      {
        Name: 'Elaine Sanfilippo',
        Organization_Name: 'IMPACT Inc.',
        Organization_Description:
          'IMPACT works to prevent violence and abuse by giving people the skills to advocate for healthy relationships, sexual respect, and personal and community safety.',
        Organization_Website: 'www.impactboston.org',
        Organization_Address: '89 SOUTH ST',
        Public_Phone_Number: '617-597-4945',
        Public_Email: 'info@impactboston.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service:
          'Violence Prevention and Survivor Support, Youth Empowerment, Empowerment Self-Defense, Healthy Relationships Education, Sex Education',
        Target_Population:
          'AAPI, Adults (18+), African-American/Black, Gay Men, Homeless/Houseless folks, Latina/Latine/Latino/Latinx, LGBTQ+ Adults, LGBTQ+ Youth, Parents/Caregivers, QTBIPOC, Sapphic, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth, People with disabilities (we target anyone disproportionally affected by violence)',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End',
        Days_Hours_Of_Operation:
          'Most of our programs are by appointment, but can be weekday, weeknight or weekend depending on need.',
        Program_Cost_To_Participant:
          'Sliding scale. Typically organizations pay, or are grant-funded',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Ellie Brigida',
        Organization_Name: 'The Femmes',
        Organization_Description:
          'The Femmes are an all-woman and non-binary wedding band specializing in songs by female and non-binary artists. When you’re at a Femmes show, you’re at a high energy concert experience. Epic sing alongs, expertly crafted harmonies, and musicians who absolutely LOVE to interact with the audience, the Femmes are Boston’s go-to women’s party band!  Our roster includes Berklee alumni, touring artists, veteran wedding band performers, and pit band musicians with over 10 years of professional experience.',
        Organization_Website: 'thefemmesband.com',
        Organization_Address: '38 Romsey Street',
        Public_Phone_Number: '7747223112',
        Public_Email: 'thefemmesband@gmail.com',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Entertainment',
        Target_Population: 'LGBTQ+ Adults, Sapphic',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Brighton, Dorchester, Jamaica Plain',
      },
      {
        Name: 'Karen Young',
        Organization_Name: 'Taiko at the (Gay)te',
        Organization_Description:
          '"Taiko at the (Gay)te" is an Asian and queer artistic project directed by Karen Young that centers and celebrates the complexities and lived experiences of LGBTQIA+ Asians in Boston. Using taiko drums and spoken word, the project weaves together powerful rhythms and personal stories to amplify voices within the community. We accept performance requests as well as requests for workshops and classes for communities and schools. Please contact Karen directly for information.',
        Organization_Website: 'https://karensusanyoung.com/kasa-friends',
        Organization_Address: '137 Walworth Street, Roslindale, MA 02131',
        Public_Phone_Number: '617-308-4900',
        Public_Email: '617-308-4900',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Arts and Performance',
        Target_Population: 'AAPI, Adults (18+), QTBIPOC, Sapphic',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Days_Hours_Of_Operation: 'varies',
        Program_Cost_To_Participant: 'Contact Karen for pricing',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Antonio Mateo Garcia',
        Organization_Name: 'HELP by AMG',
        Organization_Description:
          'HELP by AMG is based in the metropolitan area of Boston, Massachusetts. The organization provides essential items in the form of care packages to at-risk and homeless youth. The purpose of HELP is to increase the awareness and availability of culturally appropriate resources and services while meeting the current basic needs of the youth the organization serves to ensure their physical, mental, and emotional well-being. Within just one year of establishment, HELP has created and distributed over 150 inclusive care packages in the form of backpacks that included over 40 essential items. We have also provided our free inclusive community closet since 2022 and have served over 500 amazing individuals in supporting them to be their true, authentic selves.\nAt HELP, our mission is to help everyone live prosperously, starting with at-risk and homeless youth by providing them with essential everyday items in the form of care packages within Suffolk County of Massachusetts while also acting as a bridge to other services and opportunities to improve their overall lives and wellbeing.',
        Organization_Website: 'https://linktr.ee/helpbyamg',
        Organization_Address: '80 cresthill rd, brighton, ma 02135',
        Public_Phone_Number: '617-202-8729',
        Public_Email: 'ops@helpbyamg.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service:
          'Food, Health and Wellness, Trans Health and Social Services, Clothes and Essential Item Essentials',
        Target_Population:
          'AAPI, Adults (18+), African-American/Black, Gay Men, Homeless/Houseless folks, Latina/Latine/Latino/Latinx, LGBTQ+ Adults, LGBTQ+ Youth, Parents/Caregivers, QTBIPOC, Sapphic, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth, Everyone',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Days_Hours_Of_Operation: 'n/a',
        Program_Cost_To_Participant: 'Free',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Jaye Meakem',
        Organization_Name: 'Boston Harbor Now',
        Organization_Description:
          'Our mission is to ensure that Boston Harbor, its waterfront and islands are accessible and inclusive and that these special places are properly adapted to the risks of climate change.',
        Organization_Website: 'bostonharbornow.org',
        Organization_Address: '1 Constitution Rd, Charlestown, MA 02129',
        Public_Phone_Number: '(508) 377-3003',
        Public_Email: 'info@bostonharbornow.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Health and Wellness, Youth Empowerment',
        Target_Population:
          'AAPI, Adults (18+), African-American/Black, Latina/Latine/Latino/Latinx, LGBTQ+ Adults, QTBIPOC, Young Adults (18-24), We have programs for broad groups of folks as well specialized events/programs like the AANHPI, LGBTQIA+ or Latino Cruises.',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Charlestown, Downtown, Dorchester, East Boston, Roxbury (including Mission HIll), South Boston/Seaport District',
        Program_Cost_To_Participant:
          'We run a lot of free programs throughout the year in addition to a few paid ones.',
        Health_Insurance_Required: 'Not Applicable',
      },
      {
        Name: 'MJ Griego',
        Organization_Name: 'The Hope Center',
        Organization_Description:
          'free online and in person peer support groups tuesday-thursday and one on one mental health recovery support by appointment',
        Organization_Website: 'hopecenterboston.org',
        Organization_Address: '25 Staniford St. Boston MA 02114',
        Public_Phone_Number: '781-333-8015',
        Public_Email: 'mgriego@northsuffolk.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Health and Wellness, Therapeutic Support',
        Target_Population: 'LGBTQ+ Adults, Transgender/ Gender Non-Confonforming/Nonbinary',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Downtown, East Boston, North End/West End/Beacon Hill',
        Days_Hours_Of_Operation: 'tuesday-thursday 11am-3pm',
        Program_Cost_To_Participant: 'free',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Esther Leidolf',
        Organization_Name: 'MRKH Organization',
        Organization_Description: 'Intersex education and advocacy',
        Organization_Website: 'www.mrkh.org',
        Organization_Address: 'virtual',
        Public_Phone_Number: '6175109883',
        Public_Email: 'MRKHorg@gmail.com',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'intersex information',
        Target_Population: 'Intersex',
        Days_Hours_Of_Operation: 'by appointment',
        Program_Cost_To_Participant: 'none',
        Health_Insurance_Required: 'Not Applicable',
      },
      {
        Name: 'Kathi Kaity (KK)',
        Organization_Name: 'BAGLY',
        Organization_Description:
          'For nearly 50 years, BAGLY has been a youth-led, adult-supported organization committed to social justice, and creating, sustaining and advocating for programs, policies and services for the LGBTQ+ youth community in Massachusetts.',
        Organization_Website: 'bagly.org',
        Organization_Address: '28 Court Square, Boston MA 02108',
        Public_Phone_Number: '(617) 227-4313',
        Public_Email: 'info@bagly.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service:
          'Health and Wellness, STI/HIV Screening, Testing and Support, Youth Empowerment, Youth Leadership & Advocacy, Mental & Behavioral Health Therapy',
        Target_Population: 'LGBTQ+ Youth',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served: 'Downtown',
        Days_Hours_Of_Operation:
          'Drop-In Community Center is open Monday-Friday starting at 2pm (closing varies depending upon day of the week/programming)',
        Program_Cost_To_Participant: 'Free',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Art Nava',
        Organization_Name: 'Gay For Good',
        Organization_Description:
          'Gay For Good mobilizes lesbian, gay, bisexual, transgender, queer (LGBTQ+) and ally volunteers to promote diversity, foster inclusion and strengthen ties to the broader community.',
        Organization_Website: 'https://gayforgood.org',
        Public_Email: 'boston@gayforgood.org',
        Preferred_Method_Of_Organizational_Contact:
          'Emails, Instagram and Facebook accounts available',
        Type_Of_Service: 'Volunteerism',
        Target_Population:
          'LGBTQ+ Adults, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Allies of LGBTQ+ people are welcome at our projects',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Program_Cost_To_Participant: '$0',
        Health_Insurance_Required: 'Not Applicable',
      },
      {
        Name: 'Curtis Santos',
        Organization_Name: 'Boston Lesbigay Urban Foundation',
        Organization_Description:
          'Boston Lesbigay Urban Foundation mission is to provide social services that are culturally appropriate to Queer LGBTQIA+ Black, Brown and Latinx individuals. offering a wide range of services in the areas of mental health support, mentorship programs, senior activities and services, workshops and trainings, re-entry services, emergency assistance, food destigmatization initiatives, social engagement activities, black pride along with advancing public health awareness for queer black and latinx community members as they navigate through systems.',
        Organization_Website: 'lesbigayurbanfoundation.org',
        Public_Email: 'Info@lesbigayurbanfoundation.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails, Phone Calls',
        Type_Of_Service:
          'Food, Health and Wellness, Housing, Therapeutic Support, Trans Health and Social Services, Violence Prevention and Survivor Support, Youth Empowerment',
        Target_Population:
          'AAPI, Adults (18+), African-American/Black, Gay Men, Homeless/Houseless folks, Latina/Latine/Latino/Latinx, LGBTQ+ Adults, LGBTQ+ Youth, Parents/Caregivers, QTBIPOC, Sapphic, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Brighton, Charlestown, Dorchester, Mattapan, Hyde Park, Jamaica Plain, Roxbury (including Mission HIll), South End',
        Days_Hours_Of_Operation: 'Monday - Friday 9am-5pm',
        Program_Cost_To_Participant: '0',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Sam Montano',
        Organization_Name: 'Trans Emergency Fund',
        Organization_Description:
          'An organization that works in service of trans, non-binary, and gender non-conforming individuals in Massachusetts. We provide financial assistance for gender affirming care, basic needs, and utility and rental support. Additionally, we have a transitional housing program that serves up to 8 folks for up to a year while they get back on their feet and reenter the job and housing market.',
        Organization_Website: 'https://transemergencyfund.org/',
        Organization_Address: 'n/a',
        Public_Email: 'info@transemergencufund.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails, Phone Calls',
        Type_Of_Service: 'Food, Health and Wellness, Housing, Trans Health and Social Services',
        Target_Population:
          'Adults (18+), Homeless/Houseless folks, LGBTQ+ Adults, QTBIPOC, Transgender/ Gender Non-Confonforming/Nonbinary',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Adrianna Boulin',
        Organization_Name: 'Boston Pride for the People',
        Organization_Description:
          'Organization that organizes the annual pride parade and festival',
        Organization_Website: 'bp4tp.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Joy',
        Target_Population:
          'AAPI, Adults (18+), African-American/Black, Gay Men, Homeless/Houseless folks, Latina/Latine/Latino/Latinx, LGBTQ+ Adults, LGBTQ+ Youth, Parents/Caregivers, QTBIPOC, Sapphic, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth',
        Health_Insurance_Required: 'Not Applicable',
      },
      {
        Name: 'Adrianna Boulin',
        Organization_Name: 'Fenway Health',
        Organization_Description: 'Community Health Center',
        Organization_Website: 'Fenwayhealth.org',
        Organization_Address: '1340 Boylston Street, Boston, MA 02072',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service:
          'Health and Wellness, STI/HIV Screening, Testing and Support, Trans Health and Social Services',
        Target_Population:
          'AAPI, Adults (18+), African-American/Black, Gay Men, Homeless/Houseless folks, Latina/Latine/Latino/Latinx, LGBTQ+ Adults, LGBTQ+ Youth, Parents/Caregivers, QTBIPOC, Sapphic, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served: 'Back Bay/Fenway-Kenmore',
        Health_Insurance_Required: 'It Depends',
      },
      {
        Name: 'Joy Lochelt',
        Organization_Name: 'Out at Home, the Home for Little Wanderers',
        Organization_Description:
          'The Home for Little Wanderers’ Out at Home program provides outpatient, therapeutic support services for LGBTQ+ individuals of all ages, families, couples and caregivers. \n\nMany young people have experienced difficulty and discrimination due to their gender expression or sexual identities. Out at Home was created with the goal of providing LGBTQ+ competent clinical care, with a strong emphasis on keeping youth within their home environments and communities by offering comprehensive, specialized services and resources that educate, support, strengthen and empower.\n\nOur clinicians offer innovative, ever-evolving programming, whether providing in-person or virtual clinical care, leading confidence and community-building group sessions, or counseling LGBTQ+ students in Greater Boston schools and colleges.',
        Organization_Website: 'www.thehome.org/out-at-home',
        Organization_Address: 'Boston, MA',
        Public_Phone_Number: '857-262-4425',
        Public_Email: 'outathomeintake@thehome.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails, Phone Calls',
        Type_Of_Service: 'Therapeutic Support',
        Target_Population:
          'Adults (18+), Gay Men, LGBTQ+ Adults, LGBTQ+ Youth, Parents/Caregivers, QTBIPOC, Sapphic, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Days_Hours_Of_Operation: 'M-F 9am-7pm',
        Program_Cost_To_Participant: 'Insurance Co-pay or deductible',
        Health_Insurance_Required: 'Yes',
      },
      {
        Name: 'Tate Duffy',
        Organization_Name: 'Greater Boston PFLAG',
        Organization_Description:
          'Greater Boston PFLAG’s mission is to advocate for and advance equity  and societal affirmation of LGBTQ people by building and strengthening  loving families, safe communities, and a diverse and inclusive society.',
        Organization_Website: 'gbpflag.org',
        Organization_Address: '85 River Street',
        Public_Phone_Number: '(781) 891-5966',
        Public_Email: 'info@gbpflag.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Allyship support for parents and caregivers',
        Target_Population: 'Adults (18+), Parents/Caregivers',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Days_Hours_Of_Operation: '9-5pm Monday-Friday',
        Program_Cost_To_Participant: 'free',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Andy Rubinson',
        Organization_Name: 'Pride in Our Workplace',
        Organization_Description:
          'Pride in Our Workplace (PIOW) is a Massachusetts-based nonprofit dedicated to advancing LGBTQ+ workplace inclusion through education, community engagement, and corporate partnerships. We provide best practice-sharing forums, leadership development, and resources to support ERG leaders, DEI practitioners, and business leaders in creating more inclusive and affirming workplaces.\n\nThrough networking events, roundtable discussions, corporate training, and thought leadership, PIOW fosters connections between LGBTQ+ professionals and allied businesses, ensuring that all employees can thrive as their authentic selves. By working alongside both the corporate and nonprofit sectors, we bridge the gap between workplace inclusion efforts and community impact, helping organizations build meaningful, sustainable DEI strategies.',
        Organization_Website: 'www.piow.org',
        Organization_Address:
          'Pride in Our Workplace (PIOW), c/o Hogan Lovells US LLP, 125 High Street, #2010 Boston, MA 02110',
        Public_Phone_Number: 'N/A',
        Public_Email: 'info@piow.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails, Website Contact form',
        Type_Of_Service: 'LGBTQ+ Workplace Inclusion',
        Target_Population:
          'AAPI, Adults (18+), African-American/Black, Gay Men, Latina/Latine/Latino/Latinx, LGBTQ+ Adults, QTBIPOC, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24)',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Days_Hours_Of_Operation: 'Monday-Friday, 8:30am-5pm',
        Program_Cost_To_Participant:
          'No cost to be on mailing list and attend public events. Corporate sponsorship available for exclusive programming and benefits.',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Sabi Liu',
        Organization_Name: 'MAP for Health',
        Organization_Description:
          'The Massachusetts Asian & Pacific Islanders (MAP) For Health aim to empower and uplift the LGBTQ+ API population in the Greater Boston area. As a nonprofit organization, we are dedicated to fostering an inclusive community, promoting social equity, and advocating for the overall well-being of individuals within this population.',
        Organization_Website: 'maphealth.org',
        Public_Email: 'map@maphealth.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Health and Wellness',
        Target_Population:
          'AAPI, LGBTQ+ Adults, LGBTQ+ Youth, QTBIPOC, Sapphic, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Ellice Patterson',
        Organization_Name: 'Abilities Dance',
        Organization_Description:
          'Abilities Dance uses dance and art overall to promote disability justice in greater Boston and beyond. We are an open and affirming organization that is queer/trans led and also supports various queer/trans staff, students, audiences, and community.',
        Organization_Website: 'abilitiesdanceboston.org',
        Public_Email: 'abilitiesdanceboston@gmail.com',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Arts and Culture',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Julia Gilstein',
        Organization_Name: 'New England Aces',
        Organization_Description:
          'New England Aces, founded in 2010, is an all-ages community group for asexual-spectrum (ace) and aromantic-spectrum (aro) individuals and allies, and those who are questioning, that provides support in an open and affirming environment, builds community based on friendship and respect, and promotes awareness of ace and aro identities in the New England area through outreach, trainings, and collaboration with community partners.',
        Organization_Website: 'https://neaces.org/',
        Public_Email: 'newenglandaces@gmail.com',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Community, support, education, advocacy',
        Target_Population:
          'AAPI, Adults (18+), African-American/Black, Gay Men, Homeless/Houseless folks, Latina/Latine/Latino/Latinx, LGBTQ+ Adults, LGBTQ+ Youth, Parents/Caregivers, QTBIPOC, Sapphic, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth, All are welcome!',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Program_Cost_To_Participant: 'None',
        Health_Insurance_Required: 'Not Applicable',
      },
      {
        Name: 'Debra Fowler',
        Organization_Name: 'History UnErased, Inc.',
        Organization_Description:
          "History UnErased is an eduction non-profit putting LGBTQ history in its rightful place - the classroom. Founded in Massachusetts in 2015, History UnErased is the nation's premier provider of LGBTQ-inclusive US history, civics, and social studies curriculum.",
        Organization_Website: 'https://unerased.org/',
        Organization_Address: '27 Jackson Street Unit 411, Lowell, MA 01852',
        Public_Phone_Number: '(508) 233-8924',
        Public_Email: 'info@unerased.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails, Phone Calls',
        Type_Of_Service: 'Youth Empowerment, K-12 Education',
        Target_Population: 'LGBTQ+ Youth, Teens, Youth, All K-12 students',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Days_Hours_Of_Operation: '8:00 am - 6:00 pm Monday through Friday',
        Program_Cost_To_Participant: 'N/A',
        Health_Insurance_Required: 'No',
      },
      {
        Name: "Tre'Andre Valentine",
        Organization_Name: 'Massachusetts Transgender Political Coalition',
        Organization_Description:
          'MTPC works to advance lived equity for transgender (trans) and nonbinary people in Massachusetts, not just equality under the law. MTPC’s role and responsibility is to ensure that trans communities and trans rights continue to have a strong defender while providing critical support for community members impacted by oppression and violence.',
        Organization_Website: 'https://www.masstpc.org/',
        Organization_Address: 'Mailing Address: PO Box 960784, Boston MA 02196',
        Public_Phone_Number: '617-778-0519',
        Public_Email: 'info@mastpc.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Target_Population: 'Transgender/ Gender Non-Confonforming/Nonbinary',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Days_Hours_Of_Operation: 'Monday - Thursday from 9 AM - 5 PM',
        Program_Cost_To_Participant: '$0',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Paul Glass',
        Organization_Name: 'LGBTQ+ Elders of Color',
        Organization_Description: 'Social engagement for LGBTQ+ older adults of color',
        Organization_Website: 'lgbteldersofcolor.org',
        Organization_Address: '9 Palmer St, Roxbury, MA  02119',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Social engagement',
        Target_Population: 'LGBTQ+ Adults',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Back Bay/Fenway-Kenmore, Brighton, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, Roslindale, Roxbury (including Mission HIll), South End, West Roxbury',
        Days_Hours_Of_Operation: 'event focused - Non-specific hours',
        Program_Cost_To_Participant: 'Free',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Mercedes Loving-Manley',
        Organization_Name: 'PrideXtended, Inc.',
        Organization_Description:
          'We center the wellbeing of Black LGBTQ+ individuals with heightened urgency on Black Transgender populations.',
        Organization_Website: 'www.pridextended.com',
        Public_Email: 'info@pridextended.com',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service:
          'Food, Health and Wellness, Housing, Trans Health and Social Services, Youth Empowerment',
        Target_Population:
          'African-American/Black, Gay Men, Homeless/Houseless folks, LGBTQ+ Adults, LGBTQ+ Youth, QTBIPOC, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24)',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Mare Silva',
        Organization_Name: 'QT Library',
        Organization_Description:
          'The QT Library is a brick-and-mortar LGBTQIA+ lending library and substance-free community space for all ages coming to Boston, MA. Just like any public library, the QT Library will be a warm and welcoming physical space where our community can gather around shared interests and free resources.',
        Organization_Website: 'https://www.qtlibrary.org/',
        Public_Email: 'hello@qtlibrary.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Library',
        Target_Population:
          'Gay Men, LGBTQ+ Adults, LGBTQ+ Youth, QTBIPOC, Sapphic, Transgender/ Gender Non-Confonforming/Nonbinary',
        Program_Cost_To_Participant: '$0',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Chad Hahne',
        Organization_Name: 'Big Queer Food Fest',
        Organization_Description:
          'A food festival and events celebrating the LGBTQIA culinary community',
        Organization_Website: 'bigqueerfoodfest.com',
        Public_Email: 'hello@bigqueerfoodfest.com',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Food',
        Target_Population: 'LGBTQ+ Adults, LGBTQ+ Youth',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Downtown, Dorchester, South Boston/Seaport District, South End',
      },
      {
        Name: 'Antonio Mateo Garcia',
        Organization_Name: 'HELP by AMG',
        Organization_Description:
          'HELP by AMG is a grassroots nonprofit dedicated to supporting historically marginalized communities, particularly BIPOC and LGBTQ+ individuals, through mutual aid, resource distribution, community events, and advocacy. Our programs include a free community closet, emergency assistance, educational workshops, and initiatives focused on economic stability and legal advocacy.',
        Organization_Website: 'helpbyamg.org',
        Public_Email: 'ops@helpbyamg.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service:
          'Food, Trans Health and Social Services, Youth Empowerment, Mutual Aid, Education and Social Justice',
        Target_Population:
          'AAPI, Adults (18+), African-American/Black, Gay Men, Homeless/Houseless folks, Latina/Latine/Latino/Latinx, LGBTQ+ Adults, LGBTQ+ Youth, Parents/Caregivers, QTBIPOC, Sapphic, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Program_Cost_To_Participant: 'Free',
        Health_Insurance_Required: 'Not Applicable',
      },
      {
        Organization_Name: 'Boston Theater Company',
        Organization_Description:
          'Boston Theater Company is a 501(c)(3) non-profit at the intersection of arts, athletics, and inclusion, dedicated to creating experiences for and about marginalized communities. We are rooted in the potential that shared experiences have to unite, uncover and illuminate. We are committed to creating programs that amplify voices that are often left out, including a particular focus on the LGBTQ+ community. Grounded in social responsibility, we champion inclusivity, work to break down financial barriers, and celebrate the transformative power we have as artists. \n\nWith our innovative events, we strive to embody collaborative expression, celebrate our shared humanity, highlight the complexity of the human condition, and encourage important conversation.',
        Organization_Website: 'bostontheater.org',
        Organization_Address: 'P.O. Box 301997 Jamaica Plain, MA 02130',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Art and theater!',
        Target_Population: 'LGBTQ+ Adults, LGBTQ+ Youth, QTBIPOC',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served: 'Downtown, South End',
        Program_Cost_To_Participant:
          'All our programs are gender expansive and have a pay scale to remove the financial barrier. We believe the arts, theater education and athletics should be for anyone and everyone.',
        Health_Insurance_Required: 'Not Applicable',
      },
      {
        Name: 'Mackenzie Valencia',
        Organization_Name: 'Ethos - The Pride Initiative',
        Organization_Description:
          'Ethos is a private, not-for-profit organization that promotes the independence, dignity, and well-being of older adults and disabled individual. Ethos is committed to improving the lives of the elderly and disabled in Greater Boston. Ethos has a vast array of wrap around services to support older adults, including mental health, money management, SHINE (Serving Health Information Needs of Everyone),  volunteer services, and The Pride Initiative. The Pride Initiative focuses on providing a safe space for LGBTQ+ older adults to learn, socialize and build community as well as have some fun. In all aspects of its work Ethos supports family caregiving, fosters social interaction and respects cultural diversity.',
        Organization_Website: 'https://www.ethocare.org/',
        Organization_Address: '555 Amory St Jamaica Plain, MA 02130',
        Public_Phone_Number: '617-522-6700',
        Preferred_Method_Of_Organizational_Contact: 'Emails, Phone Calls',
        Type_Of_Service: 'Health and Wellness',
        Target_Population: 'LGBTQ+ Adults, LGBTQ+ Seniors',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Days_Hours_Of_Operation: 'Monday - Friday 9AM-5PM',
        Program_Cost_To_Participant: 'Free',
        Health_Insurance_Required:
          'Depends on Ethos  program - The Pride Initiative is free for all',
      },
      {
        Organization_Name: 'The GenderCare Center at Boston Medical Center',
        Organization_Description:
          'Boston Medical Center is committed to empowering all patients to thrive, through our innovative and equitable care. In addition to this commitment, our leadership in health equity, research, and teaching is driving the future of care.',
        Organization_Website: 'https://www.bmc.org/center-transgender-medicine-and-surgery',
        Organization_Address: 'One Boston Medical Center Place Boston, MA 02118',
        Public_Phone_Number: '617-638-1833',
        Public_Email: 'transgender.center@bmc.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service:
          'Health and Wellness, Therapeutic Support, Trans Health and Social Services, Youth Empowerment',
        Target_Population:
          'AAPI, Adults (18+), African-American/Black, Gay Men, Homeless/Houseless folks, Latina/Latine/Latino/Latinx, LGBTQ+ Adults, LGBTQ+ Youth, Parents/Caregivers, QTBIPOC, Sapphic, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Days_Hours_Of_Operation: '9-5 M, T, W,Th, F',
        Health_Insurance_Required: 'Yes',
      },
      {
        Name: 'Jenessa Kornacki',
        Organization_Name: 'Greater Boston PFLAG',
        Organization_Description:
          'PFLAG is an organization of LGBTQ+ people, parents, families, and allies who work together to create an equitable and inclusive world.',
        Organization_Website: 'https://www.gbpflag.org/',
        Organization_Address: 'P.O Box 541619 Waltham MA 02454',
        Public_Phone_Number: '781-891-5966',
        Public_Email: 'info@gbpflag.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Hotlines, Therapeutic Support',
        Target_Population: 'Adults (18+), LGBTQ+ Adults, Parents/Caregivers',
        Days_Hours_Of_Operation: 'M-F 9-5ET',
        Program_Cost_To_Participant: '0',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Ellyn Ruthstrom',
        Organization_Name: 'SpeakOUT Boston',
        Organization_Description:
          'SpeakOUT is a community of speakers and volunteers working to create a world free of bias and prejudice by telling the truths of LGBTQ+ lives.',
        Organization_Website: 'SpeakOUTBoston.org',
        Organization_Address: 'P.O. Box 301223, Boston, MA 02130',
        Public_Phone_Number: '877-223-9390',
        Public_Email: 'info@speakoutboston.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Educational panels and presentations',
        Target_Population: 'All audiences',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served: 'Jamaica Plain',
        Days_Hours_Of_Operation: '9-5 M-F office hours, other times for programming',
        Program_Cost_To_Participant: 'Please see individual events',
        Health_Insurance_Required: 'No',
      },
      {
        Organization_Name: 'Pleasure Pie',
        Organization_Description:
          '​Pleasure Pie is a sexual justice organization based in Boston, MA. Our efforts center around combating sexual shame, promoting consent education, and working toward intersectional liberation. We make alternative sexuality education materials (including zines, illustrations, and publications) and experiences (events, conversations, and workshops).​',
        Organization_Website: 'pleasurepie.org',
        Public_Email: 'hello@pleasurepie.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Health and Wellness, Sexuality education',
        Health_Insurance_Required: 'Not Applicable',
      },
      {
        Name: 'Gabrielle Navarro',
        Organization_Name: 'GLBTQ Legal Advocates & Defenders (GLAD Law)',
        Organization_Description:
          'Through strategic litigation, public policy advocacy, and education, the GLBTQ Legal Advocates & Defenders (GLAD Law) mission statement defines our works in New England and nationally to create a just society free of discrimination based on gender identity and expression, HIV status, and sexual orientation.',
        Organization_Website: 'https://www.glad.org/know-your-rights/glad-answers/',
        Organization_Address: '18 Tremont, Suite 950 Boston, MA 02108',
        Public_Phone_Number: '617.426.1350',
        Public_Email: 'GLADAnswers@glad.org',
        Preferred_Method_Of_Organizational_Contact:
          'Emails, Phone Calls, Online Intake form (at link shared above)',
        Type_Of_Service: 'Hotlines, Legal Assistance',
        Target_Population:
          'LGBTQ+ Adults, LGBTQ+ Youth, QTBIPOC, Sapphic, Transgender/ Gender Non-Confonforming/Nonbinary, All folks in the LGBTQ+ and HIV communities!',
        Days_Hours_Of_Operation: 'Hotline Runs Mon-Friday 9am to 5pm',
        Program_Cost_To_Participant: 'Free',
        Health_Insurance_Required: 'Not Applicable',
      },
      {
        Name: 'Laura Willis',
        Organization_Name: 'FriendshipWorks',
        Organization_Description:
          'FriendshipWorks is a nonprofit that reduces elder isolation by connecting volunteers with older adults for friendship and support.',
        Organization_Website: 'https://www.fw4elders.org',
        Organization_Address: '105 Chauncy Street, Suite 801, Boston, MA 02111',
        Public_Phone_Number: '(617) 482-1510',
        Public_Email: 'friend@fw4elders.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails, Phone Calls',
        Type_Of_Service: 'Health and Wellness',
        Target_Population: 'LGBTQ+ Adults, Adults 60+ or 55+ with vision or hearing impairment',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Days_Hours_Of_Operation: '9am - 5pm Monday thru Friday',
        Program_Cost_To_Participant: 'None',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Jack Imbergamo',
        Organization_Name: 'TQNC',
        Organization_Description:
          'TQNC is a queer collective fostering queer joy, advocacy, and art for Greater Boston’s LGBTQIA+ and ally community.',
        Organization_Website: 'tqnc.org',
        Public_Email: 'hello@tqnc.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Health and Wellness, community support, education',
        Target_Population:
          'LGBTQ+ Adults, LGBTQ+ Youth, Transgender/ Gender Non-Confonforming/Nonbinary',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Program_Cost_To_Participant: 'free',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'AJ',
        Organization_Name: 'Trans Aslyum Seeker Support Network',
        Organization_Description:
          'The Trans Asylum Seeker Support Network (TASSN) is a vibrant community of queers, friends and comrades which supports trans asylum seekers as they cross the border, while in detention, once released, and through the asylum process.',
        Organization_Website: 'https://www.instagram.com/transasylumsupport/',
        Public_Email: 'give.2.tassn@gmail.com',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Housing, Legal Assistance',
        Target_Population:
          'LGBTQ+ Adults, QTBIPOC, Transgender/ Gender Non-Confonforming/Nonbinary',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'East Boston, Jamaica Plain, South Boston/Seaport District',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Dru Douillette-Belli',
        Organization_Name: 'YMCA of Greater Boston',
        Organization_Description:
          'Founded in 1851 as America’s first Y, the YMCA of Greater Boston strengthens the Greater Boston community through a focus on youth development, healthy living and social responsibility. As one of the community’s leading nonprofits, we are dedicated to nurturing the potential of every child and teen, improving our community’s health and well-being and providing opportunities to give back and support our neighbors.',
        Organization_Website: 'www.ymcaboston.org',
        Organization_Address: '316 Huntington Ave, Boston MA 02115',
        Public_Phone_Number: '617-927-8060',
        Public_Email:
          'all of our centers have specific email addresses. can be found here https://ymcaboston.org/contact/.',
        Preferred_Method_Of_Organizational_Contact: 'Emails',
        Type_Of_Service: 'Food, Health and Wellness, Housing, Youth Empowerment',
        Target_Population:
          'AAPI, Adults (18+), African-American/Black, Gay Men, Homeless/Houseless folks, Latina/Latine/Latino/Latinx, LGBTQ+ Adults, LGBTQ+ Youth, Parents/Caregivers, QTBIPOC, Sapphic, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Hyde Park, Roslindale, Roxbury (including Mission HIll), West Roxbury',
        Days_Hours_Of_Operation: 'https://ymcaboston.org/contact/',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Samantha Nelson',
        Organization_Name: 'Boston By Foot',
        Organization_Description:
          'Boston By Foot is an educational nonprofit organization that inspires locals and visitors to explore the diverse stories of Boston by exploring the cityscape together.',
        Organization_Website: 'bostonbyfoot.org',
        Organization_Address: '87 Mount Vernon Street',
        Public_Phone_Number: '6173672345',
        Public_Email: 'info@bostonbyfoot.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails, Phone Calls',
        Type_Of_Service: 'Walking tours and cultural experiences',
        Program_Cost_To_Participant: '$15-$20',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Ren Pilinger',
        Organization_Name: 'Boston Acupuncture Project',
        Organization_Description:
          'Our mission is to provide affordable and accessible acupuncture in a group setting, Chinese herbal medicine, and other forms of holistic healthcare. By offering relief from pain, stress, and isolation, we aim to contribute to the well-being of individual people, and the strength of our community as a whole.',
        Organization_Website: 'https://bostonacupunctureproject.org/',
        Organization_Address: '74 Fairmount Ave, Hyde Park, MA 02136',
        Public_Phone_Number: '617-506-3868',
        Public_Email: 'contact@bostonacupunctureproject.org',
        Preferred_Method_Of_Organizational_Contact:
          'Book online using the scheduling system on our website, or you can text or call us. Walk-ins welcome as space allows.',
        Type_Of_Service: 'Health and Wellness',
        Target_Population:
          'We welcome everyone. Those under 18 need the consent of an adult guardian.',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served: 'Hyde Park',
        Days_Hours_Of_Operation:
          'Monday 3-6 PM\nTuesday 9 AM-12 PM\nWednesday 3-6 PM\nThursday 9 AM-12 PM\nSaturday 10 AM-2 PM',
        Program_Cost_To_Participant: '$30-$60 sliding scale (check website for details)',
        Health_Insurance_Required: 'Not Applicable',
      },
      {
        Name: 'Jack Giunta',
        Organization_Name: 'The Stateless Collective Inc.',
        Organization_Description:
          'The Stateless Collective is a Boston-based organization committed to ensuring that innovative, globalized educational experiences are inclusive and accessible to all students—regardless of their background, identity, or ability. We firmly believe that everyone, including LGBTQIA+, POC, and underserved students, deserves the opportunity to thrive and make a positive impact on the world.',
        Organization_Website: 'www.thestatelesscollective.org',
        Organization_Address: 'Various locations across Boston and greater Massachusetts.',
        Public_Email: 'info@thestatelesscollective.org OR www.thestatelesscollective.org/contact',
        Preferred_Method_Of_Organizational_Contact:
          'Emails, Website contact form at www.thestatelesscollective.org/contact',
        Type_Of_Service: 'Youth Empowerment, Social Impact Professional Development (Ages 18-25)',
        Target_Population:
          'AAPI, Adults (18+), African-American/Black, Latina/Latine/Latino/Latinx, LGBTQ+ Adults, LGBTQ+ Youth, Parents/Caregivers, QTBIPOC, Teens, Transgender/ Gender Non-Confonforming/Nonbinary, Young Adults (18-24), Youth',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Downtown, Dorchester, East Boston, Jamaica Plain, Roxbury (including Mission HIll)',
        Days_Hours_Of_Operation: 'Year Round as available, summer programming weekdays in July',
        Program_Cost_To_Participant: '$0 - $300 depending on need',
        Health_Insurance_Required: 'No',
      },
      {
        Name: 'Tanya Neslusan',
        Organization_Name: 'MassEquality',
        Organization_Description:
          'MassEquality is the leading statewide grassroots advocacy organization working to ensure that everyone across Massachusetts can thrive from cradle to grave without discrimination and oppression based on sexual orientation, gender identity, or gender expression.  We partner across identities, issues, and communities to build a broad, inclusive, and politically powerful movement that changes hearts and minds and achieves policy and electoral victories.  \n\nMassEquality Explained\nMassEquality is comprised of two separate corporate entities: MassEquality.org, the Campaign for Equality, Inc. and the MassEquality Education Fund, Inc.  While there is some overlap in the work done by each entity, certain activities are done by one organization and not the other.',
        Organization_Website: 'www.massequality.org',
        Organization_Address: '100 Grove Street Suite 313, Worcester MA 01605',
        Public_Phone_Number: '6178782300',
        Public_Email: 'info@massequality.org',
        Preferred_Method_Of_Organizational_Contact: 'Emails, Phone Calls',
        Target_Population:
          'Gay Men, LGBTQ+ Adults, LGBTQ+ Youth, Parents/Caregivers, QTBIPOC, Sapphic, Transgender/ Gender Non-Confonforming/Nonbinary',
        Neighborhood_Of_Organization_Neighborhoods_Primarily_Served:
          'Allston, Back Bay/Fenway-Kenmore, Brighton, Charlestown, Chinatown/Leather District/Bay Village, Downtown, Dorchester, East Boston, Mattapan, Hyde Park, Jamaica Plain, North End/West End/Beacon Hill, Roslindale, Roxbury (including Mission HIll), South Boston/Seaport District, South End, West Roxbury',
        Health_Insurance_Required: 'Not Applicable',
      },
    ];

    for (const org of organization) {
      const docRef = await addDoc(collection(db, 'Organizations'), org);
      console.log('Document written with ID: ', docRef.id);
    }

    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

// Run the function
addOrganization();
