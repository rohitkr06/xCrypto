import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '..'
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import Errorcomponent from './Errorcomponent'


const Exchanges = () => {
  const [exchange,setexchane]=useState([]);
  const [loading,setloading]=useState(true);
  const [error,seterror]=useState(false);
  useEffect(() => {
    


    const fetchExchanges=async()=>{
      try {  
      const {data}=await axios.get(`${server}/exchanges`);
      console.log(data);
      setexchane(data);
      setloading(false);  
      } catch (error) {
        setloading(false);
        seterror(true);
        console.log("erer");
      }

      
    }

    fetchExchanges();
    
  }, [])
  
  if(error)
  return <Errorcomponent/>
  
  return (
    <Container maxW={"container.xl"}>
      {
        loading?<Loader/>:
        <>
        <HStack wrap={'wrap'} >
          {
            // <div>hola</div>
            exchange.map((i)=>(
              <ExchangeCard name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} key={i.id}/>
            ))
          }
        </HStack>
        </>
      }
    </Container>
  )
}


const ExchangeCard = ({name,img,rank,url}) => {
  return (
    <a href={url} target='blank'>
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
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  )
}

export default Exchanges