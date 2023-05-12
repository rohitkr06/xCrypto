import React from 'react'
import Loader from './Loader';
import { Badge, Box, Button, Container, HStack, Heading, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '..'
import { useParams } from 'react-router-dom';
import Chart from './Chart';

const Coindetail = () => {


  const [coin, setcoin] = useState({});
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [currency, setcurrency] = useState('inr');
  const [days,setdays]=useState("24h");
  const [chartu,setchartu]=useState([]);

  const params = useParams();
  const currencysymb = currency === 'inr' ? '₹' : currency === "eur" ? '€' : '$';
  const btns=["24h","7d","14d","30d","60d","200d","1y","max"]

  const switchchartday=(value)=>{
    setdays(btns[value]);
    setloading(true);
    console.log(btns[value]);
  }

  useEffect(() => {
    if (Object.keys(coin).length !== 0)
      setloading(false);

  }, [coin])


  useEffect(() => {

    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const {data:chartudata}=await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        setchartu(chartudata.prices);
        setcoin(data);
        

      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(true);
      }

    }

    fetchCoin();

  }, [params.id,days,currency])


  return (
    <Container maxW={'container.xl'}>
      {
        loading ? <Loader /> :
          (
            <>
              <Box borderWidth={1} width={'full'}>
              <Chart arr={chartu} currency={currencysymb} days={days}/>
              </Box>

              <HStack p={'4'} wrap={'wrap'}>
              {
                btns.map((item,index)=>(
                  <Button key={index} onClick={()=>switchchartday(index)} >{item}</Button>
                ))
              }
              </HStack>

              <RadioGroup value={currency} onChange={setcurrency} p={'8'}>
                <HStack spacing={'4'}>
                  <Radio value='inr'>INR</Radio>
                  <Radio value='eur'>EUR</Radio>
                  <Radio value='usd'>USD</Radio>
                </HStack>
              </RadioGroup>

              
              <VStack spacing={"4"} p={"16"} alignItems={'flex-start'}>
                <Text fontSize={'small'} alignSelf={"center"} opacity={'0.7'}>
                  Last Updated on{" "}{Date(coin.market_data.last_updated).split('G')[0]}
                </Text>
                <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />

                <Stat>
                  <StatLabel>{coin.name}</StatLabel>
                  <StatNumber>{currencysymb}{coin.market_data.current_price[currency]}</StatNumber>
                  <StatHelpText>
                    <StatArrow type={coin.market_data.market_cap_change_percentage_24h > 0 ? 'increase' : 'decrease'} />
                    {coin.market_data.market_cap_change_percentage_24h}
                  </StatHelpText>
                </Stat>

                <Badge fontSize={'2xl'}>
                  {`#${coin.market_cap_rank}`}
                </Badge>
                <CustomBar high={`${currencysymb}${coin.market_data.high_24h[currency]}`} low={`${currencysymb}${coin.market_data.low_24h[currency]}`}/>

                <Box w={'full'} p={'4'}>
                  <Item title={"Max Supply"} value={`${coin.market_data.max_supply}`}/>
                  <Item title={"Circulating Supply"} value={`${coin.market_data.circulating_supply}`}/>
                  <Item title={"Market Cap"} value={`${currencysymb}${coin.market_data.market_cap[currency]}`}/>
                  <Item title={"All Time Low"} value={`${currencysymb}${coin.market_data.atl[currency]}`}/>
                  <Item title={"All i=Time High"} value={`${currencysymb}${coin.market_data.ath[currency]}`}/>
                </Box>
              
              </VStack>

            </>

          )
      }
    </Container>
  )
}

const Item=({title,value})=>(
<HStack justifyContent={'space-between'} w={'full'} my={'4'}>
  <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
  <Text>{value}</Text>
</HStack>
)

const CustomBar =({high,low})=>(
  <VStack w={'full'}>
    <Progress value={50} colorScheme='teal' w={'full'} />
    <HStack justifyContent={'space-between'} w="full">
    <Badge children={low} color={'red'}/>
    <Text>24H Range</Text>
    <Badge children={high} color={'green'} />
    </HStack>
  </VStack>

)



export default Coindetail