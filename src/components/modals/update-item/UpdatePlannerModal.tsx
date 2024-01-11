import { Auth } from 'aws-amplify';
import { ImageComponent } from 'components/image/ImageComponent';
import { addItemToMeal, getMealItemIds, removeItemFromMeal, updateMealItems } from 'data/api/MealFunctions';
import { getAllSortedItems } from 'data/api/itemQueries';
import { Component } from 'react';
import { Container, Dropdown, FormGroup, FormLabel } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import '../Modal.scss';

export interface IUpdatePlannerModalProps {
  isOpen: boolean;
  OnOK: () => void;
  OnClose: () => void;
  date: Date;
  mealId?: string;
  itemId: string;
}

interface IMealItem {
  id: number;
  name: string;
  image: string;
  category: string;
}

interface IUpdatePlannerModalState {
  userName: string;
  selectedMain: number;
  selectedSide: number;
  selectedVegetable: number;
  selectedDessert: number;
  mains: IMealItem[];
  sides: IMealItem[];
  vegetables: IMealItem[];
  desserts: IMealItem[];
}

const NOT_SELECTED: number = -1;

export default class UpdatePlannerModal extends Component<IUpdatePlannerModalProps, IUpdatePlannerModalState> {
  constructor(props: IUpdatePlannerModalProps) {
    super(props);
    this.state = {
      userName: '',
      selectedMain: NOT_SELECTED,
      selectedSide: NOT_SELECTED,
      selectedDessert: NOT_SELECTED,
      selectedVegetable: NOT_SELECTED,
      mains: [],
      sides: [],
      vegetables: [],
      desserts: [],
    };
  }

  async componentDidUpdate(prevProps: IUpdatePlannerModalProps) {
    // To minimize service calls, only call them when the modal opens.
    if (prevProps.isOpen === false && this.props.isOpen) {
      try {
        const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
        const mealItems: IMealItem[] = await getAllSortedItems(user.username);

        this.setState({ userName: user.username });
        this.setState({ mains: mealItems.filter((item: IMealItem) => item.category === 'Mains') });
        this.setState({ sides: mealItems.filter((item: IMealItem) => item.category === 'Sides') });
        this.setState({ vegetables: mealItems.filter((item: IMealItem) => item.category === 'Vegetables') });
        this.setState({ desserts: mealItems.filter((item: IMealItem) => item.category === 'Desserts') });
      } catch (error) {
        console.log('error: ', error);
      }
    }
  }

  onMainPicked(idxItem: number) {
    this.setState({
      selectedMain: idxItem,
      selectedSide: NOT_SELECTED,
      selectedVegetable: NOT_SELECTED,
      selectedDessert: NOT_SELECTED,
    });
  }

  onSidePicked(idxItem: number) {
    this.setState({
      selectedMain: NOT_SELECTED,
      selectedSide: idxItem,
      selectedVegetable: NOT_SELECTED,
      selectedDessert: NOT_SELECTED,
    });
  }

  onVegetablePicked(idxItem: number) {
    this.setState({
      selectedMain: NOT_SELECTED,
      selectedSide: NOT_SELECTED,
      selectedVegetable: idxItem,
      selectedDessert: NOT_SELECTED,
    });
  }

  onDessertPicked(idxItem: number) {
    this.setState({
      selectedMain: NOT_SELECTED,
      selectedSide: NOT_SELECTED,
      selectedVegetable: NOT_SELECTED,
      selectedDessert: idxItem,
    });
  }

  getSelectedItem(): IMealItem {
    if (this.state.selectedMain !== NOT_SELECTED) {
      return { ...this.state.mains[this.state.selectedMain] };
    } else if (this.state.selectedSide !== NOT_SELECTED) {
      return { ...this.state.sides[this.state.selectedSide] };
    } else if (this.state.selectedVegetable !== NOT_SELECTED) {
      return { ...this.state.vegetables[this.state.selectedVegetable] };
    } else if (this.state.selectedDessert !== NOT_SELECTED) {
      return { ...this.state.desserts[this.state.selectedDessert] };
    }
    return { id: 0, name: '', image: '', category: '' };
  }

  async onReplace() {
    let selectedItem = this.getSelectedItem();
    if (selectedItem.id === 0) {
      return;
    }
    const itemIds: string[] = await getMealItemIds(this.props.mealId);
    let newItemIds: string[] = [];
    itemIds.forEach((itemId: string) => {
      if (itemId === this.props.itemId) {
        newItemIds.push(String(selectedItem.id));
      } else {
        newItemIds.push(itemId);
      }
    });
    await updateMealItems(newItemIds, this.props.mealId);
    this.props.OnOK();
  }

  async onRemove() {
    try {
      await removeItemFromMeal(this.props.mealId, this.props.itemId);
    } catch (e: any) {
      console.log(`Error: ${e.toString()}`);
    }
    this.props.OnOK();
  }

