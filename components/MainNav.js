import {Container, Nav, Navbar, Form, Button, NavDropdown }from 'react-bootstrap'
import { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData'
import { removeToken, readToken } from '../lib/authenticate';


const MainNav=()=>{

   const [newRoute,setNewRoute]=useState('');
   const [isExpanded, setIsExpanded] = useState(false);

   const router = useRouter()

   const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

   const handleSubmit = async(e) => {
       e.preventDefault()
       setIsExpanded(false)
       console.log(`search submitted- ${newRoute}`);
       router.push(`/artwork?title=true&q=${newRoute}`)
       setSearchHistory(await addToHistory(newRoute));
       e.target.reset();
       
   }

   let token = readToken();

   function logout() {   
      setIsExpanded(false);
      removeToken();
      router.push('/login');
   }
 
 
    return (
     <>
      <Navbar className="fixed-top navbar-dark bg-dark" bg="light" expand="lg" expanded={isExpanded}>
         <Container>
            <Navbar.Brand>Prey Bipinkumar Patel</Navbar.Brand>
            <Navbar.Brand>(Web-422 Assignment 6)</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={(e) => {setIsExpanded(!isExpanded)}}/>
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Link href="/" passHref><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/"}>Home</Nav.Link></Link>
                  {token 
                  && 
                  <Link href="/search" passHref><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>
                  }
               </Nav>
               &nbsp;
               {token && 
               <Form className="d-flex" onSubmit={handleSubmit}>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => {setNewRoute(e.target.value)}}
                    />
                    <Button type="submit" variant="success">Search</Button>
                </Form>
               }
                &nbsp;
                {token?
                  <Nav>
                     <NavDropdown title={token.userName} id="basic-nav-dropdown" active={router.pathname === "/favourites" || router.pathname === "/history"} >
                        <Link href="/favourites" passHref>
                           <NavDropdown.Item onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
                        </Link>
                        <Link href="/history" passHref>
                           <NavDropdown.Item onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/history"}>Search History</NavDropdown.Item>
                        </Link>
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                     </NavDropdown>
                  </Nav>
                  :
                  <Nav className="ms-auto">
                     <Link href="/register" passHref><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/register"}>Register</Nav.Link></Link>
                     <Link href="/login" passHref><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/login"}>Login</Nav.Link></Link>
                  </Nav>
               }
            </Navbar.Collapse>
         </Container>
      </Navbar>
      <br />
      <br />
     </>
    )
  }
  export default MainNav
  