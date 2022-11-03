import { useState, useEffect} from "react";
import { VStack, Text, HStack, Button, Input, Heading, FlatList, Center, Link} from "native-base";
import { CountryTumb } from "../components/CountryTumb";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [dataSearch, setDataSearch] = useState<any[]>([]);
  const [countryLists, setcountryLists] = useState([]);
  const [changes, setChanges] = useState(0);
  const [txtSearch, setTxtSearch] = useState("");
  const [smsInfo, setSmsInfo] = useState("");
  const [active, setActive] = useState("name");
  let upDown = "up";
  const temp = [];
  const [updw, setUpdw] = useState(upDown);
  const [global, setGlobal] = useState([]);
  const navegation = useNavigation()

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((country) => temp.push({ code: country.cca2, name: country.name.common, region: country.region, flags: country.flags.png, population: country.population, size: country.area, }));
        setDataSearch(temp.sort((a, b) => (a.name < b.name ? -1 : 0)));
        setcountryLists(temp);
      }).catch(() => setSmsInfo("Sorry, I can't find the country, I'm having possible problems (internet or failure when obtaining data by API)"));
  }, []);

  useEffect(() => setDataSearch(global), [changes]);

  function handleCountryOpen(cca2:string) {
    navegation.navigate('country', {cca2})
  }

  function allCountries() {    
    handleUpDown("up");
    setActive("name");
    setDataSearch(countryLists.sort((a, b) => (a.name < b.name ? -1 : 0)));
  }

  function handleSearch(myParams) {
    setTxtSearch(myParams)
    const content = String(myParams != "" ? myParams : "all").toUpperCase();
    if (content == "ALL") {
      allCountries();
    } else {
      setDataSearch(
        countryLists.filter((country) => {
          const a1 = content.split("");
          const a2 = country.name.toUpperCase().split("").splice(0, a1.length);
          return a1.length === a2.length && a1.every((value, i) => value === a2[i])
        })
      );
      setSmsInfo(dataSearch.length == 0 ? undefined : smsInfo);
    }
  }

  function filters(param) {
    switch (param) {
      case "name":
        handleUpDown("up");
        setActive("name");
        handleFilter("name");
        break;
      case "population":
        handleUpDown("down");
        setActive("population");
        handleFilter("population");
        break;
      case "region":
        handleUpDown("up");
        setActive("region");
        handleFilter("region");
        break;
      case "up":
        handleUpDown("up");
        handleFilter(active);
        break;
      case "down":
        handleUpDown("down");
        handleFilter(active);
        break;
    }
    setChanges((prev) => prev + 1);
  }

  function handleUpDown(value) {
    upDown = value;
    setUpdw(upDown);
  }

  function handleFilter(key) {
    switch (key) {
      case "name":
        if (upDown == "up") setGlobal(dataSearch.sort((a, b) => (a.name < b.name ? -1 : 0)));
          else setGlobal(dataSearch.sort((a, b) => (a.name > b.name ? -1 : 0)))
        break;
      case "population":
        if (upDown == "up") setGlobal(dataSearch.sort((a, b) => (a.population < b.population ? -1 : 0)))
          else setGlobal( dataSearch.sort((a, b) => (a.population > b.population ? -1 : 0)));
        break;
      case "region":
        if (upDown == "up") setGlobal(dataSearch.sort((a, b) => (a.region < b.region ? -1 : 0)))
         else setGlobal(dataSearch.sort((a, b) => (a.region > b.region ? -1 : 0)));
        break;
    }
  }

  return (
    <VStack flex={1} bg="gray.400">

      <VStack bg="primary.100" pt={10} h={280} px={5} mb={5} style={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <Heading mt={10} mb={10} color="gray.400" fontFamily="heading">Search for the country you want to SUMMARIZE! 🌍</Heading>

        <HStack w="full">
          <Input color="gray.400" flex={1} fontFamily="body" bg="primary.300" fontSize="md" onChangeText={(text) => handleSearch(text)} placeholder="Find you country resume" />
        </HStack>

        <HStack justifyContent="center">
          <HStack mt={4} space={2}>
            <HStack bg="gray.400" rounded={5}>
              <Button p={1} borderWidth={0} isDisabled={active == "name" ? true : false} variant={active == "name" ? "solid" : "outline"} onPress={() => filters("name")}>by Name</Button>
              <Button p={1} borderWidth={0} isDisabled={active == "population" ? true : false} variant={active == "population" ? "solid" : "outline"} onPress={() => filters("population")} >by Population</Button>
              <Button p={1} borderWidth={0} isDisabled={active == "region" ? true : false} variant={active == "region" ? "solid" : "outline"} onPress={() => filters("region")}> by Region</Button>
            </HStack>

            <HStack bg="gray.400" rounded={5}>
              <Button py={1} borderWidth={0} isDisabled={updw == "up" ? true : false} variant={updw == "up" ? "solid" : "outline"} onPress={() => filters("up")}>▲</Button>
              <Button py={1} borderWidth={0} isDisabled={updw == "down" ? true : false} variant={updw == "down" ? "solid" : "outline"} onPress={() => filters("down")}>▼</Button>
            </HStack>
          </HStack>
        </HStack>
      </VStack>
 
      <VStack mt={15} px={3}>
        <HStack justifyContent="space-between">
          <Text fontSize="md" color="gray.100">{txtSearch == "" ? "All countries" : "Searching for: " + txtSearch}</Text>
          <Link href="https://linktr.ee/manueldesousa" _text={{ color: "primary.100", textDecoration:"none" }}>ℹ️ info</Link>
        </HStack>

        <VStack h="78%">
          <FlatList mt={5} data={dataSearch} keyExtractor={(item) => item.code}
            renderItem={({ item }) => <CountryTumb name={item.name} region={item.region} flag={item.flags} population={item.population} onPress={()=>handleCountryOpen(item.code)}/>}
            showsVerticalScrollIndicator={false} ListEmptyComponent={() => <Center> <Text color="gray.100" mt={6} fontSize="xl" textAlign="center"> {smsInfo == undefined ? "Country not found! Try again... " : `${smsInfo} `}</Text></Center>}/>
        </VStack>
      </VStack>

    </VStack>
  );
}
