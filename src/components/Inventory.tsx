import useInventory from "../hooks/useInventory";

interface IProps {
  onItemClick: (itemId: number) => void;
}

const Inventory = ({ onItemClick }: IProps) => {
  const { inventory } = useInventory();

  return (
    <div className="inventory">
      {inventory.map((i) => (
        <img
          key={i.id}
          src={i.image}
          alt={i.description}
          onClick={() => onItemClick(i.id)}
        />
      ))}
    </div>
  );
};

export default Inventory;
