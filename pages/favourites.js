import {useAtom} from 'jotai'
import {favouritesAtom} from '../store'
import {Row,Col,Card} from 'react-bootstrap'
import ArtworkCard from '../components/ArtworkCard'

const Favourites=()=>{
    const [favouritesList, setFavouritesList]=useAtom(favouritesAtom)

    if(!favouritesList) return null;

    if(favouritesList){
        return(
            <>
                <Row className="gy-4">
                    {favouritesList.length>0?
                     favouritesList.map((item)=>{
                        return(
                            <Col lg={3} key={item}>
                                <ArtworkCard objectID={item} />
                            </Col>
                        )})
                        :<Card>
                            <h4>Oops!!Nothing Here</h4>
                            Try adding for something else.
                         </Card>
                    }
                </Row> 
                {!favouritesList && null}
            
            </>
        )
    }


}
export default Favourites