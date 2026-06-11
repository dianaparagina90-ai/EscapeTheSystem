import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

const useInventory = () => {
    
const context = useContext(InventoryContext)

if (!context) {
    throw new Error("Provider måste uppges")
}
 return context
}

export default useInventory;
