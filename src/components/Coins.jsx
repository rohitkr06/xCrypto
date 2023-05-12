import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '..'
import { Button, Container, HStack, Heading, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import Errorcomponent from './Errorcomponent'
import {Link} from 'react-router-dom'


const Coins = () => {
  const [coin,setcoin]=useState([]);
  const [loading,setloading]=useState(true);
  const [error,seterror]=useState(false);
  const [page,setpage]=useState(1);
  const [currency,setcurrency]=useState('inr');

  const btns=new Array(132).fill(1);

  const changepage=(page)=>{
    setpage(page);
    setloading(true);
  }
  const currencysymb=currency==='inr'?'₹':currency==="eur"?'€':'$';
  useEffect(() => {
    

    setloading(true);
    const fetchCoins=async()=>{
      try {  
      const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
      setcoin(data);
      setloading(false);  
      } catch (error) {
        setloading(false);
        seterror(true);
      }
      
    }

    fetchCoins();
    
  }, [currency,page])
  
  if(error)
  return <Errorcomponent/>
  
  return (
    <Container maxW={"container.xl"}>
      {
        loading?<Loader/>:
        <>
        <RadioGroup value={currency} onChange={setcurrency} p={'8'}>
          <HStack spacing={'4'}>
            <Radio value='inr'>INR</Radio>
            <Radio value='eur'>EUR</Radio>
            <Radio value='usd'>USD</Radio>
          </HStack>
        </RadioGroup>
        <HStack wrap={'wrap'} justifyContent={'space-evenly'} >
          {
            // <div>hola</div>
            coin.map((i)=>(
              <CoinCard id={i.id} name={i.name} img={i.image} symbol={i.symbol} price={i.current_price} csymb={currencysymb} key={i.id}/>
            ))
          }
        </HStack>
        <HStack w={'full'} overflowX={'auto'}>
          {
            btns.map((item,index)=>(
               
              <Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={()=>changepage(index+1)}>{index+1}</Button>
            ))
          }
        </HStack>
        </>
      }
    </Container>
  )
}


const CoinCard = ({id,name,img,symbol,price,csymb="Rs"}) => {
  return (
    <Link to={`coin/${id}`} >
      <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={"all 0.3s"}
      m={'4'}
      css={{
        "&:hover":{
          transform: "scale(1.2)"
        }
      }}
      >
        <Image
        src={img}
        w={'10'}
        h={'10'}
        objectFit={'contain'}
        alt='Exchange'
        />
        <Heading size={'md'} noOfLines={1}>
          {symbol}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price? `${csymb} ${price}`: "NA"}</Text>
      </VStack>
    </Link>
  )
}

export default Coins