  async onAdd() {
    let selectedItem = this.getSelectedItem();
    if (selectedItem.id === 0) {
      return;
    }
    try {
      let mealId: string | undefined = this.props.mealId;
      await addItemToMeal(selectedItem.id, mealId, this.props.date, this.state.userName);
    } catch (e) {
      console.log('Error: ' + e);
    }
    this.props.OnOK();
  }

  render() {
    let mainTitle;
    let sideTitle;
    let vegetableTitle;
    let dessertTitle;

    const idxMain = this.state.selectedMain;
    const idxSide = this.state.selectedSide;
    const idxVegetable = this.state.selectedVegetable;
    const idxDessert = this.state.selectedDessert;
    const addingItem = this.props.itemId === '';

    if (idxMain === NOT_SELECTED) {
      mainTitle = <span>Main</span>;
    } else {
      mainTitle = (
        <span>
          <ImageComponent src={this.state.mains[idxMain].image} alt={this.state.mains[idxMain].name} />
          {this.state.mains[idxMain].name}
        </span>
      );
    }
    if (idxSide === NOT_SELECTED) {
      sideTitle = <span>Side</span>;
    } else {
      sideTitle = (
        <span>
          <ImageComponent src={this.state.sides[idxSide].image} alt={this.state.sides[idxSide].name} />
          {this.state.sides[idxSide].name}
        </span>
      );
    }
    if (idxVegetable === NOT_SELECTED) {
      vegetableTitle = <span>Vegetable</span>;
    } else {
      vegetableTitle = (
        <span>
          <ImageComponent src={this.state.vegetables[idxVegetable].image} alt={this.state.vegetables[idxVegetable].name} />
          {this.state.vegetables[idxVegetable].name}
        </span>
      );
    }
    if (idxDessert === NOT_SELECTED) {
      dessertTitle = <span>Dessert</span>;
    } else {
      dessertTitle = (
        <span>
          <ImageComponent src={this.state.desserts[idxDessert].image} alt={this.state.desserts[idxDessert].name} />
          {this.state.desserts[idxDessert].name}
        </span>
      );
    }

    return (
      <Rodal
        visible={this.props.isOpen}
        onClose={() => this.props.OnClose()}
        animation='slideUp'
        duration={1000}
        measure='%'
        width={100}
        height={100}
      >
        <Container className='planner-modal'>
          {!addingItem && (
            <FormGroup>
              <button
                className='amplify-button amplify-field-group__control amplify-button--primary amplify-button--fullwidth'
                onClick={() => this.onRemove()}
              >
                Remove
              </button>
              <Row />
            </FormGroup>
          )}
          <FormGroup className='text-center'>
            <FormLabel>Choose a Main, Side, Vegetable, or Dessert</FormLabel>
          </FormGroup>
          <FormGroup>
            <DropdownButton className='amplify-button amplify-button--primary amplify-button--fullwidth' title={mainTitle}>
              {this.state.mains.map((item: any, index: number) => (
                <Dropdown.Item key={item.id} onSelect={() => this.onMainPicked(index)}>
                  <img className='img-item' src={item.image} alt='' />
                  {item.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </FormGroup>
          <FormGroup>
            <DropdownButton className='amplify-button amplify-button--primary amplify-button--fullwidth' title={sideTitle}>
              {this.state.sides.map((item: any, index: number) => (
                <Dropdown.Item key={item.id} onSelect={() => this.onSidePicked(index)}>
                  <img className='img-item' src={item.image} alt='' />
                  {item.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </FormGroup>
          <FormGroup>
            <DropdownButton className='amplify-button amplify-button--primary amplify-button--fullwidth' title={vegetableTitle}>
              {this.state.vegetables.map((item: any, index: number) => (
                <Dropdown.Item key={item.id} onSelect={() => this.onVegetablePicked(index)}>
                  <img className='img-item' src={item.image} alt='' />
                  {item.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </FormGroup>
          <FormGroup>
            <DropdownButton className='amplify-button amplify-button--primary amplify-button--fullwidth' title={dessertTitle}>
              {this.state.desserts.map((item: any, index: number) => (
                <Dropdown.Item key={item.id} onSelect={() => this.onDessertPicked(index)}>
                  <img className='img-item' src={item.image} alt='' />
                  {item.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </FormGroup>
          <FormGroup className='text-center'>
            {addingItem ? (
              <button
                className='amplify-button amplify-field-group__control amplify-button--primary amplify-button--fullwidth btn-on-bottom'
                onClick={() => this.onAdd()}
              >
                Add
              </button>
            ) : (
              <button
                className='amplify-button amplify-field-group__control amplify-button--primary amplify-button--fullwidth btn-on-bottom'
                onClick={() => this.onReplace()}
              >
                Replace
              </button>
            )}
          </FormGroup>
        </Container>
      </Rodal>
    );
  }
}
