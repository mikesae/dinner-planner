import { faChevronLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import './TopNavbar.scss';

export interface ITopNavBarProps {
  title: string;
  showBackNav: boolean;
  backNav?: string;
  children?: any;
}

const TopNavbar: FunctionComponent<ITopNavBarProps> = ({ title, showBackNav, backNav, children }) => {
  return (
    <>
      <Navbar className='jumbotron-fluid border-bottom navbar-top' fixed='top'>
        <Row className='container-fluid no-gutters'>
          <Col className='col-1'>
            {showBackNav ? (
              <Link to={backNav ?? '/'} className='navbar-left-link'>
                <div className='btn'>
                  <FontAwesomeIcon className='link-icon' icon={faChevronLeft} />
                </div>
              </Link>
            ) : (
              <Image fluid src='/logo.png' />
            )}
          </Col>
          <Col className='col-10 navbar-content'>
            <span>{title}</span>
            <div>{children}</div>
          </Col>
          <Col className='col-1'>
            <Link className='pull-right' to='/profile'>
              <div className='btn'>
                <FontAwesomeIcon className='link-icon fa-1pt5x' icon={faUser} />
              </div>
            </Link>
          </Col>
        </Row>
      </Navbar>
    </>
  );
};

export default TopNavbar;
