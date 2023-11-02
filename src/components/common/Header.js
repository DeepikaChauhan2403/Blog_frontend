
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const token = localStorage.getItem("token");
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/homepage">Blogging App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/homepage">Home</Nav.Link>
            <Nav.Link href="/create-blog">Create Blog</Nav.Link>
            <Nav.Link href="/my-blogs">My Blogs</Nav.Link>
            <Nav.Link href="/follower-list">Follower List</Nav.Link>
            <Nav.Link href="/following-list">Following List</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            {
              token ? (
                <>
                  <Nav.Link href="#" onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/">Register</Nav.Link>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;