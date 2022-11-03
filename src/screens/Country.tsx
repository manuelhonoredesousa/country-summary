import { useState, useEffect } from "react";
import { VStack, HStack, Button, Image, Heading, ScrollView, Link} from "native-base";
import { Text } from "../components/Text";
import { SimpleTextGroup } from "../components/SimpleTextGroup";
import { Loadding } from "./loadding";
import { useNavigation, useRoute } from "@react-navigation/native";

type RouteParams={
  cca2: string
}

export function Country() {
  const [myProvinceL, setMyProvinceL] = useState<string[]>([]);
  const [myCountryL, setMyCountryL] = useState<any>({});
  const [smsInfo, setSmsInfo] = useState("");
  
  const navegation = useNavigation()
  const route =  useRoute()
  const {cca2} = route.params as RouteParams
  const find = cca2;

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((res) => res.json())
      .then((resul) => {
        const provincesFetch = resul.data
          .find((country) => country.iso2 == find)
          .states.map((cite) => cite.name.replace("Province", ""));
        setMyProvinceL(provincesFetch);
      })

    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((resul) => {
        const countryFetch = resul.find((countr) => countr.cca2 == find);
        const OfficialName:any = Object.values(countryFetch.name.nativeName)[0]
        const curreVal:any = Object.values(countryFetch.currencies)[0]
        const currencies = [Object.keys(countryFetch.currencies)[0], curreVal.name, curreVal.symbol]
        const obj = {
          nativeCommon: OfficialName.common,
          nativeOfficial: OfficialName.official.toUpperCase(),
          common: countryFetch.name.common,
          official: countryFetch.name.official,
          topLevelDomain: countryFetch.tld, 
          independent: countryFetch.independent, 
          currency: currencies[0],
          currencyName: currencies[1],
          currencySymbol: currencies[2],
          iddRoot: countryFetch.idd.root,
          iddSufix: countryFetch.idd.suffixes,
          lat: countryFetch.latlng[0],
          lng: countryFetch.latlng[1],
          cca2: countryFetch.cca2,
          region: countryFetch.region,
          subRegion: countryFetch.subregion,
          languages: Object.values(countryFetch.languages),
          captal: countryFetch.capital[0],
          captalLat: countryFetch.capitalInfo.latlng[0],
          captalLng: countryFetch.capitalInfo.latlng[1],
          borders: countryFetch.borders.map((item)=> resul.find((countr) => countr.cca3 == item).name.common),
          mapGoogle: countryFetch.maps.googleMaps,
          mapStreetMaps:  countryFetch.maps.openStreetMaps,
          population: countryFetch.population,
          trafficDirection: countryFetch.car.side,
          timeZones: countryFetch.timezones, 
          coatOfArm: countryFetch.coatOfArms.png,
          flag: countryFetch.flags.png,
        }
        setMyCountryL(obj);        
      })
      .catch(() => setSmsInfo("Sorry, I can't find the country, I'm having possible problems (internet or failure when obtaining data by API)"));
  }, []);

  function handleGoBack() {
    navegation.goBack()  
}


  return (
    <VStack flex={1} bg="gray.400">
        <VStack bg="primary.100" pt={12} h={115} px={5} shadow={8} justifyContent="center">
        <HStack h={45} alignItems="center" justifyContent="space-between">
          {myCountryL.captal ? (
            <Button variant="outline" borderWidth={0} _pressed={{ background: "none", width:50 }} onPress={handleGoBack} >
            <Heading color="gray.400">◀ Voltar</Heading>
          </Button>
          ):("")}
        </HStack>
      </VStack>

      {myCountryL.captal ? (
      <VStack flex={1}>
        <ScrollView showsVerticalScrollIndicator={false} w="full" h="full">
          <VStack mx={4} px={4} pb={10}>

            <VStack alignItems="center" space={2} mb={8}>
              <Image mb={1} mt={5} size={"xl"} source={{ uri: myCountryL.coatOfArm }} alt="Coat of Arm"/>
              <Heading fontSize="lg" color="gray.200">{myCountryL.nativeOfficial}</Heading>
              <Heading fontSize="md" color="gray.200">({myCountryL.nativeCommon})</Heading> 
            </VStack>

            <VStack mt={5} space={3}>
              
              <SimpleTextGroup title="Common Name: " answer={myCountryL.common} />
              
              <SimpleTextGroup title="Official Name: " answer={myCountryL.official} />

              <VStack>
                <Text type="title" text="Top Level Domain (TLD): "/>
                <VStack mt={2} ml={10} mb={1} space={2}>
                    {myCountryL.topLevelDomain ? myCountryL.topLevelDomain.map((tld, index) => <Text key={index} type="text" text={`👉 ${tld}`}/>):<Text type="text" text="Not Avaliable yet"/>}
                </VStack>
              </VStack>

              <SimpleTextGroup title="Independent: " answer={myCountryL.independent ? "Yes" : "No"} />

              <VStack>
                <Text type="title" text={`Currencies ( ${myCountryL.currency} ) :`}/> 
                <VStack mt={2} ml={10} mb={1} space={2}>
                  <SimpleTextGroup title="Name: " answer={myCountryL.currencyName} />
                  <SimpleTextGroup title="Simbol: " answer={`( ${myCountryL.currencySymbol} )`} />
                </VStack>
              </VStack>
              
              <VStack>
              <Text type="title" text={`IDD: `}/> 
                <VStack mt={2} ml={10} mb={1} space={2}>
                    <Text type="title" text={`Root: ( ${myCountryL.iddRoot} )`} />
                    <HStack>
                      <Text type="title" text="Suffixes: " />
                      <VStack flexWrap="wrap" flexDir="row" space={8} w="5/6">
                        {myCountryL.iddSufix ? myCountryL.iddSufix.map((sufix, index) => <Text key={index} type="text" text={` "${sufix}" ` }/>):<Text type="text" text="Not Avaliable yet"/>}
                      </VStack>
                    </HStack>
                </VStack>
              </VStack>
              
              <SimpleTextGroup title="Latitude and Longitude: " answer={`[ ${myCountryL.lat}, ${myCountryL.lng} ]`} />                    

              <SimpleTextGroup title="Alt Spellings: " answer={myCountryL.cca2} />
              
              <SimpleTextGroup title="Region: " answer={myCountryL.region} />
              
              <SimpleTextGroup title="Subregion: " answer={myCountryL.subRegion} />
              
              <VStack>
                <Text type="title" text="Languages: "/>
                <VStack mt={2} ml={10} mb={1} space={2}>
                    {myCountryL.languages ? myCountryL.languages.map((lang, index) => <Text key={index} type="text" text={`👉 ${lang}`}/>):<Text type="text" text="Not Avaliable yet"/>}
                </VStack>
              </VStack>

              <SimpleTextGroup title="Capital: " answer={myCountryL.captal} />

              <SimpleTextGroup title="Capital Latitude and Longitude: " answer={`[ ${myCountryL.captalLat}, ${myCountryL.captalLng} ]`} />                    
              
              <VStack>
                <Text type="title" text="Borders: "/>
                <VStack mt={2} ml={10} mb={1} space={2}>
                    {myCountryL.borders ? myCountryL.borders.map((bord, index) => <Text key={index} type="text" text={`🌍 ${bord}`}/>):<Text type="text" text="Not Avaliable yet"/>}
                </VStack>
              </VStack>
              
              <VStack>
                <Text type="title" text="Ver Mapa Em: "/>
                <VStack mt={2} ml={10} mb={1} space={2}>
                  <Link href={myCountryL.mapGoogle} _text={{ color: "primary.100" }}>🗺️ Google Map</Link>
                  <Link href={myCountryL.mapStreetMaps} _text={{ color: "primary.100" }}>🗺️ Open Street Map</Link>
                </VStack>
              </VStack>
                    
              <SimpleTextGroup title="Population: " answer={myCountryL.population} />
              
              <SimpleTextGroup title="Traffic Direction: " answer={myCountryL.trafficDirection} />

              <VStack>
                <Text type="title" text="Time Zones: "/>
                <VStack mt={2} ml={10} mb={1} space={2}>
                    {myCountryL.timeZones ? myCountryL.timeZones.map((time, index) => <Text key={index} type="text" text={`🕒 ${time}`}/>):<Text type="text" text="Not Avaliable yet"/>}
                </VStack>
              </VStack>
          
              <VStack>
                <Text type="title" text="Provinces: "/>
                <VStack mt={2} ml={10} mb={1} space={2}>
                    {myProvinceL.map((prov, index) => <Text key={index} type="text" text={`▶ ${prov}`}/>)}
                </VStack>
              </VStack>

            </VStack>
          </VStack>

          <VStack h={280}>
            <Image source={{ uri: myCountryL.flag }} w={["100%", "100%"]} h={["100%", "100%"]} alt="Country Flag"/>
          </VStack>

        </ScrollView>
      </VStack>
      ) : (
        <Loadding message={!smsInfo ? "Loadding Please Wait..." : smsInfo} spinn={smsInfo ? false : true} />
      )} 
    </VStack>
  )
}