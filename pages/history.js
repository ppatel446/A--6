import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { useRouter } from 'next/router';
import {Button, ListGroup, Card} from 'react-bootstrap'
import styles from '../styles/History.module.css'
import { removeFromHistory } from '../lib/userData';

const History=()=>{
    const [searchHistory, setSearchHistory]=useAtom(searchHistoryAtom)
    const router=useRouter()

    if(!searchHistory) return null;

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (e, index) => {
        e.preventDefault()
        router.push(`/artwork?${searchHistory[index]}`)    
    }

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation(); 
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    }

    if(parsedHistory.length <= 0){
        return (
            <>
                <Card>
                    <Card.Body>
                    <Card.Text>
                        <strong>Nothing Here</strong><br />
                        Try searching for something else.
                    </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    }
    else{
        return (
            <>
                <ListGroup>
                    {
                        parsedHistory.map((historyItem, index) => (
                            <ListGroup.Item className={styles.historyListItem} key={index} onClick={(e) => historyClicked(e, index)}>
                                {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                                <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>
                                    &times;
                                </Button>
                            </ListGroup.Item>
                        ))
                    }
                   
                </ListGroup>
            </>
        )
    }


}
export default History