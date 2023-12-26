import { faCarrot as VegetableIcon } from '@fortawesome/free-solid-svg-icons/faCarrot';
import { faIceCream as DessertIcon } from '@fortawesome/free-solid-svg-icons/faIceCream';
import { faPlateWheat as SideIcon } from '@fortawesome/free-solid-svg-icons/faPlateWheat';
import { faUtensils as MainIcon } from '@fortawesome/free-solid-svg-icons/faUtensils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import NavItem from 'react-bootstrap/NavItem';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import './BottomNavbar.scss';

const BottomNavbar: FunctionComponent = () => {
  return (
    <Navbar className='jumbotron-fluid border-top justify-content-center navbar-bottom' fixed='bottom'>
      <NavItem className='text-center'>
        <NavLink
          to='/mains'
          isActive={(match) => {
            if (!match) {
              return false;
            }
            return match.isExact;
          }}
          activeClassName='active'
        >
          <div className='btn'>
            <FontAwesomeIcon className='link-icon' icon={MainIcon} />
            <div className='icon-label'>Mains</div>
          </div>
        </NavLink>
      </NavItem>
      <NavItem className='text-center'>
        <NavLink
          to='/sides'
          isActive={(match) => {
            if (!match) {
              return false;
            }
            return match.isExact;
          }}
          activeClassName='active'
        >
          <div className='btn'>
            <FontAwesomeIcon className='link-icon' icon={SideIcon} />
            <div className='icon-label'>Sides</div>
          </div>
        </NavLink>
      </NavItem>
      <NavItem className='text-center'>
        <NavLink
          to='/vegetables'
          isActive={(match) => {
            if (!match) {
              return false;
            }
            return match.isExact;
          }}
          activeClassName='active'
        >
          <div className='btn'>
            <FontAwesomeIcon className='link-icon' icon={VegetableIcon} />
            <div className='icon-label'>Vegetables</div>
          </div>
        </NavLink>
      </NavItem>
      <NavItem className='text-center'>
        <NavLink
          to='/desserts'
          isActive={(match) => {
            if (!match) {
              return false;
            }
            return match.isExact;
          }}
          activeClassName='active'
        >
          <div className='btn'>
            <FontAwesomeIcon className='link-icon' icon={DessertIcon} />
            <div className='icon-label'>Desserts</div>
          </div>
        </NavLink>
      </NavItem>
    </Navbar>
  );
};

export default BottomNavbar;
