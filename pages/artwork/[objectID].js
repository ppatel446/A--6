import React from 'react'
import {useRouter} from 'next/router'
import {Row,Col,Card} from 'react-bootstrap'
import ArtworkCardDetail from '../../components/ArtworkCardDetail'
const Artwork=()=>{
    const router=useRouter()
    const {objectID}=router.query
    return(
        <>
            <Row>
                <Col>
                    <ArtworkCardDetail objectID={objectID} />
                </Col>
            </Row>
        </>
    )
}
export default Artwork
