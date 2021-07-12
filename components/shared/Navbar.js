import {Navbar, NavDropdown, Nav} from "react-bootstrap";
import Link from "next/link";

const AppLink = ({children, className, href}) =>
  <Link href={href}>
    <a className={className}>{children}</a>
  </Link>

const AppNavbar = () => {

  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <AppLink href="/" className="navbar-brand mr-3 font-weight-bold">
          Jing Cao
        </AppLink>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav className="mr-auto">
            {/*<Nav.Link href="/portfolios" className="mr-3">*/}
            {/*  Portfolios*/}
            {/*</Nav.Link>*/}
            {/*使用Nav.Link每次都要重新请求server，reload；我们改用Link，静态页面不需要重新请求服务器*/}

            {/*<Link href="/portfolios" >*/}
            {/*  <a className="nav-link mr-3">*/}
            {/*    Portfolios*/}
            {/*  </a>*/}
            {/*</Link>*/}

            {/*将以上Link封装为自己的AppLink*/}
            <AppLink href="/portfolios" className="nav-link mr-3">
              Portfolios
            </AppLink>

            <AppLink href="/forum/categories" className="nav-link mr-3">
              Forum
            </AppLink>
            <AppLink href="/cv" className="nav-link mr-3">
              Cv
            </AppLink>
            {/*<Nav.Link href="#" className="mr-3">*/}
            {/*  Ask me*/}
            {/*</Nav.Link>*/}
          </Nav>
          <Nav>
            <AppLink href="/login" className="mr-3 btn btn-success bg-green-2 bright">
              Sign In
            </AppLink>
            <AppLink href="/register" className="nav-link mr-3">
              Sign Up
            </AppLink>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    </div>
  )
}

export default AppNavbar;
