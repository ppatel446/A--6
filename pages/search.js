import React, { useEffect } from "react";
import { useForm } from 'react-hook-form'
import { Form,Row,Col, Button} from "react-bootstrap";
import { useRouter } from 'next/router'
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { addToHistory } from '../lib/userData';

const Search=()=>{
    const router=useRouter()
    const [searchHistory, setSearchHistory]=useAtom(searchHistoryAtom)
    const { register, handleSubmit, setValue , formState:{errors}} = useForm({
        defaultValues: {
          searchBy: "",
          geoLocation: "",
          medium: "",
          isOnView: false,
          isHighlight: false,
          q: ""
        },
      });
      useEffect(()=>{
        let data={
        searchBy: "",
          geoLocation: "",
          medium: "",
          isOnView: false,
          isHighligight: false,
          q: ""
        }
        for (const prop in data){
            setValue(prop, data[prop]);
        }
      }, [setValue])
      
      async function submitForm(data){
        const queryString=new URLSearchParams();
        queryString.append(`${data.searchBy}`, 'true');
        
        if(data.geoLocation){
            queryString.append('geoLocation', `${data.geoLocation}`);
        }
        if(data.medium){
            queryString.append('medium', `${data.medium}`);
        }
        queryString.append('isOnView',`${data.isOnView}`);
        queryString.append('isHighlight',`${data.isHighlight}`);
        queryString.append('q',`${data.q}`);
        queryString.toString();

       
       router.push(`/artwork?${queryString}`);

       setSearchHistory(await addToHistory(queryString));

    }
    return(
        <>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Search Query</Form.Label>
                        <Form.Control type="text" placeholder="" name="q" 
                        {...register("q",{required: true})} className={errors.q?"is-invalid":"valid"}/>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                    <Form.Label>Search By</Form.Label>
                    <Form.Select name="searchBy" className="mb-3" 
                    {...register("searchBy")}>
                        <option value="title">Title</option>
                        <option value="tags">Tags</option>
                        <option value="artistOrCulture">Artist or Culture</option>
                    </Form.Select>
                    </Col>
                    <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Geo Location</Form.Label>
                        <Form.Control type="text" placeholder="" name="geoLocation" {...register("geoLocation")}/>
                        <Form.Text className="text-muted">
                        Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                    </Form.Text>
                    </Form.Group>
                    </Col>
                    <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label>Medium</Form.Label>
                        <Form.Control type="text" placeholder="" name="medium" {...register("medium")}/>
                        <Form.Text className="text-muted">
                        Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                    </Form.Text>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Check
                        type="checkbox"
                        label="Highlighted"
                        name="isHighlight"
                        {...register("isHighlight")}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Currently on View"
                        name="isOnView"
                        {...register("isOnView")}
                    />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <br />
                    <Button variant="primary" type="submit" disabled={Object.keys(errors).length>0}>
                        Submit
                    </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
    

}
export default Search