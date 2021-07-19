import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import Link from "next/link";
import withApollo from "@/hoc/withApollo";
import {useLazyGetUser} from "@/apollo/actions";
import {useEffect, useState} from "react";

const AppLink = ({children, className, href, as}) =>
  <Link href={href} as={as}>
    <a className={className}>{children}</a>
  </Link>

const AppNavbar = () => {

  const [user, setUser] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [getUser, {data, error}] = useLazyGetUser();

  useEffect(() => {
    getUser();
  }, []);

  if (data) {
    if (data.user && !user) { setUser(data.user); }
    if (!data.user && user) { setUser(null); }
    if (!hasResponse) { setHasResponse(true); }
  }

  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <AppLink href="/" className="navbar-brand mr-3 font-weight-bold">
          Jing Cao
        </AppLink>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav className="mr-auto">
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
            {/*<AppLink href="/secret" className="nav-link mr-3">*/}
            {/*  Secret*/}
            {/*</AppLink>*/}
            {/*<AppLink*/}
            {/*  as="/instructor/sdfadf111/dashboard"*/}
            {/*  href="/instructor/[id]/dashboard"*/}
            {/*  className="nav-link mr-3">*/}
            {/*  Dashboard*/}
            {/*</AppLink>*/}
          </Nav>
          { hasResponse &&
            <Nav>
              { user &&
                <>
                  <span className="nav-link mr-2">Welcome {user.username}</span>
                  { (user.role === 'admin' || user.role === 'instructor') &&
                    <>
                    <NavDropdown className="mr-2" title="Manage" id="basic-nav-dropdown">
                      <AppLink href="/portfolios/new" className="dropdown-item">
                        Create Portfolio
                      </AppLink>
                      <AppLink
                        href="/instructor/[id]/dashboard"
                        as={`/instructor/${user._id}/dashboard`}
                        className="dropdown-item">
                        Dashboard
                      </AppLink>
                    </NavDropdown>
                    </>
                  }
                  <AppLink href="/logout" className="nav-link btn btn-danger">
                    Sign Out
                  </AppLink>
                </>
              }
              { (error || !user) &&
                <>
                  <AppLink href="/login" className="mr-3 btn btn-success bg-green-2 bright">
                    Sign In
                  </AppLink>
                  <AppLink href="/register" className="nav-link mr-3">
                    Sign Up
                  </AppLink>
                </>
              }
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default withApollo(AppNavbar);
