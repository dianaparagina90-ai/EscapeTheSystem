const Rooms = () => {
  return (
    <div>Rooms</div>
  )
}

export default Rooms

//Man trycker på ett rum - rummets path hamnar i URL 
// från location kan man hitta vilket rum man är i 
// när man trycker på bild så kollar man : bildens id === rummets item to solve id
//Om det är samma - byt image + instruction
//Då kollar man rummets itemToAdd - id
//Kör addItem(id), hitta nytt item med det id:t,lägg till i inventory-array


