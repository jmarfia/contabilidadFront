import React from "react";

const Report = (props) => {
  const movements = props.movimientos;
  console.log(movements,  "postaaaaaaaaaaaaaaa");
  let suma = 0;
  for (let index = 0; index < movements.length; index++) {
      if(movements[index].type===true){
      suma += movements[index].amount;
    }else{
        suma -= movements[index].amount;
    }
      
  }
  console.log(suma);

  return (
    <>

Suma de todo: ${suma}

    </>
  );
};
export default Report;
