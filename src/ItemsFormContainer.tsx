import { FunctionComponent } from 'react';
import { Container } from 'react-bootstrap';
import { ItemsForm } from './ItemsForm';
import './ItemsFormContainer.scss';
import TopNavbar from './TopNavbar';

interface Props {
  category: string;
}

export const ItemsFormContainer: FunctionComponent<Props> = ({ category }) => {
  return (
    <div className='page mains-and-sides'>
      <TopNavbar title={category} showBackNav={true} />
      <Container className='items-form-container'>
        <ItemsForm category={category} />
      </Container>
    </div>
  );
};
