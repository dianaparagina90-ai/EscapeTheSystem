import useInventory from "../hooks/useInventory";

interface IProps {
  onItemClick: (itemId: number) => void;
}

const Inventory = ({ onItemClick }: IProps) => {
  const { inventory } = useInventory();

  return (
    <>
      <h4 className="text-xl font-bold text-center font-mono">Inventory</h4>
      <div
        /*className="inventory"*/ className="flex gap-2 flex-wrap justify-center rounded-2xl"
      >
        {inventory.map((i) => (
          <img
            className="w-auto h-30 rounded-2xl cursor-pointer  hover:scale-110  "
            key={i.id}
            src={i.image}
            alt={i.description}
            onClick={() => onItemClick(i.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Inventory;
