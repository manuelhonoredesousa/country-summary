import { Center} from "native-base";
import { LoadingContent } from "../components/LoadingContent";

type InLoad = {
  message:string, 
  spinn: true|false
}

export function Loadding({message, spinn}: InLoad) {
  return (
    <Center flex={1} bg="primary.100" pb={5} justifyContent="flex-end">
      <LoadingContent sms={message} spin={spinn} />      
    </Center>
  );
}
