import {
  Airplane,
  Bank,
  Barbell,
  Basket,
  Bus,
  Car,
  CoatHanger,
  FileText,
  ForkKnife,
  GraduationCap,
  Hamburger,
  Heart,
  HouseLine,
  PawPrint,
  Pizza,
  Scissors,
  Scroll,
  ShoppingBag,
  ShoppingCart,
  Stethoscope,
  Television,
  Video,
} from '@phosphor-icons/react';

function Icon({ name, size = 20, color = '#22c55f' }) {
  function getIconCategory(name) {
    switch (name) {
      case 'car':
        return <Car color={color} size={size} />;
      case 'scroll':
        return <Scroll color={color} size={size} />;
      case 'video':
        return <Video color={color} size={size} />;
      case 'television':
        return <Television color={color} size={size} />;
      case 'shopping':
        return <ShoppingBag color={color} size={size} />;
      case 'cart':
        return <ShoppingCart color={color} size={size} />;
      case 'basket':
        return <Basket color={color} size={size} />;
      case 'airplane':
        return <Airplane color={color} size={size} />;
      case 'bus':
        return <Bus color={color} size={size} />;
      case 'heart':
        return <Heart color={color} size={size} />;
      case 'pizza':
        return <Pizza color={color} size={size} />;
      case 'hamburger':
        return <Hamburger color={color} size={size} />;
      case 'house':
        return <HouseLine color={color} size={size} />;
      case 'barbell':
        return <Barbell color={color} size={size} />;
      case 'pet':
        return <PawPrint color={color} size={size} />;
      case 'study':
        return <GraduationCap color={color} size={size} />;
      case 'scissors':
        return <Scissors color={color} size={size} />;
      case 'bank':
        return <Bank color={color} size={size} />;
      case 'fork':
        return <ForkKnife color={color} size={size} />;
      case 'stethoscope':
        return <Stethoscope color={color} size={size} />;
      case 'coat':
        return <CoatHanger color={color} size={size} />;
      case 'file':
        return <FileText color={color} size={size} />;
      default:
        return <FileText color={color} size={size} />;
    }
  }

  return <>{getIconCategory(name)}</>;
}

export default Icon;
