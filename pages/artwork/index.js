import React from 'react'
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr'
import Error from 'next/error';
import {Row,Col,Card,Pagination} from 'react-bootstrap'
import ArtworkCard from '../../components/ArtworkCard';
import validObjectIDList from '../../public/data/validObjectIDList.json'


const PER_PAGE =12;
const Index=()=>{
  const [page, setPage]=useState(1);
  const [artworkList, setArtworkList]=useState([]);
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
  useEffect(() => {
    if (data) {
        let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
        const results=[];
        for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
            const chunk = filteredResults.slice(i, i + PER_PAGE);
            results.push(chunk);
        }
          
        setArtworkList(results);
    }
    setPage(1);
  }, [data]);

  const previous=()=>{
    if(page>1){
      setPage(page=>page-1)
    }
  }  
  const next=()=>{
    setPage(page=>page+1) 
  }
  
  if(error){
    return (<><Error statusCode={404}/></>)
  }

  if(artworkList!= null && artworkList!=undefined){
    console.log(artworkList);
    
    
    return(
        <>
          <Row className="gy-4">
            {artworkList.length>0?
            artworkList[page-1].map((item)=>{
              return(
                  <Col lg={3} key={item}>
                      <ArtworkCard objectID={item} />
                  </Col>
              )})
            :<Card>
                <Card.Body>
                  <Card.Text>
                  <strong>Oops!! Nothing Here</strong>
                  Explore somewhere Else!!
                  </Card.Text>
                </Card.Body> 
              </Card>
            }
          </Row> 
          <br/>
          {artworkList.length>0 &&
          <Row>
              <Col>
                  <Pagination>
                      <Pagination.Prev onClick={previous}/>
                      <Pagination.Item>{page}</Pagination.Item>
                      <Pagination.Next onClick={next}/>
                      
                  </Pagination>
              </Col>
          </Row>
          }
        </>
      )
      
  }
  else{
    return null
  }


}
export default Index